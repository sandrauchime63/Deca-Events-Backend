"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEvents = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const getAllEvents = async (request, response) => {
    try {
        const getAllEvents = await eventModel_1.default.findAll({});
        if (getAllEvents.length === 0) {
            return response.status(404).json({
                message: `No Events found`
            });
        }
        return response.status(200).json({
            status: 'Success',
            method: request.method,
            message: `Events found successfully`,
            data: getAllEvents
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(400).json({
            status: 'error',
            method: request.method,
            message: 'Internal Server Error'
        });
    }
};
exports.getAllEvents = getAllEvents;
