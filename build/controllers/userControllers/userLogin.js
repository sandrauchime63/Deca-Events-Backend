"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const helpers_1 = require("../../helpers/helpers");
const validation_1 = require("../../validators/validation");
const userLogin = async (request, response) => {
    try {
        const { email, password } = request.body;
        const validateInput = validation_1.loginSchema.safeParse(request.body);
        if (validateInput.success === false) {
            return response.status(400).send({
                status: "error",
                method: request.method,
                message: validateInput.error.issues,
            });
        }
        const user = (await userModel_1.default.findOne({
            where: { email: email },
        }));
        if (!user) {
            return response.status(404).json({
                status: `Access denied`,
                message: `User with the email ${email} is not registered`,
            });
        }
        if (!user.isVerified) {
            return response.status(402).json({
                status: `error`,
                message: `Only verified users can login, please check your email address ${user.email}, for a verification link sent to you.`
            });
        }
        const validate = await bcryptjs_1.default.compare(password, user.password);
        if (!validate) {
            return response.status(400).json({
                status: `error`,
                message: `Invalid Password`,
            });
        }
        const data = {
            id: user.id,
            email: user.email,
        };
        const token = (0, helpers_1.generateToken)(data);
        return response.status(200).json({
            message: `Welcome back ${user.first_name}`,
            token,
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
exports.userLogin = userLogin;
