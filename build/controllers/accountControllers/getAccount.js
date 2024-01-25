"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBankAccount = void 0;
const bankModel_1 = __importDefault(require("../../models/bankAccountModel/bankModel"));
const getUserBankAccount = async (request, response) => {
    try {
        const userId = request.user.id;
        const userBankDetails = await bankModel_1.default.findOne({ where: { owner_id: userId } });
        if (!userBankDetails) {
            return response.status(404).json({
                status: `error`,
                message: `No Bank Account Found`,
            });
        }
        return response.status(200).json({
            status: "success",
            method: request.method,
            message: `Bank Account found successfully`,
            userBankDetails
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(400).json({
            status: "error",
            method: request.method,
            message: "Internal Server Error",
        });
    }
};
exports.getUserBankAccount = getUserBankAccount;
