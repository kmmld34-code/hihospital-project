"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GEM_PAIN_DIAGNOSIS_DATA, GemPainDiagnosisItem } from "@/data/hospitalData";
import { Activity, ChevronRight, Check, ArrowRight, Sparkles } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_InteractiveBody3D] 인천하이병원 시그니처 척추·관절·통증 인터랙티브 자가진단기
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM
 * ==============================================================================
 * [주요 구현 사양]
 * 1. 1400px 중앙 정렬 컨테이너:
 *    - max-w-[1400px] mx-auto 규격 준수
 * 2. 2열 스플릿 UI 카드 (12컬럼 그리드):
 *    - 좌측 7컬럼 (다크 네이비 #071E54):
 *      - 6대 핵심 신체 통증 부위 (목, 어깨, 허리, 무릎·고관절, 손·발·발목, 두부)
 *      - 직관적인 버튼 칩 및 실시간 클릭 반응
 *      - 원인별 맞춤치료 & 3.0T 정밀 MRI 연계 안내 배너
 *    - 우측 5컬럼 (클린 화이트):
 *      - 선택된 부위의 실시간 질환 목록 표출 (체크 아이콘)
 *      - 해당 특화 클리닉 상세 바로가기 링크
 *      - 전문의 상담 예약 버튼
 * ==============================================================================
 */
export default function Gem_InteractiveBody3D() {
  const [selectedKey, setSelectedKey] = useState<string>("neck");

  const currentData: GemPainDiagnosisItem =
    GEM_PAIN_DIAGNOSIS_DATA[selectedKey] || GEM_PAIN_DIAGNOSIS_DATA.neck;

  const painButtons = [
    { key: "neck", label: "목 (경추)" },
    { key: "shoulder", label: "어깨" },
    { key: "lumbar", label: "허리 (요추)" },
    { key: "knee", label: "무릎·고관절" },
    { key: "handfoot", label: "손·발·발목" },
    { key: "brain", label: "두부 (뇌신경)" },
  ];

  return (
    <section className="Gem_PainDiagnosisSection w-full py-16 sm:py-20 bg-[#F9F9FF]" id="pain-diagnosis-section">
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF2FC] text-[#0052CC] px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INCHEON HIHOSPITAL SIGNATURE TECH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            인천하이병원{" "}
            <span className="text-[#0052CC]">척추·관절·통증 클리닉</span>에
            문의하세요!
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2.5 break-keep">
            아픈 신체 부위를 선택하시면 대표적인 질환 치료 솔루션을 안내해 드립니다.
          </p>
        </div>

        {/* 인터랙티브 진단 카드 (1400px 내부 12컬럼 분할) */}
        <div className="rounded-3xl shadow-xl overflow-hidden border border-slate-200 grid grid-cols-1 lg:grid-cols-12 bg-white">
          {/* 1. 좌측 7컬럼: 다크 네이비 사이드 (부위 선택 버튼 및 진단 안내) */}
          <div className="lg:col-span-7 bg-[#071E54] p-7 sm:p-10 flex flex-col justify-between text-white relative">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#87F3FF] text-xs font-bold tracking-widest uppercase">
                  SELECT BODY AREA
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight break-keep mb-8">
                현재 가장 불편하시거나 통증이 느껴지는 부위는 어디인가요?
              </h3>

              {/* 6개 신체 부위 선택 버튼 (2열 3행 그리드) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" id="pain-area-buttons">
                {painButtons.map((btn) => {
                  const isActive = selectedKey === btn.key;
                  return (
                    <button
                      key={btn.key}
                      type="button"
                      onClick={() => setSelectedKey(btn.key)}
                      className={`flex items-center justify-between p-4 rounded-2xl font-bold text-[15px] transition-all cursor-pointer text-left ${
                        isActive
                          ? "bg-[#0052CC] text-white border border-[#EBF2FC]/30 shadow-lg scale-[1.02]"
                          : "bg-white/5 hover:bg-white/10 text-slate-200 border border-slate-700/60 hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Activity
                          className={`w-5 h-5 ${
                            isActive ? "text-[#87F3FF]" : "text-slate-400"
                          }`}
                        />
                        <span className={isActive ? "font-bold text-white" : "font-medium"}>
                          {btn.label}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          isActive ? "text-white opacity-95" : "text-slate-400 opacity-50"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 좌측 하단 정보 카드: 영상진단 및 근본치료 연계 안내 */}
            <div className="mt-10 pt-6 border-t border-slate-700/50 flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-slate-700/40">
              <div className="px-3 py-2 rounded-xl bg-[#0052CC] text-white flex items-center justify-center font-bold text-[13px] leading-tight text-center flex-shrink-0">
                원인별
                <br />
                맞춤치료
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 leading-snug">
                  숙련된 전문의가 진단하는 문진, 촉진, 타진 등 일반검사와 X-ray·CT·정밀
                  3D MRI 영상진단 연계
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  척추와 관절의 통증은 신경 다발의 위치와 연계되어 있으므로, 통증
                  부위의 근본 원인을 찾아 치료하는 것이 중요합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 2. 우측 5컬럼: 클린 화이트 사이드 (선택된 부위 질환 및 솔루션 카드) */}
          <div className="lg:col-span-5 bg-white p-7 sm:p-10 flex flex-col justify-between">
            <div>
              {/* 상단 뱃지 */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
                <span className="text-xs font-bold tracking-widest text-[#0052CC] uppercase">
                  DIAGNOSIS & CLINIC
                </span>
              </div>

              {/* 질환 타이틀 및 서브 설명 */}
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2.5">
                {currentData.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 break-keep">
                해당 부위에서 주로 발생하는 대표 질환 목록입니다. 증상이 지속된다면
                방치하지 마시고 전문의의 정확한 진료를 받아보세요.
              </p>

              {/* 대표 질환 리스트 (체크 아이콘 카드) */}
              <div className="space-y-3">
                {currentData.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-[#0052CC]/40 hover:shadow-sm transition-all flex items-center gap-3 group"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#EBF2FC] text-[#0052CC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0052CC] group-hover:text-white transition-colors">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-[15px] text-slate-800 font-bold">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 하단 액션 버튼 그룹 */}
            <div className="pt-8 mt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href={currentData.path}
                className="py-3.5 px-4 rounded-xl bg-[#0052CC] hover:bg-[#0043A6] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all text-center hover:shadow-md"
              >
                <span>해당 클리닉 상세 보기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/appointments"
                className="py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all text-center"
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
