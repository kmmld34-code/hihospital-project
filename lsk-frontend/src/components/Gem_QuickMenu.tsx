"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CalendarCheck, Clock, MapPin, PhoneCall, MessageSquare, ArrowUp } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_QuickMenu] 우측 고정 사이드 배너 (Sticky Quick Menu)
 * ==============================================================================
 * - 규칙: 사용자가 페이지 스크롤을 내려도 화면 우측에 항상 고정되어 따라붙는 세로형 플로팅 메뉴
 * - 기능: 간편예약, 진료시간, 오시는길, 전화상담, 카톡상담, 페이지 최상단(TOP) 이동
 * - 접두어: Gem_ 접두사 엄수
 * ==============================================================================
 */
export default function Gem_QuickMenu() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // 스크롤 감지하여 TOP 버튼 표시 제어
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 최상단으로 부드럽게 스크롤 이동
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside
      className="Gem_QuickMenu fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/80 p-2.5 space-y-1.5 w-[84px] text-center select-none"
      aria-label="빠른 서비스 메뉴"
    >
      {/* QUICK 상단 라벨 */}
      <div className="text-[10px] font-black tracking-widest text-[#0052CC] bg-[#EBF2FC] px-2.5 py-0.5 rounded-full mb-1">
        QUICK
      </div>

      {/* 1. 간편예약 (강조 버튼) */}
      <Link
        href="/appointments"
        className="Gem_QuickItem group flex flex-col items-center justify-center w-full py-2 px-1 rounded-xl bg-[#0052CC] text-white hover:bg-[#0043A6] transition-all transform hover:scale-105 shadow-md"
      >
        <CalendarCheck className="w-5 h-5 mb-1" />
        <span className="text-[11px] font-bold leading-tight">간편예약</span>
      </Link>

      {/* 2. 진료시간 안내 */}
      <Link
        href="/about/hours"
        className="Gem_QuickItem group flex flex-col items-center justify-center w-full py-2 px-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-all hover:text-[#0052CC]"
      >
        <Clock className="w-5 h-5 mb-1 text-slate-500 group-hover:text-[#0052CC] transition-colors" />
        <span className="text-[11px] font-semibold leading-tight">진료시간</span>
      </Link>

      {/* 3. 오시는길 */}
      <Link
        href="/about/directions"
        className="Gem_QuickItem group flex flex-col items-center justify-center w-full py-2 px-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-all hover:text-[#0052CC]"
      >
        <MapPin className="w-5 h-5 mb-1 text-slate-500 group-hover:text-[#0052CC] transition-colors" />
        <span className="text-[11px] font-semibold leading-tight">오시는길</span>
      </Link>

      {/* 4. 전화상담 (1600-8549) */}
      <a
        href="tel:1600-8549"
        className="Gem_QuickItem group flex flex-col items-center justify-center w-full py-2 px-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-all hover:text-[#0052CC]"
      >
        <PhoneCall className="w-5 h-5 mb-1 text-slate-500 group-hover:text-[#0052CC] transition-colors" />
        <span className="text-[11px] font-semibold leading-tight">전화상담</span>
      </a>

      {/* 5. 카카오톡 상담 */}
      <a
        href="https://pf.kakao.com"
        target="_blank"
        rel="noopener noreferrer"
        className="Gem_QuickItem group flex flex-col items-center justify-center w-full py-2 px-1 rounded-xl text-amber-700 hover:bg-amber-50 transition-all"
      >
        <MessageSquare className="w-5 h-5 mb-1 text-amber-500" />
        <span className="text-[11px] font-semibold leading-tight">카톡상담</span>
      </a>

      {/* 6. 페이지 최상단 이동 (TOP 버튼) */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="맨 위로 이동"
          className="Gem_QuickTopBtn flex flex-col items-center justify-center w-full pt-2 border-t border-slate-200 text-slate-400 hover:text-slate-800 transition-colors"
        >
          <ArrowUp className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold">TOP</span>
        </button>
      )}
    </aside>
  );
}
