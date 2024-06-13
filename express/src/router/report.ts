import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const report = express.Router();

//Get last 7 days order count
report.get("/order", async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0); // Set to the start of the day

    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to the end of the day

    const invoiceCount = await prisma.invoice.count({
      where: {
        Invoice_at: {
          gte: sevenDaysAgo,
          lte: today,
        },
      },
    });
    res.json({
      message: "Success",
      data: invoiceCount,
    });
  } catch (error) {
    res.json({
      message: "Error",
      data: error.message,
    });
  }
});

//Get last 7 days Revenue
report.get("/revenue", async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0); // Set to the start of the day

    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to the end of the day

    const revenue = await prisma.invoiceitem.aggregate({
      _sum: {
        total: true,
      },
      where: {
        invoice: {
          Invoice_at: {
            gte: sevenDaysAgo,
            lte: today,
          },
        },
      },
    });
    res.json({
      message: "Success",
      data: revenue._sum.total,
    });
  } catch (error) {
    res.json({
      message: "Error",
      data: error.message,
    });
  }
});

//Get total order count
report.get("/total", async (req, res) => {
  try {
    const invoiceCount = await prisma.invoice.count();
    res.json({
      message: "Success",
      data: invoiceCount,
    });
  } catch (error) {
    res.json({
      message: "Error",
      data: error.message,
    });
  }
});
export const Report = report;
