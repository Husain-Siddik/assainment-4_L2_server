import { Request, Response } from "express";

import { UserRole } from "../../middlewares/authorizeRoles";
import { bookingService } from "./booking.service";

import { TutorService } from "../tutor/tutor.service";
import { BookingStatus } from "../../../generated/prisma/enums";







const createBooking = async (req: Request, res: Response) => {

    try {
        // user 
        const user = req?.user;

        if (!user) {
            return res.status(400).json({

                error: "Unauthorized  login required  !! ",

            });
        }

        if (user.role !== UserRole.STUDENT) {

            return res.status(400).json({

                error: "Unauthorized  Only student can book  a tutor  !!",
            });

        }

        const { tutorId, status } = req.body;

        const result = await bookingService.createBookingService({

            studentId: user.id as string,

            tutorId: Number(tutorId),
            status,

        });

        res.status(201).json({
            success: true,
            message: " Booking created successfully ",
            data: result
        });

    } catch (e) {
        res.status(500).json({
            message: false,
            error: "Booking creation failed !!",
            details: e
        })
    }


}


const updateBooking = async (req: Request, res: Response) => {
    try {
        const { bookingId, status } = req.body;
        const user = req.user;

        if (!bookingId || !status) {
            return res.status(400).json({
                success: false,
                message: "Booking ID and status are required",
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // get booking by id
        const booking = await bookingService.getBookingByBookingidService(Number(bookingId));

        if (!booking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // check permission 

        if (user.role === UserRole.STUDENT) {

            //* Student can only cancel

            if (booking.studentId !== user.id) {
                return res.status(403).json({
                    success: false,
                    message: "You can update only your own bookings "
                });
            }

            if (status !== BookingStatus.CANCELLED) {
                return res.status(403).json({
                    success: false,
                    message: " Student can only cancel their bookings "
                });
            }

        } else if (user.role === UserRole.TUTOR) {

            //* Tutor can update  mark completed

            const tutorProfile = await TutorService.getTutorByUserId(user.id);

            if (!tutorProfile || booking.tutorId !== tutorProfile.id) {

                return res.status(403).json({
                    success: false,
                    message: "You can update only yours"
                });
            }
            if (status !== BookingStatus.COMPLETED && status !== BookingStatus.CANCELLED) {

                return res.status(403).json({
                    success: false,
                    message: "Tutor can only mark completed or cancel"
                });
            }
        } else if (user.role === UserRole.ADMIN) {
            //* Admin can update any 

        } else {
            return res.status(403).json({
                success: false,
                message: "Role not allowed to update booking"
            });
        }


        const updatedBooking = await bookingService.updateBookingService(Number(bookingId), status);

        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: updatedBooking,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to update booking",
            details: error.message,
        });
    }
};


const getBookingByUserId = async (req: Request, res: Response) => {

    try {

        const user = req?.user;

        if (!user) {

            return res.status(400).json({
                error: " Unauthorized  login required  !! ",

            });
        }

        const bookings = await bookingService.getBookingByUserIdService(user.id as string);

        res.status(200).json({

            success: true,
            message: "Bookings fetched successfully",
            data: bookings
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: "Failed to fetch bookings",
            details: error.message,
        });
    }
}



// only admin can 
const getAllBooking = async (req: Request, res: Response) => {

    try {

        const user = req?.user

        if (user?.role !== UserRole.ADMIN) {

            return res.status(400).json({
                success: false,
                error: " Unauthorized  you are not an admin   !! ",

            });
        }

        const result = await bookingService.getAllBookingservice

        res.status(200).json({
            success: true,
            message: "data fatched succesfull",
            data: result
        })



    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: "Failed to fatch  all  bookings",
            details: error.message,
        });
    }

}


const getBookingById = async (req: Request, res: Response) => {

    try {

        const user = req?.user // user
        const id = Number(req.params.id) // booking id 

        if (!id) {
            return res.status(400).json({
                success: false,
                error: "id is requered ",
            });

        }




        const booking = await bookingService.getBookingByBookingidService(id as number)


        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        if (booking.studentId !== user?.id) {
            return res.status(403).json({
                error: "You are not allowed to view this booking",
            });
        }



        res.status(200).json({
            success: true,
            message: "booking succesfully fatched",
            data: booking,
        });




    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: "Failed to fetch  booking",
            details: error.message,
        });
    }

}

// only tutor can 

const getBookingForTutor = async (req: Request, res: Response) => {

    try {
        const user = req.user
        const userid = user?.id

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }


        const result = await bookingService.getBookingForTutorService(userid as string)


        res.status(200).json({
            success: true,
            message: " all booking fetched succesfully ",
            data: result
        })






    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch bookings",

        })

    }


}


export const bookingController = {

    createBooking,
    updateBooking,
    getBookingByUserId,
    getAllBooking,
    getBookingById,
    getBookingForTutor


};
