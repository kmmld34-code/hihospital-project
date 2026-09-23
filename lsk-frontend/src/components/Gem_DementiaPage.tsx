"use client";

import React from "react";
import Link from "next/link";
import Gem_SubPageHeader from "@/components/Gem_SubPageHeader";
import Gem_ScrollReveal from "@/components/Gem_ScrollReveal";

/**
 * ==============================================================================
 * [인천하이병원] 치매(Dementia) 상세페이지 (Gem_DementiaPage.tsx)
 * ==============================================================================
     *
 * [주요 특징]
 * 1. 1400px 와이드 레이아웃 (max-w-[1400px]) 풀 활용
 * 2. 상단 헤더 단색 #062667 및 하단 배너 단색 #08395d 적용
 * 3. 화이트 ↔ 딥 바이올렛(#2E1848) 풀와이드 컬러 밴딩 리듬감
 * 4. 공식 스크롤 리빌 표준 모션 (1.1s 완만 감속 글라이딩)
 * 5. 텍스트 5대 파트 구조화:
 *    - 파트 1: 치매의 증상과 원인 (인지장애, 정신행동증상, 4대 원인)
 *    - 파트 2: 치료방법과 기대효과 (진단, 약물, 비약물, 독립적 일상)
 *    - 파트 3: 보건복지부 치매예방수칙 (3권·3금·3행)
 *    - 파트 4: 치매가족을 위한 안내 & 국가 지원 제도 (5대 지원책)
 *    - 파트 5: 치매환자 공감하기 (2인 3각의 여정 감동 메시지)
 * ==============================================================================
 */

