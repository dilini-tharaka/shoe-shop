import express from "express";
import { PrismaClient } from "@prisma/client";

const invoice = express.Router();
const prisma = new PrismaClient();

//Get all invoices
invoice.get("/", async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        cashier: {
          select: {
            name: true,
          },
        },
        invoiceitem: {
          include: {
            stockdetails: {
              include: {
                product: {
                  include: {
                    shoeshascolors: {
                      include: {
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
      },
    });

    const invoiceData = invoices.map((invoice) => ({
      id: invoice.id,
      cashier: invoice.cashier.name,
      discount: invoice.discount,
      invoice_at: invoice.Invoice_at,
      invoiceitem: invoice.invoiceitem.map((item) => ({
        id: item.id,
        qty: item.qty,
        total: item.total,
        stockdetails: {
          selling_price: item.stockdetails.selling_price,
          barcode: item.stockdetails.barcode,
          product: {
            name: item.stockdetails.product.shoeshascolors.shoes.name,
          },
        },
      })),
    }));
    res.json({
      message: "success",
      data: invoiceData,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Get shoe name, selling price , discount using stockdetails id
invoice.post("/stockdetails", async (req, res) => {
  try {
    const { id } = req.body;
    const stockdetails = await prisma.stockdetails.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        product: {
          include: {
            shoeshascolors: {
              include: {
                shoes: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        invoiceitem: {
          select: {
            invoice: {
              select: {
                discount: true,
              },
            },
          },
        },
      },
    });

    if (!stockdetails) {
      res.json({
        message: "Stockdetails not found for the given id",
      });
      return;
    }

    const stockdetailsData = {
      name: stockdetails.product.shoeshascolors.shoes.name,
      price: stockdetails.selling_price,
      discount: stockdetails.invoiceitem[0].invoice.discount,
    };
    res.json({
      message: "success",
      data: stockdetailsData,
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
      include: {
        cashier: {
          select: {
            name: true,
          },
        },
        invoiceitem: {
          include: {
            stockdetails: {
              include: {
                product: {
                  include: {
                    shoeshascolors: {
                      include: {
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
      },
    });

    if (!invoice) {
      res.json({
        message: "Invoice not found",
      });
      return;
    }

    const invoiceData = {
      id: invoice.id,
      cashier: invoice.cashier.name,
      discount: invoice.discount,
      invoice_at: invoice.Invoice_at,
      invoiceitem: invoice.invoiceitem.map((item) => ({
        id: item.id,
        qty: item.qty,
        total: item.total,
        stockdetails: {
          selling_price: item.stockdetails.selling_price,
          barcode: item.stockdetails.barcode,
          product: {
            name: item.stockdetails.product.shoeshascolors.shoes.name,
          },
        },
      })),
    };

    res.json({
      message: "success",
      data: invoiceData,
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
    const result = await prisma.$transaction(async (prisma) => {
      //create new invoice
      const newInvoice = await prisma.invoice.create({
        data: {
          Invoice_at: new Date(),
          Cashier_id: req.body.Cashier_id,
        },
      });

      //Add invoice items
      const invoiceItems = req.body.invoiceitem.map((item: any) => {
        return {
          qty: item.qty,
          total: item.amount,
          StockDetails_id: item.id,
          Invoice_id: newInvoice.id,
        };
      });

      //Create invoice items
      await prisma.invoiceitem.createMany({
        data: invoiceItems,
      });

      //Update stock Quantity
      const stockUpdates = invoiceItems.map((item: any) =>
        prisma.stockdetails.update({
          where: { id: item.StockDetails_id },
          data: { qty: { decrement: item.qty } },
        })
      );

      await Promise.all(stockUpdates);
      return newInvoice;
    });

    res.json({
      message: "success",
      data: result,
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
