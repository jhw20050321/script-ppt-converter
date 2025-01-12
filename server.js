const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// multer 설정: 업로드 파일 저장 위치 및 파일명 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 업로드 폴더에 저장
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름에 타임스탬프 추가
    }
});

const upload = multer({ storage: storage });

// 파일 업로드 처리
app.post('/upload', upload.single('file-upload'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('파일을 업로드 해주세요!');
    }
    res.send('파일 업로드 성공: ' + req.file.filename);
});

// 정적 파일 제공 (HTML, CSS, JS)
app.use(express.static('public'));

// 서버 실행
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
