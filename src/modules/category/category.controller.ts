
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





export const categoryController = {

    getAllCetogories

};
