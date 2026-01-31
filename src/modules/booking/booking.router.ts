import express, { Router } from 'express';
import { bookingController } from './booking.controller';
import authorizeRoles, { UserRole } from '../../middlewares/authorizeRoles';





const router = express.Router();

//* private

router.post("/", authorizeRoles(UserRole.STUDENT), bookingController.createBooking)

//special update route  -->  need check 
router.patch("/update", authorizeRoles(UserRole.STUDENT, UserRole.ADMIN, UserRole.TUTOR), bookingController.updateBooking)
//
router.get("/me", authorizeRoles(UserRole.STUDENT, UserRole.TUTOR), bookingController.getBookingByUserId)
router.get("/:id", authorizeRoles(UserRole.STUDENT), bookingController.getBookingById)

//* 
router.get('/tutor/my-bookings', authorizeRoles(UserRole.TUTOR), bookingController.getBookingForTutor)


//only admin can 
router.get("/all", authorizeRoles(UserRole.ADMIN), bookingController.getAllBooking)


export const bookingRouter: Router = router;