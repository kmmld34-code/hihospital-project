import React from 'react';
import BoardList from '@/components/board/BoardList';

export default function CommunityBoardPage({ params }: { params: { boardId: string } }) {
  return (
    <div className="w-full bg-white min-h-screen pb-20 pt-10">
      <BoardList boardId={params.boardId} />
    </div>
  );
}
