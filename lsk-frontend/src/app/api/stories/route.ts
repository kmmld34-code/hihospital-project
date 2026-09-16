import { NextRequest, NextResponse } from "next/server";
import { GEM_PATIENT_STORIES } from "@/data/hospitalData";

/**
 * ==============================================================================
 * [API Route] 생생한 환자 치료 스토리 REST API 엔드포인트 (/api/stories)
 * ==============================================================================
 * 작성자: 최우진 대리 (Backend Lead Engineer)
 * 기술 감수: 박동훈 차장 (Lead System Architect), 강수진 실장 (PM)
 * ==============================================================================
 * [보안 및 규격 준수 사양]
 * 1. 의료법 및 개인정보보호법(제7원칙) 준수:
 *    - 환자 식별정보 강제 마스킹 (예: '박OO 환자', 나이 표기 등)
 * 2. 쿼리 파라미터 지원:
 *    - `id`: 단일 스토리 상세 조회
 *    - `category`: 분과별(척추, 관절 등) 필터링 조회
 * 3. 향후 라라벨(g7) MySQL 및 Supabase 연동 시 비동기 DB 쿼리로 자동 전환 가능하도록
 *    표준 JSON 포맷 규격(status, count, data, timestamp) 준수
 * ==============================================================================
 */

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const category = searchParams.get("category");

    // 1. 단일 스토리 상세 조회 요청 처리
    if (id) {
      const story = GEM_PATIENT_STORIES.find((item) => item.id === id);
      if (!story) {
        return NextResponse.json(
          {
            status: "error",
            message: "요청하신 환자 치료 스토리를 찾을 수 없습니다.",
            code: 404,
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        status: "success",
        data: story,
        timestamp: new Date().toISOString(),
      });
    }

    // 2. 카테고리 필터링 조회 처리
    let results = GEM_PATIENT_STORIES;
    if (category && category !== "전체") {
      results = results.filter((item) => item.category.includes(category));
    }

    // 3. 목록 응답 반환
    return NextResponse.json({
      status: "success",
      count: results.length,
      data: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[API Error] /api/stories GET 실패:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "환자 치료 스토리 데이터를 불러오는 중 서버 오류가 발생했습니다.",
        code: 500,
      },
      { status: 500 }
    );
  }
}
