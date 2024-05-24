import {z} from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(3,"Must be at least 3 characters"),
    lastName: z.string().min(3,"Must be at least 3 characters"),
    email: z.string().email(),
    password: z.string().min(8,"Must be at least 8 characters"),
});