export default function Gem_DementiaPage() {
  // 상단 브레드크럼 경로
  const breadcrumbs = [
    { label: "뇌신경센터", href: "/neurosurgery" },
    { label: "치매", href: "/neurosurgery/dementia" },
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
          0. 상단 네비게이션 헤더 & 동일 뎁스 탭 바 (단색 #062667)
          ========================================================================= */}
      <Gem_SubPageHeader
        categoryTitle="뇌신경센터"
        categorySubTitle="NEUROLOGY & NEUROSURGERY CENTER"
        description="조기 발견과 따뜻한 동행으로, 환자와 가족의 소중한 일상과 삶의 질을 함께 지켜나갑니다."
        currentHref="/neurosurgery/dementia"
        breadcrumbs={breadcrumbs}
        tabItems={tabItems}
      />

      {/* =========================================================================
          [SECTION 1] 치매의 증상 (Dementia Overview) - 화이트 배경
          ========================================================================= */}
      <section className="w-full bg-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">

          {/* 1-1. 대제목 */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
                치매
              </h2>
            </div>
          </Gem_ScrollReveal>

          {/* 1-2. 인트로 설명문 (단어 잘림 없는 완벽한 2줄 중앙 정렬) */}
          <Gem_ScrollReveal direction="up" delay={0.1} duration={1.1}>
            <div className="w-full text-center">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium break-keep">
                치매 증상은 하루아침에 갑자기 나빠지지 않고 <span className="font-bold text-gray-900 underline decoration-[#2E1848] decoration-2">서서히 진행되는 것이 특징</span>입니다.
                <br className="hidden sm:inline" />
                조기에 발견하여 적절한 치료와 관리를 병행하면 <strong className="text-[#3B2063] font-extrabold">독립적인 일상생활 기간을 최대한 연장</strong>할 수 있습니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 1-3. 알약형 딥 바이올렛 뱃지 */}
          <Gem_ScrollReveal direction="up" delay={0.15} duration={1.1}>
            <div className="flex justify-center">
              <span className="inline-block px-10 py-3.5 rounded-full bg-[#2E1848] text-white text-lg sm:text-xl font-black shadow-sm tracking-wide">
                1. 치매의 주요 증상
              </span>
            </div>
          </Gem_ScrollReveal>

          {/* 1-4. 지그재그 1: [좌측 텍스트 (Left-in)] + [우측 인지기능 일러스트 (Right-in)] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8">
            {/* 좌측 텍스트 박스: 인지기능 장애 & 정신행동 증상 */}
            <div className="lg:col-span-7">
              <Gem_ScrollReveal direction="left" duration={1.2} delay={0.1}>
                <div className="space-y-8">
                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#3B2063] bg-purple-50 px-3 py-1 rounded-full border border-purple-100 mb-2">
                      SYMPTOM 01
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                      (1) 인지 기능 장애
                    </h3>
                    <p className="mt-2 text-lg sm:text-xl text-gray-700 leading-relaxed font-normal">
                      최근 일에 대한 기억력 저하(질문 반복), 언어 장애(단어가 잘 떠오르지 않음), 시각 및 공간 파악 능력 저하(익숙한 길 찾기 어려움), 일상적 계획과 실행 기능 저하 등이 나타납니다.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-150">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#3B2063] bg-purple-50 px-3 py-1 rounded-full border border-purple-100 mb-2">
                      SYMPTOM 02
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                      (2) 정신행동 증상 (BPSD)
                    </h3>
                    <p className="mt-2 text-lg sm:text-xl text-gray-700 leading-relaxed font-normal">
                      감정 조절이 어려워지며 공격성, 망상(배우자 외도 의심, 도둑질 의심 등 피해망상), 환각, 이유 없는 배회, 불안, 수면 장애 등이 동반될 수 있습니다.
                    </p>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측 인지기능 회상 일러스트 (기억을 보살피는 따뜻한 플랫 벡터 아트) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Gem_ScrollReveal direction="right" duration={1.2} delay={0.15}>
                <div className="w-72 h-72 sm:w-80 sm:h-80 relative flex items-center justify-center">
                  <svg className="w-full h-full drop-shadow-md" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* 소프트 바이올렛 배경 원 */}
                    <circle cx="150" cy="150" r="130" fill="#F4EEFB" />
                    {/* 따뜻한 어르신 상의 */}
                    <path d="M70 270C70 215 105 195 150 195C195 195 230 215 230 270" fill="#D9CCE8" />
                    {/* 목 */}
                    <path d="M135 170H165V205H135V170Z" fill="#F5D8C7" />
                    {/* 얼굴 */}
                    <ellipse cx="150" cy="140" rx="42" ry="48" fill="#F9DFD0" />
                    {/* 온화한 은발 머리카락 */}
                    <path d="M106 130C106 90 128 80 150 80C172 80 194 90 194 130C194 135 190 140 190 140L110 140C110 140 106 135 106 130Z" fill="#E8E2EC" />
                    {/* 미간과 눈가의 온화한 주름 */}
                    <path d="M126 138Q135 143 144 138" stroke="#68564D" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M156 138Q165 143 174 138" stroke="#68564D" strokeWidth="2.5" strokeLinecap="round" />
                    {/* 미소짓는 입술 */}
                    <path d="M142 165Q150 170 158 165" stroke="#A86E5E" strokeWidth="2.5" strokeLinecap="round" />
                    {/* 머리 위로 피어오르는 부드러운 기억의 나비/꽃 심볼 (인지 회복 상징) */}
                    <circle cx="150" cy="55" r="16" fill="#3B2063" />
                    <circle cx="120" cy="65" r="10" fill="#8C6BAE" />
                    <circle cx="180" cy="65" r="10" fill="#8C6BAE" />
                    <path d="M140 55L150 42L160 55" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </Gem_ScrollReveal>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          [SECTION 2] 치매가 생기는 원인 & 치료 기대효과 - 풀와이드 딥 바이올렛(#2E1848) 배경 전환!
          ========================================================================= */}
      <section className="w-full bg-[#2E1848] text-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">

          {/* 2-1. 지그재그 2: [좌측 돌봄/케어 일러스트 (Left-in)] + [우측 텍스트 (Right-in)] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* 좌측 의료진과 가족의 따뜻한 손길 일러스트 */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
              <Gem_ScrollReveal direction="left" duration={1.2} delay={0.1}>
                <div className="w-72 h-72 sm:w-80 sm:h-80 relative flex items-center justify-center">
                  <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="150" cy="150" r="130" fill="#200E35" />
                    {/* 두 손이 포개어져 감싸는 하트 심볼 (동행과 공감) */}
                    <path d="M150 90C165 70 200 70 215 95C230 120 200 150 150 190C100 150 70 120 85 95C100 70 135 70 150 90Z" fill="#583584" opacity="0.6" />
                    {/* 맞잡은 손의 곡선 */}
                    <path d="M100 230C120 200 150 180 170 160C185 145 190 135 185 125" stroke="#F5D8C7" strokeWidth="16" strokeLinecap="round" />
                    <path d="M200 230C180 200 150 180 130 160C115 145 110 135 115 125" stroke="#ECC4AF" strokeWidth="16" strokeLinecap="round" />
                    <circle cx="150" cy="155" r="14" fill="#E8B86D" />
                  </svg>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측 텍스트: 치매가 생기는 4대 원인 */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <Gem_ScrollReveal direction="right" duration={1.2} delay={0.15}>
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-purple-200 text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">
                    ETIOLOGY OF DEMENTIA
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    치매가 생기는 원인
                  </h3>
                  <p className="mt-3 text-lg sm:text-xl text-purple-100/90 leading-relaxed font-normal">
                    치매는 단일 질환이 아니며, 원인에 따라 경과와 회복 가능성이 크게 달라집니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/10 p-5 rounded-2xl border border-white/15">
                    <p className="text-base sm:text-lg font-bold text-white mb-1">알츠하이머병</p>
                    <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                      아밀로이드 플라크와 타우 단백질 침착으로 발생하며 가장 흔한 원인입니다. (유전적 요인 ApoE4 등이 영향 가능)
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-2xl border border-white/15">
                    <p className="text-base sm:text-lg font-bold text-white mb-1">혈관성 치매</p>
                    <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                      뇌졸중(뇌경색, 뇌출혈) 등으로 인해 뇌 혈류 공급이 중단되어 뇌세포가 손상되어 발생합니다.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-2xl border border-white/15">
                    <p className="text-base sm:text-lg font-bold text-amber-300 mb-1">가역적 치매 (회복 가능)</p>
                    <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                      갑상선 저하증, 비타민 결핍, 우울증 등은 적절한 치료로 회복 가능하며 전체 치매의 5~10%를 차지합니다.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-2xl border border-white/15">
                    <p className="text-base sm:text-lg font-bold text-white mb-1">기타 퇴행성 치매</p>
                    <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                      루이소체 치매(알파-시누클레인 침착), 전두측엽 치매 등 다양한 신경퇴행성 원인이 존재합니다.
                    </p>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>
          </div>

          {/* 2-2. 1400px 와이드 대형 화이트 카드: 2. 치료방법과 기대효과 */}
          <Gem_ScrollReveal direction="up" delay={0.2} duration={1.1}>
            <div className="w-full bg-white rounded-[32px] p-8 sm:p-12 lg:p-16 text-gray-800 shadow-2xl border border-gray-100">
              <div className="space-y-8">
                <div>
                  <span className="text-xs font-bold text-[#3B2063] uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                    TREATMENT &amp; OUTCOMES
                  </span>
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight mt-3">
                    2. 치료방법과 기대효과
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#FAF6FC] p-6 rounded-2xl border border-purple-100">
                    <p className="text-lg font-bold text-gray-900 mb-2">1. 진단 및 정밀 검사</p>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      신경과 전문의의 면밀한 병력 청취, 신경인지기능검사, 뇌 구조 분석(MRI/CT), 필요한 경우 정밀 검사를 통해 원인을 정확히 규명합니다.
                    </p>
                  </div>
                  <div className="bg-[#FAF6FC] p-6 rounded-2xl border border-purple-100">
                    <p className="text-lg font-bold text-gray-900 mb-2">2. 맞춤형 약물 치료</p>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      인지 기능 저하를 늦추는 인지개선제를 처방하며, 망상이나 우울증 등 정신행동 증상(BPSD) 조절을 위한 개별 맞춤 처방을 시행합니다.
                    </p>
                  </div>
                  <div className="bg-[#FAF6FC] p-6 rounded-2xl border border-purple-100">
                    <p className="text-lg font-bold text-gray-900 mb-2">3. 인지 자극 비약물 치료</p>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      운동요법, 미술·음악 치료, 일기 쓰기 및 읽기 등 뇌 자극 인지 프로그램을 병행하여 잔존 기능을 활성화합니다.
                    </p>
                  </div>
                </div>

                {/* 치료의 기대효과 콜아웃 */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-base sm:text-lg lg:text-xl text-gray-800 leading-relaxed font-normal">
                    현재 퇴행성 치매의 완치법은 없으나, <mark className="bg-[#FFF176] px-2.5 py-1 rounded font-black text-gray-950">진행을 늦추고 삶의 질을 높이는 치료</mark>가 충분히 가능합니다.
                    치료를 통해 환자의 독립적 일상생활 유지 기간을 연장하고, 가족의 돌봄 부담과 심리적 고통을 크게 덜어드립니다.
                  </p>
                </div>
              </div>
            </div>
          </Gem_ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          [SECTION 3] 3. 치매예방수칙 (보건복지부 권장 3권·3금·3행) - 화이트 배경
          ========================================================================= */}
      <section className="w-full bg-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">

          {/* 3-1. 대제목 */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
                3. 치매예방수칙
              </h2>
            </div>
          </Gem_ScrollReveal>

          {/* 3-2. 인트로 설명문 (단어 잘림 없는 완벽한 2줄 중앙 정렬) */}
          <Gem_ScrollReveal direction="up" delay={0.1} duration={1.1}>
            <div className="w-full text-center">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium break-keep">
                보건복지부와 중앙치매센터에서는 치매예방을 위해 국민들이 쉽게 실천할 수 있도록 수칙을 권장합니다.
                <br className="hidden sm:inline" />
                일상 속 작은 생활습관의 변화만으로도 치매 발병 위험도를 대폭 낮출 수 있습니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 3-3. 1400px 와이드 웜베이지/살구빛 박스: 3권(勸) · 3금(禁) · 3행(行) 3열 그리드 */}
          <Gem_ScrollReveal direction="up" delay={0.15} duration={1.1}>
            <div className="w-full bg-[#FAF5F0] rounded-[32px] p-8 sm:p-12 lg:p-16 border border-[#F0E4D8] shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {/* 3권(즐길 것) */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-black">
                    3권(勸) - 즐길 것
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-gray-900">
                    부지런히 활동하기
                  </h4>
                  <ul className="space-y-3 pt-2 text-base sm:text-lg text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span><strong>일주일에 3번 이상</strong> 걷기 운동</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span><strong>생선과 채소</strong> 골고루 챙겨 먹기</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span>부지런히 <strong>책 읽고 글 쓰기</strong></span>
                    </li>
                  </ul>
                </div>

                {/* 3금(참을 것) */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-black">
                    3금(禁) - 참을 것
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-gray-900">
                    위험 요인 멀리하기
                  </h4>
                  <ul className="space-y-3 pt-2 text-base sm:text-lg text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <span className="text-amber-600 font-bold">✔</span>
                      <span><strong>술은 적게</strong> 마시기 (절주)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-amber-600 font-bold">✔</span>
                      <span><strong>담배는 완전히</strong> 끊기 (금연)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-amber-600 font-bold">✔</span>
                      <span>낙상 등 <strong>머리 부상</strong> 조심하기</span>
                    </li>
                  </ul>
                </div>

                {/* 3행(챙길 것) */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-800 text-sm font-black">
                    3행(行) - 챙길 것
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-gray-900">
                    정기적으로 점검하기
                  </h4>
                  <ul className="space-y-3 pt-2 text-base sm:text-lg text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-600 font-bold">✔</span>
                      <span><strong>혈압·혈당·콜레스테롤</strong> 정기 체크</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-600 font-bold">✔</span>
                      <span><strong>가족·친구와 자주</strong> 만나고 소통하기</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-600 font-bold">✔</span>
                      <span><strong>치매선별검사</strong> 정기적으로 받기</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Gem_ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          [SECTION 4] 4. 치매가족 안내 & 국가 지원 제도 & 5. 공감하기 - 풀와이드 딥 바이올렛(#2E1848) 전환!
          ========================================================================= */}
      <section className="w-full bg-[#2E1848] text-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">

          {/* 4-1. 중앙 화이트 알약형 뱃지 */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="flex justify-center">
              <span className="inline-block px-10 py-4 rounded-full bg-white text-[#2E1848] text-lg sm:text-xl lg:text-2xl font-black shadow-md tracking-wide">
                4. 치매가족을 위한 안내 &amp; 국가 지원 제도
              </span>
            </div>
          </Gem_ScrollReveal>

          {/* 4-2. 4개의 가로 와이드 화이트 라운드 카드 스택 (세로 간격 space-y-8 lg:space-y-10) */}
          <div className="space-y-8 lg:space-y-10 w-full">
            {/* 카드 1: 대화 및 돌봄 기술 */}
            <Gem_ScrollReveal direction="up" delay={0.1} duration={1.1}>
              <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20 hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    대화 및 돌봄 기술
                  </span>
                  <span className="text-[#3B2063] font-black text-2xl lg:text-3xl">≫</span>
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-1">
                  <p>시시비비를 가리지 말고 숨겨진 감정을 읽고 공감해 주며, 부정적 표현 대신 긍정적 유도를 사용합니다.</p>
                  <p className="text-[#3B2063] font-extrabold">대화 시 충분히 생각할 시간 제공 &amp; 폐렴 방지를 위한 구강·틀니 관리 필수</p>
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 카드 2: 치매상담콜센터 & 치매안심센터 */}
            <Gem_ScrollReveal direction="up" delay={0.15} duration={1.1}>
              <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20 hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    상담센터 및 안심센터
                  </span>
                  <span className="text-[#3B2063] font-black text-2xl lg:text-3xl">≫</span>
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-1">
                  <p><strong>치매상담콜센터(1899-9988)</strong>를 통해 24시간 365일 전문 상담이 가능합니다.</p>
                  <p className="text-[#3B2063] font-extrabold">전국 보건소 치매안심센터: 무료 선별검사, 가족 교육(&apos;헤아림&apos; 교실), 자조 모임 지원</p>
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 카드 3: 치매국가책임제 및 등급 신청 */}
            <Gem_ScrollReveal direction="up" delay={0.2} duration={1.1}>
              <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20 hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    치매국가책임제
                  </span>
                  <span className="text-[#3B2063] font-black text-2xl lg:text-3xl">≫</span>
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-1">
                  <p>중증 치매 산정 특례 적용을 통해 의료비 본인 부담률이 대폭 경감됩니다.</p>
                  <p className="text-[#3B2063] font-extrabold">노인장기요양보험 인지지원등급 신청으로 주간보호센터 등 주야간 케어 이용 가능</p>
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 카드 4: 실종 방지 & 공공후견제도 */}
            <Gem_ScrollReveal direction="up" delay={0.25} duration={1.1}>
              <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20 hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    안전 및 권리 보호
                  </span>
                  <span className="text-[#3B2063] font-black text-2xl lg:text-3xl">≫</span>
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-1">
                  <p>지문 사전등록, 인식표 배부, 배회감지기(GPS) 지원으로 실종 사고를 예방합니다.</p>
                  <p className="text-[#3B2063] font-extrabold">치매공공후견제도: 의사결정 능력이 부족한 어르신의 법적 권리를 든든히 보호</p>
                </div>
              </div>
            </Gem_ScrollReveal>
          </div>

          {/* =====================================================================
              [5. 치매환자 공감하기] 대형 화이트 카드 1400px 풀 확장
              ===================================================================== */}
          <div className="pt-12 lg:pt-16">
            <Gem_ScrollReveal direction="up" delay={0.2} duration={1.2}>
              <div className="w-full bg-white text-gray-800 rounded-[36px] p-8 sm:p-14 lg:p-16 shadow-2xl border border-gray-100">
                <div className="space-y-6">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-[#3B2063] text-xs font-black tracking-wider uppercase">
                    5. 치매환자 공감하기
                  </span>
                  <h4 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                    “치매는 함께 걷는 2인 3각의 여정”
                  </h4>
                  <div className="space-y-4 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed pt-2">
                    <p>
                      치매 어르신을 돌보는 일은 끝이 보이지 않는 긴 길을 &apos;2인 3각&apos;으로 호흡을 맞춰 걷는 과정과 같습니다. 때로는 거친 말과 행동이라는 비바람을 만나기도 하겠지만, 그것은 어르신의 본심이 아니라 <strong>&ldquo;나를 버리지 마세요&rdquo;</strong>라는 두려움 섞인 외침임을 기억해야 합니다.
                    </p>
                    <p>
                      가족이 아닌 일반인들 또한, 길을 잃고 헤매는 어르신을 마주할 때 그분이 한때는 누군가의 든든한 아버지였고 지혜로운 어머니였음을 잊지 말아야 합니다. 치매는 아는 만큼 보인다는 말처럼, 병이라는 껍데기 너머에 여전히 살아있는 &apos;고향의 봄&apos;과 같은 그분들의 인격을 마주 보아 주시길 바랍니다.
                    </p>
                    <p className="font-bold text-gray-950 pt-2 border-t border-gray-150">
                      기억은 저물어도 사랑받은 느낌은 영혼에 새겨집니다. 그분들이 일상이라는 무대에서 소외되지 않도록, 따뜻한 눈빛과 인내라는 이름의 꽃을 피워주세요.
                    </p>
                  </div>
                </div>

                {/* 하단 진료 권고 & 진료시간 버튼 */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    인천하이병원은 정밀 인지기능 검사와 세심한 상담을 통해 치매 환자와 보호자 곁을 든든하게 지켜드립니다.
                  </p>
                  <Link
                    href="/about/hours"
                    className="px-8 py-3.5 rounded-full bg-[#2E1848] text-white font-extrabold text-sm sm:text-base hover:bg-[#1E0E32] transition-colors whitespace-nowrap shadow-md"
                  >
                    신경과 진료시간 안내 →
                  </Link>
                </div>
              </div>
            </Gem_ScrollReveal>
          </div>

        </div>
      </section>

      {/* =========================================================================
          [SECTION 5] 하단 CTA 배너 (단색 #08395d)
          ========================================================================= */}
      <section className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="rounded-[32px] bg-[#08395d] text-white p-8 sm:p-12 lg:p-16 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 border border-white/20">
                  신경과 전문의 맞춤 인지기능 케어 &amp; 치매 조기 진단
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  부모님의 기억과 건강, 인천하이병원이 따뜻하게 지켜드립니다
                </h3>
                <p className="mt-3 text-sm sm:text-base text-sky-100 max-w-2xl leading-relaxed">
                  치매는 조기 발견이 가장 중요합니다. 정밀 검진과 체계적인 약물·인지 치료를 통해 소중한 기억을 지켜내세요.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <Link
                  href="/community/inquiry"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#08395d] font-black text-sm sm:text-base hover:bg-sky-50 shadow-md transition-colors text-center whitespace-nowrap shrink-0"
                >
                  온라인 문의 남기기
                </Link>
                <Link
                  href="/neurosurgery"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm sm:text-base transition-colors text-center whitespace-nowrap shrink-0"
                >
                  뇌신경센터 메인 허브
                </Link>
              </div>
            </div>
          </Gem_ScrollReveal>
        </div>
      </section>

    </div>
  );
}
