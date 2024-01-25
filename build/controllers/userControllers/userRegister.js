"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const userModel_1 = __importStar(require("../../models/userModel/userModel"));
const validation_1 = require("../../validators/validation");
const uuid_1 = require("uuid");
const helpers_1 = require("../../helpers/helpers");
const notification_1 = require("../../utilities/notification");
const registerUser = async (request, response) => {
    try {
        const { first_name, last_name, email, password, confirm_password, user_name, } = request.body;
        const validateInput = validation_1.validateRegisterSchema.safeParse(request.body);
        if (validateInput.success === false) {
            return response.status(400).send({
                status: "error",
                method: request.method,
                message: validateInput.error.issues,
            });
        }
        const checkUserEmail = await userModel_1.default.findOne({ where: { email } });
        if (checkUserEmail) {
            return response.status(400).json({
                status: `error`,
                message: `The email address ${email} already in use`,
            });
        }
        const checkUserName = await userModel_1.default.findOne({ where: { user_name } });
        if (checkUserName) {
            return response.status(400).json({
                status: `error`,
                message: `The username ${user_name} already in use`,
            });
        }
        if (password !== confirm_password) {
            return response.status(400).json({
                status: `error`,
                message: `Password mismatch`,
            });
        }
        if (password.length < 6) {
            return response.status(400).json({
                status: `error`,
                message: `Password must be at least six characters long`,
            });
        }
        const userId = (0, uuid_1.v4)();
        const passwordHash = await (0, helpers_1.hashPassword)(password);
        const newUser = await userModel_1.default.create({
            id: userId,
            first_name,
            last_name,
            email,
            password: passwordHash,
            user_name,
            phone_number: "",
            profile_picture: "",
            address: "",
            state: "",
            identity_document: "",
            zip_code: "",
            role: userModel_1.role.USER,
            is_completed_profile: false,
            isVerified: false,
            isBlocked: false,
            reports: [],
            isAddAccount: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const findUser = (await userModel_1.default.findOne({
            where: { email },
        }));
        if (!findUser) {
            return response.status(400).json({
                status: `error`,
                message: `User not registered, contact admin`,
            });
        }
        const token = (0, helpers_1.generateRegisterToken)({
            id: findUser.id,
            email: findUser.email,
        });
        await (0, notification_1.sendMail)(email, token);
        return response.status(200).json({
            status: `success`,
            message: `User Registered Successfully`,
            findUser,
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
exports.registerUser = registerUser;
