"use client";

import React from "react";
import { GEM_CLINICAL_METRICS } from "@/data/hospitalData";
import { ShieldCheck, Activity, Cpu, Stethoscope, Footprints } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_ClinicalMetrics] 신뢰할 수 있는 임상 경험과 풍부한 수술 실적 섹션
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM
 * ==============================================================================
 * [주요 구현 사양]
 * 1. 1400px 중앙 정렬 컨테이너:
 *    - max-w-[1400px] mx-auto 규격 준수
 * 2. 4대 핵심 임상 수술 실적 카드:
 *    - 척추수술 5,000례+
 *    - 인공관절 치환술 3,000례+
 *    - 관절 내시경 시술 5,000례+
 *    - 수·족부 외상 및 재건 2,000례+
 * 3. 인터랙션 및 시각적 완성도:
 *    - 마우스 호버 시 자연스러운 상승(-translate-y-2) 및 그림자 확장
 *    - 각 분야별 컬러 태그 및 직관적 메디컬 아이콘 배치
 * ==============================================================================
 */
export default function Gem_ClinicalMetrics() {
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
    <section className="Gem_ClinicalMetricsSection w-full py-6 sm:py-8 bg-[#F0F3FF]">
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 bg-white w-full">
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

          {/* 2. 4개 핵심 임상 지표 카드 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GEM_CLINICAL_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#0052CC]/40 hover:shadow-lg transition-all duration-300 group hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  {/* 상단 뱃지 및 아이콘 */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-lg font-bold text-xs ${metric.tagColor}`}>
                      {metric.deptTag}
                    </span>
                    <div className="group-hover:scale-110 transition-transform">
                      {renderIcon(metric.icon)}
                    </div>
                  </div>

                  {/* 지표 제목 */}
                  <div className="text-xs text-slate-400 font-medium mb-1">
                    {metric.title}
                  </div>

                  {/* 지표 수치 (큰 폰트 강조) */}
                  <div className="flex items-baseline gap-1 my-1">
                    <span className="text-3xl sm:text-[34px] font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-[#0052CC] transition-colors">
                      {metric.count}
                    </span>
                    <span className="text-lg font-bold text-[#0052CC]">
                      {metric.unit}
                    </span>
                  </div>
                </div>

                {/* 지표 상세 설명 */}
                <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200/60 leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
