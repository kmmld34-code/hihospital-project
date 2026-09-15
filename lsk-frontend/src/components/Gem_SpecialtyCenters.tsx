"use client";

import React from "react";
import Link from "next/link";
import { GEM_SPECIAL_CENTERS, GemSpecialCenterItem } from "@/data/hospitalData";
import { ArrowRight, Cpu, Brain, HeartPulse, Stethoscope } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_SpecialtyCenters] 인천하이병원 중점 특화 진료센터 큐레이션
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM
 * ==============================================================================
 * [주요 구현 사양]
 * 1. 1400px 중앙 정렬 컨테이너:
 *    - max-w-[1400px] mx-auto 규격 엄수
 * 2. 프리미엄 그라데이션 헤더 배너:
 *    - 각 카드 상단에 딥네이비(#071E54)에서 로열블루(#0052CC)로 흐르는 그라데이션 박스 배치
 *    - 아이콘 및 영문 센터명, 한글 센터명 우측 정렬
 * 3. 4대 특화 센터 카드 구성:
 *    - 1) 최소침습 척추센터 (수술/비수술 원스톱)
 *    - 2) 맞춤형 인공관절센터 (최소절개 빠른보행)
 *    - 3) 뇌신경·치매센터 (골든타임 케어)
 *    - 4) 인공신장실 (혈액투석) (쾌적한 투석환경)
 * 4. 마우스 인터랙션:
 *    - 호버 시 자연스러운 카드 부유 효과(-translate-y-2) 및 화살표 모션
 * ==============================================================================
 */
export default function Gem_SpecialtyCenters() {
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
    <section className="Gem_SpecialtySection w-full py-16 sm:py-20 bg-white" id="specialty-centers">
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. 상단 섹션 헤더 */}
        <div className="text-center max-w-2xl mx-auto mb-14">
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

        {/* 2. 4열 특화센터 카드 그리드 (1400px 내부) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GEM_SPECIAL_CENTERS.map((center: GemSpecialCenterItem) => (
            <div
              key={center.id}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group border border-slate-100"
            >
              <div>
                {/* 상단 딥네이비 -> 로열블루 그라데이션 배너 박스 */}
                <div className="w-full rounded-2xl bg-gradient-to-r from-[#071E54] via-[#003D9B] to-[#0052CC] p-4 mb-6 shadow-md border border-white/10 flex items-center justify-between gap-3 overflow-hidden group-hover:shadow-lg transition-all">
                  {/* 좌측 아이콘 박스 */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl bg-white/10 p-1.5 flex items-center justify-center backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
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

              {/* 하단 링크 버튼 */}
              <Link
                href={center.link}
                className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[#0052CC] text-xs sm:text-sm font-bold group-hover:text-[#0043A6]"
              >
                <span>센터 상세정보</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
