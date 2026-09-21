import React from "react";
import { Metadata } from "next";
import Gem_AboutGreetingPage from "@/components/Gem_AboutGreetingPage";

/**
 * ==============================================================================
 * [Next.js App Router] 병원소개 메인 페이지 (/about)
 * ==============================================================================
 * 주의사항:
 *  - root layout (layout.tsx)에 이미 글로벌 Gem_Header와 Gem_Footer가 적용되어 있으므로,
 *    서브페이지 컴포넌트에서는 중복 렌더링 방지를 위해 헤더/푸터를 제외하고 본문만 탑재합니다.
 * ==============================================================================
 */

export const metadata: Metadata = {
  title: "병원소개 | 인천하이병원",
  description:
    "몸의 불편 뿐 아니라 마음의 걱정까지 살피는 인천하이병원입니다. 척추·관절·내과·검진 11인 전문의 협진 토탈케어로 환자 중심의 의료서비스를 약속드립니다.",
};

export default function AboutMainPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* 인사말 & 병원소개 통합 서브페이지 본문 */}
      <Gem_AboutGreetingPage />
    </div>
  );
}
