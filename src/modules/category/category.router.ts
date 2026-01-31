import express, { Router } from 'express';


import authorizeRoles, { UserRole } from '../../middlewares/authorizeRoles';
import { categoryController } from './category.controller';


const router = express.Router();

// public 
router.get(
    "/",
    categoryController.getAllCetogories
)





export const categoryRouter: Router = router;