"use client";

import React from "react";
import Link from "next/link";
import Gem_SubPageHeader from "@/components/Gem_SubPageHeader";
import Gem_ScrollReveal from "@/components/Gem_ScrollReveal";
import {
  ShieldCheck,
  Activity,
  ArrowRight,
  Zap,
  CheckCircle2,
  HeartPulse,
  Stethoscope,
  Sparkles,
  Phone,
} from "lucide-react";

/**
 * ==============================================================================
 * [인천하이병원] 뇌신경센터 마스터 통합 허브 페이지 (Gem_NeurosurgeryHubPage.tsx)
 * ==============================================================================
 * 기획 및 디자인 명세:
 * 1. 1400px 와이드 그리드 레이아웃 (max-w-[1400px])
 * 2. 상단 공식 표준 탭바(Gem_SubPageHeader) 단일 네비게이션으로 일원화 (중복 바 제거)
 * 3. 균형 잡힌 타이포그래피 & 여백 리듬:
 *    - 뱃지와 대제목 사이 넉넉한 상하 마진(mb-7~mb-9)
 *    - 대제목 여유로운 줄간격(leading-[1.3]~[1.35])
 *    - 대제목과 설명문 사이 충분한 공간(mb-6~mb-8)
 *    - 헤더와 본문 카드 간 넉넉한 수직 간격(mb-16~mb-24)
 *    - 섹션 상하 패딩(py-24~py-32) 및 카드 내부 여백(p-9~p-14)
 * 4. 4대 클리닉(두통·어지럼증, 치매, 뇌졸중, 말초신경병) 핵심 브리핑 및 상세페이지 바로가기
 * 5. 공식 바이올렛 예약/상담 뱃지 (1666-1675) 탑재
 * ==============================================================================
 */

