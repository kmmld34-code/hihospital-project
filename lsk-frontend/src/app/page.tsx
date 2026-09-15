"use client";

import React, { useState } from "react";
import Link from "next/link";
import Gem_HeroCarousel from "@/components/Gem_HeroCarousel";
import Gem_QuickReservationBar from "@/components/Gem_QuickReservationBar";
import Gem_InteractiveBody3D from "@/components/Gem_InteractiveBody3D";
import Gem_DoctorsSpotlight from "@/components/Gem_DoctorsSpotlight";
import Gem_ClinicalMetrics from "@/components/Gem_ClinicalMetrics";
import Gem_SpecialtyCenters from "@/components/Gem_SpecialtyCenters";
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
 * [HI Hospital] 메인 인덱스 홈 페이지 (스티치 디자인 전면 반영)
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM
 * ==============================================================================
 * [프로젝트 핵심 원칙]
 * 1. 1400px 컨테이너 규격 엄수:
 *    - 모든 섹션의 본문 콘텐츠는 max-w-[1400px] mx-auto 중앙 정렬
 * 2. Gem_ 접두사 명명 규칙 준수:
 *    - 컴포넌트 및 주요 식별 클래스에 Gem_ 접두사 적용
 * 3. 스티치 메인 페이지 전체 구조:
 *    - 1) Gem_HeroCarousel: 최상단 풀와이드 7초 자동 롤링 캐러셀 배너
 *    - 2) Gem_QuickReservationBar: 1400px 플로팅 원스톱 간편예약 신청 바 (750px 동의 모달 포함)
 *    - 3) Gem_InteractiveBody3D: 6대 신체 부위 인터랙티브 자가진단 카드
 *    - 4) Gem_DoctorsSpotlight: 풍부한 임상경험과 검증된 실력의 10인 전문의 섹션
 *    - 5) Gem_ClinicalMetrics: 신뢰할 수 있는 임상 경험과 풍부한 수술 실적 (5,000례+)
 *    - 6) Gem_SpecialtyCenters: 중점 특화 진료센터 4대 큐레이션
 *    - 7) 환자 치료 스토리 & 하이병원 소식 & 언론보도 2열 스플릿 섹션
 *    - 8) 병원 시설 및 최신 검사장비 6열 갤러리 섹션 (카테고리 필터링 지원)
 * ==============================================================================
 */
