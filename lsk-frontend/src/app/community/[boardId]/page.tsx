import React from 'react';
import BoardList from '@/components/board/BoardList';
import Gem_SubNav from '@/components/Gem_SubNav';
import { CATEGORY_HUB_DATA } from '@/data/categoryHubData';

export default function CommunityBoardPage({ params }: { params: { boardId: string } }) {
  const hubInfo = CATEGORY_HUB_DATA["community"];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* 서브 네비게이션 탭 (상단) */}
      <Gem_SubNav category="community" currentSlug={params.boardId} />

      {/* 헤더 영역 */}
      <div className="pt-16 pb-8 bg-gray-50 border-b border-gray-200 text-center">
        <h1 className="text-3xl font-bold text-gray-900 uppercase">
          {hubInfo?.title || "커뮤니티"}
        </h1>
        <p className="text-gray-500 mt-2">
          {hubInfo?.description || "인천하이병원의 새로운 소식을 전해드립니다."}
        </p>
      </div>

      {/* 게시판 리스트 영역 */}
      <BoardList boardId={params.boardId} />
    </div>
  );
}
