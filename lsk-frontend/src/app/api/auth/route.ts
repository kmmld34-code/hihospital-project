import { NextResponse } from 'next/server';

const CAFE24_AUTH_API_URL = "https://hihospital03.mycafe24.com/api_auth.php";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 카페24 백엔드로 로그인 요청 전달
    const res = await fetch(CAFE24_AUTH_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store'
    });
    
    const data = await res.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Auth API Error:", error);
    return NextResponse.json({ success: false, error: 'Auth API Gateway Error' }, { status: 500 });
  }
}
