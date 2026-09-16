"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  MapPin,
  MessageCircle,
  ArrowUp,
} from "lucide-react";

/**
 * ==============================================================================
 * [Gem_QuickMenu] 우측 고정 플로팅 사이드 퀵메뉴
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM, 정재이 과장 (UI/UX)
 * ==============================================================================
 * [대표님 4번 지침 완벽 반영 (2026-09-16)]
 * 1. 간편예약:
 *    - 기본값: 메인 강조색 #0052CC 배경 + 흰색 아이콘 & 흰색 텍스트
 *    - 호버 시: #EBF2FC 연한 배경 + #0052CC 텍스트 & 아이콘
 * 2. 진료시간:
 *    - 기본값: #006971 배경 + 흰색 아이콘 & 흰색 텍스트
 *    - 호버 시: #E0F2F1 연한 배경 + #006971 텍스트 & 아이콘
 * 3. 오시는길:
 *    - 기본값: #603B00 배경 + 흰색 아이콘 & 흰색 텍스트
 *    - 호버 시: #F5EBE6 연한 배경 + #603B00 텍스트 & 아이콘
 * 4. 네이버톡 (기존 전화상담 버튼 대체):
 *    - 배경색: #00ED58 ~ #00B053 그라데이션 + 흰색 텍스트 & 아이콘
 * 5. 카톡상담:
 *    - 외곽 흰색 여백 없이 #FEE500 노란색 꽉 찬 배경
 *    - 어두운 갈색(#3C1E1E) 말풍선 안에 '카톡상담' 노란색 글씨 배치
 * 6. 최상단 스크롤(TOP) 버튼
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
      className="Gem_QuickMenu fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-40 w-[84px] bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_12px_30px_rgba(7,30,84,0.18)] border border-slate-200 p-2 hidden md:flex flex-col items-center gap-1.5 text-center select-none"
      aria-label="빠른 서비스 메뉴"
    >
      {/* 1. QUICK 최상단 배지 */}
      <div className="w-full bg-[#071E54] text-white text-[10px] py-1 rounded-full tracking-wider font-black uppercase shadow-sm">
        QUICK
      </div>

      {/* 2. 간편예약 (기본: #0052CC 배경 / 호버: #EBF2FC 배경) */}
      <Link
        href="/appointments"
        className="w-full p-2 rounded-xl bg-[#0052CC] text-white hover:bg-[#EBF2FC] hover:text-[#0052CC] transition-all flex flex-col items-center gap-1 group shadow-sm hover:shadow-md"
      >
        <CalendarCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-extrabold leading-tight">간편예약</span>
      </Link>

      {/* 3. 진료시간 안내 (기본: #006971 배경 / 호버: #E0F2F1 배경) */}
      <Link
        href="/about/hours"
        className="w-full p-2 rounded-xl bg-[#006971] text-white hover:bg-[#E0F2F1] hover:text-[#006971] transition-all flex flex-col items-center gap-1 group shadow-sm hover:shadow-md"
      >
        <Clock className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-extrabold leading-tight">진료시간</span>
      </Link>

      {/* 4. 오시는 길 (기본: #603B00 배경 / 호버: #F5EBE6 배경) */}
      <Link
        href="/about/directions"
        className="w-full p-2 rounded-xl bg-[#603B00] text-white hover:bg-[#F5EBE6] hover:text-[#603B00] transition-all flex flex-col items-center gap-1 group shadow-sm hover:shadow-md"
      >
        <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-extrabold leading-tight">오시는길</span>
      </Link>

      {/* 5. 네이버톡 (기본: #00ED58 ~ #00B053 그라데이션) */}
      <a
        href="https://talk.naver.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full p-2 rounded-xl bg-gradient-to-b from-[#00ED58] to-[#00B053] text-white hover:opacity-95 transition-all flex flex-col items-center gap-1 group shadow-sm hover:shadow-md hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-white/20 group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-extrabold leading-tight">네이버톡</span>
      </a>

      {/* 6. 카톡상담 (여백 없이 #FEE500 노란 배경 + #3C1E1E 갈색 말풍선 안 '카톡상담') */}
      <a
        href="https://pf.kakao.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full p-1.5 rounded-xl bg-[#FEE500] hover:brightness-95 transition-all flex flex-col items-center justify-center gap-0.5 group shadow-sm hover:shadow-md hover:scale-105 overflow-hidden"
        title="카카오톡 1:1 상담"
      >
        {/* 카카오톡 심볼 SVG (말풍선 안에 '카톡상담' 텍스트) */}
        <div className="w-full py-1 px-0.5 bg-[#3C1E1E] rounded-lg flex items-center justify-center shadow-inner">
          <span className="text-[10px] font-black text-[#FEE500] tracking-tighter whitespace-nowrap">
            카톡상담
          </span>
        </div>
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
