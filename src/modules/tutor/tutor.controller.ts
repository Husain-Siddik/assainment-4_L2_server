import { Request, Response } from "express";

import { UserRole } from "../../middlewares/authorizeRoles";
import { TutorService } from "./tutor.service";


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



export const TutorController = {
    createTutor,
    getAllTutor,
    getTutorById,
    getTutorByUser,

};
