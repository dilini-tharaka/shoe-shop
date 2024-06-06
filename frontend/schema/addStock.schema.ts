import { z } from "zod";

export const getProductSchema = z.object({
  brand: z.number().min(1),
  size: z.number().min(1),
  color: z.number().min(1),
  name: z.number().min(1),
  category: z.number().min(1),
  selectedBrand: z.string().nonempty("Must select a brand"),
  selectedSize: z.string().nonempty("Must select a size"),
  selectedColor: z.string().nonempty("Must select a color"),
  selectedName: z.string().nonempty("Must select a name"),
  selectedCategory: z.string().nonempty("Must select a category"),
});

export const addItemSchema = z.object({
  productID: z.number().min(1),
  buyingPrice: z.number().min(1, "Must be greater than 0"),
  sellingPrice: z.number().min(1, "Must be greater than 0"),
  qty: z.number().int().min(1, "Must be greater than 0"),
});

export const addStockSchema = z.object({
  supplierID: z.number().int().min(1,"Valid supplier ID required"),
  paidAmount: z.number().min(1, "Must be greater than 0"),
});


