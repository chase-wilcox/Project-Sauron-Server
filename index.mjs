import http from 'http'
import multer from 'multer'
import fs from 'fs'

const hostname = '146.190.175.179';
const app = express();
const port = 3000;
const storage = multer.memoryStorage();  // Change this to store files on disk if needed
const upload = multer({ storage: storage });

const server = http.createServer((req, res) => {
  console.log(`Received request for ${req.url}`);
  if (req.method === 'POST' && req.url === '/uploadVideo') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      console.log('Received data:', data);
      // Simulate some asynchronous processing (replace with actual frame processing)
      setTimeout(() => {
        const frameData = 'frames'; // Need actual frame data
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ frames: frameData }));
      }, 2000); // Simulated processing time of 2 seconds
    });
  } else {
    // other requests
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This server is running\n');
  }
  app.post('/uploadVideo', upload.single('video'), (req, res) => {
    // Access the uploaded video file
    const videoBuffer = req.file.buffer;
  
    // Save the video file to disk or process it as needed
    const videoPath = 'path/to/save/video.mp4';
    fs.writeFileSync(videoPath, videoBuffer);
  
    // Respond to the client
    res.status(200).json({ message: 'Video uploaded successfully' });
  });
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
