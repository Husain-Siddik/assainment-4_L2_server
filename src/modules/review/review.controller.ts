



import { Request, Response } from "express";

import { UserRole } from "../../middlewares/authorizeRoles";

import { reviewService } from './review.service';
import { success } from "better-auth/*";
import { json } from "node:stream/consumers";



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

// by reviews id public

const getReviewByReviewid = async (req: Request, res: Response) => {

    try {

        const reviewId = Number(req.params.id);

        if (!reviewId) {

            return res.status(400).json({
                message: "reviewId is is requard "
            })
        }

        const result = await reviewService.getReviewByReviewIdService(reviewId)

        res.status(200).json({
            success: true,
            message: "review fatched successfully",
            data: result
        })



    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Review fached faild ",
            error: error

        })

    }

}


//get all review

const getAllReviews = async (req: Request, res: Response) => {

    try {
        // only admin can see

        const user = req?.user

        if (user?.role !== UserRole.ADMIN) {

            return res.status(403).json({
                success: false,
                message: "Only admin can see All reviews "
            })

        }


        const result = await reviewService.getAllReviewsService()

        res.status(200).json({
            success: true,
            message: "All reviews Fatched successfully ",
            data: result
        })





    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Reviews fatched Failed !",
            error: error
        })

    }

}


// only student can Update own  review 

const updateReview = async (req: Request, res: Response) => {

    try {
        const { tutorId, rating, comment } = req.body;
        const studentId = req.user?.id;

        if (typeof tutorId !== "number" || typeof rating !== "number") {

            return res.status(400).json({
                message: "tutor id and rating must be an nubmber "
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

        if (!studentId || req.user?.role !== UserRole.STUDENT) {
            return res.status(403).json({
                message: "Unauthorized "
            })
        }



        const review = await reviewService.updateReviewService(studentId, tutorId, rating, comment);
        res.status(200).json({
            success: true,
            data: review
        });
    } catch (e: any) {
        res.status(400).json({
            success: false,
            message: e.message || e
        });
    }

};


const deleteReview = async (req: Request, res: Response) => {
    try {
        const tutorId = Number(req.params.tutorId);
        const studentId = req.user?.id;

        const result = await reviewService.deleteReviewService(studentId!, tutorId);

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: result
        });

    } catch (e: any) {
        res.status(400).json({
            success: false,

            message: e.message || e
        });
    }
};






export const reviewController = {

    createReview,
    getReviewsByTutorId,
    getReviewByReviewid,
    getAllReviews,
    updateReview,
    deleteReview

}