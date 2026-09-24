'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/auth';

export default function LoginPage() {
  const [mbId, setMbId] = useState('');
  const [mbPassword, setMbPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 프록시 API (next.js 라우트)를 통해 카페24 백엔드와 통신 예정
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', mb_id: mbId, mb_password: mbPassword })
      });
      
      const data = await res.json();
      
      if (data.success) {
        // 토큰(또는 세션 식별자) 저장 및 등급(level) 저장
        setToken(data.data.token, data.data.member);
        alert(`${data.data.member.mb_name}님 환영합니다!`);
        router.push('/');
        router.refresh();
      } else {
        setErrorMsg(data.error || '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      }
    } catch (err) {
      setErrorMsg('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">로그인</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          인천하이병원 홈페이지에 오신 것을 환영합니다.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="mb_id" className="block text-sm font-medium text-gray-700">아이디</label>
              <div className="mt-1">
                <input id="mb_id" name="mb_id" type="text" required value={mbId} onChange={(e) => setMbId(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="mb_password" className="block text-sm font-medium text-gray-700">비밀번호</label>
              <div className="mt-1">
                <input id="mb_password" name="mb_password" type="password" required value={mbPassword} onChange={(e) => setMbPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            {errorMsg && (
              <div className="text-red-500 text-sm font-medium">{errorMsg}</div>
            )}

            <div>
              <button type="submit" disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
                {loading ? '로그인 중...' : '로그인'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <a href="/register" className="text-sm text-blue-600 hover:text-blue-500 font-medium">회원가입 하기</a>
          </div>
        </div>
      </div>
    </div>
  );
}
