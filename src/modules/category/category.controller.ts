import { string, success } from 'better-auth/*';
import { Category, User } from './../../../generated/prisma/client';

import { Request, Response } from "express";

import { UserRole } from "../../middlewares/authorizeRoles";
import { categoryService } from "./category.service";




const getAllCetogories = async (req: Request, res: Response) => {

    try {

        const data = await categoryService.getAllCategory()

        res.status(200).json({
            success: true,
            message: "All categories retrieved successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fatch  categories",
            error: error
        })
    }
}

const getCategoryById = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: " Invalid  id",
            });
        }

        //admin kina double check  baki 

        const result = await categoryService.getCetegoryByIdService(id)

        res.status(200).json({
            success: true,
            message: "Cetegory data Fatched Successfully ",
            data: result
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fatch ",
            error: error
        })
    }

}



const createCategory = async (req: Request, res: Response) => {

    try {

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "name field is requeard"
            })

        }

        if (typeof name !== "string") {
            return res.status(400).json({
                message: " name must be a string"
            })

        }


        // admin check have to do baki

        const result = await categoryService.createCategoryService(name)

        res.status(200).json({
            success: true,
            message: "cetegory created succesfully",
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create  categories",
            error: error
        })
    }

}




const updateCategory = async (req: Request, res: Response) => {

    try {
        const id = Number(req.params.id);

        const { name } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: " Invalid  id",
            });
        }

        if (typeof name !== "string") {
            return res.status(400).json({
                message: " name must be a string"
            })

        }

        // admin double check baki 


        const result = await categoryService.updateCategoryService(id, name);

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: result,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "faild to update ",
            error: error
        })

    }

}


const deleteCategory = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({
                message: "id must be an number "
            })

        }
        // admin again check

        const result = await categoryService.deleteCategoryService(id)

        res.status(200).json({
            success: true,
            message: " Deleted successfully ",
            data: result
        })




    } catch (error) {

        res.status(500).json({
            success: false,
            message: "failed to delete Cetegory",
            error: error
        })

    }

}




export const categoryController = {

    getAllCetogories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory

};
