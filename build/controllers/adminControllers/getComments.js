"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserComments = void 0;
const getUserComments = async (request, response) => {
    // try {
    //   const eventId = request.params.eventId;
    //   const commentArray = [];
    //   const event = (await Event.findAll({
    //     where: { id: eventId },
    //   })) as unknown as EventAttributes;
    //   if (!event) {
    //     return response.status(400).json({
    //       status: "Bad request",
    //       message: "Event not found",
    //     });
    //   }
    //   let mapComment = event.comments.map((comment) => {});
    //   commentArray.push(mapComment);
    //   return response.status(200).json({
    //     status: "success",
    //     message: `${commentArray}`,
    //   });
    // } catch (error) {
    //   console.error(error);
    //   return response.status(500).json({
    //     error: "Internal Server Error",
    //   });
    // }
};
exports.getUserComments = getUserComments;
