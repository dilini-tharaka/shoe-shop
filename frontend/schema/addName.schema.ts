import { z } from "zod";

export const addNameSchema = z.object({
  name: z.string().min(2, "Must be at least 2 characters"),
  brand: z.string().nonempty("Brand is required"),
  category: z.string().nonempty("Category is required"),
});
