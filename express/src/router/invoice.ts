import express from "express";
import { PrismaClient } from "@prisma/client";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const receiptsDir = path.join(__dirname, 'receipts');
// Ensure 'receipts' directory exists
if (!fs.existsSync(receiptsDir)) {
  try {
    fs.mkdirSync(receiptsDir);
    console.log(`Created directory: ${receiptsDir}`);
  } catch (err) {
    console.error(`Error creating directory: ${receiptsDir}`, err);
    throw err; // Handle or throw the error as needed
  }
}

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
    const discount = req.body.discount || 5; //default discount 5%
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
      p_id: stockdetails.Product_id,
      name: stockdetails.product.shoeshascolors.shoes.name,
      price: stockdetails.selling_price,
      discount: discount,
      quantity: stockdetails.qty,
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

      //Update product selling count
      const productUpdates = invoiceItems.map((item: any) =>
        prisma.product.update({
          where: { id: item.StockDetails_id },
          data: { selling_count: { increment: item.qty } },
        })
      );

      await Promise.all(stockUpdates);
      await Promise.all(productUpdates);

      // Generate PDF receipt
      const doc = new PDFDocument();
      const fileName = `invoice_${newInvoice.id}.pdf`;
      const filePath = path.join(receiptsDir, fileName);
      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      doc.fontSize(25).text(`Receipt #${newInvoice.id}`, { align: "center" });
      doc.text(`Cashier: ${newInvoice.Cashier_id}`);//100,120
      doc.text(`Date: ${newInvoice.Invoice_at}`,100,160);//100,160
      doc.moveDown();
      invoiceItems.forEach((item: any) => {
        doc.text(`Item ID: ${item.StockDetails_id}, Quantity: ${item.qty}, Total: ${item.amount}`);
      });

      const totalAmount = invoiceItems.reduce((acc: number, item: any) => acc + item.amount, 0);
      doc.text(`Total Amount: ${totalAmount}`,{ align: "right" });
      doc.end();
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
