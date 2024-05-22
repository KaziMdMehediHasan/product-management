"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const orders_service_1 = require("./orders.service");
const orders_model_1 = require("./orders.model");
const products_model_1 = require("../products/products.model");
const orders_zod_validation_1 = __importDefault(require("./orders.zod.validation"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        // validating order data using zod
        const validatedOrderData = orders_zod_validation_1.default.parse(orderData);
        const { productId, quantity: orderQuantity } = validatedOrderData;
        // first we find the corresponding product using the id we get from order data
        const product = yield orders_service_1.OrdersServices.createAnOrderToDB(productId);
        // if order quantity is bigger than product invenotry below code will run and handle the situation
        if ((product === null || product === void 0 ? void 0 : product.inventory.quantity) < orderQuantity) {
            res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
                data: { product }
            });
        }
        else {
            // if the quantity is not 0 then we will create the order and update the quantity of that product
            if ((product === null || product === void 0 ? void 0 : product.inventory.quantity) !== 0) {
                const order = yield orders_model_1.Orders.create(validatedOrderData);
                // after we create the order, we will update the quantity of the product and stock status
                const updateProductQuantity = yield products_model_1.Products.findByIdAndUpdate({ _id: product === null || product === void 0 ? void 0 : product._id }, { $inc: { "inventory.quantity": -orderQuantity } }, //this is the order quantity that is being deducted from the inventory
                { new: true });
                // after ordering if the product quantity is equals to zero the code block below will run and set the stock to false
                if ((updateProductQuantity === null || updateProductQuantity === void 0 ? void 0 : updateProductQuantity.inventory.quantity) === 0) {
                    yield products_model_1.Products.findByIdAndUpdate({ _id: product === null || product === void 0 ? void 0 : product._id }, { $set: { "inventory.inStock": false } }, //when the inventory stock is 0 the stock will be set to false
                    { new: true });
                }
                res.status(200).json({
                    success: true,
                    message: "Order created successfully!",
                    data: { order }
                });
            }
            else {
                const updateProductInventory = yield products_model_1.Products.findByIdAndUpdate({ _id: product === null || product === void 0 ? void 0 : product._id }, { $set: { "inventory.inStock": false } }, //when the inventory is empty the stock will be set to false
                { new: true });
                res.status(400).json({
                    success: false,
                    message: "Insufficient quantity available in inventory",
                    data: { updateProductInventory }
                });
            }
        }
    }
    catch (error) {
        res.status(403).json({
            message: error
        });
    }
});
const fetchOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        // checking if there's a query for single order based on email
        /*eslint no-prototype-builtins: "off"*/
        if (req.query.hasOwnProperty("email") && typeof email === 'string' && email !== 'undefined') {
            // if the email is there we will fetch the order for that specific user
            const result = yield orders_service_1.OrdersServices.fetchOrdersByEmailFromDB(email);
            // wrong email input will result in no data. Then we will show this error message
            if (!result) {
                res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: "Orders fetched successfully for user email!",
                    data: result
                });
            }
        }
        else {
            // this part of the code will show all the orders in the collection
            const result = yield orders_service_1.OrdersServices.fetchAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
});
exports.OrderController = {
    createOrder,
    fetchOrder
};
