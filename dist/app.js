"use strict";
// 1. Sending requests to db from client
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_routes_1 = require("./app/modules/Products/product.routes");
const order_routes_1 = require("./app/modules/Orders/order.routes");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Default route
app.get('/', (req, res) => {
    res.send('Hello World frpm stationary backend!!!');
});
//appllication routes
app.use('/api/products', product_routes_1.productRoutes); // product routes
app.use('/api/orders', order_routes_1.orderRoutes); // order routes
exports.default = app;
