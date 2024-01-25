"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportEvent = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const reportModel_1 = require("../../models/reportModel/reportModel");
const uuid_1 = require("uuid");
const reportEvent = async (request, response) => {
    try {
        const eventId = request.params.id;
        const userId = request.user.id;
        const { report } = request.body;
        console.log(request.body);
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        const eventInfo = await eventModel_1.default.findOne({ where: { id: eventId } });
        if (!userId) {
            return response.status(400).json({
                status: "error",
                message: "Invalid user ID",
            });
        }
        if (!user) {
            return response.status(404).json({
                status: "error",
                message: "You have to login to report this event",
            });
        }
        if (!eventInfo) {
            return response.status(404).json({
                status: "error",
                message: "Event not found",
            });
        }
        const newReport = await reportModel_1.Report.create({
            id: (0, uuid_1.v4)(),
            owner_id: userId,
            owner_name: user.user_name,
            event_id: eventId,
            report,
            report_time: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const findReport = await reportModel_1.Report.findOne({ where: { id: newReport.id } });
        if (!findReport) {
            return response.status(400).json({
                status: `error`,
                message: `Report unsucessful`,
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Report successfully submitted`,
            findReport
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
        });
    }
};
exports.reportEvent = reportEvent;
