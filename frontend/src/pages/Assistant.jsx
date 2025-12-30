import React, { useContext, useState, useEffect, useCallback } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"
import { FiSettings } from "react-icons/fi"
import { BiLogOut } from "react-icons/bi"
import { IoVolumeHigh } from "react-icons/io5"
import useSpeechRecognition from '../hooks/useSpeechRecognition'
import useSpeechSynthesis from '../hooks/useSpeechSynthesis'
import { processCommand } from '../utils/commandProcessor'

function Assistant() {
    const { userData, setUserData, serverUrl } = useContext(userDataContext)
    const navigate = useNavigate()
    const [commandHistory, setCommandHistory] = useState([])
    const [currentCommand, setCurrentCommand] = useState("")
    const [assistantResponse, setAssistantResponse] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)

    const {
        isListening,
        transcript,
        supported,
        startListening,
        stopListening,
        resetTranscript
    } = useSpeechRecognition()

    const { speak, stop: stopSpeaking } = useSpeechSynthesis()

    // Redirect if not logged in
    useEffect(() => {
        if (!userData) {
            navigate("/signin")
        }
    }, [userData, navigate])

    // Process transcript when it changes
    useEffect(() => {
        if (transcript && !isProcessing) {
            handleCommand(transcript)
        }
    }, [transcript])

    const handleCommand = useCallback(async (command) => {
        if (!command.trim()) return

        setIsProcessing(true)
        setCurrentCommand(command)
        resetTranscript()

        const result = processCommand(command)

        setAssistantResponse(result.response)
        speak(result.response)

        // Add to history
        const newEntry = {
            id: Date.now(),
            command: command,
            response: result.response,
            timestamp: new Date().toLocaleTimeString()
        }
        setCommandHistory(prev => [newEntry, ...prev].slice(0, 10))

        // Save to backend
        try {
            await axios.post(
                `${serverUrl}/api/assistant/history`,
                { message: `User: ${command} | Assistant: ${result.response}` },
                { withCredentials: true }
            )
        } catch (error) {
            console.log("Failed to save history:", error)
        }

        // Execute action
        if (result.action === 'open' && result.url) {
            setTimeout(() => {
                window.open(result.url, '_blank')
            }, 500)
        }

        if (result.action === 'stop') {
            stopListening()
        }

        setTimeout(() => {
            setIsProcessing(false)
        }, 1000)

    }, [speak, resetTranscript, serverUrl, stopListening])

    const toggleListening = () => {
        if (isListening) {
            stopListening()
            stopSpeaking()
        } else {
            startListening()
            setAssistantResponse("I'm listening...")
        }
    }

    const handleLogout = async () => {
        try {
            stopListening()
            stopSpeaking()
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            setUserData(null)
            navigate("/signin")
        } catch (error) {
            console.log(error)
        }
    }

    if (!userData) return null

    if (!supported) {
        return (
            <div className='w-full h-[100vh] bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-800 flex items-center justify-center'>
                <div className='text-center text-white p-[40px]'>
                    <h1 className='text-[30px] font-bold mb-[20px]'>Browser Not Supported</h1>
                    <p className='text-[18px] text-white/70'>
                        Please use Google Chrome or Microsoft Edge for voice recognition features.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full min-h-[100vh] bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-800 flex flex-col'>
            {/* Header */}
            <header className='h-[70px] bg-black/20 flex items-center justify-between px-[20px]'>
                <div className='flex items-center gap-[15px]'>
                    <div className='w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-pink-400'>
                        {userData.assistantImage ? (
                            <img src={userData.assistantImage} alt="Assistant" className='w-full h-full object-cover' />
                        ) : (
                            <div className='w-full h-full bg-pink-500 flex items-center justify-center text-white text-[18px] font-bold'>
                                {userData.assistantName?.charAt(0) || "A"}
                            </div>
                        )}
                    </div>
                    <h1 className='text-white text-[22px] font-semibold'>
                        {userData.assistantName || "Virtual Assistant"}
                    </h1>
                </div>
                <div className='flex items-center gap-[20px]'>
                    <FiSettings
                        className='text-white text-[24px] cursor-pointer hover:text-pink-400 transition-colors'
                        onClick={() => navigate("/customize")}
                    />
                    <BiLogOut
                        className='text-white text-[24px] cursor-pointer hover:text-pink-400 transition-colors'
                        onClick={handleLogout}
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className='flex-1 flex flex-col items-center justify-center p-[20px]'>
                {/* Microphone Button */}
                <div
                    onClick={toggleListening}
                    className={`w-[150px] h-[150px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        isListening
                            ? 'bg-pink-500 shadow-[0_0_60px_rgba(236,72,153,0.6)] animate-pulse'
                            : 'bg-white/10 hover:bg-white/20 border-2 border-white/30'
                    }`}
                >
                    {isListening ? (
                        <FaMicrophone className='text-white text-[50px]' />
                    ) : (
                        <FaMicrophoneSlash className='text-white/70 text-[50px]' />
                    )}
                </div>

                {/* Status Text */}
                <p className='text-white/80 text-[18px] mt-[25px]'>
                    {isListening ? "Listening... Speak now!" : "Click the microphone to start"}
                </p>

                {/* Current Command Display */}
                {currentCommand && (
                    <div className='mt-[30px] bg-white/10 backdrop-blur-lg rounded-[20px] p-[20px] max-w-[500px] w-full'>
                        <div className='flex items-start gap-[10px] mb-[15px]'>
                            <span className='text-pink-400 font-semibold'>You:</span>
                            <span className='text-white'>{currentCommand}</span>
                        </div>
                        {assistantResponse && (
                            <div className='flex items-start gap-[10px]'>
                                <IoVolumeHigh className='text-green-400 text-[20px] mt-[3px]' />
                                <span className='text-white/90'>{assistantResponse}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Command History */}
                {commandHistory.length > 0 && (
                    <div className='mt-[40px] w-full max-w-[500px]'>
                        <h3 className='text-white/60 text-[14px] mb-[15px] uppercase tracking-wide'>
                            Recent Commands
                        </h3>
                        <div className='space-y-[10px] max-h-[200px] overflow-y-auto'>
                            {commandHistory.map((entry) => (
                                <div
                                    key={entry.id}
                                    className='bg-white/5 rounded-[10px] p-[12px] text-[14px]'
                                >
                                    <div className='flex justify-between items-center'>
                                        <span className='text-white/80'>"{entry.command}"</span>
                                        <span className='text-white/40 text-[12px]'>{entry.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer - Quick Commands */}
            <footer className='bg-black/20 p-[20px]'>
                <p className='text-white/50 text-center text-[14px] mb-[10px]'>Try saying:</p>
                <div className='flex flex-wrap justify-center gap-[10px]'>
                    {["Open YouTube", "Search for cats", "What time is it", "Open Google"].map((cmd) => (
                        <span
                            key={cmd}
                            className='bg-white/10 text-white/70 px-[15px] py-[8px] rounded-full text-[13px]'
                        >
                            "{cmd}"
                        </span>
                    ))}
                </div>
            </footer>
        </div>
    )
}

export default Assistant