
import { Category, User } from './../../../generated/prisma/client';

import { Request, Response } from "express";

import { UserRole } from "../../middlewares/authorizeRoles";
import { number, success } from 'better-auth/*';
import { reviewService } from './review.service';



const createReview = async (req: Request, res: Response) => {

    try {

        const { tutorId, rating, comment, } = req.body
        const user = req?.user


        if (!user) {
            return res.status(401).json({
                message: "Unauthorized !!"
            })

        }

        if (user.role !== UserRole.STUDENT) {

            return res.status(403).json({
                message: " Only Student Can give  review "
            })

        }


        if (typeof tutorId !== "number" || typeof rating !== "number") {
            return res.status(400).json({
                messsage: "Tutorid or rating  must be a Number"
            })

        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5"
            });
        }

        if (typeof comment !== "string" || comment.trim() === "") {
            return res.status(400).json({
                message: "Comment is required and must be a non-empty string"
            })

        }

        const result = await reviewService.createReviewService(user.id, tutorId, rating, comment)

        res.status(201).json({
            success: true,
            message: "Review created successfully !",
            data: result
        })




    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to Create Review ",
            error: error
        })

    }

}


// public
const getReviewsByTutorId = async (req: Request, res: Response) => {

    try {
        const tutorId = Number(req.params.tutorId);

        if (!tutorId) {

            return res.status(400).json({
                message: "Tutor id is requard "
            })
        }

        const reviews = await reviewService.getReviewsByTutorIdService(tutorId);

        res.status(200).json({
            success: true,
            message: " Reviews fached succesfully",
            data: reviews
        });

    } catch (e: any) {

        res.status(400).json({
            success: false,
            message: e.message || e
        });
    }
};

// by reviews id 





export const reviewController = {

    createReview,
    getReviewsByTutorId

}