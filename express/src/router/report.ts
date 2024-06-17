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
  } catch (error: any) {
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
  } catch (error: any) {
    res.json({
      message: "Error",
      data: error.message,
    });
  }
});

//Get last 30 days Revenue
report.get("/revenue30", async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0); // Set to the start of the day

    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to the end of the day

    const revenue = await prisma.invoiceitem.aggregate({
      _sum: {
        total: true,
      },
      where: {
        invoice: {
          Invoice_at: {
            gte: thirtyDaysAgo,
            lte: today,
          },
        },
      },
    });
    res.json({
      message: "Success",
      data: revenue._sum.total,
    });
  } catch (error: any) {
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
  } catch (error: any) {
    res.json({
      message: "Error",
      data: error.message,
    });
  }
});

//Get top 5 brands of the month
report.get("/topbrand", async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0); // Set to the start of the day

    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to the end of the day

    const topBrand = await prisma.$queryRaw`WITH BrandSales AS (
        SELECT 
            b.id AS brand_id,
            b.name AS brand_name,
            SUM(ii.total) AS total_sales
        FROM 
            invoice i
        JOIN 
            invoiceitem ii ON i.id = ii.Invoice_id
        JOIN 
            stockdetails sd ON ii.StockDetails_id = sd.id
        JOIN 
           product p ON sd.Product_id = p.id
        JOIN
           shoeshasColors shc ON p.Shoes_id = shc.id
        JOIN 
           shoes s ON shc.Shoes_id = s.id
        JOIN 
            brand b ON s.brand_id = b.id
            WHERE i.Invoice_at >= ${thirtyDaysAgo} AND i.Invoice_at <= ${today}
            GROUP BY b.id, b.name)
            SELECT brand_name, total_sales FROM BrandSales ORDER BY total_sales DESC LIMIT 5`;

    res.json({
      message: "Success",
      data: topBrand,
    });
  } catch (error: any) {
    res.json({
      message: "Error",
      data: error.message,
    });
  }
});

//Get shoe sales of the month by category
report.get("/category", async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0); // Set to the start of the day

    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to the end of the day

    const shoeSales = await prisma.$queryRaw`
    SELECT 
        c.name AS category_name,
        SUM(ii.total) AS total_sales
      FROM 
        invoiceitem ii
      JOIN 
        invoice i ON ii.Invoice_id = i.id
      JOIN 
        stockdetails sd ON ii.StockDetails_id = sd.id
      JOIN 
        product p ON sd.Product_id = p.id
      JOIN
        shoeshasColors shco ON p.Shoes_id = shco.id
      JOIN 
        shoes s ON shco.Shoes_id = s.id
      JOIN 
        shoeshascategory shc ON s.id = shc.Shoes_id
      JOIN 
        category c ON shc.Category_id = c.id
      WHERE 
        i.Invoice_at BETWEEN ${thirtyDaysAgo} AND ${today}
      GROUP BY 
        c.name
      ORDER BY 
        total_sales DESC`;

    res.json({
      message: "Success",
      data: shoeSales,
    });
  } catch (error: any) {
    res.json({
      message: "Error",
      data: error.message,
    });
  }
});

//Get Monthly selling by month over the year
report.get("/monthly", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    // Define the type for the query result
    type SalesResult = {
      month: number;
      total_sales: number;
    };
    // Helper function to get sales data by month for a given year
    const getSalesDataByYear = async (year: number) => {
      const result: SalesResult[] = await prisma.$queryRaw`
        SELECT 
          MONTH(i.Invoice_at) AS month,
          SUM(ii.total) AS total_sales
        FROM 
          invoiceitem ii
        JOIN 
          invoice i ON ii.Invoice_id = i.id
        WHERE 
          YEAR(i.Invoice_at) = ${year}
        GROUP BY 
          MONTH(i.Invoice_at)
        ORDER BY 
          month ASC
      `;

      // Initialize an array with 12 months filled with 0
      const salesData = Array(12).fill(0);
      result.forEach((row) => {
        salesData[row.month - 1] = row.total_sales;
      });

      return salesData;
    };

    // Fetch sales data for the current and previous years
    const currentYearData = await getSalesDataByYear(currentYear);
    const previousYearData = await getSalesDataByYear(previousYear);

    res.json({
      message: "Success",
      data: {
        currentYear: currentYearData,
        previousYear: previousYearData,
      },
    });
  } catch (error: any) {
    res.json({
      message: "Error",
      data: error.message,
    });
  }
});

//Get top 5 selling shoes of the month
report.get("/topshoe", async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0); // Set to the start of the day

    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to the end of the day

    const topShoe = await prisma.$queryRaw`
    SELECT 
        p.id AS p_id,
        b.name AS brand,
        s.name AS name,
        SUM(ii.qty) AS quantity_sold,
        sd.selling_price AS selling_price
      FROM 
        invoiceitem ii
      JOIN 
        invoice i ON ii.Invoice_id = i.id
      JOIN 
        stockdetails sd ON ii.StockDetails_id = sd.id
      JOIN 
        product p ON sd.Product_id = p.id
      JOIN
        shoeshasColors shc ON p.Shoes_id = shc.id
      JOIN 
        shoes s ON shc.Shoes_id = s.id
      JOIN 
        brand b ON s.brand_id = b.id
      WHERE 
        i.Invoice_at BETWEEN ${thirtyDaysAgo} AND ${today}
      GROUP BY 
        p.id, b.name, s.name, sd.selling_price
      ORDER BY 
        quantity_sold DESC
      LIMIT 5;`;

    res.json({
      message: "Success",
      data: topShoe,
    });
  } catch (error: any) {
    res.json({
      message: "Error",
      data: error.message,
    });
  }
});
export const Report = report;
