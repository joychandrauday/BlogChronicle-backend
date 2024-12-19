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
exports.userService = void 0;
const user_model_1 = require("./user.model");
// get all users
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.userModel.find();
    return users;
});
// edit a user
const editUser = (id, updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findByIdAndUpdate(id, updatedUser, { new: true });
    return user;
});
// get single user by id
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = user_model_1.userModel.findById(id);
    return user;
});
// sending all to controller
exports.userService = {
    getUsers,
    editUser,
    getSingleUser
};
