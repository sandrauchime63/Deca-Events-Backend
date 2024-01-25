"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAttendedEvents = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userAttendedEvents = async (request, response) => {
    try {
        const userId = request.user.id;
        let userEvents = [];
        if (!userId) {
            return response.status(400).json({
                status: `error`,
                message: `You have to login to access this page`
            });
        }
        const pastEvent = await eventModel_1.default.findAll({
        // where:{
        //     event_date: {
        //         [Op.lt]:new Date()
        //     }
        // }
        });
        for (let a = 0; a < pastEvent.length; a++) {
            let event = pastEvent[a].registered_users;
            for (let b = 0; b < event.length; b++) {
                if (event[b].id_of_user === userId) {
                    userEvents.push(pastEvent[a]);
                }
            }
        }
        if (userEvents.length === 0) {
            return response.status(400).json({
                status: `success`,
                message: `No atttended events at the moment`
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Attended events fetched successfully`,
            userEvents
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`
        });
    }
};
exports.userAttendedEvents = userAttendedEvents;
