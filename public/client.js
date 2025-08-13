// public/client.js

document.addEventListener('DOMContentLoaded', () => {
    const recordButton = document.getElementById('recordButton');
    const statusDiv = document.getElementById('status');
    const themeToggle = document.getElementById('checkbox');
    const body = document.body;

    // --- Theme Toggle Logic ---
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('light-theme', themeToggle.checked);
    });

    // --- Check for Browser Support ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;
    const speechSynthesis = window.speechSynthesis;

    if (!recognition || !speechSynthesis) {
        statusDiv.textContent = "Sorry, your browser doesn't support the Web Speech API.";
        recordButton.disabled = true;
        return;
    }

    // --- WebSocket Connection ---
    const socket = new WebSocket(`ws://${window.location.host}`);
    let fullResponse = '';

    socket.onopen = () => {
        statusDiv.textContent = 'Connected. Click the button to talk.';
    };

    socket.onmessage = event => {
        const response = JSON.parse(event.data);

        if (response.text) {
            fullResponse += response.text;
        }

        if (response.event && response.event === 'response_complete') {
            speak(fullResponse);
            fullResponse = '';
        }

        if (response.error) {
            statusDiv.textContent = `Error: ${response.error}`;
            recordButton.disabled = false;
        }
    };

    // --- Text-to-Speech Function ---
    function speak(text) {
        if (speechSynthesis.speaking) {
            return;
        }
        if (text.trim() === '') {
            recordButton.disabled = false;
            statusDiv.textContent = 'Click the button to talk.';
            return;
        };

        const utterance = new SpeechSynthesisUtterance(text);
        
        utterance.onstart = () => {
            // FIX: Re-enable the button immediately so the user can interrupt.
            recordButton.disabled = false;
            statusDiv.textContent = 'AI is speaking... Click to interrupt.';
        };

        utterance.onend = () => {
            // When speaking finishes naturally, reset the status.
            statusDiv.textContent = 'Click the button to talk.';
        };

        utterance.onerror = (e) => {
            console.error('SpeechSynthesisUtterance.onerror', e);
            statusDiv.textContent = 'An error occurred during speech synthesis.';
            recordButton.disabled = false;
        };
        speechSynthesis.speak(utterance);
    }

    // --- Speech-to-Text Configuration ---
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        statusDiv.textContent = `You said: "${transcript}"`;
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(transcript);
        }
    };

    recognition.onspeechend = () => {
        recognition.stop();
        statusDiv.textContent = 'Processing...';
    };

    recognition.onerror = (event) => {
        statusDiv.textContent = 'Error occurred in recognition: ' + event.error;
        recordButton.disabled = false;
    };

    // --- Button Click to Start Listening / Interrupt ---
    recordButton.addEventListener('click', () => {
        // If the AI is speaking, cancel it.
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }

        // Start listening for the user's voice.
        recognition.start();
        recordButton.disabled = true;
        statusDiv.textContent = 'Listening...';
    });
});
