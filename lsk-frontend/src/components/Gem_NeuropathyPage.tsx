"use client";

import React from "react";
import Link from "next/link";
import Gem_SubPageHeader from "@/components/Gem_SubPageHeader";
import Gem_ScrollReveal from "@/components/Gem_ScrollReveal";
import { ShieldCheck } from "lucide-react";

/**
 * ==============================================================================
 * [인천하이병원] 말초신경병(Peripheral Neuropathy) 상세페이지 (Gem_NeuropathyPage.tsx)
 * ==============================================================================
 * 두통·어지럼증 및 치매 페이지 표준 마스터 패턴 완벽 적용:
 * 1. 1400px 와이드 레이아웃 (max-w-[1400px]) 풀 활용
 * 2. 상단 헤더 단색 #062667 및 하단 배너 단색 #08395d 적용
 * 3. 화이트 ↔ 딥 틸 청록(#0D2B35) 풀와이드 컬러 밴딩 리듬감
 * 4. 공식 스크롤 리빌 표준 모션 (1.1s 완만 감속 글라이딩, 90~120px 시작)
 * 5. 대제목 + 중앙 알약형 뱃지 + 좌우 교차 지그재그 SVG 일러스트 & 텍스트 스토리텔링
 * 6. 1400px 풀 확장 대형 카드 (전문의 권고 박스, 웜베이지 진단 박스, 화이트 가로 와이드 카드 스택)
 * 7. 보고서형 번호 목록 배제, 직관적이고 세련된 비주얼 구성
 * 8. 바이올렛 예약/상담 뱃지 버튼 (1666-1675) 탑재
 * ==============================================================================
 */

