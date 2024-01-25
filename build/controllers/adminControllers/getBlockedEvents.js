"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockedEvents = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const getBlockedEvents = async (request, response) => {
    try {
        const userId = request.user.id;
        const findUser = await userModel_1.default.findAll({ where: { id: userId } });
        if (findUser.role === 'User') {
            return response.status(402).json({
                status: "error",
                message: "User is not an admin"
            });
        }
        const getBlockedEvents = await eventModel_1.default.findAll({ where: { isBlocked: true } });
        if (getBlockedEvents.length === 0) {
            return response.status(404).json({
                message: `No blocked events found`
            });
        }
        return response.status(200).json({
            status: 'Success',
            method: request.method,
            message: `Blocked events found successfully`,
            data: getBlockedEvents
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(400).json({
            status: 'error',
            method: request.method,
            message: "Internal Server Error"
        });
    }
};
exports.getBlockedEvents = getBlockedEvents;
