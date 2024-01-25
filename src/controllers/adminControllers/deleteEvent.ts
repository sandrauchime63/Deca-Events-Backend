import { Response, Request, NextFunction } from 'express';
import  { JwtPayload} from 'jsonwebtoken';
import Event, { EventAttributes } from "../../models/eventModel/eventModel";
import { adminAuthoriser } from '../../middleware/authorization';

export const deleteEvents = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
   
  try {
    const eventId = request.params.eventId;

    const event = await Event.findByPk(eventId);

    if (!event) {
      return response.status(404).json({ 
        error: 'Event not found' });
    }


    const adminAuthorise=adminAuthoriser
    if(!adminAuthorise){
     return response.status(401).json({
       status:"error",
      message:"Not an admin"
     })
    }
    await event.destroy();

    return response.status(200).json({ message: 'Event deleted successfully' });

  } catch (error:any) {
    console.error(error.message);
    return response.status(500).json({
       error: 'Internal Server Error' 
      });
  }
  }

  

