"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBlog = exports.blogValidationSchema = void 0;
const zod_1 = require("zod");
// Updated blog validation schema
exports.blogValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    content: zod_1.z.string().min(1, "Content is required"),
    isPublished: zod_1.z.boolean().default(true),
    author: zod_1.z.string().nonempty("Author is required"), // Ensure author is a non-empty string
});
// Validation function
const validateBlog = (data) => {
    return exports.blogValidationSchema.safeParse(data);
};
exports.validateBlog = validateBlog;
