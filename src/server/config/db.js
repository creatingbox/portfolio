var mysql = require('mysql');
const db = mysql.createPool({
    host : 'localhost',                 // host 
    user : 'root',                      // 유저이름
    password : 'kyeongho',              // 비밀번호
    database : 'classicmodels',         // 가져올 데이터베이스
    port : 3306,                        // mysql 포트번호
});

module.exports = db;