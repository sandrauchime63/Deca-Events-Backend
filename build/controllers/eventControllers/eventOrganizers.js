"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventOrganizers = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const eventOrganizers = async (request, response) => {
    try {
        const eventId = request.params.id;
        const organizers = request.body;
        const eventDetails = (await eventModel_1.default.findOne({
            where: { id: eventId },
        }));
        const allOrganizers = eventDetails.organizers;
        for (let i = 0; i < organizers.length; i++) {
            let organizer = await userModel_1.default.findOne({
                where: { user_name: organizers[i] },
            });
            let organizerInfo = {
                id_of_organizer: organizer.id,
                name_of_organizer: organizer.user_name,
                image_of_organizer: organizer.profile_picture,
            };
            allOrganizers.push(organizerInfo);
        }
        const update = await eventModel_1.default.update({ organizers: allOrganizers }, { where: { id: eventId } });
        if (!update) {
            return response.status(400).json({
                status: `success`,
                message: `Report unsucessful`,
            });
        }
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            status: `error`,
            message: `Unable to add organizers at the moment`,
        });
    }
};
exports.eventOrganizers = eventOrganizers;
