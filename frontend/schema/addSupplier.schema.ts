import {z} from 'zod';

export const addSupplierSchema = z.object({
    name: z.string().min(3,'Must be at least 3 characters'),
    mobile: z.string().min(10,'Must be a valid number').max(10),
    email: z.string().email(),
    address: z.string().nonempty('Must be a valid address'),
    selectedDistrict: z.string(),
    accountHolderName: z.string().min(3,'Must be at least 3 characters'),
    selectedBank: z.string().nonempty(),
    branch: z.string().nonempty('required'),
    accountNumber: z.string().nonempty('valid account number required'),
});