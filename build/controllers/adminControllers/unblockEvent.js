"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventUnblocked = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const eventUnblocked = async (request, response, next) => {
    try {
        const eventId = request.params.id;
        const event = await eventModel_1.default.findByPk(eventId);
        if (!event) {
            return response.status(404).json({ error: "Event not found" });
        }
        await eventModel_1.default.update({ isBlocked: false }, { where: { id: eventId } });
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
