"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccount = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const uuid_1 = require("uuid");
const bankModel_1 = __importDefault(require("../../models/bankAccountModel/bankModel"));
const addAccount = async (request, response) => {
    try {
        const userId = request.user.id;
        const { bank_name, account_name, account_number } = request.body;
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        if (!userId) {
            return response.status(400).json({
                status: "error",
                message: "Invalid user ID",
            });
        }
        if (!user) {
            return response.status(404).json({
                status: "error",
                message: "You have to login to report this event",
            });
        }
        const testBank = await bankModel_1.default.findOne({ where: { owner_id: userId } });
        if (testBank) {
            return response.status(200).json({
                status: `error`,
                message: `You have already added a bank account, you can edit your account details`,
            });
        }
        const userAccount = await bankModel_1.default.create({
            id: (0, uuid_1.v4)(),
            owner_id: user.id,
            owner_name: user.user_name,
            bank_name,
            account_name,
            account_number,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const findAccount = await bankModel_1.default.findOne({ where: { id: userAccount.id } });
        if (!findAccount) {
            return response.status(400).json({
                status: `error`,
                message: `Account not successfully added`,
            });
        }
        const updateUser = await userModel_1.default.update({ isAddAccount: true }, { where: { id: userId } });
        const newUser = await userModel_1.default.findOne({ where: { id: userId } });
        return response.status(200).json({
            status: `success`,
            message: `Account successfully added`,
            findAccount,
            user: newUser
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
exports.addAccount = addAccount;
