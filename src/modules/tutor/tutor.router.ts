import express, { Router } from 'express';

// import auth, { UserRole } from '../../middlewares/auth';
import { TutorController } from './tutor.controller';
import authorizeRoles, { UserRole } from '../../middlewares/authorizeRoles';



const router = express.Router();


//  ----------------------protected routes-----

router.post(
    "/",
    authorizeRoles(UserRole.TUTOR),
    TutorController.createTutor
)

router.get("/byuser", authorizeRoles(UserRole.TUTOR), TutorController.getTutorByUser)

// ---------- public routes --------------


router.get("/", TutorController.getAllTutor)

router.get(
    "/:id",
    TutorController.getTutorById
)











export const tutorRouter: Router = router;