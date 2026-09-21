"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  Award,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  HeartHandshake,
  HelpCircle,
  Microscope,
  PhoneCall,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  User,
  Zap,
  Weight,
  Smartphone,
  Flame,
  Layers,
  ArrowRight,
  Eye,
  Crosshair
} from "lucide-react";
import Gem_SubPageHeader, { SubPageTabItem } from "./Gem_SubPageHeader";
import Gem_ScrollReveal from "./Gem_ScrollReveal";

/**
 * ==============================================================================
 * [The LSK] 척추클리닉 메인 원스크롤 종합 허브 페이지 (3-Test2 - 정재이 과장 리디자인)
 * (Gem_SpineCenterOneScrollPage.tsx)
 * ==============================================================================
 * 기획 & 감수: 강수진 실장 (PM), 정재이 과장 (UI/UX), 고윤기 대리 (Lead Engineer)
 * 
 * [정재이 과장의 '탈-화이트박스' 하이엔드 글래스모피즘 리디자인]
 *  1. 6대 질환 브릿지 섹션 전면 개편:
 *     - 기존의 밋밋한 흰색 텍스트 상자를 완전히 걷어내고,
 *       실제 3D 메디컬 홀로그램 아트워크 썸네일과 다크 글래스모피즘 카드로 재탄생!
 *  2. 마우스 호버 3D 입체 부유 효과 & 네온 펄스 라이트 테두리
 *  3. 지루한 줄글 대신 3대 직관적 '인포그래픽 메트릭스 태그'([호발부위], [핵심증상], [비수술율 90%]) 탑재
 *  4. 3-Test1(목디스크) 페이지와의 강력하고 매끄러운 딥링크 액션
 * ==============================================================================
 */

// 척추클리닉 형제 탭 메뉴
const SPINE_TABS: SubPageTabItem[] = [
  { name: "척추센터 종합(3-Test2)", href: "/spine" },
  { name: "목디스크(3-Test1)", href: "/spine/cervical-disc", badge: "특화" },
  { name: "거북목·일자목", href: "/spine/turtle-neck" },
  { name: "허리디스크", href: "/spine/lumbar-disc" },
  { name: "척추관협착증", href: "/spine/lumbar-stenosis" },
  { name: "비수술클리닉", href: "/spine/non-surgery/decompression-neuroplasty" },
];

// 섹션 1 자동 슬라이드 캐러셀 데이터
const HERO_SLIDES = [
  {
    badge: "STATISTICS 01",
    title: "국내 입원 원인 1위, 바로 '척추질환'입니다",
    highlight: "연간 1,224만 명 진료",
    desc: "대한민국 국민 4명 중 1명은 척추 질환으로 일상의 고통을 겪고 있습니다. 참을수록 치료 기간은 길어집니다.",
    image: "/images/spine_consultation_scene.jpg",
    alt: "친절한 척추 전문의 진료 상담 장면",
  },
  {
    badge: "STATISTICS 02",
    title: "비수술 우선 원칙, 90% 이상은 수술 없이 호전",
    highlight: "절개 없는 당일 시술",
    desc: "인천하이병원은 불필요한 과잉 수술을 지양하고, 고주파 수핵감압술과 신경성형술로 근본 원인을 먼저 치료합니다.",
    image: "/images/spine_cervical_icon.jpg",
    alt: "정밀 경추 신경 3D 해부도",
  },
];

