/**
 * ==============================================================================
 * [인천하이병원] 카페24 MySQL 데이터베이스 커넥션 풀 유틸리티
 * 경로: src/lib/gem_db.ts
 * ==============================================================================
 */

import mysql from "mysql2/promise";

declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

// 환경변수가 없더라도 대표님이 알려주신 정보로 Fallback 연결을 보장합니다.
const dbConfig: mysql.PoolOptions = {
  host: process.env.CAFE24_DB_HOST || process.env.DB_HOST || "hihospital03.mycafe24.com",
  port: Number(process.env.CAFE24_DB_PORT || process.env.DB_PORT || 3306),
  user: process.env.CAFE24_DB_USER || process.env.DB_USER || "hihospital03",
  password: process.env.CAFE24_DB_PASSWORD || process.env.DB_PASSWORD || "Highdqhtlf@1",
  database: process.env.CAFE24_DB_NAME || process.env.DB_NAME || "hihospital03",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  charset: "utf8mb4",
};

export function isDbConfigured(): boolean {
  // Fallback이 설정되어 있으므로 항상 true를 반환합니다.
  return true;
}

export function getDbPool(): mysql.Pool {
  if (!global._mysqlPool) {
    global._mysqlPool = mysql.createPool(dbConfig);
  }
  return global._mysqlPool;
}

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

export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const pool = getDbPool();
  const [rows] = await pool.execute(sql, params);
  
  if (Array.isArray(rows)) {
    return rows.map((r) => normalizeRow(r)) as unknown as T;
  }
  return normalizeRow(rows) as unknown as T;
}
