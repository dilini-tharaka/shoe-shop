import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const login = express.Router();

login.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    message: "success",
    data: users,
  });
});

//login for Customer
login.post("/", async (req, res) => {
  try {
    const user = await prisma.customer.findMany({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    if (user.length === 0) {
      return res.json({
        message: "Error! invalid username or password",
      });
    }
    res.json({
      message: "success",
      data: user,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//login for Employee
login.post("/employee", async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        userName: req.body.username,
        password: req.body.password,
      },
    });

    if (user.length === 0) {
      return res.json({
        message: "Error! invalid username or password",
      });
    }
    res.json({
      message: "success",
      data: user,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});
export const Login = login;
