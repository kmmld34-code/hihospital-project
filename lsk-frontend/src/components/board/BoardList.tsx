'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const parseSubject = (str: any) => { if (!str) return ''; try { const obj = JSON.parse(str); return obj.ko || str; } catch { return str; } };


const getFirstImage = (content: string) => {
  if (!content) return null;
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  if (match && match[1]) {
    let src = match[1];
    if (src.startsWith('/')) {
      src = `https://hihospital03.mycafe24.com${src}`;
    }
    return src;
  }
  return null;
};

export default function BoardList({ boardId }: { boardId: string }) {
  const [list, setList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [config, setConfig] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const currentUserLevel = 1;

  useEffect(() => {
    fetch(`/api/board/${boardId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setList(data.data.list || []);
          setTotal(data.data.total || 0);
          setConfig(data.data.config || {});
        } else {
          setErrorMsg(data.error || "게시판을 불러오는 데 실패했습니다.");
        }
      })
      .catch(err => {
        console.error("Board Fetch Error:", err);
        setErrorMsg("서버 통신 에러가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, [boardId]);

  if (loading) return <div className="p-12 text-center text-gray-500 font-medium">데이터를 불러오는 중입니다...</div>;
  if (errorMsg) return <div className="p-12 text-center text-red-500 font-medium">{errorMsg}</div>;

  if (config.bo_list_level > currentUserLevel) {
    return (
      <div className="p-12 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">권한이 없습니다</h3>
        <p className="text-gray-600">이 게시판의 목록을 볼 수 있는 권한이 부족합니다. (필요 레벨: {config.bo_list_level})</p>
      </div>
    );
  }

  const canWrite = boardId === 'blog' ? false : (currentUserLevel >= (config.bo_write_level || 1));
  const isGallery = boardId === "blog" || config.bo_gallery_cols > 0;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* 게시판 상단 헤더 및 버튼 */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 border-b-2 border-gray-900 pb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">{parseSubject(config.bo_subject) || boardId.toUpperCase()}</h2>
          <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
            총 {total}건
          </span>
        </div>
        
        <div className="flex gap-2">
          {canWrite && (
            <Link href={`/community/${boardId}/write`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1e293b] text-white text-sm font-medium rounded-lg hover:bg-black transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              글쓰기
            </Link>
          )}
        </div>
      </div>

      {/* 게시판 목록 렌더링 분기 */}
      {isGallery ? (
        /* ================= 갤러리/블로그 뷰 ================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.length === 0 ? (
             <div className="col-span-full py-20 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-100">등록된 게시글이 없습니다.</div>
          ) : (
            list.map((item) => (
              <Link href={`/community/${boardId}/${item.wr_id}`} key={item.wr_id} className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* 썸네일 영역 */}
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  {getFirstImage(item.wr_content) ? (
                    <img src={getFirstImage(item.wr_content)!} alt={parseSubject(config.bo_subject)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {parseSubject(config.bo_subject) || '블로그'}
                  </div>
                </div>
                {/* 텍스트 영역 */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.wr_subject}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-4">
                    <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                      <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px]">관</span>
                      {item.wr_name}
                    </span>
                    <span>{new Date(item.wr_datetime).toLocaleDateString()}</span>
                    <span className="ml-auto flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      {item.wr_hit}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      ) : (
        /* ================= 일반 리스트(온라인상담/게시판) 뷰 ================= */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-center">
            <thead className="bg-[#f8fafc] border-b border-gray-200">
              <tr>
                <th className="py-4 px-4 text-sm font-semibold text-gray-600 w-20">번호</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-600">제목</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-600 w-32">작성자</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-600 w-32">작성일</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-600 w-24">조회</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <span className="text-gray-500 font-medium">등록된 게시글이 없습니다</span>
                    </div>
                  </td>
                </tr>
              ) : (
                list.map((item, idx) => {
                  const isNotice = item.wr_option?.includes('notice');
                  return (
                    <tr key={item.wr_id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="py-4 px-4">
                        {isNotice ? (
                          <span className="inline-block bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">공지</span>
                        ) : (
                          <span className="text-gray-400 text-sm">{total - idx}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-left">
                        <Link href={`/community/${boardId}/${item.wr_id}`} className="flex items-center gap-3">
                          {isNotice && <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{config.bo_subject}</span>}
                          <span className="text-gray-900 font-medium group-hover:text-blue-700 transition-colors">
                            {item.wr_subject}
                          </span>
                        </Link>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                          <span className="w-5 h-5 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center text-[10px]">관</span>
                          {item.wr_name}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500">
                        {new Date(item.wr_datetime).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-400">{item.wr_hit}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 하단 버튼 및 페이지네이션 영역 */}
      <div className="mt-8 flex justify-between items-center">
        <div className="flex gap-1">
          {/* 간이 페이지네이션 자리 */}
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-500 bg-white hover:bg-gray-50">&laquo;</button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-blue-600 text-white bg-blue-600">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-500 bg-white hover:bg-gray-50">&raquo;</button>
        </div>
        {canWrite && (
          <Link href={`/community/${boardId}/write`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1e293b] text-white text-sm font-medium rounded-lg hover:bg-black transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            글쓰기
          </Link>
        )}
      </div>
    </div>
  );
}
