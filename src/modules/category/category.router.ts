import express, { Router } from 'express';


import authorizeRoles, { UserRole } from '../../middlewares/authorizeRoles';
import { categoryController } from './category.controller';


const router = express.Router();

// public 
router.get(
    "/",
    categoryController.getAllCetogories
)

// private 

router.post("/", categoryController.createCategory)
router.get("/:id", categoryController.getCategoryById)
router.put("/:id", categoryController.updateCategory)
router.delete("/:id", categoryController.deleteCategory)



export const categoryRouter: Router = router;