"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  HeartHandshake, 
  Activity, 
  Users2, 
  Award, 
  Stethoscope, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Quote, 
  ShieldCheck, 
  Building2,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Gem_SubPageHeader, { SubPageTabItem } from "./Gem_SubPageHeader";
import Gem_ScrollReveal from "./Gem_ScrollReveal";

/**
 * ==============================================================================
 * [The LSK] 병원소개 & 인사말 통합 브랜드 페이지 (Gem_AboutGreetingPage.tsx)
 * ==============================================================================
 * 기획 & 감수: 강수진 실장 (PM), 정재이 과장 (UI/UX)
 * 
 * [대표님 2차 피드백 반영 개선 사항]
 *  1. 섹션 A 좌/우 컴포넌트 높이 동기화 (items-stretch, h-full):
 *     - 좌측 카드 상단에 대표원장 프로필 사진(/images/director_portrait.jpg)을 신뢰감 있게 배치
 *     - 좌측(원장 사진 + 철학 카드)과 우측(정성 어린 인사말 편지글)의 세로 길이가 동일하게 정돈됨
 *  2. 상단 헤더 높이 150% 확장 및 우측 2~3줄 카피 + 3D 일러스트 엠블럼 연계
 *  3. 섹션 B 병원 전경 및 핵심 역량 3대 카드 + 신뢰 배너의 통일성 유지
 * ==============================================================================
 */

// 탭 메뉴 리스트 (navigationData.ts의 병원소개 하위 항목과 1:1 동기화)
const ABOUT_TABS: SubPageTabItem[] = [
  { name: "인사말", href: "/about/greeting" },
  { name: "의료진소개", href: "/about/doctors", badge: "10인 전문의" },
  { name: "진료시간안내", href: "/about/hours" },
  { name: "입원안내", href: "/about/hospitalization" },
  { name: "오시는길", href: "/about/directions" },
];

