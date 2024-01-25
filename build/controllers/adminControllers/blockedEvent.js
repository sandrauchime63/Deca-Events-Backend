"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBlocked = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const eventBlocked = async (request, response, next) => {
    try {
        const eventId = request.params.id;
        const event = await eventModel_1.default.findByPk(eventId);
        if (!event) {
            return response.status(404).json({ error: "Event not found" });
        }
        // if (event.isBlocked) {
        //   return response.status(400).json({ error: "Event is already blocked" });
        // }
        await eventModel_1.default.update({ isBlocked: true }, { where: { id: eventId } });
        return response.status(200).json({
            message: "Event blocked successfully",
        });
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({
            error: "Internal Server Error",
        });
    }
};
exports.eventBlocked = eventBlocked;
