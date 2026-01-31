import express, { Router } from 'express';


import authorizeRoles, { UserRole } from '../../middlewares/authorizeRoles';

import { userController } from './user.controller';


const router = express.Router();


// private routes
router.get("/me", authorizeRoles(UserRole.ADMIN, UserRole.STUDENT), userController.getCurentUser);
router.patch("/me", authorizeRoles(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR), userController.updateUser);
router.delete("/me", authorizeRoles(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR), userController.deleteProfile);



//public
router.get("/:id", userController.getuserbyid);


export const userRouter: Router = router;