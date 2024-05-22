import { TProduct } from "./products.interface";
import { Products } from "./products.model";

const createProductDB = async (payLoad: TProduct) => {
    const result = await Products.create(payLoad);
    return result;
}

const fetchProductFromDB = async () => {
    const result = await Products.find();
    return result;
}

const fetchSingleProductFromDB = async (productId: string) => {
    const result = await Products.findOne({ _id: productId });
    return result;
}

const updateProductInfoDB = async (productId: string, updatedProductData: Partial<TProduct>) => {
    const result = await Products.findByIdAndUpdate(
        { _id: productId }, //finding the product
        { $set: updatedProductData }, //updating a field
        { new: true }

    )
    return result;
}

const deleteProductFromDB = async (productId: string) => {
    const result = await Products.findByIdAndDelete({ _id: productId });
    return result;
}
export const ProductServices = {
    createProductDB,
    fetchProductFromDB,
    fetchSingleProductFromDB,
    updateProductInfoDB,
    deleteProductFromDB
}