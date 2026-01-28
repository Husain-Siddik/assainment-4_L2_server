
import express, { Application }   from "express"
import { availabilityRouter } from "./modules/availability/availability.router"

const app :Application = express()


app.use(express.json())

// for tutor avialable or  Not 
app.use("/availability", availabilityRouter)


app.get('/', (req, res) => {
  res.send('welcome ')
})


export default app 