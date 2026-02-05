// import { CommentStatus, Post, PostStatus } from "../../../generated/prisma/client";
// import { PostWhereInput } from "../../../generated/prisma/models";
import { TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/authorizeRoles";

export const createTutor = async (
    data: Omit<TutorProfile, "id" | "createdAt" | "userId">,
    userId: string,
    role: UserRole
) => {
    if (role !== UserRole.TUTOR) {

        return null;
    }


    const tutor = await prisma.tutorProfile.create({
        data: {
            ...data,
            userId,
        },
    });

    return tutor;
};




const getTutorById = async (id: number) => {
    const tutor = await prisma.tutorProfile.findUnique({

        omit: {
            createdAt: true
        },

        where: {
            id,

        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
            categories: true,
            availability: true,
            reviews: {
                include: {
                    student: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });

    return tutor;
};



interface FilterOptions {

    categoryNames?: string[];
    minRating?: number | undefined;
}

const getAllTutor = async (options: FilterOptions) => {

    const { categoryNames, minRating } = options;

    const tutors = await prisma.tutorProfile.findMany({

        where: {
            AND: [
                categoryNames && categoryNames.length > 0

                    ? {
                        categories: {
                            some: {
                                name: { in: categoryNames },
                            },
                        },
                    }

                    : {},
                minRating !== undefined
                    ? {
                        rating: {
                            gte: minRating,
                        },
                    }
                    : {},
            ],
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
            categories: true,
            availability: true,
            reviews: {
                include: {
                    student: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },

    });

    return tutors;
};



const getTutorByUserId = async (userId: string) => {
    return await prisma.tutorProfile.findUnique({
        where: { userId },
    });
};

const deleteTutorWithUser = async (userId: string,) => {

    return await prisma.$transaction([

        prisma.tutorProfile.delete({
            where: { userId },
        }),
        //usr delete
        prisma.user.delete({
            where: { id: userId },
        }),
    ]);


}

const updateTutorProfile = async (userId: string, data: Partial<TutorProfile>) => {

    return await prisma.tutorProfile.update({
        where: { userId },
        data,
    });
}


//-----------------Category (Subject Related )-----------------------

const categorysetForTutorService = async (
    tutorId: number,
    categoryIds: number[]

) => {

    return await prisma.tutorProfile.update({
        where: {
            id: tutorId
        },
        data: {
            categories: {
                set: categoryIds.map((id) => ({ id }))
            }
        },
        include: {
            categories: true
        }
    })


}



export const TutorService = {
    createTutor,
    getTutorById,
    getAllTutor,
    getTutorByUserId,
    deleteTutorWithUser,
    updateTutorProfile,

    // ------

    categorysetForTutorService,

}