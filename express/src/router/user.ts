import express from "express";
import { PrismaClient } from "@prisma/client";

const user = express.Router();
const prisma = new PrismaClient();

//Get all users
user.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
    });
    res.json({
      message: "success",
      data: users,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

// Get all roles
user.get("/role", async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.json({
      message: "success",
      data: roles,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//get next user id
user.get("/nextid", async (req, res) => {
  try {
    const userID = await prisma.user.aggregate({
      _max: {
        id: true,
      },
    });

    // Calculate the next id by adding 1
    const nextId = (userID._max.id || 0) + 1;

    res.json({
      message: "success",
      data: nextId,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//get user by mobile
user.get("/mobile/:mobile", async (req, res) => {
  try {
    const { mobile } = req.params;
    const employee = await prisma.user.findMany({
      where: {
        mobile: mobile,
      },
    });
    res.json({
      message: "success",
      data: employee,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//get user by role
user.get("/role/:role", async (req, res) => {
  try {
    const { role } = req.params;
    const employee = await prisma.user.findMany({
      where: {
        role: {
          name: {
            contains: role,
          },
        },
      },
    });
    res.json({
      message: "success",
      data: employee,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});
// create user
user.post("/", async (req, res) => {
  try {
    const { firstName, lastName} = req.body;

    // Get name by concatenating firstname and lastname
    const name = `${firstName} ${lastName}`;
    const employee = await prisma.user.create({
      data: {
        name: name,
        mobile: req.body.mobile,
        nic: req.body.nic,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        created_at: new Date(),
        role: {
          connect: {
            id: req.body.role_id,
          },
        },
      },
    });
    res.json({
      message: "success",
      data: employee,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

// get user by id
user.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      message: "success",
      data: employee,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

// update user
user.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: req.body.name,
        mobile: req.body.mobile,
        nic: req.body.nic,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        role: {
          connect: {
            id: req.body.role_id,
          },
        },
      },
    });
    res.json({
      message: "success",
      data: employee,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

// delete user
user.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      message: "successfull deleted",
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});
export const User = user;
