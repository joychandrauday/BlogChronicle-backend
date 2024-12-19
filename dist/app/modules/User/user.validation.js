"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.userValidationSchema = void 0;
// user.validation.ts
const zod_1 = require("zod");
// Define Zod schema for user validation
exports.userValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .min(1, "Email is required"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    role: zod_1.z.string().default("user"),
    isBlocked: zod_1.z.boolean().default(false),
});
// Validation function
const validateUser = (data) => {
    return exports.userValidationSchema.safeParse(data);
};
exports.validateUser = validateUser;
