import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CAFE24_API_URL = "https://hihospital03.mycafe24.com/api_board.php";

export async function GET(request: NextRequest, { params }: { params: { boardId: string } }) {
  try {
    const { boardId } = params;
    const { searchParams } = new URL(request.url);
    
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const action = searchParams.get("action") || "list";
    const postId = searchParams.get("postId") || "";
    
    const apiUrl = `${CAFE24_API_URL}?board=${boardId}&page=${page}&limit=${limit}&action=${action}&postId=${postId}`;
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
  try {
    const { boardId } = params;
    const body = await request.json();
    
    const apiUrl = `${CAFE24_API_URL}?board=${boardId}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store'
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`[API] Board Write Proxy Error (${params?.boardId}):`, error);
    return NextResponse.json({ success: false, error: '서버 통신 에러가 발생했습니다.' }, { status: 500 });
  }
}
