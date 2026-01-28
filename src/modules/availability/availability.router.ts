import  express, { Router } from "express";

const router : Router  = express.Router()

router.post(

    '/',
   async (req ,res ) => {

    res.send(" create a new post ")
   }

)


export const availabilityRouter : Router  = router ;