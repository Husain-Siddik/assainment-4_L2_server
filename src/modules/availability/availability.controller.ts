

import { Request, Response } from "express";

import { UserRole } from "../../middlewares/authorizeRoles";
import { availabilityService } from "./availability.service";
import { TutorService } from "../tutor/tutor.service";




const getALLAvailability = async (req: Request, res: Response) => {


    try {

        const result = await availabilityService.getAllAvailability();


        res.status(200).json(
            {
                success: true,
                data: result
            });

    } catch (err) {

        res.status(500).json({ success: false, message: "Failed to fetch availability" });
    }


}


const createAvailability = async (req: Request, res: Response) => {

    const { date, startTime, endTime } = req.body;


    try {

        if (!date || !startTime || !endTime) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (startTime >= endTime) {
            return res.status(400).json({
                success: false,
                message: "startTime must be before endTime",
            });
        }

        const userId = req.user!.id;
        const tutor = await TutorService.getTutorByUserId(userId)

        const tutorId = tutor?.id

        if (!tutor) {

            return res.status(400).json({
                success: false,
                message: "Tutor not found  !!!"
            });
        }

        // checking slot is already booked   ?

        const isAvailable = await availabilityService.isSlotAvailable(tutorId as number, date, startTime, endTime);

        if (!isAvailable) {
            return res.status(400).json({
                success: false,
                message: "This time slot is already have  Please choose a different time.",
            });
        }

        const availability = await availabilityService.createAvailability(tutorId as number, date, startTime, endTime);

        res.status(201).json({
            success: true,
            message: "Availability created successfully",
            data: availability,

        })



    } catch (err) {

        res.status(500).json({ success: false, message: "faild  to cretae avilability " });
    }


}

const updateAvailability = async (req: Request, res: Response) => {
    try {

        const availabilityId = Number(req.params.id);
        const { date, startTime, endTime, isBooked } = req.body;

        //id check 

        if (!availabilityId) {
            return res.status(400).json({
                success: false,
                message: "Availability id is required",
            });
        }


        //exixts or not 
        const isExist = await availabilityService.getAvailibilityById(availabilityId)



        if (!isExist) {
            return res.status(404).json({
                success: false,
                message: "Availability not found  !!!",
            });
        }

        //chekeing own or not 
        const userid = req.user!.id;
        const tutor = await TutorService.getTutorByUserId(userid);

        if (tutor?.id !== isExist.tutorId) {

            return res.status(403).json({

                success: false,
                message: "You are not authorized to update this availability",

            });
        }

        const updateddata = await availabilityService.updateAvailability(availabilityId, {

            date: date ? new Date(date) : isExist.date,
            startTime: startTime || isExist.startTime,
            endTime: endTime || isExist.endTime,
            isBooked: isBooked !== undefined ? isBooked : isExist.isBooked,

        });

        res.status(200).json({
            success: true,
            massage: "availability updated !!",
            data: updateddata
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to update availability"
        });
    }

}


const deleteAvailability = async (req: Request, res: Response) => {

    try {
        const availabilityId = Number(req.params.id);

        if (!availabilityId) {
            return res.status(400).json({
                success: false,
                message: "Availability id is required",
            });
        }

        // check availability exixta or not 
        const isExist = await availabilityService.getAvailibilityById(availabilityId)


        if (!isExist) {
            return res.status(404).json({
                success: false,
                message: "Availability not found",
            });
        }

        // cheecking own or other 
        const userid = req.user?.id
        const tutor = await TutorService.getTutorByUserId(userid as string);

        if (!tutor || tutor.id !== isExist.tutorId) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete ",
            });
        }

        const deletedData = await availabilityService.deleteAvailability(availabilityId);

        res.status(200).json({
            success: true,
            message: "Availability deleted successfully",
            data: deletedData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete availability",
            error,
        });
    }
};





export const availabilityController = {
    getALLAvailability,
    createAvailability,
    updateAvailability,
    deleteAvailability

};