import { Category, User } from './../../../generated/prisma/client';
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/authorizeRoles";



const getAllCategory = async () => {

    const categories = await prisma.category.findMany({

        orderBy: {
            name: "desc"
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


const getCetegoryByIdService = async (id: number) => {

    return await prisma.category.findUnique({
        where: {
            id
        }
    })


}


const createCategoryService = async (name: string) => {

    return await prisma.category.create({
        data: {
            name: name,
        }
    })


}

const updateCategoryService = async (id: number, name: string) => {

    return await prisma.category.update({
        where: {
            id
        },
        data: {
            name
        }

    })

}

const deleteCategoryService = async (id: number) => {

    return await prisma.category.delete({

        where: {

            id
        }

    })

}


//

//  tutor use 


const validCategoryesService = async (categoryIds: number[]) => {

    return await prisma.category.findMany({
        where: {
            id: { in: categoryIds },
        },
        select: {
            id: true
        }
    })


}



export const categoryService = {

    createCategoryService,
    getAllCategory,
    getCetegoryByIdService,
    updateCategoryService,
    deleteCategoryService,


    validCategoryesService

}