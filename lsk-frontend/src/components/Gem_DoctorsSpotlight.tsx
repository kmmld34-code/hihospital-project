"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { GEM_DOCTORS, GemDoctorItem } from "@/data/hospitalData";
import { ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_DoctorsSpotlight] 풍부한 임상경험과 검증된 실력의 의료진 섹션 (자동 캐러셀)
 * ==============================================================================
 * 기획 및 인터랙션 디자인: 정재이 과장 (Lead UI/UX Designer)
 * 인터랙션 및 캐러셀 엔진 구현: 고윤기 대리 (Frontend Lead Engineer)
 * ==============================================================================
 * [주요 구현 사양]
 * 1. 4초 간격 자동 슬라이드 (Auto-sliding Carousel):
 *    - 4초(4000ms)마다 1장씩 왼쪽으로 부드럽게 미끄러지는 모션
 *    - 사용자가 의료진 카드 위에 마우스를 올리면(Hover) 자동 슬라이드가 일시 정지되어 편안한 탐색 보장
 * 2. 끝단 좌/우 컨트롤 버튼:
 *    - 전체 화면 끝이 아닌 [max-w-1400px] 컨테이너 좌우 양 끝단에 정렬 배치
 *    - 숫자 카운트 및 진행바는 대표님 요청에 따라 제외하여 미니멀하고 단정한 시각성 유지
 * 3. 반응형 다중 카드 노출:
 *    - 데스크탑(lg): 4장 동시 노출 후 1장씩 슬라이드
 *    - 태블릿(sm/md): 2장 동시 노출
 *    - 모바일: 1장 노출
 * 4. 진료과 필터 탭 연동:
 *    - 필터 변경 시 슬라이드 인덱스 자동 0번 초기화
 * 5. 10인 전문의 데이터 전원 탑재 완료 (doc-1 ~ doc-10)
 * ==============================================================================
 */
export default function Gem_DoctorsSpotlight() {
  const [selectedDept, setSelectedDept] = useState("전체보기");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4); // 반응형 화면별 노출 카드 수

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 1. 화면 해상도에 따른 노출 카드 개수 동적 계산 (모바일 1, 태블릿 2, 데스크탑 4)
  const updateItemsPerView = useCallback(() => {
    if (typeof window === "undefined") return;
    const width = window.innerWidth;
    if (width < 640) {
      setItemsPerView(1); // 모바일
    } else if (width < 1024) {
      setItemsPerView(2); // 태블릿
    } else {
      setItemsPerView(4); // 데스크탑
    }
  }, []);

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [updateItemsPerView]);

  // 2. 스크롤 진입 감지 (Intersection Observer 1회성 리빌)
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

  // 진료과 카테고리 탭 목록
  const filterTabs = [
    "전체보기",
    "신경외과",
    "정형외과",
    "외과",
    "내과",
    "산부인과",
  ];

  // 3. 선택된 진료과에 따른 의료진 목록 필터링
  const filteredDoctors =
    selectedDept === "전체보기"
      ? GEM_DOCTORS
      : GEM_DOCTORS.filter((doc) => doc.deptGroup === selectedDept);

  // 최대 이동 가능 인덱스 계산 (끝 카드 이후 빈 공간 방지 및 순환)
  const totalItems = filteredDoctors.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // 다음 슬라이드로 1장 이동 (끝에 도달하면 처음으로 순환)
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0; // 끝에 도달하면 부드럽게 처음으로 순환
      }
      return prev + 1;
    });
  }, [maxIndex]);

  // 이전 슬라이드로 1장 이동
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex; // 처음에 뒤로가면 마지막으로 순환
      }
      return prev - 1;
    });
  }, [maxIndex]);

  // 4. 4초 자동 슬라이드 타이머 (마우스 호버 시 일시 정지)
  useEffect(() => {
    if (isPaused || totalItems <= itemsPerView) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4000); // 4초마다 1장씩 왼쪽으로 미끄러짐

    return () => clearInterval(timer);
  }, [isPaused, handleNext, totalItems, itemsPerView]);

  // 진료과 탭 변경 시 인덱스 리셋
  const handleTabChange = (tab: string) => {
    setSelectedDept(tab);
    setCurrentIndex(0);
  };

  // 뱃지 배경 및 텍스트 스타일 지정
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

  // 불릿 포인트 색상 지정
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

  // 슬라이드 트랙 이동 거리 비율 계산 (카드 1장의 퍼센트 = 100 / itemsPerView)
  const slidePercentage = 100 / itemsPerView;

  return (
    <section
      ref={sectionRef}
      className="Gem_DoctorsSection w-full bg-[#F0F3FF] py-16 sm:py-20 overflow-hidden relative"
      id="doctors-section"
    >
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 1. 섹션 헤더 및 진료과 필터 탭 */}
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

          {/* 필터 탭 버튼 목록 (scale-105 제거 및 py-1 패딩으로 가로/세로 스크롤바 튐 완전 차단) */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                  selectedDept === tab
                    ? "bg-[#0052CC] text-white shadow-sm border border-[#0052CC]"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 2. 캐러셀 슬라이더 영역 (컨테이너 좌우 끝단에 네비게이션 버튼 배치) */}
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* 좌측 이동 버튼 (컨테이너 좌측 끝단 배치) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="이전 의료진 보기"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#0052CC] shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-slate-200/90 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/50 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* 우측 이동 버튼 (컨테이너 우측 끝단 배치) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="다음 의료진 보기"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#0052CC] shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-slate-200/90 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/50 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* 슬라이드 뷰포트 마스킹 (overflow-hidden) */}
          <div className="overflow-hidden py-4 -my-4 px-1 -mx-1">
            {/* 슬라이드 트랙 (1장씩 왼쪽으로 부드럽게 transition 이동) */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * slidePercentage}%)`,
              }}
            >
              {filteredDoctors.map((doc, idx) => (
                <div
                  key={doc.id}
                  style={{
                    width: `${slidePercentage}%`,
                    minWidth: `${slidePercentage}%`,
                  }}
                  className="px-2.5 sm:px-3 flex-shrink-0"
                >
                  <div
                    className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 flex flex-col group cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2.5 hover:shadow-[0_20px_35px_-5px_rgba(7,30,84,0.18)] hover:border-[#0052CC]/40 h-full ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {/* 의료진 프로필 사진 영역 */}
                    <div className="relative h-[320px] sm:h-[340px] w-full bg-slate-100 overflow-hidden">
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

                    {/* 의료진 정보 본문 */}
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. 하단 전체 프로필 링크 */}
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
