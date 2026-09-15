"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GEM_DOCTORS, GemDoctorItem } from "@/data/hospitalData";
import { ArrowRight, Calendar, Clock } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_DoctorsSpotlight] 풍부한 임상경험과 검증된 실력의 의료진 섹션
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM
 * ==============================================================================
 * [주요 구현 사양]
 * 1. 1400px 중앙 정렬 컨테이너:
 *    - max-w-[1400px] mx-auto 규격 준수
 * 2. 진료과 필터 탭 인터랙션:
 *    - 전체보기, 신경외과, 정형외과, 외과, 내과, 산부인과 탭 지원
 * 3. 4열 의료진 프로필 카드 (반응형: 1열 -> 2열 -> 4열):
 *    - 350px 고해상도 전문의 프로필 사진 및 부서 태그
 *    - 원장명, 전문의 타이틀, 출신 대학/병원 주요 약력
 *    - 전문 진료 및 주요 수술 집도 분야 3개 항목
 *    - 하단 액션: [진료시간표] 모달/페이지 링크 및 [예약하기] 바로가기
 * ==============================================================================
 */
export default function Gem_DoctorsSpotlight() {
  const [selectedDept, setSelectedDept] = useState("전체보기");

  const filterTabs = [
    "전체보기",
    "신경외과",
    "정형외과",
    "외과",
    "내과",
    "산부인과",
  ];

  // 선택된 탭에 따라 의료진 목록 필터링
  const filteredDoctors =
    selectedDept === "전체보기"
      ? GEM_DOCTORS
      : GEM_DOCTORS.filter((doc) => doc.deptGroup === selectedDept);

  // 뱃지 색상 매핑
  const getBadgeStyle = (color: GemDoctorItem["badgeColor"]) => {
    switch (color) {
      case "primary":
        return "bg-[#0052CC] text-white";
      case "secondary":
        return "bg-[#006971] text-white";
      case "tertiary":
        return "bg-[#603B00] text-white";
      case "slate":
      default:
        return "bg-slate-700 text-white";
    }
  };

  const getBulletColor = (color: GemDoctorItem["badgeColor"]) => {
    switch (color) {
      case "primary":
        return "bg-[#0052CC]";
      case "secondary":
        return "bg-[#006971]";
      case "tertiary":
        return "bg-[#603B00]";
      case "slate":
      default:
        return "bg-slate-600";
    }
  };

  return (
    <section className="Gem_DoctorsSection w-full bg-[#F0F3FF] py-16 sm:py-20" id="doctors-section">
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. 섹션 헤더 및 진료과 필터 탭 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-block bg-[#EBF2FC] text-[#0052CC] text-xs font-bold px-3 py-1 rounded-full mb-2">
              10인의 분야별 전문의
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              풍부한 임상경험과 검증된 실력의 의료진
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-1.5">
              인천하이병원의 의료진은 가족을 돌보는 마음으로 환자 한 분 한 분을
              정성으로 진료하고 있습니다.
            </p>
          </div>

          {/* 필터 탭 버튼 가로 스크롤 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedDept(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDept === tab
                    ? "bg-[#0052CC] text-white shadow-md scale-105"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 2. 4열 의료진 카드 그리드 (1400px 내부) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-2 border border-slate-200/80 group"
            >
              {/* 의료진 프로필 사진 영역 (350px 높이) */}
              <div className="relative h-[340px] sm:h-[350px] w-full bg-slate-100 overflow-hidden">
                <img
                  src={doc.imageUrl}
                  alt={`${doc.name} ${doc.specialtyTitle}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {/* 분과 뱃지 */}
                <span
                  className={`absolute top-3 left-3 ${getBadgeStyle(
                    doc.badgeColor
                  )} text-xs px-2.5 py-1 rounded-md font-bold shadow-md`}
                >
                  {doc.deptBadge}
                </span>
              </div>

              {/* 의료진 정보 영역 */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-[#0052CC] transition-colors">
                      {doc.name}
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-[#0052CC]">
                      {doc.specialtyTitle}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-medium mb-3 line-clamp-1">
                    {doc.subTitle}
                  </p>

                  {/* 주요 진료분야 3대 항목 */}
                  <div className="space-y-1.5 py-3 border-y border-slate-100 text-xs text-slate-600">
                    {doc.treatments.map((treatment, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${getBulletColor(
                            doc.badgeColor
                          )} flex-shrink-0`}
                        />
                        <span className="line-clamp-1">{treatment}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 하단 버튼 2열 (진료시간표 & 예약하기) */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
                  <Link
                    href="/about/hours"
                    className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-[13px] text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>진료시간표</span>
                  </Link>

                  <Link
                    href="/appointments"
                    className="py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A6] text-white font-bold text-xs sm:text-[13px] text-center transition-colors shadow-sm flex items-center justify-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>예약하기</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 의료진 전체보기 링크 안내 */}
        <div className="text-center mt-10">
          <Link
            href="/about/doctors"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0052CC] hover:text-[#0043A6] transition-colors"
          >
            <span>인천하이병원 10인 전문의 전체 프로필 및 학술 활동 보기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
