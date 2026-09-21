"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  HelpCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserCheck,
  Zap,
  Smartphone,
  Layers,
  BedDouble,
  Car
} from "lucide-react";
import Gem_SubPageHeader, { SubPageTabItem } from "./Gem_SubPageHeader";
import Gem_ScrollReveal from "./Gem_ScrollReveal";

/**
 * ==============================================================================
 * [The LSK] 척추클리닉 > 목디스크 롱스크롤 상세 페이지 (Gem_CervicalDiscPage.tsx)
 * ==============================================================================
 * 기획 & 감수: 강수진 실장 (PM), 정재이 과장 (UI/UX), 고윤기 대리 (Lead Engineer)
 * 
 * [대표님 피드백 반영 사항]
 *  1. [섹션 02 자가진단 체크리스트]:
 *     - 기존 좁았던 max-w-4xl 제한을 과감히 해제하고 1400px 풀 컨테이너 폭으로 확장!
 *     - 좌측 7열(5개 문항 카드) + 우측 5열(실시간 진단 반응형 카드 & 예약 버튼) 
 *       와이드 2단 인터랙션 그리드로 재배치하여 광활한 개방감과 즉각적인 시각 피드백 제공
 *  2. [섹션 04 전담 전문의 & 진료 시스템]:
 *     - 기존 max-w-5xl 제한을 해제하고 1400px 풀 와이드 그리드로 웅장하게 전개
 *     - 좌측 대표원장 프로필 카드와 우측 패스트패스 예약 카드가 대화면을 꽉 채우도록 개선
 * ==============================================================================
 */

// 목·경추 질환 형제 메뉴 탭 목록 (navigationData.ts의 척추클리닉과 100% 동기화)
const SPINE_CERVICAL_TABS: SubPageTabItem[] = [
  { name: "목디스크", href: "/spine/cervical-disc" },
  { name: "거북목 증후군", href: "/spine/turtle-neck" },
  { name: "일자목증후군", href: "/spine/straight-neck" },
  { name: "경추 척추관협착증", href: "/spine/cervical-stenosis" },
  { name: "근막통증증후군", href: "/spine/myofascial-pain" },
];

// 자가진단 문항 리스트
const SELF_DIAGNOSIS_QUESTIONS = [
  "목 뒤쪽이 뻐근하고 어깨, 날개뼈(견갑골) 안쪽까지 쑤시는 통증이 있다.",
  "팔부터 시작해 손가락 끝까지 저리고 찌릿찌릿한 방사통이 느껴진다.",
  "고개를 뒤로 젖히거나 아픈 쪽으로 돌릴 때 통증이 급격히 심해진다.",
  "손에 힘이 빠져 젓가락질, 단추 잠그기, 글씨 쓰기가 어색하거나 힘들다.",
  "목 통증과 함께 원인 모를 두통, 어지럼증, 안구 통증이 동반된다.",
];

// 치료 단계 탭 데이터
const TREATMENT_STAGES = [
  {
    step: "STEP 01",
    name: "보존적 맞춤치료",
    tag: "초기 환자 80% 적용",
    subtitle: "수술 없이 통증의 근본 원인을 가라앉히는 기초 치료",
    items: [
      { title: "1:1 도수 재활치료", desc: "전문 치료사가 틀어진 경추 분절을 교정하고 경직된 심부 근육을 이완" },
      { title: "고강도 체외충격파(ESWT)", desc: "염증 부위에 충격파 에너지를 전달하여 혈류 공급 촉진 및 조직 재생" },
      { title: "척추 무중력 감압 견인치료", desc: "디스크 내부 압력을 음압으로 만들어 탈출된 수핵을 원위치로 유도" },
    ],
  },
  {
    step: "STEP 02",
    name: "특화 비수술 시술",
    tag: "비수술 집중 케어",
    subtitle: "전신마취나 절개 없이 당일 20분 내외로 신경 압박을 해결",
    items: [
      { title: "C-arm 선택적 신경차단술", desc: "초정밀 영상 장비로 통증을 유발하는 신경 가지에 소염 약물을 정밀 주입" },
      { title: "경막외 감압 신경성형술", desc: "1mm 초소형 카테터를 꼬리뼈나 목 뒤로 삽입해 유착을 박리하고 염증 제거" },
      { title: "고주파 수핵 감압술", desc: "미세 바늘을 디스크 내부에 넣어 고주파 열에너지로 디스크 볼륨을 수축 감압" },
    ],
  },
  {
    step: "STEP 03",
    name: "정밀 최소침습 수술",
    tag: "고난도 수술 케어",
    subtitle: "마비나 근력 저하 등 비수술 치료로 호전되지 않는 경우 최소 절개 수술",
    items: [
      { title: "미세현미경 디스크 제거술", desc: "최첨단 미세현미경으로 1.5cm 최소 절개하여 신경을 누르는 파열 디스크만 안전 제거" },
      { title: "경추 인공디스크 치환술", desc: "손상된 디스크를 완전히 제거하고 관절 기능을 영구 유지하는 인공 디스크 삽입" },
    ],
  },
];