// 6대 척추 질환 정밀 데이터 (3D 비주얼 아트워크 & 인포그래픽 메트릭스 탑재)
const SPINE_DISEASES = [
  {
    id: "cervical-disc",
    name: "목디스크",
    sub: "경추 추간판 탈출증",
    desc: "목 뼈 사이 디스크 수핵이 탈출하여 어깨와 팔, 손가락 끝으로 이어지는 신경 다발을 강하게 압박하는 질환입니다.",
    image: "/images/spine_cervical_icon.jpg",
    glowColor: "group-hover:border-cyan-400/80 group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.35)]",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
    metrics: [
      { label: "호발 부위", val: "경추 C5~C7번" },
      { label: "대표 증상", val: "어깨통증·손저림" },
      { label: "치료 방향", val: "비수술 우선 (90%)" },
    ],
    tag: "3-Test1 상세페이지 연계",
    href: "/spine/cervical-disc",
    isMasterTest: true,
  },
  {
    id: "lumbar-disc",
    name: "허리디스크",
    sub: "요추 추간판 탈출증",
    desc: "허리를 숙이거나 앉아 있을 때 요추 디스크가 뒤로 밀려나 엉덩이부터 다리, 발가락까지 극심한 방사통을 유발합니다.",
    image: "/images/spine_lumbar_icon.jpg",
    glowColor: "group-hover:border-blue-400/80 group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.35)]",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/40",
    metrics: [
      { label: "호발 부위", val: "요추 L4~L5번" },
      { label: "대표 증상", val: "요통·다리당김" },
      { label: "치료 방향", val: "고주파 수핵감압" },
    ],
    tag: "비수술 집중 시술",
    href: "/spine/lumbar-disc",
    isMasterTest: false,
  },
  {
    id: "lumbar-stenosis",
    name: "척추관협착증",
    sub: "신경통로 협착 및 퇴행",
    desc: "노화로 인해 신경이 지나가는 척추관이 좁아져, 조금만 걸어도 다리가 터질 듯 아파 쪼그려 앉아야 하는 대표 노인성 질환입니다.",
    image: "/images/spine_lumbar_icon.jpg",
    glowColor: "group-hover:border-teal-400/80 group-hover:shadow-[0_0_30px_-5px_rgba(20,184,166,0.35)]",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-400/40",
    metrics: [
      { label: "호발 연령", val: "50대 이상 중장년" },
      { label: "대표 증상", val: "보행 시 다리저림" },
      { label: "치료 방향", val: "경막외 신경성형술" },
    ],
    tag: "중장년 대표 질환",
    href: "/spine/lumbar-stenosis",
    isMasterTest: false,
  },
  {
    id: "turtle-neck",
    name: "거북목·일자목",
    sub: "경추 정렬 불균형 증후군",
    desc: "스마트폰과 PC 사용으로 정상적인 C자형 경추 곡선이 일자로 굳어져 목덜미 경직과 만성 긴장성 두통을 유발합니다.",
    image: "/images/spine_cervical_icon.jpg",
    glowColor: "group-hover:border-amber-400/80 group-hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.35)]",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/40",
    metrics: [
      { label: "호발 계층", val: "직장인·학생 80%" },
      { label: "대표 증상", val: "목어깨결림·두통" },
      { label: "치료 방향", val: "1:1 도수 체형교정" },
    ],
    tag: "체형 교정 클리닉",
    href: "/spine/turtle-neck",
    isMasterTest: false,
  },
  {
    id: "compression-fracture",
    name: "척추 압박골절",
    sub: "골다공증성 척추체 골절",
    desc: "골밀도가 낮은 고령층에서 가벼운 엉덩방아나 기침 충격만으로도 척추 뼈가 깡통처럼 찌그러지며 극심한 통증이 발생합니다.",
    image: "/images/spine_lumbar_icon.jpg",
    glowColor: "group-hover:border-rose-400/80 group-hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.35)]",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-400/40",
    metrics: [
      { label: "발생 원인", val: "골다공증·낙상충격" },
      { label: "대표 증상", val: "자세변경 시 비명" },
      { label: "치료 방향", val: "골시멘트 척추성형" },
    ],
    tag: "당일 보행 회복",
    href: "/spine/compression-fracture",
    isMasterTest: false,
  },
  {
    id: "spondylolisthesis",
    name: "척추전방전위증",
    sub: "척추체 마디 미끄러짐",
    desc: "위 척추뼈가 아래 척추뼈보다 앞으로 밀려나가 척추 배열이 불안정해지고 척수 신경을 강하게 압박하는 질환입니다.",
    image: "/images/spine_lumbar_icon.jpg",
    glowColor: "group-hover:border-purple-400/80 group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.35)]",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-400/40",
    metrics: [
      { label: "진행 단계", val: "1기~4기 단계별" },
      { label: "대표 증상", val: "허리 뒤로젖힘 불가" },
      { label: "치료 방향", val: "미세인대재건·고정" },
    ],
    tag: "정밀 척추 정렬",
    href: "/spine/spondylolisthesis",
    isMasterTest: false,
  },
];

