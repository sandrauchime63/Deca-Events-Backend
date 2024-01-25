"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCheck = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const userCheck = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = (await userModel_1.default.findOne({
            where: { email: email },
        }));
        if (!user) {
            return response.status(404).json({
                status: `Access denied`,
                message: `User with the email ${email} is not registered`,
            });
        }
        const validate = await bcryptjs_1.default.compare(password, user.password);
        if (!validate) {
            return response.status(400).json({
                status: `error`,
                message: `Invalid Password`,
            });
        }
        return response.status(200).json({
            message: `Details Correct`,
            user,
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(400).json({
            status: `error`,
            method: request.method,
            message: error.message,
        });
    }
};
exports.userCheck = userCheck;
