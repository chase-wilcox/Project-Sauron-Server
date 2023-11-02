// // import express from 'express';
// // import https from 'https';
// // import sharp from 'sharp';
// // import axios from 'axios';
// import { OPENAI_API_KEY } from './key.cjs';

// // const app = express();
// // const server = https.createServer(app);

// // app.use(express.json()); // Enable JSON parsing for requests

// // app.post('/frames', async (req, res) => {
// //   const frameData = req.body.frames;

// //   // Log that the server received frames
// //   console.log('Received frames from the app:', frameData);

// //   // Process frameData as needed
// //   const image = sharp(frameData);
// //   image.resize(800, 600);
// //   image.toFormat('jpeg');
// //   image.toBuffer(async (err, processedFrame) => {
// //     if (err) {
// //       console.error('Error processing frame:', err);
// //       return;
// //     }

// //     // Log that the frame has been processed
// //     console.log('Frame processed:', processedFrame);

// //     // Make request to OpenAI API
// //     try {
// //       const response = await axios.post('https://api.openai.com/v1/frames', {
// //         frames: processedFrame
// //       }, {
// //         headers: {
// //           'Authorization': `Bearer ${OPENAI_API_KEY}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       const analysisResults = response.data;

// //       // Log the analysis results
// //       console.log('Analysis results:', analysisResults);

// //       // Send the analysis results back to the app
// //       res.json({ type: 'analysis', data: analysisResults });
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).json({ error: 'Internal server error' });
// //     }
// //   });
// // });


// // const PORT = 3000;

// // server.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });


// // sending frames to a webserver (please)

// // Function to update the frame image on the webpage
// function updateFrameImage(frameData) {
//   const frameImage = document.getElementById('frameImage');
//   frameImage.src = `data:image/jpeg;base64, ${frameData}`;
// }

// // Function to send frames to the server
// function sendFramesToServer(frames) {
//   fetch('https://146.190.175.179/frames', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           'Authorization': OPENAI_API_KEY
//       },
//       body: JSON.stringify({ frames })
//   })
//   .then(response => response.json())
//   .then(data => {
//       console.log('Frames sent successfully');
//   })
//   .catch(error => console.error('Error sending frames:', error));
// }

// // sending frames function
// function processFrame(frameData) {
//   sendFramesToServer(frameData);
//   updateFrameImage(frameData);
// }


const http = require('http');
const hostname = '146.190.175.179';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
