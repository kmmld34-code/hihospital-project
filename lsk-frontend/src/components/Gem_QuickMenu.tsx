"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  MapPin,
  PhoneCall,
  MessageSquare,
  ArrowUp,
} from "lucide-react";

/**
 * ==============================================================================
 * [Gem_QuickMenu] 우측 고정 플로팅 사이드 퀵메뉴
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM
 * ==============================================================================
 * [주요 구현 사양]
 * 1. 뷰포트 고정(Fixed):
 *    - 화면 우측 중앙에 세로형으로 플로팅(right-4 md:right-6 top-1/2 -translate-y-1/2)
 * 2. 원클릭 바로가기:
 *    - 1) QUICK 배지
 *    - 2) 간편예약 (하이라이트 버튼)
 *    - 3) 진료시간 안내
 *    - 4) 오시는 길
 *    - 5) 1600-8549 전화상담
 *    - 6) 카카오톡 상담 (호박색/amber 테마)
 *    - 7) 최상단 스크롤(TOP) 버튼
 * ==============================================================================
 */
export default function Gem_QuickMenu() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // 스크롤 위치 감지하여 TOP 버튼 노출 제어
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 최상단으로 부드러운 스크롤 이동
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside
      className="Gem_QuickMenu fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 w-[84px] bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_10px_25px_-3px_rgba(7,30,84,0.15)] border border-slate-200 p-2 hidden md:flex flex-col items-center gap-1.5 text-center select-none"
      aria-label="빠른 서비스 메뉴"
    >
      {/* 1. QUICK 최상단 배지 */}
      <div className="w-full bg-[#071E54] text-white text-[10px] py-1 rounded-full tracking-wider font-extrabold uppercase">
        QUICK
      </div>

      {/* 2. 간편예약 (강조 버튼) */}
      <Link
        href="/appointments"
        className="w-full p-2 rounded-xl bg-[#EBF2FC] text-[#0052CC] hover:bg-[#0052CC] hover:text-white transition-all flex flex-col items-center gap-1 group hover:shadow-md"
      >
        <CalendarCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-bold leading-tight">간편예약</span>
      </Link>

      {/* 3. 진료시간 안내 */}
      <Link
        href="/about/hours"
        className="w-full p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-[#0052CC] transition-all flex flex-col items-center gap-1 group hover:scale-105"
      >
        <Clock className="w-5 h-5 text-slate-400 group-hover:text-[#0052CC] transition-colors" />
        <span className="text-[11px] font-bold leading-tight">진료시간</span>
      </Link>

      {/* 4. 오시는 길 */}
      <Link
        href="/about/directions"
        className="w-full p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-[#0052CC] transition-all flex flex-col items-center gap-1 group hover:scale-105"
      >
        <MapPin className="w-5 h-5 text-slate-400 group-hover:text-[#0052CC] transition-colors" />
        <span className="text-[11px] font-bold leading-tight">오시는길</span>
      </Link>

      {/* 5. 전화 상담 직통 */}
      <a
        href="tel:1600-8549"
        className="w-full p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-[#0052CC] transition-all flex flex-col items-center gap-1 group hover:scale-105"
      >
        <PhoneCall className="w-5 h-5 text-slate-400 group-hover:text-[#0052CC] transition-colors" />
        <span className="text-[10px] font-bold leading-tight text-[#071E54]">
          1600-8549
        </span>
      </a>

      {/* 6. 카카오톡 1:1 상담 */}
      <a
        href="https://pf.kakao.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full p-2 rounded-xl text-amber-800 bg-amber-50 hover:bg-amber-100 transition-all flex flex-col items-center gap-1 hover:scale-105"
      >
        <MessageSquare className="w-5 h-5 text-amber-600" />
        <span className="text-[11px] font-bold leading-tight">카톡상담</span>
      </a>

      {/* 7. 최상단 이동 (TOP) 버튼 */}
      {showTopBtn && (
        <button
          type="button"
          onClick={scrollToTop}
          className="w-full p-1.5 mt-1 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex flex-col items-center justify-center transition-all cursor-pointer"
          aria-label="화면 최상단으로 이동"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="text-[10px] font-bold">TOP</span>
        </button>
      )}
    </aside>
  );
}
