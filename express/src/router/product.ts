import express from "express";
import { PrismaClient } from "@prisma/client";

const product = express.Router();
const prisma = new PrismaClient();

//Get all Brands
product.get("/brand", async (req, res) => {
  const brands = await prisma.brand.findMany();
  res.json({
    message: "success",
    data: brands,
  });
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
    const color = await prisma.colors.create({
      data: {
        name: req.body.name,
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

//Get all sizes
product.get("/size", async (req, res) => {
  const sizes = await prisma.sizes.findMany();
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
    res.json({
      message: "success",
      data: shoes,
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
        shoeshascategory:{
          create:{
            category:{
              connect:{
                id:req.body.category_id
              }
            }
          }
        }
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
      stockdetails:{select:{selling_price:true}}
    },
  });

  const ordererProducts = products.map((product) => ({
    id: product.id,
    size: product.sizes.size,
    length: product.sizes.length,
    color: product.shoeshascolors.colors.name,
    brand: product.shoeshascolors.shoes.brand.name,
  }));

  res.json({
    message: "success",
    data: products,
  });
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
product.post("/", async (req, res) => {
  try {
    const existingShoe = await prisma.shoes.findFirst({
      where: {
        name: req.body.name,
        brand_id: req.body.brand_id,
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
                  id: req.body.color_id,
                },
              },
            },
          },
          sizes: {
            connect: {
              id: req.body.size_id,
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
                      id: req.body.brand_id,
                    },
                  },
                  name: req.body.name,
                },
              },
              colors: {
                connect: {
                  id: req.body.color_id,
                },
              },
            },
          },
          sizes: {
            connect: {
              id: req.body.size_id,
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
