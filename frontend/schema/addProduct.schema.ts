import { z } from "zod";

export const addProductSchema = z.object({
  size: z.string().nonempty(),
  color: z.string().nonempty(),
  brand: z.string().nonempty(),
  name: z.string().nonempty(),
});
