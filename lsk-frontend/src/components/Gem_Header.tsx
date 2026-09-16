"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Phone, 
  Calendar, 
  User, 
  Menu, 
  X, 
  Search, 
  LayoutGrid, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  Clock,
  MapPin
} from "lucide-react";
import { GEM_EXTENDED_NAV_ITEMS, GEM_SITEMAP_NAV_ITEMS } from "@/data/navigationData";

/**
 * ==============================================================================
 * [Gem_Header] 글로벌 헤더 네비게이션 컴포넌트
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM, 정재이 과장 (UI/UX)
 * 백엔드 아키텍처 지원: 최우진 대리, 박동훈 차장
 * ==============================================================================
 * [대표님 3차 디테일 지침 완벽 반영 (2026-09-16)]
 * 1. 주메뉴 마우스오버 반응 영역(히트박스) 대폭 확장:
 *    - 글자 주변뿐만 아니라 헤더 전체 세로 높이(80px) 및 글자 하단 전체를 투명 히트박스로 확장
 *    - 마우스가 글자 밑으로 내려가도 마우스오버가 끊기지 않는 강력한 안정감 확보
 * 2. 모든 서브메뉴 박스 100% 주메뉴 기준 정중앙(Center) 정렬 통일:
 *    - 맨 좌측('병원소개')이든 맨 우측('커뮤니티')이든 예외 없이,
 *      마우스 올린 주메뉴가 서브메뉴 박스의 정중앙에 위치하도록 `left-1/2 -translate-x-1/2`로 일관성 확립!
 *    - 텍스트 하단과 팝오버 상단 사이의 빈틈을 투명 브릿지로 완전 연결하여 빗나감 0% 달성
 * 3. 주메뉴 좌/우 대칭 여백 2배 확장 및 사이트맵 어르신 가독성 14px~16px 확대 상태 완벽 유지
 * ==============================================================================
 */

