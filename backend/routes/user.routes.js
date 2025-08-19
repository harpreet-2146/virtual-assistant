import express from "express"
import {getCurrentUser} from "../controllers/user.controllers.js"
const userRouter=express.Router()

authRouter.get("/current",getCurrentUser)
export default userRouter