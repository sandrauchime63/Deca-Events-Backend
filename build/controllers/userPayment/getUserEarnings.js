"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserEarnings = void 0;
const earningModel_1 = __importDefault(require("../../models/earningsModel/earningModel"));
const getUserEarnings = async (request, response) => {
    try {
        const userId = request.user.id;
        let getAllEarnings = await earningModel_1.default.findAll({ where: { owner_id: userId } });
        if (getAllEarnings.length === 0) {
            return response.status(404).json({
                message: `No Earnings found`
            });
        }
        getAllEarnings = getAllEarnings.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        return response.status(200).json({
            status: 'Success',
            method: request.method,
            message: `Earnings found successfully`,
            getAllEarnings
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
exports.getUserEarnings = getUserEarnings;
