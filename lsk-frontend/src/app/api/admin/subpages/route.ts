import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { query, isDbConfigured } from "@/lib/gem_db";

/**
 * ==============================================================================
 * [인천하이병원] 서브페이지 블록 빌더 RDBMS (카페24 MySQL) API 라우트
 * 경로: src/app/api/admin/subpages/route.ts
 * ==============================================================================
 * 1. 역할: 관리자 내용관리(블록 빌더)에서 편집한 서브페이지 본문 데이터를 카페24 MySQL DB에
 *    실시간 저장하고 조회합니다.
 * 2. 양방향 동기화: 로컬 개발 환경과 원격 Vercel 배포 환경이 동일한 카페24 MySQL을 바라봄으로써
 *    관리자에서 저장한 즉시 전 세계 어디서든 프론트엔드와 완벽하게 동기화됩니다.
 * 3. 2중 안전망 (Dual-Layer Fallback): DB 연결이 아직 설정되지 않았거나 일시적 오류 발생 시,
 *    기존 로컬 JSON 파일 시스템 스토리지(data/subpages)를 안전하게 폴백으로 사용합니다.
 * ==============================================================================
 */

// 로컬 백업용 JSON 스토리지 경로 (서버사이드 영구 보존용 폴백)
const LOCAL_STORAGE_DIR = path.join(process.cwd(), "data", "subpages");

function ensureStorageDir() {
  if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
    fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
  }
}

/**
 * [GET] 특정 페이지의 블록 데이터 조회
 * 파라미터: ?page_key=spine/lumbar-disc
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get("page_key");

    if (!pageKey) {
      return NextResponse.json({ error: "page_key is required" }, { status: 400 });
    }

    // 1. 카페24 MySQL DB 연동이 설정되어 있는 경우 DB 우선 조회
    if (isDbConfigured()) {
      try {
        const rows: any[] = await query(
          "SELECT page_key, category_name, subpage_name, blocks, updated_at FROM gem_subpage_contents WHERE page_key = ? LIMIT 1",
          [pageKey]
        );

        if (rows && rows.length > 0) {
          const row = rows[0];
          // blocks가 JSON 문자열일 경우 안전하게 객체로 파싱
          const parsedBlocks = typeof row.blocks === "string" ? JSON.parse(row.blocks) : row.blocks;
          return NextResponse.json({
            success: true,
            source: "mysql",
            data: {
              page_key: row.page_key,
              category_name: row.category_name,
              subpage_name: row.subpage_name,
              blocks: parsedBlocks,
              updated_at: row.updated_at,
            },
          });
        }
      } catch (dbErr) {
        console.warn("[MySQL GET Fallback] DB 조회 실패 또는 미생성, 파일 스토리지로 폴백:", dbErr);
      }
    }

    // 2. 파일 시스템 기반 영구 스토리지에서 조회 (로컬 폴백)
    ensureStorageDir();
    const safeKey = pageKey.replace(/\//g, "___");
    const filePath = path.join(LOCAL_STORAGE_DIR, `${safeKey}.json`);

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(fileData);
      return NextResponse.json({ success: true, source: "file", data: parsed });
    }

    // 데이터가 아직 없는 새로운 빈 페이지인 경우
    return NextResponse.json({ success: true, data: null, message: "Empty new page" });
  } catch (error: any) {
    console.error("GET /api/admin/subpages error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * [POST] 블록 빌더 데이터 저장 (신규 등록 및 수정)
 * 요청 본문: { page_key, category_name, subpage_name, blocks }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page_key, category_name, subpage_name, blocks } = body;

    if (!page_key) {
      return NextResponse.json({ error: "page_key is required" }, { status: 400 });
    }

    const blocksJsonString = JSON.stringify(blocks || []);
    let savedToMysql = false;

    // 1. 카페24 MySQL DB에 저장 (UPSERT: ON DUPLICATE KEY UPDATE)
    if (isDbConfigured()) {
      try {
        await query(
          `INSERT INTO gem_subpage_contents 
            (page_key, category_name, subpage_name, blocks, updated_at) 
           VALUES (?, ?, ?, ?, NOW()) 
           ON DUPLICATE KEY UPDATE 
            category_name = VALUES(category_name), 
            subpage_name = VALUES(subpage_name), 
            blocks = VALUES(blocks), 
            updated_at = NOW()`,
          [page_key, category_name || "", subpage_name || "", blocksJsonString]
        );
        savedToMysql = true;
      } catch (dbErr) {
        console.error("[MySQL POST Error] DB 저장 실패:", dbErr);
      }
    }

    // 2. 로컬 파일 시스템에도 백업 저장 (안전성 2중 보장)
    ensureStorageDir();
    const safeKey = page_key.replace(/\//g, "___");
    const filePath = path.join(LOCAL_STORAGE_DIR, `${safeKey}.json`);

    const record = {
      page_key,
      category_name,
      subpage_name,
      blocks: blocks || [],
      updated_at: new Date().toISOString(),
    };

    fs.writeFileSync(filePath, JSON.stringify(record, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: savedToMysql
        ? "카페24 MySQL 데이터베이스에 성공적으로 저장 및 원격 동기화되었습니다."
        : "로컬 스토리지에 저장되었습니다. (DB 환경변수 설정 시 MySQL로 자동 저장됩니다)",
      savedToMysql,
      data: record,
    });
  } catch (error: any) {
    console.error("POST /api/admin/subpages error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
