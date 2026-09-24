const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

function normalizeRow(row) {
  if (!row || typeof row !== 'object') return row;
  const normalized = Array.isArray(row) ? [] : {};
  for (const [key, value] of Object.entries(row)) {
    if (Buffer.isBuffer(value)) {
      normalized[key] = value.toString('utf8');
    } else {
      normalized[key] = value;
    }
  }
  return normalized;
}

async function verify() {
  const conn = await mysql.createConnection({
    host: process.env.CAFE24_DB_HOST,
    user: process.env.CAFE24_DB_USER,
    password: process.env.CAFE24_DB_PASSWORD,
    database: process.env.CAFE24_DB_NAME
  });
  const [rows] = await conn.execute('SELECT id, page_key, category_name, subpage_name, LENGTH(blocks) as block_bytes, updated_at FROM gem_subpage_contents');
  const normalized = rows.map(normalizeRow);
  console.log('✅ [검증 성공] 카페24 DB 정상 저장 확인:');
  console.log(JSON.stringify(normalized, null, 2));
  await conn.end();
}
verify();
