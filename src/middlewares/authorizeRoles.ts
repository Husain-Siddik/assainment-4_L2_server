
import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from '../lib/auth'

export enum UserRole {
    STUDENT = "STUDENT",
    TUTOR = "TUTOR",
    ADMIN = "ADMIN"
}


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;

            }
        }
    }
}

const authorizeRoles = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            // geting  session  
            const session = await betterAuth.api.getSession({
                headers: req.headers as any
            })

            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "You  are  not authorized!!"
                })
            }

            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role as string,

            }

            if (roles.length && !roles.includes(req.user.role as UserRole)) {

                return res.status(403).json({
                    success: false,
                    message: " Forbidden !! You don't have permission to access this resources!"
                })
            }

            next()
        } catch (err) {
            next(err);
        }

    }
};

export default authorizeRoles;