"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const user_validation_1 = require("../User/user.validation");
const user_model_1 = require("../User/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_service_1 = require("./auth.service");
const zod_1 = require("zod");
const error_1 = require("../Error/error");
const jwt_utils_1 = require("../Utilities/jwt.utils");
// 1. tegistering a new user to the database
const addUserToDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate user input using Zod
        const userData = user_validation_1.userValidationSchema.parse(req.body);
        // Check if the user already exists
        const existingUser = yield auth_service_1.authService.getUserByEmail(userData.email);
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists',
                status: false,
            });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
        // Create a new user
        const newUser = new user_model_1.userModel(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        const user = yield auth_service_1.authService.addUserToDB(newUser);
        console.log(user);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            statusCode: 201,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        // Handle errors (Zod validation or MongoDB-related errors)
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                statusCode: 400,
                errors: error.errors,
                stack: error.stack
            });
        }
        next(error); // Pass the error to the global error handler
    }
});
// log in user with password and emai address including jwt token
const logInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield auth_service_1.authService.getUserByEmail(email);
        if (!existingUser) {
            throw new error_1.AuthenticationError('Invalid credentials!');
        }
        const isMatch = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isMatch) {
            throw new error_1.AuthenticationError("Invalid credentials!");
        }
        const token = (0, jwt_utils_1.generateToken)({ id: existingUser._id, email: existingUser.email, role: existingUser.role });
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            statusCode: 200,
            data: {
                token
            },
        });
    }
    catch (error) {
        next(error); // Pass the error to the global error handler
    }
});
exports.authController = {
    addUserToDB,
    logInUser
};
