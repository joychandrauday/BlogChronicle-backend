"use strict";
// 4. Service
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
exports.authService = void 0;
const user_model_1 = require("../User/user.model");
// create a new user
const addUserToDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Save user to the database
    const result = yield user_model_1.userModel.create(user);
    return result;
});
// find one from the database
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findOne({ email });
    return user;
});
exports.authService = {
    addUserToDB,
    getUserByEmail
};
