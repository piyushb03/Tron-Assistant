// server.js

// 1. Setup
require('dotenv').config();
const express = require('express');
const { WebSocketServer } = require('ws');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

app.use(express.static('public'));

const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

// 2. Initialize Gemini API with a System Instruction
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- NEW: Define the AI's personality and knowledge domain ---
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    systemInstruction: `You are Tron, a friendly and helpful AI voice assistant for Revolt Motors.

    Your rules are:
    1. Your name is Tron.
    2. Your entire purpose is to answer questions about Revolt Motors, including their electric bikes (like the RV400), features, booking process, and company information.
    3. You must politely refuse to answer any questions that are not related to Revolt Motors. Do not get sidetracked. If asked about other topics, gently guide the conversation back to Revolt Motors. For example, say "As an AI for Revolt Motors, I can only provide information about their products and services. How can I help you with Revolt today?"
    4. Keep your answers concise and conversational.`
});

// 3. Setup WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
    console.log('Client connected.');

    // Start a new chat session for each connection
    const chat = model.startChat();

    ws.on('message', async message => {
        const userQuery = message.toString();
        console.log(`Received query from client: "${userQuery}"`);

        try {
            // Send the text to Gemini and stream the response
            const result = await chat.sendMessageStream(userQuery);

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                if (ws.readyState === ws.OPEN) {
                    ws.send(JSON.stringify({ text: chunkText }));
                }
            }

            // Signal that the full response is complete
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify({ event: 'response_complete' }));
            }

        } catch (error) {
            console.error("Error processing Gemini request:", error);
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify({ error: "An error occurred while processing your request." }));
            }
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
