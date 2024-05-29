import {z} from "zod";

export const addSizeSchema = z.object({
  length: z.string().nonempty("Please enter UK size"),
  size: z.number({
    required_error: "Size is required",
    invalid_type_error: "Size must be a number",
  }).min(1, "Size must be greater than 0").
  max(100, "Size must be less than 100"),
});