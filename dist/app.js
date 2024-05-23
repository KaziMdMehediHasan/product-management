"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./module/products/product.route");
const orders_route_1 = require("./module/orders/orders.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
// for products
app.use('/api/products', product_route_1.ProductRoutes);
// for orders
app.use('/api/orders', orders_route_1.OrderRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to Assignment-2 Server');
    console.log(req);
});
//handling wrong routes
app.use((req, res) => {
    res.status(404).send({
        "success": false,
        "message": "Route not found"
    });
});
exports.default = app;
