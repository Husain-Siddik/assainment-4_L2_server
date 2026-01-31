
import { User } from './../../../generated/prisma/client';
import { TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/authorizeRoles";


const getAllAvailability = async () => {
    return await prisma.availability.findMany({
        include: {
            tutor: {
                select: {
                    userId: true,
                    bio: true,
                    pricePerHr: true,
                },
            },
        },
        orderBy: { date: "asc" },
    });
}




const createAvailability = async (tutorId: number, date: string, startTime: string, endTime: string) => {

    const availability = await prisma.availability.create({
        data: {
            tutorId,
            date: new Date(date),
            startTime,
            endTime,
        },
    });

    return availability
}



const isSlotAvailable = async (tutorId: number, date: string, startTime: string, endTime: string) => {

    const existingAvailability = await prisma.availability.findFirst({
        where: {
            tutorId,
            date: new Date(date),
            startTime,
            endTime,
        },
    });

    return !existingAvailability;
}


const getAvailibilityById = async (availabilityId: number) => {
    return await prisma.availability.findUnique({
        where: {
            id: availabilityId
        }
    })

}




const updateAvailability = async (availabilityId: number, data: any) => {

    return await prisma.availability.update({

        where: {
            id: availabilityId
        },
        data,
    });
};


const deleteAvailability = async (availabilityId: number) => {

    return await prisma.availability.delete({
        where: {
            id: availabilityId
        }
    })

}

export const availabilityService = {
    getAllAvailability,
    createAvailability,
    isSlotAvailable,
    updateAvailability,
    getAvailibilityById,
    deleteAvailability
}