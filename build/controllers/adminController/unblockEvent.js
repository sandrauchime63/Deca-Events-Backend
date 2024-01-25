"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventUnblocked = void 0;
const authorization_1 = require("../../middleware/authorization");
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const eventUnblocked = async (request, response, next) => {
    try {
        const eventId = request.params.eventId;
        const event = await eventModel_1.default.findByPk(eventId);
        if (!event) {
            return response.status(404).json({ error: "Event not found" });
        }
        if (!event.isBlocked) {
            return response.status(400).json({ error: "Event is not blocked" });
        }
        const adminAuthorise = authorization_1.adminAuthoriser;
        if (!adminAuthorise) {
            return response.status(402).json({
                status: "error",
                message: "User cannot unblock User",
            });
        }
        await event.update({ isBlocked: false });
        return response.status(200).json({
            message: "Event unblocked successfully",
        });
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({
            error: "Internal Server Error",
        });
    }
};
exports.eventUnblocked = eventUnblocked;
