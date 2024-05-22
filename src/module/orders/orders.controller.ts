import { Request, Response } from "express";
import { OrdersServices } from "./orders.service";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const result = await OrdersServices.createAnOrderToDB(orderData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result
        })
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