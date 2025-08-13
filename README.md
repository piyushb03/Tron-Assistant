# Tron - AI Voice Assistant for Revolt Motors

Tron is a real-time, conversational voice assistant built to provide information about Revolt Motors. It uses the Google Gemini API for its conversational intelligence and is designed to be an interactive, voice-first experience.

This project replicates the core functionality of a modern web-based voice assistant, featuring seamless conversation flow, user interruption, and a clean user interface with light and dark themes. The entire voice processing (Speech-to-Text and Text-to-Speech) is handled for free by the browser's built-in **Web Speech API**.

---

## Features

* **Voice-to-Voice Conversation:** Speak to the assistant and receive a spoken response.
* **User Interruption:** The user can interrupt the AI at any time by clicking the record button while it is speaking.
* **Domain-Specific Knowledge:** Tron's personality and knowledge are configured to answer questions exclusively about Revolt Motors.
* **Dark/Light Theme:** Includes a theme toggle for user preference.
* **Zero Voice API Costs:** Utilizes the browser's free, built-in Web Speech API for both STT and TTS.
* **Real-time & Low Latency:** Responses are streamed from the server to the client for a more natural conversational feel.

---

## Technology Stack

* **Backend:** Node.js, Express.js
* **Real-time Communication:** WebSockets (`ws` library)
* **AI Model:** Google Gemini API (`@google/generative-ai`)
* **Voice Processing:** Browser Web Speech API (SpeechRecognition and SpeechSynthesis)
* **Frontend:** HTML5, CSS3, Vanilla JavaScript

---

## Setup and Installation

Follow these steps to get the project running on your local machine.

### 1. Prerequisites

* **Node.js:** Make sure you have Node.js installed (version 18.x or higher). You can download it from [nodejs.org](https://nodejs.org/).
* **npm:** Node Package Manager is included with Node.js.

### 2. Clone the Repository

Clone this project to your local machine or download the source code files.

```bash
git clone <your-repository-url>
cd tron-assistant

3. Install Dependencies
Navigate to the project directory in your terminal and run the following command to install the necessary Node.js packages:

npm install

This will install express, ws, @google/generative-ai, and dotenv.

4. Set Up Environment Variables
You need a Google Gemini API key for the assistant's brain.

Create a file named .env in the root directory of your project.

Go to Google AI Studio to get your API key.

Add the API key to your .env file like this:

GEMINI_API_KEY="YOUR_API_KEY_HERE"

5. Run the Server
Start the server by running the following command in your terminal:

node server.js

You should see the following message in your terminal:
Server listening at http://localhost:3000

How to Use
Open your web browser (Google Chrome is recommended for best Web Speech API support) and navigate to http://localhost:3000.

The status will show "Connected." Click the microphone button to start the conversation.

Your browser will ask for permission to use your microphone. You must click Allow.

The status will change to "Listening..." Speak your question.

The assistant will process your request and begin speaking its response.

To interrupt the AI while it's speaking, simply click the microphone button again.

Project Structure
.
├── public/
│   ├── client.js       # Frontend logic, voice processing, WebSocket communication
│   ├── style.css       # All styles for the user interface
│   ├── index.html      # The main HTML file
│   └── robot.png       # The logo image
├── .env                # Stores the secret API key
├── server.js           # The Node.js/Express server and Gemini API logic
├── package.json        # Project dependencies and scripts
└── README.md           # This file
