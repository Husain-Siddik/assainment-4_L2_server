
import { Request, Response } from "express";

import { UserRole } from "../../middlewares/authorizeRoles";
import { TutorService } from "./tutor.service";
import { success } from "better-auth/*";




const createTutor = async (req: Request, res: Response) => {


    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({

                error: "Unauthorized!",
            });
        }

        if (user.role !== UserRole.TUTOR) {

            return res.status(400).json({

                error: "Unauthorized!",
            });

        }

        const result = await TutorService.createTutor(

            req.body,
            user.id as string,
            user.role as UserRole,

        );

        res.status(201).json(result);

    } catch (e) {
        res.status(400).json({
            error: "Tutor Profile creation failed",
            details: e
        })
    }
};

const getTutorById = async (req: Request, res: Response) => {

    try {
        const tutorId = req.params.id

        if (!tutorId) {
            throw new Error("Tutor id  is required!");
        }

        const result = await TutorService.getTutorById(Number(tutorId));

        if (!result) {
            throw new Error("Tutor not found!");
        }

        res.status(200).json(result);
    } catch (e: any) {
        res.status(400).json({
            error: "Could not find any tutor",
            details: e.message || e,
        });
    }
};


const getAllTutor = async (req: Request, res: Response) => {

    try {

        const { categories, minRating } = req.query;

        const categoryNames = categories
            ? (categories as string).split(",").map((c) => c.trim())
            : [];



        const result = await TutorService.getAllTutor({
            categoryNames,
            minRating: minRating ? Number(minRating) : undefined,
        });

        res.status(200).json(result);

    } catch (e: any) {
        res.status(400).json({
            error: "Could not get all tutors",
            details: e.message || e,
        });
    }
};




const getTutorByUser = async (req: Request, res: Response) => {
    try {


        const userId = (req as any).user?.id;

        if (!userId) {

            return res.status(401).json({
                error: "Unauthorized: user not logged in",
            });
        }

        const tutor = await TutorService.getTutorByUserId(userId);

        if (!tutor) {
            return res.status(404).json({
                error: "Tutor profile not found for this user",
            });
        }

        res.status(200).json(tutor);
    } catch (error: any) {
        res.status(500).json({
            error: "Failed to get tutor",
            details: error.message,
        });
    }
};


const deleteTutorbyUserid = async (req: Request, res: Response) => {

    try {

        const userId = (req as any).user?.id;

        if (!userId) {
            throw new Error("User not found");
        }

        const tutor = await TutorService.getTutorByUserId(userId);

        if (!tutor) {
            throw new Error("Tutor profile not found for this user");
        }

        //  delete user and tutor 

        if (tutor?.userId === userId) {
            const result = await TutorService.deleteTutorWithUser(userId);

            return res.status(200).json({
                message: "Tutor profile deleted successfully",
                result,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "you are not authorized",

            })
        }





    } catch (error) {
        res.status(500).json({
            error: "Failed to delete tutor",
            details: error,
        });

    }
}



const updateTutor = async (req: Request, res: Response) => {

    try {

        const user = req?.user

        const userId = user?.id


        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized not logged in",
            });
        }

        const tutor = await TutorService.getTutorByUserId(userId);

        if (!tutor) {
            return res.status(404).json({
                error: "There is no tutor profile for  this user ",
            });
        }

        if (tutor.userId !== userId) {

            return res.status(403).json({
                error: "You are not authorized to update this tutor profile",

            });
        }

        const updatedTutor = await TutorService.updateTutorProfile(userId, req.body);

        res.status(200).json({
            success: true,
            message: "Tutor profile updated successfully",
            data: updatedTutor
        });




    } catch (error: any) {
        res.status(500).json({
            error: "Failed to update profile  ",
            details: error.message,
        });
    }
}

//------------------tutor and Category ------------------------

const setCategoryForTutor = async (req: Request, res: Response) => {

    try {

        const { categoryIds } = req.body;
        const user = req.user


        if (user?.role !== UserRole.TUTOR) {
            return res.status(403).json({
                success: false,
                message: " Only tutor can set Cetegory For Himslef/Herself"
            })

        }

        if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "categoryIds must be an array",
            });
        }

        const tutor = await TutorService.getTutorByUserId(user.id)

        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "No tutor profile  Found !!! "
            })

        }

        const result = await TutorService.categorysetForTutorService(tutor.id, categoryIds)

        res.status(201).json({
            success: true,
            message: "Cetegory Added Succesfully",
            data: result
        })




    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Faild to set Cetegory for Tutor profile",
            error: error
        })

    }

}



export const TutorController = {
    createTutor,
    getAllTutor,
    getTutorById,
    getTutorByUser,
    deleteTutorbyUserid,
    updateTutor,

    //------
    setCategoryForTutor

};
