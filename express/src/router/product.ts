import express from "express";
import { PrismaClient } from "@prisma/client";

const product = express.Router();
const prisma = new PrismaClient();

// GET /product
product.get("/", async (req, res) => {
  const products = await prisma.product.findMany({
    relationLoadStrategy: "join",
    include: {
      
    },
  });
  res.json({
    message: "success",
    data: products,
  });
});

//Get product by id
product.get("/:id", (req, res) => {
  res.send(product);
});

//Create a new product
product.post("/", (req, res) => {});

//Update a product using id
product.patch("/:id", (req, res) => {});

//Delete a product using ids
product.delete("/:id", (req, res) => {
  const { id } = req.params;
});

export const Product = product;
