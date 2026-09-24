'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const parseSubject = (str: any) => { if (!str) return ''; try { const obj = JSON.parse(str); return obj.ko || str; } catch { return str; } };


const fixHtmlContent = (html: string) => {
  if (!html) return '';
  return html.replace(/src="\/api\/plugins/g, 'src="https://hihospital03.mycafe24.com/api/plugins')
             .replace(/src='\/api\/plugins/g, "src='https://hihospital03.mycafe24.com/api/plugins");
};

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
    <div className="max-w-[1400px] mx-auto py-10 px-4">
      <div className="mb-6 border-b-2 border-gray-900 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.wr_subject}</h2>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>작성자: {post.wr_name}</span>
          <span>작성일: {post.wr_datetime.split(' ')[0]}</span>
          <span>조회: {post.wr_hit}</span>
        </div>
      </div>
      <div 
        className="py-10 min-h-[400px] text-gray-800 text-[17px] sm:text-[18px] leading-[1.9] tracking-tight whitespace-pre-wrap word-break-keep-all [&_p]:mb-6 [&_img]:max-w-full [&_img]:mx-auto [&_img]:rounded-md [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_h1]:mb-6 [&_h2]:mb-5 [&_h3]:mb-4"
        dangerouslySetInnerHTML={{ __html: fixHtmlContent(post.wr_content) }}
      />
      {/* 하단 버튼 그룹 */}
      <div className="mt-10 border-t border-gray-200 pt-6 flex justify-between items-center">
        <div className="flex gap-2">
          {/* 차후 본인 확인 로직 연동을 위해 임시로 모두 띄워둠 */}
          <button className="px-5 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-50 transition-colors">수정</button>
          <button className="px-5 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-50 transition-colors">삭제</button>
          <button className="px-5 py-2 bg-[#0052CC] text-white font-semibold rounded hover:bg-blue-700 transition-colors">답변쓰기</button>
        </div>
        <Link href={`/community/${boardId}`} className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded hover:bg-gray-200 transition-colors">
          목록으로
        </Link>
      </div>

      {/* 댓글 영역 */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-100">
        <h4 className="text-lg font-bold text-gray-800 mb-4">댓글 <span className="text-[#0052CC]">0</span></h4>
        
        {/* 댓글 입력창 */}
        <div className="bg-white border border-gray-200 rounded-md p-4 mb-6">
          <textarea 
            rows={3} 
            className="w-full text-sm text-gray-700 outline-none resize-none"
            placeholder="인터넷은 우리가 함께 만들어가는 소중한 공간입니다. 댓글 작성 시 타인에 대한 배려와 책임을 담아주세요."
          ></textarea>
          <div className="flex justify-end mt-2">
            <button className="px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded hover:bg-gray-900 transition-colors">
              등록
            </button>
          </div>
        </div>

        {/* 댓글 목록 (비어있을 때) */}
        <div className="text-center text-gray-400 py-6 text-sm">
          등록된 댓글이 없습니다.
        </div>
      </div>
    </div>
  );
}
