"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { GEM_HERO_SLIDES, GemSlideItem } from "@/data/hospitalData";
import { ChevronLeft, ChevronRight, ArrowRight, Eye } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_HeroCarousel] 최상단 엣지투엣지 무한 루프(Seamless Loop) 캐러셀 배너
 * ==============================================================================
 * 기획 및 모션 디자인: 정재이 과장 (Lead UI/UX Designer)
 * 무한 루프 알고리즘 구현: 고윤기 대리 (Frontend Lead Engineer)
 * 총괄 감독 및 배포: 강수진 실장 (Project Manager)
 * ==============================================================================
 * [핵심 구현 사양 및 무한 루프 아키텍처]
 * 1. 우측 ➜ 좌측 무한 슬라이드 (Seamless Infinite Loop):
 *    - 마지막 4번 슬라이드 후 1번으로 되감기(Rewind)되는 현상을 원천 차단.
 *    - [Clone Last, Slide 1, Slide 2, Slide 3, Slide 4, Clone First] 가상 복제본 트랙 구성.
 *    - 4번 ➜ 1번 복제본 이동 후 transitionEnd 이벤트에서 트랜지션 없이 실제 1번으로 순간 점프하여
 *      1-2-3-4-1-2-3-4... 무한 롤링이 물 흐르듯 자연스럽게 이어짐.
 * 2. 서브관리자(Admin) 동적 확장성 (Scalability):
 *    - 향후 관리자 단에서 슬라이드가 5장, 6장으로 늘어나도 배열 길이(totalSlides)를 자동 계산.
 *    - 인디케이터 숫자(01 --- 04 ➜ 01 --- 05) 및 닷 네비게이션이 100% 동적으로 자동 동기화.
 * 3. Next.js <Image> 컴포넌트 & LCP 최적화:
 *    - priority={true} 적용 및 WebP/AVIF 자동 변환 서빙.
 * 4. 사용자 편의 인터랙션:
 *    - 7초 주기 자동 슬라이딩, 마우스 오버(Hover) 시 회전 일시 정지.
 * ==============================================================================
 */
