import React, { useContext, useState, useRef, useEffect } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IoArrowBack } from "react-icons/io5"
import { FiCamera } from "react-icons/fi"

function Customize() {
    const { userData, setUserData, serverUrl } = useContext(userDataContext)
    const navigate = useNavigate()
    const [assistantName, setAssistantName] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [err, setErr] = useState("")
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (userData) {
            setAssistantName(userData.assistantName || "")
            setImagePreview(userData.assistantImage || null)
        }
    }, [userData])

    useEffect(() => {
        if (!userData) {
            navigate("/signin")
        }
    }, [userData, navigate])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErr("")
        setSuccess("")

        try {
            const formData = new FormData()
            formData.append("assistantName", assistantName)
            if (imageFile) {
                formData.append("assistantImage", imageFile)
            }

            const result = await axios.post(
                `${serverUrl}/api/assistant/customize`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )

            setUserData(result.data)
            setSuccess("Assistant customized successfully!")
            setLoading(false)

            setTimeout(() => {
                navigate("/")
            }, 1500)

        } catch (error) {
            setLoading(false)
            setErr(error.response?.data?.message || "Something went wrong")
        }
    }

    if (!userData) return null

    return (
        <div className='w-full min-h-[100vh] bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-800 flex justify-center items-center p-[20px]'>
            <div className='w-full max-w-[500px] bg-black/30 backdrop-blur-lg rounded-[30px] p-[40px]'>
                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className='flex items-center gap-[10px] text-white mb-[30px] hover:text-pink-400 transition-colors'
                >
                    <IoArrowBack className='text-[20px]' />
                    <span>Back</span>
                </button>

                <h1 className='text-white text-[28px] font-semibold mb-[10px]'>
                    Customize Your Assistant
                </h1>
                <p className='text-white/60 mb-[30px]'>
                    Give your assistant a name and avatar
                </p>

                <form onSubmit={handleSubmit} className='flex flex-col gap-[25px]'>
                    {/* Image Upload */}
                    <div className='flex justify-center'>
                        <div
                            className='w-[120px] h-[120px] rounded-full bg-white/10 border-2 border-dashed border-white/50 flex items-center justify-center cursor-pointer overflow-hidden hover:border-pink-400 transition-colors relative'
                            onClick={() => fileInputRef.current.click()}
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className='w-full h-full object-cover' />
                            ) : (
                                <FiCamera className='text-white/50 text-[40px]' />
                            )}
                            <div className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
                                <FiCamera className='text-white text-[30px]' />
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className='hidden'
                        />
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className='text-white/80 text-[14px] mb-[8px] block'>Assistant Name</label>
                        <input
                            type="text"
                            placeholder='e.g., Luna, Nova, Atlas...'
                            value={assistantName}
                            onChange={(e) => setAssistantName(e.target.value)}
                            className='w-full h-[55px] bg-white/10 border border-white/30 rounded-full px-[20px] text-white placeholder-white/40 outline-none focus:border-pink-400 transition-colors'
                        />
                    </div>

                    {/* Error/Success Messages */}
                    {err && (
                        <p className='text-red-400 text-center'>*{err}</p>
                    )}
                    {success && (
                        <p className='text-green-400 text-center'>{success}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full h-[55px] bg-pink-500 rounded-full text-white font-semibold hover:bg-pink-600 transition-colors disabled:opacity-50'
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Customize