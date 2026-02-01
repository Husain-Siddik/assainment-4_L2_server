import express, { Router } from 'express';


import authorizeRoles, { UserRole } from '../../middlewares/authorizeRoles';
import { reviewController } from './review.controller';



const router = express.Router();

//public
router.get("/bytutor/:tutorId", reviewController.getReviewsByTutorId)
router.get("/:id", reviewController.getReviewByReviewid)


// only student can 
router.post("/", authorizeRoles(UserRole.STUDENT), reviewController.createReview)
router.put('/update', authorizeRoles(UserRole.STUDENT), reviewController.updateReview)

// only admin can 
router.get('/all', authorizeRoles(UserRole.ADMIN), reviewController.getAllReviews)





export const reviewRouter: Router = router;