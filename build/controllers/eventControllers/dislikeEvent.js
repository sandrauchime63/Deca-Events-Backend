"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disLikeEvent = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const disLikeEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = req.params.id;
        const event = await eventModel_1.default.findByPk(eventId);
        if (!event) {
            return res.status(404).json({
                status: `error`,
                message: `Unable to find event`,
            });
        }
        const user = await userModel_1.default.findOne({
            where: { id: userId },
        });
        if (!user?.isVerified) {
            return res.status(401).json({
                status: "error",
                message: "Only verified users can like an event, update your profile to be able to like this event",
            });
        }
        let liked;
        //check if user already disliked
        for (let index = 0; index < event.dislikesArr.length; index++) {
            if (event.dislikesArr[index] === userId) {
                liked = true;
                return res.status(401).json({
                    status: "error",
                    message: "You have already disliked this event",
                });
            }
        }
        //check if user liked and change to dislike
        let likesArray = event.likesArr;
        let likesNum = event.likes;
        for (let index = 0; index < likesArray.length; index++) {
            if (likesArray[index] === userId) {
                likesArray.splice(index, 1);
                likesNum--;
                index--;
            }
        }
        await eventModel_1.default.update({ likesArr: likesArray, likes: likesNum }, { where: { id: eventId } });
        const dislikedArr = event.dislikesArr;
        dislikedArr.push(userId);
        let dislikings = event.dislikes + 1;
        await eventModel_1.default.update({ dislikesArr: dislikedArr, dislikes: dislikings }, { where: { id: eventId } });
        return res.status(200).json({
            status: "success",
            message: "You have disliked this event",
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "error",
            message: "Unable to dislike event",
        });
    }
};
exports.disLikeEvent = disLikeEvent;
