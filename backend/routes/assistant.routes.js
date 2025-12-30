import express from "express"
import { customizeAssistant, addToHistory, getHistory, clearHistory } from "../controllers/assistant.controller.js"
import isAuth from "../middlewares/isAuth.js"
import upload from "../middlewares/multer.js"

const assistantRouter = express.Router()

assistantRouter.post("/customize", isAuth, upload.single("assistantImage"), customizeAssistant)
assistantRouter.post("/history", isAuth, addToHistory)
assistantRouter.get("/history", isAuth, getHistory)
assistantRouter.delete("/history", isAuth, clearHistory)

export default assistantRouter