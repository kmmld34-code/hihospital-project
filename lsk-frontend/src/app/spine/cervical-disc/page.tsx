import React from "react";
import { Metadata } from "next";
import Gem_CervicalDiscPage from "@/components/Gem_CervicalDiscPage";

/**
 * ==============================================================================
 * [Next.js App Router] 척추클리닉 > 목디스크 상세 페이지 (/spine/cervical-disc)
 * ==============================================================================
 * 주의사항:
 *  - 최상위 layout.tsx에 글로벌 헤더/푸터가 적용되어 있으므로, 본문 컴포넌트만 렌더링합니다.
 * ==============================================================================
 */

export const metadata: Metadata = {
  title: "목디스크(경추 추간판 탈출증) 비수술 맞춤 치료 | 인천하이병원 척추센터",
  description:
    "지긋지긋한 목·어깨 통증과 손 저림, 비수술 우선 원칙으로 치료합니다. 3.0T MRI 당일 검사, 고주파 수핵감압술, 신경성형술, 1:1 도수재활 치료 안내.",
  keywords: [
    "인천 목디스크",
    "경추 추간판 탈출증",
    "인천 정형외과",
    "목디스크 비수술",
    "신경성형술",
    "인천하이병원 척추센터",
  ],
};

export default function CervicalDiscRoutePage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Gem_CervicalDiscPage />
    </div>
  );
}
