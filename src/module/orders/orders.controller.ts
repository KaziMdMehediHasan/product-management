import { Request, Response } from "express";
import { OrdersServices } from "./orders.service";
import { Orders } from "./orders.model";
import { Products } from "../products/products.model";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const { productId, quantity } = orderData;

        // first we find the corresponding product

        const product = await OrdersServices.createAnOrderToDB(productId, quantity);

        // if the quantity is not 0 then we will create the order and update the quantity of that product
        if (product?.inventory.quantity !== 0) {
            const order = await Orders.create(orderData);
            // after we create the order, we will update the quantity of the product and stock status
            const updateProductQuantity = await Products.findByIdAndUpdate(
                { _id: product?._id },
                { $inc: { "inventory.quantity": -quantity } }, //this is the order quantity that is being deducted from the inventory
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: { order, updateProductQuantity }
            })
        } else {
            const updateProductInventory = await Products.findByIdAndUpdate(
                { _id: product?._id },
                { $set: { "inventory.inStock": false } }, //when the inventory is empty the stock will be false
                { new: true }
            );
            res.status(500).json({
                success: false,
                message: "Insufficient quantity available in inventory",
                data: { updateProductInventory }
            })
        }

    } catch (error) {
        console.log(error);
    }

}
const fetchOrder = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        console.log(email);
        if (req.query.hasOwnProperty("email") && typeof email === 'string' && email !== 'undefined') {
            const result = await OrdersServices.fetchOrdersByEmailFromDB(email);
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully for user email!",
                data: result
            })
        } else {
            const result = await OrdersServices.fetchAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result
            })
        }

    } catch (error) {
        console.log(error);
    }

}


export const OrderController = {
    createOrder,
    fetchOrder
}