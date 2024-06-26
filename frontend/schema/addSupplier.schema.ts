import {z} from 'zod';

export const addSupplierSchema = z.object({
    name: z.string().min(3,'Must be at least 3 characters'),
    mobile: z.string().regex(/^\d+$/, 'Must be a valid number').length(10, 'Must be exactly 10 digits'),
    email: z.string().email(),
    address: z.string().nonempty('Must be a valid address'),
    nic: z.string().min(10,'Must be a valid NIC').max(12),
    accountHolderName: z.string().min(3,'Must be at least 3 characters'),
    selectedBank: z.string().nonempty(),
    branch: z.string().nonempty('required'),
    accountNumber: z.string().nonempty('valid account number required'),
    checkedBrands: z.array(z.number()).nonempty('Must select at least one brand'),
});