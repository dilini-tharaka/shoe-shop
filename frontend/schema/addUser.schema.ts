import {z} from "zod";

export const addUserSchema = z.object({
    firstName: z.string().min(2,'Must be at least 2 characters'),
    lastName: z.string().min(2,'Must be at least 2 characters'),
    mobile: z.number(),
    nic: z.string().min(9,'Must be at least 9 characters'),
    email: z.string().email(),
    userName: z.string().min(3,'Must be at least 3 characters'),
    password: z.string().min(8,'Must be at least 8 characters'),
    role: z.string().nonempty()
});