import React from "react";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import Gem_SubpageViewer from "@/components/Gem_SubpageViewer";
import Gem_HeadacheDizzinessPage from "@/components/Gem_HeadacheDizzinessPage";
import Gem_DementiaPage from "@/components/Gem_DementiaPage";
import Gem_StrokePage from "@/components/Gem_StrokePage";
import Gem_NeuropathyPage from "@/components/Gem_NeuropathyPage";
import Gem_BlockRenderer from "@/components/Gem_BlockRenderer";
import { CATEGORY_HUB_DATA } from "@/data/categoryHubData";

/**
 * ==============================================================================
 * [Next.js App Router] 서브페이지 통합 동적 라우트 (src/app/[category]/[slug]/page.tsx)
 * ==============================================================================
 * 1. 뇌신경센터 4대 클리닉 특화 전용 페이지 100% 안전 보존 (원본 유지)
 * 2. RDBMS(블록 빌더)에 저장된 블록 데이터가 있을 경우: Gem_BlockRenderer로 동적 렌더링!
 * 3. 블록 데이터가 없을 경우: 기존 내용관리 Gem_SubpageViewer 렌더링 (안전한 폴백)
 * ==============================================================================
 */

interface SubpageRouteProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: SubpageRouteProps): Promise<Metadata> {
  const { category, slug } = params;
  const hubInfo = CATEGORY_HUB_DATA[category];
  const item = hubInfo?.items.find((i) => i.id === slug);

  // 1. 두통·어지럼증 클리닉 SEO 메타데이터
  if (category === "neurosurgery" && slug === "headache-dizziness") {
    return {
      title: "두통·어지럼증 클리닉 | 인천하이병원 뇌신경센터",
      description: "단순 두통 외 위험한 뇌질환 신호 감별. 첨단 3.0T MRI 정밀 진단과 신경과 전문의 맞춤 치료.",
    };
  }

  // 2. 치매 클리닉 SEO 메타데이터
  if (category === "neurosurgery" && slug === "dementia") {
    return {
      title: "치매 클리닉 | 인천하이병원 뇌신경센터",
      description: "기억력 저하, 성격 변화 등 초기 진단부터 보건복지부 예방수칙, 국가 지원 제도까지. 인천하이병원 뇌신경센터 치매 통합 케어 솔루션.",
    };
  }

  // 3. 뇌졸중(중풍) 클리닉 SEO 메타데이터
  if (category === "neurosurgery" && slug === "stroke") {
    return {
      title: "뇌졸중(중풍) 클리닉 | 인천하이병원 뇌신경센터",
      description: "갑작스러운 편측 마비, 언어 장애 등 뇌졸중 경고 신호와 골든타임 관리. 첨단 3.0T MRI 정밀 검진과 신경과 전문의 1:1 맞춤 진료.",
    };
  }

  // 4. 말초신경병 클리닉 SEO 메타데이터
  if (category === "neurosurgery" && slug === "peripheral-neuropathy") {
    return {
      title: "말초신경병 클리닉 | 인천하이병원 뇌신경센터",
      description: "손발저림, 화끈거림, 당뇨병성 신경병증 및 손목터널증후군. 신경전도(NCS) 및 근전도(EMG) 정밀 검사 기반 맞춤 치료, 인천하이병원 뇌신경센터.",
    };
  }

  const title = item ? `${item.name} | 인천하이병원 ${hubInfo?.title || "진료과"}` : "진료안내 | 인천하이병원";
  const description = item
    ? `${item.tagline} - 인천하이병원 ${item.name} 전문 진료 안내.`
    : "인천하이병원 전문의 협진 맞춤 진료 안내입니다.";

  return {
    title,
    description,
  };
}

// RDBMS / 로컬 스토리지에 저장된 서브페이지 블록 데이터 조회 함수
function getSubpageBuilderData(category: string, slug: string) {
  try {
    const storageDir = path.join(process.cwd(), "data", "subpages");
    const safeKey = `${category}___${slug}.json`;
    const filePath = path.join(storageDir, safeKey);

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const record = JSON.parse(fileContent);
      if (record && record.blocks && record.blocks.length > 0) {
        return record;
      }
    }
  } catch (err) {
    console.error("getSubpageBuilderData error:", err);
  }
  return null;
}

export default function DynamicSubpage({ params }: SubpageRouteProps) {
  const { category, slug } = params;

  // 1. 뇌신경 4대 특화 페이지 (대표님 만족 디자인 100% 안전 보존)
  if (category === "neurosurgery" && slug === "headache-dizziness") {
    return <Gem_HeadacheDizzinessPage />;
  }
  if (category === "neurosurgery" && slug === "dementia") {
    return <Gem_DementiaPage />;
  }
  if (category === "neurosurgery" && slug === "stroke") {
    return <Gem_StrokePage />;
  }
  if (category === "neurosurgery" && slug === "peripheral-neuropathy") {
    return <Gem_NeuropathyPage />;
  }

  // 2. RDBMS(블록 빌더)에 저장된 블록 데이터 확인
  const builderData = getSubpageBuilderData(category, slug);
  if (builderData) {
    return (
      <Gem_BlockRenderer
        category={category}
        slug={slug}
        categoryTitle={builderData.category_name}
        subpageTitle={builderData.subpage_name}
        blocks={builderData.blocks}
      />
    );
  }

  // 3. 빌더 데이터가 없는 경우: 기존 내용관리 뷰어로 안전한 폴백
  return (
    <div className="w-full min-h-screen bg-white">
      <Gem_SubpageViewer category={category} slug={slug} />
    </div>
  );
}
