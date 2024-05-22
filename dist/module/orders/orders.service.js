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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersServices = void 0;
const products_model_1 = require("../products/products.model");
const orders_model_1 = require("./orders.model");
const createAnOrderToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orderedProduct = yield products_model_1.Products.findOne({ _id: id });
    return orderedProduct;
});
const updateProductQuantity = (id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const updateProductInventory = yield products_model_1.Products.findByIdAndUpdate({ _id: id }, { $inc: { "inventory.quantity": -quantity } }, { new: true });
    return updateProductInventory;
});
const fetchAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Orders.find();
    return result;
});
const fetchOrdersByEmailFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Orders.find({
        email: query
    });
    return result;
});
exports.OrdersServices = {
    createAnOrderToDB,
    fetchAllOrdersFromDB,
    fetchOrdersByEmailFromDB,
    updateProductQuantity
};
