"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToISODateString = exports.convertToDDMMYY = exports.generateRegisterToken = exports.generateToken = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcryptjs_1.default.genSalt(saltRounds);
    const hash = await bcryptjs_1.default.hash(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign(data, `${process.env.APP_SECRET}`, { expiresIn: "1d" });
};
exports.generateToken = generateToken;
const generateRegisterToken = (data) => {
    return jsonwebtoken_1.default.sign(data, `${process.env.APP_SECRET}`, { expiresIn: "20m" });
};
exports.generateRegisterToken = generateRegisterToken;
const convertToDDMMYY = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
};
exports.convertToDDMMYY = convertToDDMMYY;
const convertToISODateString = (regularDateString) => {
    const dateParts = regularDateString.split('/');
    if (dateParts.length === 3) {
        const day = dateParts[0].padStart(2, '0');
        const month = dateParts[1].padStart(2, '0');
        const year = dateParts[2];
        // Ensure the date is valid by constructing a Date object
        const date = new Date(`${year}-${month}-${day}`);
        // Check if the date is valid after parsing
        if (!isNaN(date.getTime())) {
            return date.toISOString().slice(0, 10);
        }
    }
    return null; // Return null for invalid or unrecognized input
};
exports.convertToISODateString = convertToISODateString;
