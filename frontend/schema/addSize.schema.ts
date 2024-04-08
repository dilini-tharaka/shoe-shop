import {z} from "zod";

export const addSizeSchema = z.object({
  sizeUK: z.string().nonempty("Please enter UK size"),
  toe: z.number().min(10, "Please enter a valid number"),
});