"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러를 에러 리포팅 서비스에 기록할 수 있습니다.
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <AlertTriangle className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">앗, 문제가 발생했습니다!</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            페이지를 불러오는 중 예상치 못한 오류가 발생했습니다.<br />
            일시적인 문제일 수 있으니 다시 시도해 주세요.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0C7657] hover:bg-[#085B42] text-white font-bold transition shadow-md"
          >
            다시 시도하기
          </button>
          <Link
            href="/"
            className="w-full py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
          >
            홈으로 돌아가기
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 text-left bg-slate-100 p-4 rounded-xl overflow-x-auto text-xs text-rose-600 font-mono">
            <p className="font-bold mb-1">Developer Error Log:</p>
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
}