export default function Gem_HeroCarousel() {
  const slides = GEM_HERO_SLIDES;
  const totalSlides = slides.length; // 동적 슬라이드 개수 (관리자 페이지 연동 준비)

  // 가상 복제본을 앞뒤로 추가한 확장 슬라이드 트랙 생성 (Seamless Infinite Loop 구조)
  // [마지막 복제본, 1번, 2번, 3번, 4번, 1번 복제본]
  const extendedSlides = [
    { ...slides[totalSlides - 1], uniqueKey: "clone-last" },
    ...slides.map((s, idx) => ({ ...s, uniqueKey: `real-${idx}` })),
    { ...slides[0], uniqueKey: "clone-first" },
  ];

  // 초기 위치는 1번째 실제 슬라이드 (index = 1)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 7000; // 7초 주기

  // 현재 사용자가 바라보고 있는 실제 슬라이드 번호 계산 (1 ~ totalSlides)
  const getRealSlideNumber = (): number => {
    if (currentIndex === 0) return totalSlides;
    if (currentIndex === extendedSlides.length - 1) return 1;
    return currentIndex;
  };

  const realNumber = getRealSlideNumber();

  // 다음 슬라이드로 우 ➜ 좌 이동
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    setProgress(0);
  }, []);

  // 이전 슬라이드로 좌 ➜ 우 이동
  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    setProgress(0);
  }, []);

  // 특정 슬라이드 번호로 바로가기 (하단 닷 클릭 시)
  const goToSlide = (realIdx: number) => {
    setIsTransitioning(true);
    setCurrentIndex(realIdx + 1);
    setProgress(0);
  };

  // 트랜지션 완료 시 무한 루프 순간 점프 처리 (되감기 현상 방지 핵심 로직)
  const handleTransitionEnd = () => {
    if (currentIndex === extendedSlides.length - 1) {
      // 1번 복제본에 도달한 직후 -> 애니메이션 끄고 실제 1번 슬라이드로 순간 이동
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      // 마지막 복제본에 도달한 직후 -> 애니메이션 끄고 실제 마지막 슬라이드로 순간 이동
      setIsTransitioning(false);
      setCurrentIndex(totalSlides);
    }
  };

  // 7초 자동 롤링 및 프로그레스 바 제어
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

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
    <section
      className="Gem_HeroCarousel w-full pb-4 select-none relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="인천하이병원 메인 히어로 배너 캐러셀"
    >
      {/* 1. Full-width 무한 슬라이딩 뷰포트 컨테이너 */}
      <div className="w-full relative bg-[#071E54] overflow-hidden min-h-[580px] sm:min-h-[620px] flex items-center">
        {/* 가로 슬라이더 트랙 (우측에서 좌측으로 연속 미끄러짐) */}
        <div
          className="flex w-full h-full"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning
              ? "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)"
              : "none",
          }}
        >
          {extendedSlides.map((slide, idx) => (
            <div
              key={slide.uniqueKey}
              className="w-full min-w-full flex-shrink-0 relative min-h-[580px] sm:min-h-[620px] flex items-center overflow-hidden"
            >
              {/* 슬라이드별 배경 고화질 이미지 */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.backgroundImage}
                  alt={slide.headline}
                  fill
                  priority={idx === 1} // 실제 1번 슬라이드 LCP 우선 로딩
                  sizes="100vw"
                  className="object-cover object-center opacity-40 mix-blend-luminosity transform scale-105"
                />
                {/* 딥네이비 선형 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#071E54] via-[#071E54]/85 to-transparent" />
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60" />
              </div>

              {/* 1400px 내부 콘텐츠 레이어 (슬라이드와 함께 우 ➜ 좌로 이동) */}
              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col justify-between min-h-[560px]">
                {/* 상단 뱃지 그룹 */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-[#0052CC]/40 backdrop-blur-md text-[#C4D2FF] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#87F3FF] animate-pulse" />
                    {slide.badge1}
                  </span>
                  <span className="inline-flex items-center text-[#87F3FF] text-xs sm:text-sm font-bold">
                    {slide.badge2}
                  </span>
                </div>

                {/* 중앙 메인 타이틀 및 서브 카피 */}
                <div className="space-y-4 my-auto max-w-3xl py-6">
                  <h1 className="text-white font-extrabold tracking-tight break-keep text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.25]">
                    {slide.headline.split("\n").map((line, lIdx) => (
                      <span key={lIdx} className="block">
                        {line}
                      </span>
                    ))}
                  </h1>

                  <div className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed break-keep font-normal">
                    <p>{slide.subheadline}</p>
                    {slide.highlightText && (
                      <p className="text-[#87F3FF] font-semibold mt-1">
                        {slide.highlightText}
                      </p>
                    )}
                  </div>

                  {/* 메인 액션 버튼 그룹 */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <Link
                      href={slide.ctaLink}
                      className="bg-[#0052CC] hover:bg-[#0043A6] text-white font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 hover:shadow-xl"
                    >
                      <span>{slide.ctaText}</span>
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

                {/* 하단 빈 여백 홀더 (하단 고정 인디케이터와 겹침 방지) */}
                <div className="h-10" />
              </div>
            </div>
          ))}
        </div>

        {/* 2. 큼직한 좌우 네비게이션 버튼 (화면 양끝 고정, 100% 클릭 반응) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="이전 슬라이드"
          className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-2xl cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="다음 슬라이드"
          className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-2xl cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        {/* 3. 하단 고정 인디케이터 바 (1400px 내부 고정, 동적 숫자 반영 01 --- 04) */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 pointer-events-none">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
            {/* 동적 카운터 숫자 표시: 현재 번호(01) --- 전체 슬라이드 수(04 또는 관리자 추가 시 05) */}
            <div className="flex items-center gap-4 text-white">
              <span className="font-extrabold tracking-widest text-[#87F3FF] text-sm sm:text-base tabular-nums">
                {String(realNumber).padStart(2, "0")}
              </span>

              {/* 진행률 게이지 바 */}
              <div className="w-28 sm:w-36 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#87F3FF] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* 동적으로 확장되는 총 슬라이드 수 */}
              <span className="text-slate-400 font-bold tracking-widest text-sm sm:text-base tabular-nums">
                {String(totalSlides).padStart(2, "0")}
              </span>
            </div>

            {/* 동적 닷(Dot) 네비게이션 버튼 (관리자에서 슬라이드 추가 시 개수 자동 증가) */}
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`슬라이드 ${idx + 1}번으로 바로 이동`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx + 1 === realNumber
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
