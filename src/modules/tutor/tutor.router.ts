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

router.patch(
    "/byuser",
    authorizeRoles(UserRole.TUTOR),
    TutorController.updateTutor
)

router.delete(
    "/byUserid",
    authorizeRoles(UserRole.TUTOR, UserRole.ADMIN),
    TutorController.deleteTutorbyUserid
)

// Cetegory related 

router.post("/add-category", authorizeRoles(UserRole.TUTOR), TutorController.setCategoryForTutor)
router.delete("/delete-category", authorizeRoles(UserRole.TUTOR), TutorController.removeCategoryForTutor)

router.post("/add-singelCategory", authorizeRoles(UserRole.TUTOR), TutorController.addSingelTutorCategory)
router.delete("/delete-all_category", authorizeRoles(UserRole.TUTOR), TutorController.deleteAllCategoryForTutor)




// ---------- public routes --------------


router.get("/", TutorController.getAllTutor)

router.get(
    "/:id",
    TutorController.getTutorById
)











export const tutorRouter: Router = router;