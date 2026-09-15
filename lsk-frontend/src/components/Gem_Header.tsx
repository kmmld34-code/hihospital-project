"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GEM_NAV_ITEMS } from "@/data/hospitalData";
import { Phone, Calendar, User, Menu, X } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_Header] 글로벌 헤더 네비게이션 컴포넌트
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM
 * ==============================================================================
 * [주요 구현 사양]
 * 1. 최상단 유틸리티 바:
 *    - 좌측: 척추 · 관절 · 통증 전문 치료 인천하이병원 슬로건
 *    - 우측: 대표전화 1666-6675, 1:1문의, 로그인, 회원가입, 내 계정 프로필 아이콘
 * 2. GNB 네비게이션 바:
 *    - 배경: 100% Full-width (화면 전체 너비), 스크롤 시 상단 고정(sticky top-0 z-40)
 *    - 내부 콘텐츠: max-w-[1400px] mx-auto 중앙 정렬 원칙 준수
 *    - 좌측 로고: 인천하이병원 (INCHEON HI HOSPITAL) 공식 브랜딩
 *    - 중앙 메뉴: 11개 1Depth 진료과 및 센터 메뉴
 *    - 우측 CTA: [온라인 진료예약] 버튼 (달력 아이콘 포함)
 * ==============================================================================
 */
export default function Gem_Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="Gem_Header w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      {/* 1. 최상단 탑 유틸리티 바 (전체 배경 Full-width, 내부 max-w-[1400px] 중앙 정렬) */}
      <div className="Gem_HeaderTopUtility w-full bg-[#F8FAFC] border-b border-slate-200 text-[14px] text-slate-500 hidden md:block">
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          {/* 좌측 슬로건 */}
          <div className="flex items-center gap-2">
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium text-xs sm:text-sm">
              척추 · 관절 · 통증 전문 치료 인천하이병원
            </span>
          </div>

          {/* 우측 유틸리티 링크 및 고객센터 직통전화 */}
          <div className="ml-auto flex items-center gap-2.5 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-slate-400">대표전화</span>
              <a
                href="tel:1666-6675"
                className="text-[#071E54] font-extrabold hover:text-[#0052CC] transition-colors"
              >
                1666-6675
              </a>
            </div>
            <span className="text-slate-200">|</span>
            <Link
              href="/community/qna"
              className="text-slate-600 hover:text-[#0052CC] transition-colors"
            >
              1:1문의
            </Link>
            <span className="text-slate-200">|</span>
            <Link
              href="/auth/login"
              className="text-slate-600 hover:text-[#0052CC] transition-colors"
            >
              로그인
            </Link>
            <span className="text-slate-200">|</span>
            <Link
              href="/auth/register"
              className="text-slate-600 hover:text-[#0052CC] transition-colors"
            >
              회원가입
            </Link>
            {/* 사용자 마이페이지 아이콘 */}
            <Link
              href="/appointments/my"
              className="w-7 h-7 rounded-full bg-[#0052CC] text-white flex items-center justify-center hover:bg-[#0043A6] transition-colors ml-1"
              aria-label="마이페이지"
            >
              <User className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. 메인 GNB 헤더 (전체 배경 Full-width, 내부 max-w-[1400px] 중앙 정렬) */}
      <div className="Gem_HeaderNavWrapper w-full">
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[76px] sm:h-[80px] flex items-center justify-between gap-4">
          {/* 로고 영역 */}
          <Link
            href="/"
            className="Gem_HeaderLogo flex items-center gap-2.5 flex-shrink-0 whitespace-nowrap group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0052CC] to-[#00A8B5] flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              HI
            </div>
            <div className="flex flex-col justify-center items-start">
              <span className="text-xl sm:text-[22px] font-black tracking-tight text-[#071E54] leading-none block">
                인천하이병원
              </span>
              <span className="font-bold leading-none uppercase text-slate-400 mt-1 flex justify-between w-full text-[8.5px] select-none tracking-widest">
                <span>I</span>
                <span>N</span>
                <span>C</span>
                <span>H</span>
                <span>E</span>
                <span>O</span>
                <span>N</span>
                <span>&nbsp;</span>
                <span>H</span>
                <span>I</span>
                <span>&nbsp;</span>
                <span>H</span>
                <span>O</span>
                <span>S</span>
                <span>P</span>
                <span>I</span>
                <span>T</span>
                <span>A</span>
                <span>L</span>
              </span>
            </div>
          </Link>

          {/* 데스크톱 메뉴 (11개 1Depth 메뉴 네비게이션) */}
          <nav className="Gem_HeaderDesktopNav hidden xl:flex items-center gap-5 lg:gap-6">
            {GEM_NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="Gem_NavItem text-[15px] font-bold text-slate-700 hover:text-[#0052CC] py-2 transition-colors inline-flex items-center gap-1 group relative"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-700 text-[10px] font-extrabold">
                    {item.badge}
                  </span>
                )}
                {/* 호버 시 하단 언더라인 포인트 */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0052CC] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* 우측 CTA 버튼 및 모바일 햄버거 메뉴 */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* 온라인 진료예약 버튼 */}
            <Link
              href="/appointments"
              className="Gem_HeaderCta inline-flex items-center gap-1.5 bg-[#0052CC] hover:bg-[#0043A6] text-white text-xs sm:text-[14px] font-bold px-4 sm:px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,82,204,0.3)] transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>온라인 진료예약</span>
            </Link>

            {/* 모바일 화면 햄버거 메뉴 토글 버튼 */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:text-[#0052CC] hover:bg-slate-100 transition-colors"
              aria-label="메뉴 열기/닫기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. 모바일 전용 드롭다운 메뉴 (반응형 지원) */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-white border-b border-slate-200 shadow-xl px-4 py-6 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GEM_NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-slate-50 hover:bg-[#EBF2FC] hover:text-[#0052CC] text-slate-800 font-bold text-sm transition-colors flex items-center justify-between"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* 모바일 하단 로그인/회원가입 바 */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-around text-xs font-semibold text-slate-600">
            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
              로그인
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
              회원가입
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/community/qna" onClick={() => setMobileMenuOpen(false)}>
              1:1문의
            </Link>
            <span className="text-slate-300">|</span>
            <a href="tel:1666-6675" className="text-[#0052CC] font-bold">
              전화: 1666-6675
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
