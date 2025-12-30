# 🎙️ Speaky

**Your browser-based voice assistant** — Talk to your browser and watch it obey. No AI APIs needed, just pure Web Speech magic.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Web Speech API](https://img.shields.io/badge/Web_Speech-API-4285F4?logo=google-chrome)

## 🎯 What is Speaky?

Speaky is a voice-controlled web assistant that listens to your commands and executes them instantly. Open websites, search the web, check the time — all hands-free!

**No API keys. No backend AI. Just you and your browser.** 🚀

## ✨ Features

- 🎤 **Voice Recognition** — Click to talk, click to stop
- 🔊 **Voice Responses** — Speaky talks back to confirm actions
- 🌐 **Open Any Website** — "Open YouTube", "Open GitHub", or any .com
- 🔍 **Web Search** — "Search React tutorials" or "Search YouTube for lo-fi music"
- 🕐 **Time & Date** — "What time is it?" / "What's the date?"
- 📝 **Command History** — See your recent commands
- 🎨 **Customizable Name** — Give your assistant a personality

## 🗣️ Voice Commands

| Say This | Speaky Does This |
|----------|------------------|
| "Open YouTube" | Opens youtube.com |
| "Open Google" | Opens google.com |
| "Open GitHub" | Opens github.com |
| "Open Gmail" | Opens gmail.com |
| "Open Instagram" | Opens instagram.com |
| "Open Twitter" / "Open X" | Opens twitter.com |
| "Open LinkedIn" | Opens linkedin.com |
| "Open WhatsApp" | Opens web.whatsapp.com |
| "Open Netflix" | Opens netflix.com |
| "Open Amazon" | Opens amazon.com |
| "Open [anything]" | Opens [anything].com |
| "Search [query]" | Google search |
| "Search YouTube for [query]" | YouTube search |
| "What time is it" | Speaks current time |
| "What's the date" | Speaks today's date |
| "Hello" / "Hi" | Greets you back |
| "Thank you" | Says "You're welcome!" |
| "Stop" | Stops listening |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Voice Input | Web Speech API (`webkitSpeechRecognition`) |
| Voice Output | Web Speech API (`speechSynthesis`) |
| Styling | CSS |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Chrome or Edge browser (Web Speech API works best here)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/speaky.git
cd speaky

# Install dependencies
cd frontend
npm install

# Start the app
npm run dev
```

Open `http://localhost:5173` and click the microphone to start talking!

## 📁 Project Structure

```
speaky/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Assistant.jsx    # Main voice assistant
│   │   │   └── Customize.jsx    # Customize assistant name
│   │   ├── hooks/
│   │   │   └── useSpeech.js     # Voice recognition hook
│   │   ├── utils/
│   │   │   └── commands.js      # Command parsing logic
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/                      # Optional API routes
│   ├── controllers/
│   ├── routes/
│   └── index.js
└── README.md
```

## 🔧 How It Works

```
You speak → Web Speech API captures → Parse command → Execute action → Speak response
```

### Speech Recognition
```javascript
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  handleCommand(transcript);
};
```

### Speech Synthesis
```javascript
const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};
```

## ⚠️ Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full support |
| Edge | ✅ Full support |
| Firefox | ⚠️ Limited |
| Safari | ⚠️ Limited |

**Recommended:** Use Chrome or Edge for the best experience.

## 🔮 Future Ideas

- [ ] Wake word activation ("Hey Speaky")
- [ ] More voice options
- [ ] Dark/Light theme toggle via voice
- [ ] Weather updates (with API)
- [ ] Calculator commands
- [ ] Custom command shortcuts
- [ ] Spotify/Music control

## 🤝 Contributing

Pull requests welcome! Feel free to add new commands or improve the voice recognition.

```bash
git checkout -b feature/new-command
git commit -m "Add: calculator command"
git push origin feature/new-command
```

<p align="center">
  <b>🎙️ Talk to your browser. It listens.</b>
  <br>
  <sub>Built with React + Web Speech API</sub>
</p>


   




