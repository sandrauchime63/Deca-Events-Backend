"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleEvent = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const getSingleEvent = async (request, response) => {
    try {
        const eventId = request.params.id;
        const eventInfo = await eventModel_1.default.findOne({ where: { id: eventId } });
        if (!eventId) {
            return response.status(400).json({
                status: 'Bad request',
                message: 'Contact Admin or Event Organizer(s)'
            });
        }
        if (!eventInfo) {
            return response.status(404).json({
                message: `Event not found`
            });
        }
        return response.status(200).json({
            status: 'Success',
            method: request.method,
            message: `${eventInfo.title} found successfully`,
            data: eventInfo
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(400).json({
            status: 'Error',
            method: request.method,
            message: error
        });
    }
};
exports.getSingleEvent = getSingleEvent;
