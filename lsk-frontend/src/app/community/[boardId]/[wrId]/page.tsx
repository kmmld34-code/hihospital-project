export const dynamic = "force-dynamic";
import React from 'react';
import BoardDetail from '@/components/board/BoardDetail';
import { CATEGORY_HUB_DATA } from '@/data/categoryHubData';

export default function CommunityBoardDetailPage({ params }: { params: { boardId: string, wrId: string } }) {
  const hubInfo = CATEGORY_HUB_DATA["community"];

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="pt-24 pb-12 bg-gray-50 border-b border-gray-200 text-center">
        <h1 className="text-4xl font-bold text-gray-900 uppercase">
          {hubInfo?.title || "커뮤니티"}
        </h1>
      </div>
      <BoardDetail boardId={params.boardId} postId={params.wrId} />
    </div>
  );
}
