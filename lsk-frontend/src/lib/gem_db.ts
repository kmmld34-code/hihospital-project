/**
 * ==============================================================================
 * [인천하이병원] 카페24 MySQL 데이터베이스 커넥션 풀 유틸리티
 * 경로: src/lib/gem_db.ts
 * ==============================================================================
 * 1. 역할: 카페24 MySQL 서버와 안전하게 통신할 수 있는 Connection Pool을 생성 및 관리합니다.
 * 2. 서버리스 최적화: Vercel과 같은 서버리스 환경 및 Next.js 핫 리로딩 시 불필요한
 *    커넥션 중복 생성을 방지하기 위해 globalThis 싱글톤 패턴을 적용합니다.
 * 3. 보안: DB 접속 정보는 코드에 하드코딩하지 않고 .env.local 환경 변수에서 안전하게 불러옵니다.
 * 4. 인코딩 안전장치: MariaDB 드라이버가 VARCHAR/LONGTEXT를 Buffer로 반환할 경우
 *    자동으로 utf-8 문자열로 디코딩하여 데이터 무결성을 보장합니다.
 * ==============================================================================
 */

import mysql from "mysql2/promise";

declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

const dbConfig: mysql.PoolOptions = {
  host: process.env.CAFE24_DB_HOST || process.env.DB_HOST || "localhost",
  port: Number(process.env.CAFE24_DB_PORT || process.env.DB_PORT || 3306),
  user: process.env.CAFE24_DB_USER || process.env.DB_USER || "",
  password: process.env.CAFE24_DB_PASSWORD || process.env.DB_PASSWORD || "",
  database: process.env.CAFE24_DB_NAME || process.env.DB_NAME || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  charset: "utf8mb4",
};

export function isDbConfigured(): boolean {
  const host = process.env.CAFE24_DB_HOST || process.env.DB_HOST;
  const user = process.env.CAFE24_DB_USER || process.env.DB_USER;
  const database = process.env.CAFE24_DB_NAME || process.env.DB_NAME;
  return Boolean(host && user && database);
}

export function getDbPool(): mysql.Pool {
  if (!global._mysqlPool) {
    global._mysqlPool = mysql.createPool(dbConfig);
  }
  return global._mysqlPool;
}

/**
 * Buffer 형태의 컬럼 값을 안전하게 문자열로 변환하는 헬퍼 함수
 */
function normalizeRow(row: any): any {
  if (!row || typeof row !== "object") return row;
  const normalized: any = Array.isArray(row) ? [] : {};
  for (const [key, value] of Object.entries(row)) {
    if (Buffer.isBuffer(value)) {
      normalized[key] = value.toString("utf8");
    } else if (value && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date)) {
      normalized[key] = normalizeRow(value);
    } else {
      normalized[key] = value;
    }
  }
  return normalized;
}

/**
 * [공통 쿼리 실행 헬퍼]
 * SQL 쿼리와 파라미터를 받아 실행하고 Buffer 필드를 문자열로 정규화하여 반환합니다.
 */
export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const pool = getDbPool();
  const [rows] = await pool.execute(sql, params);
  
  if (Array.isArray(rows)) {
    return rows.map((r) => normalizeRow(r)) as unknown as T;
  }
  return normalizeRow(rows) as unknown as T;
}
