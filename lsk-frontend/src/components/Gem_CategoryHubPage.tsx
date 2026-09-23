"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CATEGORY_HUB_DATA, CategoryHubInfo, HubItem } from "@/data/categoryHubData";
import { GEM_EXTENDED_NAV_ITEMS } from "@/data/navigationData";
import Gem_ScrollReveal from "@/components/Gem_ScrollReveal";

/**
 * ==============================================================================
 * [인천하이병원] 카테고리 대표 메인 허브(Hub) 컴포넌트 (Gem_CategoryHubPage.tsx)
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 디자인/기획 감수: 강수진 실장 (PM)
 *
 * [핵심 기능]
 * 1. 대메뉴(1Depth) 진입 시 해당 센터의 서브메뉴 전체를 요약 브리핑
 * 2. 상단 스티키(Sticky) 가로 서브메뉴 탭 바 제공 (원클릭 부드러운 스크롤 이동)
 * 3. 텍스트 박스와 비주얼 카드가 좌/우 교차(지그재그)로 배치되는 현대적 레이아웃
 * 4. 스크롤 위치에 따라 좌/우에서 매끄럽게 등장하는 Slide-In 인터랙션 탑재
 * 5. 각 질환별 "상세보기 / 질환 안내 ➔" 버튼을 통해 2Depth 서브페이지로 즉시 이동
 * ==============================================================================
 */

interface GemCategoryHubPageProps {
  categoryId: string; // 예: 'neurosurgery', 'spine', 'knee-hip', 'about' 등
}

