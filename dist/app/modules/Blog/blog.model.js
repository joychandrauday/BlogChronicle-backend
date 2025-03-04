"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogModel = void 0;
// 5.Model
// Blog Model:
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
    featuredImage: { type: String, default: 'https://designshack.net/wp-content/uploads/placeholder-image.png' }
}, {
    timestamps: true,
});
exports.blogModel = (0, mongoose_1.model)('Blog', blogSchema);
