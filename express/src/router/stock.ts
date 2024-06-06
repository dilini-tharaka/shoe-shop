import express from "express";
import { PrismaClient } from "@prisma/client";

const stock = express.Router();
const prisma = new PrismaClient();

//Get all stocks details
stock.get("/", async (req, res) => {
  const stocks = await prisma.stockdetails.findMany({
    include: {
      product: {
        include: {
          shoeshascolors: {
            include: {
              shoes: {
                include: {
                  brand: true,
                  shoeshascategory: {
                    include: {
                      category: true,
                    },
                  },
                },
              },
              colors: true,
            },
          },
          sizes: true,
        },
      },
    },
  });

  //   const stockDetails = stocks.map((stock) => {
  //     return {
  //       id: stock.id,
  //       productId: stock.Product_id,
  //       price: stock.selling_price,
  //       product: {
  //         id: stock.product.id,
  //         name: stock.product.shoeshascolors.shoes.name,
  //         shoeshascolors: stock.product.shoeshascolors.map((shoeHasColor:any) => {
  //           return {
  //             id: shoeHasColor.id,
  //             shoeId: shoeHasColor.shoeId,
  //             shoe: {
  //               id: shoeHasColor.shoes.id,
  //               name: shoeHasColor.shoes.name,
  //               brand: shoeHasColor.shoes.brand,
  //               category: shoeHasColor.shoes.shoeshascategory.map(
  //                 (shoeHasCategory:any) => {
  //                   return {
  //                     id: shoeHasCategory.category.id,
  //                     name: shoeHasCategory.category.name,
  //                   };
  //                 }
  //               ),
  //               colors: shoeHasColor.colors.map((color:any) => {
  //                 return {
  //                   id: color.id,
  //                   name: color.name,
  //                 };
  //               }),
  //             },
  //           };
  //         }),
  //         sizes: stock.product.sizes.map((size:any) => {
  //           return {
  //             id: size.id,
  //             size: size.size,
  //           };
  //         }),
  //       },
  //       stock: stock.stock,
  //     };
  //   });
  res.json({
    message: "success",
    data: stocks,
  });
});

//Get product id using brand, category, shoe name, color, size
stock.post("/product", async (req, res) => {
  try {
    const existingProduct = await prisma.product.findFirst({
      where: {
        sizes: {
          size: req.body.selectedSize,
        },
        shoeshascolors: {
          shoes: {
            name: req.body.selectedName,
            brand: {
              name: req.body.selectedBrand,
            },
            shoeshascolors: {
              some: {
                colors: {
                  name: req.body.selectedColor,
                },
              },
            },
            shoeshascategory: {
              some: {
                category: {
                  name: req.body.selectedCategory,
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (existingProduct) {
      res.json({
        message: "success",
        data: existingProduct,
      });
      return;
    }

    ///If product does not exist, create a new product
    const existingShoe = await prisma.shoes.findFirst({
      where: {
        name: req.body.selectedName,
        brand_id: req.body.brand,
        shoeshascategory: {
          some: {
            Category_id: req.body.category,
          },
        },
      },
    });

    if (existingShoe) {
      const product = await prisma.product.create({
        data: {
          shoeshascolors: {
            create: {
              shoes: {
                connect: {
                  id: existingShoe.id,
                },
              },
              colors: {
                connect: {
                  id: req.body.color,
                },
              },
            },
          },
          sizes: {
            connect: {
              id: req.body.size,
            },
          },
        },
      });

      res.json({
        message: "success",
        data: product,
      });
    } else {
      const product = await prisma.product.create({
        data: {
          shoeshascolors: {
            create: {
              shoes: {
                create: {
                  brand: {
                    connect: {
                      id: req.body.brand,
                    },
                  },
                  name: req.body.selectedName,
                  shoeshascategory: {
                    create: {
                      category: {
                        connectOrCreate: {
                          where: { id: req.body.category },
                          create: { name: req.body.selectedCategory },
                        },
                      },
                    },
                  },
                },
              },
              colors: {
                connect: {
                  id: req.body.color,
                },
              },
            },
          },
          sizes: {
            connect: {
              id: req.body.size,
            },
          },
        },
      });

      res.json({
        message: "success",
        data: product,
      });
    }
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Create a new stock with stock details
stock.post("/", async (req, res) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      //Create a new stock
      const newStock = await prisma.stock.create({
        data: {
          bought_at: new Date(),
          paid_amount: req.body.paidAmount,
          stock_value: req.body.total,
          Supplier_id: req.body.supplierID,
          StockManager_id: req.body.stockManagerID || 1, //default stock manager need to be changed
        },
      });

      //Create stock details
      const items = req.body.items;
      const stockDetails = items.map((item: any) => ({
        qty: item.qty,
        buying_price: item.buyingPrice,
        selling_price: item.sellingPrice,
        Product_id: item.id,
        Stock_id: newStock.id,
        barcode: "",
      }));

      await prisma.stockdetails.createMany({
        data: stockDetails,
      });

      // Retrieve the newly created stock details
      const createdStockDetailsRecords = await prisma.stockdetails.findMany({
        where: {
          Stock_id: newStock.id,
        },
      });

      // Update each stock detail with its id as barcode
      const updateStockdetails = createdStockDetailsRecords.map((detail) => {
        return prisma.stockdetails.update({
          where: { id: detail.id },
          data: { barcode: detail.id.toString() },
        });
      });

      await Promise.all(updateStockdetails);
      return newStock;
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
export const Stock = stock;