export default function HomePage() {
  const [selectedFacilityCategory, setSelectedFacilityCategory] = useState("전체");

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
      {/* 1. 최상단 히어로 배너 (풀배경 엣지투엣지 + 1400px 내부 중앙 정렬) */}
      <Gem_HeroCarousel />

      {/* 2. 원스톱 간편예약 신청 바 (1400px 플로팅 오버랩 카드 + 750px 개인정보 모달) */}
      <Gem_QuickReservationBar />

      {/* 3. 인천하이병원 척추·관절·통증 인터랙티브 자가진단기 (1400px 내부 2열 분할) */}
      <Gem_InteractiveBody3D />

      {/* 4. 풍부한 임상경험과 검증된 실력의 의료진 (1400px 내부 4열 카드 + 진료과 필터) */}
      <Gem_DoctorsSpotlight />

      {/* 5. 신뢰할 수 있는 임상 경험과 풍부한 수술 실적 (1400px 내부 4대 카운터 지표) */}
      <Gem_ClinicalMetrics />

      {/* 6. 중점 특화 진료센터 큐레이션 (1400px 내부 4대 특화센터) */}
      <Gem_SpecialtyCenters />

      {/* 7. 환자 치료 스토리 & 하이병원 소식 및 언론보도 2열 스플릿 섹션 (1400px 중앙 정렬) */}
      <section className="Gem_StoryAndNewsSection w-full bg-[#F0F3FF] py-16 sm:py-20">
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* 좌측 열: 생생한 환자 치료 스토리 (블로그 스토리) */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#0052CC] text-xs font-bold uppercase tracking-wider block mb-1">
                    BLOG STORIES
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    생생한 환자 치료 스토리
                  </h3>
                </div>
                <Link
                  href="/community/blog"
                  className="text-xs sm:text-sm font-bold text-[#0052CC] hover:underline flex items-center gap-1"
                >
                  <span>블로그 전체보기</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 환자 치료 후기 카드 */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex-1 flex flex-col justify-between border border-slate-200/80 group hover:-translate-y-1">
                {/* 상단 썸네일 이미지 및 평점 오버레이 */}
                <div className="relative w-full bg-[#071E54] overflow-hidden min-h-[300px] sm:min-h-[340px]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwpp_AWm8PeRte1qe35tMrpkS-vfNJyHsC4Uy8fpCVTOQcUVOdGF0HfQZzjFKhti8_268D1AoeCtTlkwArI36dxEkDc0yIiIxf5CVSuM-YIxU-kcWF8dGWzq-YfqoWR8D8Ei03mo2BbC5cSMJVtYTh6WcQ_ZK32lN--qQjd9yZd6Z7P5H1LtJp5pT5mMtJ3Ewp97ovrMdtaUIHB9_fvoGfa8Q8sNOZghY8oTLc4eGhGpWkPjxlRSqOoA"
                    alt="환자 치료 후기 사진"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071E54]/90 via-[#071E54]/30 to-transparent" />

                  {/* 블로그 스토리 뱃지 */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#0052CC]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                      <Camera className="w-3.5 h-3.5" />
                      <span>블로그 스토리</span>
                    </span>
                  </div>

                  {/* 별점 및 평점 표시 */}
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white z-10">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-white text-xs font-bold ml-1.5">
                        5.0 (치료 만족도)
                      </span>
                    </div>
                  </div>
                </div>

                {/* 하단 텍스트 및 상세 인터뷰 내용 */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="bg-[#EBF2FC] text-[#0052CC] text-xs px-2.5 py-0.5 rounded-full font-bold">
                      허리디스크 비수술
                    </span>
                    <span className="text-slate-400 text-xs font-medium">
                      박OO 환자 (62세)
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0052CC] transition-colors leading-snug">
                    "밤마다 잠을 못 이룰 정도로 극심했던 허리통증, 비수술 신경성형술로
                    말끔히 회복했습니다!"
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-500 mt-2.5 leading-relaxed break-keep">
                    여러 병원에서 무조건 수술을 권유받아 걱정이 컸는데,
                    인천하이병원에서는 정확한 정밀검사 후 비수술 치료를 최우선으로
                    진행해 주셨습니다. 원장님의 자상한 설명 덕분에 불안감 없이 빠르게
                    회복했습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 우측 열: 하이병원 소식 & 언론보도 */}
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
                  className="text-xs sm:text-sm font-bold text-[#008B96] hover:underline flex items-center gap-1"
                >
                  <span>소식 더보기</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 4개 뉴스 아이템 리스트 */}
              <div className="space-y-3.5">
                {GEM_NEWS_ITEMS.map((news) => (
                  <Link
                    key={news.id}
                    href={news.link}
                    className="block bg-white p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-[#0052CC]/40 border border-slate-200/80 transition-all group hover:-translate-y-0.5"
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

      {/* 8. 병원 시설 및 최신 검사장비 6열 갤러리 섹션 (1400px 중앙 정렬) */}
      <section className="Gem_FacilitySection w-full py-16 sm:py-20 bg-white" id="facility-tour">
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* 상단 섹션 헤더 및 카테고리 필터 */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
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

            {/* 필터 탭 버튼 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {facilityCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedFacilityCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedFacilityCategory === cat
                      ? "bg-[#0052CC] text-white shadow-md scale-105"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 6열 컴팩트 시설 카드 그리드 (1400px 내부) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredFacilities.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-200/80 group hover:-translate-y-1"
              >
                {/* 사진 썸네일 */}
                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                  <img
                    src={fac.imageUrl}
                    alt={fac.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* 사진 좌하단 뱃지 */}
                  <span className="absolute bottom-2 left-2 bg-[#071E54]/85 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-bold">
                    {fac.tag}
                  </span>
                </div>

                {/* 하단 텍스트 정보 */}
                <div className="p-3.5">
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
