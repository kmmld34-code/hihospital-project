"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GEM_DOCTORS } from "@/data/hospitalData";
import { Calendar, ArrowRight, UserCheck } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_DoctorsSpotlight] 풍부한 임상경험을 가진 10인의 전문의 소개 컴포넌트
 * ==============================================================================
 * - 바로서구병원 핵심 벤치마킹 요소
 * - 1400px 컨테이너 규격 (max-w-[1400px] mx-auto)
 * - 분과별 필터 탭 및 전문의 프로필 카드 그리드
 * ==============================================================================
 */
export default function Gem_DoctorsSpotlight() {
  const [selectedDept, setSelectedDept] = useState("전체");

  const deptTabs = ["전체", "관절정형외과", "척추외과", "신경과", "일반외과", "내과"];

  const filteredDoctors =
    selectedDept === "전체"
      ? GEM_DOCTORS
      : GEM_DOCTORS.filter((doc) => doc.dept === selectedDept);

  return (
    <section className="Gem_DoctorsSection w-full py-16 md:py-24 bg-white">
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 섹션 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-[#0052CC] text-xs font-bold px-3 py-1 rounded-full mb-3">
              <UserCheck className="w-3.5 h-3.5" />
              <span>MEDICAL SPECIALISTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
              풍부한 임상경험을 가진 <span className="text-[#0052CC]">분과별 전문의</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              대학병원 출신 각 분과별 10인의 전문의가 정확한 진단과 협진으로 환자의 쾌유를 이끕니다.
            </p>
          </div>

          {/* 전체보기 링크 */}
          <Link
            href="/about/doctors"
            className="mt-4 md:mt-0 inline-flex items-center text-sm font-bold text-[#0052CC] hover:text-[#0043A6] transition-colors group"
          >
            <span>의료진 전체 프로필 보기</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 진료과 필터 탭 */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {deptTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedDept(tab)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedDept === tab
                  ? "bg-[#0052CC] text-white shadow-md scale-105"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 의료진 프로필 카드 그리드 (1400px 내부 3열/4열 배치) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="Gem_Card rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              {/* 의사 이미지 영역 */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={doc.imageUrl}
                  alt={`${doc.name} ${doc.role}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#0052CC] border border-slate-200">
                  {doc.dept}
                </div>
              </div>

              {/* 의사 정보 영역 */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline space-x-2 mb-1">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0052CC] transition-colors">
                      {doc.name}
                    </h3>
                    <span className="text-xs font-medium text-slate-500">{doc.role}</span>
                  </div>

                  {/* 진료 일정 */}
                  <div className="flex items-center text-xs text-amber-600 font-semibold mb-4 bg-amber-50 px-2.5 py-1 rounded-md w-fit">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    <span>진료일정: {doc.schedule}</span>
                  </div>

                  {/* 전문 분야 태그 배지 */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {doc.specialty.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        #{item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 하단 진료예약 링크 */}
                <Link
                  href="/appointments"
                  className="w-full inline-flex items-center justify-center bg-slate-100 group-hover:bg-[#0052CC] text-slate-700 group-hover:text-white text-xs font-bold py-2.5 rounded-xl transition-all"
                >
                  진료예약 신청하기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
