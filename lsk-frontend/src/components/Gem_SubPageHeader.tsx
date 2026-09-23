"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

/**
 * ==============================================================================
 * [The LSK] 서브페이지 공통 상단 헤더 & 수평 서브메뉴 탭 바 (Gem_SubPageHeader.tsx)
 * ==============================================================================
  *  1. 배경 그라데이션 제거 ➔ 단색 #062667 (미드나잇 딥네이비) 적용
 *  2. 우측 3D 그래픽 심볼 완전 제거 ➔ 텍스트 중심의 여백과 웅장한 가독성 확보
 * ==============================================================================
 */

export interface SubPageTabItem {
  name: string;
  href: string;
  badge?: string;
}

export interface GemSubPageHeaderProps {
  categoryTitle: string;
  categorySubTitle?: string;
  description?: string;
  currentHref: string;
  breadcrumbs: { label: string; href?: string }[];
  tabItems: SubPageTabItem[];
  rightGraphicSrc?: string; // 인터페이스 호환성 유지
}

export default function Gem_SubPageHeader({
  categoryTitle,
  categorySubTitle = "INCHEON HI HOSPITAL",
  description = "정확한 진단과 따뜻한 소통으로,\n몸의 불편 뿐 아니라 마음의 걱정까지\n덜어드리는 인천하이병원입니다.",
  currentHref,
  breadcrumbs,
  tabItems,
}: GemSubPageHeaderProps) {
  return (
    <div className="w-full bg-white border-b border-gem-border">
      {/* 1. 상단 서브 비주얼 & 타이틀 영역 (단색 #062667 적용 및 불필요한 그래픽 제거) */}
      <div className="relative w-full bg-[#062667] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 overflow-hidden">
        {/* 미세한 그리드 텍스처 패턴만 살려 깊이감 부여 */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" 
          aria-hidden="true" 
        />

        {/* 1400px 중앙 정렬 컨테이너 */}
        <div className="Gem_Container relative z-10">
          {/* 상단 Breadcrumb (현재 위치 경로 안내) */}
          <nav 
            className="flex items-center gap-1.5 text-xs sm:text-sm text-blue-200/90 mb-8" 
            aria-label="Breadcrumb"
          >
            <Link 
              href="/" 
              className="flex items-center gap-1 hover:text-white transition-colors duration-150"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only sm:not-sr-only">홈</span>
            </Link>

            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-300/70 flex-shrink-0" />
                  {isLast || !crumb.href ? (
                    <span className="text-white font-medium truncate">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link 
                      href={crumb.href} 
                      className="hover:text-white transition-colors duration-150 truncate"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* 메인 타이틀 + 우측 확장 카피 (3D 이미지 제거로 시원하게 펼쳐지는 여백과 타이포그래피) */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 sm:gap-8 lg:gap-12">
            {/* 대분류 타이틀 영역 */}
            <div className="flex-shrink-0">
              {categorySubTitle && (
                <p className="text-xs sm:text-sm tracking-widest font-semibold uppercase text-sky-300 mb-2">
                  {categorySubTitle}
                </p>
              )}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                {categoryTitle}
              </h1>
            </div>

            {/* 세로 구분선 (태블릿/PC에서만 표시) */}
            <div className="hidden md:block w-px h-20 bg-white/25 flex-shrink-0" aria-hidden="true" />

            {/* 설명 카피 문구 (큰 글씨 & 여유로운 줄간격) */}
            <div className="text-base sm:text-lg lg:text-xl text-white/95 font-normal leading-relaxed whitespace-pre-line max-w-4xl">
              {description}
            </div>
          </div>
        </div>
      </div>

      {/* 2. 상단 헤더와 바로 맞닿아 연결된 2단 반응형 탭 박스 (스크롤바 없이 깔끔한 2단 배치) */}
      <div className="w-full bg-white shadow-sm border-b border-slate-200">
        <div className="Gem_Container py-3 sm:py-4">
          <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5" aria-label="서브 카테고리 메뉴">
            {tabItems.map((tab) => {
              const isActive = currentHref === tab.href;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`relative flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                    isActive
                      ? "bg-[#0C7657] text-white border-[#0C7657] shadow-sm font-bold"
                      : "bg-slate-50 hover:bg-slate-100/90 text-slate-700 hover:text-[#0C7657] border-slate-200/90"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{tab.name}</span>

                  {tab.badge && (
                    <span
                      className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-emerald-100 text-[#0C7657]"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
