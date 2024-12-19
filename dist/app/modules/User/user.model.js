"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
// 5.Model
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    isBlocked: { type: Boolean, default: false },
}, { timestamps: true });
exports.userModel = (0, mongoose_1.model)('User', userSchema);
