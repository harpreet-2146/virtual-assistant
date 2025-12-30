import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5"
import { FiCamera } from "react-icons/fi"
import bg from "../assets/authBG.jpg"

function Customize() {
    const navigate = useNavigate()
    const [assistantName, setAssistantName] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [success, setSuccess] = useState("")
    const fileInputRef = useRef(null)

    useEffect(() => {
        const savedName = localStorage.getItem('assistantName')
        const savedImage = localStorage.getItem('assistantImage')
        if (savedName) setAssistantName(savedName)
        if (savedImage) setImagePreview(savedImage)
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Save to localStorage
        if (assistantName) {
            localStorage.setItem('assistantName', assistantName)
        }
        if (imagePreview) {
            localStorage.setItem('assistantImage', imagePreview)
        }

        setSuccess("Assistant customized successfully!")

        setTimeout(() => {
            navigate("/")
        }, 1500)
    }

    return (
        <div
            className='w-full min-h-[100vh] bg-cover flex justify-center items-center p-[20px]'
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className='w-[90%] max-w-[500px] bg-[#0000f700] backdrop-blur shadow-lg shadow-pink-200 rounded-[30px] p-[40px]'>
                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className='flex items-center gap-[10px] text-white mb-[30px] hover:text-pink-400 transition-colors'
                >
                    <IoArrowBack className='text-[20px]' />
                    <span>Back</span>
                </button>

                <h1 className='text-white text-[28px] font-semibold mb-[10px]'>
                    Customize Your <span className='text-pink-200'>Assistant</span>
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
                            className='w-full h-[55px] bg-transparent border-2 border-white/50 rounded-full px-[20px] text-white placeholder-pink-200/50 outline-none focus:border-pink-400 transition-colors'
                        />
                    </div>

                    {/* Success Message */}
                    {success && (
                        <p className='text-green-400 text-center'>{success}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className='w-full h-[55px] bg-white rounded-full text-pink-600 font-bold text-[18px] hover:bg-pink-100 transition-colors'
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Customize