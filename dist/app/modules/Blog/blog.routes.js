"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
// 3. Router
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const jwt_utils_1 = require("../Utilities/jwt.utils");
const router = express_1.default.Router();
router.post('/', jwt_utils_1.verifyToken, blog_controller_1.blogController.addingBlog); // add blog to db
router.get('/', blog_controller_1.blogController.gettingblogs); // getting ll blogs from db
router.get('/:id', blog_controller_1.blogController.gettingSingleBlog); // getting ll blogs from db
router.delete('/:id', jwt_utils_1.verifyToken, blog_controller_1.blogController.deletingBlog); // getting ll blogs from db
router.patch('/:id', jwt_utils_1.verifyToken, blog_controller_1.blogController.updatingBlog); // getting ll blogs from db
exports.blogRoutes = router;
