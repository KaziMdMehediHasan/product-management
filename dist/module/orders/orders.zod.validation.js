"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const OrderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'standard email format required' }),
    productId: zod_1.z.string({
        required_error: 'Product ID cannot be empty',
        invalid_type_error: 'Product ID must be a sting'
    }),
    price: zod_1.z.number().nonnegative({ message: "Price cannot be negative" }),
    quantity: zod_1.z.number().min(1, { message: "You must order at least one item" }),
});
exports.default = OrderValidationSchema;
