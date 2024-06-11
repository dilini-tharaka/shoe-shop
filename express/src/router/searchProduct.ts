import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const product = express.Router();

//Get product by brand
product.get("/brand/:brand", async (req, res) => {
  try {
    const { brand } = req.params;
    const products = await prisma.product.findMany({
      where: {
        shoeshascolors: {
          shoes: {
            brand: {
              name: {
                contains: brand,
              },
            },
          },
        },
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
        stockdetails: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    if (!product) {
      res.json({
        message: "error",
      });
      return;
    }

    const formattedProducts = products.map((product) => {
      let currentStockIndex = 0;
      while (
        currentStockIndex < product.stockdetails.length &&
        product.stockdetails[currentStockIndex].qty === 0
      ) {
        currentStockIndex++; // Find the next available stock
      }

      const currentStockDetail = product.stockdetails[currentStockIndex];

      return {
        id: product.id,
        size: product.sizes.size,
        length: product.sizes.length,
        color: product.shoeshascolors.colors.name,
        name: product.shoeshascolors.shoes.name,
        brand: product.shoeshascolors.shoes.brand.name,
        category:
          product.shoeshascolors.shoes.shoeshascategory.length > 0
            ? product.shoeshascolors.shoes.shoeshascategory[0].category.name
            : "", // Default value
        buying_price: currentStockDetail ? currentStockDetail.buying_price : 0,
        selling_price: currentStockDetail
          ? currentStockDetail.selling_price
          : 0,
        barcode: currentStockDetail ? currentStockDetail.barcode : "",
        qty: currentStockDetail ? currentStockDetail.qty : 0,
      };
    });

    res.json({
      message: "success",
      data: formattedProducts,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Get product by color
product.get("/color/:color", async (req, res) => {
  try {
    const { color } = req.params;
    const products = await prisma.product.findMany({
      where: {
        shoeshascolors: {
          colors: {
            name: {
              contains: color,
            },
          },
        },
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
        stockdetails: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    if (!product) {
      res.json({
        message: "error",
      });
      return;
    }

    const formattedProducts = products.map((product) => {
      let currentStockIndex = 0;
      while (
        currentStockIndex < product.stockdetails.length &&
        product.stockdetails[currentStockIndex].qty === 0
      ) {
        currentStockIndex++; // Find the next available stock
      }

      const currentStockDetail = product.stockdetails[currentStockIndex];

      return {
        id: product.id,
        size: product.sizes.size,
        length: product.sizes.length,
        color: product.shoeshascolors.colors.name,
        name: product.shoeshascolors.shoes.name,
        brand: product.shoeshascolors.shoes.brand.name,
        category:
          product.shoeshascolors.shoes.shoeshascategory.length > 0
            ? product.shoeshascolors.shoes.shoeshascategory[0].category.name
            : "", // Default value
        buying_price: currentStockDetail ? currentStockDetail.buying_price : 0,
        selling_price: currentStockDetail
          ? currentStockDetail.selling_price
          : 0,
        barcode: currentStockDetail ? currentStockDetail.barcode : "",
        qty: currentStockDetail ? currentStockDetail.qty : 0,
      };
    });

    res.json({
      message: "success",
      data: formattedProducts,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Get product by size
product.get("/size/:size", async (req, res) => {
  try {
    const { size } = req.params;
    const products = await prisma.product.findMany({
      where: {
        sizes: {
          size: {
            contains: size,
          },
        },
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
        stockdetails: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    if (!product) {
      res.json({
        message: "error",
      });
      return;
    }

    const formattedProducts = products.map((product) => {
      let currentStockIndex = 0;
      while (
        currentStockIndex < product.stockdetails.length &&
        product.stockdetails[currentStockIndex].qty === 0
      ) {
        currentStockIndex++; // Find the next available stock
      }

      const currentStockDetail = product.stockdetails[currentStockIndex];

      return {
        id: product.id,
        size: product.sizes.size,
        length: product.sizes.length,
        color: product.shoeshascolors.colors.name,
        name: product.shoeshascolors.shoes.name,
        brand: product.shoeshascolors.shoes.brand.name,
        category:
          product.shoeshascolors.shoes.shoeshascategory.length > 0
            ? product.shoeshascolors.shoes.shoeshascategory[0].category.name
            : "", // Default value
        buying_price: currentStockDetail ? currentStockDetail.buying_price : 0,
        selling_price: currentStockDetail
          ? currentStockDetail.selling_price
          : 0,
        barcode: currentStockDetail ? currentStockDetail.barcode : "",
        qty: currentStockDetail ? currentStockDetail.qty : 0,
      };
    });

    res.json({
      message: "success",
      data: formattedProducts,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Get product by shoe name
product.get("/name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const products = await prisma.product.findMany({
      where: {
        shoeshascolors: {
          shoes: {
            name: {
              contains: name,
            },
          },
        },
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
        stockdetails: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    if (!product) {
      res.json({
        message: "error",
      });
      return;
    }

    const formattedProducts = products.map((product) => {
      let currentStockIndex = 0;
      while (
        currentStockIndex < product.stockdetails.length &&
        product.stockdetails[currentStockIndex].qty === 0
      ) {
        currentStockIndex++; // Find the next available stock
      }

      const currentStockDetail = product.stockdetails[currentStockIndex];

      return {
        id: product.id,
        size: product.sizes.size,
        length: product.sizes.length,
        color: product.shoeshascolors.colors.name,
        name: product.shoeshascolors.shoes.name,
        brand: product.shoeshascolors.shoes.brand.name,
        category:
          product.shoeshascolors.shoes.shoeshascategory.length > 0
            ? product.shoeshascolors.shoes.shoeshascategory[0].category.name
            : "", // Default value
        buying_price: currentStockDetail ? currentStockDetail.buying_price : 0,
        selling_price: currentStockDetail
          ? currentStockDetail.selling_price
          : 0,
        barcode: currentStockDetail ? currentStockDetail.barcode : "",
        qty: currentStockDetail ? currentStockDetail.qty : 0,
      };
    });

    res.json({
      message: "success",
      data: formattedProducts,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});
export const SearchProduct = product;
