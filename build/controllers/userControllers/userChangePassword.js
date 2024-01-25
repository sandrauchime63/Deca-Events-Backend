"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("../../helpers/helpers");
const changePassword = async (request, response) => {
    try {
        const { old_password, new_password, confirm_password } = request.body;
        const userId = request.user.id;
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        const validatePassword = await bcryptjs_1.default.compare(old_password, user.password);
        if (!validatePassword) {
            return response.status(400).json({
                status: `error`,
                message: `Wrong Password`,
            });
        }
        if (new_password === old_password) {
            return response.status(400).json({
                status: `error`,
                message: `Cannot use previous password`,
            });
        }
        if (new_password !== confirm_password) {
            return response.status(400).json({
                status: `error`,
                message: `Password Mismatch`,
            });
        }
        if (new_password.length < 6) {
            return response.status(400).json({
                status: `error`,
                message: `Password must be at least six (6) characters long`
            });
        }
        const hash = await (0, helpers_1.hashPassword)(new_password);
        const updatedUser = await userModel_1.default.update({ password: hash }, { where: { id: userId } });
        if (!updatedUser) {
            return response.status(400).json({
                status: `error`,
                message: `Unable to update password`,
            });
        }
        const findUser = await userModel_1.default.findOne({ where: { id: userId } });
        return response.status(200).json({
            status: `error`,
            message: `Password changed successfully`,
            data: findUser,
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
        });
    }
};
exports.changePassword = changePassword;
