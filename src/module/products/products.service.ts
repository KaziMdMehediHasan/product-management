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

const updateProductInfoDB = async () => {

}

export const ProductServices = {
    createProductDB,
    fetchProductFromDB,
    fetchSingleProductFromDB
}