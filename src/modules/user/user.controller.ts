
import { Request, Response } from "express";
import { userService } from "./user.service";
import { UserRole } from "../../middlewares/authorizeRoles";




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



        // for admin can update status 





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

};

