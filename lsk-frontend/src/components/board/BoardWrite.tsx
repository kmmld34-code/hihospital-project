'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BoardWrite({ boardId }: { boardId: string }) {
  const router = useRouter();
  const [form, setForm] = useState({ wr_subject: '', wr_name: '', wr_password: '', wr_content: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.wr_subject || !form.wr_content || !form.wr_name) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`/api/board/${boardId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      
      if (data.success) {
        alert(data.message);
        router.push(`/community/${boardId}`);
      } else {
        alert(data.error || "등록에 실패했습니다.");
      }
    } catch (err) {
      alert("서버 통신 중 에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-gray-800 uppercase mb-6">{boardId} - 글쓰기</h2>
      
      <form onSubmit={handleSubmit} className="border-t-2 border-gray-900 pt-6">
        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">작성자</label>
            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" 
                   value={form.wr_name} onChange={e => setForm({...form, wr_name: e.target.value})} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input type="password" className="w-full border border-gray-300 rounded px-3 py-2" 
                   value={form.wr_password} onChange={e => setForm({...form, wr_password: e.target.value})} />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
          <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" 
                 value={form.wr_subject} onChange={e => setForm({...form, wr_subject: e.target.value})} />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
          <textarea className="w-full border border-gray-300 rounded px-3 py-2 h-64 resize-none" 
                    value={form.wr_content} onChange={e => setForm({...form, wr_content: e.target.value})}></textarea>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Link href={`/community/${boardId}`} className="px-8 py-3 bg-white text-gray-700 font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors">
            취소
          </Link>
          <button type="submit" disabled={loading} className="px-8 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors disabled:opacity-50">
            {loading ? '등록 중...' : '작성 완료'}
          </button>
        </div>
      </form>
    </div>
  );
}
