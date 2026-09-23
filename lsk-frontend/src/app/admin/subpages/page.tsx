import React from "react";
import { Metadata } from "next";
import Gem_SubAdminPage from "@/components/Gem_SubAdminPage";

/**
 * ==============================================================================
 * [Next.js App Router] 서브관리자 콘솔 라우트 (src/app/admin/subpages/page.tsx)
 * ==============================================================================
 * 접근 경로:
 *  - 메인/서브페이지 카피라이트 끝 '관리자' 텍스트 클릭 시 비공개 진입
 *  - URL 직접 접근: /admin/subpages
 * 기능:
 *  - 1400px 와이드 상세페이지 컴포넌트 텍스트 및 1400px 와이드 배경 이미지 편집
 *  - 실시간 라이브 프리뷰(PC/태블릿/모바일) 지원
 * ==============================================================================
 */

export const metadata: Metadata = {
  title: "서브관리자 콘솔 | 인천하이병원",
  description: "인천하이병원 상세페이지 컴포넌트 및 비주얼 편집 시스템",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SubAdminConsoleRoute() {
  return <Gem_SubAdminPage />;
}
