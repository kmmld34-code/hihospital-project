import React from 'react';
import BoardView from '@/components/board/BoardView';

export default function CommunityBoardViewPage({ params }: { params: { boardId: string, wrId: string } }) {
  return (
    <div className="w-full bg-white min-h-screen">
      <div className="pt-20 pb-10 bg-gray-50 border-b border-gray-200 text-center">
        <h1 className="text-3xl font-bold text-gray-900 uppercase">게시글 보기</h1>
      </div>
      <BoardView boardId={params.boardId} wrId={params.wrId} />
    </div>
  );
}
