import express from "express";
import { PrismaClient } from "@prisma/client";

const register = express.Router();
const prisma = new PrismaClient();

register.get("/", async(req, res) => {
  const customers = await prisma.customer.findMany();
  res.json({
    message: "success",
    data: customers,
  });
});

//Registration for new customer
register.post("/", async (req, res) => {
  try {
    const customer = await prisma.customer.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        created_at: new Date(),
      },
    });
    res.json({
      message: "success",
      data: customer,
    });
    console.log(customer);
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

export const Register = register;
