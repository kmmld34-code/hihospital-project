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
  const [cols] = await conn.execute("DESCRIBE g7_pages");
  console.log("g7_pages 컬럼 구조:");
  console.log(cols.map(c => ({
    Field: c.Field.toString(),
    Type: c.Type.toString(),
    Null: c.Null.toString(),
    Key: c.Key.toString(),
    Default: c.Default ? c.Default.toString() : null
  })));

  const [rows] = await conn.execute("SELECT id, slug, title FROM g7_pages LIMIT 10");
  console.log("g7_pages 기존 데이터 샘플:");
  console.log(rows.map(r => ({
    id: r.id,
    slug: r.slug ? r.slug.toString() : null,
    title: r.title ? r.title.toString() : null
  })));
  await conn.end();
}
check();
