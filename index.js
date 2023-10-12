const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('WebSocket connection established');
  
  // Handle incoming frames from the Android app
  ws.on('message', (frame) => {
    // Process the frame (e.g., send it to OpenAI API for analysis)
    // Send back results to the Android app if needed
  });

  // Handle WebSocket disconnections
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
