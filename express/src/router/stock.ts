import express from "express";
import { PrismaClient } from "@prisma/client";

const stock = express.Router();
const prisma = new PrismaClient();

//Get all stocks details
stock.get("/", async (req, res) => {
  try {
    const products = await prisma.stockdetails.findMany({
      where: {
        qty: {
          gt: 0, //get only products with quantity greater than 0
        },
      },
      orderBy: {
        id: "asc",
      },
      include: {
        product: {
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
        },
      },
    });

    //format the data
    const result = products.map((product) => ({
      id: product.id,
      qty: product.qty,
      buyingPrice: product.buying_price,
      sellingPrice: product.selling_price,
      barcode: product.barcode,
      product: {
        id: product.product.id,
        name: product.product.shoeshascolors.shoes.name,
        brand: product.product.shoeshascolors.shoes.brand.name,
        category:
          product.product.shoeshascolors.shoes.shoeshascategory[0].category
            .name,
        color: product.product.shoeshascolors.colors.name,
        size: product.product.sizes.size,
        length: product.product.sizes.length,
      },
    }));

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

//Get stock details by brand
stock.get("/brand/:brand", async (req, res) => {
  const brand = req.params.brand;
  try {
    const products = await prisma.stockdetails.findMany({
      where: {
        qty: {
          gt: 0, //get only products with quantity greater than 0
        },
        product: {
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
      },
      include: {
        product: {
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
        },
      },
    });

    //format the data

    const result = products.map((product) => ({
      id: product.id,
      qty: product.qty,
      buyingPrice: product.buying_price,
      sellingPrice: product.selling_price,
      barcode: product.barcode,
      product: {
        id: product.product.id,
        name: product.product.shoeshascolors.shoes.name,
        brand: product.product.shoeshascolors.shoes.brand.name,
        category:
          product.product.shoeshascolors.shoes.shoeshascategory[0].category
            .name,
        color: product.product.shoeshascolors.colors.name,
        size: product.product.sizes.size,
        length: product.product.sizes.length,
      },
    }));

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

//Get stock details by name
stock.get("/name/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const products = await prisma.stockdetails.findMany({
      where: {
        qty: {
          gt: 0, //get only products with quantity greater than 0
        },
        product: {
          shoeshascolors: {
            shoes: {
              name: {
                contains: name,
              },
            },
          },
        },
      },
      include: {
        product: {
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
        },
      },
    });

    //format the data
    const result = products.map((product) => ({
      id: product.id,
      qty: product.qty,
      buyingPrice: product.buying_price,
      sellingPrice: product.selling_price,
      barcode: product.barcode,
      product: {
        id: product.product.id,
        name: product.product.shoeshascolors.shoes.name,
        brand: product.product.shoeshascolors.shoes.brand.name,
        category:
          product.product.shoeshascolors.shoes.shoeshascategory[0].category
            .name,
        color: product.product.shoeshascolors.colors.name,
        size: product.product.sizes.size,
        length: product.product.sizes.length,
      },
    }));

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

//Get stock details by product id
stock.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const product = await prisma.stockdetails.findMany({
      where: {
        qty: {
          gt: 0, //get only products with quantity greater than 0
        },
        Product_id: id,
      },
      include: {
        product: {
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
        },
      },
    });

    //format the data
    const result = product.map((product) => ({
      id: product.id,
      qty: product.qty,
      buyingPrice: product.buying_price,
      sellingPrice: product.selling_price,
      barcode: product.barcode,
      product: {
        id: product.product.id,
        name: product.product.shoeshascolors.shoes.name,
        brand: product.product.shoeshascolors.shoes.brand.name,
        category:
          product.product.shoeshascolors.shoes.shoeshascategory[0].category
            .name,
        color: product.product.shoeshascolors.colors.name,
        size: product.product.sizes.size,
        length: product.product.sizes.length,
      },
    }));

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

    res.json({
      message: "Product does not exist! Add product first!",
      data: null,
    });

    ///If product does not exist, create a new product
    // const existingShoe = await prisma.shoes.findFirst({
    //   where: {
    //     name: req.body.selectedName,
    //     brand_id: req.body.brand,
    //     shoeshascategory: {
    //       some: {
    //         Category_id: req.body.category,
    //       },
    //     },
    //   },
    // });

    // if (existingShoe) {
    //   const product = await prisma.product.create({
    //     data: {
    //       shoeshascolors: {
    //         create: {
    //           shoes: {
    //             connect: {
    //               id: existingShoe.id,
    //             },
    //           },
    //           colors: {
    //             connect: {
    //               id: req.body.color,
    //             },
    //           },
    //         },
    //       },
    //       sizes: {
    //         connect: {
    //           id: req.body.size,
    //         },
    //       },
    //       images: {
    //         create: {
    //           path: req.body.image || "default.jpg",
    //         },
    //       },
    //     },
    //   });

    //   res.json({
    //     message: "success",
    //     data: product,
    //   });
    // } else {
    //   const product = await prisma.product.create({
    //     data: {
    //       shoeshascolors: {
    //         create: {
    //           shoes: {
    //             create: {
    //               brand: {
    //                 connect: {
    //                   id: req.body.brand,
    //                 },
    //               },
    //               name: req.body.selectedName,
    //               shoeshascategory: {
    //                 create: {
    //                   category: {
    //                     connectOrCreate: {
    //                       where: { id: req.body.category },
    //                       create: { name: req.body.selectedCategory },
    //                     },
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //           colors: {
    //             connect: {
    //               id: req.body.color,
    //             },
    //           },
    //         },
    //       },
    //       sizes: {
    //         connect: {
    //           id: req.body.size,
    //         },
    //       },
    //     },
    //   });

    //   res.json({
    //     message: "success",
    //     data: product,
    //   });
    //}
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
          StockManager_id: req.body.stockManagerID || 0,
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
