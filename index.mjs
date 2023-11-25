import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
const storage = multer.memoryStorage();  // Change this to store files on disk if needed
const upload = multer({ storage: storage });

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/videos/:filename', (req, res) => {
  const videoPath = path.join(__dirname, 'path/to/save', req.params.filename);
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

app.post('/uploadVideo', upload.single('video'), (req, res) => {
  // Access the uploaded video file
  const videoBuffer = req.file.buffer;

  // Save the video file to disk or process it as needed
  const videoPath = path.join(__dirname, 'path/to/save', `video_${Date.now()}.mp4`);
  fs.writeFileSync(videoPath, videoBuffer);

  // Respond to the client
  res.status(200).json({ message: 'Video uploaded successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