// 섹션 3 10단계 정밀 진단 프로세스 항목
const DIAGNOSIS_10_STEPS = [
  { step: "01", name: "세심한 전문의 문진", desc: "통증 발생 시점, 직업 환경, 생활 습관 심층 파악" },
  { step: "02", name: "신경학적 이학적 검사", desc: "관절 가동 범위, 감각 저하 및 건반사 유발 검사" },
  { step: "03", name: "디지털 전척추 X-ray", desc: "척추 전체의 정렬 및 골반 틀어짐, 척추 불안정성 확인" },
  { step: "04", name: "최첨단 3.0T 정밀 MRI", desc: "신경 압박 정도, 디스크 수핵 파열 상태 초고해상도 판독" },
  { step: "05", name: "적외선 체열검사(DITI)", desc: "신경 손상으로 인한 혈류 장애 및 체열 비대칭 시각화" },
  { step: "06", name: "신경전도 및 근전도 검사", desc: "말초신경과 척추 신경근의 손상 부위 및 마비 심도 측정" },
  { step: "07", name: "골밀도 정밀검사(DEXA)", desc: "골다공증 및 압박골절 위험도 사전 스크리닝" },
  { step: "08", name: "영상의학과 전문의 교차판독", desc: "오진 없는 완벽한 원인 분석을 위한 협진 시스템" },
  { step: "09", name: "1:1 환자 맞춤 결과 브리핑", desc: "3D 모델과 X-ray 영상으로 환자가 쉽게 이해하도록 설명" },
  { step: "10", name: "최적 치료 솔루션 확정", desc: "비수술 우선 원칙에 따른 개인별 맞춤 치료 계획 수립" },
];

