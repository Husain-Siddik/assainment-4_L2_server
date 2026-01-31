import express, { Router } from "express";
import { availabilityController } from "./availability.controller";
import authorizeRoles, { UserRole } from "../../middlewares/authorizeRoles";

const router: Router = express.Router()


// public 
router.get("/", availabilityController.getALLAvailability);


// private 

router.post("/create", authorizeRoles(UserRole.TUTOR), availabilityController.createAvailability)

router.patch("/update/:id", authorizeRoles(UserRole.TUTOR), availabilityController.updateAvailability)

router.delete("/delete/:id", authorizeRoles(UserRole.TUTOR), availabilityController.deleteAvailability)

//  for private routers
//  authorizeRoles(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN),

export const availabilityRouter: Router = router;