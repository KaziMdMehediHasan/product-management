import { TProduct } from "./products.interface";
import { Products } from "./products.model";

// creating a product
const createProductDB = async (payLoad: TProduct) => {
    const result = await Products.create(payLoad);
    return result;
}

// getting all products from the database
const fetchProductFromDB = async () => {
    const result = await Products.find();
    return result;
}

// searching for a product by name or description
const fetchProductWithQuery = async (query: string) => {
    let regexVar = `${query}`;
    console.log(regexVar);
    const result = await Products.find(
        {
            $or: [
                { name: { $regex: regexVar, $options: 'i' } }, { description: { $regex: regexVar, $options: 'i' } }
            ]
        }
    )
    return result;
}

// find a product by id
const fetchSingleProductFromDB = async (productId: string) => {
    const result = await Products.findOne({ _id: productId });
    return result;
}

// update product information after finding it by id
const updateProductInfoDB = async (productId: string, updatedProductData: Partial<TProduct>) => {
    const result = await Products.findByIdAndUpdate(
        { _id: productId }, //finding the product by id
        { $set: updatedProductData }, //updating the document
        { new: true } //I've used this option to make sure updated data is visible after each request

    )
    return result;
}

//deleting a product
const deleteProductFromDB = async (productId: string) => {
    const result = await Products.findByIdAndDelete({ _id: productId });
    return result;
}

export const ProductServices = {
    createProductDB,
    fetchProductFromDB,
    fetchSingleProductFromDB,
    updateProductInfoDB,
    deleteProductFromDB,
    fetchProductWithQuery
}