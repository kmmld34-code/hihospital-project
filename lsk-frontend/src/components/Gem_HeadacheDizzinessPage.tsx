"use client";

import React from "react";
import Link from "next/link";
import Gem_SubPageHeader from "@/components/Gem_SubPageHeader";
import Gem_ScrollReveal from "@/components/Gem_ScrollReveal";

/**
 * ==============================================================================
 * [인천하이병원] 두통·어지럼증 서브페이지 (Gem_HeadacheDizzinessPage.tsx)
 * ==============================================================================
 * 기획 & 디자인: 1400px 와이드 텍스트 레이아웃 표준
 *  - 1번 이미지: 전문의 권고 박스 1400px 전체 폭 확장 및 폰트 확대
 *  - 2번 이미지: 4대 원인질환 가로 카드 & Red Flags 카드 1400px 전체 폭 확장
 *  - 컴포넌트 간 세로 간격(space-y-10) 넉넉히 분리
 *  - 스크롤 리빌: 시작점 90~120px로 멀리, 1.1s 여유로운 감속 글라이딩 모션 (공식 표준)
 *  - [디자인 표준 업데이트]
 *    1. 자극적인 빨간색 전면 제거 ➔ 진한 초록계열(#0C7657) 및 컴포넌트 톤 통일
 *    2. 응급실 관련 문구 삭제 (하이병원 진료 체계에 맞춘 신속한 전문의 진료 안내)
 *    3. 의료심의 준수: "첨단 3.0T MRI 정밀 촬영 필수" ➔ "MRI 정밀 촬영이 필요할 수 있습니다"
 * ==============================================================================
 */

