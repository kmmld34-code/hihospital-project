import { NextRequest, NextResponse } from "next/server";

const CAFE24_API_URL = "https://hihospital03.mycafe24.com/api_board.php";

export async function GET(request: NextRequest, { params }: { params: { boardId: string } }) {
  try {
    const { boardId } = params;
    const { searchParams } = new URL(request.url);
    
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    
    // 카페24 API로 프록시 요청 (직접 DB 연결 대신)
    const apiUrl = `${CAFE24_API_URL}?board=${boardId}&page=${page}&limit=${limit}`;
    const response = await fetch(apiUrl, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`Cafe24 API HTTP Error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error(`[API] Board List Proxy Error (${params.boardId}):`, error);
    return NextResponse.json({ success: false, data: { total: 0, list: [], config: {} }, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { boardId: string } }) {
  // 글쓰기(POST)는 아직 api_board.php에 구현되지 않았으므로 에러 반환 또는 향후 연동
  return NextResponse.json({ error: "프론트엔드 글쓰기는 현재 구현 중입니다." }, { status: 501 });
}
