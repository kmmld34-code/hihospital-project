import React from "react";
import { Metadata } from "next";
import Gem_CategoryHubPage from "@/components/Gem_CategoryHubPage";
import Gem_NeurosurgeryHubPage from "@/components/Gem_NeurosurgeryHubPage";
import { CATEGORY_HUB_DATA } from "@/data/categoryHubData";

/**
 * ==============================================================================
 * [Next.js App Router] 카테고리 메인 인덱스/허브 동적 라우트 (src/app/[category]/page.tsx)
 * ==============================================================================
 * 기능 및 라우팅 명세:
 *  - 1Depth 대메뉴 진입 시 해당 센터의 서브메뉴 전체를 종합 브리핑하는 허브 페이지 렌더링
 *  - 뇌신경센터(/neurosurgery): 4대 클리닉(두통·어지럼증, 치매, 뇌졸중, 말초신경병)의
 *    핵심 콘텐츠와 일러스트를 집약한 마스터 통합 허브(Gem_NeurosurgeryHubPage) 전용 렌더링
 *  - 그 외 진료과: 표준 카테고리 허브 페이지(Gem_CategoryHubPage) 렌더링
 * ==============================================================================
 */

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = params;

  // 뇌신경센터 전용 SEO 메타데이터
  if (category === "neurosurgery") {
    return {
      title: "뇌신경센터 | 인천하이병원",
      description: "두통·어지럼증, 치매, 뇌졸중, 말초신경병 특화 클리닉. 3.0T MRI 정밀 검진과 신경과 전문의 1:1 맞춤 진료.",
    };
  }

  const hubInfo = CATEGORY_HUB_DATA[category];

  if (!hubInfo) {
    return {
      title: "진료센터 안내 | 인천하이병원",
      description: "인천하이병원 11인 전문의 협진 토탈 케어 진료센터 안내입니다.",
    };
  }

  return {
    title: `${hubInfo.title} | 인천하이병원`,
    description: `${hubInfo.title} - ${hubInfo.slogan}. 분야별 전문의 협진과 첨단 의료장비로 환자 맞춤 진료를 제공합니다.`,
  };
}

export default function CategoryDynamicHubPage({ params }: CategoryPageProps) {
  const { category } = params;

  // 뇌신경센터: 서브페이지 핵심 요약 및 바로가기를 탑재한 통합 마스터 허브 전용 렌더링
  if (category === "neurosurgery") {
    return <Gem_NeurosurgeryHubPage />;
  }

  // 그 외 진료센터: 기본 카테고리 허브 렌더링
  return (
    <div className="w-full min-h-screen bg-white">
      <Gem_CategoryHubPage categoryId={category} />
    </div>
  );
}
