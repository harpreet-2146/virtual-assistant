import { useCallback } from 'react'

const useSpeechSynthesis = () => {
    const speak = useCallback((text) => {
        if (!window.speechSynthesis) {
            console.error('Speech synthesis not supported')
            return
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)

        // Get available voices
        const voices = window.speechSynthesis.getVoices()

        // Try to find a female English voice
        const preferredVoice = voices.find(voice =>
            voice.lang.includes('en') && voice.name.toLowerCase().includes('female')
        ) || voices.find(voice =>
            voice.lang.includes('en-US')
        ) || voices.find(voice =>
            voice.lang.includes('en')
        ) || voices[0]

        if (preferredVoice) {
            utterance.voice = preferredVoice
        }

        utterance.rate = 1
        utterance.pitch = 1
        utterance.volume = 1

        window.speechSynthesis.speak(utterance)
    }, [])

    const stop = useCallback(() => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel()
        }
    }, [])

    return { speak, stop }
}

export default useSpeechSynthesis