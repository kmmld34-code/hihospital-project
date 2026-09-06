"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GEM_BODY_PARTS } from "@/data/hospitalData";
import { ArrowRight, Activity, CheckCircle, Sparkles } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_InteractiveBody3D] 3D 인터랙티브 통증 부위 자가진단 내비게이터
 * ==============================================================================
 * - 인천하이병원 시그니처 기능인 "내 통증 부위를 3D로 확인하세요" 계승
 * - 1400px 컨테이너 규격 엄수 (max-w-[1400px] mx-auto)
 * - 신체 부위 탭을 누르면 관련 질환과 세부 진료과가 동적으로 표출
 * ==============================================================================
 */
export default function Gem_InteractiveBody3D() {
  const [activePartId, setActivePartId] = useState("back");

  const selectedPart = GEM_BODY_PARTS.find((p) => p.id === activePartId) || GEM_BODY_PARTS[2];

  return (
    <section className="Gem_InteractiveBodySection w-full py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 상단 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-[#EBF2FC] text-[#0052CC] text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INCHEON HI SIGNATURE TECH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight mb-3">
            내 통증 부위를 <span className="Gem_TextGradient">인터랙티브 진단</span>으로 확인하세요
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
            아픈 신체 부위를 선택하시면, HI Hospital의 특화 진료센터와 대표적인 질환 치료 솔루션을 안내해 드립니다.
          </p>
        </div>

        {/* 인터랙티브 진단 메인 박스 (1400px 안에서 2열 그리드) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* 좌측: 신체 부위 선택 버튼 및 비주얼 (7컬럼) */}
          <div className="lg:col-span-7 p-6 sm:p-10 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden">
            {/* 배경 은은한 빛 효과 */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#0052CC]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#00A8B5]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase block mb-1">
                SELECT BODY AREA
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mb-6">
                현재 가장 불편하시거나 통증이 느껴지는 부위는 어디인가요?
              </h3>

              {/* 신체 부위 선택 버튼 칩 그리드 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {GEM_BODY_PARTS.map((part) => {
                  const isSelected = part.id === activePartId;
                  return (
                    <button
                      key={part.id}
                      onClick={() => setActivePartId(part.id)}
                      className={`Gem_BodyBtn py-3.5 px-4 rounded-xl text-sm font-bold transition-all text-left flex items-center justify-between border ${
                        isSelected
                          ? "bg-[#0052CC] border-[#0052CC] text-white shadow-lg scale-105"
                          : "bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300"
                      }`}
                    >
                      <span>{part.label}</span>
                      <Activity className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-500"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 인체 그래픽 안내 배너 */}
            <div className="relative z-10 bg-slate-800/60 backdrop-blur-md rounded-2xl p-5 border border-slate-700/60 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xl text-white flex-shrink-0">
                3D
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white block text-sm mb-0.5">정밀 3.0T MRI 영상진단 연계</strong>
                척추와 관절의 통증은 신경 다발의 위치와 연계되어 있으므로, 통증 부위의 근본 원인을 찾아 치료하는 것이 중요합니다.
              </div>
            </div>
          </div>

          {/* 우측: 선택된 부위의 상세 질환 및 솔루션 카드 (5컬럼) */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-[#0052CC] uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
                <span>DIAGNOSIS & CLINIC</span>
              </div>

              <h4 className="text-2xl font-black text-slate-800 mb-2">
                {selectedPart.label} 중점 진료 안내
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                해당 부위에서 주로 발생하는 대표 질환 목록입니다. 증상이 지속된다면 방치하지 마시고 전문의의 정확한 진료를 받아보세요.
              </p>

              {/* 질환 목록 카드 */}
              <div className="space-y-2.5 mb-8">
                {selectedPart.diseases.map((disease, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 transition-colors flex items-center space-x-3 group"
                  >
                    <CheckCircle className="w-4 h-4 text-[#0052CC] flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-[#0052CC]">
                      {disease}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 바로가기 버튼 */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <Link
                href={selectedPart.targetLink}
                className="inline-flex items-center justify-center bg-[#0052CC] hover:bg-[#0043A6] text-white text-sm font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex-1 group"
              >
                <span>해당 클리닉 상세 보기</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/appointments"
                className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-3.5 px-5 rounded-xl transition-all"
              >
                전문의 상담 예약
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
