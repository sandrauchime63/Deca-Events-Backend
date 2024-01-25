"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dislikeEvent = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const dislikeEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = req.params.id;
        const event = await eventModel_1.default.findByPk(eventId);
        const user = (await userModel_1.default.findOne({
            where: { id: userId },
        }));
        if (!user.isVerified) {
            return res.status(401).json({
                status: "error",
                message: "Only verified users can dislike an event",
            });
        }
        if (!event) {
            return res.status(404).json({
                status: `error`,
                message: `Unable to find event`,
            });
        }
        const dislikeButton = document.getElementById("dislikeButton");
        const dislikeCount = document.getElementById("dislikeCount");
        let disliked = false;
        dislikeButton.addEventListener("click", () => {
            if (!disliked) {
                dislikeCount.innerText = (parseInt(dislikeCount.innerText) + 1).toString();
                disliked = true;
            }
            else {
                dislikeCount.innerText = (parseInt(dislikeCount.innerText) - 1).toString();
                disliked = false;
            }
        });
        event.dislikes.push(disliked);
        await event.save();
        res.status(200).json({
            status: "success",
            method: req.method,
            message: "You dislike this event",
            data: event,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Unable to dislike event",
        });
    }
};
exports.dislikeEvent = dislikeEvent;
