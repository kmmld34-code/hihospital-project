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
import { GEM_EXTENDED_NAV_ITEMS, NavItem } from "@/data/navigationData";

/**
 * ==============================================================================
 * [Gem_Header] 글로벌 헤더 네비게이션 컴포넌트
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM, 정재이 과장 (UI/UX)
 * 아키텍처 및 보안 감수: 박동훈 차장, 최우진 대리
 * ==============================================================================
 * [2026-09-16 브레인스토밍 회의 5대 채택 사양 반영]
 * 1. 최상단 탑 유틸리티 바:
 *    - 좌측 슬로건 우측에 은은한 연회색 알약(Pill-box) 인라인 검색창 배치
 * 2. GNB 메뉴바 가로폭 최적화 & 원-투 펀치 버튼 체계:
 *    - '특화' 뱃지 제거로 여백 확보
 *    - [▦ 전체메뉴] (슬레이트 그레이 아웃라인 고스트 버튼)
 *    - [진료예약] (병원 대표 브랜드 블루 #0052CC 솔리드 강조 버튼)
 * 3. 인터랙티브 플로팅 모핑 팝오버 (Stripe/Apple 스타일):
 *    - 가변형 1~3열 와이드 레이아웃 (질환 리스트 + 큐레이션 배너 카드)
 *    - 투명 호버 브릿지(Hover Bridge) 탑재로 대각선 마우스 빗나감 방지
 * 4. 상단 슬라이드 다운 메가 드로어 (Slide-down Mega Drawer):
 *    - [▦ 전체메뉴] 클릭 시 헤더 직하단에서 스르륵 열리는 종합 사이트맵 뷰
 * 5. 모바일 반응형 햄버거 메뉴 완벽 호환
 * ==============================================================================
 */

