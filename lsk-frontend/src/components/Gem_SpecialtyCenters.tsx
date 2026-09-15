"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GEM_SPECIAL_CENTERS, GemSpecialCenterItem } from "@/data/hospitalData";
import { ArrowRight, Cpu, Brain, HeartPulse, Stethoscope } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_SpecialtyCenters] 인천하이병원 중점 특화 진료센터 큐레이션
 * ==============================================================================
 * 기획 및 인터랙션 디자인: 정재이 과장 (Lead UI/UX Designer)
 * 인터랙션 구현: 고윤기 대리 (Frontend Lead Engineer)
 * ==============================================================================
 * [정재이 x 고윤기 마이크로 인터랙션 구현 사양]
 * 1. 스크롤 리빌 (Scroll Reveal & Stagger Animation):
 *    - 뷰포트 노출 시 4개 특화센터 카드가 120ms 간격으로 왼쪽부터 우측으로 순차 등장
 * 2. 프리미엄 호버 리프트 (Hover Lift):
 *    - 마우스 오버 시 카드가 10px 부유(-translate-y-2.5)하며 고급 로열블루 그림자 확장
 *    - 상단 그라데이션 배너 내 아이콘이 통통 튀며(scale-105) 생동감 부여
 *    - 하단 화살표 링크가 우측으로 6px 슬라이딩(translate-x-1.5)하여 클릭 유도
 * ==============================================================================
 */
export default function Gem_SpecialtyCenters() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      {
        threshold: 0.15, // 화면 15% 진입 시 시작
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderCenterIcon = (id: string, iconUrl: string) => {
    switch (id) {
      case "spine":
        return (
          <img
            src={iconUrl}
            alt="척추센터 아이콘"
            className="w-10 h-10 object-contain"
          />
        );
      case "joint":
        return <Cpu className="w-10 h-10 text-[#87F3FF]" />;
      case "neuro":
        return <Brain className="w-10 h-10 text-[#87F3FF]" />;
      case "dialysis":
        return <HeartPulse className="w-10 h-10 text-[#87F3FF]" />;
      default:
        return <Stethoscope className="w-10 h-10 text-[#87F3FF]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="Gem_SpecialtySection w-full py-16 sm:py-20 bg-white overflow-hidden"
      id="specialty-centers"
    >
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. 상단 섹션 헤더 (스크롤 리빌) */}
        <div
          className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block bg-teal-50 text-[#008B96] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
            SPECIALTY CENTERS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            중점 특화 진료센터 큐레이션
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-2 break-keep">
            인천하이병원은 분과별 첨단 전문 장비와 집중 치료 시스템을 완비하여
            빠르고 안전한 일상 복귀를 약속합니다.
          </p>
        </div>

        {/* 2. 4열 특화센터 카드 그리드 (스태거 리빌 + 프리미엄 호버 리프트) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GEM_SPECIAL_CENTERS.map((center: GemSpecialCenterItem, idx: number) => (
            <div
              key={center.id}
              style={{
                transitionDelay: `${idx * 120}ms`,
              }}
              className={`bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-100 flex flex-col justify-between group cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2.5 hover:shadow-[0_20px_35px_-5px_rgba(0,82,204,0.15)] hover:border-[#0052CC]/30 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div>
                {/* 상단 딥네이비 -> 로열블루 그라데이션 배너 박스 */}
                <div className="w-full rounded-2xl bg-gradient-to-r from-[#071E54] via-[#003D9B] to-[#0052CC] p-4 mb-6 shadow-md border border-white/10 flex items-center justify-between gap-3 overflow-hidden group-hover:shadow-lg transition-all">
                  {/* 좌측 아이콘 박스 (호버 시 부드러운 스케일 모션) */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl bg-white/10 p-1.5 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    {renderCenterIcon(center.id, center.icon)}
                  </div>

                  {/* 우측 센터 영문명 및 한글명 */}
                  <div className="flex-1 flex flex-col justify-center items-end text-right gap-0.5 min-w-0">
                    <span className="text-[#87F3FF] text-xs font-bold tracking-wider uppercase">
                      {center.englishTitle}
                    </span>
                    <span className="text-white font-black text-base sm:text-lg tracking-tight leading-snug break-keep">
                      {center.bannerTitle}
                    </span>
                  </div>
                </div>

                {/* 특화 뱃지 */}
                <span
                  className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${center.badgeColor}`}
                >
                  {center.badge}
                </span>

                {/* 센터 타이틀 */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0052CC] transition-colors">
                  {center.title}
                </h3>

                {/* 센터 세부 설명 */}
                <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed break-keep">
                  {center.desc}
                </p>
              </div>

              {/* 하단 링크 버튼 (호버 시 화살표 슬라이딩) */}
              <Link
                href={center.link}
                className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[#0052CC] text-xs sm:text-sm font-bold group-hover:text-[#0043A6]"
              >
                <span>센터 상세정보</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