export default function Gem_CategoryHubPage({ categoryId }: GemCategoryHubPageProps) {
  // 현재 카테고리의 허브 데이터 가져오기
  const hubData: CategoryHubInfo | undefined = CATEGORY_HUB_DATA[categoryId];
  // 네비게이션 데이터에서 해당 카테고리 정보 조회
  const navItem = GEM_EXTENDED_NAV_ITEMS.find((item) => item.id === categoryId);

  // 활성화된 탭 상태
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (hubData && hubData.items.length > 0) {
      setActiveTab(hubData.items[0].id);
    }
  }, [hubData]);

  // 카테고리 데이터가 존재하지 않을 때 안내
  if (!hubData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">진료과 정보를 불러오는 중입니다</h2>
        <p className="text-gray-500 mb-6">요청하신 진료센터 정보가 준비 중이거나 올바르지 않습니다.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#006699] text-white font-medium rounded-lg hover:bg-[#004d73] transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  // 부드러운 스크롤 이동 함수
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      const yOffset = -140; // 스티키 헤더 및 탭 높이 고려한 오프셋
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // 아이콘 렌더링 헬퍼
  const renderThemeIcon = (type: HubItem["iconType"]) => {
    switch (type) {
      case "brain":
        return (
          <svg className="w-8 h-8 text-[#006699]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case "spine":
        return (
          <svg className="w-8 h-8 text-[#006699]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v16m-4-12h8m-6 4h4m-6 4h8" />
          </svg>
        );
      case "joint":
        return (
          <svg className="w-8 h-8 text-[#006699]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "surgery":
        return (
          <svg className="w-8 h-8 text-[#006699]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.828 2.828a2 2 0 01-2.828 0l-1.414-1.414a2 2 0 010-2.828L12 5" />
          </svg>
        );
      case "medical":
        return (
          <svg className="w-8 h-8 text-[#006699]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case "checkup":
        return (
          <svg className="w-8 h-8 text-[#006699]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "women":
        return (
          <svg className="w-8 h-8 text-[#006699]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v10m-3-3h6m-3 3a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-[#006699]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] text-gray-800 pb-24">
      {/* =========================================================================
          1. Hero Header 섹션 (센터 소개 및 신뢰 지표)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0c2340] via-[#12365a] to-[#006699] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        {/* 배경 은은한 격자 패턴 */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Gem_ScrollReveal direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-sky-200 tracking-wider uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              {hubData.badge}
            </div>
          </Gem_ScrollReveal>

          <Gem_ScrollReveal direction="up" delay={0.1} duration={0.7}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <p className="text-sm sm:text-base font-medium text-sky-200 tracking-widest uppercase mb-1">
                  {hubData.englishTitle}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {hubData.title}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-sky-100 max-w-2xl font-normal leading-relaxed">
                  {hubData.slogan}
                </p>
              </div>

              {/* 센터 신뢰 지표 3종 */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 max-w-lg w-full">
                {hubData.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-xs text-sky-200 font-medium mb-1">{stat.label}</p>
                    <p className="text-sm sm:text-base font-bold text-white tracking-tight">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Gem_ScrollReveal>

          <Gem_ScrollReveal direction="up" delay={0.2} duration={0.8}>
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-sm text-sky-100">
              <p className="leading-relaxed max-w-3xl">{hubData.description}</p>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-white">진료과 전체 {hubData.items.length}개 세부 클리닉 운영 중</span>
              </div>
            </div>
          </Gem_ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          2. 가로 서브메뉴 스티키 탭 바 (Sticky Horizontal Submenu Bar)
          ========================================================================= */}
      <nav aria-label="서브메뉴 바로가기" className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3.5 scrollbar-none">
            <span className="text-xs font-bold text-gray-500 whitespace-nowrap mr-2 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#006699]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              주요 질환 바로가기:
            </span>
            {hubData.items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === item.id
                    ? "bg-[#006699] text-white shadow-sm font-semibold scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeTab === item.id
                        ? "bg-white/20 text-white"
                        : "bg-sky-100 text-[#006699]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* =========================================================================
          3. 지그재그(Alternating) 질환 및 서브메뉴 리스트 섹션
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Gem_ScrollReveal direction="up" duration={0.6}>
            <span className="text-xs font-bold text-[#006699] tracking-widest uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              CLINICAL SPECIALTY OVERVIEW
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3 tracking-tight">
              {hubData.title} 세부 클리닉 안내
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              증상별 맞춤 진단과 비수술 우선 원칙의 차별화된 치료법을 한눈에 확인하실 수 있습니다.
            </p>
          </Gem_ScrollReveal>
        </div>

        {/* 지그재그 카드 반복 */}
        <div className="space-y-16 lg:space-y-24">
          {hubData.items.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                id={`section-${item.id}`}
                className="scroll-mt-36"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* =========================================================
                      A. 텍스트 정보 카드
                      ========================================================= */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Gem_ScrollReveal
                      direction={isEven ? "right" : "left"}
                      duration={0.7}
                      delay={0.1}
                    >
                      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-150 hover:shadow-md transition-shadow">
                        {/* 상단 뱃지 & 영문명 */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-[#006699] border border-sky-100">
                            {item.badge}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">
                            {item.englishTitle}
                          </span>
                        </div>

                        {/* 질환 한글명 및 슬로건 */}
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-base font-semibold text-[#006699] mt-2 mb-4">
                          “{item.tagline}”
                        </p>

                        {/* 친절한 상세 설명 */}
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                          {item.description}
                        </p>

                        {/* 주요 의심 증상 체크박스 */}
                        <div className="bg-[#f8fafc] rounded-2xl p-4 sm:p-5 border border-gray-100 mb-6">
                          <p className="text-xs font-bold text-gray-700 tracking-wide uppercase mb-3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            이런 증상이 있다면 의심해 보세요
                          </p>
                          <ul className="space-y-2">
                            {item.symptoms.map((symptom, sIdx) => (
                              <li
                                key={sIdx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700"
                              >
                                <svg
                                  className="w-4 h-4 text-[#006699] flex-shrink-0 mt-0.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>{symptom}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 추천 검사 및 치료 태그 */}
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                          <span className="text-xs font-bold text-gray-500 mr-1">
                            주요 치료:
                          </span>
                          {item.treatments.map((tr, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                            >
                              #{tr}
                            </span>
                          ))}
                        </div>

                        {/* 상세 페이지 이동 CTA 버튼 */}
                        <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                          <span className="text-xs text-gray-400">
                            원인별 정밀 진단 및 단계별 맞춤 치료법 안내
                          </span>
                          <Link
                            href={item.href}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006699] text-white text-xs sm:text-sm font-semibold hover:bg-[#004d73] hover:shadow-md transition-all group"
                          >
                            <span>자세히 보기</span>
                            <svg
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </Gem_ScrollReveal>
                  </div>

                  {/* =========================================================
                      B. 비주얼 임상 카드 (과도한 그래픽 대신 세련된 정보 카드)
                      ========================================================= */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Gem_ScrollReveal
                      direction={isEven ? "left" : "right"}
                      duration={0.7}
                      delay={0.2}
                    >
                      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-sky-50/50 to-sky-100/40 p-8 border border-sky-100 shadow-sm">
                        {/* 배경 은은한 원형 블러 */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-sky-200/40 blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col justify-between h-full min-h-[320px]">
                          {/* 상단 테마 아이콘 & 순번 */}
                          <div className="flex items-center justify-between">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-sky-100 flex items-center justify-center">
                              {renderThemeIcon(item.iconType)}
                            </div>
                            <span className="text-3xl font-black text-sky-900/15 tracking-tighter">
                              0{index + 1}
                            </span>
                          </div>

                          {/* 중간 임상 강점 포인트 */}
                          <div className="my-6">
                            <p className="text-xs font-bold text-[#006699] uppercase tracking-wider mb-2">
                              HI HOSPITAL CLINICAL ADVANTAGE
                            </p>
                            <h4 className="text-xl font-bold text-gray-900 leading-snug">
                              환자 중심의<br />
                              <span className="text-[#006699]">1:1 전담 맞춤 진료 솔루션</span>
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                              최신 3.0T MRI 영상 정밀 분석과 전문의의 세심한 진료를 바탕으로 꼭 필요한 치료만을 권해드립니다.
                            </p>
                          </div>

                          {/* 하단 미니 혜택 배지 2종 */}
                          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-sky-100">
                            <div className="bg-white/80 rounded-xl p-3 border border-sky-100 text-center">
                              <p className="text-[11px] text-gray-500">원스톱 시스템</p>
                              <p className="text-xs font-bold text-gray-800">당일 정밀 진단</p>
                            </div>
                            <div className="bg-white/80 rounded-xl p-3 border border-sky-100 text-center">
                              <p className="text-[11px] text-gray-500">진료 철학</p>
                              <p className="text-xs font-bold text-gray-800">비수술 우선 원칙</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Gem_ScrollReveal>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. 하단 빠른 진료 예약 & 온라인 상담 CTA 배너
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <Gem_ScrollReveal direction="up" duration={0.7}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0c2340] to-[#006699] text-white p-8 sm:p-12 shadow-lg">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 border border-white/20">
                  신속하고 정확한 1:1 환자 맞춤 상담
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  통증이나 증상으로 고민 중이신가요?
                </h3>
                <p className="text-sm sm:text-base text-sky-100 mt-2 max-w-xl">
                  인천하이병원의 11인 분야별 전문의가 따뜻하고 정직하게 진료해 드립니다.
                  비회원도 간편하게 온라인 상담을 남기실 수 있습니다.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <Link
                  href="/community/inquiry"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#006699] font-bold text-sm hover:bg-sky-50 shadow-sm transition-colors text-center"
                >
                  온라인 문의 남기기
                </Link>
                <Link
                  href="/about/hours"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-sky-700/60 hover:bg-sky-700 text-white font-medium text-sm border border-white/20 transition-colors text-center"
                >
                  진료시간 확인
                </Link>
              </div>
            </div>
          </div>
        </Gem_ScrollReveal>
      </section>
    </div>
  );
}
