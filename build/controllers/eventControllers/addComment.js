"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const uuid_1 = require("uuid");
const commentModel_1 = require("../../models/commentModel/commentModel");
const addComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = req.params.id;
        console.log(eventId);
        const comment = req.body.comments;
        const event = await eventModel_1.default.findByPk(eventId);
        const user = await userModel_1.default.findOne({
            where: { id: userId },
        });
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Only verified users can comment on an event",
            });
        }
        if (!event) {
            return res.status(404).json({
                status: `error`,
                message: `Unable to find event`,
            });
        }
        const newComment = await commentModel_1.Comment.create({
            id: (0, uuid_1.v4)(),
            owner_id: userId,
            owner_name: user.user_name,
            event_id: eventId,
            comment,
            likes: 0,
            dislikes: 0,
            likesArr: [],
            dislikesArr: [],
            comment_time: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const findComment = await commentModel_1.Comment.findOne({ where: { id: newComment.id } });
        console.log(findComment);
        if (findComment) {
            return res.status(200).json({
                status: `success`,
                message: `Comment Successfully added`,
                data: findComment
            });
        }
        return res.status(400).json({
            status: `error`,
            message: `Unable to add Comment`,
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
exports.addComment = addComment;
