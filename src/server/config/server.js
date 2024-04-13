

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

app.get('/data', (req, res) => {
  console.log('/data');

  // 병렬로 두 개의 쿼리 실행
  Promise.all([
    new Promise((resolve, reject) => {
      db.query('SELECT `WBS Code`, `(*)WBS Name`, `Activity ID`, `Activity Name`, `Start Date`, `Finish Date` FROM activities', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),
    new Promise((resolve, reject) => {
      db.query('SELECT * FROM relations', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  ]).then(([activities, relations]) => {
    res.json({ activities, relations });
  }).catch(error => {
    console.error('Error', error);
    res.status(500).send('Internal Server Error');
  });
});

app.listen(PORT, () => {
  console.log(`Server On: http://localhost:${PORT}`);
});