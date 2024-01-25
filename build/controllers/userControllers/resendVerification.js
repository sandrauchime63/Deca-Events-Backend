"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendVerification = void 0;
const notification_1 = require("../../utilities/notification");
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const helpers_1 = require("../../helpers/helpers");
const resendVerification = async (request, response) => {
    try {
        const { email } = request.body;
        const user = (await userModel_1.default.findOne({
            where: { email },
        }));
        if (user.isVerified) {
            return response.status(404).json({
                status: `error`,
                message: `Your are already verified`,
            });
        }
        const token = (0, helpers_1.generateRegisterToken)({
            id: user.id,
            email: user.email,
        });
        await (0, notification_1.sendMail)(user.email, token);
        return response.status(200).json({
            status: `success`,
            message: `A verification link has been sent to your email`,
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Verification failed`,
        });
    }
};
exports.resendVerification = resendVerification;
