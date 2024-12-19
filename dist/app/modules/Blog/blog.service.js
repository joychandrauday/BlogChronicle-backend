"use strict";
// 4.service
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
exports.blogService = void 0;
const blog_model_1 = require("./blog.model");
// create a new blog
const addAnewBlog = (blog) => __awaiter(void 0, void 0, void 0, function* () {
    // Save blog to the database
    const result = yield blog_model_1.blogModel.create(blog);
    return result;
});
// get all blogs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getblogs = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = {}, sort = {}) {
    return yield blog_model_1.blogModel
        .find(query) // Apply query filters
        .sort(sort) // Apply sorting
        .populate("author", "name email"); // Populate author details (optional)
});
// delete blog by id
const deleteBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.blogModel.findByIdAndDelete(id);
    return result;
});
// update blog by id
const updateBlogInDB = (id, updatedBlog) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(updatedBlog);
    const result = yield blog_model_1.blogModel.findByIdAndUpdate(id, updatedBlog, { new: true });
    return result;
});
// sending all to controller
exports.blogService = {
    addAnewBlog,
    getblogs,
    updateBlogInDB,
    deleteBlogById,
};
