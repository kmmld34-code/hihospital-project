import React from "react";
import { Metadata } from "next";
import Gem_SpineCenterOneScrollPage from "@/components/Gem_SpineCenterOneScrollPage";

/**
 * ==============================================================================
 * [Next.js App Router] 척추클리닉 종합 원스크롤 허브 페이지 (3-Test2)
 * (/spine/test2)
 * ==============================================================================
 * 주의사항:
 *  - root layout에 전역 헤더와 푸터가 정의되어 있으므로 본문 컴포넌트만 탑재합니다.
 * ==============================================================================
 */

export const metadata: Metadata = {
  title: "척추클리닉 종합 안내 (3-Test2) | 인천하이병원 척추센터",
  description:
    "국내 입원 원인 1위 척추질환, 비수술 우선 원칙과 대학병원급 10단계 정밀 진단 시스템으로 90% 이상 수술 없이 회복을 약속드립니다.",
  keywords: [
    "인천하이병원 척추센터",
    "인천 척추병원",
    "목디스크",
    "허리디스크",
    "척추관협착증",
    "비수술 척추치료",
  ],
};

export default function SpineTest2RoutePage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Gem_SpineCenterOneScrollPage />
    </div>
  );
}
