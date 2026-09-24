const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function check() {
  const conn = await mysql.createConnection({
    host: process.env.CAFE24_DB_HOST,
    user: process.env.CAFE24_DB_USER,
    password: process.env.CAFE24_DB_PASSWORD,
    database: process.env.CAFE24_DB_NAME
  });
  const [rows] = await conn.execute("SHOW TABLES LIKE '%page%'");
  console.log("page 관련 테이블:", rows.map(r => Object.values(r)[0].toString()));

  const [contentRows] = await conn.execute("SHOW TABLES LIKE '%content%'");
  console.log("content 관련 테이블:", contentRows.map(r => Object.values(r)[0].toString()));
  await conn.end();
}
check();
