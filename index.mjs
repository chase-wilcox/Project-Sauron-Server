import express from 'express';
import https from 'https';
import sharp from 'sharp';
import axios from 'axios';
import { OPENAI_API_KEY } from './key.mjs';
import { readFileSync } from 'fs';

const hostname = '146.190.175.179';
const port = 3000;
// const privateKey = readFileSync('path/to/private-key.pem');
// const certificate = readFileSync('path/to/certificate.pem');



const server = https.createServer((req, res) => { //all the server logic
  console.log(`Received request for ${req.url}`);
  if (req.method === 'GET' && req.url === '/uploadVideo') {
    // Simulate some asynchronous processing (replace with actual frame processing)
    setTimeout(() => {
      const frameData = 'frames'; // Need actual frame data
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ frames: frameData }));
    }, 2000); // Simulated processing time of 2 seconds
  } else {
    // other requests
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This server is running\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at https://${hostname}:${port}/`);
});

