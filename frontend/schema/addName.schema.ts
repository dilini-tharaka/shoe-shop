import { z } from "zod";

export const addNameSchema = z.object({
  name: z.string().min(2, "Must be at least 2 characters"),
  brand: z.number().min(1,'Must select one'),
  category: z.string().nonempty("Category is required"),
});
