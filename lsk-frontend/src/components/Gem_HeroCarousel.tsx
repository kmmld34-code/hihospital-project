"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { GEM_HERO_SLIDES, GemSlideItem } from "@/data/hospitalData";
import { ChevronLeft, ChevronRight, ArrowRight, Eye } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_HeroCarousel] 최상단 인터랙티브 엣지투엣지 캐러셀 배너 컴포넌트
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM
 * ==============================================================================
 * [주요 구현 사양]
 * 1. 엣지투엣지(Full-width) 배경:
 *    - 화면 전체를 아우르는 딥네이비(#071E54) 배경 및 하이테크 수술실 배경 이미지
 *    - 다채로운 그라데이션 오버레이로 텍스트 가독성 확보
 * 2. 내부 1400px 중앙 정렬 컨테이너:
 *    - 모든 카테고리 뱃지, 헤드라인, 액션 버튼, 슬라이드 게이지는 max-w-[1400px] mx-auto 엄수
 * 3. 사용자 인터랙션:
 *    - 7초(7,000ms) 주기 우에서 좌로 자동 슬라이딩
 *    - 마우스 오버(Hover) 시 슬라이더 자동 회전 일시 정지(Pause)
 *    - 좌우 큼직한 원형 백드롭 블러 네비게이션 버튼 제공
 *    - 하단 진행 게이지 바 실시간 동기화 (01 ~ 04)
 * ==============================================================================
 */
export default function Gem_HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 7000; // 7초 주기
  const totalSlides = GEM_HERO_SLIDES.length;

  // 다음 슬라이드로 이동 함수
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // 이전 슬라이드로 이동 함수
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // 7초 자동 롤링 및 일시정지 처리 이펙트
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    // 7초 슬라이드 전환 타이머
    timerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    // 하단 게이지 바 애니메이션 업데이트 (100ms마다 갱신)
    const step = 100;
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (step / SLIDE_DURATION) * 100;
      });
    }, step);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPaused, nextSlide]);

  const currentSlide: GemSlideItem = GEM_HERO_SLIDES[currentIndex];

  return (
    <section
      className="Gem_HeroCarousel w-full pb-4 select-none relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Full-width 엣지투엣지 배너 컨테이너 (최소 높이 600px ~ 620px) */}
      <div className="w-full relative bg-[#071E54] overflow-hidden min-h-[580px] sm:min-h-[620px] flex items-center">
        {/* 슬라이드별 배경 이미지 및 그라데이션 레이어 */}
        {GEM_HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* 배경 고화질 메디컬 이미지 */}
              <img
                src={slide.backgroundImage}
                alt={slide.headline}
                className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity transform scale-105 transition-transform duration-7000"
              />
              {/* 좌측 텍스트 영역을 어둡게 밝혀주는 딥네이비 선형 그라데이션 */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#071E54] via-[#071E54]/85 to-transparent" />
              {/* 비네팅 방사형 그림자 효과 */}
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60" />
            </div>
          );
        })}

        {/* 2. 큼직한 좌우 네비게이션 화살표 버튼 (배경 블러 처리, 양쪽 끝 배치) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="이전 슬라이드"
          className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-2xl cursor-pointer hover:scale-105"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="다음 슬라이드"
          className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-2xl cursor-pointer hover:scale-105"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        {/* 3. 1400px 중앙 정렬 메인 콘텐츠 영역 */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col justify-between min-h-[560px]">
          {/* 상단 뱃지 그룹 */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#0052CC]/40 backdrop-blur-md text-[#C4D2FF] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#87F3FF] animate-pulse" />
              {currentSlide.badge1}
            </span>
            <span className="inline-flex items-center text-[#87F3FF] text-xs sm:text-sm font-bold">
              {currentSlide.badge2}
            </span>
          </div>

          {/* 중앙 메인 타이틀 및 서브 카피 */}
          <div className="space-y-4 my-auto max-w-3xl py-6">
            <h1 className="text-white font-extrabold tracking-tight break-keep text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.25]">
              {currentSlide.headline.split("\n").map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <div className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed break-keep font-normal">
              <p>{currentSlide.subheadline}</p>
              {currentSlide.highlightText && (
                <p className="text-[#87F3FF] font-semibold mt-1">
                  {currentSlide.highlightText}
                </p>
              )}
            </div>

            {/* 메인 액션 버튼 그룹 */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={currentSlide.ctaLink}
                className="bg-[#0052CC] hover:bg-[#0043A6] text-white font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 hover:shadow-xl"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#facility-tour"
                className="bg-white/15 hover:bg-white/25 text-white backdrop-blur-md font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4 text-[#87F3FF]" />
                <span>자세히 보기</span>
              </a>
            </div>
          </div>

          {/* 하단 인디케이터 바 (01 --- 04 진행률 표시) */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4 text-white">
              <span className="font-extrabold tracking-widest text-[#87F3FF] text-sm sm:text-base">
                {currentSlide.order}
              </span>
              <div className="w-28 sm:w-36 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#87F3FF] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-slate-400 font-bold tracking-widest text-sm sm:text-base">
                {currentSlide.totalSlides}
              </span>
            </div>

            {/* 슬라이드 썸네일 네비게이션 점(Dot) */}
            <div className="flex items-center gap-2">
              {GEM_HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setProgress(0);
                  }}
                  aria-label={`슬라이드 ${idx + 1}번으로 이동`}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-8 bg-[#87F3FF]"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
