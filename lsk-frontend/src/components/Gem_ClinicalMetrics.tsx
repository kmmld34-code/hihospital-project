"use client";

import React, { useState, useEffect, useRef } from "react";
import { GEM_CLINICAL_METRICS } from "@/data/hospitalData";
import { ShieldCheck, Activity, Cpu, Stethoscope, Footprints } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_ClinicalMetrics] 신뢰할 수 있는 임상 경험과 풍부한 수술 실적 섹션
 * ==============================================================================
 * 기획 및 UX 디자인: 정재이 과장 (Lead UI/UX Designer)
 * 인터랙션 개발: 고윤기 대리 (Frontend Lead Engineer)
 * ==============================================================================
 * [주요 구현 사양 및 인터랙션]
 * 1. Intersection Observer 스크롤 리빌:
 *    - 25% 노출 시 박스 및 4개 카드가 0.1초 시차(Stagger)를 두고 위로 부드럽게 솟아오름
 * 2. 실시간 카운트업 (easeOutExpo + requestAnimationFrame):
 *    - 1.8초 동안 0에서 5,000 / 3,000 / 5,000 / 2,000으로 자연스럽게 증가
 * 3. 프리미엄 호버 리프트 (Hover Lift):
 *    - 마우스 오버 시 카드가 10px 부유(-translate-y-2.5)하며 메디컬 블루 그림자 확장
 *    - 각 분과별 아이콘이 회전 및 확대 모션(scale-110 -rotate-3)으로 생동감 부여
 * ==============================================================================
 */

interface CountUpNumberProps {
  target: number;
  duration?: number;
  start: boolean;
  unit: string;
}

function CountUpNumber({ target, duration = 1800, start, unit }: CountUpNumberProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const currentNumber = Math.floor(easedProgress * target);
      setDisplayValue(currentNumber);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [start, target, duration]);

  return (
    <div className="flex items-baseline gap-1 my-1">
      <span className="text-3xl sm:text-[34px] font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-[#0052CC] transition-colors tabular-nums">
        {displayValue.toLocaleString("ko-KR")}
      </span>
      <span className="text-lg font-bold text-[#0052CC]">{unit}</span>
    </div>
  );
}

export default function Gem_ClinicalMetrics() {
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
        threshold: 0.2, // 화면 20% 진입 시 시작
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const parseNumber = (valueStr: string): number => {
    return parseInt(valueStr.replace(/,/g, ""), 10) || 0;
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "AirlineSeatReclineExtra":
        return <Activity className="w-7 h-7 text-[#0052CC]" />;
      case "PrecisionManufacturing":
        return <Cpu className="w-7 h-7 text-[#006971]" />;
      case "Healing":
        return <Stethoscope className="w-7 h-7 text-[#0052CC]" />;
      case "Footprints":
        return <Footprints className="w-7 h-7 text-[#B45309]" />;
      default:
        return <Activity className="w-7 h-7 text-[#0052CC]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="Gem_ClinicalMetricsSection w-full py-6 sm:py-8 bg-[#F0F3FF] overflow-hidden"
    >
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 bg-white w-full transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* 1. 상단 타이틀 영역 */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 bg-[#EBF2FC] text-[#0052CC] px-3.5 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>CLINICAL EXCELLENCE & TRACK RECORD</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              신뢰할 수 있는 임상 경험과 풍부한 수술 실적
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-2.5 break-keep">
              수많은 환자분들의 일상 복귀를 이끌어온 인천하이병원의 검증된 분야별 치료 데이터입니다.
            </p>
          </div>

          {/* 2. 4개 핵심 임상 지표 카드 그리드 (순차적 스태거 리빌 + 프리미엄 호버 리프트) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GEM_CLINICAL_METRICS.map((metric, idx) => {
              const targetNumber = parseNumber(metric.count);

              return (
                <div
                  key={idx}
                  style={{
                    transitionDelay: `${idx * 100}ms`,
                  }}
                  className={`p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 cursor-pointer flex flex-col justify-between transition-all duration-500 ease-out group hover:-translate-y-2.5 hover:shadow-[0_20px_35px_-5px_rgba(0,82,204,0.16)] hover:border-[#0052CC]/50 hover:bg-white ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <div>
                    {/* 상단 뱃지 및 아이콘 */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg font-bold text-xs ${metric.tagColor}`}
                      >
                        {metric.deptTag}
                      </span>
                      <div className="group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                        {renderIcon(metric.icon)}
                      </div>
                    </div>

                    {/* 지표 제목 */}
                    <div className="text-xs text-slate-400 font-medium mb-1">
                      {metric.title}
                    </div>

                    {/* 카운트업 애니메이션 컴포넌트 */}
                    <CountUpNumber
                      target={targetNumber}
                      duration={1800}
                      start={isVisible}
                      unit={metric.unit}
                    />
                  </div>

                  {/* 지표 상세 설명 */}
                  <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200/60 leading-relaxed">
                    {metric.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
