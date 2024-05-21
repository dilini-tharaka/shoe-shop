import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const login = express.Router();

login.post("/", async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        userName: req.body.userName,
        password: req.body.password,
      },
    });
    res.json({
      message: "success login",
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
