import express, { Router } from 'express';


import authorizeRoles, { UserRole } from '../../middlewares/authorizeRoles';
import { reviewController } from './review.controller';



const router = express.Router();

//public
router.get("/bytutor/:tutorId", reviewController.getReviewsByTutorId)


// only student can 
router.post("/", authorizeRoles(UserRole.STUDENT), reviewController.createReview)





export const reviewRouter: Router = router;