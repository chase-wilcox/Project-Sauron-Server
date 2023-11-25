import express from 'express';
import multer from 'multer';
import { OPENAI_API_KEY } from './key.mjs';
import https from 'https';
import { readFileSync } from 'fs';

const hostname = '146.190.175.179';
const port = 3000;

const app = express();
const upload = multer({ dest: 'uploads/' }); // Specify the directory to store uploaded files

app.post('/uploadVideo', upload.single('video'), (req, res) => {
  try {
    // Access the uploaded file
    const videoFile = req.file;
    if (!videoFile) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    // Implement your logic to process the video file (e.g., send to OpenAI)
    // Replace the following line with your actual processing logic
    const frameData = 'frames';

    // Simulate asynchronous processing
    setTimeout(() => {
      res.status(200).json({ frames: frameData });
    }, 2000);
  } catch (error) {
    console.error('Error handling video upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.status(200).send('This server is running');
});

const server = https.createServer(
  {
    // Specify your SSL configuration (privateKey and certificate)
    // key: privateKey,
    // cert: certificate,
  },
  app
);

server.listen(port, hostname, () => {
  console.log(`Server running at https://${hostname}:${port}/`);
});
