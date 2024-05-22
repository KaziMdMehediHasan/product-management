import { z } from 'zod';

const TVariantValidationSchema = z.object({
    type: z.string().min(1, { message: 'Variant cannot be empty' }).max(10, { message: 'Variant type should not exceed 10 characters' }),
    value: z.string().min(1, { message: 'Provide some value information' }).max(10, { message: 'Variant value should not exceed 10 characters' }),
});

// Define the TInventory type
const TInventoryValidationSchema = z.object({
    quantity: z.number().nonnegative({ message: 'Quantity cannot be negative' }),
    inStock: z.boolean({
        required_error: "inStock is required",
        invalid_type_error: "inStock must be a boolean",
    })
});

// Define the TProduct type
const ProductValidationSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(1, { message: "Must be 1 or more characters long" }).max(20, { message: 'Product name must not exceed 20 characters' }),
    description: z.string().min(10, { message: "Product must have at least 5 characters long description" }).max(150, { message: "Product description should not exceed 150 characters" }),
    price: z.number().nonnegative({ message: 'Price cannot be negative' }),
    category: z.string({
        required_error: "category for the product is required",
    }),
    tags: z.array(z.string()),
    variants: z.array(TVariantValidationSchema),
    inventory: TInventoryValidationSchema,
});

export default ProductValidationSchema;
