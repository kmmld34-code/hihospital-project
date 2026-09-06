"use client";

import React from "react";
import Link from "next/link";
import Gem_HeroCarousel from "@/components/Gem_HeroCarousel";
import Gem_QuickReservationBar from "@/components/Gem_QuickReservationBar";
import Gem_InteractiveBody3D from "@/components/Gem_InteractiveBody3D";
import Gem_DoctorsSpotlight from "@/components/Gem_DoctorsSpotlight";
import Gem_SpecialtyCenters from "@/components/Gem_SpecialtyCenters";
import { Play, ArrowRight, ShieldCheck, Newspaper, Award } from "lucide-react";

/**
 * ==============================================================================
 * [HI Hospital] 메인 인덱스 홈 페이지
 * ==============================================================================
 * - 핵심 규격: 모든 본문 블록은 max-w-[1400px] mx-auto 중앙 정렬!
 * - 구성:
 *   1) Gem_HeroCarousel: 최상단 7초 자동 롤링 캐러셀 슬라이더
 *   2) Gem_QuickReservationBar: 플로팅 퀵 간편예약 신청 바
 *   3) Gem_InteractiveBody3D: 인천하이병원 시그니처 3D 통증 부위 자가진단
 *   4) Gem_DoctorsSpotlight: 바로서구병원 벤치마킹 10인 전문의 스포트라이트
 *   5) Gem_SpecialtyCenters: 4대 중점 특화 진료센터
 *   6) 환자 치료 스토리 & HI NEWS 언론보도 섹션
 *   7) 첨단 시설 및 의료장비 갤러리 섹션
 * ==============================================================================
 */
