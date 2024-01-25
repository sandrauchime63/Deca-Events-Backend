"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketHistory = void 0;
const ticketModel_1 = __importDefault(require("../../models/ticketModel/ticketModel"));
const getTicketHistory = async (request, response) => {
    try {
        const userId = request.user.id;
        let getAllTickets = await ticketModel_1.default.findAll({ where: { owner_id: userId } });
        if (getAllTickets.length === 0) {
            return response.status(404).json({
                message: `No Tickets found`
            });
        }
        getAllTickets = getAllTickets.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        return response.status(200).json({
            status: 'Success',
            method: request.method,
            message: `Tickets found successfully`,
            getAllTickets
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(400).json({
            status: 'error',
            method: request.method,
            message: 'Internal Server Error'
        });
    }
};
exports.getTicketHistory = getTicketHistory;
