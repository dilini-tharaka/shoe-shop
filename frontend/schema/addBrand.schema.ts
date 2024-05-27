import {z} from 'zod';

export const addBrandSchema = z.object({
    name: z.string().min(3,'Must be at least 3 characters'),
});


