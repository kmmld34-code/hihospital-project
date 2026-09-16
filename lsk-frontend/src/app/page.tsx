"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Gem_HeroCarousel from "@/components/Gem_HeroCarousel";
import Gem_QuickReservationBar from "@/components/Gem_QuickReservationBar";
import Gem_InteractiveBody3D from "@/components/Gem_InteractiveBody3D";
import Gem_DoctorsSpotlight from "@/components/Gem_DoctorsSpotlight";
import Gem_ClinicalMetrics from "@/components/Gem_ClinicalMetrics";
import Gem_SpecialtyCenters from "@/components/Gem_SpecialtyCenters";
import Gem_PatientStorySection from "@/components/Gem_PatientStorySection";
import { GEM_NEWS_ITEMS, GEM_FACILITIES, GemFacilityItem } from "@/data/hospitalData";
import {
  ChevronRight,
  Star,
  Camera,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";

/**
 * ==============================================================================
 * [HI Hospital] 메인 인덱스 홈 페이지 (스크롤 리빌 & 프리미엄 호버 리프트 완비)
 * ==============================================================================
 * 기획 및 인터랙션 디자인: 정재이 과장 (Lead UI/UX Designer)
 * 인터랙션 구현: 고윤기 대리 (Frontend Lead Engineer)
 * 총괄 감수: 강수진 실장 (PM)
 * ==============================================================================
 * [주요 구현 사양]
 * 1. 1400px 중앙 정렬 컨테이너 규격 엄수
 * 2. 전 섹션 유기적 스크롤 리빌 (Scroll Reveal) & 스태거(Stagger) 순차 모션
 * 3. 프리미엄 호버 리프트 (Hover Lift): 카드가 사뿐히 들리며 딥네이비 그림자 전개
 * 4. Next.js <Image> 컴포넌트 & WebP/AVIF 자동 변환 최적화
 * ==============================================================================
 */
export default function HomePage() {
  const [selectedFacilityCategory, setSelectedFacilityCategory] = useState("전체");

  // 시설 갤러리 및 뉴스 섹션용 스크롤 리빌 옵저버
  const storySectionRef = useRef<HTMLElement | null>(null);
  const facilitySectionRef = useRef<HTMLElement | null>(null);
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const [isFacilityVisible, setIsFacilityVisible] = useState(false);

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStoryVisible(true);
          if (storySectionRef.current) observer1.unobserve(storySectionRef.current);
        }
      },
      { threshold: 0.15 }
    );

    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFacilityVisible(true);
          if (facilitySectionRef.current) observer2.unobserve(facilitySectionRef.current);
        }
      },
      { threshold: 0.15 }
    );

    if (storySectionRef.current) observer1.observe(storySectionRef.current);
    if (facilitySectionRef.current) observer2.observe(facilitySectionRef.current);

    return () => {
      observer1.disconnect();
      observer2.disconnect();
    };
  }, []);

  const facilityCategories = [
    "전체",
    "건강검진센터",
    "영상진단센터",
    "도수재활센터",
    "입원실/간호간병",
  ];

  // 검사장비 및 시설 카테고리 필터링
  const filteredFacilities =
    selectedFacilityCategory === "전체"
      ? GEM_FACILITIES
      : GEM_FACILITIES.filter((f) => f.category === selectedFacilityCategory);

  return (
    <div className="Gem_HomePage w-full pb-12 bg-white">
      {/* 1. 최상단 히어로 배너 (풀배경 엣지투엣지 + 1400px 내부 중앙 정렬 + Image priority LCP 최적화) */}
      <Gem_HeroCarousel />

      {/* 2. 원스톱 간편예약 신청 바 (1400px 플로팅 오버랩 카드 + 750px 개인정보 모달) */}
      <Gem_QuickReservationBar />

      {/* 3. 인천하이병원 척추·관절·통증 인터랙티브 자가진단기 (1400px 내부 2열 분할) */}
      <Gem_InteractiveBody3D />

      {/* 4. 풍부한 임상경험과 검증된 실력의 의료진 (스태거 리빌 + 10px 호버 리프트) */}
      <Gem_DoctorsSpotlight />

      {/* 5. 신뢰할 수 있는 임상 경험과 풍부한 수술 실적 (실시간 카운트업 + 호버 리프트) */}
      <Gem_ClinicalMetrics />

      {/* 6. 중점 특화 진료센터 큐레이션 (그라데이션 헤더 입체 부유 호버 리프트) */}
      <Gem_SpecialtyCenters />

      {/* 7. 환자 치료 스토리 & 하이병원 소식 및 언론보도 2열 스플릿 섹션 (스크롤 리빌 적용) */}
      <section
        ref={storySectionRef}
        className="Gem_StoryAndNewsSection w-full bg-[#F0F3FF] py-16 sm:py-20 overflow-hidden"
      >
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 transition-all duration-700 ease-out ${
              isStoryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* 좌측 열: 생생한 환자 치료 스토리 (동적 API 연동 및 슬라이드 & 모달 완비) */}
            <Gem_PatientStorySection />

            {/* 우측 열: 하이병원 소식 & 언론보도 (호버 리프트) */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#008B96] text-xs font-bold uppercase tracking-wider block mb-1">
                    HI HOSPITAL NEWS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    하이병원 소식 & 언론보도
                  </h3>
                </div>
                <Link
                  href="/community/news"
                  className="text-xs sm:text-sm font-bold text-[#008B96] hover:underline flex items-center gap-1 group"
                >
                  <span>소식 더보기</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* 4개 뉴스 아이템 리스트 (각각 호버 시 살짝 부유) */}
              <div className="space-y-3.5">
                {GEM_NEWS_ITEMS.map((news) => (
                  <Link
                    key={news.id}
                    href={news.link}
                    className="block bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 transition-all duration-300 ease-out group hover:-translate-y-1 hover:shadow-md hover:border-[#0052CC]/50"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${news.tagBg}`}>
                        {news.tag}
                      </span>
                      <span className="font-mono text-slate-400">{news.date}</span>
                    </div>

                    <h4 className="text-sm sm:text-[15px] font-bold text-slate-900 group-hover:text-[#0052CC] transition-colors line-clamp-1">
                      {news.title}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-1 leading-relaxed">
                      {news.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 병원 시설 및 최신 검사장비 6열 갤러리 섹션 (스태거 리빌 + 쇼룸 호버 줌인 리프트) */}
      <section
        ref={facilitySectionRef}
        className="Gem_FacilitySection w-full py-16 sm:py-20 bg-white overflow-hidden"
        id="facility-tour"
      >
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* 상단 섹션 헤더 및 카테고리 필터 (스크롤 리빌) */}
          <div
            className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 transition-all duration-700 ease-out ${
              isFacilityVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div>
              <span className="inline-block bg-[#EBF2FC] text-[#0052CC] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                STATE-OF-THE-ART EQUIPMENT
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                병원 시설 및 최신 검사장비
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-1.5">
                건강검진센터와 초정밀 영상 장비를 비롯한 최신 검사·치료 시설을 갖추고
                있습니다.
              </p>
            </div>

            {/* 필터 탭 버튼 (scale-105 제거 및 py-1 적용으로 스크롤바 생성 방지) */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
              {facilityCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedFacilityCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                    selectedFacilityCategory === cat
                      ? "bg-[#0052CC] text-white shadow-sm border border-[#0052CC]"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 6열 컴팩트 시설 카드 그리드 (min-h-[220px] 적용으로 필터 전환 시 세로 스크롤바 깜빡임 완전 방지) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-[220px]">
            {filteredFacilities.map((fac, idx) => (
              <div
                key={fac.id}
                style={{
                  transitionDelay: `${idx * 80}ms`,
                }}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 group cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-[#0052CC]/40 ${
                  isFacilityVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* 사진 썸네일 (Next.js Image 적용 + 호버 줌인) */}
                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                  <Image
                    src={fac.imageUrl}
                    alt={fac.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  {/* 사진 좌하단 뱃지 */}
                  <span className="absolute bottom-2 left-2 z-10 bg-[#071E54]/85 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-bold shadow-sm">
                    {fac.tag}
                  </span>
                </div>

                {/* 하단 텍스트 정보 */}
                <div className="p-3.5 bg-white">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-[#0052CC] transition-colors">
                    {fac.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 truncate">
                    {fac.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
