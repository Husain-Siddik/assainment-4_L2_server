

import { Request, Response } from "express";
import { userService } from "./user.service";
import { UserRole } from "../../middlewares/authorizeRoles";

import { UserStatus } from '../../../generated/prisma/enums';




// ----------------------only admin can-------------------------------------- 
const getAllUser = async (req: Request, res: Response) => {

    try {

        const user = req?.user

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized  Login required"
            })
        }

        if (user?.role !== UserRole.ADMIN) {
            return res.status(403).json({
                message: "Forbidden: Admin only"
            })
        }

        const result = await userService.getAllUsersService()

        res.status(200).json({
            success: true,
            message: "All user fatched succesfully ",
            data: result
        })





    } catch (err) {
        res.status(500).json({
            succes: false,
            message: "Faild to fatched all User ",
            error: err
        })

    }

}

const updateStatusByAdmin = async (req: Request, res: Response) => {

    try {
        const id = req.params.id as string
        const status = req.body.status as UserStatus
        const user = req?.user

        if (user?.role !== UserRole.ADMIN) {
            return res.status(403).json({
                message: "unAuthorige to updete User Status"
            })
        }


        if (status !== UserStatus.ACTIVE && status !== UserStatus.BANNED) {

            return res.status(400).json({
                success: false,
                message: "Status must be ACTIVE or BANNED"

            })

        }


        const result = await userService.userStatusUpdateService(id, status)


        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        // sesion delete 

        if (status === UserStatus.BANNED) {
            await userService.userSesionDeleteAfterbanned(result.id);

        }

        //after banning a user delete session 
        return res.status(200).json({
            success: true,
            message:
                status === UserStatus.BANNED
                    ? "User banned and all sessions invalidated"
                    : "User activated successfully",
            data: result,
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User status update faild ",
            error: error
        })
    }
}




//-------------------------------------------------------------------------



const getCurentUser = async (req: Request, res: Response) => {

    try {
        //userid 
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({
                error: " Unauthorized!!!",
            });
        }

        const user = await userService.getCurentUserservice(userId);

        res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            error: "Failed to fetch user",
            details: error.message,
        });
    }
}

const getuserbyid = async (req: Request, res: Response) => {

    try {
        //userid 
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({
                error: " wrong  user id !!!",
            });
        }

        const user = await userService.getuserbyIdService(userId as string);

        res.status(200).json({
            success: true,
            messege: "user fetched successfully ",
            data: user,
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            error: "Failed to fetch user",
            details: error.message,
        });
    }
}


const updateUser = async (req: Request, res: Response) => {

    try {
        // userid 
        const user = req?.user
        const userId = user?.id;

        const { name, image, status } = req.body;

        if (!userId) {
            return res.status(400).json({
                error: " Unauthorized !!!",
            });
        }

        if (user?.role !== UserRole.ADMIN) {

            const updatedUser = await userService.updateUserProfileService(
                userId,
                {
                    name,
                    image,
                }
            );
            return res.status(200).json({
                success: true,
                messege: "user profile updated successfully ",
                data: updatedUser,
            });
        }



    } catch (error: any) {

        res.status(500).json({
            success: false,
            error: "Failed to update user profile",
            details: error.message,
        });
    }


}


const deleteProfile = async (req: Request, res: Response) => {

    try {

        //   userid 
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({
                error: "you are not authorized !!!",
            });
        }

        await userService.deleteProfileService(userId);

        res.status(200).json({
            success: true,
            messege: "user deleted successfully ",

        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            error: "Failed to delete ",
            details: error.message,
        });
    }
}







export const userController = {
    getCurentUser,
    getuserbyid,
    updateUser,
    deleteProfile,
    getAllUser,
    updateStatusByAdmin

};

