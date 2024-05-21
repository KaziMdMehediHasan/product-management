export type TVariant = {
    type: string;
    value: string;
}
export type TInventory = {
    quantity: number;
    inStock: true;
}
export type TProduct = {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: Array<TVariant>;
    inventory: TInventory
}