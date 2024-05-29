import {z} from 'zod';

export const addColorSchema = z.object({
    color: z.string().min(2,"Must be a valid color name").max(10,"Must be a less than 10 characters"),
    });