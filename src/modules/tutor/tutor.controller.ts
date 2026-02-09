import { Result } from './../../../generated/prisma/internal/prismaNamespace';

import { Request, Response } from "express";

import { UserRole } from "../../middlewares/authorizeRoles";
import { TutorService } from "./tutor.service";

import { categoryService } from "../category/category.service";
import { success } from 'better-auth';




const createTutor = async (req: Request, res: Response) => {


    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized!",
            });
        }

        if (user.role !== UserRole.TUTOR) {

            return res.status(400).json({

                success: false,
                message: "Unauthorized!",
            });

        }

        const result = await TutorService.createTutor(

            req.body,
            user.id as string,
            user.role as UserRole,

        );

        res.status(201).json({
            success: true,
            message: "Tutor Profile Created Succesfully ",
            data: result
        });

    } catch (e) {
        res.status(400).json({
            success: false,
            error: "Tutor Profile creation failed",
            details: e
        })
    }
};

const getTutorById = async (req: Request, res: Response) => {

    try {
        const tutorId = req.params.id

        if (!tutorId) {
            return res.status(400).json({
                success: false,
                message: "tutor Id Unavailable "
            })
        }

        const result = await TutorService.getTutorById(Number(tutorId));

        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Tutor  unavailable"
            })
        }

        res.status(200).json({
            success: true,
            message: "Tutor Fatched Succesfully",
            data: result
        });
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

        res.status(200).json({
            success: true,
            message: "All Tutor Fatched Succesfully",
            data: result
        });

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
                success: false,
                message: "Unauthorized: user not logged in",
            });
        }

        const tutor = await TutorService.getTutorByUserId(userId);

        if (!tutor) {
            return res.status(404).json({
                success: false,
                mesage: "Tutor profile not found for this user",
            });
        }

        res.status(200).json({
            success: true,
            message: "tutor profile Fetch Succesfully ",
            data: tutor
        });
    } catch (error: any) {
        res.status(500).json({
            error: "Failed to get tutor",
            details: error.message,
        });
    }
};


const deleteTutorbyUserid = async (req: Request, res: Response) => {

    try {

        const userId = (req as any).user?.id;

        if (!userId) {
            return res.status(400).json({

                message: "User not found"
            })

        }
        const tutor = await TutorService.getTutorByUserId(userId);

        if (!tutor) {
            return res.status(400).json({
                message: "Tutor profile not found for this user"
            })
        }

        //  delete user and tutor 

        if (tutor?.userId === userId) {
            const result = await TutorService.deleteTutorWithUser(userId);

            return res.status(200).json({
                message: "Tutor profile deleted successfully",
                data: result
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "you are not authorized",

            })
        }





    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to delete tutor",
            details: error,
        });

    }
}



const updateTutor = async (req: Request, res: Response) => {

    try {

        const user = req?.user

        const userId = user?.id


        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized not logged in",
            });
        }

        const tutor = await TutorService.getTutorByUserId(userId);

        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "There is no tutor profile for  this user ",
            });
        }

        if (tutor.userId !== userId) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this tutor profile",

            });
        }

        const updatedTutor = await TutorService.updateTutorProfile(userId, req.body);

        res.status(200).json({
            success: true,
            message: "Tutor profile updated successfully",
            data: updatedTutor
        });




    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: "Failed to update profile  ",
            details: error.message,
        });
    }
}

//------------------tutor and Category ------------------------

const setCategoryForTutor = async (req: Request, res: Response) => {

    try {

        let { categoryIds } = req.body;
        const user = req.user


        if (user?.role !== UserRole.TUTOR) {
            return res.status(403).json({
                success: false,
                message: " Only tutor can set Cetegory For Himslef/Herself"
            })

        }

        if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "categoryIds must be an array",
            });
        }


        const tutor = await TutorService.getTutorByUserId(user.id)

        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "No tutor profile  Found !!! "
            })

        }

        //category id validation befor set 

        const validCategorys = await categoryService.validCategoryesService(categoryIds)


        const validIds = validCategorys.map(c => c.id)

        const invalidIds = categoryIds.filter(
            (id: number) => !validIds.includes(id)
        );


        if (invalidIds.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid category IDs provided ",
                invalidCategoryIds: invalidIds,
            });
        }




        const result = await TutorService.categorysetForTutorService(tutor.id, categoryIds)

        res.status(201).json({
            success: true,
            message: "Cetegory Added Succesfully",
            data: result
        })




    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Faild to set Cetegory for Tutor profile",
            error: error
        })

    }

}


const removeCategoryForTutor = async (req: Request, res: Response) => {


    try {
        const { categoryIds } = req.body;
        const user = req.user;

        if (user?.role !== UserRole.TUTOR) {
            return res.status(403).json({
                success: false,
                message: "Only tutor can remove categories",
            });
        }

        if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "categoryIds must be a non-empty array",
            });
        }

        const tutor = await TutorService.getTutorByUserId(user.id);
        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "Tutor profile not found",
            });
        }

        const result = await TutorService.removeCategoryService(
            tutor.id,
            categoryIds
        );

        return res.status(200).json({
            success: true,
            message: "Categories removed successfully",
            data: result,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to remove categories",
            error,
        });
    }

}


const addSingelTutorCategory = async (req: Request, res: Response) => {

    try {

        const { categoryIds } = req.body;
        const user = req.user


        if (user?.role !== UserRole.TUTOR) {
            return res.status(403).json({
                success: false,
                message: " Only tutor can set Cetegory For Himslef/Herself"
            })

        }

        if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "categoryIds must be an array",
            });
        }


        const tutor = await TutorService.getTutorByUserId(user.id)

        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "No tutor profile  Found !!! "
            })

        }


        const validCategorys = await categoryService.validCategoryesService(categoryIds)


        const validIds = validCategorys.map(c => c.id)

        const invalidIds = categoryIds.filter(
            (id: number) => !validIds.includes(id)
        );


        if (invalidIds.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid category IDs provided ",
                invalidCategoryIds: invalidIds,
            });
        }

        const result = await TutorService.addSingelCategoryService(tutor.id, categoryIds)


        res.status(201).json({
            success: true,
            message: "Added singel Category",
            data: result
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Adding category Faild ",
            error: error
        })

    }
}


const deleteAllCategoryForTutor = async (req: Request, res: Response) => {

    try {

        const user = req.user;

        if (user?.role !== UserRole.TUTOR) {
            return res.status(403).json({
                success: false,
                message: "Only tutor can remove categories",
            });
        }


        const tutor = await TutorService.getTutorByUserId(user.id);
        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: "Tutor profile not found",
            });
        }

        const result = await TutorService.deleteAllCategoryService(tutor.id)

        res.status(200).json({
            success: true,
            message: "all Category Deleted Succesfully ",
            data: result
        })




    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Faild to delete All Category "
        })
    }
}



export const TutorController = {
    createTutor,
    getAllTutor,
    getTutorById,
    getTutorByUser,
    deleteTutorbyUserid,
    updateTutor,

    //------Category ----
    setCategoryForTutor,
    removeCategoryForTutor,
    addSingelTutorCategory,
    deleteAllCategoryForTutor

};
