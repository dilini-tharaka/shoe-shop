import express from "express";
import { PrismaClient } from "@prisma/client";

const user = express.Router();
const prisma = new PrismaClient();

user.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    message: "success",
    data: users,
  });
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

// create user
user.post("/",async(req, res) => {
   const employee = await prisma.user.create({
    data: {
      name: req.body.name,
      mobile: req.body.mobile,
      nic: req.body.nic,
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.password,
      created_at: new Date(),
      role_id: req.body.role_id,
    },
   });
   res.json({
        message: "success",
        data: employee,
    });
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
            name: req.body.name ,
            mobile : req.body.mobile,
            nic: req.body.nic,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            role_id: req.body.role_id,
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