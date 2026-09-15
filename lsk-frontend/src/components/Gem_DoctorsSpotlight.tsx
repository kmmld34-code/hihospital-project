"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { GEM_DOCTORS, GemDoctorItem } from "@/data/hospitalData";
import { ArrowRight, Calendar, Clock } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_DoctorsSpotlight] 풍부한 임상경험과 검증된 실력의 의료진 섹션
 * ==============================================================================
 * 기획 및 인터랙션 디자인: 정재이 과장 (Lead UI/UX Designer)
 * 인터랙션 구현: 고윤기 대리 (Frontend Lead Engineer)
 * ==============================================================================
 * [정재이 x 고윤기 마이크로 인터랙션 구현 사양]
 * 1. 스크롤 리빌 (Scroll Reveal & Stagger Animation):
 *    - Intersection Observer를 통해 뷰포트 진입 시 카드들이 은은하게 페이드인-업
 *    - 각 의사 카드마다 0.12초(120ms) 시차를 두고 순차적으로 1->2->3->4번이 올라오는 리듬감 부여
 * 2. 프리미엄 호버 리프트 (Hover Lift & Deep Shadow):
 *    - 마우스 오버 시 카드가 10px 부드럽게 부유(-translate-y-2.5)
 *    - 인천하이병원 시그니처 딥네이비 그림자 shadow-[0_20px_35px_-5px_rgba(7,30,84,0.18)] 전개
 *    - 원장님 프로필 사진이 은은하게 줌인(scale-105)되며 테두리 하이라이트
 * 3. Next.js <Image> 컴포넌트 & 반응형 sizes 지원 (오은수 QA 검수 완료)
 * ==============================================================================
 */
export default function Gem_DoctorsSpotlight() {
  const [selectedDept, setSelectedDept] = useState("전체보기");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 감지: Intersection Observer로 화면에 20% 진입 시 1회성 리빌 트리거
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      {
        threshold: 0.15, // 화면 15% 진입 시 리빌 시작
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <section
      ref={sectionRef}
      className="Gem_DoctorsSection w-full bg-[#F0F3FF] py-16 sm:py-20 overflow-hidden"
      id="doctors-section"
    >
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. 섹션 헤더 및 진료과 필터 탭 (스크롤 리빌 적용) */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
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
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 2. 4열 의료진 카드 그리드 (순차적 스태거 리빌 + 프리미엄 호버 리프트) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc, idx) => (
            <div
              key={doc.id}
              style={{
                transitionDelay: `${idx * 120}ms`,
              }}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 flex flex-col group cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2.5 hover:shadow-[0_20px_35px_-5px_rgba(7,30,84,0.18)] hover:border-[#0052CC]/40 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {/* 의료진 프로필 사진 영역 (Next.js Image + 호버 줌인) */}
              <div className="relative h-[340px] sm:h-[350px] w-full bg-slate-100 overflow-hidden">
                <Image
                  src={doc.imageUrl}
                  alt={`${doc.name} ${doc.specialtyTitle}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* 분과 뱃지 */}
                <span
                  className={`absolute top-3 left-3 z-10 ${getBadgeStyle(
                    doc.badgeColor
                  )} text-xs px-2.5 py-1 rounded-md font-bold shadow-md`}
                >
                  {doc.deptBadge}
                </span>
              </div>

              {/* 의료진 정보 영역 */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
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
                    {doc.treatments.map((treatment, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2">
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
                    className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-[13px] text-center transition-colors flex items-center justify-center gap-1 hover:text-[#0052CC]"
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>진료시간표</span>
                  </Link>

                  <Link
                    href="/appointments"
                    className="py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A6] text-white font-bold text-xs sm:text-[13px] text-center transition-colors shadow-sm flex items-center justify-center gap-1 hover:shadow-md"
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
        <div
          className={`text-center mt-10 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/about/doctors"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0052CC] hover:text-[#0043A6] transition-colors group"
          >
            <span>인천하이병원 10인 전문의 전체 프로필 및 학술 활동 보기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
