"use strict";
// 1. Sending requests to db from client
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const globalErrorHandler_1 = require("./app/modules/Error/globalErrorHandler");
const user_routes_1 = require("./app/modules/User/user.routes");
const auth_routes_1 = require("./app/modules/Auth/auth.routes");
const blog_routes_1 = require("./app/modules/Blog/blog.routes");
const project_routes_1 = require("./app/modules/Project/project.routes");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
const allowedOrigins = ['http://localhost:3000']; // or use a regex if you have multiple origins
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the origin
        }
        else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials (cookies, headers, etc.)
}));
app.use(body_parser_1.default.json());
// Default route
app.get('/', (req, res) => {
    res.send('Hello World from Blog Chronicle  backend!!!');
});
// //appllication routes
app.use('/api/auth', auth_routes_1.authRoutes); // order routes
app.use('/api/users', user_routes_1.userRoutes); // product routes
app.use('/api/blogs', blog_routes_1.blogRoutes); // order routes
app.use('/api/admin', user_routes_1.userRoutes);
app.use('/api/projects', project_routes_1.projectRoutes);
app.use((err, req, res, next) => {
    (0, globalErrorHandler_1.errorHandler)(err, req, res, next); //+
});
exports.default = app;
