import {z} from "zod";

export const addUserSchema = z.object({
    firstName: z.string().min(2,'Must be at least 2 characters'),
    lastName: z.string().min(2,'Must be at least 2 characters'),
    mobile: z.string().regex(/^\d+$/, 'Must be a valid number').length(10, 'Must be exactly 10 digits'),
    nic: z.string().min(10,'Must be a valid NIC').max(12),
    email: z.string().email(),
    userName: z.string().min(3,'Must be at least 3 characters'),
    password: z.string().min(8,'Must be at least 8 characters'),
    selectedRole: z.string().nonempty('Must select a role')
});

export const updateUserSchema = z.object({
    firstName: z.string().min(2,'Must be at least 2 characters'),
    lastName: z.string().min(2,'Must be at least 2 characters'),
    mobile: z.string().regex(/^\d+$/, 'Must be a valid number').length(10, 'Must be exactly 10 digits'),
    nic: z.string().min(10,'Must be a valid NIC').max(12),
    email: z.string().email(),
    userName: z.string().min(3,'Must be at least 3 characters'),
    selectedRole: z.string().nonempty('Must select a role')
});




