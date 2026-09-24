import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { query, isDbConfigured } from "@/lib/gem_db";

/**
 * ==============================================================================
 * [인천하이병원] 서브페이지 블록 빌더 RDBMS (카페24 그누보드7 g7_pages) API 라우트
 * 경로: src/app/api/admin/subpages/route.ts
 * ==============================================================================
 * 1. 역할: 관리자 내용관리(블록 빌더)에서 편집한 서브페이지 본문 데이터를 
 *    그누보드7 순정 테이블인 'g7_pages'의 'content' 컬럼에 실시간 업데이트합니다.
 * 2. 원리: 59개의 메뉴 페이지가 이미 백엔드 g7_pages에 등록(비워진 상태)되어 있으므로,
 *    블록 에디터에서 저장 시 해당 slug를 찾아 content만 UPDATE 합니다.
 * 3. 2중 안전망 (Dual-Layer Fallback): DB 연결이 안될 경우 파일 시스템(로컬) 사용
 * ==============================================================================
 */

const LOCAL_STORAGE_DIR = path.join(process.cwd(), "data", "subpages");

function ensureStorageDir() {
  if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
    fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get("page_key"); // 예: spine-lumbar-disc

    if (!pageKey) {
      return NextResponse.json({ error: "page_key is required" }, { status: 400 });
    }

    if (isDbConfigured()) {
      try {
        const rows: any[] = await query(
          "SELECT slug, title, content, updated_at FROM g7_pages WHERE slug = ? LIMIT 1",
          [pageKey]
        );

        if (rows && rows.length > 0) {
          const row = rows[0];
          // title 파싱 ({"ko":"..."}) 처리
          let parsedTitle = row.title;
          try {
            const titleObj = JSON.parse(row.title);
            parsedTitle = titleObj.ko || titleObj.en || row.title;
          } catch (e) { /* ignore JSON parse error */ }

          // content 파싱
          const parsedBlocks = row.content ? (typeof row.content === "string" ? JSON.parse(row.content) : row.content) : [];
          
          return NextResponse.json({
            success: true,
            source: "mysql",
            data: {
              page_key: row.slug,
              subpage_name: parsedTitle,
              blocks: parsedBlocks,
              updated_at: row.updated_at,
            },
          });
        }
      } catch (dbErr) {
        console.warn("[MySQL GET Fallback] DB 조회 실패, 파일 스토리지로 폴백:", dbErr);
      }
    }

    // 폴백: 로컬 파일 시스템
    ensureStorageDir();
    const safeKey = pageKey.replace(/\//g, "-");
    const filePath = path.join(LOCAL_STORAGE_DIR, `${safeKey}.json`);

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(fileData);
      return NextResponse.json({ success: true, source: "file", data: parsed });
    }

    return NextResponse.json({ success: true, data: null, message: "Empty new page" });
  } catch (error: any) {
    console.error("GET /api/admin/subpages error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page_key, subpage_name, blocks } = body;

    if (!page_key) {
      return NextResponse.json({ error: "page_key is required" }, { status: 400 });
    }

    const blocksJsonString = JSON.stringify(blocks || []);
    let savedToMysql = false;

    // 그누보드7 g7_pages 테이블에 UPDATE (미리 페이지가 등록되어 있으므로 UPDATE)
    if (isDbConfigured()) {
      try {
        await query(
          `UPDATE g7_pages 
           SET content = ?, content_mode = 'json', updated_at = NOW() 
           WHERE slug = ?`,
          [blocksJsonString, page_key]
        );
        savedToMysql = true;
      } catch (dbErr) {
        console.error("[MySQL POST Error] DB 저장 실패:", dbErr);
      }
    }

    // 로컬 백업 저장
    ensureStorageDir();
    const safeKey = page_key.replace(/\//g, "-");
    const filePath = path.join(LOCAL_STORAGE_DIR, `${safeKey}.json`);
    const record = {
      page_key,
      subpage_name,
      blocks: blocks || [],
      updated_at: new Date().toISOString(),
    };
    fs.writeFileSync(filePath, JSON.stringify(record, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: savedToMysql
        ? "그누보드7 g7_pages 테이블에 성공적으로 업데이트 되었습니다."
        : "로컬 스토리지에 저장되었습니다.",
      savedToMysql,
      data: record,
    });
  } catch (error: any) {
    console.error("POST /api/admin/subpages error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
