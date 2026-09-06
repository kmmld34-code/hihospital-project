"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { GEM_HERO_SLIDES, GemSlideItem } from "@/data/hospitalData";
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight, Sparkles } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_HeroCarousel] 최상단 인터랙티브 캐러셀 슬라이더
 * ==============================================================================
 * - 규칙: 1400px 컨테이너 내부 중앙 정렬 (max-w-[1400px] mx-auto)
 * - 인터랙션 스펙:
 *   1) 7초(7,000ms) 주기 우에서 좌 자동 슬라이딩
 *   2) 마우스 오버 시 일시 정지(isPaused = true)
 *   3) 마우스 아웃 시 자동 재생 재개(isPaused = false)
 *   4) 슬라이드 전체 및 내부 CTA 버튼 클릭 시 해당 링크 이동
 * - 접두어: Gem_ 접두사 엄수
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

  // 다음 슬라이드로 이동
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // 이전 슬라이드로 이동
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // 특정 슬라이드 번호로 점프
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // 7초 자동 롤링 및 일시정지 처리 이펙트
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    // 슬라이드 전환 타이머
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

  return (
    <section className="Gem_HeroSection w-full py-4 md:py-6">
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 메인 캐러셀 뷰포트 (마우스 오버 시 일시 정지) */}
        <div
          className="Gem_HeroSlider relative w-full h-[480px] sm:h-[540px] md:h-[600px] lg:h-[640px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 group select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* 슬라이드 4개 렌더링 (우에서 좌로 전환되는 슬라이더) */}
          <div className="relative w-full h-full">
            {GEM_HERO_SLIDES.map((slide: GemSlideItem, index: number) => {
              const isActive = index === currentIndex;

              return (
                <div
                  key={slide.id}
                  className={`Gem_Slide absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                    isActive
                      ? "opacity-100 translate-x-0 z-10 pointer-events-auto"
                      : "opacity-0 translate-x-full z-0 pointer-events-none"
                  }`}
                >
                  {/* 배경 이미지 및 다크 오버레이 */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[7000ms]"
                    style={{
                      backgroundImage: `url(${slide.backgroundImage})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
                  </div>

                  {/* 슬라이드 내부 텍스트 콘텐츠 및 CTA 버튼 (클릭 가능) */}
                  <div className="relative z-20 h-full flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 max-w-3xl">
                    {/* 상단 뱃지 */}
                    <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full w-fit mb-4 sm:mb-6">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{slide.badge}</span>
                    </div>

                    {/* 메인 헤드라인 (텍스트 자체 클릭 가능) */}
                    <Link
                      href={slide.ctaLink}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight sm:leading-snug mb-4 sm:mb-6 hover:text-blue-200 transition-colors whitespace-pre-line"
                    >
                      {slide.headline}
                    </Link>

                    {/* 서브 설명 문구 */}
                    <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-8 max-w-xl font-normal leading-relaxed">
                      {slide.subheadline}
                    </p>

                    {/* CTA 버튼 링크 */}
                    <div className="flex items-center space-x-4">
                      <Link
                        href={slide.ctaLink}
                        className="Gem_HeroCtaBtn inline-flex items-center justify-center bg-[#0052CC] hover:bg-[#0043A6] text-white text-sm sm:text-base font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-0.5 group/btn"
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        href="/about/doctors"
                        className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 text-sm sm:text-base font-semibold px-6 py-3.5 rounded-full transition-all"
                      >
                        진료시간표 보기
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 좌우 내비게이션 화살표 컨트롤러 */}
          <button
            onClick={prevSlide}
            aria-label="이전 슬라이드"
            className="Gem_SlidePrevBtn absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/30 hover:bg-[#0052CC] text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/10 opacity-75 hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="다음 슬라이드"
            className="Gem_SlideNextBtn absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/30 hover:bg-[#0052CC] text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/10 opacity-75 hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* 하단 인디케이터 및 진행 바 게이지 */}
          <div className="absolute bottom-6 sm:bottom-8 left-8 sm:left-16 z-30 flex items-center space-x-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {/* 페이지 번호 (예: 01 / 04) */}
            <span className="text-xs font-mono font-bold text-white">
              0{currentIndex + 1} <span className="text-slate-500">/ 0{totalSlides}</span>
            </span>

            {/* 게이지 바 */}
            <div className="w-20 sm:w-28 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0052CC] transition-all duration-100 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* 개별 슬라이드 도트 */}
            <div className="flex space-x-1.5">
              {GEM_HERO_SLIDES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => goToSlide(dotIdx)}
                  aria-label={`슬라이드 ${dotIdx + 1}번으로 이동`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    dotIdx === currentIndex
                      ? "w-5 bg-white"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            {/* 재생 / 일시정지 토글 버튼 */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "자동 재생 재개" : "일시 정지"}
              className="text-white hover:text-blue-300 transition-colors p-1"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
