"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userBlocked = void 0;
const authorization_1 = require("../../middleware/authorization");
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userBlocked = async (request, response, next) => {
    const eventId = request.params.eventId;
    try {
        const event = await eventModel_1.default.findByPk(eventId);
        if (!event) {
            return response.status(404).json({ error: 'Event not found' });
        }
        if (event.isBlocked) {
            return response.status(400).json({ error: 'Event is already blocked' });
        }
        const adminAuthorise = authorization_1.adminAuthoriser;
        if (!adminAuthorise) {
            return response.status(402).json({
                status: "error",
                message: "User cannot block User"
            });
        }
        await event.update({ isBlocked: true });
        return response.status(200).json({
            message: 'Event blocked successfully'
        });
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
exports.userBlocked = userBlocked;
