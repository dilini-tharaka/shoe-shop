import express from "express";
import { PrismaClient } from "@prisma/client";

const supplier = express.Router();
const prisma = new PrismaClient();

//get all suppliers
supplier.get("/", async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        bankdetails: true,
        supplierhasbrands: {
          include: {
            brand: true,
          },
        },
      },
    });

    const suppliersWithBrands = suppliers.map((supplier) => ({
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      mobile: supplier.mobile,
      nic: supplier.nic,
      address: supplier.address,
      bankdetails: supplier.bankdetails,
      brands: supplier.supplierhasbrands.map((supplierhasbrand) => {
        return supplierhasbrand.brand.name;
      }),
    }));
    res.json({
      message: "success",
      data: suppliersWithBrands,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//get next supplier id
supplier.get("/nextid", async (req, res) => {
  try {
    const supplierID = await prisma.supplier.aggregate({
      _max: {
        id: true,
      },
    });

    // Calculate the next id by adding 1
    const nextId = (supplierID._max.id || 0) + 1;

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

//create a new supplier
supplier.post("/", async (req, res) => {
  // try {
  //   const supplier = await prisma.supplier.create({
  //     data: {
  //       name: req.body.name,
  //       email: req.body.email,
  //       mobile: req.body.mobile,
  //       nic: req.body.nic,
  //       address: req.body.address,
  //       created_at: new Date(),
  //       bankdetails: {
  //         create: {
  //           bank_name: req.body.selectedBank,
  //           branch: req.body.branch,
  //           account_no: req.body.accountNumber,
  //           account_owner: req.body.accountHolderName,
  //         },
  //       },
  //       supplierhasbrands: {
  //         create: req.body.checkedBrands.map((brandID: number) => ({
  //           brand: {
  //             connect: {
  //               id: brandID,
  //             },
  //           },
  //         })),
  //       },
  //     },
  //   });
  //   //console.log(req.body);
  //   res.json({
  //     message: "success",
  //     data: supplier,
  //   });
  // } catch (error: any) {
  //   res.json({
  //     message: "error",
  //     data: error.message,
  //   });
  // }

  try {
    const result = await prisma.$transaction(async (prisma) => {
      //create new supplier
      const supplier = await prisma.supplier.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          nic: req.body.nic,
          address: req.body.address,
          created_at: new Date(),
          bankdetails: {
            create: {
              bank_name: req.body.selectedBank,
              branch: req.body.branch,
              account_no: req.body.accountNumber,
              account_owner: req.body.accountHolderName,
            },
          },
          supplierhasbrands: {
            create: req.body.checkedBrands.map((brandID: number) => ({
              brand: {
                connect: {
                  id: brandID,
                },
              },
            })),
          },
        },
      });
      return supplier;
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

//get a single supplier using id
supplier.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      message: "success",
      data: supplier,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//get suppliers using name
supplier.get("/name/:name", async (req, res) => {
  try {
    const { name } = req.params;

    const supppliers = await prisma.supplier.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    res.json({
      message: "success",
      data: supppliers,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//get supplier using mobile number
supplier.get("/mobile/:mobile", async (req, res) => {
  try {
    const { mobile } = req.params;
    const supplier = await prisma.supplier.findFirst({
      where: {
        mobile: mobile,
      },
    });
    res.json({
      message: "success",
      data: supplier,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//update a supplier using id
supplier.patch("/:id", async (req, res) => {
  try {
    const bankDatails = await prisma.bankdetails.findFirst({
      where: {
        AND: [
          { bank_name: req.body.selectedBank },
          { branch: req.body.branch },
          { account_no: req.body.accountNumber },
          { account_owner: req.body.accountHolderName },
        ],
      },
    });

    const { id } = req.params;
    const supplier = await prisma.supplier.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        nic: req.body.nic,
        address: req.body.address,

        // Connect to existing bank details or create new ones if they don't exist
        bankdetails: {
          connect: bankDatails ? { id: bankDatails.id } : undefined,
          create: !bankDatails
            ? {
                bank_name: req.body.selectedBank,
                branch: req.body.branch,
                account_no: req.body.accountNumber,
                account_owner: req.body.accountHolderName,
              }
            : undefined,
        },
        supplierhasbrands: {
          create: req.body.checkedBrands.map((brandID: number) => ({
            brand: {
              connect: {
                id: brandID,
              },
            },
          })),
        },
      },
    });
    res.json({
      message: "success",
      data: supplier,
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

//delete a supplier using id
supplier.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await prisma.supplier.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      message: "successfully deleted",
    });
  } catch (error: any) {
    res.json({
      message: "error",
      data: error.message,
    });
  }
});

export const Supplier = supplier;

// {
//   "name": "Supplier Eight",
//   "email": "supplier8@example.com",
//   "mobile": "445578888",
//   "nic": "NIC8886",
//   "address": "88 Supplier St",

//   "bankdetails": {
//     "bank_name": "Bank A",
//     "branch": "Branch A",
//     "account_no": "1478952",
//     "account_owner": "Mr 8"
//   }
// }
