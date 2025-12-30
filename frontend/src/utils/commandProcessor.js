const websites = {
    youtube: 'https://www.youtube.com',
    google: 'https://www.google.com',
    github: 'https://www.github.com',
    gmail: 'https://mail.google.com',
    instagram: 'https://www.instagram.com',
    twitter: 'https://www.twitter.com',
    x: 'https://www.twitter.com',
    linkedin: 'https://www.linkedin.com',
    whatsapp: 'https://web.whatsapp.com',
    netflix: 'https://www.netflix.com',
    amazon: 'https://www.amazon.com',
    facebook: 'https://www.facebook.com',
    reddit: 'https://www.reddit.com',
    spotify: 'https://open.spotify.com',
    discord: 'https://discord.com',
    chatgpt: 'https://chat.openai.com',
    claude: 'https://claude.ai',
}

export const processCommand = (command) => {
    const cmd = command.toLowerCase().trim()

    // Greetings
    if (cmd.includes('hello') || cmd.includes('hi') || cmd.includes('hey')) {
        return {
            action: 'speak',
            response: getGreeting()
        }
    }

    // Thank you
    if (cmd.includes('thank you') || cmd.includes('thanks')) {
        return {
            action: 'speak',
            response: "You're welcome! Is there anything else I can help you with?"
        }
    }

    // How are you
    if (cmd.includes('how are you')) {
        return {
            action: 'speak',
            response: "I'm doing great, thank you for asking! How can I assist you today?"
        }
    }

    // Time
    if (cmd.includes('what time') || cmd.includes('current time') || cmd.includes('tell me the time')) {
        const time = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
        return {
            action: 'speak',
            response: `The current time is ${time}`
        }
    }

    // Date
    if (cmd.includes('what date') || cmd.includes('what day') || cmd.includes("today's date") || cmd.includes('current date')) {
        const date = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        return {
            action: 'speak',
            response: `Today is ${date}`
        }
    }

    // YouTube search
    if (cmd.includes('search youtube for') || cmd.includes('search on youtube')) {
        const query = cmd.replace('search youtube for', '').replace('search on youtube', '').replace('search on youtube for', '').trim()
        if (query) {
            return {
                action: 'open',
                url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
                response: `Searching YouTube for ${query}`
            }
        }
    }

    // Google search
    if (cmd.includes('search for') || cmd.includes('search google for') || cmd.includes('google search')) {
        const query = cmd.replace('search for', '').replace('search google for', '').replace('google search', '').replace('search', '').trim()
        if (query) {
            return {
                action: 'open',
                url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
                response: `Searching Google for ${query}`
            }
        }
    }

    // Generic search
    if (cmd.startsWith('search')) {
        const query = cmd.replace('search', '').trim()
        if (query) {
            return {
                action: 'open',
                url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
                response: `Searching for ${query}`
            }
        }
    }

    // Open specific websites
    if (cmd.includes('open')) {
        // Check predefined websites
        for (const [name, url] of Object.entries(websites)) {
            if (cmd.includes(name)) {
                return {
                    action: 'open',
                    url: url,
                    response: `Opening ${name.charAt(0).toUpperCase() + name.slice(1)}`
                }
            }
        }

        // Try to extract website name for unknown sites
        const openMatch = cmd.match(/open\s+(\w+)/)
        if (openMatch) {
            const siteName = openMatch[1]
            return {
                action: 'open',
                url: `https://www.${siteName}.com`,
                response: `Opening ${siteName}.com`
            }
        }
    }

    // Stop command
    if (cmd === 'stop' || cmd === 'stop listening' || cmd === 'quit') {
        return {
            action: 'stop',
            response: "Stopping. Click the microphone when you need me again!"
        }
    }

    // Who are you
    if (cmd.includes('who are you') || cmd.includes('what are you') || cmd.includes('your name')) {
        return {
            action: 'speak',
            response: "I'm your virtual assistant! I can help you open websites, search the web, and tell you the time or date. Just ask!"
        }
    }

    // What can you do
    if (cmd.includes('what can you do') || cmd.includes('help') || cmd.includes('commands')) {
        return {
            action: 'speak',
            response: "I can open websites like YouTube, Google, GitHub, and more. I can search Google or YouTube for you. I can also tell you the current time and date. Try saying 'Open YouTube' or 'Search for cute cats'!"
        }
    }

    // Unknown command
    return {
        action: 'unknown',
        response: `I heard "${command}" but I'm not sure what to do. Try saying "Open YouTube" or "Search for something"`
    }
}

const getGreeting = () => {
    const hour = new Date().getHours()
    let timeGreeting = ''

    if (hour < 12) {
        timeGreeting = 'Good morning'
    } else if (hour < 17) {
        timeGreeting = 'Good afternoon'
    } else {
        timeGreeting = 'Good evening'
    }

    const responses = [
        `${timeGreeting}! How can I help you today?`,
        `${timeGreeting}! What would you like me to do?`,
        `Hey there! ${timeGreeting}! I'm ready to assist you.`,
    ]

    return responses[Math.floor(Math.random() * responses.length)]
}