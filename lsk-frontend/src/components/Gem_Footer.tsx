"use client";

import React from "react";
import Link from "next/link";
import { Phone, Clock, MapPin, ShieldCheck, Heart } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_Footer] 최하단 푸터 컴포넌트
 * ==============================================================================
 * - 규칙: 배경은 100% 풀 와이드(Full-width, bg-[#071E54] 딥네이비),
 *        내부 콘텐츠(진료시간, 사업자정보, 법적고지 등)는 max-w-[1400px] mx-auto 중앙 정렬!
 * - 접두어: Gem_ 접두사 엄수
 * ==============================================================================
 */
export default function Gem_Footer() {
  return (
    <footer className="Gem_Footer w-full bg-[#071E54] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* 푸터 내부 1400px 고정 컨테이너 */}
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 1열: 진료시간표 및 대표전화 안내 (그리드) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-slate-800/80">
          {/* 1. 대표 전화번호 및 응급실 직통 */}
          <div>
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block mb-1">
              CALL CENTER & EMERGENCY
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2 flex items-center">
              <Phone className="w-7 h-7 mr-2 text-amber-400" />
              <span>1600-8549</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              외래 진료 예약 및 전문 상담원 연결 (ARS 1번)
            </p>
            <div className="inline-flex items-center space-x-2 bg-red-500/20 border border-red-500/30 text-red-300 text-xs px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping mr-1" />
              <span>24시간 응급실 직통: 02-1588-0001</span>
            </div>
          </div>

          {/* 2. 외래 진료시간 안내 */}
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-base mb-3">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>진료시간 안내</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">평일</span>
                <span className="font-semibold">09:00 ~ 18:00 (점심시간 12:30 ~ 13:30)</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">토요일</span>
                <span className="font-semibold text-cyan-300">09:00 ~ 13:00 (점심시간 없이 진료)</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">일요일·공휴일</span>
                <span className="text-red-300 font-semibold">외래 휴진 (응급의료센터 정상 가동)</span>
              </li>
              <li className="flex justify-between pt-1">
                <span className="text-slate-400">인공신장실</span>
                <span className="font-semibold">월·수·금 야간투석 운영 (22:00까지)</span>
              </li>
            </ul>
          </div>

          {/* 3. 찾아오시는 길 & 약도 안내 */}
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-base mb-3">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>찾아오시는 길 & 주차</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              서울특별시 서구 메디컬로 123 HI빌딩 (지하철역 3번 출구 도보 2분)
            </p>
            <div className="bg-slate-800/60 rounded-xl p-3 text-xs text-slate-400 border border-slate-700/50">
              <strong className="text-white block mb-1">무료 주차 안내</strong>
              외래 환자 4시간 무료 주차 / 입·퇴원 당일 24시간 무료 주차 타워 완비
            </div>
          </div>
        </div>

        {/* 중단 2열: 법적 고지 및 빠른 링크 */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 text-xs">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-medium">
            <Link href="/privacy" className="text-cyan-400 hover:underline font-bold">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              이용약관
            </Link>
            <Link href="/community/non-reimbursable" className="text-amber-300 hover:underline font-bold">
              비급여 진료비용 고지
            </Link>
            <Link href="/patient-rights" className="hover:text-white transition-colors">
              환자의 권리와 의무
            </Link>
            <Link href="/about/hours" className="hover:text-white transition-colors">
              원내 진료시간표
            </Link>
          </div>

          <div className="text-slate-500 text-[11px] flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1 text-cyan-500" />
            <span>보건복지부 의료기관 인증 심사 통과</span>
          </div>
        </div>

        {/* 하단 3열: 사업자등록번호, 대표자, 카피라이트 */}
        <div className="pt-6 text-xs text-slate-500 leading-relaxed flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <p className="mb-1">
              의료기관명: HI Hospital | 대표원장: 김진수 | 사업자등록번호: 123-45-67890 | 의료기관개설허가번호: 제2026-001호
            </p>
            <p>
              주소: 서울특별시 서구 메디컬로 123 | 대표전화: 1600-8549 | 팩스: 02-1588-0002 | 개인정보보호책임자: 박동훈
            </p>
          </div>

          <p className="mt-4 md:mt-0 text-[11px] text-slate-600 font-mono">
            COPYRIGHT © 2026 HI HOSPITAL. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
