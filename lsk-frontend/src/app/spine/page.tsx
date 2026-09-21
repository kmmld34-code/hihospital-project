import React from "react";
import { Metadata } from "next";
import Gem_SpineCenterOneScrollPage from "@/components/Gem_SpineCenterOneScrollPage";

/**
 * ==============================================================================
 * [Next.js App Router] 척추클리닉 대표 메인 페이지 (/spine)
 * ==============================================================================
 * 척추클리닉 1Depth 진입 시 기본 대표 페이지로 척추센터 종합 원스크롤 허브(3-Test2)를 렌더링합니다.
 * ==============================================================================
 */

export const metadata: Metadata = {
  title: "척추클리닉 종합 센터 | 인천하이병원",
  description:
    "국내 입원 1위 척추질환, 비수술 우선 원칙과 10단계 정밀 진단 시스템으로 치료에서 재활까지 토탈 케어합니다.",
};

export default function SpineMainRoutePage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Gem_SpineCenterOneScrollPage />
    </div>
  );
}
