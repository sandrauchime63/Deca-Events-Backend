"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const verifyUser = async (request, response) => {
    try {
        const token = request.params.token;
        const decode = jsonwebtoken_1.default.verify(token, `${process.env.APP_SECRET}`);
        const userId = decode.id;
        const user = (await userModel_1.default.findOne({
            where: { id: userId },
        }));
        if (user) {
            await userModel_1.default.update({ isVerified: true }, { where: { id: userId } });
            return response.status(400).json({
                status: `success`,
                message: `You have been successfully Verified`,
            });
        }
        else {
            return response.status(400).json({
                status: `error`,
                message: `Verification failed`,
            });
        }
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
        });
    }
};
exports.verifyUser = verifyUser;
