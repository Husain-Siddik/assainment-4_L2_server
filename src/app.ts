
import express, { Application } from "express"
import { toNodeHandler } from "better-auth/node";

import { availabilityRouter } from "./modules/availability/availability.router"
import { auth } from "./lib/auth";
import cors from "cors"
import authorizeRoles, { UserRole } from "./middlewares/authorizeRoles";
import { tutorRouter } from "./modules/tutor/tutor.router";
import { categoryRouter } from "./modules/category/category.router";





const app: Application = express()

app.use(cors({

  origin: process.env.APP_URL || "http://localhost:4000",
  credentials: true,

}))


app.use(express.json())



app.all("/api/auth/*splat", toNodeHandler(auth));


// tutor 

app.use("/api/tutors", tutorRouter)



// for tutor avialable or  Not 
app.use("/api/tutors-availability", availabilityRouter)


// category 
app.use("/api/category", categoryRouter)


app.get('/',
  (req, res) => {
    res.send('welcome ')
  })


export default app 