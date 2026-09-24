import React from 'react';
import BoardWrite from '@/components/board/BoardWrite';

export default function CommunityBoardWritePage({ params }: { params: { boardId: string } }) {
  return (
    <div className="w-full bg-white min-h-screen">
      <div className="pt-24 pb-12 bg-gray-50 border-b border-gray-200 text-center">
        <h1 className="text-4xl font-bold text-gray-900 uppercase">게시글 작성</h1>
      </div>
      <BoardWrite boardId={params.boardId} />
    </div>
  );
}
