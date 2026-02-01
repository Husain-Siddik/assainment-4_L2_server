import { Category, User } from './../../../generated/prisma/client';
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/authorizeRoles";


const createReviewService = async (

    studentId: string,
    tutorId: number,
    rating: number,
    comment: string


) => {

    return await prisma.review.create({
        data: {
            studentId,
            tutorId,
            rating,
            comment,
        }
    })

}


//public 
const getReviewsByTutorIdService = async (

    tutorId: number

) => {

    return await prisma.review.findMany({

        where: { tutorId },
        include: {

            student: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
}


const getReviewByReviewIdService = async (id: number) => {

    return await prisma.review.findUnique({
        where: {
            id
        },

        include: {
            student: {
                select: {
                    id: true,
                    name: true,
                    email: true,

                }
            },
            tutor: {
                select: {
                    id: true,
                    bio: true,
                    pricePerHr: true,
                    userId: true
                }
            }
        }
    })



}




export const reviewService = {
    createReviewService,
    getReviewsByTutorIdService,
    getReviewByReviewIdService

}