"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeProfilePicture = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const changeProfilePicture = async (request, response) => {
    try {
        const userId = request.user.id;
        if (request.file === undefined) {
            return response.status(404).json({
                status: `error`,
                message: `No image selected`
            });
        }
        const profilePic = request.file.path;
        const updatedUser = await userModel_1.default.update({ profile_picture: profilePic }, { where: { id: userId } });
        if (!updatedUser) {
            return response.status(400).json({
                status: `error`,
                message: `Unable to update picture`
            });
        }
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        return response.status(200).json({
            status: `success`,
            message: `Profile picture successfully changed`,
            data: user
        });
    }
    catch (err) {
        console.log(err.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`
        });
    }
};
exports.changeProfilePicture = changeProfilePicture;
