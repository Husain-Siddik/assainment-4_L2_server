

import { UserStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";




const getCurentUserservice = async (userId: string) => {

    const user = await prisma.user.findUnique({

        where: {
            id: userId,
        },

        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    return user;
}


const getuserbyIdService = async (userId: string) => {

    const user = await prisma.user.findUnique({

        where: {
            id: userId,
        },


        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    return user;
}


const updateUserProfileService = async (

    userId: string,
    payload: {
        name?: string;
        image?: string;
        status?: UserStatus;
    }
) => {
    return prisma.user.update({

        where: {

            id: userId
        },
        data: payload,
    });
};


const deleteProfileService = async (userId: string) => {

    return prisma.user.delete({

        where: {

            id: userId
        },

    });
};


const getAllUsersService = async () => {

    const users = await prisma.user.findMany({

        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    return users;
};



export const userService = {
    getCurentUserservice,
    getuserbyIdService,
    updateUserProfileService,
    deleteProfileService,
    getAllUsersService

}