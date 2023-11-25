import http from 'http'
import multer from 'multer'
import fs from 'fs'

const app = express();
const port = 3000;

const storage = multer.memoryStorage(); // Change this to store files on disk if needed
const upload = multer({ storage: storage });

app.post('/uploadVideo', upload.single('video'), (req, res) => {
  // Access the uploaded video file
  const videoBuffer = req.file.buffer;

  // Save the video file to disk or process it as needed
  const videoPath = 'path/to/save/video.mp4';
  fs.writeFileSync(videoPath, videoBuffer);

  // Respond to the client
  res.status(200).json({ message: 'Video uploaded successfully' });
});

app.get('/', (req, res) => {
  res.status(200).send('This server is running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