export default function Gem_HeadacheDizzinessPage() {
  // 상단 브레드크럼 경로
  const breadcrumbs = [
    { label: "뇌신경센터", href: "/neurosurgery" },
    { label: "두통·어지럼증", href: "/neurosurgery/headache-dizziness" },
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
          0. 상단 네비게이션 헤더 & 동일 뎁스 탭 바
          ========================================================================= */}
      <Gem_SubPageHeader
        categoryTitle="뇌신경센터"
        categorySubTitle="NEUROLOGY & NEUROSURGERY CENTER"
        description="골든타임이 생명인 뇌혈관 및 신경계 질환, 원인을 신속하고 정확하게 감별하여 맞춤 치료합니다."
        currentHref="/neurosurgery/headache-dizziness"
        breadcrumbs={breadcrumbs}
        tabItems={tabItems}
        rightGraphicSrc="/images/subpage_medical_icon.jpg"
      />

      {/* =========================================================================
          [SECTION 1] 두통 (Headache) - 화이트 배경 (순수 텍스트 & 지그재그 일러스트)
          ========================================================================= */}
      <section className="w-full bg-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">

          {/* 1-1. 대제목 (먼 시작점에서 부드럽게 위로 등장) */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
                두통
              </h2>
            </div>
          </Gem_ScrollReveal>

          {/* 1-2. 인트로 설명문 (먼 시작점에서 부드럽게 위로 등장) */}
          <Gem_ScrollReveal direction="up" delay={0.1} duration={1.1}>
            <div className="text-center max-w-5xl mx-auto">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
                두통은 우리 인구의 <span className="font-bold text-gray-900 underline decoration-[#0C7657] decoration-2">90% 이상이 경험</span>할 정도로 매우 흔한 증상입니다.
                <br />
                그러나, 단순 두통 외에도 <strong className="text-[#0C7657] font-extrabold">위험한 뇌질환의 신호</strong>일 수 있기 때문에 정확한 진단이 중요합니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 1-3. 알약형 그린 뱃지: 두통의 주요 원인 */}
          <Gem_ScrollReveal direction="up" delay={0.15} duration={1.1}>
            <div className="flex justify-center">
              <span className="inline-block px-10 py-3.5 rounded-full bg-[#0C7657] text-white text-lg sm:text-xl font-black shadow-sm tracking-wide">
                두통의 주요 원인
              </span>
            </div>
          </Gem_ScrollReveal>

          {/* 1-4. 1차성 두통: [좌측 텍스트 (Left-in)] + [우측 여성 일러스트 (Right-in)] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8">
            {/* 좌측 텍스트 박스 */}
            <div className="lg:col-span-7">
              <Gem_ScrollReveal direction="left" duration={1.2} delay={0.1}>
                <div className="space-y-4">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                    1차성 두통
                  </h3>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-normal">
                    특별한 원인 질환 없이 발생하는 두통으로 <strong className="font-bold text-gray-900">편두통, 긴장형 두통, 군발 두통</strong> 등이 해당합니다.
                    특히 편두통은 전조 증상을 동반하기도 하며, 뇌졸중의 잠재적 위험 인자가 될 수 있습니다.
                  </p>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측 여성 일러스트 */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Gem_ScrollReveal direction="right" duration={1.2} delay={0.15}>
                <div className="w-72 h-72 sm:w-80 sm:h-80 relative flex items-center justify-center">
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
          [SECTION 2] 2차성 두통과 약물과용 두통 - 풀와이드 초록색 배경 전환!
          ========================================================================= */}
      <section className="w-full bg-[#0C7657] text-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">

          {/* 2-1. [좌측 남성 일러스트 (Left-in)] + [우측 텍스트 (Right-in)] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* 좌측 남성 일러스트 */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
              <Gem_ScrollReveal direction="left" duration={1.2} delay={0.1}>
                <div className="w-72 h-72 sm:w-80 sm:h-80 relative flex items-center justify-center">
                  <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="150" cy="150" r="130" fill="#085B42" />
                    <path d="M70 270C70 215 105 195 150 195C195 195 230 215 230 270" fill="#E26D46" />
                    <path d="M135 170H165V205H135V170Z" fill="#F7CBB5" />
                    <ellipse cx="150" cy="140" rx="42" ry="48" fill="#F7CBB5" />
                    <path d="M106 130C106 95 130 82 150 82C170 82 194 95 194 130C194 135 190 140 190 140L110 140C110 140 106 135 106 130Z" fill="#203348" />
                    <path d="M128 138Q135 143 142 138" stroke="#332219" strokeWidth="3" strokeLinecap="round" />
                    <path d="M158 138Q165 143 172 138" stroke="#332219" strokeWidth="3" strokeLinecap="round" />
                    <path d="M148 130V136M152 130V136" stroke="#332219" strokeWidth="2" strokeLinecap="round" />
                    <path d="M90 220L110 145L120 135" stroke="#F7CBB5" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M210 220L190 145L180 135" stroke="#F7CBB5" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M120 65L130 75L140 65M160 65L170 75L180 65" stroke="#FBD38D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측 텍스트 박스 */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Gem_ScrollReveal direction="right" duration={1.2} delay={0.15}>
                <div className="space-y-4">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    2차성 두통과 약물과용 두통
                  </h3>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed font-normal">
                    이차성 두통은 <strong className="text-white font-bold underline decoration-yellow-300 decoration-2">뇌종양, 뇌혈관 기형, 뇌수막염</strong> 등 기질적인 뇌질환에 의해 발생하는 두통과
                    진통제를 남용할 경우 등 두통이 만성화될 때 나타나는 약물과용 두통이 있습니다.
                  </p>
                </div>
              </Gem_ScrollReveal>
            </div>
          </div>

          {/* =====================================================================
              [1번 이미지 컴포넌트: 1400px 풀 확장]
              ===================================================================== */}
          <Gem_ScrollReveal direction="up" delay={0.2} duration={1.1}>
            <div className="w-full bg-white rounded-[32px] p-8 sm:p-12 lg:p-16 text-gray-800 shadow-2xl border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start gap-6 lg:gap-8">
                {/* 노란 전구 아이콘 */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 font-bold text-3xl shadow-sm">
                  💡
                </div>
                
                {/* 텍스트 내용 */}
                <div className="space-y-6 flex-1">
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-normal">
                    두통이 자주 나타난다면, 단순 두통으로 치부하기보다 <strong className="text-gray-950 font-extrabold">뇌종양이나 혈관 기형 등 위험한 질환의 초기 증상</strong>일 수 있으므로 신경과 전문의의 상담이 필요합니다. 약물 처방 시에는 원인 및 질환에 따른 맞춤형 처방이 이루어집니다.
                  </p>
                  
                  {/* 중간 구분선 */}
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-900 leading-relaxed font-bold">
                      만성 편두통의 경우 <mark className="bg-[#FFF176] px-3 py-1 rounded-md font-black text-gray-950">한 달에 15일 이상 통증이 지속될 때</mark> 진단하며, 전문적인 예방 및 조절 치료가 권장됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Gem_ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          [SECTION 3] 어지럼증 (Dizziness) - 다시 화이트 배경 전환!
          ========================================================================= */}
      <section className="w-full bg-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">

          {/* 3-1. 대제목 (먼 시작점에서 부드럽게 위로 등장) */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
                어지럼증
              </h2>
            </div>
          </Gem_ScrollReveal>

          {/* 3-2. 인트로 설명문 (먼 시작점에서 부드럽게 위로 등장) */}
          <Gem_ScrollReveal direction="up" delay={0.1} duration={1.1}>
            <div className="text-center max-w-5xl mx-auto">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
                어지럼증은 신체 평형을 유지하는 <strong className="text-gray-900 font-bold">시각계, 전정신경계, 중추신경계</strong> 중 어느 한 곳이라도 이상이 생기면 발생할 수 있습니다.
                <br />
                특히 뇌의 이상으로 인한 <strong className="text-[#0C7657] font-extrabold">중추성 어지럼증</strong>은 심각한 후유증을 남길 수 있습니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 3-3. 어지럼증 원인 및 증상에 따른 분류 (살구빛 크림 박스 1400px 풀 확장 & 대형 폰트) */}
          <Gem_ScrollReveal direction="up" delay={0.15} duration={1.1}>
            <div className="w-full bg-[#FAF5F0] rounded-[32px] p-8 sm:p-14 lg:p-16 border border-[#F0E4D8] shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* 좌측 영역 (약 35% 폭) */}
                <div className="lg:col-span-5">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-snug">
                    어지럼증<br />
                    원인 및 증상에 따른 분류
                  </h3>
                  <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    신체 평형감각 이상의 원인을 4가지 유형으로 세밀하게 감별 진단합니다.
                  </p>
                </div>

                {/* 우측 영역: 2열 대형 체크리스트 (약 65% 폭) */}
                <div className="lg:col-span-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                    {/* 1. 현훈 */}
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#E05326] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <svg className="w-4 h-4 text-white stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 leading-snug">
                          현훈 (Vertigo)
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 mt-1 leading-relaxed">
                          자신이나 세상이 빙글빙글 회전한다고 느낌 (말초/중추 전정질환)
                        </p>
                      </div>
                    </div>

                    {/* 2. 균형장애 */}
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#E05326] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <svg className="w-4 h-4 text-white stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 leading-snug">
                          균형장애 (Disequilibrium)
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 mt-1 leading-relaxed">
                          서 있거나 걸을 때 중심을 잡지 못함 (소뇌/전두엽 병변)
                        </p>
                      </div>
                    </div>

                    {/* 3. 실신성 어지럼증 */}
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#E05326] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <svg className="w-4 h-4 text-white stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 leading-snug">
                          실신성 어지럼증 (Presyncope)
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 mt-1 leading-relaxed">
                          순간적으로 아뜩해지는 느낌 (저혈당, 기립성 저혈압, 부정맥)
                        </p>
                      </div>
                    </div>

                    {/* 4. 심인성 어지럼증 */}
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#E05326] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <svg className="w-4 h-4 text-white stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 leading-snug">
                          심인성 어지럼증
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 mt-1 leading-relaxed">
                          붕 뜨거나 흔들리는 느낌 (공황장애, 불안, 우울, 만성피로)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Gem_ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          [SECTION 4] 어지럼증 주요 원인 질환 및 치료 - 다시 풀와이드 초록색 배경 전환!
          [UI 레이아웃 최적화: 
            1. 빨간색 전면 제거 ➔ 진한 초록 계열(#0C7657) 컴포넌트 톤 적용
            2. 응급실 문구 삭제 (하이병원 진료 체계 준수)
            3. 의료심의 준수: "MRI 정밀 촬영이 필요할 수 있습니다" 적용]
          ========================================================================= */}
      <section className="w-full bg-[#0C7657] text-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">

          {/* 4-1. 중앙 화이트 알약형 뱃지 (아래에서 위로 등장) */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="flex justify-center">
              <span className="inline-block px-10 py-4 rounded-full bg-white text-[#0C7657] text-lg sm:text-xl lg:text-2xl font-black shadow-md tracking-wide">
                어지럼증 주요 원인 질환 및 치료
              </span>
            </div>
          </Gem_ScrollReveal>

          {/* 4-2. 4개의 가로 와이드 화이트 라운드 카드 스택 (1400px 풀 확장 & 세로 간격 space-y-8 lg:space-y-10) */}
          <div className="space-y-8 lg:space-y-10 w-full">
            {/* 1. 이석증 */}
            <Gem_ScrollReveal direction="up" delay={0.1} duration={1.1}>
              <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20 hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    이석증 (BPPV)
                  </span>
                  <span className="text-[#0C7657] font-black text-2xl lg:text-3xl">≫</span>
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-1">
                  <p>특정 자세 변화 시 짧고 반복적인 회전성 어지럼증이 나타나며, 가장 흔한 원인입니다.</p>
                  <p className="text-[#0C7657] font-extrabold">치료: 체위정복술(이석정복술)로 당일 교정</p>
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 2. 전정신경염 */}
            <Gem_ScrollReveal direction="up" delay={0.15} duration={1.1}>
              <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20 hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    전정신경염
                  </span>
                  <span className="text-[#0C7657] font-black text-2xl lg:text-3xl">≫</span>
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-1">
                  <p>갑자기 발생하여 수일간 지속되는 어지럼과 구토가 특징입니다.</p>
                  <p className="text-[#0C7657] font-extrabold">치료: 급성기 전정억제제 처방 &amp; 조기 일상 복귀를 통한 전정재활 보상 유도</p>
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 3. 메니에르병 */}
            <Gem_ScrollReveal direction="up" delay={0.2} duration={1.1}>
              <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20 hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    메니에르병
                  </span>
                  <span className="text-[#0C7657] font-black text-2xl lg:text-3xl">≫</span>
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-1">
                  <p>어지럼과 함께 난청, 이명, 귀 충만감이 동반되어 일상생활을 방해합니다.</p>
                  <p className="text-[#0C7657] font-extrabold">치료: 저염식 식단 관리 &amp; 이뇨제 복용</p>
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 4. 뇌졸중 (중추성) - 빨간색 제거 및 응급실 문구 정정, 심의 반영 */}
            <Gem_ScrollReveal direction="up" delay={0.25} duration={1.1}>
              <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20 hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    뇌졸중 (중추성)
                  </span>
                  <span className="text-[#0C7657] font-black text-2xl lg:text-3xl">≫</span>
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-1">
                  <p>갑작스러운 어지럼증과 함께 심한 자세불안, 두통, 언어장애가 나타납니다.</p>
                  <p className="text-[#0C7657] font-extrabold">대응: 뇌혈관 질환 감별을 위해 MRI 정밀 촬영이 필요할 수 있습니다.</p>
                </div>
              </div>
            </Gem_ScrollReveal>
          </div>

          {/* =====================================================================
              [UI 레이아웃 최적화: Red Flags 대형 화이트 카드 
                - 빨간색 제거 ➔ 진한 초록 계열(#0C7657) 적용
                - 폰트색 진한 초록 계열 변경
                - 의료심의 반영: "MRI 정밀 촬영이 필요할 수 있습니다"]
              ===================================================================== */}
          <div className="pt-12 lg:pt-16">
            <Gem_ScrollReveal direction="up" delay={0.2} duration={1.2}>
              <div className="w-full bg-white text-gray-800 rounded-[36px] p-8 sm:p-14 lg:p-16 shadow-2xl border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  {/* 좌측 타이틀 및 설명 (진한 초록계열 강조) */}
                  <div className="lg:col-span-5 space-y-4">
                    <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#0C7657] text-xs font-black tracking-wider uppercase border border-emerald-100">
                      CLINICAL WARNING SIGNS
                    </span>
                    <h4 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                      주의해야 할 위험 신호<br />
                      <span className="text-[#0C7657] font-black">(즉시 병원 방문 요망)</span>
                    </h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed pt-2">
                      다음 증상이 두통이나 어지럼증과 함께 나타나면 <strong className="text-gray-950 font-extrabold underline decoration-[#0C7657] decoration-2">뇌졸중(뇌경색 또는 뇌출혈)</strong>일 가능성이 높습니다. 이때는 지체 없이 병원을 찾아야 합니다:
                    </p>
                  </div>

                  {/* 우측 5대 위험증상 가로 리스트 (진한 초록색 체크 아이콘 적용) */}
                  <div className="lg:col-span-7 space-y-3.5">
                    {[
                      "갑자기 나타나는 극심한 두통 (망치로 맞은 듯한 통증)",
                      "몸의 한쪽 마비 또는 감각 이상",
                      "말이 잘 나오지 않거나 이해하기 어려움",
                      "시야 장애 또는 물체가 두 개로 보임",
                      "어지럼증과 함께 균형을 잃고 쓰러짐",
                    ].map((text, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-[#FAF5F0] px-5 py-4 rounded-2xl border border-[#F0E4D8]">
                        <div className="w-6 h-6 rounded-full bg-[#0C7657] flex items-center justify-center flex-shrink-0 text-white text-xs font-black shadow-sm">
                          ✓
                        </div>
                        <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 하단 진료 권고 & 자세히보기 버튼 (의료심의 반영 문구) */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    정확한 진단을 위해서는 신경과 전문의의 진찰과 필요한 경우 <strong className="text-gray-950 font-bold">MRI 정밀 촬영이 필요할 수 있습니다.</strong>
                  </p>
                  <Link
                    href="/about/hours"
                    className="px-8 py-3.5 rounded-full bg-[#0C7657] text-white font-extrabold text-sm sm:text-base hover:bg-[#085B42] transition-colors whitespace-nowrap shadow-md"
                  >
                    진료시간 안내 →
                  </Link>
                </div>
              </div>
            </Gem_ScrollReveal>
          </div>

        </div>
      </section>

      {/* =========================================================================
          [SECTION 5] 하단 CTA 배너
          ========================================================================= */}
      <section className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="rounded-3xl bg-gradient-to-r from-[#0c2340] to-[#006699] text-white p-8 sm:p-12 lg:p-16 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 border border-white/20">
                  신경과 전문의 1:1 맞춤 진료 및 정밀 영상 판독 시스템
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  두통과 어지럼증, 원인 모를 불안감을 덜어드립니다
                </h3>
                <p className="mt-3 text-sm sm:text-base text-sky-100 max-w-2xl leading-relaxed">
                  인천하이병원은 분야별 전문의 협진과 정밀 진단 시스템을 바탕으로 환자 중심의 바른 치료를 약속합니다.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <Link
                  href="/community/inquiry"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white text-[#006699] font-bold text-sm hover:bg-sky-50 shadow-sm transition-colors text-center whitespace-nowrap shrink-0"
                >
                  온라인 문의 남기기
                </Link>
                <Link
                  href="/neurosurgery"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-sky-700/60 hover:bg-sky-700 text-white font-medium text-sm border border-white/20 transition-colors text-center whitespace-nowrap shrink-0"
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
