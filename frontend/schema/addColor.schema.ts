import {z} from 'zod';

export const addColorSchema = z.object({
    color: z.string().nonempty().min(2,"Must be at least 2 characters"),
    });