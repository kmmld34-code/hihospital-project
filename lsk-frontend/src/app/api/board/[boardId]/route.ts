import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CAFE24_API_URL = "https://hihospital03.mycafe24.com/api_board.php";

export async function GET(request: NextRequest, { params }: { params: { boardId: string } }) {
  try {
    const { boardId } = params;
    const { searchParams } = new URL(request.url);
    
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    
    // Vercel 동적 IP 차단(44.x.x.x) 문제를 우회하기 위해 카페24 서버 내부에 올려둔 api_board.php 로 통신
    const apiUrl = `${CAFE24_API_URL}?board=${boardId}&page=${page}&limit=${limit}`;
    const response = await fetch(apiUrl, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`Cafe24 API Proxy HTTP Error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error(`[API] Board List Proxy Error (${params?.boardId}):`, error);
    return NextResponse.json({ success: false, data: { total: 0, list: [], config: {} }, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { boardId: string } }) {
  return NextResponse.json({ error: "프론트엔드 글쓰기는 현재 개발 중입니다." }, { status: 501 });
}
