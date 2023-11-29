import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());


app.get('/', (req, res) => {
  const videoPath = path.join(__dirname, 'path/to/save', 'your-video-file.mp4');
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  };

  res.writeHead(200, head);
  fs.createReadStream(videoPath).pipe(res);
});


app.post('/uploadVideo', upload.single('video'), (req, res) => {
  try{
  // Access the uploaded video file
  const videoBuffer = req.file.buffer;
  console.log(req.body)
  console.log(req.params)
  console.log(req.headers)

  // Generate a timestamp for the filename
  const timestamp = Date.now();

  // Save the video file to disk with a timestamp-based filename
  // const videoPath = path.join(__dirname, 'path/to/save', `video_${timestamp}.mp4`);
  fs.writeFileSync(`video_${timestamp}.mp4`, videoBuffer);

  // Respond to the client with a 200 OK
  res.status(200).send('Video uploaded successfully');}
  catch (error){
    console.log(error)
  }
  
});




app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
