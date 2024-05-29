import { z } from "zod";

export const addProductSchema = z.object({
  size: z.string().min(1, "Must be a valid size").max(2),
  color: z.string().min(1, "Must be a valid color"),
  brand: z.number().min(1,'Must select one'),
  name: z.string().min(3,'Must be at least 3 characters'),
  selectedSize: z.string().nonempty('Must select a size')
});
