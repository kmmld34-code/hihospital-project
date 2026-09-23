import React from "react";
import { Metadata } from "next";
import Gem_CategoryHubPage from "@/components/Gem_CategoryHubPage";

/**
 * ==============================================================================
 * [Next.js App Router] 병원소개 대표 메인 페이지 (/about)
 * ==============================================================================
 * 병원소개 1Depth 진입 시, 병원안내 서브메뉴 전체(인사말, 의료진, 진료시간, 입원, 오시는길)를
 * 함축 요약하는 가로 탭바 + 지그재그 스크롤 허브 페이지(Gem_CategoryHubPage)를 렌더링합니다.
 * ==============================================================================
 */

export const metadata: Metadata = {
  title: "병원소개 종합 안내 | 인천하이병원",
  description:
    "몸의 불편 뿐 아니라 마음의 걱정까지 살피는 인천하이병원입니다. 척추·관절·내과·검진 11인 전문의 협진 토탈케어로 환자 중심의 의료서비스를 약속드립니다.",
};

export default function AboutMainPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Gem_CategoryHubPage categoryId="about" />
    </div>
  );
}