export default function HomePage() {
  return (
    <div className="Gem_HomePage w-full pb-16">
      {/* 1. 최상단 히어로 배너 (인터랙티브 7초 캐러셀, 1400px 내부 정렬) */}
      <Gem_HeroCarousel />

      {/* 2. 플로팅 간편예약 접수 바 (1400px 내부 정렬) */}
      <Gem_QuickReservationBar />

      {/* 3. 3D 인터랙티브 통증 부위 자가진단기 (인천하이병원 시그니처, 1400px 내부 정렬) */}
      <Gem_InteractiveBody3D />

      {/* 4. 10인의 전문 의료진 소개 섹션 (바로서구병원 벤치마킹, 1400px 내부 정렬) */}
      <Gem_DoctorsSpotlight />

      {/* 5. 4대 중점 특화 진료센터 (1400px 내부 정렬) */}
      <Gem_SpecialtyCenters />

      {/* 6. 환자 치료 스토리 & 언론보도(NEWS) 섹션 (1400px 내부 정렬) */}
      <section className="Gem_StorySection w-full py-16 md:py-24 bg-white">
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* 좌측: 환자 치료 스토리 */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#0052CC] bg-blue-50 px-2.5 py-1 rounded-full">
                    PATIENT STORIES
                  </span>
                  <span className="text-xs text-slate-400 font-medium">유튜브 영상 인터뷰</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  생생한 환자 회복 인터뷰
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                  "극심했던 디스크 통증, 수술 없이 걸어서 퇴원했습니다!" 실제 환자분들의 감동적인 회복 스토리를 확인하세요.
                </p>

                {/* 영상 썸네일 카드 */}
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg group cursor-pointer bg-slate-900 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                    alt="환자 인터뷰 썸네일"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5">
                    <div className="w-12 h-12 rounded-full bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center mb-3 shadow-xl transition-transform group-hover:scale-110">
                      <Play className="w-5 h-5 ml-1 fill-white" />
                    </div>
                    <h4 className="text-white text-base font-bold leading-tight">
                      [치료후기] 척추관협착증 비수술 신경성형술 2주 후 일상 복귀
                    </h4>
                  </div>
                </div>
              </div>

              <Link
                href="/community/blog"
                className="inline-flex items-center text-xs font-bold text-[#0052CC] hover:text-[#0043A6] transition-colors"
              >
                <span>치료후기 더 보러가기</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* 우측: HI Hospital 언론보도 및 병원소식 */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                    HI HOSPITAL NEWS
                  </span>
                  <Link href="/community/news" className="text-xs text-[#0052CC] font-bold hover:underline">
                    전체보기
                  </Link>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  병원 소식 & 언론보도
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                  각종 공중파 방송 출연, 학술 세미나 발표, 원내 최신 소식을 빠르게 전달해 드립니다.
                </p>

                {/* 뉴스 리스트 아이템 3개 */}
                <div className="space-y-3.5 mb-4">
                  <Link
                    href="/community/news"
                    className="p-4 rounded-xl bg-white border border-slate-200/70 hover:border-blue-300 hover:shadow-md transition-all block group"
                  >
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 mb-1">
                      <Newspaper className="w-3.5 h-3.5 text-[#0052CC]" />
                      <span>조선일보 메디컬 라이프</span>
                      <span>•</span>
                      <span>2026.09.01</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#0052CC] transition-colors line-clamp-1">
                      김진수 대표원장, 최소절개 인공관절 수술 3,000례 달성 기념 학술발표
                    </h4>
                  </Link>

                  <Link
                    href="/community/news"
                    className="p-4 rounded-xl bg-white border border-slate-200/70 hover:border-blue-300 hover:shadow-md transition-all block group"
                  >
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 mb-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>원내 주요 공지</span>
                      <span>•</span>
                      <span>2026.08.28</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#0052CC] transition-colors line-clamp-1">
                      최신 독일 지멘스사 3.0T MRI 정밀 영상진단 장비 추가 도입 안내
                    </h4>
                  </Link>

                  <Link
                    href="/community/news"
                    className="p-4 rounded-xl bg-white border border-slate-200/70 hover:border-blue-300 hover:shadow-md transition-all block group"
                  >
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>보건복지부 인증</span>
                      <span>•</span>
                      <span>2026.08.15</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#0052CC] transition-colors line-clamp-1">
                      보건복지부 4주기 의료기관 인증 획득 (환자 안전 및 감염관리 우수)
                    </h4>
                  </Link>
                </div>
              </div>

              <Link
                href="/community/news"
                className="inline-flex items-center text-xs font-bold text-[#0052CC] hover:text-[#0043A6] transition-colors"
              >
                <span>언론보도 더 보러가기</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 최첨단 시설 및 장비 둘러보기 (1400px 내부 정렬) */}
      <section className="Gem_FacilitySection w-full py-16 bg-slate-50 border-t border-slate-100">
        <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#0052CC] uppercase tracking-wider block mb-1">
              ADVANCED MEDICAL INFRASTRUCTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
              최첨단 의료시설 및 정밀 검사장비
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              대학병원급 청정 무균 수술실과 고해상도 영상장비로 안전하고 쾌적한 의료 환경을 제공합니다.
            </p>
          </div>

          {/* 시설 갤러리 6열 그리드 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: "3.0T 고해상도 MRI", tag: "정밀영상", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80" },
              { title: "128채널 MDCT", tag: "당일판독", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80" },
              { title: "청정 무균 수술실", tag: "감염0%", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80" },
              { title: "1:1 감압 도수치료실", tag: "재활센터", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80" },
              { title: "인공신장실 투석센터", tag: "독립음압", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
              { title: "쾌적한 호텔식 입원실", tag: "간호간병", img: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=400&q=80" },
            ].map((facility, idx) => (
              <div
                key={idx}
                className="Gem_Card overflow-hidden rounded-2xl border border-slate-200 bg-white group cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                  <img
                    src={facility.img}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {facility.tag}
                  </span>
                </div>
                <div className="p-3 text-center">
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#0052CC] transition-colors truncate">
                    {facility.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
