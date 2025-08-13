# Tron - AI Voice Assistant for Revolt Motors

Tron is a real-time, conversational voice assistant that answers questions about Revolt Motors. It's powered by the Google Gemini API and uses the browser's free Web Speech API for a seamless, voice-first experience with zero API costs for voice processing.

**Features:** Voice-to-voice conversation, user interruption, dark/light themes, and domain-specific knowledge.

---

## Technology Stack

* **Backend:** Node.js, Express.js, WebSockets
* **AI Model:** Google Gemini API
* **Voice Processing:** Browser Web Speech API
* **Frontend:** HTML5, CSS3, Vanilla JavaScript

---

## Quick Start

Follow these steps to get the project running.

1.  **Prerequisites:**
    * Node.js (v18.x or higher)
    * A Google Gemini API Key

2.  **Clone & Install:**
    ```bash
    git clone [https://github.com/piyushb03/Tron-Assistant.git](https://github.com/piyushb03/Tron-Assistant.git)
    cd Tron-Assistant
    npm install
    ```

3.  **Set Up API Key:**
    * Create a file named `.env` in the root directory.
    * Add your Gemini API key to the file:
        ```
        GEMINI_API_KEY="YOUR_API_KEY_HERE"
        ```

4.  **Run the Server:**
    ```bash
    node server.js
    ```

5.  **Open in Browser:**
    * Navigate to `http://localhost:3000` in a browser (Chrome recommended).
    * Allow microphone permissions when prompted.

