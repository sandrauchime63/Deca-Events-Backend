"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const registerUser = async (request, response) => {
    try {
        const userId = request.user.id;
        const eventId = request.params.id;
        const findUser = await userModel_1.default.findOne({ where: { id: userId } });
        const eventInfo = await eventModel_1.default.findOne({ where: { id: eventId } });
        const { email, password, ticket_types, tickets_bought } = request.body;
        const checkUserEmail = await userModel_1.default.findOne({ where: { email } });
        if (checkUserEmail) {
            return response.status(400).json({
                status: `error`,
                message: `The email address ${email} has already registered for this event`,
            });
        }
        if (findUser.password !== password) {
            return response.status(400).json({
                status: `error`,
                message: `Password incorrect`
            });
        }
        if (!userId) {
            return response.status(400).json({
                status: "error",
                message: "Invalid user ID",
            });
        }
        if (!findUser) {
            return response.status(404).json({
                status: "error",
                message: "You have to login to register for this event",
            });
        }
        const registeredUser = {
            id_of_user: findUser.id,
            name_of_user: `${findUser.first_name} ${findUser.last_name}`,
            ticket_types: ticket_types,
            no_of_tickets: tickets_bought,
            total_amount_paid: ''
        };
        let eventRegisteredUsers = [];
        eventRegisteredUsers = eventInfo.registered_users;
        eventRegisteredUsers.push(registeredUser);
        const update = await eventModel_1.default.update({ registered_users: eventRegisteredUsers }, { where: { id: eventId } });
        if (!update) {
            return response.status(400).json({
                status: `success`,
                message: `Event register unsuccessful`
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `User Registered Successfully`,
            findUser,
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
exports.registerUser = registerUser;
