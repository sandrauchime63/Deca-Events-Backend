import { Request, Response } from "express";
import { sendMail } from "../../utilities/notification";
import { JwtPayload } from "jsonwebtoken";
import User, { UserAttributes } from "../../models/userModel/userModel";
import { generateRegisterToken } from "../../helpers/helpers";

export const resendVerification = async (
  request: JwtPayload,
  response: Response
) => {
  try {
    const {email} = request.body;
    const user = (await User.findOne({
      where: { email },
    })) as unknown as UserAttributes;

    if (user.isVerified) {
      return response.status(404).json({
        status: `error`,
        message: `Your are already verified`,
      });
    }
    const token = generateRegisterToken({
      id: user.id,
      email: user.email,
    });
    await sendMail(user.email, token);
    return response.status(200).json({
      status: `success`,
      message: `A verification link has been sent to your email`,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Verification failed`,
    });
  }
};
