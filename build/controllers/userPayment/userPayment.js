"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPays = void 0;
const uuid_1 = require("uuid");
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const payment_1 = __importDefault(require("../../models/orderModel/payment"));
const ticketModel_1 = __importDefault(require("../../models/ticketModel/ticketModel"));
const earningModel_1 = __importDefault(require("../../models/earningsModel/earningModel"));
const userPays = async (request, response) => {
    try {
        const userId = request.user.id;
        const eventId = request.params.id;
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        const event = await eventModel_1.default.findOne({ where: { id: eventId } });
        const event_owner = await userModel_1.default.findOne({ where: { id: event.owner_id } });
        if (!event) {
            return response.status(404).json({
                status: `error`,
                message: `Event Not Found`
            });
        }
        const newCart = JSON.parse(request.body.cart);
        const totalAmount = request.body.totalAmount;
        let newOrderNumber = 'DE' + Date.now();
        const newOrder = await payment_1.default.create({
            id: (0, uuid_1.v4)(),
            tickets: newCart,
            amount: totalAmount,
            owner_id: userId,
            order_number: newOrderNumber,
            event_owner_id: event_owner.id,
            event_id: eventId,
            owner_email: user.email,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const createdTickets = [];
        const createdEarnings = [];
        for (let index = 0; index < newCart.length; index++) {
            const ticket = await ticketModel_1.default.create({
                id: (0, uuid_1.v4)(),
                owner_id: userId,
                owner_name: `${user.first_name} ${user.last_name}`,
                event_id: eventId,
                order_number: newOrderNumber,
                event_name: event.title,
                event_type: event.type,
                ticket_type: newCart[index].ticket_type,
                quantity: newCart[index].quantity,
                total_cost: newCart[index].total_amount,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            const newEarning = await earningModel_1.default.create({
                id: (0, uuid_1.v4)(),
                owner_id: event_owner.id,
                owner_name: `${event_owner.first_name} ${event_owner.last_name}`,
                event_id: eventId,
                order_date: new Date(),
                event_name: event.title,
                order_number: newOrderNumber,
                ticket_quantity: newCart[index].quantity,
                ticket_cost: newCart[index].ticket_amount,
                event_category: newCart[index].ticket_type,
                ticket_type: newCart[index].ticket_type,
                total_amount: newCart[index].total_amount,
                amount_earned: newCart[index].total_amount * 0.8,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            createdEarnings.push(newEarning);
            createdTickets.push(ticket);
        }
        const registeredUser = {
            id_of_user: userId,
            image_of_user: user.profile_picture,
            name_of_user: `${user.first_name} ${user.last_name}`,
            email_of_user: user.email,
            no_of_tickets: createdTickets.length,
            date_purchased: new Date(),
            total_amount_paid: totalAmount
        };
        let newUser = event.registered_users;
        newUser.push(registeredUser);
        const updateTicket = event.tickets_bought + 1;
        const update = await eventModel_1.default.update({ registered_users: newUser, tickets_bought: updateTicket }, { where: { id: eventId } });
        if (newOrder && createdTickets.length !== 0 && createdEarnings.length !== 0 && update) {
            return response.status(200).json({
                status: `success`,
                message: `Payment Successful`,
                createdTickets,
                createdEarnings
            });
        }
        return response.status(200).json({
            status: `error`,
            message: `Payment Unsuccessful`,
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`
        });
    }
};
exports.userPays = userPays;
