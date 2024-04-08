import { z } from "zod";

export const addProductSchema = z.object({
  size: z.string().nonempty(),
  color: z.string().nonempty(),
  brand: z.string().nonempty(),
  name: z.string().min(3,'Must be at least 3 characters'),
});
