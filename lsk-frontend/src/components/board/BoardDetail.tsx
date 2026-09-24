'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const parseSubject = (str: any) => { if (!str) return ''; try { const obj = JSON.parse(str); return obj.ko || str; } catch { return str; } };

export default function BoardDetail({ boardId, postId }: { boardId: string, postId: string }) {
  const [post, setPost] = useState<any>(null);
  const [config, setConfig] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch(`/api/board/${boardId}?action=view&postId=${postId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.post) {
          setPost(data.data.post);
          setConfig(data.data.config || {});
        } else {
          setErrorMsg(data.error || "게시글을 찾을 수 없습니다.");
        }
      })
      .catch(err => {
        setErrorMsg("서버 통신 에러가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, [boardId, postId]);

  if (loading) return <div className="p-12 text-center text-gray-500">데이터를 불러오는 중입니다...</div>;
  if (errorMsg) return <div className="p-12 text-center text-red-500 font-medium">{errorMsg}</div>;
  if (!post) return <div className="p-12 text-center">게시글이 없습니다.</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-6 border-b-2 border-gray-900 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.wr_subject}</h2>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>작성자: {post.wr_name}</span>
          <span>작성일: {post.wr_datetime.split(' ')[0]}</span>
          <span>조회: {post.wr_hit}</span>
        </div>
      </div>
      <div className="py-8 min-h-[300px] text-gray-800 leading-relaxed whitespace-pre-wrap">
        {post.wr_content}
      </div>
      <div className="mt-10 border-t border-gray-200 pt-6 text-right">
        <Link href={`/community/${boardId}`} className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded hover:bg-gray-200 transition-colors">
          목록으로
        </Link>
      </div>
    </div>
  );
}
