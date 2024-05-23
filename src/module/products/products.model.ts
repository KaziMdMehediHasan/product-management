import { Schema, model } from 'mongoose';
import { TProduct, TVariant, TInventory } from './products.interface';

const variantSchema = new Schema<TVariant>({
    type: { type: String, required: true },
    value: { type: String, required: true },
}, { _id: false })

const inventorySchema = new Schema<TInventory>({
    quantity: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true }
}, { _id: false })

const productSchema = new Schema<TProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: {
        type: [String],
        required: true
    },
    variants: {
        type: [variantSchema],
        required: true
    },
    inventory: inventorySchema
}, { versionKey: false })

export const Products = model<TProduct>('products', productSchema);