export default function Gem_AboutGreetingPage() {
  // 병원 전경 이미지 로드 실패 시 고급스러운 메디컬 벡터 그래픽으로 대체하는 상태값
  const [imgError, setImgError] = useState(false);

  // 핵심 역량 3대 포인트 데이터
  const coreFeatures = [
    {
      icon: Activity,
      tag: "토탈 진료 커버리지",
      title: "척추·관절부터 내과·검진까지",
      desc: "척추·관절·통증·뇌신경질환과 외과·내과·인공신장실·여성질환 및 종합건강검진까지 원스톱으로 진료합니다.",
      highlight: "원스톱 다각도 케어",
    },
    {
      icon: Stethoscope,
      tag: "정밀 맞춤 진료",
      title: "세심한 문진과 복합 정밀 진단",
      desc: "세심한 문진과 복합 검사를 통한 정밀 진단으로 개인별·증상별·원인별 최적화된 맞춤치료를 제안합니다.",
      highlight: "환자별 1:1 맞춤 솔루션",
    },
    {
      icon: Users2,
      tag: "11인 전문의 협진",
      title: "치료에서 재활까지 토탈 책임케어",
      desc: "11명의 전문의가 협진하는 토탈케어 병원으로서 환자의 수술·비수술 치료부터 사후 재활까지 책임감 있게 진료합니다.",
      highlight: "전문의 협진 시스템",
    },
  ];

  // 임상 수치 요약 데이터
  const clinicalStats = [
    { label: "척추 수술", count: "5,000례+", desc: "최근 5년간 집도 (전문의 1인 기준)" },
    { label: "인공관절 및 관절경", count: "8,000례+", desc: "인공관절 3천례·관절경 5천례 이상" },
    { label: "대장·위 내시경", count: "15,000례+", desc: "정밀 암 조기 진단 실적" },
    { label: "분야별 숙련 전문의", count: "11인", desc: "분야별 맞춤 협진 의료진" },
  ];

  return (
    <div className="w-full bg-white text-slate-800">
      {/* 1. 서브페이지 공통 헤더 (높이 150% 확장 + 우측 2~3줄 카피 + 3D 엠블럼 아이콘) */}
      <Gem_SubPageHeader
        categoryTitle="병원소개"
        categorySubTitle="ABOUT INCHEON HI HOSPITAL"
        description={"정확한 진단과 따뜻한 소통으로,\n몸의 불편 뿐 아니라 마음의 걱정까지\n덜어드리는 인천하이병원입니다."}
        currentHref="/about/greeting"
        breadcrumbs={[
          { label: "병원소개", href: "/about" },
          { label: "인사말", href: "/about/greeting" },
        ]}
        tabItems={ABOUT_TABS}
        rightGraphicSrc="/images/subpage_medical_icon.jpg"
      />

      {/* 2. [섹션 A] 병원장 인사말 (Greeting 영역 - 대표원장 사진 추가 및 좌우 높이 100% 동기화) */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
        {/* 장식용 은은한 배경 요소 */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="Gem_Container">
          {/* 섹션 상단 헤더 배지 & 타이틀 */}
          <Gem_ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-gem-primary border border-blue-100 uppercase tracking-wider mb-4">
                <HeartHandshake className="w-4 h-4 text-gem-secondary" />
                Director&apos;s Greeting
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gem-primaryDark tracking-tight leading-tight sm:leading-snug">
                몸의 불편 뿐 아니라, <br className="hidden sm:inline" />
                <span className="Gem_TextGradient">마음의 걱정까지 살피려</span> 노력합니다
              </h2>
              <div className="w-12 h-1 bg-gem-secondary mx-auto mt-5 rounded-full" />
            </div>
          </Gem_ScrollReveal>

          {/* 본문 콘텐츠 그리드 (좌우 높이 동일하게 items-stretch 적용) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* [좌측 컬럼: 5열] 위쪽 대표원장 사진 + 아래쪽 미션/철학 카드로 우측과 높이 완벽 일치 */}
            <div className="lg:col-span-5 flex flex-col">
              <Gem_ScrollReveal direction="right" delay={0.2} className="h-full flex flex-col gap-6">
                
                {/* 1) 상단 대표원장 프로필 사진 카드 */}
                <div className="relative rounded-3xl overflow-hidden shadow-gem-soft border border-slate-200/80 bg-slate-900 group">
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                    <Image
                      src="/images/director_portrait.jpg"
                      alt="인천하이병원 대표원장"
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority
                    />
                    {/* 사진 하단 소프트 그라디언트 및 명패 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gem-primary/90 text-white text-xs font-bold tracking-wide">
                          <Sparkles className="w-3 h-3 text-[#00A8B5]" />
                          대표원장
                        </span>
                        <span className="text-xs text-slate-300 font-medium">정형외과 전문의</span>
                      </div>
                      <h4 className="text-xl font-bold text-white tracking-tight">
                        인천하이병원 대표원장
                      </h4>
                      <p className="text-xs text-blue-200/90 mt-1">
                        &quot;환자 한 분 한 분의 빠른 쾌유와 일상 복귀를 약속합니다.&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2) 하단 미션 & 진료 철학 카드 (남은 높이를 꽉 채우도록 flex-1) */}
                <div className="flex-1 relative rounded-3xl overflow-hidden shadow-gem-floating bg-gradient-to-br from-gem-primaryDark to-[#0052CC] text-white p-7 sm:p-8 flex flex-col justify-between">
                  {/* 대형 인용구 백그라운드 아이콘 */}
                  <Quote className="absolute top-5 right-5 w-16 h-16 text-white/10 pointer-events-none" />

                  <div className="relative z-10">
                    <span className="text-xs font-bold tracking-widest text-[#00A8B5] uppercase block mb-2">
                      Philosophy & Promise
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black leading-snug mb-4">
                      “환자의 목소리에 귀 기울이는 <br />
                      따뜻한 평생 건강 동반자”
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed mb-5">
                      질환의 수치만을 보지 않고, 환자분이 겪는 불안과 고통을 공감하며 
                      가족을 돌보는 마음으로 정성을 다하겠습니다.
                    </p>
                  </div>

                  {/* 진료 철학 3대 약속 */}
                  <div className="space-y-2.5 pt-4 border-t border-white/15 relative z-10">
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-blue-50 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#00A8B5] flex-shrink-0" />
                      <span>정확한 진단과 안전 최우선 원칙</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-blue-50 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#00A8B5] flex-shrink-0" />
                      <span>과잉 진료 없는 환자 중심 맞춤 치료</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-blue-50 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#00A8B5] flex-shrink-0" />
                      <span>치료 후 완쾌까지 체계적인 재활 케어</span>
                    </div>
                  </div>
                </div>

              </Gem_ScrollReveal>
            </div>

            {/* [우측 컬럼: 7열] 정성 어린 인사말 본문 텍스트 (좌측과 동일한 높이로 정돈) */}
            <div className="lg:col-span-7 flex flex-col">
              <Gem_ScrollReveal direction="left" delay={0.3} className="h-full">
                <div className="h-full bg-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-slate-200/80 shadow-gem-soft relative flex flex-col justify-between">
                  <div>
                    {/* 상단 장식 바 */}
                    <div className="flex items-center gap-2 text-gem-primary font-bold text-sm tracking-wide mb-6">
                      <span className="w-2.5 h-2.5 rounded-full bg-gem-primary animate-pulse" />
                      인천하이병원을 찾아주시는 여러분께
                    </div>

                    {/* 편지글 형식 본문 */}
                    <div className="space-y-5 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                      <p className="font-semibold text-slate-900 text-lg sm:text-xl">
                        안녕하세요. 인천하이병원을 찾아주시는 모든 분들께 먼저 감사의 인사를 드립니다.
                      </p>
                      
                      <p>
                        병원을 찾는다는 것은 몸의 불편함 뿐만 아니라 
                        <strong className="text-gem-primary font-semibold"> 마음의 걱정까지 안고 오시는 일</strong>이라고 생각합니다.
                      </p>

                      <p>
                        그렇기에 저희는 질병만 치료하는 병원이 아니라, 
                        환자 한 분 한 분의 마음까지 살피는 병원이 되고자 항상 노력하고 있습니다.
                      </p>

                      <p>
                        정확한 진단과 안전한 치료는 물론, 
                        따뜻한 배려와 친절한 소통을 통해 환자분들이 안심하고 치료받으실 수 있는 
                        의료 환경을 만들겠습니다.
                      </p>

                      <p className="bg-blue-50/70 p-4 sm:p-5 rounded-xl border-l-4 border-gem-primary text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
                        &quot;작은 불편도 귀 기울여 듣고, 최선의 의료서비스로 보답드린다고 저희 병원을 방문하실 여러분들께 약속드립니다.&quot;
                      </p>

                      <p>
                        저희 인천하이병원은 풍부한 임상 경험과 전문성을 바탕으로 언제나 환자 중심의 진료를 실천하고, 
                        지역사회가 믿고 찾는 병원이 되기 위해 끊임없이 발전하며 
                        앞으로도 건강을 지키는 든든한 동반자로서 여러분 곁을 함께하겠습니다.
                      </p>

                      <p className="font-medium text-slate-900 pt-1">
                        감사합니다.
                      </p>
                    </div>
                  </div>

                  {/* 병원장 서명 영역 */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-400 block mb-0.5">인천하이병원 대표</span>
                      <p className="text-base sm:text-lg font-extrabold text-gem-primaryDark">
                        인천하이병원 병원장 및 의료진 일동
                      </p>
                    </div>

                    <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-100/80 rounded-xl text-xs font-semibold text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-gem-secondary" />
                      보건복지부 규격 감염관리 인증병원
                    </div>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 3. [섹션 B] 병원 소개 및 핵심 역량 (Hero & Feature 영역) */}
      <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        {/* 배경 앰비언트 빛망울 */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gem-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gem-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="Gem_Container relative z-10">
          {/* 섹션 인트로 타이틀 */}
          <Gem_ScrollReveal direction="up" delay={0.1}>
            <div className="max-w-3xl mb-14 lg:mb-16">
              <span className="text-xs font-bold tracking-widest text-[#00A8B5] uppercase block mb-3">
                HOSPITAL IDENTITY & VALUES
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                가족의 마음으로 함께하는 인천하이병원
              </h2>
              <p className="text-lg sm:text-xl text-blue-200/90 font-light">
                환자의 온전한 치유를 최우선으로 하는 <span className="text-[#00A8B5] font-semibold">토탈케어 의료 시스템</span>
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 병원 전경 비주얼 쇼케이스 카드 */}
          <Gem_ScrollReveal direction="up" delay={0.2}>
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl mb-16 group">
              <div className="relative h-64 sm:h-96 lg:h-[420px] w-full bg-slate-800 flex items-center justify-center">
                {!imgError ? (
                  <Image
                    src="/site/img/1787627250265_____-____.jpg"
                    alt="인천하이병원 전경"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={() => setImgError(true)}
                    priority
                  />
                ) : (
                  /* 이미지 로드 실패 시 정갈한 Fallback 그래픽 */
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 via-slate-900 to-[#071E54] text-center">
                    <Building2 className="w-16 h-16 text-[#00A8B5] mb-4 opacity-80" />
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      인천하이병원 메디컬 캠퍼스
                    </h3>
                    <p className="text-sm text-slate-400 max-w-md">
                      첨단 진료 시설과 쾌적한 입원 환경을 갖춘 지역 거점 관절·척추·내과 중심 종합 메디컬 센터
                    </p>
                  </div>
                )}

                {/* 하단 그라디언트 오버레이 및 캡션 */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
                  <div className="max-w-xl">
                    <span className="inline-block px-3 py-1 rounded-full bg-gem-primary/80 backdrop-blur-sm text-white text-xs font-bold mb-2">
                      INCHEON HI HOSPITAL
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                      환자의 안전과 쾌적한 치유를 최우선으로 설계된 공간
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      최신 무균 양압 수술실, 3.0T MRI, 정밀 내시경 및 첨단 인공신장실 보유
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Gem_ScrollReveal>

          {/* 핵심 포인트 3대 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {coreFeatures.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <Gem_ScrollReveal key={idx} direction="up" delay={0.2 + idx * 0.15}>
                  <div className="h-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-gem-primary/60 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 shadow-lg group flex flex-col justify-between">
                    <div>
                      {/* 카드 헤더 (아이콘 + 태그) */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gem-primary/20 text-[#00A8B5] flex items-center justify-center group-hover:bg-gem-primary group-hover:text-white transition-colors duration-300">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-700/60 text-slate-300">
                          {item.tag}
                        </span>
                      </div>

                      {/* 제목 & 설명 */}
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* 카드 하단 하이라이트 뱃지 */}
                    <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center gap-2 text-xs font-medium text-[#00A8B5]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A8B5]" />
                      {item.highlight}
                    </div>
                  </div>
                </Gem_ScrollReveal>
              );
            })}
          </div>

          {/* 4. 신뢰도 강조 배너 (섹션 하단 와이드 띠 배너 형태) */}
          <Gem_ScrollReveal direction="up" delay={0.3}>
            <div className="rounded-2xl bg-gradient-to-r from-blue-900/90 via-gem-primaryDark to-blue-950 border border-blue-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* 장식용 앰블럼 아이콘 */}
              <Award className="absolute -right-6 -bottom-6 w-36 h-36 text-white/5 pointer-events-none" />

              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="inline-block text-amber-400 text-xs font-bold tracking-wider uppercase mb-1">
                      PROVEN CLINICAL EXCELLENCE
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
                      풍부한 수술 및 임상 경험이 만든 확고한 의료 신뢰
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                      &quot;전문의 한 명 기준 최근 5년간 척추수술 5,000례 이상, 인공관절 3,000례·관절내시경 5,000례 이상, 
                      대장내시경 15,000례 등 경험 많은 숙련된 전문의가 여러분을 안전하게 케어합니다.&quot;
                    </p>
                  </div>
                </div>

                <Link
                  href="/about/doctors"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gem-primary hover:bg-gem-primaryHover text-white font-bold text-sm transition-all duration-200 shadow-md shadow-blue-900/50"
                >
                  <span>의료진 소개 바로가기</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Gem_ScrollReveal>

          {/* 4대 주요 임상 실적 지표 수치 그리드 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">
            {clinicalStats.map((stat, idx) => (
              <Gem_ScrollReveal key={idx} direction="up" delay={0.35 + idx * 0.1}>
                <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#00A8B5] tracking-tight mb-1">
                    {stat.count}
                  </div>
                  <div className="text-sm font-bold text-white mb-1">{stat.label}</div>
                  <div className="text-xs text-slate-400">{stat.desc}</div>
                </div>
              </Gem_ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 하단 퀵 링크 안내 카드 (다음 서브페이지 이동 가이드) */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="Gem_Container">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              인천하이병원 더 알아보기
            </h3>
            <p className="text-sm text-slate-500">
              원하시는 정보를 선택하시면 해당 서브페이지로 바로 이동합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* 의료진 소개 바로가기 */}
            <Link
              href="/about/doctors"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-gem-primary transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-gem-primary flex items-center justify-center mb-4 group-hover:bg-gem-primary group-hover:text-white transition-colors">
                <Users2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-gem-primary transition-colors mb-1 flex items-center justify-between">
                <span>10인의 전문 의료진</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-xs text-slate-500">
                척추, 관절, 내과, 외과 등 분야별 전문의의 약력과 세부 전공을 확인하세요.
              </p>
            </Link>

            {/* 진료시간 안내 바로가기 */}
            <Link
              href="/about/hours"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-gem-primary transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-gem-secondary flex items-center justify-center mb-4 group-hover:bg-gem-secondary group-hover:text-white transition-colors">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-gem-secondary transition-colors mb-1 flex items-center justify-between">
                <span>진료 시간 및 예약 안내</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-xs text-slate-500">
                평일, 토요일 진료 시간표와 점심시간 및 공휴일 진료 일정을 확인하세요.
              </p>
            </Link>

            {/* 오시는길 바로가기 */}
            <Link
              href="/about/directions"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-gem-primary transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-1 flex items-center justify-between">
                <span>오시는 길 & 주차 안내</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-xs text-slate-500">
                대중교통(지하철, 버스) 이용법과 병원 전용 주차장 무료 주차 혜택을 안내합니다.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
