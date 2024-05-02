import {z} from "zod"

export const posSchema = z.object({
    id: z.string().nonempty('id is required'),
    quantity: z.number().int().min(1, 'quantity must be greater than 0'),
});