export default function Gem_Header() {
  const router = useRouter();

  // 1. 상태 관리 (State Management)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null); // 호버 중인 1Depth 메뉴 ID
  const [isMegaDrawerOpen, setIsMegaDrawerOpen] = useState<boolean>(false); // 전체메뉴 드로어 열림 여부
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false); // 모바일 메뉴 토글
  const [searchQuery, setSearchQuery] = useState<string>(""); // 최상단 검색어
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>("spine"); // 모바일 아코디언 열림 메뉴

  // 2. 호버 딜레이 타이머 참조 (Hover Intent - 마우스 빗나감 방지용)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 마우스가 메뉴 탭 또는 팝오버에 진입했을 때
  const handleMouseEnter = (menuId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveMenuId(menuId);
  };

  // 마우스가 메뉴 영역을 벗어났을 때 (0.15초 딜레이 후 닫아 급작스러운 깜빡임 방지)
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 150);
  };

  // 통합 검색 제출 핸들러 (질환명 및 진료과 검색)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // 검색 결과 페이지로 라우팅
    router.push(`/community/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  // 전체메뉴 드로어 토글
  const toggleMegaDrawer = () => {
    setIsMegaDrawerOpen((prev) => !prev);
    setActiveMenuId(null); // 드로어 열릴 땐 개별 팝오버 닫기
  };

  // ESC 키 누르면 열린 드로어나 팝오버 닫기
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

  // 현재 활성화된 메뉴 데이터 객체 추출
  const currentActiveItem = GEM_EXTENDED_NAV_ITEMS.find((item) => item.id === activeMenuId);

  return (
    <header className="Gem_Header w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      {/* ============================================================================== */}
      {/* 1. 최상단 탑 유틸리티 바 (전체 너비 Full-width, 내부 max-w-[1400px] 중앙 정렬) */}
      {/* ============================================================================== */}
      <div className="Gem_HeaderTopUtility w-full bg-[#F8FAFC] border-b border-slate-200 text-xs sm:text-[13px] text-slate-500 hidden md:block">
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4">
          {/* 좌측 슬로건 및 알약형(Pill-box) 통합 검색창 직결 */}
          <div className="flex items-center gap-3 lg:gap-4 flex-1">
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium whitespace-nowrap hidden lg:inline-block">
              척추 · 관절 · 통증 전문 치료 인천하이병원
            </span>

            {/* [아이디어 회의 KEEP-05 채택] 은은한 연회색 알약형 통합 검색창 */}
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

          {/* 우측 유틸리티 링크 및 고객센터 직통전화 */}
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
            {/* 사용자 마이페이지 아이콘 */}
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
      {/* 2. 메인 GNB 헤더 (로고, 11개 메뉴 탭, 원-투 펀치 버튼) */}
      {/* ============================================================================== */}
      <div className="Gem_HeaderNavWrapper w-full relative">
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[74px] sm:h-[78px] flex items-center justify-between gap-3 lg:gap-5">
          {/* 로고 영역 */}
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

          {/* 데스크톱 메뉴바 (11개 1Depth 메뉴 - '특화' 뱃지 제거 및 여백 최적화) */}
          <nav 
            className="Gem_HeaderDesktopNav hidden xl:flex items-center gap-3.5 lg:gap-4.5 2xl:gap-5.5 h-full"
            onMouseLeave={handleMouseLeave}
          >
            {GEM_EXTENDED_NAV_ITEMS.map((item) => {
              const isActive = activeMenuId === item.id;
              return (
                <div
                  key={item.id}
                  className="h-full flex items-center relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                >
                  <Link
                    href={item.href}
                    className={`Gem_NavItem text-[15px] font-bold py-2 transition-all inline-flex items-center gap-1 group relative ${
                      isActive ? "text-[#0052CC]" : "text-slate-700 hover:text-[#0052CC]"
                    }`}
                  >
                    <span>{item.name}</span>
                    {/* 호버 시 하단 언더라인 인디케이터 */}
                    <span 
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#0052CC] transition-all duration-200 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`} 
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* 우측 CTA 영역 (원-투 펀치 버튼: [▦ 전체메뉴] + [진료예약]) */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* [아이디어 회의 KEEP-02 채택] [▦ 전체메뉴] 슬레이트 그레이 아웃라인 고스트 버튼 */}
            <button
              type="button"
              onClick={toggleMegaDrawer}
              className={`Gem_AllMenuBtn hidden lg:inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold px-3.5 py-2 rounded-lg border transition-all ${
                isMegaDrawerOpen
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-white text-slate-700 border-slate-300 hover:border-[#0052CC] hover:text-[#0052CC] hover:bg-slate-50"
              }`}
              aria-label="전체메뉴 열기/닫기"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>전체메뉴</span>
            </button>

            {/* [아이디어 회의 KEEP-02/03 채택] [진료예약] 병원 대표 블루 솔리드 강조 버튼 */}
            <Link
              href="/appointments"
              className="Gem_HeaderCta inline-flex items-center gap-1.5 bg-[#0052CC] hover:bg-[#0043A6] text-white text-xs sm:text-[13px] font-bold px-4 sm:px-5 py-2 rounded-full shadow-[0_3px_12px_rgba(0,82,204,0.25)] transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
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
        {/* 3. [아이디어 회의 KEEP-01 채택] Stripe/Apple 스타일 플로팅 모핑 팝오버 */}
        {/* ============================================================================== */}
        {activeMenuId && currentActiveItem && !isMegaDrawerOpen && (
          <div
            className="absolute top-full left-0 w-full pt-1 pointer-events-auto z-40 hidden xl:block animate-in fade-in zoom-in-95 duration-150"
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {/* 투명 호버 브릿지 역할을 겸하는 여백 컨테이너 */}
            <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
              <div 
                className={`bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 p-6 transition-all duration-200 ${
                  currentActiveItem.columns.length >= 3 
                    ? "w-[840px]" 
                    : currentActiveItem.columns.length === 2 
                    ? "w-[680px]" 
                    : "w-[520px]"
                }`}
              >
                <div className="flex gap-6">
                  {/* 좌측 1~3열 질환 및 시술 목록 */}
                  <div className={`grid gap-6 flex-1 ${
                    currentActiveItem.columns.length >= 3 
                      ? "grid-cols-3" 
                      : currentActiveItem.columns.length === 2 
                      ? "grid-cols-2" 
                      : "grid-cols-1"
                  }`}>
                    {currentActiveItem.columns.map((col, idx) => (
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

                  {/* 우측 큐레이션 배너 카드 (정재이 과장안 반영) */}
                  {currentActiveItem.curation && (
                    <div className="w-[220px] bg-gradient-to-br from-[#F4F8FF] to-[#EBF3FF] border border-[#D6E6FF] rounded-xl p-4 flex flex-col justify-between flex-shrink-0">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0052CC] mb-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{currentActiveItem.curation.badge || "특화 안내"}</span>
                        </div>
                        <h4 className="text-[14px] font-black text-slate-900 leading-snug mb-1.5">
                          {currentActiveItem.curation.title}
                        </h4>
                        <p className="text-[12px] text-slate-600 leading-relaxed">
                          {currentActiveItem.curation.description}
                        </p>
                      </div>

                      <Link
                        href={currentActiveItem.curation.href}
                        onClick={() => setActiveMenuId(null)}
                        className="mt-4 inline-flex items-center justify-between w-full px-3 py-2 bg-white hover:bg-[#0052CC] text-[#0052CC] hover:text-white rounded-lg text-xs font-bold transition-all shadow-sm group/cur"
                      >
                        <span>{currentActiveItem.curation.actionText}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/cur:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================================== */}
      {/* 4. [아이디어 회의 KEEP-04 채택] 상단 슬라이드 다운 메가 드로어 (Slide-down Drawer) */}
      {/* ============================================================================== */}
      {isMegaDrawerOpen && (
        <div className="Gem_MegaDrawerWrapper w-full bg-white border-b border-slate-200 shadow-2xl animate-in slide-in-from-top-4 duration-200 z-50">
          <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* 드로어 탑 헤더 (타이틀 및 닫기 버튼) */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0052CC]/10 text-[#0052CC] flex items-center justify-center">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">전체 사이트맵 (SiteMap)</h3>
                  <p className="text-xs text-slate-500">인천하이병원의 11개 진료과 및 세부 질환 클리닉을 한눈에 확인하세요.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMegaDrawerOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                <span>닫기</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 11개 진료과 바둑판(Grid) 전체 뷰 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {GEM_EXTENDED_NAV_ITEMS.map((nav) => (
                <div key={nav.id} className="space-y-3">
                  <Link
                    href={nav.href}
                    onClick={() => setIsMegaDrawerOpen(false)}
                    className="inline-flex items-center gap-1 text-[14px] font-black text-[#071E54] hover:text-[#0052CC] border-b-2 border-slate-100 hover:border-[#0052CC] pb-1 transition-all"
                  >
                    <span>{nav.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>

                  <ul className="space-y-1.5">
                    {nav.columns.flatMap((col) => col.items).map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMegaDrawerOpen(false)}
                          className="text-[12.5px] text-slate-600 hover:text-[#0052CC] hover:font-bold transition-all block py-0.5"
                        >
                          • {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 드로어 하단 퀵 링크 바 */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-500 bg-[#F8FAFC] -mx-4 -mb-8 px-8 py-4 rounded-b-xl">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Clock className="w-4 h-4 text-[#0052CC]" />
                  <span>진료시간: 평일 09:00 ~ 18:00 (토요일 09:00 ~ 13:00)</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-slate-700">
                  <MapPin className="w-4 h-4 text-[#0052CC]" />
                  <span>위치: 인천광역시 계양구 계양대로 140</span>
                </div>
              </div>
              <div className="flex items-center gap-3 font-bold">
                <Link
                  href="/about/directions"
                  onClick={() => setIsMegaDrawerOpen(false)}
                  className="text-slate-600 hover:text-[#0052CC]"
                >
                  오시는 길 안내 ➔
                </Link>
                <span className="text-slate-300">|</span>
                <Link
                  href="/appointments"
                  onClick={() => setIsMegaDrawerOpen(false)}
                  className="text-[#0052CC] hover:underline"
                >
                  온라인 간편예약 바로가기 ➔
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 전체메뉴 드로어 열렸을 때 뒷배경 딤드 오버레이 */}
      {isMegaDrawerOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-30 animate-in fade-in duration-200"
          onClick={() => setIsMegaDrawerOpen(false)}
        />
      )}

      {/* ============================================================================== */}
      {/* 5. 모바일 전용 드롭다운 메뉴 (반응형 지원 & 아코디언 탐색) */}
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
