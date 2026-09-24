import { NextRequest, NextResponse } from "next/server";
import { query, isDbConfigured } from "@/lib/gem_db";

/**
 * ==============================================================================
 * [인천하이병원] 그누보드7 게시판 API 라우트 - 글 조회(GET) 및 수정/삭제
 * 경로: src/app/api/board/[boardId]/[wrId]/route.ts
 * ==============================================================================
 */

export async function GET(request: NextRequest, { params }: { params: { boardId: string, wrId: string } }) {
  try {
    const { boardId, wrId } = params;
    
    if (!isDbConfigured()) {
      return NextResponse.json({ error: "DB configuration missing" }, { status: 500 });
    }

    const tableName = `g7_write_${boardId}`;

    // 1. 조회수(hit) 1 증가
    await query(`UPDATE ${tableName} SET wr_hit = wr_hit + 1 WHERE wr_id = ?`, [wrId]);

    // 2. 글 데이터 가져오기
    const rows: any[] = await query(
      `SELECT wr_id, wr_subject, wr_content, wr_name, wr_datetime, wr_hit, wr_option 
       FROM ${tableName} 
       WHERE wr_id = ? LIMIT 1`,
      [wrId]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: rows[0]
    });
  } catch (error: any) {
    console.error(`[API] Board View GET Error:`, error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
