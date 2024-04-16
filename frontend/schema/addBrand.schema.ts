import { z } from "zod";

export const addBrandSchema = z.object({
  brand: z.string().min(2, "Must be at least 2 characters"),
});
