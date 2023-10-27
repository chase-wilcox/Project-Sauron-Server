import express from 'express';
import http from 'http';
import sharp from 'sharp';
import axios from 'axios';
import { OPENAI_API_KEY } from './key.mjs';

const app = express();
const server = http.createServer(app);

app.use(express.json()); // Enable JSON parsing for requests

app.post('/analyze', async (req, res) => {
  const frameData = req.body.frames;

// Process frameData as needed
// Decode the image
const image = sharp(frameData);

// Resize the image to a specific width and height
image.resize(800, 600);

// Convert the image to a different format (e.g., PNG, JPEG)
const pic = image.toFormat('jpeg');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '/picture.jpeg');
pic.toFile(filePath, function(err) {
        // error handling
      });
// var transformer = sharp()
//     .rotate()
//     .resize(500,500)
//     .toFile(filepath, function(err) {
//       // error handling
//     });

filestream.pipe(transformer);
// Get the processed image as a Buffer
image.toBuffer((err, processedFrame) => {
  if (err) {
    console.error('Error processing frame:', err);
    return;
  }

  // Processed frame (Buffer) is ready for further use
});
  // Make request to OpenAI API
  try {
    const response = await axios.post('https://api.openai.com/v1/analyze', {
      frames: frameData
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const analysisResults = response.data;
    res.json({ type: 'analysis', data: analysisResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/analyze`);
});
