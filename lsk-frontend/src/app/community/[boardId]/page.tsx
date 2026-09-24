export const dynamic = "force-dynamic";
import React from 'react';
import BoardList from '@/components/board/BoardList';
import { CATEGORY_HUB_DATA } from '@/data/categoryHubData';

export default function CommunityBoardPage({ params }: { params: { boardId: string } }) {
  const hubInfo = CATEGORY_HUB_DATA["community"];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* 헤더 영역 */}
      <div className="pt-24 pb-12 bg-gray-50 border-b border-gray-200 text-center">
        <h1 className="text-4xl font-bold text-gray-900 uppercase">
          {hubInfo?.title || "커뮤니티"}
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          {hubInfo?.description || "인천하이병원의 새로운 소식을 전해드립니다."}
        </p>
      </div>

      {/* 게시판 리스트 영역 */}
      <BoardList boardId={params.boardId} />
    </div>
  );
}
