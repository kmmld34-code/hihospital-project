'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BoardList({ boardId }: { boardId: string }) {
  const router = useRouter();
  const [list, setList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [config, setConfig] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // 현재 사용자의 레벨 (실제 서비스에서는 로그인 세션에서 가져와야 함)
  const currentUserLevel = 1; // 비회원(Guest) 기본 레벨 1

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

  // 읽기 권한 체크 (g7_board 설정)
  if (config.bo_list_level > currentUserLevel) {
    return (
      <div className="p-12 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">권한이 없습니다</h3>
        <p className="text-gray-600">이 게시판의 목록을 볼 수 있는 권한이 부족합니다. (필요 레벨: {config.bo_list_level})</p>
      </div>
    );
  }

  // 쓰기 권한 체크
  const canWrite = currentUserLevel >= (config.bo_write_level || 1);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-end mb-4 border-b-2 border-gray-900 pb-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{config.bo_subject || boardId.toUpperCase()}</h2>
        </div>
        <span className="text-sm text-gray-500">총 <strong>{total}</strong>건의 게시물이 있습니다.</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th className="py-4 px-2 text-sm font-semibold text-gray-700 w-16">번호</th>
              <th className="py-4 px-2 text-sm font-semibold text-gray-700">제목</th>
              <th className="py-4 px-2 text-sm font-semibold text-gray-700 w-28">작성자</th>
              <th className="py-4 px-2 text-sm font-semibold text-gray-700 w-32">작성일</th>
              <th className="py-4 px-2 text-sm font-semibold text-gray-700 w-20">조회</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr><td colSpan={5} className="py-16 text-gray-500 border-b border-gray-200">등록된 게시글이 없습니다.</td></tr>
            ) : (
              list.map((item, idx) => (
                <tr key={item.wr_id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-2 text-sm text-gray-500">{total - idx}</td>
                  <td className="py-4 px-2 text-left pl-4">
                    <Link href={`/community/${boardId}/${item.wr_id}`} className="text-gray-900 font-medium hover:text-blue-600 hover:underline transition-all">
                      {item.wr_subject}
                    </Link>
                  </td>
                  <td className="py-4 px-2 text-sm text-gray-600">{item.wr_name}</td>
                  <td className="py-4 px-2 text-sm text-gray-500">{new Date(item.wr_datetime).toLocaleDateString()}</td>
                  <td className="py-4 px-2 text-sm text-gray-500">{item.wr_hit}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        {canWrite ? (
          <Link href={`/community/${boardId}/write`} className="px-6 py-2.5 bg-[#005ba5] text-white text-sm font-medium rounded hover:bg-blue-800 transition-colors shadow-sm">
            글쓰기
          </Link>
        ) : (
          <button 
            onClick={() => alert(`글쓰기 권한이 없습니다. (필요 레벨: ${config.bo_write_level})\n로그인 후 이용해 주세요.`)}
            className="px-6 py-2.5 bg-gray-200 text-gray-500 text-sm font-medium rounded cursor-not-allowed border border-gray-300"
          >
            글쓰기 권한 없음
          </button>
        )}
      </div>
    </div>
  );
}
