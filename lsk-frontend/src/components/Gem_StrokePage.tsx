"use client";

import React from "react";
import Gem_SubPageHeader from "@/components/Gem_SubPageHeader";
import Gem_ScrollReveal from "@/components/Gem_ScrollReveal";
import { AlertTriangle, Clock, ShieldCheck, HeartPulse, Activity, Phone, Calendar, ArrowRight, Zap, CheckCircle2, Eye, MessageSquare } from "lucide-react";
import Link from "next/link";

/**
 * ==============================================================================
 * [인천하이병원 뇌신경센터] 뇌졸중(중풍) 클리닉 상세페이지 컴포넌트
 * ==============================================================================
 * 기능 및 레이아웃 명세:
 * 1. 1400px 와이드 그리드 레이아웃 (max-w-[1400px])
 * 2. 포인트 컬러: 진한 밤색/초콜릿 계열 (#381E15) 풀와이드 밴딩 적용
 * 3. 텍스트 레이아웃: 보고서형 번호 목록(1, 2, 3 등)을 전면 배제하고 시각적 카드 및 타이포그래피 데코레이션 적용
 * 4. 스크롤 리빌: 90~120px 원거리 시작, 1.1s 완만 감속 글라이딩 모션
 * 5. 버튼 줄바꿈 방지: whitespace-nowrap 및 shrink-0 클래스 적용
 * 6. 의료심의 준수: "MRI 정밀 촬영이 필요할 수 있습니다" 표현 및 정확한 골든타임 정보 제공
 * ==============================================================================
 */

