import { z } from "zod";

export const addProductSchema = z.object({
  size: z.string(),
  color: z.string(),
  brand: z.string(),
  name: z.string(),
});
