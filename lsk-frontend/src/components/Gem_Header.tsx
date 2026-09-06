"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GEM_NAV_ITEMS } from "@/data/hospitalData";
import { Phone, Clock, AlertCircle, Menu, X, ChevronDown } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_Header] 글로벌 헤더 네비게이션 컴포넌트
 * ==============================================================================
 * - 규칙: 배경은 100% 풀 와이드(Full-width), 
 *        내부 콘텐츠(로고, 메뉴, 전화번호, 버튼 등)는 max-w-[1400px] mx-auto 중앙 정렬!
 * - 접두어: Gem_ 접두사 엄수
 * ==============================================================================
 */
export default function Gem_Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="Gem_Header w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      {/* 1. 최상단 유틸리티 바 (전체 배경 full-width, 내부 1400px 고정) */}
      <div className="Gem_HeaderTopUtility w-full bg-slate-50 border-b border-slate-200/70 py-2 text-xs text-slate-600 hidden md:block">
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center text-red-600 font-semibold bg-red-50 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1.5" />
              24시간 응급의료센터 정상 가동
            </span>
            <span className="flex items-center text-slate-500">
              <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
              외래진료: 평일 09:00~18:00 | 토요일 09:00~13:00 (점심시간 없음)
            </span>
          </div>

          <div className="flex items-center space-x-5 text-slate-500 font-medium">
            <a href="tel:1600-8549" className="flex items-center text-[#0052CC] font-bold hover:underline">
              <Phone className="w-3.5 h-3.5 mr-1" />
              대표전화: 1600-8549
            </a>
            <span className="text-slate-300">|</span>
            <Link href="/auth/login" className="hover:text-slate-900 transition-colors">로그인</Link>
            <Link href="/auth/register" className="hover:text-slate-900 transition-colors">회원가입</Link>
            <Link href="/appointments/my" className="hover:text-[#0052CC] transition-colors">예약확인</Link>
          </div>
        </div>
      </div>

      {/* 2. 메인 GNB 네비게이션 바 (전체 배경 full-width, 내부 1400px 고정) */}
      <div className="Gem_HeaderNavWrapper w-full">
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[80px]">
          {/* 로고 영역 */}
          <Link href="/" className="Gem_HeaderLogo flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0052CC] to-[#00A8B5] flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              HI
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#071E54] block leading-none">
                HI HOSPITAL
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider block mt-1 uppercase">
                척추·관절·뇌신경 전문병원
              </span>
            </div>
          </Link>

          {/* 데스크톱 메뉴 (11개 1Depth 메뉴) */}
          <nav className="Gem_HeaderDesktopNav hidden xl:flex items-center space-x-6">
            {GEM_NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="Gem_NavItem relative text-[15px] font-semibold text-slate-700 hover:text-[#0052CC] py-2 transition-colors flex items-center group"
              >
                {item.name}
                {item.badge && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold text-white bg-amber-500 rounded-full leading-none">
                    {item.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0052CC] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* 우측 CTA 버튼 & 모바일 햄버거 메뉴 토글 */}
          <div className="flex items-center space-x-3">
            <Link
              href="/appointments"
              className="Gem_HeaderCta hidden sm:inline-flex items-center justify-center bg-[#0052CC] hover:bg-[#0043A6] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              온라인 진료예약
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. 모바일 네비게이션 드로어 */}
      {mobileMenuOpen && (
        <div className="Gem_MobileNav xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-4 border-b border-slate-100">
            <Link
              href="/appointments"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#0052CC] text-white text-center py-2.5 rounded-lg text-sm font-bold shadow-sm"
            >
              온라인 진료예약
            </Link>
            <a
              href="tel:1600-8549"
              className="bg-amber-500 text-white text-center py-2.5 rounded-lg text-sm font-bold shadow-sm"
            >
              전화예약 1600-8549
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
            {GEM_NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-[#0052CC] py-2 px-3 rounded-md hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
