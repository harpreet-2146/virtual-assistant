import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"
import { FiSettings } from "react-icons/fi"
import { IoVolumeHigh } from "react-icons/io5"
import bg from "../assets/authBG.jpg"
import useSpeechRecognition from '../hooks/useSpeechRecognition'
import useSpeechSynthesis from '../hooks/useSpeechSynthesis'
import { processCommand } from '../utils/commandProcessor'

function Assistant() {
    const navigate = useNavigate()
    const [commandHistory, setCommandHistory] = useState([])
    const [currentCommand, setCurrentCommand] = useState("")
    const [assistantResponse, setAssistantResponse] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [assistantName, setAssistantName] = useState(() => {
        return localStorage.getItem('assistantName') || 'Luna'
    })
    const [assistantImage, setAssistantImage] = useState(() => {
        return localStorage.getItem('assistantImage') || null
    })

    const {
        isListening,
        transcript,
        supported,
        startListening,
        stopListening,
        resetTranscript
    } = useSpeechRecognition()

    const { speak, stop: stopSpeaking } = useSpeechSynthesis()

    // Load saved data
    useEffect(() => {
        const savedName = localStorage.getItem('assistantName')
        const savedImage = localStorage.getItem('assistantImage')
        if (savedName) setAssistantName(savedName)
        if (savedImage) setAssistantImage(savedImage)
    }, [])

    // Process transcript when it changes
    useEffect(() => {
        if (transcript && !isProcessing) {
            handleCommand(transcript)
        }
    }, [transcript])

    const handleCommand = useCallback((command) => {
        if (!command.trim()) return

        setIsProcessing(true)
        setCurrentCommand(command)
        resetTranscript()

        const result = processCommand(command, assistantName)

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

    }, [speak, resetTranscript, stopListening, assistantName])

    const toggleListening = () => {
        if (isListening) {
            stopListening()
            stopSpeaking()
        } else {
            startListening()
            setAssistantResponse("I'm listening...")
        }
    }

    if (!supported) {
        return (
            <div
                className='w-full h-[100vh] bg-cover flex items-center justify-center'
                style={{ backgroundImage: `url(${bg})` }}
            >
                <div className='w-[90%] max-w-[500px] bg-[#0000f700] backdrop-blur shadow-lg shadow-pink-200 rounded-[30px] p-[40px] text-center'>
                    <h1 className='text-white text-[28px] font-bold mb-[20px]'>Browser Not Supported</h1>
                    <p className='text-white/70 text-[16px]'>
                        Please use Google Chrome or Microsoft Edge for voice recognition features.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div
            className='w-full min-h-[100vh] bg-cover flex flex-col'
            style={{ backgroundImage: `url(${bg})` }}
        >
            {/* Header */}
            <header className='h-[70px] bg-[#0000f700] backdrop-blur-md flex items-center justify-between px-[20px] border-b border-white/10'>
                <div className='flex items-center gap-[15px]'>
                    <div className='w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-pink-400 shadow-lg shadow-pink-400/30'>
                        {assistantImage ? (
                            <img src={assistantImage} alt="Assistant" className='w-full h-full object-cover' />
                        ) : (
                            <div className='w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-[18px] font-bold'>
                                {assistantName?.charAt(0) || "L"}
                            </div>
                        )}
                    </div>
                    <h1 className='text-white text-[22px] font-semibold'>
                        {assistantName}
                    </h1>
                </div>
                <FiSettings
                    className='text-white text-[24px] cursor-pointer hover:text-pink-400 transition-colors hover:rotate-90 duration-300'
                    onClick={() => navigate("/customize")}
                />
            </header>

            {/* Main Content */}
            <main className='flex-1 flex flex-col items-center justify-center p-[20px]'>
                {/* Glassy Card */}
                <div className='w-[90%] max-w-[500px] bg-[#0000f700] backdrop-blur shadow-lg shadow-pink-200 rounded-[30px] p-[40px] flex flex-col items-center'>
                    
                    {/* Microphone Button */}
                    <div
                        onClick={toggleListening}
                        className={`w-[130px] h-[130px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                            isListening
                                ? 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_0_60px_rgba(236,72,153,0.6)] animate-pulse'
                                : 'bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-pink-400'
                        }`}
                    >
                        {isListening ? (
                            <FaMicrophone className='text-white text-[45px]' />
                        ) : (
                            <FaMicrophoneSlash className='text-white/70 text-[45px]' />
                        )}
                    </div>

                    {/* Status Text */}
                    <p className='text-white/80 text-[16px] mt-[20px] text-center'>
                        {isListening ? "Listening... Speak now!" : "Click the microphone to start"}
                    </p>

                    {/* Current Command Display */}
                    {currentCommand && (
                        <div className='mt-[25px] bg-white/10 rounded-[15px] p-[20px] w-full'>
                            <div className='flex items-start gap-[10px] mb-[12px]'>
                                <span className='text-pink-400 font-semibold text-[14px]'>You:</span>
                                <span className='text-white text-[14px]'>{currentCommand}</span>
                            </div>
                            {assistantResponse && (
                                <div className='flex items-start gap-[10px]'>
                                    <IoVolumeHigh className='text-green-400 text-[18px] mt-[2px]' />
                                    <span className='text-white/90 text-[14px]'>{assistantResponse}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Command History */}
                {commandHistory.length > 0 && (
                    <div className='mt-[30px] w-[90%] max-w-[500px]'>
                        <h3 className='text-white/60 text-[12px] mb-[12px] uppercase tracking-wider'>
                            Recent Commands
                        </h3>
                        <div className='space-y-[8px] max-h-[180px] overflow-y-auto'>
                            {commandHistory.map((entry) => (
                                <div
                                    key={entry.id}
                                    className='bg-[#0000f700] backdrop-blur rounded-[10px] p-[12px] text-[13px] border border-white/10'
                                >
                                    <div className='flex justify-between items-center'>
                                        <span className='text-white/80'>"{entry.command}"</span>
                                        <span className='text-white/40 text-[11px]'>{entry.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer - Quick Commands */}
            <footer className='bg-[#0000f700] backdrop-blur-md p-[20px] border-t border-white/10'>
                <p className='text-white/50 text-center text-[13px] mb-[12px]'>Try saying:</p>
                <div className='flex flex-wrap justify-center gap-[8px]'>
                    {["Open YouTube", "Search for cats", "What time is it", "Open Google"].map((cmd) => (
                        <span
                            key={cmd}
                            className='bg-white/10 text-white/70 px-[14px] py-[6px] rounded-full text-[12px] border border-white/10'
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