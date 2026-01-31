import { User } from './../../../generated/prisma/client';
import { TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/authorizeRoles";



const getAllCategory = async () => {

    const categories = await prisma.category.findMany({

        orderBy: {
            name: "asc"
        },
        include: {
            tutors: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    }

                }

            }

        }

    })

    return categories;
};




export const categoryService = {

    getAllCategory,

}