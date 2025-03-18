const express = require('express');
const axios = require('axios');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// F1 WebSocket connection settings
const CLIENT_PROTOCOL = 1.5;
const CONNECTION_DATA = encodeURIComponent(JSON.stringify([{ name: "Streaming" }]));
const URL = "https://livetiming.formula1.com/signalr";

// Negotiate to get connection token and cookie
async function negotiation() {
    try {
        const res = await axios.get(`${URL}/negotiate?clientProtocol=${CLIENT_PROTOCOL}&connectionData=${CONNECTION_DATA}`);

        return {
            encodedToken: encodeURIComponent(res.data["ConnectionToken"]),
            cookie: res.headers["set-cookie"]
        };
    } catch (err) {
        console.error("Negotiation failed:", err);
        throw err;
    }
}

// Connect to the F1 SignalR WebSocket
async function connectF1WS(encodedToken, cookie) {
    return new Promise((res, rej) => {
        const socketURL = `${URL}/connect?transport=webSockets&clientProtocol=${CLIENT_PROTOCOL}&connectionToken=${encodedToken}&connectionData=${CONNECTION_DATA}`;
        const headers = {
            'User-Agent': 'BestHTTP',
            'Accept-Encoding': 'gzip,identity',
            'Cookie': cookie
        };

        const f1Socket = new WebSocket(socketURL, { headers });

        f1Socket.on("open", () => {
            console.log("[F1 WebSocket] Connected");

            // Subscribe to channels by sending a message to F1's service
            const message = JSON.stringify({
                "H": "Streaming",
                "M": "Subscribe",
                "A": [["Heartbeat", "LapCount"]],
                "I": 1
            });

            f1Socket.send(message);

            res(f1Socket);
        });

        f1Socket.on("message", (message) => {
            console.log("[F1 WebSocket] Message received");
        });

        f1Socket.on("error", (error) => {
            console.error("[F1 WebSocket] Error:", error);
            rej(error);
        });
    });
}

// Initialize connection to the F1 WebSocket and broadcast messages to custom clients
async function startF1Connection() {
    try {
        const { encodedToken, cookie } = await negotiation();
        const f1Socket = await connectF1WS(encodedToken, cookie);

        // When a message is received from F1, broadcast it to all connected custom clients
        f1Socket.on("message", (data) => {
            console.log("[F1] Broadcasting data to clients: " + data);

            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data.toString('utf-8'));
                }
            });
        });
    } catch (err) {
        console.error("Error connecting to F1 WebSocket:", err);
    }
}

// Start the F1 connection
startF1Connection();

// Custom server WebSocket side
wss.on('connection', (client) => {
    console.log('Client connected to custom server.');
    
    client.on('close', () => {
        console.log('Client disconnected from custom server.');
    });
});

// Start your custom WebSocket server
server.listen(3001, () => {
    console.log('Custom WebSocket server is running on port 3001');
});