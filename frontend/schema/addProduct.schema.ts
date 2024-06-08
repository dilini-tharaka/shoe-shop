import { z } from "zod";

export const addProductSchema = z.object({
  brand: z.number().min(1, "Must select one brand"),
  size: z.number().min(1),
  color: z.number().min(1),
  name: z.number().min(1),
  category: z.number().min(1),
  selectedSize: z.string().nonempty("Must select a size"),
  selectedColor: z.string().nonempty("Must select a color"),
  selectedName: z.string().nonempty("Must select a name"),
  selectedCategory: z.string().nonempty("Must select a category"),
});

export const imageSchema = z.object({
  name: z.string().nonempty("Must select a file"),
  _type: z.enum([
    "image/png",
    "image/jpeg",
    "image/svg+xml",
    "image/webp",
    "image/gif",
  ]),
  _size: z.number().max(50000000, "Maximum File size is 50MB"), //// 50 MB size limit
});
