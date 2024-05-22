import { TOrder } from "./orders.interface";
import { Orders } from "./orders.model";

const createAnOrderToDB = async (payload: TOrder) => {
    const result = await Orders.create(payload);
    return result;
}

const fetchAllOrdersFromDB = async () => {
    const result = await Orders.find();
    return result;
}

const fetchOrdersByEmailFromDB = async (query: string) => {
    const result = await Orders.find({
        email: query
    });
    return result;
}

export const OrdersServices = {
    createAnOrderToDB,
    fetchAllOrdersFromDB,
    fetchOrdersByEmailFromDB
}