"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  MapPin,
  ArrowUp,
} from "lucide-react";

/**
 * ==============================================================================
 * [Gem_QuickMenu] 우측 고정 플로팅 사이드 퀵메뉴 (슬림 정방형 리뉴얼)
 * ==============================================================================
 * 기획 및 디자인 감수: 정재이 과장 (Lead UI/UX Designer)
 * 인터랙션 구현: 고윤기 대리 (Frontend Lead Engineer)
 * ==============================================================================
 * [대표님 고도화 지침 완벽 반영]
 * 1. 슬림 핏(Slim Fit) 컨테이너 레이아웃:
 *    - 전체 너비를 기존 84px에서 66px로 슬림화
 *    - 좌우 측면 마진(패딩)은 최소화(px-1.5)하고, 상하 마진(패딩)은 여유(py-4)를 두어 세련된 비율 확립
 * 2. 모든 버튼 정방형(1:1 비율) 규격 통일:
 *    - 가로/세로 54px x 54px 정방형(aspect-square) 라운드 박스 일괄 적용
 *    - 카카오톡 버튼도 다른 버튼들과 동일한 규격으로 완벽 일치
 * 3. 모든 버튼 그라데이션 전면 제거 및 단색(Flat) 배색:
 *    - 간편예약: #0052CC 단색 배경 + 흰색 아이콘 & 텍스트
 *    - 진료시간: #006971 단색 배경 + 흰색 아이콘 & 텍스트
 *    - 오시는길: #603B00 단색 배경 + 흰색 아이콘 & 텍스트
 *    - 네이버톡: #1BA552 단색 배경 + 흰색 네이버 공식 심볼 & 텍스트
 *    - 카카오톡: #FEE500 노란 배경 + #3C1E1E 카카오 공식 말풍선 & 텍스트
 * 4. 마우스 오버 시 20% 투명 효과 (기본색 유지):
 *    - 기존의 흰색 색반전을 완전히 배제하고, 기본색에 20% 투명도(불투명도 80%, hover:opacity-80)만 부드럽게 부여
 * 5. 최하단 TOP 버튼 고시인성 리디자인:
 *    - 선명한 다크 네이비(#071E54) 배경 + 흰색 화살표 및 볼드 텍스트로 시인성 극대화
 * ==============================================================================
 */

export default function Gem_QuickMenu() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // 스크롤 위치 감지하여 TOP 버튼 노출 제어 (250px 이상 스크롤 시 등장)
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
      className="Gem_QuickMenu fixed right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 w-[66px] bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_12px_32px_rgba(7,30,84,0.18)] border border-slate-200/90 px-1.5 py-3.5 hidden md:flex flex-col items-center gap-1.5 text-center select-none"
      aria-label="빠른 서비스 메뉴"
    >
      {/* 1. QUICK 최상단 뱃지 (슬림 라운드 뱃지) */}
      <div className="w-full bg-[#071E54] text-white text-[9px] py-0.5 mb-0.5 rounded-md tracking-wider font-black uppercase shadow-xs">
        QUICK
      </div>

      {/* 2. 간편예약 (정방형 54x54, #0052CC 단색, 호버 시 20% 투명화) */}
      <Link
        href="/appointments"
        className="w-[54px] h-[54px] aspect-square rounded-xl bg-[#0052CC] text-white transition-opacity duration-200 hover:opacity-80 flex flex-col items-center justify-center gap-1 shadow-xs"
        title="온라인 간편예약"
      >
        <CalendarCheck className="w-4 h-4" />
        <span className="text-[10px] font-black leading-none">간편예약</span>
      </Link>

      {/* 3. 진료시간 (정방형 54x54, #006971 단색, 호버 시 20% 투명화) */}
      <Link
        href="/about/hours"
        className="w-[54px] h-[54px] aspect-square rounded-xl bg-[#006971] text-white transition-opacity duration-200 hover:opacity-80 flex flex-col items-center justify-center gap-1 shadow-xs"
        title="진료시간 안내"
      >
        <Clock className="w-4 h-4" />
        <span className="text-[10px] font-black leading-none">진료시간</span>
      </Link>

      {/* 4. 오시는길 (정방형 54x54, #603B00 단색, 호버 시 20% 투명화) */}
      <Link
        href="/about/directions"
        className="w-[54px] h-[54px] aspect-square rounded-xl bg-[#603B00] text-white transition-opacity duration-200 hover:opacity-80 flex flex-col items-center justify-center gap-1 shadow-xs"
        title="오시는 길 및 주차"
      >
        <MapPin className="w-4 h-4" />
        <span className="text-[10px] font-black leading-none">오시는길</span>
      </Link>

      {/* 5. 네이버톡 (정방형 54x54, #1BA552 단색, 호버 시 20% 투명화) */}
      <a
        href="https://talk.naver.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-[54px] h-[54px] aspect-square rounded-xl bg-[#1BA552] text-white transition-opacity duration-200 hover:opacity-80 flex flex-col items-center justify-center gap-1 shadow-xs"
        title="네이버톡톡 1:1 상담"
      >
        {/* 네이버 공식 'N' 심볼 SVG */}
        <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
          <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" />
        </svg>
        <span className="text-[10px] font-black leading-none tracking-tight">네이버톡</span>
      </a>

      {/* 6. 카톡상담 (정방형 54x54 규격 통일, #FEE500 단색 노란 배경, 호버 시 20% 투명화) */}
      <a
        href="https://pf.kakao.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-[54px] h-[54px] aspect-square rounded-xl bg-[#FEE500] text-[#3C1E1E] transition-opacity duration-200 hover:opacity-80 flex flex-col items-center justify-center gap-1 shadow-xs cursor-pointer"
        title="카카오톡 1:1 상담"
      >
        {/* 카카오톡 공식 말풍선 심볼 SVG */}
        <svg className="w-4 h-4 fill-[#3C1E1E]" viewBox="0 0 24 24">
          <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.847 1.867 5.342 4.673 6.743l-.95 3.518c-.084.312.233.568.51.411l4.238-2.392c.504.078 1.018.12 1.529.12 5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
        </svg>
        <span className="text-[10px] font-black leading-none text-[#3C1E1E] tracking-tight">
          카톡상담
        </span>
      </a>

      {/* 7. 최상단 이동 (TOP) 버튼 (시인성 극대화: 다크네이비 배경 + 화이트 텍스트) */}
      {showTopBtn && (
        <button
          type="button"
          onClick={scrollToTop}
          className="w-[54px] h-[38px] mt-1 rounded-xl bg-[#071E54] hover:bg-[#0052CC] text-white transition-all duration-200 hover:opacity-80 flex flex-col items-center justify-center shadow-sm cursor-pointer"
          aria-label="화면 최상단으로 이동"
          title="화면 최상단으로 이동"
        >
          <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="text-[9px] font-black tracking-wider leading-none mt-0.5">TOP</span>
        </button>
      )}
    </aside>
  );
}
