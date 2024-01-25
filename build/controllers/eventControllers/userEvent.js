"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEvent = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userEvent = async (request, response) => {
    try {
        const userId = request.user.id;
        if (!userId) {
            return response.status(400).json({
                status: "Bad request",
                message: "Contact Admin",
            });
        }
        // let getMyEvents: any[] = [];
        // const allEvents: any = (await Event.findAll(
        //   {}
        // )) as unknown as EventAttributes;
        // allEvents.map((a: any) => {
        //   a.organizers.map((b: any) => {
        //     if (b.id_of_organizer === userId) {
        //       if (!getMyEvents.includes(a)) {
        //         getMyEvents.push(a);
        //       }
        //     }
        //   });
        // });
        const getMyEvents = await eventModel_1.default.findAll({ where: { owner_id: userId } });
        if (getMyEvents.length !== 0) {
            return response.status(200).json({
                status: "Success",
                method: request.method,
                message: `Events found successfully`,
                getMyEvents,
            });
        }
        return response.status(404).json({
            status: `error`,
            message: `You have organized no events`,
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(400).json({
            status: "error",
            method: request.method,
            message: error,
        });
    }
};
exports.userEvent = userEvent;
