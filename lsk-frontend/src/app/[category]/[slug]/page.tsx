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
import BoardList from "@/components/board/BoardList";
import { CATEGORY_HUB_DATA } from "@/data/categoryHubData";
import { query, isDbConfigured } from "@/lib/gem_db";

interface SubpageRouteProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: SubpageRouteProps): Promise<Metadata> {
  const { category, slug } = params;
  const hubInfo = CATEGORY_HUB_DATA[category];
  const item = hubInfo?.items?.find((i: any) => i.id === slug);
  const title = item ? `${item.name} | 인천하이병원 ${hubInfo?.title || "진료과"}` : "진료안내 | 인천하이병원";
  return { title, description: "인천하이병원 전문의 협진 맞춤 진료 안내입니다." };
}

async function getSubpageBuilderData(category: string, slug: string) {
  const pageKey = `${category}-${slug}`;
  if (isDbConfigured()) {
    try {
      const rows: any[] = await query("SELECT slug, title, content FROM g7_pages WHERE slug = ? LIMIT 1", [pageKey]);
      if (rows && rows.length > 0) {
        const row = rows[0];
        let parsedTitle = row.title;
        try {
          const titleObj = JSON.parse(row.title);
          parsedTitle = titleObj.ko || titleObj.en || row.title;
        } catch (e) {}
        const blocks = typeof row.content === "string" ? JSON.parse(row.content) : row.content;
        if (blocks && Array.isArray(blocks) && blocks.length > 0) {
          return { category_name: CATEGORY_HUB_DATA[category]?.title || category, subpage_name: parsedTitle, blocks: blocks };
        }
      }
    } catch (dbErr) {
      console.warn("[MySQL Fetch Fallback]", dbErr);
    }
  }

  try {
    const storageDir = path.join(process.cwd(), "data", "subpages");
    let filePath = path.join(storageDir, `${category}-${slug}.json`);
    if (!fs.existsSync(filePath)) filePath = path.join(storageDir, `${category}___${slug}.json`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const record = JSON.parse(fileContent);
      if (record && record.blocks && record.blocks.length > 0) return record;
    }
  } catch (err) {}
  return null;
}

export default async function DynamicSubpage({ params }: SubpageRouteProps) {
  const { category, slug } = params;

  // [핵심 변경] 커뮤니티 카테고리는 무조건 게시판 리스트 렌더링으로 인터셉트!
  // Catch-all 라우팅 충돌 방지를 위해 여기서 직접 분기 처리
  if (category === "community") {
    // 예외: 비급여 진료비용 안내 등 일반 페이지로 처리할 슬러그가 있다면 여기서 제외 가능.
    // 하지만 현재는 모든 커뮤니티 하위 메뉴를 게시판으로 취급
    const hubInfo = CATEGORY_HUB_DATA["community"];
    return (
      <div className="w-full bg-white min-h-screen">
                <div className="pt-16 pb-8 bg-gray-50 border-b border-gray-200 text-center">
          <h1 className="text-3xl font-bold text-gray-900 uppercase">
            {hubInfo?.title || "커뮤니티"}
          </h1>
          <p className="text-gray-500 mt-2">
            {hubInfo?.description || "인천하이병원의 새로운 소식을 전해드립니다."}
          </p>
        </div>
        <BoardList boardId={slug} />
      </div>
    );
  }

  // 기존 특화 페이지
  if (category === "neurosurgery" && slug === "headache-dizziness") { return <Gem_HeadacheDizzinessPage />; }
  if (category === "neurosurgery" && slug === "dementia") { return <Gem_DementiaPage />; }
  if (category === "neurosurgery" && slug === "stroke") { return <Gem_StrokePage />; }
  if (category === "neurosurgery" && slug === "peripheral-neuropathy") { return <Gem_NeuropathyPage />; }

  // 블록 빌더 데이터
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

  // 폴백 UI
  return (
    <div className="w-full min-h-screen bg-white">
      <Gem_SubpageViewer category={category} slug={slug} />
    </div>
  );
}