export default function Gem_StrokePage() {
  const breadcrumbs = [
    { label: "홈", href: "/" },
    { label: "진료과", href: "/neurosurgery" },
    { label: "뇌신경센터", href: "/neurosurgery" },
    { label: "뇌졸중(중풍)", href: "/neurosurgery/stroke" },
  ];

  const tabItems = [
    { name: "두통·어지럼증", href: "/neurosurgery/headache-dizziness" },
    { name: "치매", href: "/neurosurgery/dementia" },
    { name: "뇌졸중(중풍)", href: "/neurosurgery/stroke" },
    { name: "말초신경병", href: "/neurosurgery/peripheral-neuropathy" },
  ];

  return (
    <div className="w-full bg-[#FAFAFC] overflow-hidden text-[#111111]">
      {/* -------------------------------------------------------------
          상단 공통 헤더
          - 단색 배경 (#062667)
          - 텍스트 타이포그래피 집중 및 여백 극대화
      ------------------------------------------------------------- */}
      <Gem_SubPageHeader
        categoryTitle="뇌신경센터"
        categorySubTitle="NEUROLOGY & NEUROSURGERY CENTER"
        description="골든타임을 지키는 신속한 원인 감별과 집중 치료, 인천하이병원 뇌신경센터가 뇌혈관 건강을 지킵니다."
        currentHref="/neurosurgery/stroke"
        breadcrumbs={breadcrumbs}
        tabItems={tabItems}
      />

      {/* -------------------------------------------------------------
          뇌졸중의 주요 증상
          - 화이트 배경, 1400px 와이드 컨테이너
          - 번호 목록 없이 직관적인 시각 카드 구성
      ------------------------------------------------------------- */}
      <section className="w-full py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          
          <Gem_ScrollReveal direction="up" delay={0.05}>
            <div className="text-center max-w-4xl mx-auto mb-20">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 text-sm font-semibold tracking-wide border border-amber-200 mb-4">
                <Zap className="w-4 h-4 text-amber-800" />
                STROKE WARNING SIGNS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111111] leading-tight mb-6">
                갑자기 나타나는 뇌졸중의 주요 경고 신호
              </h2>
              <p className="text-lg sm:text-xl text-[#555555] font-normal leading-relaxed break-keep">
                뇌졸중은 뇌혈관이 막히는 <strong>뇌경색(허혈 뇌졸중)</strong>과 터지는 <strong>뇌출혈(출혈 뇌졸중)</strong>로 나뉩니다.
                <br className="hidden sm:inline" />
                가장 결정적인 특징은 예고 없이 <strong>증상이 한순간에 갑자기 발생한다</strong>는 점입니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 4대 주요 증상 카드 그리드 (번호 목록 배제) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            
            {/* 편측 마비 */}
            <Gem_ScrollReveal direction="up" delay={0.1}>
              <div className="bg-[#FDFBF9] rounded-3xl p-8 border border-amber-900/10 hover:border-amber-900/30 hover:bg-white hover:shadow-[0_20px_40px_rgba(56,30,21,0.06)] transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-100/70 text-[#381E15] flex items-center justify-center mb-6">
                    <Activity className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] mb-2">편측 마비</h3>
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-4">Hemiplegia</p>
                  <p className="text-[#555555] text-base leading-relaxed break-keep">
                    몸의 한쪽 팔다리에 갑자기 힘이 쑥 빠지거나 감각이 무뎌져 숟가락을 떨어뜨리고 제대로 서 있기 어렵습니다.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-amber-100 text-xs font-semibold text-amber-900">
                  신체 좌·우 비대칭 마비 발생
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 언어 장애 */}
            <Gem_ScrollReveal direction="up" delay={0.15}>
              <div className="bg-[#FDFBF9] rounded-3xl p-8 border border-amber-900/10 hover:border-amber-900/30 hover:bg-white hover:shadow-[0_20px_40px_rgba(56,30,21,0.06)] transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-100/70 text-[#381E15] flex items-center justify-center mb-6">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] mb-2">언어 장애</h3>
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-4">Aphasia & Dysarthria</p>
                  <p className="text-[#555555] text-base leading-relaxed break-keep">
                    혀가 굳어 발음이 어눌해지는 구음 장애가 나타나거나, 상대방의 말을 잘 알아듣지 못하고 말이 헛나오는 실어증이 발생합니다.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-amber-100 text-xs font-semibold text-amber-900">
                  발음 둔화 및 의사소통 단절
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 시각 장애 */}
            <Gem_ScrollReveal direction="up" delay={0.2}>
              <div className="bg-[#FDFBF9] rounded-3xl p-8 border border-amber-900/10 hover:border-amber-900/30 hover:bg-white hover:shadow-[0_20px_40px_rgba(56,30,21,0.06)] transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-100/70 text-[#381E15] flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] mb-2">시각 장애</h3>
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-4">Visual Disturbance</p>
                  <p className="text-[#555555] text-base leading-relaxed break-keep">
                    갑자기 한쪽 눈이 전혀 보이지 않거나 시야의 반쪽이 어둡게 가려지며, 사물이 두 개로 겹쳐 보이는 복시 현상이 나타납니다.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-amber-100 text-xs font-semibold text-amber-900">
                  시야 결손 및 복시 증상
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 극심한 두통 & 어지럼증 */}
            <Gem_ScrollReveal direction="up" delay={0.25}>
              <div className="bg-[#FDFBF9] rounded-3xl p-8 border border-amber-900/10 hover:border-amber-900/30 hover:bg-white hover:shadow-[0_20px_40px_rgba(56,30,21,0.06)] transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-100/70 text-[#381E15] flex items-center justify-center mb-6">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] mb-2">극심한 두통·어지럼</h3>
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-4">Severe Headache & Vertigo</p>
                  <p className="text-[#555555] text-base leading-relaxed break-keep">
                    망치로 맞은 듯 난생처음 겪는 벼락 두통이나, 중심을 전혀 잡지 못하고 한쪽으로 쓰러지는 심한 보행 어지럼증이 동반됩니다.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-amber-100 text-xs font-semibold text-amber-900">
                  벼락 두통 및 소뇌 실조증
                </div>
              </div>
            </Gem_ScrollReveal>

          </div>

          {/* 일시적 / 무증상 뇌졸중 와이드 2열 카드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 미니 뇌졸중 */}
            <Gem_ScrollReveal direction="right" delay={0.1}>
              <div className="bg-[#FFFDFB] rounded-3xl p-8 sm:p-10 border-2 border-amber-300/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase">
                      CRITICAL WARNING
                    </span>
                    <h4 className="text-2xl font-bold text-[#111111]">일과성 허혈 발작 (미니 뇌졸중, TIA)</h4>
                  </div>
                  <p className="text-base text-[#444444] leading-relaxed mb-4 break-keep">
                    마비나 언어 장애 등의 증상이 잠시 나타났다가 24시간 이내(보통 수분~수십 분 내)에 거짓말처럼 사라집니다. 
                    혈관이 일시적으로 막혔다가 다시 뚫린 상태로, <strong>수일 또는 수개월 내에 심각한 본 뇌졸중이 발생할 강력한 전조 신호</strong>이므로 결코 안심해서는 안 되며 즉시 정밀 검사를 받아야 합니다.
                  </p>
                </div>
                <div className="pt-4 border-t border-amber-200 text-sm font-semibold text-[#381E15]">
                  ⚠️ 증상이 사라졌더라도 지체 없이 신경과 전문 진단을 받아야 합니다.
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 무증상 뇌졸중 */}
            <Gem_ScrollReveal direction="left" delay={0.15}>
              <div className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 font-bold text-xs uppercase">
                      SILENT STROKE
                    </span>
                    <h4 className="text-2xl font-bold text-[#111111]">무증상 뇌졸중 (침묵의 뇌경색)</h4>
                  </div>
                  <p className="text-base text-[#444444] leading-relaxed mb-4 break-keep">
                    겉으로는 뚜렷한 마비나 두통이 드러나지 않지만, 뇌의 미세혈관이 막혀 뇌세포 일부가 이미 손상된 상태입니다.
                    뇌 정밀 검진 시 우연히 발견되는 경우가 많으며, 방치할 경우 혈관성 치매나 광범위한 뇌경색으로 악화될 수 있어 예방 관리가 필수적입니다.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200 text-sm font-semibold text-slate-700">
                  🔍 정기적인 뇌혈관 정밀 검진을 통한 조기 발견이 핵심입니다.
                </div>
              </div>
            </Gem_ScrollReveal>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          뇌졸중의 원인 분류
          - 포인트 컬러: 진한 밤색 (#381E15) 풀와이드 밴딩
          - 뇌경색 원인 vs 뇌출혈 원인 비교
      ------------------------------------------------------------- */}
      <section className="w-full py-24 bg-[#381E15] text-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          
          <Gem_ScrollReveal direction="up" delay={0.05}>
            <div className="text-center max-w-4xl mx-auto mb-20">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-amber-200 text-sm font-semibold tracking-wide border border-white/15 mb-4">
                <HeartPulse className="w-4 h-4 text-amber-300" />
                PATHOLOGY & CAUSES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white leading-tight mb-6">
                혈관이 막히는 뇌경색과 터지는 뇌출혈의 원인
              </h2>
              <p className="text-lg sm:text-xl text-amber-100/90 font-normal leading-relaxed break-keep">
                뇌혈관 질환은 원인에 따라 치료법과 예방 전략이 완전히 다릅니다.
                <br className="hidden sm:inline" />
                정밀 검사를 통해 정확한 병변 위치와 기저 원인을 명확하게 규명해야 합니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 뇌경색 vs 뇌출혈 2대 와이드 블록 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 뇌경색 원인 블록 */}
            <Gem_ScrollReveal direction="right" delay={0.1}>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/15 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/15">
                    <div>
                      <span className="text-amber-300 text-xs font-mono uppercase tracking-wider block mb-1">ISCHEMIC STROKE</span>
                      <h3 className="text-3xl font-bold text-white">뇌경색의 주요 원인</h3>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-200 text-xs font-semibold border border-amber-400/30">
                      전체 뇌졸중의 약 80%
                    </span>
                  </div>

                  <div className="space-y-6 text-amber-100/90">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-bold text-white mb-2">동맥경화증 (혈전 형성)</h4>
                      <p className="text-sm sm:text-base leading-relaxed text-amber-100/80">
                        고혈압·고지혈증 등으로 인해 큰 뇌혈관 안쪽에 기름때가 끼고 혈관벽이 딱딱해지며, 좁아진 부위에 피떡(혈전)이 생겨 뇌혈류를 차단합니다.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-bold text-white mb-2">심장성 색전 (부정맥)</h4>
                      <p className="text-sm sm:text-base leading-relaxed text-amber-100/80">
                        심방세동 같은 부정맥 질환이 있을 때 심장 안에서 굳은 혈전 조각이 혈류를 타고 올라가 뇌혈관을 갑자기 틀어막습니다.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-bold text-white mb-2">소혈관 질환 (열공성 뇌경색)</h4>
                      <p className="text-sm sm:text-base leading-relaxed text-amber-100/80">
                        뇌 깊숙한 곳의 가느다란 미세혈관들이 장기간의 고혈압 손상으로 딱딱하게 굳어 막히는 질환입니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15 text-xs text-amber-200/80">
                  💡 항혈소판제 및 항응고제 복용과 혈관 위험인자 조절이 재발 방지의 핵심입니다.
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 뇌출혈 원인 블록 */}
            <Gem_ScrollReveal direction="left" delay={0.15}>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/15 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/15">
                    <div>
                      <span className="text-rose-300 text-xs font-mono uppercase tracking-wider block mb-1">HEMORRHAGIC STROKE</span>
                      <h3 className="text-3xl font-bold text-white">뇌출혈의 주요 원인</h3>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-200 text-xs font-semibold border border-rose-400/30">
                      치명적인 급성 출혈
                    </span>
                  </div>

                  <div className="space-y-6 text-amber-100/90">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-bold text-white mb-2">뇌내출혈 (고혈압성)</h4>
                      <p className="text-sm sm:text-base leading-relaxed text-amber-100/80">
                        오랜 기간 조절되지 않은 고혈압으로 인해 탄력을 잃고 약해진 뇌혈관벽이 높은 혈압을 이기지 못하고 뇌 조직 안에서 직접 터집니다.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-bold text-white mb-2">거미막밑 출혈 (뇌동맥류 파열)</h4>
                      <p className="text-sm sm:text-base leading-relaxed text-amber-100/80">
                        뇌동맥 일부가 풍선이나 꽈리처럼 부풀어 오른 뇌동맥류가 순간적인 압력을 견디지 못하고 터지며, 극심한 두통과 함께 의식 장애를 유발합니다.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-bold text-white mb-2">뇌혈관 기형 및 혈관염</h4>
                      <p className="text-sm sm:text-base leading-relaxed text-amber-100/80">
                        선천적인 동정맥 기형이나 혈관염, 뇌아밀로이드 혈관병증 등 기질적 혈관 이상으로 인해 출혈이 유발될 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15 text-xs text-rose-200/80">
                  💡 철저한 혈압 안정화와 뇌압 조절, 필요 시 즉각적인 외과적 감압 수술이 요구됩니다.
                </div>
              </div>
            </Gem_ScrollReveal>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          치료 방법 및 골든타임 관리
          - 화이트 배경 & 1400px 와이드 인포그래픽
      ------------------------------------------------------------- */}
      <section className="w-full py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          
          <Gem_ScrollReveal direction="up" delay={0.05}>
            <div className="text-center max-w-4xl mx-auto mb-20">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-900 text-sm font-semibold tracking-wide border border-blue-200 mb-4">
                <Clock className="w-4 h-4 text-blue-700" />
                GOLDEN TIME & TREATMENT
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111111] leading-tight mb-6">
                치료 방법과 촌각을 다투는 골든타임
              </h2>
              <p className="text-lg sm:text-xl text-[#555555] font-normal leading-relaxed break-keep">
                뇌세포는 단 몇 분만 혈류가 중단되어도 영구적으로 파괴됩니다.
                <br className="hidden sm:inline" />
                증상이 나타나면 자체적으로 약을 복용하거나 시간을 지체하지 말고 즉시 전문 치료 기관으로 이동해야 합니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 급성기 골든타임 3대 치료 체계 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* 혈전 용해제 */}
            <Gem_ScrollReveal direction="up" delay={0.1}>
              <div className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-slate-200 h-full flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-lg bg-blue-600 text-white font-mono text-xs font-bold mb-4">
                    골든타임: 4시간 30분 이내
                  </div>
                  <h4 className="text-2xl font-bold text-[#111111] mb-3">정맥 내 혈전 용해제 (tPA)</h4>
                  <p className="text-[#555555] text-base leading-relaxed break-keep">
                    증상 발생 후 4시간 30분 이내에 전문 병원에 도착하여 뇌출혈 여부를 배제한 뒤, 막힌 혈관 속 혈전을 녹이는 약물을 정맥으로 투여하여 뇌혈류를 재개통합니다.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-semibold text-blue-800">
                  시간이 빠를수록 신경학적 회복률 극대화
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 혈관 재개통 시술 */}
            <Gem_ScrollReveal direction="up" delay={0.15}>
              <div className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-slate-200 h-full flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#381E15] text-white font-mono text-xs font-bold mb-4">
                    골든타임: 6~24시간 이내
                  </div>
                  <h4 className="text-2xl font-bold text-[#111111] mb-3">동맥 내 혈전 제거술 (스텐트)</h4>
                  <p className="text-[#555555] text-base leading-relaxed break-keep">
                    굵은 뇌혈관이 막혀 약물로 녹이기 어려운 경우, 뇌혈관 조영 카테터와 미세 스텐트를 진입시켜 직접 혈전 덩어리를 물리적으로 끄집어내는 첨단 중재 시술입니다.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-semibold text-[#381E15]">
                  큰 뇌혈관 폐색 환자의 생존율과 후유장애 개선
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 뇌출혈 치료 및 조기 재활 */}
            <Gem_ScrollReveal direction="up" delay={0.2}>
              <div className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-slate-200 h-full flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-lg bg-rose-600 text-white font-mono text-xs font-bold mb-4">
                    급성기 안정 후 즉시 시작
                  </div>
                  <h4 className="text-2xl font-bold text-[#111111] mb-3">뇌압 조절 및 조기 재활</h4>
                  <p className="text-[#555555] text-base leading-relaxed break-keep">
                    뇌출혈 환자의 경우 혈압을 낮추고 뇌부종을 조절하며, 급성기 상태가 안정되면 대개 1주일 이내에 즉시 전문 신경재활 치료를 개시하여 후유증을 최소화합니다.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-semibold text-rose-800">
                  관절 마비 방지 및 일상생활 복귀 훈련
                </div>
              </div>
            </Gem_ScrollReveal>

          </div>

          {/* 진단 장비 정밀 안내 배너 */}
          <Gem_ScrollReveal direction="up" delay={0.1}>
            <div className="p-8 rounded-3xl bg-[#FBFBFD] border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#381E15] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-[#111111]">
                    신경과 전문의 정밀 검진 & 첨단 영상 장비
                  </h5>
                  <p className="text-sm text-[#666666] mt-1">
                    정확한 원인 진단을 위해서는 신경과 전문의의 진찰과 함께 <strong className="text-[#381E15]">MRI 정밀 촬영이 필요할 수 있습니다.</strong>
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

      {/* -------------------------------------------------------------
          뇌졸중의 예방과 재발 방지 관리
          - 1400px 와이드 그리드
          - 생활 습관 및 만성질환 관리 가이드
      ------------------------------------------------------------- */}
      <section className="w-full py-24 bg-[#FAFAFC]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          
          <Gem_ScrollReveal direction="up" delay={0.05}>
            <div className="text-center max-w-4xl mx-auto mb-20">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-sm font-semibold tracking-wide border border-emerald-200 mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                PREVENTION & SECONDARY CARE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111111] leading-tight mb-6">
                뇌졸중의 예방과 철저한 재발 방지 관리
              </h2>
              <p className="text-lg sm:text-xl text-[#555555] font-normal leading-relaxed break-keep">
                뇌졸중은 한 번 발병하면 재발할 위험이 매우 높습니다.
                <br className="hidden sm:inline" />
                기저 질환 관리와 올바른 생활 습관 개선을 통해 위험 요소를 사전에 철저히 차단해야 합니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 관리 수칙 카드 2대 축 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 위험 인자 조절 */}
            <Gem_ScrollReveal direction="up" delay={0.1}>
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#111111] mb-6 flex items-center gap-3">
                    <span className="w-3 h-7 bg-amber-700 rounded-full" />
                    핵심 위험 인자 정밀 조절
                  </h3>
                  <div className="space-y-6 text-[#444444] text-base leading-relaxed">
                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <h4 className="font-bold text-lg text-[#111111] mb-1">엄격한 혈압 관리</h4>
                      <p className="text-sm text-[#666666]">
                        일반 성인은 140/90 mmHg 미만 유지가 기본이며, 당뇨병이나 만성 신장 질환을 동반한 경우 130/80 mmHg 미만을 목표로 철저히 강압합니다.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <h4 className="font-bold text-lg text-[#111111] mb-1">혈당 및 콜레스테롤 조절</h4>
                      <p className="text-sm text-[#666666]">
                        공복 혈당과 당화혈색소를 안정적으로 유지하고, 뇌혈관에 기름때를 만드는 나쁜 콜레스테롤(LDL)을 100 mg/dL 이하(고위험군은 70 mg/dL 이하)로 집중 관리합니다.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <h4 className="font-bold text-lg text-[#111111] mb-1">처방 약물 꾸준한 복용</h4>
                      <p className="text-sm text-[#666666]">
                        항혈소판제(아스피린 등)나 혈압약을 임의로 중단하면 혈전이 급격히 발생해 재발 위험이 치솟으므로 반드시 전문의 처방에 따라 꾸준히 복용해야 합니다.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-500">
                  정기적인 혈액 검사와 경동맥 초음파 검진이 동반되어야 합니다.
                </div>
              </div>
            </Gem_ScrollReveal>

            {/* 생활 습관 수칙 */}
            <Gem_ScrollReveal direction="up" delay={0.15}>
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#111111] mb-6 flex items-center gap-3">
                    <span className="w-3 h-7 bg-emerald-700 rounded-full" />
                    일상 속 4대 건강 생활 수칙
                  </h3>
                  <div className="space-y-6 text-[#444444] text-base leading-relaxed">
                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <h4 className="font-bold text-lg text-[#111111] mb-1">금연 및 강력한 절주</h4>
                      <p className="text-sm text-[#666666]">
                        담배는 뇌졸중 발병 위험도를 2배 이상 끌어올리므로 무조건 금연해야 하며, 술은 혈압을 급상승시키므로 하루 1~2잔 이하로 제한하거나 금주합니다.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <h4 className="font-bold text-lg text-[#111111] mb-1">저염식 식단 및 영양 균형</h4>
                      <p className="text-sm text-[#666666]">
                        소금 섭취를 대폭 줄여 싱겁게 먹는 습관을 들이고, 혈관 청소부 역할을 하는 신선한 채소, 해조류, 등푸른 생선, 통곡물을 골고루 섭취합니다.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <h4 className="font-bold text-lg text-[#111111] mb-1">규칙적인 유산소 운동</h4>
                      <p className="text-sm text-[#666666]">
                        하루 30분 이상, 일주일에 4~5회 땀이 약간 날 정도의 빠르게 걷기, 수영, 자전거 등 유산소 운동을 통해 혈관 탄력성을 강화합니다.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-500">
                  갑작스러운 추위 노출이나 무리한 근력 운동은 뇌혈관 압력을 높이므로 주의합니다.
                </div>
              </div>
            </Gem_ScrollReveal>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          최하단 CTA 배너
          - 배경: 단색 오션 네이비 (#08395d)
          - 가로폭: 1400px 와이드 컨테이너
          - 버튼 줄바꿈 방지: whitespace-nowrap 및 shrink-0 적용
      ------------------------------------------------------------- */}
      <section className="w-full py-16 bg-[#08395d] text-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <Gem_ScrollReveal direction="right" delay={0.05}>
            <div>
              <span className="text-blue-200 text-sm font-bold tracking-wider uppercase mb-1 block">
                STROKE CARE & SECONDARY PREVENTION
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold">
                뇌혈관 건강, 정밀 검진으로 미리 지켜내세요
              </h3>
              <p className="text-slate-200 mt-2 text-base">
                신경과 전문의 1:1 맞춤 진단과 위험 인자 집중 케어 솔루션을 신속하게 안내해 드립니다.
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
