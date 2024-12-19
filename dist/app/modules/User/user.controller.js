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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const error_1 = require("../Error/error");
// adding user to database
const gettingUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Save the new user to the database
        const user = yield user_service_1.userService.getUsers();
        console.log(user);
        // Send success response
        res.status(201).json({
            message: 'User retrieve successfully',
            success: true,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
//get single user
const gettingSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_service_1.userService.getSingleUser(userId);
        // Send success response
        res.status(200).json({
            message: 'User retrieved successfully',
            success: true,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
// update user (block a user)
const blockUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // check if user is already blocked or exist
        const user = yield user_service_1.userService.getSingleUser(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                statusCode: 404,
            });
        }
        if (user.isBlocked) {
            return res.status(400).json({
                success: false,
                message: "User is already blocked",
                statusCode: 400,
            });
        }
        // // Update the `isBlocked` property to true
        const updatedUser = yield user_service_1.userService.editUser(userId, { isBlocked: true });
        if (!updatedUser) {
            throw new error_1.InternalServerError("Something went wrong!");
        }
        res.status(200).json({
            success: true,
            message: "User blocked successfully",
            statusCode: 200,
        });
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
});
// sending to routes
exports.userController = {
    gettingUsers,
    gettingSingleUser,
    blockUser
};
