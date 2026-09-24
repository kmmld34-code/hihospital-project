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
import { query, isDbConfigured } from "@/lib/gem_db";

/**
 * ==============================================================================
 * [Next.js App Router] 서브페이지 통합 동적 라우트 (src/app/[category]/[slug]/page.tsx)
 * ==============================================================================
 * 1. 뇌신경센터 4대 클리닉 특화 전용 페이지 100% 안전 보존 (원본 유지)
 * 2. RDBMS(카페24 MySQL)에 저장된 블록 데이터 우선 조회:
 *    - 원격 Vercel 및 로컬 환경이 동일한 DB를 바라보며 실시간 동기화
 * 3. 2중 폴백 (Dual Fallback):
 *    - DB에 없거나 미설정 시 로컬 JSON 파일(data/subpages) 조회
 *    - 둘 다 없을 시 기존 내용관리 Gem_SubpageViewer로 안전하게 렌더링
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

/**
 * [서브페이지 블록 데이터 조회 함수]
 * 1차: 카페24 MySQL DB 조회 (원격/로컬 실시간 동기화)
 * 2차: 로컬 JSON 파일 시스템 폴백 (기존 데이터 보존)
 */
async function getSubpageBuilderData(category: string, slug: string) {
  const pageKey = `${category}/${slug}`;

  // 1. 카페24 MySQL DB 조회
  if (isDbConfigured()) {
    try {
      const rows: any[] = await query(
        "SELECT category_name, subpage_name, blocks FROM gem_subpage_contents WHERE page_key = ? LIMIT 1",
        [pageKey]
      );

      if (rows && rows.length > 0) {
        const row = rows[0];
        const blocks = typeof row.blocks === "string" ? JSON.parse(row.blocks) : row.blocks;
        if (blocks && Array.isArray(blocks) && blocks.length > 0) {
          return {
            category_name: row.category_name,
            subpage_name: row.subpage_name,
            blocks: blocks,
          };
        }
      }
    } catch (dbErr) {
      console.warn("[MySQL Page Fetch Fallback] DB 조회 실패, 파일 스토리지로 폴백:", dbErr);
    }
  }

  // 2. 파일 시스템 기반 영구 스토리지 폴백 (data/subpages/*.json)
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
    console.error("getSubpageBuilderData file fallback error:", err);
  }

  return null;
}

export default async function DynamicSubpage({ params }: SubpageRouteProps) {
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

  // 2. RDBMS(블록 빌더)에 저장된 블록 데이터 확인 (비동기 DB/파일 조회)
  const builderData = await getSubpageBuilderData(category, slug);
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
