const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 4000;
const { PythonShell } = require('python-shell');


// MySQL 연결 설정
const db = require('./db');  // db.js 모듈 import

app.use(cors());

// 파이썬 코드 수행 추가
app.use(express.json());

// 클라이언트에서 보내는 run algorithm 엔드포인트에 대한 POST 요청 핸들러
app.post('/runAlgorithm', (req, res) => {
  // 클라이언트로부터 받은 데이터
  const { inputData } = req.body;

  // 파이썬 코드 실행
  PythonShell.run('algorithm.py', { args: [inputData] }, (err, result) => {
    if (err) {
      console.error('Error', err);
      res.status(500).send('알고리즘 수행 중 오류가 발생했습니다');
    } else {
      console.log('Result:', result);
      res.send(result);
    }
  });
});



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
