import { TProduct } from "../products/products.interface";
import { Products } from "../products/products.model";
import { Orders } from "./orders.model";

const createAnOrderToDB = async (id: string, quantity: number) => {

    const orderedProduct = await Products.findOne({ _id: id }) as TProduct;

    return orderedProduct;
}


const updateProductQuantity = async (id: string, quantity: number) => {
    console.log('Id From service', id);
    console.log('Quantity From service', quantity);
    const updateProductInventory = await Products.findByIdAndUpdate(
        { _id: id },
        { $inc: { "inventory.quantity": -quantity } },
        { new: true }
    );

    return updateProductInventory;
}

const fetchAllOrdersFromDB = async () => {
    const result = await Orders.find();
    return result;
}

const fetchOrdersByEmailFromDB = async (query: string) => {
    const result = await Orders.findOne({
        email: query
    });
    return result;
}

export const OrdersServices = {
    createAnOrderToDB,
    fetchAllOrdersFromDB,
    fetchOrdersByEmailFromDB,
    updateProductQuantity
}