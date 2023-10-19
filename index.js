const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const OPENAI_API_KEY = 'FN5v5ldbtyZQKPhznjftT3BlbkFJRrFuDq6TbhvlP54sfTj7';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;


import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-org-lFZ9TR9p1vgOrJHtomepQ0W6",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('WebSocket connection established');
  
  // Handle incoming frames from the app
  ws.on('message', (message) => {
    const frameData = Buffer.from(message, 'base64');
    // Processing frame data
  
    axios.post(apiUrl, { frames: frameData })
  .then((response) => {
    const analysisResults = response.data;
    // Handle analysis results

    //WebSocket connection
    ws.send(JSON.stringify({ type: 'analysis', data: analysisResults }));
  })
  .catch((error) => {
    console.error(error);
  });

  });
  

  // Handle WebSocket disconnections
  ws.on('close', (code, reason) => {
    console.log(`WebSocket connection closed. Code: ${code}, Reason: ${reason}`);
  });
  
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const axios = require('axios');
const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/'; // DALLE endpoint


    axios.post(apiUrl, {
      // Include the required parameters for the specific API endpoint
      frames: processedFrames 
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
  .then((response) => {
    const analysisResults = response.data;
    // Handle analysis results
  })
  .catch((error) => {
    console.error(error);
  });


// Assuming ws is the WebSocket connection
ws.send(JSON.stringify({ type: 'analysis', data: analysisResults }));


import OpenAI from "openai";

openai = new OpenAI();

async function main() {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: "The quick brown fox jumped over the lazy dog",
    encoding_format: "float",
  });

  console.log(embedding);
}

main();