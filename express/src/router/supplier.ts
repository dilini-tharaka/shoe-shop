import express from "express";
import { PrismaClient } from "@prisma/client";

const supplier = express.Router();
const prisma = new PrismaClient();

//get all suppliers
supplier.get("/", async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany();
    res.json({
      message: "success",
      data: suppliers,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//get a single supplier using id
supplier.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      message: "success",
      data: supplier,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//create a new supplier
supplier.post("/", async (req, res) => {
  try {
    const supplier = await prisma.supplier.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        nic: req.body.nic,
        address: req.body.address,
        created_at: new Date(),
        bankDetails_id: req.body.bankDetails_id,
      },
    });
    res.json({
      message: "success",
      data: supplier,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//update a supplier using id
supplier.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await prisma.supplier.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        nic: req.body.nic,
        address: req.body.address,
        bankDetails_id: req.body.bankDetails_id,
      },
    });
    res.json({
      message: "successfully updated",
      data: supplier,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//delete a supplier using id
supplier.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await prisma.supplier.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      message: "successfully deleted",
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

export const Supplier = supplier;
