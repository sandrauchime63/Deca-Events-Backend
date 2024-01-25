"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeEvent = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const likeEvent = async (req, res) => {
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
        // check if user already liked
        for (let index = 0; index < event.likesArr.length; index++) {
            if (event.likesArr[index] === userId) {
                return res.status(402).json({
                    status: "error",
                    message: "You have already liked this event",
                });
            }
        }
        //check if user disliked and change to like
        let dislikesArray = event.dislikesArr;
        let dislikesNum = event.dislikes;
        for (let index = 0; index < dislikesArray.length; index++) {
            if (dislikesArray[index] === userId) {
                dislikesArray.splice(index, 1);
                dislikesNum--;
                index--;
            }
        }
        await eventModel_1.default.update({ dislikesArr: dislikesArray, dislikes: dislikesNum }, { where: { id: eventId } });
        const likedArr = event.likesArr;
        likedArr.push(userId);
        let likings = event.likes + 1;
        await eventModel_1.default.update({ likesArr: likedArr, likes: likings }, { where: { id: eventId } });
        return res.status(200).json({
            status: "success",
            message: "You have liked this event",
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "error",
            message: "Unable to like event",
        });
    }
};
exports.likeEvent = likeEvent;
