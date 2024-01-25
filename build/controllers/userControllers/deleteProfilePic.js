"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfileImage = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const deleteProfileImage = async (request, response) => {
    try {
        const userId = request.user.id;
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        if (user) {
            await userModel_1.default.update({ profile_picture: "" }, { where: { id: userId } });
            const updatedUser = await userModel_1.default.findOne({ where: { id: userId } });
            return response.status(200).json({
                status: "success",
                message: "Profile picture successful deleted",
                data: updatedUser
            });
        }
        return response.status(400).json({
            status: "error",
            message: "Profile picture cannot be deleted at the moment"
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
};
exports.deleteProfileImage = deleteProfileImage;
