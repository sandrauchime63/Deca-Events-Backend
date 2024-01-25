"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEditProfile = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const userEditProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { phone_number, address, state, zip_code } = req.body;
        console.log(req.body);
        console.log(userId);
        if (phone_number === "" && address === "" && state === "" && zip_code === "") {
            return res.status(400).json({
                status: `error`,
                message: `At least one field must be filled`
            });
        }
        const updatedUserFields = {};
        if (phone_number !== "") {
            updatedUserFields.phone_number = phone_number;
        }
        if (address !== "") {
            updatedUserFields.address = address;
        }
        if (state !== "") {
            updatedUserFields.state = state;
        }
        if (zip_code !== "") {
            updatedUserFields.zip_code = zip_code;
        }
        console.log(updatedUserFields);
        const updatedUser = (await userModel_1.default.update(updatedUserFields, {
            where: { id: userId },
        }));
        if (!updatedUser) {
            return res.status(400).json({
                status: "error",
                method: req.method,
                message: "User details not updated successfully",
            });
        }
        const user = (await userModel_1.default.findOne({
            where: { id: userId },
        }));
        console.log(user);
        return res.status(200).json({
            status: "success",
            method: req.method,
            message: "User details updated successfully",
            user
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            Error: "Internal Server Error",
        });
    }
};
exports.userEditProfile = userEditProfile;
