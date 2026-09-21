"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";

/**
 * ==============================================================================
 * [The LSK] 서브페이지 공통 상단 헤더 & 수평 서브메뉴 탭 바 (Gem_SubPageHeader.tsx)
 * ==============================================================================
 * 기획 및 수정: 강수진 실장 (PM), 정재이 과장 (UI/UX)
 * 
 * [대표님 피드백 반영 개선 사항]
 *  1. 타이틀 섹션 높이 150% 확장:
 *     - 기존 콤팩트한 패딩에서 pt-20 pb-24 (대화면 lg:pt-24 lg:pb-28)로 대폭 넓혀 웅장한 공간감 확보
 *  2. 타이틀 & 서브 설명문 수평 2-Column 재배치:
 *     - '병원소개' 메인 타이틀 우측으로 설명문구를 이동하여, 
 *       텍스트 크기를 키우고(text-lg ~ text-xl) 2~3줄의 여유로운 라인으로 시원하게 가독성 극대화
 *  3. 우측 시각 일러스트/아이콘 배치:
 *     - 서브페이지 테마에 맞는 메디컬 3D 엠블럼/일러스트 그래픽을 배치하여 감각적인 비주얼 완성도 부여
 *  4. 상단 연결 일체형 탭 박스 유지:
 *     - Breadcrumb 경로 및 하단 수평 서브메뉴 탭 바의 자연스러운 연결감 유지
 * ==============================================================================
 */

export interface SubPageTabItem {
  name: string;
  href: string;
  badge?: string;
}

export interface GemSubPageHeaderProps {
  // 대메뉴 제목 (예: "병원소개")
  categoryTitle: string;
  // 영문 서브 타이틀 (예: "ABOUT INCHEON HI HOSPITAL")
  categorySubTitle?: string;
  // 설명 문구 (예: "정확한 진단과 따뜻한 소통으로, \n몸의 불편 뿐 아니라 마음의 걱정까지 \n덜어드리는 인천하이병원입니다.")
  description?: string;
  // 현재 활성화된 페이지 경로 (예: "/about/greeting")
  currentHref: string;
  // 현재 경로 단계 목록 (예: [{ label: "병원소개", href: "/about" }, { label: "인사말", href: "/about/greeting" }])
  breadcrumbs: { label: string; href?: string }[];
  // 동일 뎁스 수평 탭 메뉴 목록
  tabItems: SubPageTabItem[];
  // 우측에 들어갈 커스텀 일러스트/이미지 경로 (기본값: /images/subpage_medical_icon.jpg)
  rightGraphicSrc?: string;
}

export default function Gem_SubPageHeader({
  categoryTitle,
  categorySubTitle = "INCHEON HI HOSPITAL",
  description = "정확한 진단과 따뜻한 소통으로,\n몸의 불편 뿐 아니라 마음의 걱정까지\n덜어드리는 인천하이병원입니다.",
  currentHref,
  breadcrumbs,
  tabItems,
  rightGraphicSrc = "/images/subpage_medical_icon.jpg",
}: GemSubPageHeaderProps) {
  return (
    <div className="w-full bg-white border-b border-gem-border">
      {/* 1. 상단 서브 비주얼 & 타이틀 영역 (기존 대비 150% 높이 확장 + 딥네이비 그라디언트) */}
      <div className="relative w-full bg-gradient-to-br from-[#051640] via-[#071E54] to-[#0052CC] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 overflow-hidden">
        {/* 은은한 앰비언트 빛망울 배경 */}
        <div 
          className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-[#00A8B5]/25 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#0052CC]/35 blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
        {/* 미세한 그리드 텍스처 패턴 */}
        <div 
          className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" 
          aria-hidden="true" 
        />

        {/* 1400px 중앙 정렬 컨테이너 */}
        <div className="Gem_Container relative z-10">
          {/* 상단 Breadcrumb (현재 위치 경로 안내) */}
          <nav 
            className="flex items-center gap-1.5 text-xs sm:text-sm text-blue-200/80 mb-6" 
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
                  <ChevronRight className="w-3.5 h-3.5 text-blue-300/60 flex-shrink-0" />
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

          {/* 메인 타이틀 + 우측 확장 카피 + 우측 일러스트 아이콘 (3단 플렉스/그리드) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
            {/* 좌측 & 중앙 그룹 */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 lg:gap-10 max-w-4xl">
              {/* 대분류 타이틀 영역 */}
              <div className="flex-shrink-0">
                {categorySubTitle && (
                  <p className="text-xs sm:text-sm tracking-widest font-semibold uppercase text-[#00A8B5] mb-2">
                    {categorySubTitle}
                  </p>
                )}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                  {categoryTitle}
                </h1>
              </div>

              {/* 세로 구분선 (태블릿/PC에서만 표시) */}
              <div className="hidden md:block w-px h-20 bg-blue-300/30 flex-shrink-0" aria-hidden="true" />

              {/* 우측으로 이동된 2~3줄 확장 카피 문구 (큰 글씨) */}
              <div className="text-base sm:text-lg lg:text-xl text-blue-100/95 font-medium leading-relaxed whitespace-pre-line">
                {description}
              </div>
            </div>

            {/* 우측: 서브페이지 전용 일러스트/아이콘 그래픽 (원형 글래스모피즘 카드) */}
            <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
              <div className="relative w-32 h-32 xl:w-36 xl:h-36 rounded-2xl overflow-hidden p-2 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl group hover:scale-105 transition-transform duration-500">
                <Image
                  src={rightGraphicSrc}
                  alt={`${categoryTitle} 일러스트 심볼`}
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
                {/* 외곽 은은한 글로우 링 */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 상단 헤더와 바로 맞닿아 연결된 수평 탭 박스 (Horizontal Sub-Nav Bar) */}
      <div className="w-full bg-white shadow-sm border-b border-slate-200">
        <div className="Gem_Container">
          {/* 모바일 가로 스크롤을 지원하는 탭 목록 래퍼 */}
          <div className="flex items-center overflow-x-auto no-scrollbar scroll-smooth py-1.5">
            <nav className="flex items-center gap-1.5 sm:gap-2 min-w-max py-2" aria-label="서브 카테고리 메뉴">
              {tabItems.map((tab) => {
                const isActive = currentHref === tab.href;

                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`relative flex items-center justify-center px-5 sm:px-7 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-gem-primary text-white shadow-md shadow-gem-primary/30 font-bold"
                        : "text-slate-600 hover:text-gem-primary hover:bg-slate-100/80 bg-slate-50/70"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{tab.name}</span>

                    {/* 뱃지가 있을 경우 표시 */}
                    {tab.badge && (
                      <span
                        className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gem-primaryLight text-gem-primary"
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
    </div>
  );
}