export default function Gem_CervicalDiscPage() {
  // 1. 현재 활성화된 스크롤 섹션 ID (Scroll Spy)
  const [activeSection, setActiveSection] = useState("overview");

  // 2. 자가진단 체크 상태 (0~4번 인덱스 체크 여부)
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false, false]);

  // 3. 치료 단계 선택 탭 (0: 보존, 1: 비수술, 2: 수술)
  const [selectedTreatmentTab, setSelectedTreatmentTab] = useState(0);

  // 체크박스 토글 핸들러
  const handleToggleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  // 체크된 총 개수 계산
  const checkedCount = checkedItems.filter(Boolean).length;

  // 체크 개수에 따른 진단 결과 텍스트 & 색상
  const getDiagnosisResult = () => {
    if (checkedCount === 0) {
      return {
        level: "건강한 상태",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        message: "현재 목디스크 관련 증상이 경미합니다. 올바른 스트레칭과 바른 자세를 유지하세요.",
        badge: "정상 범위",
      };
    } else if (checkedCount <= 2) {
      return {
        level: "주의 단계 (초기 경추 이상)",
        color: "text-amber-700 bg-amber-50 border-amber-200",
        message: "경추부 근육 경직 또는 초기 디스크 팽윤이 의심됩니다. 전문의 진료 및 도수 치료를 권장합니다.",
        badge: "초기 관리 필요",
      };
    } else {
      return {
        level: "정밀 검진 필요 (목디스크 의심)",
        color: "text-rose-700 bg-rose-50 border-rose-200",
        message: "신경 압박 증세가 뚜렷합니다. 신경 손상 예방을 위해 빠른 시일 내 3.0T MRI 정밀 검진을 권장합니다.",
        badge: "정밀 MRI 권장",
      };
    }
  };

  const diagnosisResult = getDiagnosisResult();

  // 목차 클릭 시 부드러운 스크롤 이동
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // 상단 스티키 바 높이(약 80px)를 고려한 오프셋 스크롤
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // 스크롤 시 현재 보고 있는 섹션 감지 (Scroll Spy 로직)
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["overview", "self-check", "treatment", "specialist"];
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-white text-slate-800">
      {/* 1. 서브페이지 공통 헤더 (볼륨 150% 확장 + 우측 카피 + 3D 경추 홀로그램 엠블럼) */}
      <Gem_SubPageHeader
        categoryTitle="척추클리닉"
        categorySubTitle="SPINE & CERVICAL CARE CENTER"
        description={"지긋지긋한 목·어깨 통증과 팔 저림,\n원인부터 비수술 우선 원칙으로\n정확하게 치료합니다."}
        currentHref="/spine/cervical-disc"
        breadcrumbs={[
          { label: "척추클리닉", href: "/spine" },
          { label: "목·경추 질환", href: "/spine" },
          { label: "목디스크", href: "/spine/cervical-disc" },
        ]}
        tabItems={SPINE_CERVICAL_TABS}
        rightGraphicSrc="/images/spine_cervical_icon.jpg"
      />

      {/* 2. 스티키 인-페이지 목차 앵커 바 (Sticky Scroll Spy Navigator) */}
      <div className="sticky top-[64px] z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-200">
        <div className="Gem_Container">
          <nav className="flex items-center justify-between overflow-x-auto no-scrollbar py-2.5">
            <div className="flex items-center gap-1 sm:gap-2 min-w-max">
              {[
                { id: "overview", label: "01 질환 및 발병원인" },
                { id: "self-check", label: "02 증상 자가진단" },
                { id: "treatment", label: "03 단계별 맞춤치료" },
                { id: "specialist", label: "04 전담 의료진 & 예약" },
              ].map((menu) => {
                const isCurrent = activeSection === menu.id;
                return (
                  <button
                    key={menu.id}
                    onClick={() => scrollToSection(menu.id)}
                    className={`px-3.5 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
                      isCurrent
                        ? "bg-gem-primaryDark text-white shadow-sm"
                        : "text-slate-600 hover:text-gem-primary hover:bg-slate-100"
                    }`}
                  >
                    {menu.label}
                  </button>
                );
              })}
            </div>

            {/* 우측 전화 간편 연결 (PC 전용) */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-500">
              <PhoneCall className="w-3.5 h-3.5 text-gem-primary" />
              <span>척추센터 직통문의:</span>
              <strong className="text-gem-primary text-sm font-extrabold">032-123-4567</strong>
            </div>
          </nav>
        </div>
      </div>

      {/* 3. [섹션 1] 질환 및 발병원인 (Overview & Causes) */}
      <section id="overview" className="py-20 lg:py-24 bg-white border-b border-slate-100 scroll-mt-28">
        <div className="Gem_Container">
          {/* 섹션 헤더 */}
          <Gem_ScrollReveal direction="up" delay={0.1}>
            <div className="max-w-3xl mb-14">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-gem-primary border border-blue-100 uppercase tracking-wider mb-3">
                <Activity className="w-3.5 h-3.5" />
                Cervical Disc Herniation
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-gem-primaryDark tracking-tight leading-tight">
                목디스크(경추 추간판 탈출증), <br />
                <span className="Gem_TextGradient">단순 근육통과 어떻게 다를까요?</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                경추 뼈와 뼈 사이에서 충격을 흡수해 주는 디스크(추간판)가 잘못된 자세나 퇴행성 변화로 인해 
                원래 자리를 탈출하여, 목을 지나 어깨와 팔, 손가락으로 내려가는 <strong>신경 다발을 압박</strong>하면서 
                심한 방사통과 저림을 유발하는 대표적인 척추 질환입니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 인포그래픽 & 질환 메커니즘 2단 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
            {/* 좌측: 3D 해부학 비주얼 일러스트 카드 */}
            <div className="lg:col-span-6">
              <Gem_ScrollReveal direction="right" delay={0.2}>
                <div className="relative rounded-3xl overflow-hidden shadow-gem-floating border border-slate-200 bg-slate-950 p-6 sm:p-8">
                  <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-6">
                    <Image
                      src="/images/spine_cervical_icon.jpg"
                      alt="경추 신경 및 디스크 탈출 해부도"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  </div>

                  {/* 일러스트 하단 포인트 설명 */}
                  <div className="space-y-3 text-slate-300 text-xs sm:text-sm">
                    <div className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#00A8B5] mt-1.5 flex-shrink-0" />
                      <p><strong className="text-white font-semibold">C5-C6, C6-C7 신경 압박:</strong> 목디스크의 약 90% 이상이 움직임이 가장 많은 경추 5~7번 사이에서 발생합니다.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#00A8B5] mt-1.5 flex-shrink-0" />
                      <p><strong className="text-white font-semibold">팔과 손가락 방사통:</strong> 목 자체보다 어깨 결림, 팔 저림, 손가락 마비 증상으로 먼저 자각하는 경우가 많습니다.</p>
                    </div>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측: 4대 주요 발병 원인 카드 그리드 */}
            <div className="lg:col-span-6">
              <Gem_ScrollReveal direction="left" delay={0.3}>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-gem-primary" />
                  현대인의 목을 위협하는 4대 주요 원인
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 원인 1 */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-gem-primary transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-gem-primary flex items-center justify-center mb-3 group-hover:bg-gem-primary group-hover:text-white transition-colors">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">스마트폰 & 모니터 과사용</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      고개를 15도 숙일 때마다 목에 가해지는 하중이 최대 27kg까지 증가하여 디스크가 손상됩니다.
                    </p>
                  </div>

                  {/* 원인 2 */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-gem-primary transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-gem-secondary flex items-center justify-center mb-3 group-hover:bg-gem-secondary group-hover:text-white transition-colors">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">경추 퇴행성 수핵 건조</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      나이가 들면서 수핵의 수분이 감소하고 탄력을 잃어 가벼운 일상 충격에도 쉽게 파열됩니다.
                    </p>
                  </div>

                  {/* 원인 3 */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-gem-primary transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <BedDouble className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">높은 베개 & 수면 자세</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      체형에 맞지 않는 높은 베개나 엎드려 자는 습관은 밤새 경추 곡선을 무너뜨립니다.
                    </p>
                  </div>

                  {/* 원인 4 */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-gem-primary transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                      <Car className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">외상 및 교통사고 충격</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      차량 추돌 시 목이 앞뒤로 심하게 꺾이는 편타성 손상으로 급성 디스크 탈출이 발생합니다.
                    </p>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. [섹션 2] 환자 참여형 실시간 자가진단 체크리스트 (1400px 풀와이드 2단 인터랙션) */}
      <section id="self-check" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200 scroll-mt-28">
        <div className="Gem_Container">
          {/* 섹션 인트로 */}
          <Gem_ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-gem-primary border border-blue-200 shadow-sm uppercase tracking-wider mb-3">
                <HelpCircle className="w-4 h-4 text-[#00A8B5]" />
                Self Diagnosis Interactive Check
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-gem-primaryDark tracking-tight">
                나도 혹시 목디스크일까? <br className="hidden sm:inline" />
                <span className="Gem_TextGradient">1분 자가진단 체크리스트</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3">
                아래 항목 중 현재 겪고 계신 증상을 클릭하여 체크해 보세요. 우측 결과 창에서 실시간 진단 피드백을 제공합니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 1400px 제한 폭을 과감하게 채우는 와이드 2단 인터랙션 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 좌측 (7열): 5대 자가진단 문항 와이드 카드 리스트 */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <Gem_ScrollReveal direction="right" delay={0.2} className="h-full flex flex-col justify-between">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-gem-soft h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-gem-primary" />
                      주요 자각 증상 항목 선택
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-gem-primary">
                      해당 증상 클릭
                    </span>
                  </div>

                  {/* 문항 목록 */}
                  <div className="space-y-3 flex-1 flex flex-col justify-center">
                    {SELF_DIAGNOSIS_QUESTIONS.map((q, idx) => {
                      const isChecked = checkedItems[idx];
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleToggleCheck(idx)}
                          className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                            isChecked
                              ? "bg-blue-50/80 border-gem-primary shadow-sm"
                              : "bg-slate-50/60 border-slate-200/80 hover:bg-slate-100/80"
                          }`}
                        >
                          {/* 커스텀 체크박스 아이콘 */}
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                              isChecked
                                ? "bg-gem-primary text-white"
                                : "border-2 border-slate-300 bg-white"
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-4 h-4" />}
                          </div>

                          {/* 문항 텍스트 */}
                          <div className="flex-1 text-sm sm:text-base font-medium text-slate-800 leading-snug">
                            <span className="font-bold text-gem-primary mr-2">Q{idx + 1}.</span>
                            {q}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-slate-100 text-center sm:text-left">
                    * 본 자가진단은 참고용이며, 정확한 진단을 위해서는 전문의와의 1:1 진료 및 영상 검사가 필요합니다.
                  </p>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측 (5열): 실시간 동적 반응 진단 분석 & 전문의 예약 유도 카드 */}
            <div className="lg:col-span-5 flex flex-col">
              <Gem_ScrollReveal direction="left" delay={0.3} className="h-full flex flex-col">
                <div className={`rounded-3xl p-8 border shadow-gem-floating h-full flex flex-col justify-between transition-all duration-300 ${diagnosisResult.color}`}>
                  <div>
                    {/* 상단 뱃지 */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-white/90 border uppercase tracking-wider">
                        {diagnosisResult.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-full border">
                        총 <strong className="text-gem-primary">{checkedCount}</strong> / 5개 선택됨
                      </span>
                    </div>

                    {/* 실시간 진단 레벨 타이틀 */}
                    <span className="text-xs font-bold tracking-widest uppercase opacity-80 block mb-1">
                      DIAGNOSIS FEEDBACK
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">
                      {diagnosisResult.level}
                    </h3>
                    
                    <p className="text-sm sm:text-base font-medium leading-relaxed mb-8 bg-white/60 p-5 rounded-2xl border border-black/5">
                      {diagnosisResult.message}
                    </p>

                    {/* 권장 진료 프로세스 안내 */}
                    <div className="space-y-3 pt-6 border-t border-black/10">
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-gem-primary" />
                        <span>당일 3.0T 정밀 MRI 촬영 및 판독 지원</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-gem-primary" />
                        <span>수술 없는 1:1 맞춤 비수술 시술 우선 적용</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-gem-primary" />
                        <span>전담 도수치료사 및 재활 물리치료 연계</span>
                      </div>
                    </div>
                  </div>

                  {/* 하단 예약 점프 액션 */}
                  <div className="mt-8 pt-6 border-t border-black/10 flex flex-col gap-3">
                    <button
                      onClick={() => scrollToSection("specialist")}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gem-primary hover:bg-gem-primaryHover text-white font-black text-sm sm:text-base shadow-lg transition-all"
                    >
                      <span>척추 전문의 정밀 상담 예약하기</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <a
                      href="tel:032-123-4567"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/80 hover:bg-white text-slate-800 font-bold text-xs sm:text-sm border border-black/5 transition-colors"
                    >
                      <PhoneCall className="w-4 h-4 text-gem-primary" />
                      <span>전화 간편 상담: 032-123-4567</span>
                    </a>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. [섹션 3] 하이병원 3단계 맞춤 치료 솔루션 (Treatment Stages) */}
      <section id="treatment" className="py-20 lg:py-28 bg-white border-b border-slate-200 scroll-mt-28">
        <div className="Gem_Container">
          <Gem_ScrollReveal direction="up" delay={0.1}>
            <div className="max-w-3xl mb-12">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-gem-secondary border border-teal-100 uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Non-Surgical First Solution
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-gem-primaryDark tracking-tight leading-tight">
                무조건적인 수술 권유는 없습니다. <br />
                <span className="Gem_TextGradient">단계별 1:1 맞춤 치료 프로세스</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                인천하이병원 척추센터는 <strong>비수술 우선 원칙</strong>에 따라, 
                전체 환자의 90% 이상을 비수술적 요법과 정밀 타겟 시술로 안전하게 회복시킵니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 3단계 탭 스위치 버튼 바 */}
          <Gem_ScrollReveal direction="up" delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
              {TREATMENT_STAGES.map((stage, idx) => {
                const isSelected = selectedTreatmentTab === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedTreatmentTab(idx)}
                    className={`p-5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? "bg-gradient-to-br from-gem-primaryDark to-gem-primary text-white border-gem-primary shadow-gem-hover scale-[1.02]"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md ${
                        isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                      }`}>
                        {stage.step}
                      </span>
                      <span className={`text-xs font-bold ${isSelected ? "text-[#00A8B5]" : "text-gem-primary"}`}>
                        {stage.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-black tracking-tight">{stage.name}</h3>
                  </button>
                );
              })}
            </div>
          </Gem_ScrollReveal>

          {/* 선택된 단계 세부 치료법 카드 3열 그리드 */}
          <Gem_ScrollReveal direction="up" delay={0.3}>
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200">
              <div className="mb-8">
                <span className="text-xs font-bold text-gem-primary tracking-widest uppercase block mb-1">
                  {TREATMENT_STAGES[selectedTreatmentTab].step} DETAIL
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {TREATMENT_STAGES[selectedTreatmentTab].name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {TREATMENT_STAGES[selectedTreatmentTab].subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TREATMENT_STAGES[selectedTreatmentTab].items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-gem-primary transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-gem-primary flex items-center justify-center mb-4 font-black text-sm">
                        0{idx + 1}
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-gem-primary">
                      <Zap className="w-3.5 h-3.5 text-[#00A8B5]" />
                      <span>맞춤 시술 가능</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Gem_ScrollReveal>
        </div>
      </section>

      {/* 6. [섹션 4] 척추 전담 의료진 & 당일 One-Stop 예약 CTA (1400px 풀와이드 그리드 적용) */}
      <section id="specialist" className="py-20 lg:py-28 bg-slate-900 text-white scroll-mt-28 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gem-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="Gem_Container relative z-10">
          <Gem_ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-widest text-[#00A8B5] uppercase block mb-2">
                SPINE SPECIALIST TEAM
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                척추센터 전담 전문의가 <br />
                직접 진단하고 치료합니다
              </h2>
              <p className="text-sm sm:text-base text-blue-200/80 mt-3 font-light">
                첨단 3.0T MRI 당일 검사 및 판독 시스템으로 방문 당일 원스톱 치료 계획을 세워드립니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 1400px 제한 폭을 과감하게 채우는 전담의 & 예약 상담 2단 와이드 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* 좌측: 대표원장 / 척추 전문의 와이드 프로필 카드 (5열) */}
            <div className="lg:col-span-5 flex flex-col">
              <Gem_ScrollReveal direction="right" delay={0.2} className="h-full">
                <div className="bg-slate-800 rounded-3xl p-7 sm:p-8 border border-slate-700 shadow-2xl h-full flex flex-col justify-between">
                  <div>
                    <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden mb-6 group">
                      <Image
                        src="/images/director_portrait.jpg"
                        alt="척추 전담 대표원장"
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-xs text-blue-200 font-medium">정형외과 전문의</span>
                        <h4 className="text-xl font-bold text-white">인천하이병원 대표원장</h4>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">인천하이병원 척추센터</h3>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gem-primary text-white font-bold">
                        대표원장 전담진료
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      수천 례 이상의 고난도 척추 수술 및 비수술 시술 경험을 보유한 전문의가 
                      환자의 개별 증상과 척추 배열을 분석하여 1:1 맞춤 케어를 실천합니다.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-700 flex items-center justify-between text-xs sm:text-sm text-slate-400">
                    <span>진료 요일: 월, 수, 금 (종일)</span>
                    <Link href="/about/doctors" className="text-[#00A8B5] font-bold hover:underline">
                      전문의 약력 전체보기 →
                    </Link>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측: 1:1 온라인 예약 및 원스톱 전화 상담 패스트패스 카드 (7열) */}
            <div className="lg:col-span-7 flex flex-col">
              <Gem_ScrollReveal direction="left" delay={0.3} className="h-full">
                <div className="bg-gradient-to-br from-gem-primaryDark via-[#082974] to-[#0052CC] rounded-3xl p-8 sm:p-12 border border-blue-400/30 shadow-2xl text-white h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#00A8B5] tracking-widest uppercase mb-3">
                      <Sparkles className="w-4 h-4" />
                      FAST PASS RESERVATION SYSTEM
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-black mb-4 leading-tight">
                      기다림 없는 빠른 진료, <br />
                      지금 바로 상담 예약하세요
                    </h3>
                    <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed mb-10 max-w-2xl">
                      목 통증과 어깨 결림, 손 저림으로 일상이 불편하시다면 망설이지 마세요. 
                      전문 상담 간호사가 환자분의 증상을 세심하게 확인하고 가장 빠른 척추 전문의 진료 일정을 연결해 드립니다.
                    </p>

                    {/* 3대 원스톱 혜택 리스트 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
                        <div className="text-[#00A8B5] font-black text-lg mb-1">01. 당일 검사</div>
                        <p className="text-xs text-blue-100">첨단 3.0T MRI 당일 신속 검사</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
                        <div className="text-[#00A8B5] font-black text-lg mb-1">02. 맞춤 판독</div>
                        <p className="text-xs text-blue-100">영상의학과 & 척추전문의 협진</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
                        <div className="text-[#00A8B5] font-black text-lg mb-1">03. 당일 시술</div>
                        <p className="text-xs text-blue-100">비수술 주사 및 시술 당일 가능</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* 전화 예약 버튼 */}
                    <a
                      href="tel:032-123-4567"
                      className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-white text-gem-primaryDark hover:bg-blue-50 font-black text-base sm:text-lg transition-colors shadow-xl"
                    >
                      <PhoneCall className="w-5 h-5 text-gem-primary" />
                      <span>전화 상담 예약: 032-123-4567</span>
                    </a>

                    {/* 온라인 1:1 예약 바로가기 */}
                    <Link
                      href="/community/inquiry"
                      className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-blue-900/60 hover:bg-blue-900 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
                    >
                      <span>온라인 1:1 전문의 상담 남기기</span>
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
