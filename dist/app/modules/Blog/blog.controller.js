"use strict";
// 3. Controller
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
exports.blogController = void 0;
const blog_service_1 = require("./blog.service");
const error_1 = require("../Error/error");
const blog_model_1 = require("./blog.model");
// adding blog to database
const addingBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogData = Object.assign({}, req.body);
        const addedBlog = yield blog_service_1.blogService.addAnewBlog(blogData);
        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            statusCode: 201,
            data: {
                _id: addedBlog._id,
                title: addedBlog.title,
                content: addedBlog.content,
                author: addedBlog.author,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
// getting blogs from database
const gettingblogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, sortBy = "createdAt", sortOrder = "desc", filter } = req.query;
        // Build the query object
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } }, // Case-insensitive search in title
                { content: { $regex: search, $options: "i" } }, // Case-insensitive search in content
            ];
        }
        if (filter) {
            query.author = filter; // Filter by author ID
        }
        // Build sort object
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === "asc" ? 1 : -1; // Ascending or Descending
        }
        // Fetch blogs with query, sort, and filter
        const blogs = yield blog_service_1.blogService.getblogs(query, sort);
        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            statusCode: 200,
            data: blogs,
        });
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
});
// getting single blog
const gettingSingleBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_service_1.blogService.getBlogById(req.params.id);
        if (!blog) {
            throw new error_1.NotFoundError("Blog not found");
        }
        res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            statusCode: 200,
            data: blog,
        });
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
});
// get blogs by author id
const gettingBlogsByAuthorId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id);
        const blogs = yield blog_model_1.blogModel.find({ author: req.params.id });
        if (!blogs.length) {
            throw new error_1.NotFoundError("No blogs found for this author");
        }
        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            statusCode: 200,
            data: blogs,
        });
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
});
// deleting blog from the database 
const deletingBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blog_service_1.blogService.deleteBlogById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            statusCode: 200,
        });
    }
    catch (error) {
        next(error);
    }
});
// admin access to delete any blog by id
const deletingAnyBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            throw new error_1.AuthenticationError("User not authenticated");
        }
        const blog = yield blog_model_1.blogModel.findById(req.params.id);
        if (!blog) {
            res.status(404).json({
                success: true,
                message: "Blog Not found",
                statusCode: 404,
            });
        }
        yield blog_service_1.blogService.deleteBlogById(blog === null || blog === void 0 ? void 0 : blog.id);
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            statusCode: 200,
        });
    }
    catch (error) {
        next(error);
    }
});
// update blog by id
const updatingBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_model_1.blogModel.findById(req.params.id);
        if (!blog) {
            throw new error_1.NotFoundError("Blog not found");
        }
        console.log(req.body);
        const updatedBlog = yield blog_service_1.blogService.updateBlogInDB(req.params.id, req.body);
        console.log(updatedBlog);
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            statusCode: 200,
            data: updatedBlog,
        });
    }
    catch (error) {
        next(error);
    }
});
// sending to routes
exports.blogController = {
    addingBlog,
    gettingblogs,
    gettingSingleBlog,
    deletingBlog,
    deletingAnyBlog,
    updatingBlog,
    gettingBlogsByAuthorId
};
