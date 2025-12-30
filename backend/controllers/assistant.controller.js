import User from "../models/user.model.js"
import uploadOnCloudinary from "../config/cloudinary.js"

export const customizeAssistant = async (req, res) => {
    try {
        const userId = req.userId
        const { assistantName } = req.body

        let assistantImage = null
        if (req.file) {
            assistantImage = await uploadOnCloudinary(req.file.path)
        }

        const updateData = {}
        if (assistantName) updateData.assistantName = assistantName
        if (assistantImage) updateData.assistantImage = assistantImage

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select("-password")

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Customize assistant error: ${error.message}` })
    }
}

export const addToHistory = async (req, res) => {
    try {
        const userId = req.userId
        const { message } = req.body

        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { history: message } },
            { new: true }
        ).select("-password")

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Add to history error: ${error.message}` })
    }
}

export const getHistory = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select("history")

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        return res.status(200).json(user.history)
    } catch (error) {
        return res.status(500).json({ message: `Get history error: ${error.message}` })
    }
}

export const clearHistory = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findByIdAndUpdate(
            userId,
            { history: [] },
            { new: true }
        ).select("-password")

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        return res.status(200).json({ message: "History cleared successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Clear history error: ${error.message}` })
    }
}