export default function Gem_NeuropathyPage() {
  // 상단 브레드크럼 경로
  const breadcrumbs = [
    { label: "홈", href: "/" },
    { label: "진료과", href: "/neurosurgery" },
    { label: "뇌신경센터", href: "/neurosurgery" },
    { label: "말초신경병", href: "/neurosurgery/peripheral-neuropathy" },
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
        description="손발저림과 감각 이상, 원인을 찾아 신경 손상을 막는 맞춤 진료. 인천하이병원 뇌신경센터가 신경계 건강을 되찾아 드립니다."
        currentHref="/neurosurgery/peripheral-neuropathy"
        breadcrumbs={breadcrumbs}
        tabItems={tabItems}
      />

      {/* =========================================================================
          [SECTION 1] 말초신경병 주요 증상 - 화이트 배경 (순수 텍스트 & 지그재그 일러스트)
          ========================================================================= */}
      <section className="w-full bg-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">

          {/* 1-1. 대제목 (먼 시작점에서 부드럽게 위로 등장) */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
                말초신경병
              </h2>
            </div>
          </Gem_ScrollReveal>

          {/* 1-2. 인트로 설명문 (단어 잘림 없는 완벽한 2줄 중앙 정렬) */}
          <Gem_ScrollReveal direction="up" delay={0.1} duration={1.1}>
            <div className="w-full text-center max-w-5xl mx-auto">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium break-keep">
                말초신경병은 뇌와 척수 이외의 전신을 연결하는 <span className="font-bold text-gray-900 underline decoration-[#0D2B35] decoration-2">말초신경이 손상되어 나타나는 질환</span>입니다.
                <br className="hidden sm:inline" />
                손상된 신경의 종류에 따라 <strong className="text-[#0D2B35] font-extrabold">감각 이상, 근력 저하, 자율신경계 기능 장애</strong>까지 다양하게 발현됩니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 1-3. 알약형 딥 틸 뱃지 */}
          <Gem_ScrollReveal direction="up" delay={0.15} duration={1.1}>
            <div className="flex justify-center">
              <span className="inline-block px-10 py-3.5 rounded-full bg-[#0D2B35] text-white text-lg sm:text-xl font-black shadow-sm tracking-wide">
                말초신경병의 주요 증상
              </span>
            </div>
          </Gem_ScrollReveal>

          {/* 1-4. 지그재그 1: [좌측 텍스트 (Left-in)] + [우측 신경 감각 일러스트 (Right-in)] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8">
            {/* 좌측 텍스트 박스: 감각신경 손상 & 장갑·양말 형태 */}
            <div className="lg:col-span-7">
              <Gem_ScrollReveal direction="left" duration={1.2} delay={0.1}>
                <div className="space-y-8">
                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0D2B35] bg-teal-50 px-3.5 py-1 rounded-full border border-teal-100 mb-3">
                      SENSORY SYMPTOM
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                      감각신경 이상과 신경성 통증
                    </h3>
                    <p className="mt-3 text-lg sm:text-xl text-gray-700 leading-relaxed font-normal break-keep">
                      말초신경 손상에서 가장 흔하게 나타나는 초기 신호로 손끝과 발끝이 찌릿찌릿 저리고, 고춧가루를 뿌린 듯 화끈거리거나 바늘로 콕콕 찌르는 듯한 통증이 발생합니다.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-gray-150 space-y-3">
                    <h4 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                      양말과 장갑(Glove &amp; Stocking) 양상
                    </h4>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed break-keep">
                      증상은 가장 긴 말단 신경인 발가락 끝이나 손끝에서 먼저 시작하여, 점차 발목과 종아리, 손목 쪽으로 대칭을 이루며 올라오는 독특한 특징을 보입니다.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-150 space-y-2">
                    <h4 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                      야간 통증 악화
                    </h4>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed break-keep">
                      낮 동안 활동할 때보다 밤에 잠자리에 들었을 때 저림과 시림, 화끈거림이 한층 심해져 극심한 수면 장애를 초래합니다.
                    </p>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측 신경 감각 일러스트 (손발 신경망을 보살피는 따뜻한 플랫 벡터 아트) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Gem_ScrollReveal direction="right" duration={1.2} delay={0.15}>
                <div className="w-72 h-72 sm:w-80 sm:h-80 relative flex items-center justify-center">
                  <svg className="w-full h-full drop-shadow-md" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* 소프트 틸 배경 원 */}
                    <circle cx="150" cy="150" r="130" fill="#E8F4F5" />
                    {/* 발과 발목의 완만한 곡선 */}
                    <path d="M120 70C120 110 115 150 115 170C115 190 120 205 140 215C160 225 195 225 210 225C220 225 225 215 220 205C215 195 190 190 180 180C170 170 165 150 165 70" fill="#F9DFD0" />
                    {/* 양말 모양의 감각 이상 영역 (Glove & Stocking) */}
                    <path d="M115 160C115 185 120 205 140 215C160 225 195 225 210 225C220 225 225 215 220 205C215 195 190 190 180 180C170 170 165 160 165 160Z" fill="#C5E3E6" opacity="0.85" />
                    {/* 발끝 신경 자극 펄스 (화끈거림, 찌릿함 파동) */}
                    <circle cx="215" cy="215" r="7" fill="#E05326" />
                    <circle cx="195" cy="220" r="5" fill="#E05326" />
                    <circle cx="175" cy="220" r="5" fill="#E05326" />
                    <path d="M225 205Q235 215 225 225" stroke="#E05326" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M232 198Q246 215 232 232" stroke="#E05326" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                    {/* 치유를 돕는 신경망 연결선 */}
                    <path d="M140 85L140 150M140 150L130 180M140 150L150 180" stroke="#0D2B35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="140" cy="85" r="5" fill="#0D2B35" />
                    <circle cx="130" cy="180" r="4" fill="#0D2B35" />
                    <circle cx="150" cy="180" r="4" fill="#0D2B35" />
                    {/* 상단 회복 심볼 */}
                    <circle cx="150" cy="45" r="12" fill="#0D2B35" />
                    <path d="M145 45L150 38L155 45" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </Gem_ScrollReveal>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          [SECTION 2] 생기는 원인 & 운동/자율신경 이상 - 풀와이드 딥 틸(#0D2B35) 배경 전환!
          ========================================================================= */}
      <section className="w-full bg-[#0D2B35] text-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">

          {/* 2-1. 지그재그 2: [좌측 신경망 회복 일러스트 (Left-in)] + [우측 텍스트 (Right-in)] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* 좌측 전신 신경망 및 운동성 회복 일러스트 */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
              <Gem_ScrollReveal direction="left" duration={1.2} delay={0.1}>
                <div className="w-72 h-72 sm:w-80 sm:h-80 relative flex items-center justify-center">
                  <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="150" cy="150" r="130" fill="#06181F" />
                    {/* 전신 신경 가지를 상징하는 나뭇가지/신경 세포체 형태 */}
                    <circle cx="150" cy="110" r="26" fill="#154857" />
                    <circle cx="150" cy="110" r="14" fill="#2AB7CA" />
                    {/* 신경 축삭과 뻗어나가는 신경 가지 곡선 */}
                    <path d="M150 136V220" stroke="#2AB7CA" strokeWidth="6" strokeLinecap="round" />
                    <path d="M150 160C120 180 95 190 80 230" stroke="#2AB7CA" strokeWidth="4" strokeLinecap="round" />
                    <path d="M150 160C180 180 205 190 220 230" stroke="#2AB7CA" strokeWidth="4" strokeLinecap="round" />
                    <path d="M150 190C130 205 110 220 105 250" stroke="#2AB7CA" strokeWidth="3" strokeLinecap="round" />
                    <path d="M150 190C170 205 190 220 195 250" stroke="#2AB7CA" strokeWidth="3" strokeLinecap="round" />
                    {/* 신경 전달 활성 시냅스 노드 */}
                    <circle cx="80" cy="230" r="7" fill="#FED766" />
                    <circle cx="220" cy="230" r="7" fill="#FED766" />
                    <circle cx="105" cy="250" r="6" fill="#FED766" />
                    <circle cx="195" cy="250" r="6" fill="#FED766" />
                    <circle cx="150" cy="220" r="8" fill="#FED766" />
                    {/* 온화한 치유의 하트 링 */}
                    <path d="M150 70C165 50 195 50 208 72C220 94 195 120 150 155C105 120 80 94 92 72C105 50 135 50 150 70Z" stroke="#E2F0F3" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.4" />
                  </svg>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측 텍스트: 운동/자율신경 이상 & 생기는 4대 원인 */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <Gem_ScrollReveal direction="right" duration={1.2} delay={0.15}>
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">
                    ETIOLOGY &amp; DIVERSE MANIFESTATIONS
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    운동·자율신경 손상과 발병 원인
                  </h3>
                  <p className="mt-3 text-lg sm:text-xl text-teal-100/90 leading-relaxed font-normal break-keep">
                    말초신경병은 단순한 감각 이상을 넘어 운동 신경 마비와 자율신경계 부조화를 유발하며, 원인에 따라 질환의 예후가 결정됩니다.
                  </p>
                </div>

                {/* 4대 원인 카드 그리드 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/10 p-5 rounded-2xl border border-white/15">
                    <p className="text-base sm:text-lg font-bold text-white mb-1">당뇨병성 고혈당</p>
                    <p className="text-xs sm:text-sm text-teal-200/90 leading-relaxed">
                      만성 고혈당이 신경 영양 혈관을 망가뜨리는 가장 대표적인 원인으로, 당뇨 환자의 30~50%에서 발생합니다.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-2xl border border-white/15">
                    <p className="text-base sm:text-lg font-bold text-white mb-1">신경 포착 및 압박 질환</p>
                    <p className="text-xs sm:text-sm text-teal-200/90 leading-relaxed">
                      손목터널증후군(수근관 증후군), 팔꿈치 터널 등 좁은 관절 부위에서 신경이 눌려 지속적인 저림을 유발합니다.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-2xl border border-white/15">
                    <p className="text-base sm:text-lg font-bold text-amber-300 mb-1">비타민 결핍 및 대사 질환</p>
                    <p className="text-xs sm:text-sm text-teal-200/90 leading-relaxed">
                      비타민 B1, B6, B12 결핍이나 만성 신부전, 갑상선 저하증 등 대사 불균형으로 인해 신경막이 퇴행합니다.
                    </p>
                  </div>
                  <div className="bg-white/10 p-5 rounded-2xl border border-white/15">
                    <p className="text-base sm:text-lg font-bold text-white mb-1">만성 음주 · 흡연 · 독성 물질</p>
                    <p className="text-xs sm:text-sm text-teal-200/90 leading-relaxed">
                      알코올 자체의 신경 독성과 영양 흡수 장애, 흡연으로 인한 미세 혈류 장애가 복합적으로 작용합니다.
                    </p>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>
          </div>

          {/* 2-2. 1400px 와이드 대형 화이트 라운드 카드: 전문의 권고 및 운동·자율신경 경고 */}
          <Gem_ScrollReveal direction="up" delay={0.2} duration={1.1}>
            <div className="w-full bg-white rounded-[32px] p-8 sm:p-12 lg:p-16 text-gray-800 shadow-2xl border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start gap-6 lg:gap-8">
                {/* 돋보기/전구 아이콘 */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal-50 text-[#0D2B35] flex items-center justify-center shrink-0 font-bold text-3xl shadow-sm">
                  💡
                </div>
                
                {/* 텍스트 내용 */}
                <div className="space-y-6 flex-1">
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-normal break-keep">
                    손발에 힘이 빠져 단추를 잠그기 어렵거나 걸을 때 발끝이 바닥에 걸리는 <strong className="text-gray-950 font-extrabold">운동신경 이상</strong>, 그리고 일어설 때 핑 도는 기립성 저혈압이나 소화불량 같은 <strong className="text-gray-950 font-extrabold">자율신경 이상</strong>이 나타난다면 신경 손상이 이미 깊어진 상태입니다.
                  </p>
                  
                  {/* 중간 구분선 */}
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-900 leading-relaxed font-bold break-keep">
                      손발저림을 단순 노화나 혈액순환 문제로 치부하여 방치하지 말고, <mark className="bg-[#FFF176] px-3 py-1 rounded-md font-black text-gray-950">조기에 신경과 전문의의 정밀 진단</mark>을 받아 원인을 밝히는 것이 완치와 신경 재생의 핵심입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Gem_ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          [SECTION 3] 진단 및 정밀 검사 방법 - 화이트 배경 복귀
          ========================================================================= */}
      <section className="w-full bg-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">

          {/* 3-1. 대제목 */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
                진단 및 정밀 검사
              </h2>
            </div>
          </Gem_ScrollReveal>

          {/* 3-2. 인트로 설명문 (단어 잘림 없는 완벽한 2줄 중앙 정렬) */}
          <Gem_ScrollReveal direction="up" delay={0.1} duration={1.1}>
            <div className="w-full text-center max-w-5xl mx-auto">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium break-keep">
                정확한 원인 파악을 위해 숙련된 신경과 전문의의 세밀한 진찰과 체계적인 정밀 검사가 시행됩니다.
                <br className="hidden sm:inline" />
                신경 손상의 위치와 범위를 수치화하여 객관적인 맞춤 치료 계획을 수립합니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 3-3. 알약형 딥 틸 뱃지 */}
          <Gem_ScrollReveal direction="up" delay={0.15} duration={1.1}>
            <div className="flex justify-center">
              <span className="inline-block px-10 py-3.5 rounded-full bg-[#0D2B35] text-white text-lg sm:text-xl font-black shadow-sm tracking-wide">
                진단 및 치료 시스템
              </span>
            </div>
          </Gem_ScrollReveal>

          {/* 3-4. 1400px 와이드 웜베이지/살구빛 박스: 4대 정밀 검사 및 치료 프로세스 */}
          <Gem_ScrollReveal direction="up" delay={0.2} duration={1.1}>
            <div className="w-full bg-[#FAF5F0] rounded-[32px] p-8 sm:p-12 lg:p-16 border border-[#F0E4D8] shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* 1. 신경학적 진찰 */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-black">
                    CLINICAL EXAM
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-gray-900">
                    신경학적 진찰
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    건반사, 근력, 감각 인지 능력(진동·위치·온도), 균형 및 협응 능력을 1:1로 면밀히 평가합니다.
                  </p>
                </div>

                {/* 2. 신경전도 검사 (NCS) */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
                    NCS TEST
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-gray-900">
                    신경전도 검사
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    말초신경에 미세한 전기 자극을 가해 신호의 전달 속도와 크기를 측정하여 손상 부위를 밝혀냅니다.
                  </p>
                </div>

                {/* 3. 침 근전도 검사 (EMG) */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black">
                    EMG TEST
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-gray-900">
                    근전도 검사
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    근육 내 미세 침 전극을 통해 근육 자체의 질환인지 신경 지배 이상으로 인한 손상인지 정밀 감별합니다.
                  </p>
                </div>

                {/* 4. 혈액검사 및 정밀 영상 */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                    LAB &amp; MRI
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-gray-900">
                    혈액검사 &amp; MRI
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    혈당 및 비타민 수치를 확인하고, 신경 압박이나 척추 질환 감별을 위해 정밀 영상 검사를 병행합니다.
                  </p>
                </div>

              </div>

              {/* 하단 치료 요약 바 */}
              <div className="mt-10 pt-8 border-t border-[#EAE0D4] grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
                <div className="bg-white/80 p-5 rounded-2xl border border-[#EAE0D4]">
                  <strong className="block text-base font-bold text-gray-950 mb-1">원인 질환 관리</strong>
                  <p className="text-xs sm:text-sm text-gray-600">철저한 혈당 조절 및 대사 질환 교정으로 신경 손상 진행 억제</p>
                </div>
                <div className="bg-white/80 p-5 rounded-2xl border border-[#EAE0D4]">
                  <strong className="block text-base font-bold text-gray-950 mb-1">신경통 맞춤 약물 치료</strong>
                  <p className="text-xs sm:text-sm text-gray-600">항경련제, 항우울제 및 국소 리도카인 패치로 신경성 통증 조절</p>
                </div>
                <div className="bg-white/80 p-5 rounded-2xl border border-[#EAE0D4]">
                  <strong className="block text-base font-bold text-gray-950 mb-1">물리재활 및 수술적 감압</strong>
                  <p className="text-xs sm:text-sm text-gray-600">근력 저하 방지 도수 재활 및 손목터널 등 신경 압박 시 감압술</p>
                </div>
              </div>
            </div>
          </Gem_ScrollReveal>

          {/* 진단 장비 정밀 안내 배너 + 바이올렛 예약/상담 뱃지 버튼 */}
          <Gem_ScrollReveal direction="up" delay={0.1}>
            <div className="p-8 rounded-[28px] bg-[#FBFBFD] border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0D2B35] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-[#111111]">
                    신경과 전문의 정밀 검진 &amp; 첨단 영상 장비
                  </h5>
                  <p className="text-sm text-[#666666] mt-1">
                    정확한 원인 진단을 위해서는 신경과 전문의의 진찰과 함께 <strong className="text-[#0D2B35]">MRI 정밀 촬영이 필요할 수 있습니다.</strong>
                  </p>
                </div>
              </div>
              <a
                href="tel:1666-1675"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#6824EB] hover:bg-[#5818D6] text-white transition-all shadow-md shrink-0 whitespace-nowrap"
              >
                <div className="flex flex-col text-[11px] font-extrabold leading-tight tracking-tight text-center">
                  <span>예약</span>
                  <span>상담</span>
                </div>
                <span className="text-lg sm:text-xl font-black tracking-tight">
                  1666-1675
                </span>
              </a>
            </div>
          </Gem_ScrollReveal>

        </div>
      </section>

      {/* =========================================================================
          [SECTION 4] 예방 및 일상 관리 수칙 (당뇨발 Foot Care) - 풀와이드 딥 틸(#0D2B35) 전환!
          ========================================================================= */}
      <section className="w-full bg-[#0D2B35] text-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">

          {/* 4-1. 중앙 화이트 알약형 뱃지 */}
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="flex justify-center">
              <span className="inline-block px-10 py-4 rounded-full bg-white text-[#0D2B35] text-lg sm:text-xl lg:text-2xl font-black shadow-md tracking-wide">
                예방 및 일상 관리 수칙
              </span>
            </div>
          </Gem_ScrollReveal>

          {/* 4-2. 4개의 가로 와이드 화이트 라운드 카드 스택 (세로 간격 space-y-8 lg:space-y-10) */}
          <div className="space-y-8 lg:space-y-10 w-full">
            
            {/* 카드 1: 당뇨발(Foot Care) 집중 관리 */}
            <Gem_ScrollReveal direction="up" delay={0.1} duration={1.1}>
              <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20 hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    당뇨발(Foot Care) 관리
                  </span>
                  <span className="text-teal-700 font-black text-2xl lg:text-3xl">≫</span>
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-1">
                  <p>감각이 둔해져 상처를 입기 쉬우므로 <strong>매일 거울로 발바닥과 발가락 사이</strong>를 점검합니다.</p>
                  <p className="text-[#0D2B35] font-extrabold">쿠션이 충분한 편안한 신발 착용 &amp; 이음새 없는 순면 양말 필수 (맨발 보행 금지)</p>
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 카드 2: 만성 위험 인자 정밀 조절 */}
            <Gem_ScrollReveal direction="up" delay={0.15} duration={1.1}>
              <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20 hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    위험 인자 정상화
                  </span>
                  <span className="text-teal-700 font-black text-2xl lg:text-3xl">≫</span>
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-1">
                  <p><strong>혈당, 혈압, 콜레스테롤</strong>을 정상 범위 내로 엄격히 관리해야 말초혈관을 지킬 수 있습니다.</p>
                  <p className="text-[#0D2B35] font-extrabold">혈관을 수축시키는 담배는 무조건 금연 &amp; 정기적인 당화혈색소 점검</p>
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 카드 3: 건강 생활습관 및 규칙적 운동 */}
            <Gem_ScrollReveal direction="up" delay={0.2} duration={1.1}>
              <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20 hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    생활 습관 &amp; 유산소 운동
                  </span>
                  <span className="text-teal-700 font-black text-2xl lg:text-3xl">≫</span>
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-1">
                  <p>신경독성을 일으키는 과도한 음주를 피하고, <strong>비타민과 미네랄이 풍부한 균형 식단</strong>을 섭취합니다.</p>
                  <p className="text-[#0D2B35] font-extrabold">일주일에 3회 이상 가벼운 걷기 운동으로 혈당 조절 및 신경 혈류 촉진</p>
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 카드 4: 기립성 저혈압 낙상 주의 */}
            <Gem_ScrollReveal direction="up" delay={0.25} duration={1.1}>
              <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20 hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    기립 시 낙상 주의
                  </span>
                  <span className="text-teal-700 font-black text-2xl lg:text-3xl">≫</span>
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-1">
                  <p>자율신경 이상으로 갑자기 일어설 때 핑 도는 기립성 어지럼증이 동반될 수 있습니다.</p>
                  <p className="text-[#0D2B35] font-extrabold">자세 변화 시 잠시 앉아 심호흡 후 천천히 일어나는 습관으로 낙상 방지</p>
                </div>
              </div>
            </Gem_ScrollReveal>

          </div>

        </div>
      </section>

      {/* =========================================================================
          최하단 CTA 배너
          - 배경: 단색 오션 네이비 (#08395d)
          - 가로폭: 1400px 와이드 컨테이너
          - 버튼 줄바꿈 방지: whitespace-nowrap 및 shrink-0 적용
          ========================================================================= */}
      <section className="w-full py-16 bg-[#08395d] text-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <Gem_ScrollReveal direction="right" delay={0.05}>
            <div>
              <span className="text-blue-200 text-sm font-bold tracking-wider uppercase mb-1 block">
                PERIPHERAL NEUROPATHY CARE &amp; RESTORATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold">
                손발저림과 신경 통증, 정밀 진단으로 조기에 회복하세요
              </h3>
              <p className="text-slate-200 mt-2 text-base">
                신경과 전문의 1:1 맞춤 검사와 체계적인 신경 재생 치료 솔루션을 신속하게 안내해 드립니다.
              </p>
            </div>
          </Gem_ScrollReveal>

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
      </section>
    </div>
  );
}
