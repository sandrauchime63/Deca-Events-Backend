"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventReports = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const reportModel_1 = require("../../models/reportModel/reportModel");
const getEventReports = async (request, response, next) => {
    try {
        const eventId = request.params.id;
        const event = await eventModel_1.default.findByPk(eventId);
        if (!event) {
            return response.status(404).json({ error: "Event not found" });
        }
        const reports = await reportModel_1.Report.findAll({ where: { event_id: eventId } });
        if (reports.length === 0) {
            return response.status(400).json({
                status: `error`,
                message: "No reports found",
            });
        }
        return response.status(200).json({
            status: `success`,
            message: "Reports Found Successfully",
            reports
        });
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({
            error: "Internal Server Error",
        });
    }
};
exports.getEventReports = getEventReports;