export default function Gem_NeurosurgeryHubPage() {
  // 상단 브레드크럼 경로
  const breadcrumbs = [
    { label: "홈", href: "/" },
    { label: "진료과", href: "/neurosurgery" },
    { label: "뇌신경센터", href: "/neurosurgery" },
  ];

  // 동일 뎁스 서브메뉴 탭
  const tabItems = [
    { name: "두통·어지럼증", href: "/neurosurgery/headache-dizziness" },
    { name: "치매", href: "/neurosurgery/dementia" },
    { name: "뇌졸중(중풍)", href: "/neurosurgery/stroke" },
    { name: "말초신경병", href: "/neurosurgery/peripheral-neuropathy" },
  ];


  return (
    <div className="w-full min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* =========================================================================
          0. 상단 공통 헤더 (단색 #062667)
          ========================================================================= */}
      <Gem_SubPageHeader
        categoryTitle="뇌신경센터"
        categorySubTitle="NEUROLOGY & NEUROSURGERY CENTER"
        description="두통·어지럼증부터 치매, 뇌졸중, 말초신경병까지. 원인 감별 정밀 검진과 1:1 맞춤 진료로 뇌와 신경 건강을 지킵니다."
        currentHref="/neurosurgery"
        breadcrumbs={breadcrumbs}
        tabItems={tabItems}
      />


      {/* =========================================================================
          [CLINIC 01] 두통·어지럼증 클리닉 요약 (화이트 배경, 딥 그린 #0C7657)
          ========================================================================= */}
      <section id="clinic-headache" className="w-full bg-white py-24 lg:py-32 border-b border-gray-150">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

          {/* 대제목 & 그린 알약 뱃지 헤더 (줄간격 및 마진 넉넉히 개선) */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="text-center mb-16 sm:mb-20 lg:mb-24">
              {/* 알약형 뱃지 (하단 마진 mb-7 sm:mb-9 로 확장) */}
              <div className="flex justify-center mb-7 sm:mb-9">
                <span className="inline-block px-10 py-3.5 rounded-full bg-[#0C7657] text-white text-base sm:text-lg font-black shadow-sm tracking-wide">
                  CLINIC 01. 두통 · 어지럼증 클리닉
                </span>
              </div>
              
              {/* 대제목 (폰트 확대 및 여유로운 줄간격 leading-[1.3]~[1.35] 적용) */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black text-gray-900 tracking-tight leading-[1.3] sm:leading-[1.35] mb-6 sm:mb-8 break-keep">
                단순 진통제로 해결되지 않는 만성 두통과 어지럼증의 근본 원인 규명
              </h2>

              {/* 인트로 설명문 (줄간격 leading-[1.75], 폰트 크기 확대) */}
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-[1.7] sm:leading-[1.75] break-keep font-medium">
                두통과 어지럼증은 인구의 대다수가 겪는 흔한 증상이지만, <strong className="text-gray-900 font-bold">뇌종양 · 뇌혈관 기형 · 전정신경염 등 위험한 뇌질환의 경고 신호</strong>일 수 있습니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 지그재그 1: [좌측 텍스트 요약 카드] + [우측 두통/어지럼증 SVG 일러스트] (여유로운 간격 gap-12 lg:gap-16 xl:gap-20) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
            
            {/* 좌측: 두통/어지럼증 핵심 감별 요약 카드 (내부 패딩 p-9 sm:p-12 lg:p-14) */}
            <div className="lg:col-span-7">
              <Gem_ScrollReveal direction="left" duration={1.2} delay={0.1}>
                <div className="bg-[#F8FBF9] rounded-[32px] p-9 sm:p-12 lg:p-14 border border-emerald-900/10 shadow-sm space-y-8 lg:space-y-10">
                  
                  {/* 파트 1: 두통 케어 */}
                  <div className="space-y-3">
                    <span className="inline-block text-xs font-bold text-[#0C7657] uppercase tracking-wider bg-emerald-100/70 px-3.5 py-1 rounded-full mb-1">
                      HEADACHE CARE
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                      1차성 편두통과 위험한 2차성 두통 감별
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-[1.7] break-keep font-normal">
                      원인 질환 없는 편두통·긴장형 두통부터 뇌압 상승이나 혈관 이상으로 발생하는 2차성 두통까지, 정밀 신경과 진찰로 정확히 분류합니다.
                    </p>
                  </div>

                  {/* 파트 2: 어지럼증 케어 */}
                  <div className="pt-6 sm:pt-8 border-t border-emerald-100 space-y-3">
                    <span className="inline-block text-xs font-bold text-[#0C7657] uppercase tracking-wider bg-emerald-100/70 px-3.5 py-1 rounded-full mb-1">
                      DIZZINESS CARE
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                      4대 어지럼증 (현훈 · 균형장애 · 실신성 · 심인성)
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-[1.7] break-keep font-normal">
                      빙글빙글 도는 전정질환(이석증, 전정신경염)과 중심을 잡지 못하는 중추성 소뇌 병변을 첨단 전정기능 검사로 신속히 구별합니다.
                    </p>
                  </div>

                  {/* 의심 체크 태그 */}
                  <div className="pt-6 sm:pt-8 border-t border-emerald-100 flex flex-wrap gap-2.5 text-xs sm:text-sm font-semibold text-emerald-950">
                    <span className="bg-white px-3.5 py-2 rounded-xl border border-emerald-200 shadow-2xs">#박동성 편두통</span>
                    <span className="bg-white px-3.5 py-2 rounded-xl border border-emerald-200 shadow-2xs">#자세 변화 시 핑 도는 현훈</span>
                    <span className="bg-white px-3.5 py-2 rounded-xl border border-emerald-200 shadow-2xs">#이석정복술 &amp; 3.0T MRI</span>
                  </div>

                  {/* 서브페이지 바로가기 CTA 버튼 */}
                  <div className="pt-6 sm:pt-8 border-t border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">
                      두통의 원인, 감별 검사, 약물 예방 치료 안내
                    </span>
                    <Link
                      href="/neurosurgery/headache-dizziness"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0C7657] hover:bg-[#095740] text-white font-bold text-sm sm:text-base shadow-md transition-all group whitespace-nowrap shrink-0"
                    >
                      <span>두통·어지럼증 클리닉 자세히 보기</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측: 두통/어지럼증 SVG 일러스트 (넉넉한 스케일) */}
            <div className="lg:col-span-5 flex justify-center">
              <Gem_ScrollReveal direction="right" duration={1.2} delay={0.15}>
                <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[340px] lg:h-[340px] relative flex items-center justify-center">
                  <svg className="w-full h-full drop-shadow-md" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="150" cy="150" r="130" fill="#F4EAE2" />
                    <path d="M70 270C70 215 105 195 150 195C195 195 230 215 230 270" fill="#F8CBB8" />
                    <path d="M135 170H165V205H135V170Z" fill="#F9D4C2" />
                    <ellipse cx="150" cy="140" rx="42" ry="50" fill="#FFE5D8" />
                    <circle cx="108" cy="142" r="9" fill="#F9D4C2" />
                    <circle cx="192" cy="142" r="9" fill="#F9D4C2" />
                    <path d="M100 130C95 180 100 230 115 250M200 130C205 180 200 230 185 250" stroke="#3D261D" strokeWidth="18" strokeLinecap="round" />
                    <path d="M110 115C125 90 175 90 190 115C195 125 190 145 190 145L110 145C110 145 105 125 110 115Z" fill="#3D261D" />
                    <path d="M110 115Q150 130 185 110Q150 95 110 115Z" fill="#2E1B13" />
                    <path d="M128 138Q135 144 142 138" stroke="#4A3B32" strokeWidth="3" strokeLinecap="round" />
                    <path d="M158 138Q165 144 172 138" stroke="#4A3B32" strokeWidth="3" strokeLinecap="round" />
                    <path d="M144 165Q150 162 156 165" stroke="#BA6C65" strokeWidth="3" strokeLinecap="round" />
                    <path d="M210 240L195 160L175 140" stroke="#FFE5D8" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M85 85L95 95L88 102M215 85L205 95L212 102" stroke="#0C7657" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Gem_ScrollReveal>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          [CLINIC 02] 치매(인지기능) 클리닉 요약 (풀와이드 딥 바이올렛 #2E1848 밴딩)
          ========================================================================= */}
      <section id="clinic-dementia" className="w-full bg-[#2E1848] text-white py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

          {/* 대제목 & 화이트 알약 뱃지 헤더 (줄간격 및 마진 넉넉히 개선) */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="text-center mb-16 sm:mb-20 lg:mb-24">
              {/* 알약형 뱃지 */}
              <div className="flex justify-center mb-7 sm:mb-9">
                <span className="inline-block px-10 py-3.5 rounded-full bg-white text-[#2E1848] text-base sm:text-lg font-black shadow-sm tracking-wide">
                  CLINIC 02. 치매 · 인지기능 클리닉
                </span>
              </div>
              
              {/* 대제목 */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black text-white tracking-tight leading-[1.3] sm:leading-[1.35] mb-6 sm:mb-8 break-keep">
                조기 발견으로 진행을 늦추고 삶의 질을 지키는 2인 3각의 케어
              </h2>

              {/* 인트로 설명문 */}
              <p className="text-lg sm:text-xl lg:text-2xl text-purple-100/90 max-w-4xl mx-auto leading-[1.7] sm:leading-[1.75] break-keep font-normal">
                치매는 서서히 진행되는 질환입니다. 조기에 신경인지기능검사와 정밀 영상으로 감별하면 <strong className="text-white font-bold underline decoration-purple-300 decoration-2">독립적인 일상생활 기간을 최대한 연장</strong>할 수 있습니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 지그재그 2: [좌측 인지회상 SVG 일러스트] + [우측 텍스트 요약 카드] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
            
            {/* 좌측: 기억을 보살피는 따뜻한 플랫 벡터 SVG 일러스트 */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <Gem_ScrollReveal direction="left" duration={1.2} delay={0.1}>
                <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[340px] lg:h-[340px] relative flex items-center justify-center">
                  <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="150" cy="150" r="130" fill="#F4EEFB" />
                    <path d="M70 270C70 215 105 195 150 195C195 195 230 215 230 270" fill="#D9CCE8" />
                    <path d="M135 170H165V205H135V170Z" fill="#F5D8C7" />
                    <ellipse cx="150" cy="140" rx="42" ry="48" fill="#F9DFD0" />
                    <path d="M106 130C106 90 128 80 150 80C172 80 194 90 194 130C194 135 190 140 190 140L110 140C110 140 106 135 106 130Z" fill="#E8E2EC" />
                    <path d="M126 138Q135 143 144 138" stroke="#68564D" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M156 138Q165 143 174 138" stroke="#68564D" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M142 165Q150 170 158 165" stroke="#A86E5E" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="150" cy="55" r="16" fill="#3B2063" />
                    <circle cx="120" cy="65" r="10" fill="#8C6BAE" />
                    <circle cx="180" cy="65" r="10" fill="#8C6BAE" />
                    <path d="M140 55L150 42L160 55" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측: 치매 핵심 요약 카드 */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Gem_ScrollReveal direction="right" duration={1.2} delay={0.15}>
                <div className="bg-white text-gray-800 rounded-[32px] p-9 sm:p-12 lg:p-14 shadow-xl space-y-8 lg:space-y-10 border border-white/20">
                  
                  {/* 파트 1: 조기 진단 */}
                  <div className="space-y-3">
                    <span className="inline-block text-xs font-bold text-[#3B2063] uppercase tracking-wider bg-purple-50 px-3.5 py-1 rounded-full border border-purple-100 mb-1">
                      EARLY DETECTION &amp; DIAGNOSIS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                      인지기능 장애 &amp; 정신행동 증상(BPSD) 조기 진단
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-[1.7] break-keep font-normal">
                      최근 일 기억 상실, 단어가 떠오르지 않는 언어 장애, 피해망상이나 수면장애가 동반될 때 알츠하이머와 혈관성 치매, 치료 가능한 가역적 치매를 감별합니다.
                    </p>
                  </div>

                  {/* 파트 2: 예방 수칙 */}
                  <div className="pt-6 sm:pt-8 border-t border-gray-150 space-y-3">
                    <span className="inline-block text-xs font-bold text-[#3B2063] uppercase tracking-wider bg-purple-50 px-3.5 py-1 rounded-full border border-purple-100 mb-1">
                      PREVENTION GUIDELINES
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                      보건복지부 3권(勸) · 3금(禁) · 3행(行) 실천
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-[1.7] break-keep font-normal">
                      주 3회 걷기 운동, 금연 및 절주, 정기적인 뇌 정밀 검진으로 치매 발병 위험을 낮추고, 국가 안심센터 및 장기요양 인지등급 혜택을 연계합니다.
                    </p>
                  </div>

                  {/* 서브페이지 바로가기 CTA 버튼 */}
                  <div className="pt-6 sm:pt-8 border-t border-gray-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">
                      치매 원인, 국가 지원 제도, 예방 수칙 상세 안내
                    </span>
                    <Link
                      href="/neurosurgery/dementia"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#2E1848] hover:bg-[#200F35] text-white font-bold text-sm sm:text-base shadow-md transition-all group whitespace-nowrap shrink-0"
                    >
                      <span>치매 클리닉 자세히 보기</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </Gem_ScrollReveal>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          [CLINIC 03] 뇌졸중(중풍) 클리닉 요약 (화이트 배경, 딥 체스트넛 #381E15)
          ========================================================================= */}
      <section id="clinic-stroke" className="w-full bg-white py-24 lg:py-32 border-b border-gray-150">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

          {/* 대제목 & 밤색 알약 뱃지 헤더 (줄간격 및 마진 넉넉히 개선) */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="text-center mb-16 sm:mb-20 lg:mb-24">
              {/* 알약형 뱃지 */}
              <div className="flex justify-center mb-7 sm:mb-9">
                <span className="inline-block px-10 py-3.5 rounded-full bg-[#381E15] text-white text-base sm:text-lg font-black shadow-sm tracking-wide">
                  CLINIC 03. 뇌졸중 · 뇌혈관 클리닉
                </span>
              </div>
              
              {/* 대제목 */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black text-gray-900 tracking-tight leading-[1.3] sm:leading-[1.35] mb-6 sm:mb-8 break-keep">
                골든타임이 생명인 급성 뇌혈관 질환, 신속한 감별과 재발 방지
              </h2>

              {/* 인트로 설명문 */}
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-[1.7] sm:leading-[1.75] break-keep font-medium">
                뇌혈관이 막히는 <strong className="text-[#381E15] font-extrabold">뇌경색</strong>과 터지는 <strong className="text-[#381E15] font-extrabold">뇌출혈</strong>은 한순간에 발생합니다. 
                예고 신호를 신속히 인지하고 3.0T MRI 정밀 촬영으로 뇌혈관 상태를 점검해야 합니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 지그재그 3: [좌측 뇌졸중 요약 카드] + [우측 뇌혈관 SVG 일러스트] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
            
            {/* 좌측: 뇌졸중 핵심 요약 카드 */}
            <div className="lg:col-span-7">
              <Gem_ScrollReveal direction="left" duration={1.2} delay={0.1}>
                <div className="bg-[#FAF7F5] rounded-[32px] p-9 sm:p-12 lg:p-14 border border-amber-900/10 shadow-sm space-y-8 lg:space-y-10">
                  
                  {/* 파트 1: FAST 경고 신호 */}
                  <div className="space-y-3">
                    <span className="inline-block text-xs font-bold text-[#381E15] uppercase tracking-wider bg-amber-100/70 px-3.5 py-1 rounded-full mb-1">
                      STROKE WARNING SIGNS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                      갑작스러운 편측 마비와 언어 장애 (FAST 법칙)
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-[1.7] break-keep font-normal">
                      한쪽 팔다리에 힘이 빠지거나 감각이 무뎌지는 편측 마비, 발음이 어눌해지거나 말을 알아듣지 못하는 언어 장애는 즉시 전문 진료가 필요한 경고 신호입니다.
                    </p>
                  </div>

                  {/* 파트 2: 침묵의 뇌경색 */}
                  <div className="pt-6 sm:pt-8 border-t border-amber-100 space-y-3">
                    <span className="inline-block text-xs font-bold text-[#381E15] uppercase tracking-wider bg-amber-100/70 px-3.5 py-1 rounded-full mb-1">
                      SILENT STROKE
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                      무증상 뇌경색 (침묵의 뇌졸중) 조기 발견
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-[1.7] break-keep font-normal">
                      겉으로 드러나는 마비 증상이 없더라도 미세혈관이 막혀 뇌 손상이 진행되는 경우가 많으며, 정기 검진으로 혈관성 치매로의 악화를 방지합니다.
                    </p>
                  </div>

                  {/* 장비 안내 배너 & 보라색 예약/상담 뱃지 버튼 */}
                  <div className="p-6 rounded-2xl bg-white border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xs">
                    <div>
                      <h5 className="text-base font-bold text-[#111111]">
                        신경과 전문의 정밀 검진 &amp; 첨단 3.0T MRI
                      </h5>
                      <p className="text-xs sm:text-sm text-[#666666] mt-1 leading-relaxed">
                        정확한 원인 진단을 위해 <strong className="text-[#381E15]">MRI 정밀 촬영이 필요할 수 있습니다.</strong>
                      </p>
                    </div>
                    <a
                      href="tel:1666-1675"
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#6824EB] hover:bg-[#5818D6] text-white transition-all shadow-md shrink-0 whitespace-nowrap"
                    >
                      <div className="flex flex-col text-[10px] font-extrabold leading-tight text-center">
                        <span>예약</span>
                        <span>상담</span>
                      </div>
                      <span className="text-base sm:text-lg font-black tracking-tight">1666-1675</span>
                    </a>
                  </div>

                  {/* 서브페이지 바로가기 CTA 버튼 */}
                  <div className="pt-6 sm:pt-8 border-t border-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">
                      뇌경색·뇌출혈 원인, 골든타임, 재발 방지 수칙 안내
                    </span>
                    <Link
                      href="/neurosurgery/stroke"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#381E15] hover:bg-[#28130B] text-white font-bold text-sm sm:text-base shadow-md transition-all group whitespace-nowrap shrink-0"
                    >
                      <span>뇌졸중 클리닉 자세히 보기</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측: 뇌혈관 순환 SVG 일러스트 */}
            <div className="lg:col-span-5 flex justify-center">
              <Gem_ScrollReveal direction="right" duration={1.2} delay={0.15}>
                <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[340px] lg:h-[340px] relative flex items-center justify-center">
                  <svg className="w-full h-full drop-shadow-md" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="150" cy="150" r="130" fill="#FBF5F0" />
                    <path d="M150 70C110 70 85 95 85 135C85 150 90 165 100 175C95 190 100 205 115 215C125 225 140 225 150 225C160 225 175 225 185 215C200 205 205 190 200 175C210 165 215 150 215 135C215 95 190 70 150 70Z" fill="#F4DFD2" />
                    <path d="M150 80V215" stroke="#381E15" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
                    <path d="M150 110C125 120 110 135 105 160" stroke="#C84B31" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M150 110C175 120 190 135 195 160" stroke="#C84B31" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M150 150C130 165 120 180 120 200" stroke="#C84B31" strokeWidth="3" strokeLinecap="round" />
                    <path d="M150 150C170 165 180 180 180 200" stroke="#C84B31" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="150" cy="150" r="115" stroke="#381E15" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.3" />
                    <circle cx="105" cy="160" r="6" fill="#C84B31" />
                    <circle cx="195" cy="160" r="6" fill="#C84B31" />
                    <circle cx="150" cy="50" r="14" fill="#381E15" />
                    <path d="M143 50L150 43L157 50" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </Gem_ScrollReveal>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          [CLINIC 04] 말초신경병 클리닉 요약 (풀와이드 딥 틸 #0D2B35 밴딩)
          ========================================================================= */}
      <section id="clinic-neuropathy" className="w-full bg-[#0D2B35] text-white py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

          {/* 대제목 & 화이트 알약 뱃지 헤더 (줄간격 및 마진 넉넉히 개선) */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="text-center mb-16 sm:mb-20 lg:mb-24">
              {/* 알약형 뱃지 */}
              <div className="flex justify-center mb-7 sm:mb-9">
                <span className="inline-block px-10 py-3.5 rounded-full bg-white text-[#0D2B35] text-base sm:text-lg font-black shadow-sm tracking-wide">
                  CLINIC 04. 말초신경병 · 신경통 클리닉
                </span>
              </div>
              
              {/* 대제목 */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black text-white tracking-tight leading-[1.3] sm:leading-[1.35] mb-6 sm:mb-8 break-keep">
                손발저림과 신경통, 정밀 전기진단으로 원인을 밝히고 신경을 지킵니다
              </h2>

              {/* 인트로 설명문 */}
              <p className="text-lg sm:text-xl lg:text-2xl text-teal-100/90 max-w-4xl mx-auto leading-[1.7] sm:leading-[1.75] break-keep font-normal">
                단순한 노화나 혈액순환 장애가 아닙니다. <strong className="text-white font-bold underline decoration-teal-300 decoration-2">당뇨병성 고혈당, 손목터널증후군 등 신경 압박</strong>으로 인한 손상을 조기에 감별해야 비가역적인 신경 퇴행을 막을 수 있습니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 지그재그 4: [좌측 신경망 회복 SVG 일러스트] + [우측 말초신경 요약 카드] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
            
            {/* 좌측: 전신 신경망 회복 SVG 일러스트 */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <Gem_ScrollReveal direction="left" duration={1.2} delay={0.1}>
                <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[340px] lg:h-[340px] relative flex items-center justify-center">
                  <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="150" cy="150" r="130" fill="#06181F" />
                    <circle cx="150" cy="110" r="26" fill="#154857" />
                    <circle cx="150" cy="110" r="14" fill="#2AB7CA" />
                    <path d="M150 136V220" stroke="#2AB7CA" strokeWidth="6" strokeLinecap="round" />
                    <path d="M150 160C120 180 95 190 80 230" stroke="#2AB7CA" strokeWidth="4" strokeLinecap="round" />
                    <path d="M150 160C180 180 205 190 220 230" stroke="#2AB7CA" strokeWidth="4" strokeLinecap="round" />
                    <path d="M150 190C130 205 110 220 105 250" stroke="#2AB7CA" strokeWidth="3" strokeLinecap="round" />
                    <path d="M150 190C170 205 190 220 195 250" stroke="#2AB7CA" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="80" cy="230" r="7" fill="#FED766" />
                    <circle cx="220" cy="230" r="7" fill="#FED766" />
                    <circle cx="105" cy="250" r="6" fill="#FED766" />
                    <circle cx="195" cy="250" r="6" fill="#FED766" />
                    <circle cx="150" cy="220" r="8" fill="#FED766" />
                    <path d="M150 70C165 50 195 50 208 72C220 94 195 120 150 155C105 120 80 94 92 72C105 50 135 50 150 70Z" stroke="#E2F0F3" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.4" />
                  </svg>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측: 말초신경병 핵심 요약 카드 */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Gem_ScrollReveal direction="right" duration={1.2} delay={0.15}>
                <div className="bg-white text-gray-800 rounded-[32px] p-9 sm:p-12 lg:p-14 shadow-xl space-y-8 lg:space-y-10 border border-white/20">
                  
                  {/* 파트 1: 감각 이상 */}
                  <div className="space-y-3">
                    <span className="inline-block text-xs font-bold text-[#0D2B35] uppercase tracking-wider bg-teal-50 px-3.5 py-1 rounded-full border border-teal-100 mb-1">
                      GLOVE &amp; STOCKING SYMPTOMS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                      감각 이상(화끈거림 · 저림) &amp; 야간 악화
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-[1.7] break-keep font-normal">
                      손끝과 발끝에서 시작하여 양말과 장갑 형태로 올라오는 대칭적 저림과 화끈거림, 밤마다 심해지는 신경병증성 통증을 조절합니다.
                    </p>
                  </div>

                  {/* 파트 2: 발 관리 및 진단 */}
                  <div className="pt-6 sm:pt-8 border-t border-gray-150 space-y-3">
                    <span className="inline-block text-xs font-bold text-[#0D2B35] uppercase tracking-wider bg-teal-50 px-3.5 py-1 rounded-full border border-teal-100 mb-1">
                      FOOT CARE &amp; DIAGNOSTICS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                      당뇨발(Foot Care) 수칙 &amp; 정밀 전기진단 검사
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-[1.7] break-keep font-normal">
                      신경전도 검사(NCS)와 침 근전도 검사(EMG)로 손상 위치를 객관적으로 측정하고, 당뇨 환자의 치명적 발 궤양을 예방하는 1:1 관리를 시행합니다.
                    </p>
                  </div>

                  {/* 서브페이지 바로가기 CTA 버튼 */}
                  <div className="pt-6 sm:pt-8 border-t border-gray-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">
                      감각·운동·자율신경 손상, 당뇨발 관리 수칙 안내
                    </span>
                    <Link
                      href="/neurosurgery/peripheral-neuropathy"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0D2B35] hover:bg-[#071B22] text-white font-bold text-sm sm:text-base shadow-md transition-all group whitespace-nowrap shrink-0"
                    >
                      <span>말초신경병 클리닉 자세히 보기</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </Gem_ScrollReveal>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          최하단 통합 상담 & 진료 예약 배너 (#08395d)
          ========================================================================= */}
      <section className="w-full py-20 lg:py-24 bg-[#08395d] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <Gem_ScrollReveal direction="right" delay={0.05}>
            <div>
              <span className="text-blue-200 text-xs sm:text-sm font-bold tracking-wider uppercase mb-2 block">
                HI HOSPITAL NEUROLOGY &amp; NEUROSURGERY
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug">
                어떤 증상인지 혼자 고민하지 마세요
              </h3>
              <p className="text-slate-200 mt-3 text-base sm:text-lg leading-relaxed">
                신경과 전문의 1:1 정밀 진찰과 대학병원급 3.0T MRI 진단으로 정확한 치료 방향을 찾아드립니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto">
            <Link
              href="/community/inquiry"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#08395d] font-black text-sm sm:text-base hover:bg-sky-50 shadow-md transition-colors text-center whitespace-nowrap shrink-0"
            >
              온라인 문의 남기기
            </Link>
            <a
              href="tel:1666-1675"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm sm:text-base transition-colors text-center whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>진료 예약 1666-1675</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
