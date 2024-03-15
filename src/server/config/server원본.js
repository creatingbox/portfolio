const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 4000;

// MySQL 연결 설정
const db = require('./db');  // db.js 모듈 import

app.use(cors());

app.get('/', (req, res) => {
  console.log('Root');
  res.send('Root'); // 클라이언트에 응답을 보내는 부분을 추가
});

app.get('/activities', (req, res) => {
  console.log('/activities');

  // MySQL 쿼리 실행
  db.query('SELECT `WBS Code`, `(*)WBS Name`, `Activity ID`, `Activity Name`, `Start Date`, `Finish Date` FROM activities', (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('Internal Server Error'); // 에러 응답을 클라이언트에 전송
    } else {
      console.log('Query result:', result);
      res.json(result); // JSON 형태의 결과를 클라이언트에 전송
    }
  });
});

app.get('/relations', (req,res) => {
  console.log('/relations');

  db.query('SELECT * FROM relations', (err, result)=> {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('Internal Server Error'); // 에러 응답을 클라이언트에 전송
    } else {
      console.log('Query result:', result);
      res.json(result); // JSON 형태의 결과를 클라이언트에 전송
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server On: http://localhost:${PORT}`);
});
