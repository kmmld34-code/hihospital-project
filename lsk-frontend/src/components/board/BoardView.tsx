'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BoardView({ boardId, wrId }: { boardId: string, wrId: string }) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/board/${boardId}/${wrId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPost(data.data);
      })
      .catch(err => console.error("Board View Error:", err))
      .finally(() => setLoading(false));
  }, [boardId, wrId]);

  if (loading) return <div className="p-8 text-center text-gray-500">데이터를 불러오는 중입니다...</div>;
  if (!post) return <div className="p-8 text-center text-red-500">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="border-t-2 border-gray-900 mb-6">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{post.wr_subject}</h2>
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
            <span><strong>작성자:</strong> {post.wr_name}</span>
            <span><strong>작성일:</strong> {new Date(post.wr_datetime).toLocaleString()}</span>
            <span><strong>조회:</strong> {post.wr_hit}</span>
          </div>
        </div>
        <div className="px-6 py-12 text-gray-800 leading-relaxed min-h-[300px]" dangerouslySetInnerHTML={{ __html: post.wr_content?.replace(/\n/g, '<br/>') || '' }} />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {/* 차후 수정/삭제 버튼 추가 자리 */}
        </div>
        <Link href={`/community/${boardId}`} className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-200 transition-colors">
          목록으로
        </Link>
      </div>
    </div>
  );
}
