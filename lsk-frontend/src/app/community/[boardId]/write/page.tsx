'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdmin, getToken } from '@/lib/auth';

export default function BoardWritePage({ params }: { params: { boardId: string } }) {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 마운트 시 권한 체크
    if (!isAdmin()) {
      alert('글쓰기 권한이 없습니다.');
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`/api/board/${params.boardId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'write',
          subject: subject,
          content: content,
          token: token
        })
      });
      
      const data = await res.json();
      if (data.success) {
        alert('글이 성공적으로 등록되었습니다.');
        router.push(`/community/${params.boardId}`);
        router.refresh();
      } else {
        alert(data.error || '글 등록에 실패했습니다.');
      }
    } catch (err) {
      alert('서버 통신 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-gray-900 pb-4">
        새 글 작성
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">제목</label>
          <input 
            type="text" 
            id="subject" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
          <textarea 
            id="content" 
            rows={15} 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="내용을 입력하세요 (HTML 태그 사용 가능)"
            required
          />
        </div>

        <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
          <button 
            type="button" 
            onClick={() => router.back()} 
            className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded hover:bg-gray-200"
          >
            취소
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? '등록 중...' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
