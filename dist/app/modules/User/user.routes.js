"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
// 3. Router
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const jwt_utils_1 = require("../Utilities/jwt.utils");
const blog_controller_1 = require("../Blog/blog.controller");
const router = express_1.default.Router();
router.get('/', user_controller_1.userController.gettingUsers); // add order to db
router.get('/:id', user_controller_1.userController.gettingSingleUser); // add order to db
router.patch('/users/:userId/block', jwt_utils_1.verifyToken, jwt_utils_1.verifyAdmin, user_controller_1.userController.blockUser);
router.delete('/blogs/:id', jwt_utils_1.verifyToken, jwt_utils_1.verifyAdmin, blog_controller_1.blogController.deletingAnyBlog); // getting ll blogs from db
exports.userRoutes = router;
