import { Request, Response, NextFunction } from "express";
import { UserStatus } from "../../generated/prisma/enums";
import { userService } from "../modules/user/user.service";

export const blockBannedUser = async (
    req: Request,
    res: Response,
    next: NextFunction

) => {
    try {

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: user not found in request",
            });
        }

        const user = await userService.getuserbyIdService(userId);

        if (user?.status === UserStatus.BANNED) {
            return res.status(403).json({
                success: false,
                message: "Your account is banned. Please contact support.",
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};