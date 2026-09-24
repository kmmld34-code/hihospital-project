import { NextRequest, NextResponse } from "next/server";
import { query, isDbConfigured } from "@/lib/gem_db";

export async function GET(request: NextRequest, { params }: { params: { boardId: string } }) {
  try {
    const { boardId } = params;
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    if (!isDbConfigured()) {
      return NextResponse.json({ error: "DB configuration missing" }, { status: 500 });
    }

    // 1. g7_board 에서 게시판 설정 조회
    const boardSettings: any[] = await query(
      `SELECT bo_table, bo_subject, bo_list_level, bo_read_level, bo_write_level, bo_reply_level, bo_comment_level 
       FROM g7_board WHERE bo_table = ? LIMIT 1`,
      [boardId]
    );

    if (!boardSettings || boardSettings.length === 0) {
      return NextResponse.json({ success: false, error: "존재하지 않는 게시판입니다." }, { status: 404 });
    }

    const config = boardSettings[0];
    const tableName = `g7_write_${boardId}`;

    // 2. 전체 게시글 수 조회
    const countRows: any[] = await query(`SELECT COUNT(*) as total FROM ${tableName} WHERE wr_is_comment = 0`);
    const total = countRows[0]?.total || 0;

    // 3. 게시글 목록 조회
    const rows: any[] = await query(
      `SELECT wr_id, wr_subject, wr_name, wr_datetime, wr_hit, wr_option 
       FROM ${tableName} 
       WHERE wr_is_comment = 0 
       ORDER BY wr_num, wr_reply 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return NextResponse.json({
      success: true,
      data: {
        config,
        total,
        page,
        limit,
        list: rows
      }
    });
  } catch (error: any) {
    console.error(`[API] Board List GET Error (${params.boardId}):`, error);
    return NextResponse.json({ success: false, data: { total: 0, list: [], config: {} }, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { boardId: string } }) {
  try {
    const { boardId } = params;
    const body = await request.json();
    const { wr_subject, wr_content, wr_name, wr_password } = body;

    if (!isDbConfigured()) {
      return NextResponse.json({ error: "DB configuration missing" }, { status: 500 });
    }

    // 1. 게시판 쓰기 권한 체크 (간소화)
    const boardSettings: any[] = await query(`SELECT bo_write_level FROM g7_board WHERE bo_table = ? LIMIT 1`, [boardId]);
    if (!boardSettings || boardSettings.length === 0) {
      return NextResponse.json({ error: "존재하지 않는 게시판입니다." }, { status: 404 });
    }
    
    // TODO: 현재 로그인 세션 레벨과 bo_write_level 비교 로직 필요 (현재는 패스)
    
    const tableName = `g7_write_${boardId}`;

    await query(
      `INSERT INTO ${tableName} 
       (wr_num, wr_reply, wr_parent, wr_is_comment, wr_comment, wr_comment_reply, 
        ca_name, wr_option, wr_subject, wr_content, wr_link1, wr_link2, wr_link1_hit, wr_link2_hit, 
        wr_hit, wr_good, wr_nogood, mb_id, wr_password, wr_name, wr_email, wr_homepage, 
        wr_datetime, wr_file, wr_last, wr_ip, wr_facebook_user, wr_twitter_user, wr_1, wr_2, wr_3, wr_4, wr_5, wr_6, wr_7, wr_8, wr_9, wr_10)
       VALUES 
       (0, '', 0, 0, 0, '', 
        '', '', ?, ?, '', '', 0, 0, 
        0, 0, 0, '', ?, ?, '', '', 
        NOW(), 0, NOW(), '127.0.0.1', '', '', '', '', '', '', '', '', '', '', '', '')`,
      [wr_subject, wr_content, wr_password || '', wr_name || 'Guest']
    );

    const lastInsertRows: any[] = await query(`SELECT LAST_INSERT_ID() as lastId`);
    if(lastInsertRows && lastInsertRows[0].lastId) {
       const insertedId = lastInsertRows[0].lastId;
       await query(`UPDATE ${tableName} SET wr_num = ?, wr_parent = ? WHERE wr_id = ?`, [-insertedId, insertedId, insertedId]);
    }

    return NextResponse.json({ success: true, message: "게시글이 성공적으로 등록되었습니다." });
  } catch (error: any) {
    console.error(`[API] Board POST Error (${params.boardId}):`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
