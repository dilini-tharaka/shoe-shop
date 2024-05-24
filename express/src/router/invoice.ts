import express from "express";
import { PrismaClient } from "@prisma/client";

const invoice = express.Router();
const prisma = new PrismaClient();

//Get all invoices
invoice.get("/", async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      select: {
        id: true,
        Invoice_at: true,
        Cashier_id: true,
        invoiceitem: {
          select: {
            id: true,
            qty: true,
            total: true,
            stockdetails: {
              select: {
                selling_price: true,
                barcode: true,
                product: {
                  select: {
                    shoeshascolors: {
                      select: {
                        shoes: {
                          select: {
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        cashier: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json({
      message: "success",
      data: invoices,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Get invoice by id
invoice.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        Invoice_at: true,
        Cashier_id: true,
        invoiceitem: {
          select: {
            id: true,
            qty: true,
            total: true,
            stockdetails: {
              select: {
                selling_price: true,
                barcode: true,
                product: {
                  select: {
                    shoeshascolors: {
                      select: {
                        shoes: {
                          select: {
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        cashier: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json({
      message: "success",
      data: invoice,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Create new invoice
invoice.post("/", async (req, res) => {
  try {
    const invoice = await prisma.invoice.create({
      data: {
        Invoice_at: new Date(),
        Cashier_id: req.body.Cashier_id,
        invoiceitem: {
          create: req.body.invoiceitem.map((item: any) => ({
            qty: item.qty,
            total: item.total,
            stockdetails: {
              connect: {
                id: item.stockdetails_id,
              },
            },
          })),
        },
      },
    });
    res.json({
      message: "success",
      data: invoice,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Export the router
export const Invoice = invoice;
