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
 * [정재이 x 고윤기 구현 사양 - 6번 수정 반영]
 * 1. 특화센터 상단 배너 단색 배경 지정 (그라데이션 전면 제거):
 *    - 1번 (척추센터): #0052CC (하이병원 대표 메인 블루)
 *    - 2번 (인공관절): #006971 (정형외과 딥 틸/청록)
 *    - 3번 (뇌신경 치매): #603B00 (신경계 골드 브라운)
 *    - 4번 (인공신장실): #603B00 (특화 클리닉 딥 브라운)
 * 2. 척추센터 아이콘 깨짐 원인 해결:
 *    - 불안정한 외부 링크 대신 정교한 인라인 벡터 척추(Spine Vertebrae) SVG 아이콘으로 대체
 *    - 고해상도 척추 분절 및 신경 곡선이 깨짐 없이 선명하게 렌더링
 * 3. 4개 공통 '센터 상세정보' 하단 버튼 인터랙션:
 *    - 평소에는 단정한 라운드 테두리 박스 형태
 *    - 마우스 호버(Hover) 시: 라운드 사각박스 + 배경색 #0052CC + 텍스트/화살표 흰색(text-white) 반전
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
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 센터별 고유 배경색 매핑 (그라데이션 제거 및 지정 색상 적용)
  const getBannerBgColor = (id: string) => {
    switch (id) {
      case "spine":
        return "bg-[#0052CC]"; // 1번 척추: 메인 블루 #0052cc
      case "joint":
        return "bg-[#006971]"; // 2번 인공관절: 청록 #006971
      case "neuro":
        return "bg-[#603B00]"; // 3번 뇌신경 치매: 브라운 #603b00
      case "dialysis":
        return "bg-[#334155]"; // 4번 인공신장: 대표님 지정 다크 슬레이트 #334155
      default:
        return "bg-[#0052CC]";
    }
  };

  // 센터별 아이콘 렌더링 (척추 아이콘은 정밀 SVG 벡터로 직접 구현하여 깨짐 완전 방지)
  const renderCenterIcon = (id: string) => {
    switch (id) {
      case "spine":
        return (
          <svg
            className="w-10 h-10 text-[#87F3FF]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* 경추 / 흉추 / 요추 척추 분절을 형상화한 세련된 벡터 아이콘 */}
            <path d="M12 2v20" strokeWidth="2" strokeDasharray="1 2" />
            <ellipse cx="12" cy="4" rx="4" ry="2" />
            <ellipse cx="12" cy="8.5" rx="5" ry="2.2" />
            <ellipse cx="12" cy="13.5" rx="5.5" ry="2.3" />
            <ellipse cx="12" cy="18.5" rx="5" ry="2.2" />
            <circle cx="12" cy="4" r="0.8" fill="currentColor" />
            <circle cx="12" cy="8.5" r="0.8" fill="currentColor" />
            <circle cx="12" cy="13.5" r="0.8" fill="currentColor" />
            <circle cx="12" cy="18.5" r="0.8" fill="currentColor" />
          </svg>
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
        {/* 1. 상단 섹션 헤더 */}
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

        {/* 2. 4열 특화센터 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GEM_SPECIAL_CENTERS.map((center: GemSpecialCenterItem, idx: number) => {
            const bannerBg = getBannerBgColor(center.id);

            return (
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
                  {/* 상단 단색 배너 박스 (그라데이션 제거, 지정 단색 배경 적용) */}
                  <div
                    className={`w-full rounded-2xl ${bannerBg} p-4 mb-6 shadow-md border border-white/10 flex items-center justify-between gap-3 overflow-hidden group-hover:shadow-lg transition-all`}
                  >
                    {/* 좌측 아이콘 박스 */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl bg-white/10 p-1.5 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      {renderCenterIcon(center.id)}
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

                {/* 4개 공통: '센터 상세정보' 호버 시 라운드 사각박스 + 배경색 #0052cc + 텍스트 흰색 반전 */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={center.link}
                    className="w-full rounded-xl px-4 py-3 border border-slate-200 text-[#0052CC] font-bold text-xs sm:text-sm flex items-center justify-between transition-all duration-300 hover:bg-[#0052CC] hover:text-white hover:border-[#0052CC] hover:shadow-md group/btn"
                  >
                    <span>센터 상세정보</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