export default function Gem_Header() {
  const router = useRouter();

  // 1. 상태 관리
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null); // 호버 중인 1Depth 메뉴 ID
  const [isMegaDrawerOpen, setIsMegaDrawerOpen] = useState<boolean>(false); // 전체메뉴 드로어 열림 여부
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false); // 모바일 메뉴 토글
  const [searchQuery, setSearchQuery] = useState<string>(""); // 최상단 검색어
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>("spine"); // 모바일 아코디언 열림 메뉴

  // 2. 호버 딜레이 타이머 참조 (사선 이동 빗나감 방지용 300ms)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 마우스 진입 핸들러
  const handleMouseEnter = (menuId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveMenuId(menuId);
  };

  // 마우스 이탈 핸들러 (충분한 골든타임 300ms 부여)
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 300);
  };

  // 통합 검색 제출 핸들러
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/community/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  // 전체메뉴 드로어 토글
  const toggleMegaDrawer = () => {
    setIsMegaDrawerOpen((prev) => !prev);
    setActiveMenuId(null);
  };

  // ESC 키로 드로어 및 팝오버 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMegaDrawerOpen(false);
        setActiveMenuId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="Gem_Header w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      {/* ============================================================================== */}
      {/* 1. 최상단 탑 유틸리티 바 (슬로건 + 알약 검색창 + 대표전화) */}
      {/* ============================================================================== */}
      <div className="Gem_HeaderTopUtility w-full bg-[#F8FAFC] border-b border-slate-200 text-xs sm:text-[13px] text-slate-500 hidden md:block">
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4">
          {/* 좌측 슬로건 및 알약형 통합 검색창 */}
          <div className="flex items-center gap-3 lg:gap-4 flex-1">
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium whitespace-nowrap hidden lg:inline-block">
              척추 · 관절 · 통증 전문 치료 인천하이병원
            </span>

            <form 
              onSubmit={handleSearchSubmit}
              className="relative flex items-center max-w-[280px] xl:max-w-[320px] w-full"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="질환명이나 진료과를 검색해 보세요"
                className="w-full h-7 pl-8 pr-3 bg-white border border-slate-200 hover:border-slate-300 focus:border-[#0052CC] rounded-full text-xs text-slate-700 placeholder-slate-400 outline-none transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus:ring-2 focus:ring-[#0052CC]/15"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </form>
          </div>

          {/* 우측 유틸리티 링크 및 대표전화 */}
          <div className="flex items-center gap-2.5 text-xs sm:text-[13px] flex-shrink-0">
            <div className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#0052CC]" />
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
              href="/community/inquiry"
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
            <Link
              href="/appointments/my"
              className="w-6 h-6 rounded-full bg-[#0052CC] text-white flex items-center justify-center hover:bg-[#0043A6] transition-colors ml-1 shadow-sm"
              aria-label="마이페이지"
              title="마이페이지"
            >
              <User className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================================== */}
      {/* 2. 메인 GNB 헤더 (로고 - 주메뉴라인 - 우측버튼군) */}
      {/* ============================================================================== */}
      <div className="Gem_HeaderNavWrapper w-full relative">
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[76px] sm:h-[80px] flex items-center justify-between">
          
          {/* [1] 좌측 로고 영역 */}
          <Link
            href="/"
            className="Gem_HeaderLogo flex items-center gap-2.5 flex-shrink-0 whitespace-nowrap group"
            onClick={() => {
              setIsMegaDrawerOpen(false);
              setActiveMenuId(null);
            }}
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

          {/* [2] 중앙 데스크톱 주메뉴라인 (대칭 여백 mx-12 lg:mx-16 2xl:mx-20 적용) */}
          <nav 
            className="Gem_HeaderDesktopNav hidden xl:flex items-center justify-between flex-1 mx-12 lg:mx-16 2xl:mx-20 h-full"
            onMouseLeave={handleMouseLeave}
          >
            {GEM_EXTENDED_NAV_ITEMS.map((item) => {
              const isActive = activeMenuId === item.id;
              return (
                <div
                  key={item.id}
                  /* [개선 1] 헤더 전체 세로 높이(h-full)를 100% 활용하는 넓은 마우스오버 히트박스 영역 */
                  className="h-full flex items-center justify-center relative group/navitem cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                >
                  {/* [개선 1] 텍스트 아래부분까지 마우스 반응 영역을 넓히는 투명 패딩 버튼 링크 */}
                  <Link
                    href={item.href}
                    className={`Gem_NavItem h-full flex items-center justify-center px-1.5 2xl:px-2.5 text-[15.5px] 2xl:text-[16px] font-extrabold tracking-tight transition-all relative whitespace-nowrap select-none ${
                      isActive ? "text-[#0052CC]" : "text-slate-700 hover:text-[#0052CC]"
                    }`}
                  >
                    <span>{item.name}</span>
                    {/* 호버 시 하단 언더라인 인디케이터 (헤더 밑바닥 6px 상단에 위치) */}
                    <span 
                      className={`absolute bottom-3 left-0 h-[2.5px] bg-[#0052CC] transition-all duration-200 ${
                        isActive ? "w-full" : "w-0 group-hover/navitem:w-full"
                      }`} 
                    />
                  </Link>

                  {/* ============================================================================== */}
                  {/* [개선 2] 무조건 주메뉴를 기준으로 100% 정중앙 센터링 (left-1/2 -translate-x-1/2) */}
                  {/* ============================================================================== */}
                  {isActive && !isMegaDrawerOpen && (
                    <div
                      /* 어떤 메뉴든 예외 없이 해당 주메뉴 텍스트의 정중앙에 서브메뉴 박스가 안착됨! */
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50 pointer-events-auto hidden xl:block animate-in fade-in zoom-in-95 duration-150"
                      onMouseEnter={() => {
                        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                      }}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* [개선 1] 텍스트 밑부분과 팝오버 상단 사이의 빈틈을 완벽하게 메우는 투명 브릿지 레이어 */}
                      <div className="absolute -top-4 left-0 w-full h-5 bg-transparent pointer-events-auto" />

                      {/* 팝오버 본체 카드 */}
                      <div 
                        className={`bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.16)] border border-slate-100 p-6 transition-all duration-200 ${
                          item.columns.length >= 3 
                            ? "w-[820px]" 
                            : item.columns.length === 2 
                            ? "w-[650px]" 
                            : "w-[480px]"
                        }`}
                      >
                        <div className="flex gap-6">
                          {/* 좌측 질환 및 시술 목록 */}
                          <div className={`grid gap-5 flex-1 ${
                            item.columns.length >= 3 
                              ? "grid-cols-3" 
                              : item.columns.length === 2 
                              ? "grid-cols-2" 
                              : "grid-cols-1"
                          }`}>
                            {item.columns.map((col, idx) => (
                              <div key={idx} className="space-y-2.5">
                                {col.title && (
                                  <div className="text-[12px] font-extrabold text-slate-400 tracking-wider uppercase pb-1.5 border-b border-slate-100 flex items-center justify-between">
                                    <span>{col.title}</span>
                                  </div>
                                )}
                                <ul className="space-y-1">
                                  {col.items.map((subItem) => (
                                    <li key={subItem.name}>
                                      <Link
                                        href={subItem.href}
                                        onClick={() => setActiveMenuId(null)}
                                        className={`group/item flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13.5px] transition-all ${
                                          subItem.isHighlight
                                            ? "font-extrabold text-slate-900 hover:text-[#0052CC] hover:bg-[#F0F6FF]"
                                            : "font-medium text-slate-600 hover:text-[#0052CC] hover:bg-slate-50"
                                        }`}
                                      >
                                        <span className="group-hover/item:translate-x-0.5 transition-transform">
                                          {subItem.name}
                                        </span>
                                        {subItem.badge ? (
                                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                                            subItem.badge === "비수술"
                                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                              : subItem.badge === "수술"
                                              ? "bg-rose-50 text-rose-600 border border-rose-200"
                                              : "bg-blue-50 text-blue-600 border border-blue-200"
                                          }`}>
                                            {subItem.badge}
                                          </span>
                                        ) : (
                                          <ChevronRight className="w-3 h-3 text-slate-300 opacity-0 group-hover/item:opacity-100 group-hover/item:text-[#0052CC] transition-opacity" />
                                        )}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* 우측 큐레이션 배너 카드 */}
                          {item.curation && (
                            <div className="w-[210px] bg-gradient-to-br from-[#F4F8FF] to-[#EBF3FF] border border-[#D6E6FF] rounded-xl p-4 flex flex-col justify-between flex-shrink-0">
                              <div>
                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0052CC] mb-2">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>{item.curation.badge || "특화 안내"}</span>
                                </div>
                                <h4 className="text-[14px] font-black text-slate-900 leading-snug mb-1.5">
                                  {item.curation.title}
                                </h4>
                                <p className="text-[12px] text-slate-600 leading-relaxed">
                                  {item.curation.description}
                                </p>
                              </div>

                              <Link
                                href={item.curation.href}
                                onClick={() => setActiveMenuId(null)}
                                className="mt-4 inline-flex items-center justify-between w-full px-3 py-2 bg-white hover:bg-[#0052CC] text-[#0052CC] hover:text-white rounded-lg text-xs font-bold transition-all shadow-sm group/cur"
                              >
                                <span>{item.curation.actionText}</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover/cur:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* [3] 우측 버튼 2개군 ([전체메뉴] + [진료예약]) */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* '#6E28E0' 보라색 포인트 컬러 배경 + 흰색 텍스트 */}
            <button
              type="button"
              onClick={toggleMegaDrawer}
              className={`Gem_AllMenuBtn hidden lg:inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-extrabold px-3.5 py-2 rounded-xl transition-all shadow-[0_3px_12px_rgba(110,40,224,0.3)] transform hover:-translate-y-0.5 ${
                isMegaDrawerOpen
                  ? "bg-slate-900 text-white ring-2 ring-slate-900"
                  : "bg-[#6E28E0] hover:bg-[#5D1ED0] text-white"
              }`}
              aria-label="전체메뉴 열기/닫기"
            >
              <LayoutGrid className="w-4 h-4 text-white" />
              <span>전체메뉴</span>
            </button>

            {/* 진료예약 블루 솔리드 강조 버튼 */}
            <Link
              href="/appointments"
              className="Gem_HeaderCta inline-flex items-center gap-1.5 bg-[#0052CC] hover:bg-[#0043A6] text-white text-xs sm:text-[13px] font-extrabold px-4 sm:px-5 py-2 rounded-full shadow-[0_3px_12px_rgba(0,82,204,0.3)] transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>진료예약</span>
            </Link>

            {/* 모바일 화면 햄버거 메뉴 토글 버튼 */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:text-[#0052CC] hover:bg-slate-100 transition-colors"
              aria-label="모바일 메뉴 토글"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ============================================================================== */}
        {/* 전체메뉴 드로어: 글자 크기 대폭 확대(노안/시니어 배려 14~16px) & 세로폭 320px 유지 */}
        {/* ============================================================================== */}
        {isMegaDrawerOpen && (
          <div className="Gem_MegaDrawerWrapper absolute top-full left-0 w-full bg-gradient-to-b from-[#0047B3] to-[#0052CC] text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] border-b-4 border-[#00388A] animate-in slide-in-from-top-2 duration-200 z-50">
            <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-4.5">
              
              {/* 드로어 상단 바 (여백을 pb-2 mb-3으로 압축하여 글자 크기 확장에 양보) */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/15 border border-white/20 text-white flex items-center justify-center shadow-sm">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-none">
                      전체 진료과목 사이트맵
                    </h3>
                    <p className="text-[12px] text-blue-100 mt-0.5">인천하이병원의 11개 진료과 및 세부 질환 클리닉을 한눈에 확인하세요.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMegaDrawerOpen(false)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors border border-white/20"
                >
                  <span>닫기</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 11개 진료과 바둑판(Grid) 전체 뷰 (글자 크기를 14px급으로 대폭 키워 노안 환자 완벽 배려) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5 max-h-[50vh] overflow-y-auto pr-1.5 custom-scrollbar">
                {GEM_SITEMAP_NAV_ITEMS.map((nav) => (
                  <div 
                    key={nav.id} 
                    className="space-y-1.5 bg-white/5 p-2 sm:p-2.5 rounded-xl border border-white/10 hover:border-white/30 transition-colors"
                  >
                    {/* 진료과 메인 타이틀: text-[15px] sm:text-[15.5px] 굵은 화이트 텍스트 */}
                    <Link
                      href={nav.href}
                      onClick={() => setIsMegaDrawerOpen(false)}
                      className="inline-flex items-center gap-1 text-[15px] sm:text-[15.5px] font-black text-white hover:text-amber-300 border-b border-white/25 pb-1 w-full justify-between transition-colors tracking-tight"
                    >
                      <span>{nav.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-blue-200 flex-shrink-0" />
                    </Link>

                    {/* 세부 질환 링크: text-[13.5px]~[14px] 100% 선명한 화이트 font-bold */}
                    <ul className="space-y-0.5">
                      {nav.items.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.href}
                            onClick={() => setIsMegaDrawerOpen(false)}
                            className="text-[13px] sm:text-[13.5px] 2xl:text-[14px] text-white hover:text-amber-300 font-bold transition-all block py-[1.5px] hover:translate-x-1 truncate"
                          >
                            • {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* 드로어 하단 퀵 링크 바 */}
              <div className="mt-3.5 pt-2.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-[12.5px] font-medium text-blue-100 bg-[#00388A]/80 -mx-4 -mb-4 sm:-mb-4.5 px-8 py-2.5 rounded-b-xl">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1.5 text-white font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>진료시간: 평일 09:00 ~ 18:00 (토요일 09:00 ~ 13:00)</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-white font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    <span>위치: 인천광역시 계양구 계양대로 140</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 font-bold">
                  <Link
                    href="/about/directions"
                    onClick={() => setIsMegaDrawerOpen(false)}
                    className="text-blue-100 hover:text-white"
                  >
                    오시는 길 안내 ➔
                  </Link>
                  <span className="text-white/30">|</span>
                  <Link
                    href="/appointments"
                    onClick={() => setIsMegaDrawerOpen(false)}
                    className="text-amber-300 hover:text-white"
                  >
                    온라인 간편예약 바로가기 ➔
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================================== */}
      {/* 3. 모바일 전용 드롭다운 메뉴 (반응형 지원 & 아코디언 탐색) */}
      {/* ============================================================================== */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-white border-b border-slate-200 shadow-xl px-4 py-6 animate-in slide-in-from-top duration-200 max-h-[80vh] overflow-y-auto">
          {/* 모바일 상단 검색창 */}
          <form onSubmit={handleSearchSubmit} className="relative mb-5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="질환명이나 진료과를 검색해 보세요"
              className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 outline-none focus:border-[#0052CC] focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </form>

          {/* 11개 진료과 아코디언 메뉴 */}
          <div className="space-y-2">
            {GEM_EXTENDED_NAV_ITEMS.map((item) => {
              const isExpanded = mobileExpandedId === item.id;
              return (
                <div key={item.id} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileExpandedId(isExpanded ? null : item.id)}
                    className="w-full p-3.5 bg-slate-50 hover:bg-[#EBF2FC] text-slate-800 font-bold text-sm flex items-center justify-between transition-colors"
                  >
                    <span>{item.name}</span>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${
                      isExpanded ? "rotate-90 text-[#0052CC]" : ""
                    }`} />
                  </button>

                  {isExpanded && (
                    <div className="p-3 bg-white space-y-2 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-2">
                        {item.columns.flatMap((col) => col.items).map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-xs p-2 rounded-lg bg-slate-50 text-slate-700 hover:text-[#0052CC] hover:bg-blue-50 font-medium transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-center text-xs font-bold text-[#0052CC] py-1 mt-2 border-t border-slate-100"
                      >
                        {item.name} 전체보기 ➔
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 모바일 하단 로그인/회원가입/예약 바 */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-around text-xs font-semibold text-slate-600">
            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
              로그인
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
              회원가입
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/community/inquiry" onClick={() => setMobileMenuOpen(false)}>
              1:1문의
            </Link>
            <span className="text-slate-300">|</span>
            <a href="tel:1666-6675" className="text-[#0052CC] font-bold">
              1666-6675
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
