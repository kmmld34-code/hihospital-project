import React from 'react';
import BoardWrite from '@/components/board/BoardWrite';
import Gem_SubNav from '@/components/Gem_SubNav';

export default function CommunityBoardWritePage({ params }: { params: { boardId: string } }) {
  return (
    <div className="w-full bg-white min-h-screen">
      <Gem_SubNav category="community" currentSlug={params.boardId} />

      <div className="pt-16 pb-8 bg-gray-50 border-b border-gray-200 text-center">
        <h1 className="text-3xl font-bold text-gray-900 uppercase">게시글 작성</h1>
      </div>
      <BoardWrite boardId={params.boardId} />
    </div>
  );
}
