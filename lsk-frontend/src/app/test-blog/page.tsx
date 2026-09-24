export const dynamic = 'force-dynamic';

import React from 'react';
import { query, isDbConfigured } from "@/lib/gem_db";

export default async function TestBlogPage() {
  let dbStatus = "Checking...";
  let boardData: any = null;
  let errorMsg: string | null = null;

  try {
    if (!isDbConfigured()) {
      dbStatus = "Error: DB 환경변수 누락 (.env.local 확인 필요)";
    } else {
      dbStatus = "Connected to Cafe24 MariaDB";
      // 백엔드의 g7_write_blog 테이블에서 가장 최근 게시글(wr_num 정렬) 1개를 가져옴
      const rows = await query("SELECT wr_id, wr_subject, wr_content, wr_name, wr_datetime FROM g7_write_blog ORDER BY wr_num LIMIT 1");
      
      if (Array.isArray(rows) && rows.length > 0) {
        boardData = rows[0];
      } else {
        boardData = "테이블은 존재하나 게시글이 없습니다.";
      }
    }
  } catch (err: any) {
    dbStatus = "Database Connection Failed";
    errorMsg = err.message || JSON.stringify(err);
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        🚨 백엔드 DB 직접 연결 테스트 페이지
      </h1>
      
      <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>1. DB 접속 상태</h3>
        <p style={{ fontWeight: 'bold', color: errorMsg ? 'red' : 'green' }}>{dbStatus}</p>
        {errorMsg && <p style={{ color: 'red' }}>상세 에러: {errorMsg}</p>}
      </div>

      <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>2. 블로그(blog) 게시판 글 가져오기</h3>
        
        {boardData && typeof boardData === 'object' ? (
          <div>
            <p><strong>제목:</strong> {boardData.wr_subject}</p>
            <p><strong>작성자:</strong> {boardData.wr_name}</p>
            <p><strong>작성일:</strong> {new Date(boardData.wr_datetime).toLocaleString()}</p>
            <hr style={{ margin: '15px 0' }} />
            <div dangerouslySetInnerHTML={{ __html: boardData.wr_content }} />
          </div>
        ) : (
          <p>{boardData || "로딩 실패"}</p>
        )}
      </div>

      <p style={{ marginTop: '40px', fontSize: '0.9em', color: '#666' }}>
        * 이 페이지는 라우팅 충돌이나 기존 디자인 레이아웃(Gem_SubpageViewer)을 완전히 배제하고, 순수하게 백엔드 DB와 프론트엔드가 연결되어 있는지만을 증명하는 독립 테스트 페이지입니다.
      </p>
    </div>
  );
}
