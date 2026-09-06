"use client";

import React from "react";
import Link from "next/link";
import { GEM_SPECIAL_CENTERS } from "@/data/hospitalData";
import { ArrowRight, ShieldCheck, Activity, Brain, HeartPulse } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_SpecialtyCenters] HI Hospital 4대 중점 특화 진료센터
 * ==============================================================================
 * - 1400px 컨테이너 규격 엄수 (max-w-[1400px] mx-auto)
 * - 최소침습 척추, 맞춤형 인공관절, 뇌신경·치매, 인공신장실
 * ==============================================================================
 */
export default function Gem_SpecialtyCenters() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Activity":
        return <Activity className="w-6 h-6 text-white" />;
      case "ShieldAlert":
        return <ShieldCheck className="w-6 h-6 text-white" />;
      case "Brain":
        return <Brain className="w-6 h-6 text-white" />;
      case "HeartPulse":
        return <HeartPulse className="w-6 h-6 text-white" />;
      default:
        return <Activity className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section className="Gem_SpecialtySection w-full py-16 md:py-24 bg-slate-50 border-t border-slate-100">
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 헤더 */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0052CC] tracking-wider uppercase block mb-1">
            EXCELLENCE IN HEALTHCARE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-3">
            HI Hospital <span className="text-[#0052CC]">4대 중점 특화센터</span>
          </h2>
          <p className="text-sm text-slate-500 font-normal">
            분야별 고도화된 특화 클리닉과 최신 설비로 증상의 근본적인 원인을 정확히 해결합니다.
          </p>
        </div>

        {/* 4열 그리드 카드 (1400px 내부) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GEM_SPECIAL_CENTERS.map((center, index) => (
            <Link
              key={index}
              href={center.link}
              className="Gem_Card p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* 상단 아이콘 및 배지 */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0052CC] to-[#00A8B5] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    {getIcon(center.icon)}
                  </div>
                  <span className="text-[11px] font-bold text-[#0052CC] bg-[#EBF2FC] px-2.5 py-1 rounded-full">
                    {center.badge}
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider mb-1">
                  {center.subtitle}
                </span>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#0052CC] transition-colors mb-2">
                  {center.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  {center.desc}
                </p>
              </div>

              {/* 하단 화살표 링크 */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0052CC]">
                <span>상세 센터 안내</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
