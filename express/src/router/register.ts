import express from "express";
import { PrismaClient } from "@prisma/client";

const register = express.Router();
const prisma = new PrismaClient();

interface Register {
    name: string;
    mobile: string;
    nic: string;
    email: string;
    userName: string;
    password: string;
    role_id: number;
  }

register.get("/", (req, res) => {
  res.send("user registration page");
});

register.post("/", async (req, res) => {
  const user = await prisma.user.create({
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
    data: user,
  });
});

export const Register = register;
