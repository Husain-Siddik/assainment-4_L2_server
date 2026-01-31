import { BookingStatus, User } from './../../../generated/prisma/client';

import { prisma } from "../../lib/prisma";




const getAllBookingservice = async () => {

    return await prisma.booking.findMany({

        include: {
            student: true,
            tutor: true,
        },

        orderBy: {
            createdAt: "desc"
        }

    })

}





const createBookingService = async (data: {

    studentId: string;
    tutorId: number;
    status?: BookingStatus

}) => {
    return await prisma.booking.create({
        data: {
            studentId: data.studentId,
            tutorId: data.tutorId,
            status: data.status || BookingStatus.CONFIRMED,
        },
    });
}


const updateBookingService = async (bookingId: number, status: BookingStatus) => {

    return await prisma.booking.update({

        where: {
            id: bookingId,
        },

        data: {
            status,
        },

    });

}


const getBookingByUserIdService = async (userId: string) => {

    return await prisma.booking.findMany({

        where: {
            studentId: userId,
        },
        include: {
            tutor: true
        }

    });

}

const getBookingByBookingidService = async (id: number) => {

    return await prisma.booking.findUniqueOrThrow({
        where: {
            id
        }

    })

}

// only for tutor 

const getBookingForTutorService = async (userId: string) => {

    const tutor = await prisma.tutorProfile.findUnique({
        where: { userId },
    });

    if (!tutor) {
        throw new Error("Tutor profile not found");
    }


    // tutor bookings
    const bookings = await prisma.booking.findMany({

        where: {
            tutorId: tutor.id
        },
        include: {

            student: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return bookings;



}







export const bookingService = {

    createBookingService,
    updateBookingService,
    getBookingByUserIdService,
    getAllBookingservice,
    getBookingByBookingidService,
    getBookingForTutorService



}