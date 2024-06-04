import { z } from "zod";

export const addStockSchema = z.object({
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
