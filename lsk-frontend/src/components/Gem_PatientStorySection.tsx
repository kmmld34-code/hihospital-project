"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Camera, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  UserCheck, 
  Activity, 
  Quote, 
  Calendar 
} from "lucide-react";
import { GEM_PATIENT_STORIES, GemPatientStoryItem } from "@/data/hospitalData";

/**
 * ==============================================================================
 * [Gem_PatientStorySection] 생생한 환자 치료 스토리 동적 큐레이션 & 백엔드 연동 컴포넌트
 * ==============================================================================
 * 기획 및 인터랙션 디자인: 정재이 과장 (Lead UI/UX Designer)
 * 프론트엔드 구현: 고윤기 대리 (Frontend Lead Engineer)
 * 백엔드 REST API 설계: 최우진 대리 (Backend Engineer)
 * ==============================================================================
 * [주요 구현 사양]
 * 1. 백엔드 REST API(/api/stories) 비동기 연동:
 *    - 컴포넌트 마운트 시 /api/stories 엔드포인트를 호출하여 최신 치료 후기 목록을 실시간 로딩
 *    - 네트워크 지연 시에도 정적 시더 데이터를 즉각 폴백 렌더링하여 무중단 사용자 경험 보장
 * 2. 다중 스토리 슬라이드 탐색 인터랙션:
 *    - 4인의 실제 환자 치료 스토리를 좌/우 네비게이션 버튼 및 페이지네이션으로 전환
 * 3. 인터뷰 전문 및 전문의 의학 소견 팝업 모달:
 *    - 카드 클릭 시 환자의 치료 전 고통, 시술 후 일상 회복 경과, 담당 원장님의 의학적 소견을
 *      한눈에 확인할 수 있는 고해상도 상세 팝업 모달창 탑재
 * 4. 의료법 및 개인정보보호법(제7원칙) 준수:
 *    - 환자 성명 마스킹(박OO 환자), 가명 처리, 개인정보 철저 격리
 * ==============================================================================
 */

export default function Gem_PatientStorySection() {
  const [stories, setStories] = useState<GemPatientStoryItem[]>(GEM_PATIENT_STORIES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStory, setSelectedStory] = useState<GemPatientStoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. 백엔드 REST API 비동기 연동 (/api/stories)
  useEffect(() => {
    async function fetchStories() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/stories");
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setStories(json.data);
          }
        }
      } catch (error) {
        console.warn("[PatientStory] 백엔드 API 연동 폴백 가동:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStories();
  }, []);

  // 모달 열림 시 배경 스크롤 차단
  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedStory]);

  const currentStory = stories[currentIndex] || GEM_PATIENT_STORIES[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <>
      <div className="space-y-6 flex flex-col justify-between h-full">
        {/* 1. 상단 섹션 타이틀 및 컨트롤러 */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#0052CC] text-xs font-bold uppercase tracking-wider block mb-1">
              PATIENT RECOVERY STORIES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              생생한 환자 치료 스토리
            </h3>
          </div>

          {/* 슬라이드 이전/다음 전환 버튼 */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="이전 치료 후기 보기"
              className="w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-600 hover:text-[#0052CC] hover:border-[#0052CC] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400 font-bold px-1">
              {currentIndex + 1} / {stories.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="다음 치료 후기 보기"
              className="w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-600 hover:text-[#0052CC] hover:border-[#0052CC] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. 동적 환자 치료 후기 카드 (클릭 시 상세 모달 팝업 호출) */}
        <div
          onClick={() => setSelectedStory(currentStory)}
          className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 flex-1 flex flex-col justify-between group cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2.5 hover:shadow-[0_20px_35px_-5px_rgba(7,30,84,0.16)] hover:border-[#0052CC]/40"
        >
          {/* 상단 썸네일 이미지 (Next.js Image) */}
          <div className="relative w-full bg-[#071E54] overflow-hidden min-h-[280px] sm:min-h-[320px]">
            <Image
              src={currentStory.imageUrl}
              alt={`${currentStory.patientName} 치료 후기 사진`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071E54]/95 via-[#071E54]/40 to-transparent" />

            {/* 좌상단 뱃지 */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="bg-[#0052CC]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                <Camera className="w-3.5 h-3.5" />
                <span>치료 인터뷰</span>
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                {currentStory.treatmentName}
              </span>
            </div>

            {/* 하단 별점 및 담당의 표기 */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-white text-xs font-bold ml-1.5">
                  {currentStory.rating.toFixed(1)} (치료 만족도)
                </span>
              </div>
              <span className="text-xs text-slate-300 font-medium">
                담당의: {currentStory.doctorInCharge}
              </span>
            </div>
          </div>

          {/* 하단 텍스트 및 상세 인터뷰 내용 */}
          <div className="p-6 sm:p-7 bg-white flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className={`${currentStory.categoryBg} text-xs px-2.5 py-0.5 rounded-full font-bold`}>
                    {currentStory.category}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">
                    {currentStory.patientName} ({currentStory.patientAge})
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{currentStory.date}</span>
              </div>

              <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0052CC] transition-colors leading-snug">
                &ldquo;{currentStory.title}&rdquo;
              </h4>

              <p className="text-xs sm:text-sm text-slate-500 mt-2.5 leading-relaxed line-clamp-3 break-keep">
                {currentStory.quote}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0052CC]">
              <span>인터뷰 전문 및 전문의 소견 보기</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. 생생한 환자 치료 스토리 상세 팝업 모달창 */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* 어두운 백드롭 */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedStory(null)}
          />

          {/* 모달 윈도우 본체 */}
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            {/* 상단 모달 헤더 */}
            <div className="bg-[#071E54] text-white p-6 relative">
              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                aria-label="창 닫기"
                className="absolute top-5 right-5 text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#0052CC] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {selectedStory.category}
                </span>
                <span className="text-slate-300 text-xs">
                  {selectedStory.patientName} ({selectedStory.patientAge})
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug pr-8">
                &ldquo;{selectedStory.title}&rdquo;
              </h3>
            </div>

            {/* 스크롤 가능한 본문 내용 */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700">
              {/* 환자 실제 육성 인터뷰 */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 relative">
                <Quote className="w-8 h-8 text-slate-200 absolute -top-3 -left-2" />
                <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#0052CC]" />
                  <span>환자 실제 치료 소감</span>
                </h5>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  {selectedStory.quote}
                </p>
              </div>

              {/* 치료 전/후 비교 카드 2열 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-100">
                  <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-1">
                    BEFORE (치료 전 증상)
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedStory.beforeSymptoms}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                    AFTER (치료 후 회복 경과)
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedStory.afterRecovery}
                  </p>
                </div>
              </div>

              {/* 주치의 전문의 의학적 소견 */}
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold text-[#0052CC] text-sm flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-[#0052CC]" />
                    <span>주치의 소견 ({selectedStory.doctorInCharge})</span>
                  </h5>
                  <span className="text-[11px] text-slate-500 font-medium">
                    시술명: {selectedStory.treatmentName}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedStory.doctorComment}
                </p>
              </div>
            </div>

            {/* 하단 모달 닫기 버튼 */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A6] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
