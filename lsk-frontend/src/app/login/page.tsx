'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/auth';
import Link from 'next/link';

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
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', mb_id: mbId, mb_password: mbPassword })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setToken(data.data.token, data.data.member);
        router.push('/');
        router.refresh();
      } else {
        setErrorMsg(data.error || '아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setErrorMsg('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 배경 장식 패턴 (인천하이병원 브랜드 컬러 연계) */}
      <div className="absolute top-0 left-0 w-full h-96 bg-[#00479A] skew-y-3 transform origin-top-left -z-10 opacity-90"></div>
      
      <div className="w-full max-w-md mx-auto z-10">
        <div className="text-center mb-10">
          {/* 로고 대신 병원 텍스트 및 신뢰감 주는 헤드라인 */}
          <h2 className="text-4xl font-extrabold text-[#00479A] tracking-tight">인천하이병원</h2>
          <p className="mt-3 text-blue-600 text-lg font-medium">따뜻한 소통, 정확한 진단</p>
        </div>

        <div className="bg-white py-10 px-8 shadow-2xl rounded-2xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">로그인</h3>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="mb_id" className="block text-sm font-semibold text-gray-700">
                아이디
              </label>
              <div className="mt-2">
                <input
                  id="mb_id"
                  name="mb_id"
                  type="text"
                  required
                  value={mbId}
                  onChange={(e) => setMbId(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00479A] focus:border-transparent transition-all"
                  placeholder="아이디를 입력하세요"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="mb_password" className="block text-sm font-semibold text-gray-700">
                  비밀번호
                </label>
                <Link href="#" className="text-sm font-medium text-[#00479A] hover:text-blue-800 transition-colors">
                  비밀번호 찾기
                </Link>
              </div>
              <div className="mt-2">
                <input
                  id="mb_password"
                  name="mb_password"
                  type="password"
                  required
                  value={mbPassword}
                  onChange={(e) => setMbPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00479A] focus:border-transparent transition-all"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-md bg-red-50 p-4 border border-red-100">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{errorMsg}</h3>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-[#00479A] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00479A] disabled:opacity-70 transition-all transform active:scale-[0.99]"
              >
                {loading ? '인증 진행 중...' : '로그인'}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">아직 회원이 아니신가요?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/register" className="inline-flex items-center px-4 py-2 text-sm font-bold text-[#00479A] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                회원가입 하기 &rarr;
              </Link>
            </div>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-400 mt-8">
          &copy; INCHEON HI HOSPITAL. All rights reserved.
        </p>
      </div>
    </div>
  );
}
