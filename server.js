const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// 업로드 디렉토리 경로
const uploadDir = path.join(__dirname, 'uploads');

// 업로드 디렉토리가 없으면 생성
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 정적 파일 제공 설정 (CSS, JS 파일 등)
app.use(express.static(path.join(__dirname, 'public')));  // public 디렉토리에서 정적 파일 제공

// 파일 업로드를 위한 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // uploads 디렉토리에 저장
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름 설정
  }
});

const upload = multer({ storage: storage });

// 루트 경로에서 파일 업로드 폼 HTML 반환
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // 'index.html' 파일 경로
});

// 파일 업로드 처리
app.post('/upload', upload.single('file-upload'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('파일을 업로드 해주세요!');
  }
  res.send('파일 업로드 성공: ' + req.file.filename);
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});


