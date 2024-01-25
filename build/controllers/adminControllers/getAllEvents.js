"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAdminEvents = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const getAllAdminEvents = async (request, response) => {
    try {
        const getAllAdminEvents = await eventModel_1.default.findAll({});
        if (getAllAdminEvents.length === 0) {
            return response.status(404).json({
                message: `No Events found`,
            });
        }
        return response.status(200).json({
            status: "Success",
            method: request.method,
            message: `Events found successfully`,
            data: getAllAdminEvents,
        });
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
exports.getAllAdminEvents = getAllAdminEvents;
