"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = void 0;
const commentModel_1 = require("../../models/commentModel/commentModel");
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const getComments = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await eventModel_1.default.findByPk(eventId);
        if (!event) {
            return res.status(404).json({
                status: `error`,
                message: `Unable to find event`,
            });
        }
        const comments = await commentModel_1.Comment.findAll({ where: { event_id: eventId } });
        if (!comments) {
            return res.status(404).json({
                status: `error`,
                message: `Unable to fetch comments`,
            });
        }
        let mainComments = [];
        let user;
        for (let index = 0; index < comments.length; index++) {
            user = await userModel_1.default.findOne({ where: { id: comments[index].owner_id } });
            if (user) {
                mainComments.push({
                    name: user?.user_name,
                    picture: user?.profile_picture,
                    comment: comments[index].comment,
                    comment_time: comments[index].comment_time
                });
            }
        }
        if (mainComments.length > 0) {
            return res.status(200).json({
                status: `success`,
                message: `Comments fetched successfully`,
                mainComments
            });
        }
        return res.status(400).json({
            status: `error`,
            message: `No Comments found`,
            mainComments
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "error",
            message: "Internal Server error",
        });
    }
};
exports.getComments = getComments;
