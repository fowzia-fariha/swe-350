// const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',
//   port: 3307, 
//   user: 'root',
//   password: 'HereI$p@ss9977', // Add your password here
//   database: 'test'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// module.exports = db;


import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'HereI$p@ss9977',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;