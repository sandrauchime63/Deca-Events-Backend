"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvents = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const uuid_1 = require("uuid");
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const createEvents = async (request, response) => {
    try {
        const userId = request.user.id;
        const user = (await userModel_1.default.findOne({
            where: { id: userId },
        }));
        // if (!user.is_completed_profile) {
        //   return response.status(401).json({
        //     status: `error`,
        //     message: `Only users with completed profiles can organize events`,
        //   });
        // }
        if (!user.isVerified) {
            return response.status(401).json({
                status: `error`,
                message: `You cannot organize an event until you verify your email account`,
            });
        }
        const eventId = (0, uuid_1.v4)();
        const userDetails = {
            id_of_organizer: userId,
            name_of_organizer: `${user.first_name} ${user.last_name}`,
            image_of_organizer: user.profile_picture,
            email_of_organiser: user.email,
            username_of_oganiser: user.user_name
        };
        let organizers = [userDetails];
        const createdEvent = await eventModel_1.default.create({
            ...request.body,
            id: eventId,
            owner_id: userId,
            ticket_types: JSON.parse(request.body.ticket_types),
            tickets_bought: 0,
            likes: 0,
            likesArr: [],
            dislikesArr: [],
            event_image: request?.file?.path,
            isBlocked: false,
            organizers: organizers,
            registered_users: [],
            dislikes: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        let foundEvent = await eventModel_1.default.findOne({ where: { id: eventId } });
        if (!foundEvent) {
            return response.status(404).json({
                status: `error`,
                message: `Unable to create an event`,
            });
        }
        response.status(200).json({
            status: "success",
            method: request.method,
            message: "Event created successfully",
            data: foundEvent,
        });
    }
    catch (error) {
        response.status(500).json({
            status: "error",
            message: "Event creation unsuccessful",
        });
    }
};
exports.createEvents = createEvents;
