import express  from "express";
import { PrismaClient } from "@prisma/client";

const invoice = express.Router();
const prisma = new PrismaClient();

//Get all invoices
invoice.get("/", async (req, res) => {
  const invoices = await prisma.invoice.findMany();
  res.json({
    message: "success",
    data: invoices,
  });
});
export const Invoice = invoice;