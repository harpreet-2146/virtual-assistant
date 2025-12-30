import { useState, useEffect, useCallback, useRef } from 'react'

const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const [supported, setSupported] = useState(true)
    const recognitionRef = useRef(null)

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

        if (!SpeechRecognition) {
            setSupported(false)
            return
        }

        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US'

        recognition.onresult = (event) => {
            let finalTranscript = ''
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript
                }
            }
            if (finalTranscript) {
                setTranscript(finalTranscript.trim().toLowerCase())
            }
        }

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error)
            if (event.error === 'not-allowed') {
                setSupported(false)
            }
        }

        recognition.onend = () => {
            setIsListening(false)
        }

        recognitionRef.current = recognition
    }, [])

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            setTranscript("")
            recognitionRef.current.start()
            setIsListening(true)
        }
    }, [isListening])

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
        }
    }, [isListening])

    const resetTranscript = useCallback(() => {
        setTranscript("")
    }, [])

    return {
        isListening,
        transcript,
        supported,
        startListening,
        stopListening,
        resetTranscript
    }
}

export default useSpeechRecognition