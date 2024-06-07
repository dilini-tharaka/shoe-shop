import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,"Must contain at least 8 characters")
});

export const employeeLoginSchema = z.object({
    username: z.string().min(3,"Must contain at least 3 characters"),
    password: z.string().min(8,"Must contain at least 8 characters")
});