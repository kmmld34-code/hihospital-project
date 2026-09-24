const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function checkTables() {
  const conn = await mysql.createConnection({
    host: process.env.CAFE24_DB_HOST,
    user: process.env.CAFE24_DB_USER,
    password: process.env.CAFE24_DB_PASSWORD,
    database: process.env.CAFE24_DB_NAME
  });
  const [rows] = await conn.execute("SHOW TABLES");
  console.log("=== 카페24 DB 테이블 수:", rows.length);
  const tableNames = rows.map(r => Object.values(r)[0]);
  console.log("테이블 목록:", tableNames);
  await conn.end();
}
checkTables();
