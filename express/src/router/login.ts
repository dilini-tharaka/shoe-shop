import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

const login = express.Router();

login.post("/", async (req, res) => {
  const user = await prisma.user.findMany({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  });
  res.json({
    message: "success login",
    data: user,
  });
});

export const Login = login;
