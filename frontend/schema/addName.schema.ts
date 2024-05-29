import { z } from "zod";

export const addNameSchema = z.object({
  name: z.string().min(2, "Must be at least 2 characters"),
  brand_id: z.number().min(1,'Must select one'),
  category_id: z.array(z.number()).nonempty('Must select at least one category'),
});
