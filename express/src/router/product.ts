import express from "express";
import { PrismaClient } from "@prisma/client";

const product = express.Router();
const prisma = new PrismaClient();

// GET /product
product.get("/", async (req, res) => {
  const products = await prisma.product.findMany({
    include: {
      sizes: { select: { size: true, length: true } },
      shoeshascolors: {
        include: {
          colors: { select: { name: true } },
          shoes: {
            include: {
              brand: { select: { name: true } },
              shoeshascategory: {
                include: {
                  category: { select: { name: true } },
                },
              },
            },
          },
        },
      },
    },
  });
  res.json({
    message: "success",
    data: products,
  });
});

//Get product by id
product.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        sizes: { select: { size: true, length: true } },
        shoeshascolors: {
          include: {
            colors: { select: { name: true } },
            shoes: {
              include: {
                brand: { select: { name: true } },
                shoeshascategory: {
                  include: {
                    category: { select: { name: true } },
                  },
                },
              },
            },
          },
        },
      },
    });
    res.json({
      message: "success",
      data: product,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Create a new product
product.post("/", async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: {
        Sizes_id: req.body.Sizes_id,
        Shoes_id: req.body.shoeshascolors.id,
      },
    });
    res.json({
      message: "success",
      data: product,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Update a product using id
product.patch("/:id", (req, res) => {});

//Delete a product using ids
product.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      message: "success",
      data: product,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

export const Product = product;
