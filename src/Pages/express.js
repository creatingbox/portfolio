const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// 파일이 저장될 경로와 파일 이름 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 파일 저장 경로 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 파일 이름 설정
  }
});

// multer 미들웨어 생성
const upload = multer({ storage: storage });

// 파일 업로드를 처리하는 라우터 설정
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
