"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEditAccount = void 0;
const bankModel_1 = __importDefault(require("../../models/bankAccountModel/bankModel"));
const userEditAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bank_name, account_name, account_number } = req.body;
        if (bank_name === "" && account_name === "" && account_number === "") {
            return res.status(400).json({
                status: `error`,
                message: `At least one field must be filled`
            });
        }
        const updatedUserFields = {};
        if (bank_name !== "") {
            updatedUserFields.bank_name = bank_name;
        }
        if (account_name !== "") {
            updatedUserFields.account_name = account_name;
        }
        if (account_number !== "") {
            updatedUserFields.account_number = account_number;
        }
        const updatedBank = (await bankModel_1.default.update(updatedUserFields, {
            where: { owner_id: userId },
        }));
        if (!updatedBank) {
            return res.status(400).json({
                status: "error",
                method: req.method,
                message: "Bank details not updated successfully",
            });
        }
        const bank = (await bankModel_1.default.findOne({
            where: { owner_id: userId },
        }));
        return res.status(200).json({
            status: "success",
            method: req.method,
            message: "Bank details updated successfully",
            bank
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            Error: "Internal Server Error",
        });
    }
};
exports.userEditAccount = userEditAccount;
