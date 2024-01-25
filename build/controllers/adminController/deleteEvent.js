"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvents = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const authorization_1 = require("../../middleware/authorization");
const deleteEvents = async (request, response, next) => {
    try {
        const eventId = request.params.eventId;
        const event = await eventModel_1.default.findByPk(eventId);
        if (!event) {
            return response.status(404).json({
                error: 'Event not found'
            });
        }
        const adminAuthorise = authorization_1.adminAuthoriser;
        if (!adminAuthorise) {
            return response.status(401).json({
                status: "error",
                message: "Not an admin"
            });
        }
        await event.destroy();
        return response.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
exports.deleteEvents = deleteEvents;
