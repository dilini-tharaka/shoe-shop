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
      include:{
        role:true
      }
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
      include:{
        role:true
      }
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
    const { firstName, lastName } = req.body;
    const role_id = req.body.role_id;

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

    // Update the relevant role-specific table based on the role_id
    switch (role_id) {
      case 1: // Admin
        await prisma.admin.create({
          data: {
            name: name,
            mobile: req.body.mobile,
            nic: req.body.nic,
            email: req.body.email,
            username: req.body.userName,
            password: req.body.password,
          },
        });
        break;
      case 2: // Stock Manager
        await prisma.stockmanager.create({
          data: {
            name: name,
            mobile: req.body.mobile,
            nic: req.body.nic,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
          },
        });
        break;
      case 3: // Assistant
        await prisma.assistant.create({
          data: {
            name: name,
            mobile: req.body.mobile,
            nic: req.body.nic,
            email: req.body.email,
            username: req.body.userName,
            password: req.body.password,
          },
        });
        break;
      case 4: // Cashier
        await prisma.cashier.create({
          data: {
            name: name,
            mobile: req.body.mobile,
            nic: req.body.nic,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
          },
        });
        break;
      default:
        throw new Error("Invalid role_id");
    }

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
      include:{
        role:true
      }
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
    const name = `${req.body.firstName} ${req.body.lastName}`;
    const employee = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        mobile: req.body.mobile,
        nic: req.body.nic,
        email: req.body.email,
        userName: req.body.userName,
        role: {
          connect: {
            id: req.body.role_id,
          },
        },
      },
    });

    // Update the relevant role-specific table based on the role_id
    // switch (req.body.role_id) {
    //   case 1: // Admin
    //     await prisma.admin.update({
    //       where: {
    //         user_id: parseInt(id),
    //       },
    //       data: {
    //         name: name,
    //         mobile: req.body.mobile,
    //         nic: req.body.nic,
    //         email: req.body.email,
    //         username: req.body.userName,
    //       },
    //     });
    //     break;
    //   case 2: // Stock Manager
    //     await prisma.stockmanager.update({
    //       where: {
    //         user_id: parseInt(id),
    //       },
    //       data: {
    //         name: name,
    //         mobile: req.body.mobile,
    //         nic: req.body.nic,
    //         email: req.body.email,
    //         userName: req.body.userName,
    //       },
    //     });
    //     break;
    //   case 3: // Assistant
    //     await prisma.assistant.update({
    //       where: {
    //         user_id: parseInt(id),
    //       },
    //       data: {
    //         name: name,
    //         mobile: req.body.mobile,
    //         nic: req.body.nic,
    //         email: req.body.email,
    //         username: req.body.userName,
    //       },
    //     });
    //     break;
    //   case 4: // Cashier
    //     await prisma.cashier.update({
    //       where: {
    //         user_id: parseInt(id),
    //       },
    //       data: {
    //         name: name,
    //         mobile: req.body.mobile,
    //         nic: req.body.nic,
    //         email: req.body.email,
    //         userName: req.body.userName,
    //       },
    //     });
    //     break;
    //   default:
    //     throw new Error("Invalid role_id");
    // }
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
