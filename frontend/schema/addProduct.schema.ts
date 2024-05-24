import { z } from "zod";

export const addProductSchema = z.object({
  size: z.string().min(1, "Must be at least 1 character"),
  color: z.string().min(1, "Must be at least 1 character"),
  brand: z.string().min(1, "Must be at least 1 character"),
  name: z.string().min(3,'Must be at least 3 characters'),
});
