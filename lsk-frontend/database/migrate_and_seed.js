/**
 * ==============================================================================
 * [인천하이병원] 카페24 MySQL 원클릭 DB 테이블 생성 및 기존 데이터 마이그레이션 스크립트
 * 경로: database/migrate_and_seed.js
 * 실행방법: node database/migrate_and_seed.js
 * ==============================================================================
 * 1. 역할: 
 *    - 카페24 MySQL DB에 'gem_subpage_contents' 테이블을 자동 생성합니다.
 *    - 로컬의 data/subpages/*.json (허리디스크 등 기존 작업 데이터)을 읽어
 *      카페24 MySQL 데이터베이스로 자동 마이그레이션(INSERT)합니다.
 * 2. 효과: 
 *    - 한 번만 실행하면 로컬과 Vercel 원격 프론트엔드가 즉시 동기화됩니다.
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// .env.local 또는 .env 파일 로드
const envPath = path.join(__dirname, '..', '.env.local');
const defaultEnvPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else if (fs.existsSync(defaultEnvPath)) {
  require('dotenv').config({ path: defaultEnvPath });
}

async function runMigration() {
  console.log('====================================================');
  console.log('🚀 [인천하이병원] 카페24 MySQL 마이그레이션 시작');
  console.log('====================================================');

  const config = {
    host: process.env.CAFE24_DB_HOST || process.env.DB_HOST,
    port: Number(process.env.CAFE24_DB_PORT || process.env.DB_PORT || 3306),
    user: process.env.CAFE24_DB_USER || process.env.DB_USER,
    password: process.env.CAFE24_DB_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.CAFE24_DB_NAME || process.env.DB_NAME,
    charset: 'utf8mb4'
  };

  if (!config.host || !config.user || !config.database) {
    console.error('❌ [오류] DB 접속 환경 변수가 설정되지 않았습니다.');
    console.error('   .env.local 파일에 다음 정보를 입력해 주세요:');
    console.error('   - CAFE24_DB_HOST');
    console.error('   - CAFE24_DB_USER');
    console.error('   - CAFE24_DB_PASSWORD');
    console.error('   - CAFE24_DB_NAME');
    process.exit(1);
  }

  console.log(`📡 대상 DB 호스트: ${config.host}:${config.port}`);
  console.log(`📦 데이터베이스명: ${config.database}`);
  console.log(`👤 사용자 계정  : ${config.user}`);

  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('✅ 카페24 MySQL 데이터베이스 접속 성공!');

    // 1. 테이블 생성
    const sqlPath = path.join(__dirname, 'migrations', '001_gem_create_subpages_table.sql');
    if (fs.existsSync(sqlPath)) {
      const createTableSql = fs.readFileSync(sqlPath, 'utf8');
      await connection.query(createTableSql);
      console.log('✅ [1단계] gem_subpage_contents 테이블 생성 완료!');
    }

    // 2. 기존 data/subpages/*.json 데이터 마이그레이션
    const storageDir = path.join(__dirname, '..', 'data', 'subpages');
    if (fs.existsSync(storageDir)) {
      const files = fs.readdirSync(storageDir).filter(f => f.endsWith('.json'));
      console.log(`📂 발견된 로컬 데이터 파일: ${files.length}개`);

      for (const file of files) {
        const filePath = path.join(storageDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);

        const pageKey = data.page_key;
        const categoryName = data.category_name || '';
        const subpageName = data.subpage_name || '';
        const blocksStr = JSON.stringify(data.blocks || []);

        await connection.execute(
          `INSERT INTO gem_subpage_contents 
            (page_key, category_name, subpage_name, blocks, updated_at) 
           VALUES (?, ?, ?, ?, NOW()) 
           ON DUPLICATE KEY UPDATE 
            category_name = VALUES(category_name), 
            subpage_name = VALUES(subpage_name), 
            blocks = VALUES(blocks), 
            updated_at = NOW()`,
          [pageKey, categoryName, subpageName, blocksStr]
        );

        console.log(`   ➡️  마이그레이션 완료: [${categoryName} > ${subpageName}] (key: ${pageKey})`);
      }
    }

    console.log('====================================================');
    console.log('🎉 모든 마이그레이션 및 데이터 주입이 성공적으로 완료되었습니다!');
    console.log('====================================================');
  } catch (error) {
    console.error('❌ 마이그레이션 도중 오류 발생:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runMigration();
