"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlaggedEvents = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const reportModel_1 = __importDefault(require("../../models/reportModel/reportModel"));
const getFlaggedEvents = async (request, response) => {
    try {
        const reportedEventsArray = await reportModel_1.default.findAll({});
        if (reportedEventsArray.length === 0) {
            return response.status(404).json({
                status: `error`,
                message: `No Flagged Events`,
            });
        }
        const reportedEvents = [];
        for (let i = 0; i < reportedEventsArray.length; i++) {
            reportedEvents.push(await eventModel_1.default.findOne({ where: { id: reportedEventsArray[i].event_id } }));
        }
        if (reportedEvents.length > 0) {
            return response.status(200).json({
                status: "success",
                method: request.method,
                message: `Events found successfully`,
                reportedEvents,
            });
        }
    }
    catch (error) {
        console.log(error.message);
        response.status(400).json({
            status: "error",
            method: request.method,
            message: "Internal Server Error",
        });
    }
};
exports.getFlaggedEvents = getFlaggedEvents;
