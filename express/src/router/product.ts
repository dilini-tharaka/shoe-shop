import express from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";

const product = express.Router();
const prisma = new PrismaClient();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//Get all Brands
product.get("/brand", async (req, res) => {
  const brands = await prisma.brand.findMany();
  res.json({
    message: "success",
    data: brands,
  });
});

//get next brand id
product.get("/brand/nextid", async (req, res) => {
  try {
    const brandID = await prisma.brand.aggregate({
      _max: {
        id: true,
      },
    });

    const nextId = (brandID._max.id || 0) + 1;

    res.json({
      message: "success",
      data: nextId,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Create a new brand
product.post("/brand", async (req, res) => {
  try {
    const brand = await prisma.brand.create({
      data: {
        name: req.body.name,
      },
    });
    res.json({
      message: "success",
      data: brand,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Get all colors
product.get("/color", async (req, res) => {
  const colors = await prisma.colors.findMany();
  res.json({
    message: "success",
    data: colors,
  });
});

//Get color by id
product.get("/color/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const color = await prisma.colors.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      message: "success",
      data: color,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Create a new color
product.post("/color", async (req, res) => {
  try {
    const existingColor = await prisma.colors.findFirst({
      where: {
        name: req.body.color,
      },
    });
    if (existingColor) {
      res.json({
        message: "Already exists",
        data: existingColor,
      });
    } else {
      const color = await prisma.colors.create({
        data: {
          name: req.body.color,
        },
      });
      res.json({
        message: "success",
        data: color,
      });
    }
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Get all sizes
product.get("/size", async (req, res) => {
  const sizes = await prisma.sizes.findMany({
    orderBy: {
      size: "asc",
    },
  });
  res.json({
    message: "success",
    data: sizes,
  });
});

//Get size by id
product.get("/size/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const size = await prisma.sizes.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      message: "success",
      data: size,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Create a new size
product.post("/size", async (req, res) => {
  try {
    const size = await prisma.sizes.create({
      data: {
        size: String(req.body.size),
        length: req.body.length,
      },
    });
    res.json({
      message: "success",
      data: size,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Update a size using id
product.patch("/size/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const size = await prisma.sizes.update({
      where: {
        id: parseInt(id),
      },
      data: {
        size: req.body.size,
        length: req.body.length,
      },
    });
    res.json({
      message: "success",
      data: size,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Ger shoe category

product.get("/category", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json({
    message: "success",
    data: categories,
  });
});

//Get all shoes
product.get("/shoe", async (req, res) => {
  try {
    const shoes = await prisma.shoes.findMany({
      include: {
        brand: { select: { name: true } },
        shoeshascategory: {
          include: {
            category: { select: { name: true } },
          },
        },
      },
    });

    const ordererShoes = shoes.map((shoe) => ({
      id: shoe.id,
      name: shoe.name,
      brand: shoe.brand.name,
      category: shoe.shoeshascategory
        .map((cat) => cat.category.name)
        .join(", "),
    }));

    res.json({
      message: "success",
      data: ordererShoes,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Get shoe by id
product.get("/shoe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const shoe = await prisma.shoes.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        brand: { select: { name: true } },
        shoeshascategory: {
          include: {
            category: { select: { name: true } },
          },
        },
      },
    });

    res.json({
      message: "success",
      data: shoe,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Create a new shoe
product.post("/shoe", async (req, res) => {
  try {
    const shoe = await prisma.shoes.create({
      data: {
        brand: {
          connect: {
            id: req.body.brand_id,
          },
        },
        name: req.body.name,
        shoeshascategory: {
          create: req.body.category_id.map((cat_id: number) => ({
            category: {
              connect: {
                id: cat_id,
              },
            },
          })),
        },
      },
    });
    res.json({
      message: "success",
      data: shoe,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

// GET /product
product.get("/", async (req, res) => {
  try {
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
        stockdetails: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    // const ordererProducts = products.map((product) => ({
    //   id: product.id,
    //   size: product.sizes.size,
    //   length: product.sizes.length,
    //   color: product.shoeshascolors.colors.name,
    //   name: product.shoeshascolors.shoes.name,
    //   brand: product.shoeshascolors.shoes.brand.name,
    //   category:
    //     product.shoeshascolors.shoes.shoeshascategory &&
    //     product.shoeshascolors.shoes.shoeshascategory.length > 0
    //       ? product.shoeshascolors.shoes.shoeshascategory[0].category.name
    //       : 1, // Default value
    //   selling_price:
    //     product.stockdetails.length > 0
    //       ? product.stockdetails[0].selling_price
    //       : 0,
    //   qty: product.stockdetails.length > 0 ? product.stockdetails[0].qty : 0,
    // }));

    const orderedProducts = products.map((product) => {
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
      data: orderedProducts,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//Get Product Card Details
product.get("/card", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        sizes: { select: { size: true, length: true } },
        images: { select: { path: true } },
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

    // Map each product to the desired output format
    interface SizeDetail {
      size: string;
      length: string;
      color: string;
      price: number;
      available: number;
    }

    interface Product {
      id: number;
      wished: boolean;
      image: string;
      name: string;
      brand: string;
      category: string[];
      sizes: SizeDetail[];
    }

    interface ProductMap {
      [key: string]: Product;
    }

    const productMap: ProductMap = {};
    //Build a map of products by brand and name
    products.forEach((product) => {
      //const stockDetail = product.stockdetails[0] || {};
      const key = `${product.shoeshascolors.shoes.brand.name}-${product.shoeshascolors.shoes.name}`;

      if (!productMap[key]) {
        productMap[key] = {
          id: product.id,
          wished: false, // Default value
          image: product.images[0]?.path || "default.jpg",
          name: product.shoeshascolors.shoes.name,
          brand: product.shoeshascolors.shoes.brand.name,
          category: product.shoeshascolors.shoes.shoeshascategory.map(
            (cat) => cat.category.name
          ),
          sizes: [],
        };
      }

      let availableStock = product.stockdetails.find((stock) => stock.qty > 0);
      if (!availableStock) {
        availableStock = product.stockdetails[0] || {}; // If no available stock, take the first one (even if qty is 0)
      }

      productMap[key].sizes.push({
        size: product.sizes.size,
        length: product.sizes.length,
        color: product.shoeshascolors.colors.name,
        price: availableStock.selling_price || 0,
        available: availableStock.qty || 0,
      });
    });
    //   productMap[key].sizes.push({
    //     size: product.sizes.size,
    //     length: product.sizes.length,
    //     color: product.shoeshascolors.colors.name,
    //     price: stockDetail.selling_price || 0,
    //     available: stockDetail.qty || 0,
    //   });
    // });

    const formattedProducts = Object.values(productMap);

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

//Get next product id
product.get("/nextid", async (req, res) => {
  try {
    const productID = await prisma.product.aggregate({
      _max: {
        id: true,
      },
    });

    const nextId = (productID._max.id || 0) + 1;

    res.json({
      message: "success",
      data: nextId,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
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
product.post("/", upload.single("image"), async (req, res) => {
  const { size, selectedSize, color, selectedColor, brand, name, selectedName, category, selectedCategory } = req.body;
  try {
    console.log(req.file);
    if (!req.file) {
      res.json({
        message: "error",
        data: "No file uploaded",
      });
      return;
    }

    const existingShoe = await prisma.shoes.findFirst({
      where: {
        name: selectedName,
        brand_id: parseInt(brand),
        shoeshascategory: {
          some: {
            Category_id: parseInt(category),
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
                  id: parseInt(color),
                },
              },
            },
          },
          sizes: {
            connect: {
              id: parseInt(size),
            },
          },
          images: {
            create: {
              path: req.file.filename,
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
                      id: parseInt(brand),
                    },
                  },
                  name: selectedName,
                  shoeshascategory: {
                    create: {
                      category: {
                        connectOrCreate: {
                          where: { id: parseInt(category) },
                          create: { name: selectedCategory },
                        },
                      },
                    },
                  },
                },
              },
              colors: {
                connect: {
                  id: parseInt(color),
                },
              },
            },
          },
          sizes: {
            connect: {
              id: parseInt(size),
            },
          },
          images: {
            create: {
              path: req.file.filename,
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

//Update a product using id
product.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        shoeshascolors: {
          update: {
            colors: {
              connect: {
                id: req.body.color_id,
              },
            },
          },
        },
        sizes: {
          update: {
            id: req.body.size_id,
          },
        },
      },
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

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

// Get brand by id
product.get("/brand/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await prisma.brand.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      message: "success",
      data: brand,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});
//Export the router
export const Product = product;