export default function Gem_SpineCenterOneScrollPage() {
  // 1. 섹션 1 캐러셀 슬라이드 인덱스 & 일시정지 상태
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 2. 간편 진료 예약 폼 상태값
  const [formState, setFormState] = useState({
    patientName: "",
    phoneNumber: "",
    symptomArea: "허리 통증 및 다리 저림",
    preferredDate: "",
    agreePrivacy: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 7초 자동 캐러셀 인터벌 (마우스 호버 시 일시 정지)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // 예약 폼 제출 핸들러
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.patientName || !formState.phoneNumber) {
      alert("성함과 연락처를 입력해 주세요.");
      return;
    }
    // 성공 인터랙션 피드백
    setIsSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-slate-800">
      {/* 1. 서브페이지 공통 헤더 (150% 볼륨 + 카피 + 3D 경추 엠블럼) */}
      <Gem_SubPageHeader
        categoryTitle="척추클리닉"
        categorySubTitle="SPINE TOTAL CARE CENTER"
        description={"수술 없는 척추 건강을 최우선으로,\n11인 전문의 협진과 당일 원스톱 정밀 진료로\n당신의 바른 일상을 되찾아 드립니다."}
        currentHref="/spine"
        breadcrumbs={[
          { label: "척추클리닉", href: "/spine" },
          { label: "척추센터 종합안내(3-Test2)", href: "/spine" },
        ]}
        tabItems={SPINE_TABS}
        rightGraphicSrc="/images/spine_cervical_icon.jpg"
      />

      {/* 2. [섹션 1] 도입부: 국내 입원 질환 1위 통계 & 7초 자동 캐러셀 히어로 */}
      <section 
        className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-[#071E54] text-white relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="Gem_Container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* 좌측 텍스트 & 통계 영역 (6열) */}
            <div className="lg:col-span-6">
              <Gem_ScrollReveal direction="up" delay={0.1}>
                {/* 상단 통계 뱃지 */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-[#00A8B5] border border-blue-400/30 text-xs font-black tracking-wider uppercase mb-6">
                  <TrendingUp className="w-4 h-4" />
                  {HERO_SLIDES[currentSlide].badge}
                </div>

                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                  {HERO_SLIDES[currentSlide].title}
                </h2>

                <div className="text-2xl sm:text-3xl font-extrabold text-[#00A8B5] mb-6 flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  <span>{HERO_SLIDES[currentSlide].highlight}</span>
                </div>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
                  {HERO_SLIDES[currentSlide].desc}
                </p>

                {/* 슬라이드 컨트롤러 (일시정지 표시 & 인디케이터) */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {HERO_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          currentSlide === idx ? "w-8 bg-[#00A8B5]" : "w-2.5 bg-slate-600 hover:bg-slate-400"
                        }`}
                        aria-label={`슬라이드 ${idx + 1}번으로 이동`}
                      />
                    ))}
                  </div>

                  <span className="text-xs text-slate-400 font-medium">
                    {isPaused ? "❚❚ 마우스 호버로 일시정지됨" : "▶ 7초 자동 롤링 중"}
                  </span>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측 슬라이드 비주얼 이미지 카드 (6열) */}
            <div className="lg:col-span-6">
              <Gem_ScrollReveal direction="left" delay={0.2}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800 aspect-[16/10] group">
                  <Image
                    src={HERO_SLIDES[currentSlide].image}
                    alt={HERO_SLIDES[currentSlide].alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                    <p className="text-xs sm:text-sm text-slate-200 font-medium">
                      인천하이병원 척추센터 전문의 1:1 환자 맞춤 진료 프로세스
                    </p>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. [섹션 2] 환자 공감 & 자가 증상 체크 (원인 4가지 + 주요 증상 카드) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="Gem_Container">
          <Gem_ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-gem-primary border border-blue-100 uppercase tracking-wider mb-3">
                <AlertCircle className="w-4 h-4 text-gem-primary" />
                Root Causes & Symptoms
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-gem-primaryDark tracking-tight">
                나의 척추는 왜 아플까요? <br />
                <span className="Gem_TextGradient">4대 발병 원인과 위험 증상 점검</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3">
                척추는 어느 날 갑자기 망가지지 않습니다. 사소한 일상의 무리가 누적되어 신호를 보냅니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 4대 발병 원인 와이드 카드 4열 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Gem_ScrollReveal direction="up" delay={0.15}>
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-gem-primary transition-all duration-200 h-full flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-gem-primary flex items-center justify-center mb-5 group-hover:bg-gem-primary group-hover:text-white transition-colors">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-gem-primary uppercase tracking-wider block mb-1">CAUSE 01</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">노화 및 수핵 퇴행</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    디스크 수분 함량이 80%에서 점차 감소하며 충격 흡수 탄력이 떨어져 미세 균열이 발생합니다.
                  </p>
                </div>
              </div>
            </Gem_ScrollReveal>

            <Gem_ScrollReveal direction="up" delay={0.2}>
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-gem-primary transition-all duration-200 h-full flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-gem-secondary flex items-center justify-center mb-5 group-hover:bg-gem-secondary group-hover:text-white transition-colors">
                    <Weight className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-gem-secondary uppercase tracking-wider block mb-1">CAUSE 02</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">비만 및 복부 하중</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    복부 비만은 무게중심을 앞으로 쏠리게 하여 허리 요추 4~5번에 정상 체중의 3배 이상 압력을 가합니다.
                  </p>
                </div>
              </div>
            </Gem_ScrollReveal>

            <Gem_ScrollReveal direction="up" delay={0.25}>
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-gem-primary transition-all duration-200 h-full flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider block mb-1">CAUSE 03</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">스마트폰 & 구부정한 자세</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    하루 8시간 이상 모니터를 보는 거북목 자세는 경추 뼈의 정상 C자 커브를 일자목으로 변형시킵니다.
                  </p>
                </div>
              </div>
            </Gem_ScrollReveal>

            <Gem_ScrollReveal direction="up" delay={0.3}>
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-gem-primary transition-all duration-200 h-full flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    <Flame className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-rose-600 uppercase tracking-wider block mb-1">CAUSE 04</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">외상 및 급격한 충격</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    교통사고 편타성 손상이나 무거운 물건을 들다 삐끗하는 급성 염좌가 디스크 파열로 직결됩니다.
                  </p>
                </div>
              </div>
            </Gem_ScrollReveal>
          </div>

          {/* 4대 핵심 의심 증상 띠 배너 */}
          <Gem_ScrollReveal direction="up" delay={0.35}>
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-[#071E54] to-slate-900 text-white shadow-xl border border-slate-700">
              <h4 className="text-lg sm:text-xl font-bold mb-6 text-center text-blue-200">
                ⚠️ 다음 증상 중 1개 이상 해당된다면 척추 정밀 검사가 시급합니다
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00A8B5] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">2주 이상 지속되는 통증</strong>
                    <span className="text-xs text-slate-300">휴식을 취해도 뻐근함이 가라앉지 않음</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00A8B5] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">팔·다리 저림 및 시림</strong>
                    <span className="text-xs text-slate-300">신경이 눌려 손끝/발끝까지 전기가 통하듯 저림</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00A8B5] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">내 피부 같지 않은 감각 이상</strong>
                    <span className="text-xs text-slate-300">만져도 둔탁하고 꼬집어도 아프지 않음</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00A8B5] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">엉덩이·날개뼈 방사통</strong>
                    <span className="text-xs text-slate-300">기침할 때 척추를 따라 찌르는 듯한 통증</span>
                  </div>
                </div>
              </div>
            </div>
          </Gem_ScrollReveal>
        </div>
      </section>

      {/* 4. ⭐ [정재이 과장 리디자인] 6대 척추 질환 3D 글래스모피즘 & 인터랙티브 쇼케이스 */}
      <section className="py-24 lg:py-32 bg-slate-950 text-white relative overflow-hidden">
        {/* 장식용 은은한 앰비언트 글로우 조명 */}
        <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="Gem_Container relative z-10">
          {/* 섹션 인트로 타이틀 */}
          <Gem_ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-black tracking-widest uppercase mb-4 shadow-sm">
                <Crosshair className="w-4 h-4" />
                Interactive Spine Disease Hub
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                어디가 어떻게 아프신가요? <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  6대 척추 질환 3D 솔루션
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
                더 이상 밋밋한 텍스트로 보지 마세요. 환자분의 의심 질환을 클릭하시면 
                <strong>3-Test1 상세 롱스크롤 치료 페이지</strong>로 직접 연결되어 원인부터 비수술 시술까지 한눈에 안내합니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 6대 질환 3D 글래스모피즘 와이드 카드 3열 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {SPINE_DISEASES.map((disease, idx) => (
              <Gem_ScrollReveal key={disease.id} direction="up" delay={0.1 + idx * 0.08}>
                <Link
                  href={disease.href}
                  className={`group relative flex flex-col justify-between rounded-3xl p-7 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-[#071E54]/90 backdrop-blur-xl border border-slate-700/80 transition-all duration-500 hover:-translate-y-2.5 shadow-2xl overflow-hidden h-full ${disease.glowColor}`}
                >
                  {/* 마스터 테스트 페이지 하이라이트 배지 */}
                  {disease.isMasterTest && (
                    <div className="absolute -top-1 -right-1 z-20">
                      <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-bl-2xl rounded-tr-3xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-black tracking-wider shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        3-Test1 상세연결
                      </span>
                    </div>
                  )}

                  <div>
                    {/* 상단: 3D 메디컬 홀로그램 썸네일 윈도우 */}
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 bg-slate-950/80 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                      <Image
                        src={disease.image}
                        alt={`${disease.name} 3D 해부도`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                      />
                      {/* 썸네일 하단 소프트 그라디언트 및 뷰파인더 가이드 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end justify-between p-4">
                        <span className="text-[10px] font-mono tracking-widest text-cyan-400 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                          3D MRI SYNC
                        </span>
                        <div className="flex items-center gap-1 text-xs text-white/80 font-bold group-hover:text-cyan-300 transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                          <span>미리보기</span>
                        </div>
                      </div>
                    </div>

                    {/* 질환명 및 영문 학명 */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${disease.badgeColor}`}>
                          {disease.tag}
                        </span>
                        <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1.5 transition-all duration-300" />
                      </div>
                      <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                        {disease.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium block">
                        {disease.sub}
                      </span>
                    </div>

                    {/* 설명 줄글 */}
                    <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-6 line-clamp-2">
                      {disease.desc}
                    </p>

                    {/* 직관적인 3대 인포그래픽 메트릭스 칩 */}
                    <div className="space-y-2 py-3 border-t border-slate-800">
                      {disease.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-medium">{metric.label}</span>
                          <strong className="text-cyan-200 font-semibold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            {metric.val}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 카드 하단 액션 버튼 */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80">
                    <div className="w-full py-3 px-4 rounded-xl bg-white/5 group-hover:bg-cyan-500 group-hover:text-slate-950 font-black text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 text-white border border-white/10 group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                      <span>상세 치료법 & 자가진단 검진</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </Gem_ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. [섹션 3] 솔루션 1: 대학병원급 10단계 다각적 진단 시스템 */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="Gem_Container">
          <Gem_ScrollReveal direction="up" delay={0.1}>
            <div className="max-w-3xl mb-16">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-50 text-gem-secondary border border-teal-100 uppercase tracking-wider mb-3">
                <Microscope className="w-4 h-4" />
                Precision Diagnostics System
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-gem-primaryDark tracking-tight leading-tight">
                정확한 진단이 빠른 치유를 만듭니다. <br />
                <span className="Gem_TextGradient">인천하이병원 10단계 다각 진단 프로세스</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                첨단 3.0T MRI, 적외선 체열(DITI), 신경전도 검사 등 대학병원급 정밀 검사 장비로 
                눈에 보이지 않는 신경 손상까지 빈틈없이 판독합니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 10단계 다각적 진단 플로우 차트 (2단 5행 그리드) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {DIAGNOSIS_10_STEPS.map((stepItem, idx) => (
              <Gem_ScrollReveal key={stepItem.step} direction="up" delay={0.1 + idx * 0.05}>
                <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-gem-primary hover:bg-blue-50/40 transition-all duration-200 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gem-primaryDark text-white flex items-center justify-center font-black text-sm flex-shrink-0 shadow-md">
                    {stepItem.step}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                      {stepItem.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>
                </div>
              </Gem_ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. [섹션 4] 솔루션 2: 수직으로 연속 전개되는 비수술 ➔ 정밀 안전 수술 시스템 */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="Gem_Container">
          <Gem_ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-gem-primary border border-blue-100 uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-gem-primary" />
                Step-by-Step Treatment Philosophy
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-gem-primaryDark tracking-tight">
                스크롤로 확인하는 안심 치료 원칙 <br />
                <span className="Gem_TextGradient">비수술 우선 케어부터 최소침습 수술까지</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3">
                환자의 수술 부담을 최소화하는 비수술 요법을 먼저 시행하며, 꼭 필요한 경우에만 최소 절개 정밀 수술을 진행합니다.
              </p>
            </div>
          </Gem_ScrollReveal>

          {/* 파트 1: 비수술 치료 시스템 (90% 호전 강조) */}
          <div className="mb-16">
            <Gem_ScrollReveal direction="up" delay={0.2}>
              <div className="bg-gradient-to-br from-gem-primaryDark via-[#0A266E] to-[#0052CC] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                <div className="max-w-3xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#00A8B5]/30 text-[#00A8B5] text-xs font-black uppercase tracking-wider mb-3">
                    STAGE 01. NON-SURGICAL CARE
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black mb-4 leading-tight">
                    &quot;환자의 약 90%는 수술 없이 비수술로 호전됩니다&quot;
                  </h3>
                  <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed mb-8">
                    전신마취나 피부 절개 없이, 국소마취 하에 20분 내외로 통증의 원인 신경 유착을 풀어주고 염증을 가라앉힙니다.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20">
                    <div className="p-3 bg-white/10 rounded-xl text-center">
                      <strong className="block text-lg font-black text-[#00A8B5]">국소마취</strong>
                      <span className="text-xs text-slate-200">고령·만성질환자 안전</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl text-center">
                      <strong className="block text-lg font-black text-[#00A8B5]">당일 퇴원</strong>
                      <span className="text-xs text-slate-200">빠른 일상 복귀</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl text-center">
                      <strong className="block text-lg font-black text-[#00A8B5]">무절개</strong>
                      <span className="text-xs text-slate-200">흉터 및 출혈 최소화</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl text-center">
                      <strong className="block text-lg font-black text-[#00A8B5]">정밀 타겟</strong>
                      <span className="text-xs text-slate-200">C-arm 영상 유도 시술</span>
                    </div>
                  </div>
                </div>
              </div>
            </Gem_ScrollReveal>
          </div>

          {/* 파트 2: 수술 치료 시스템 (수술이 불가피한 경우의 안전성 부각) */}
          <div>
            <Gem_ScrollReveal direction="up" delay={0.3}>
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-gem-soft">
                <div className="max-w-3xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-wider mb-3">
                    STAGE 02. SAFE MINIMAL SURGERY
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 leading-tight">
                    수술이 불가피한 경우에도, <br />
                    1~2cm 최소 절개와 미세현미경으로 안전하게
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                    마비 증세나 극심한 신경 손상으로 수술이 반드시 필요한 환자분을 위해, 
                    정상 근육 손상을 최소화하고 40~50배 확대 시야의 미세현미경 및 내시경으로 병변만 안전 제거합니다.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-gem-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                        01
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">1~2cm 최소 피부 절개</h4>
                        <p className="text-xs text-slate-500 mt-1">출혈과 통증이 적어 수술 다음 날 보행 가능</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-gem-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                        02
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">40~50배 초정밀 확대 시야</h4>
                        <p className="text-xs text-slate-500 mt-1">미세 신경과 혈관을 완벽 보존하며 병변만 제거</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-gem-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                        03
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">무균 양압 수술실 완비</h4>
                        <p className="text-xs text-slate-500 mt-1">대학병원급 클린룸으로 수술 후 감염률 0% 지향</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Gem_ScrollReveal>
          </div>
        </div>
      </section>

      {/* 7. [섹션 5] 간편 진료 예약 폼 (Fast Conversion Form) */}
      <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="Gem_Container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* 좌측 안내 카피 (5열) */}
            <div className="lg:col-span-5">
              <Gem_ScrollReveal direction="right" delay={0.1}>
                <span className="text-xs font-bold text-[#00A8B5] tracking-widest uppercase block mb-3">
                  FAST RESERVATION
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                  척추 통증, <br />
                  더 이상 참지 마세요
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                  성함과 연락처를 남겨주시면, 전문 상담 간호사가 환자분의 증상에 맞는 
                  가장 빠른 척추 전문의 진료 일정을 전화로 안내해 드립니다.
                </p>

                <div className="space-y-4 pt-6 border-t border-slate-700">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <PhoneCall className="w-5 h-5 text-[#00A8B5]" />
                    <span>대표 전화 문의: <strong>032-123-4567</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Clock className="w-5 h-5 text-[#00A8B5]" />
                    <span>상담 가능 시간: 평일 09:00 ~ 18:00 / 토 09:00 ~ 13:00</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>개인정보는 진료 예약 확인 목적으로만 안전하게 암호화 처리됩니다.</span>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>

            {/* 우측 간편 예약 폼 카드 (7열) */}
            <div className="lg:col-span-7">
              <Gem_ScrollReveal direction="left" delay={0.2}>
                <div className="bg-slate-800 rounded-3xl p-8 sm:p-10 border border-slate-700 shadow-2xl">
                  {!isSubmitted ? (
                    <form onSubmit={handleReservationSubmit} className="space-y-5">
                      <h3 className="text-xl font-bold text-white mb-4">
                        척추센터 빠른 상담 신청
                      </h3>

                      {/* 성함 & 연락처 2단 인풋 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            환자 성함 <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="홍길동"
                            value={formState.patientName}
                            onChange={(e) => setFormState({ ...formState, patientName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-gem-primary text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            연락처 <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="010-1234-5678"
                            value={formState.phoneNumber}
                            onChange={(e) => setFormState({ ...formState, phoneNumber: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-gem-primary text-sm"
                          />
                        </div>
                      </div>

                      {/* 의심 증상 / 진료과 선택 */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          불편하신 주요 부위 / 증상
                        </label>
                        <select
                          value={formState.symptomArea}
                          onChange={(e) => setFormState({ ...formState, symptomArea: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-gem-primary text-sm"
                        >
                          <option value="허리 통증 및 다리 저림">허리 통증 및 다리 저림 (허리디스크/협착증 의심)</option>
                          <option value="목·어깨 통증 및 손 저림">목·어깨 통증 및 손 저림 (목디스크 의심)</option>
                          <option value="거북목·일자목 체형 교정">거북목·일자목 체형 교정 (도수재활)</option>
                          <option value="급성 척추 골절 및 낙상">급성 척추 골절 및 낙상 (압박골절 의심)</option>
                          <option value="기타 척추 질환 상담">기타 척추 질환 상담</option>
                        </select>
                      </div>

                      {/* 희망 상담 일자 */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          희망 예약 일자 (선택)
                        </label>
                        <input
                          type="date"
                          value={formState.preferredDate}
                          onChange={(e) => setFormState({ ...formState, preferredDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-gem-primary text-sm"
                        />
                      </div>

                      {/* 개인정보 동의 체크 */}
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="checkbox"
                          id="privacyCheck"
                          checked={formState.agreePrivacy}
                          onChange={(e) => setFormState({ ...formState, agreePrivacy: e.target.checked })}
                          className="w-4 h-4 rounded text-gem-primary focus:ring-gem-primary"
                        />
                        <label htmlFor="privacyCheck" className="text-xs text-slate-400">
                          [필수] 진료 예약 및 전화 상담을 위한 개인정보 수집·이용에 동의합니다.
                        </label>
                      </div>

                      {/* 신청 버튼 */}
                      <button
                        type="submit"
                        disabled={!formState.agreePrivacy}
                        className="w-full py-4 rounded-xl bg-gem-primary hover:bg-gem-primaryHover disabled:opacity-50 text-white font-black text-base transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
                      >
                        <Send className="w-4 h-4" />
                        <span>간편 진료 예약 신청하기</span>
                      </button>
                    </form>
                  ) : (
                    /* 예약 완료 성공 화면 */
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        진료 예약 신청이 완료되었습니다!
                      </h3>
                      <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                        {formState.patientName}님, 남겨주신 연락처({formState.phoneNumber})로 <br />
                        전문 상담 간호사가 신속히 연락드려 예약을 확정해 드리겠습니다.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormState({
                            patientName: "",
                            phoneNumber: "",
                            symptomArea: "허리 통증 및 다리 저림",
                            preferredDate: "",
                            agreePrivacy: true,
                          });
                        }}
                        className="px-6 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-colors"
                      >
                        다른 예약 추가 신청하기
                      </button>
                    </div>
                  )}
                </div>
              </Gem_ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
