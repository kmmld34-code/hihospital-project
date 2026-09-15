"use client";

import React from "react";
import Link from "next/link";
import { Clock, Phone, MapPin, ShieldCheck, HeartHandshake } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_Footer] 최하단 푸터 컴포넌트
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM
 * ==============================================================================
 * [주요 구현 사양]
 * 1. 100% Full-width 딥네이비 배경:
 *    - bg-[#071E54] 배경색 적용
 * 2. 내부 max-w-[1400px] mx-auto 중앙 정렬:
 *    - 로고, 4열 그리드, 정책 링크, 사업자 정보 모두 1400px 컨테이너 규격 엄수
 * 3. 4대 주요 블록:
 *    - 1열: 인천하이병원 공식 로고 및 3대 인증 뱃지 (국가건강검진, 간호·간병, 장애인 주치의)
 *    - 2열: 정밀 진료시간표 안내 (평일, 토요일, 일요일, 공휴일)
 *    - 3열: 고객센터 대표전화(1666-1675) 및 종합건강검진 예약상담(032-550-8931~2)
 *    - 4열: 계산역 3번 출구 오시는 길 및 주차 안내
 * 4. 하단 법적 고지:
 *    - 개인정보처리방침, 비급여 진료비용 고지, 이용약관, 환자권리장전
 *    - 대표자 서동광, 사업자번호, 개인정보책임자 명시
 * ==============================================================================
 */
export default function Gem_Footer() {
  return (
    <footer className="Gem_Footer w-full bg-[#071E54] text-slate-300 border-t border-slate-800 py-10 sm:py-12">
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. 상단 4열 그리드 블록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 border-b border-slate-800/80 pb-8 sm:pb-10">
          {/* 1열: 로고 & 인증 뱃지 */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0 whitespace-nowrap group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0052CC] to-[#00A8B5] flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                HI
              </div>
              <div className="flex flex-col justify-center items-start">
                <span className="text-xl sm:text-[22px] font-black tracking-tight text-white leading-none block">
                  인천하이병원
                </span>
                <span className="font-bold leading-none uppercase text-slate-400 mt-1 flex justify-between w-full text-[8.5px] select-none tracking-widest">
                  <span>I</span>
                  <span>N</span>
                  <span>C</span>
                  <span>H</span>
                  <span>E</span>
                  <span>O</span>
                  <span>N</span>
                  <span>&nbsp;</span>
                  <span>H</span>
                  <span>I</span>
                  <span>&nbsp;</span>
                  <span>H</span>
                  <span>O</span>
                  <span>S</span>
                  <span>P</span>
                  <span>I</span>
                  <span>T</span>
                  <span>A</span>
                  <span>L</span>
                </span>
              </div>
            </Link>

            {/* 3대 공인 인증 뱃지 */}
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-xs text-[#87F3FF] font-semibold border border-slate-700/60">
                국가건강검진 의료기관
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-xs text-slate-300 font-semibold border border-slate-700/60">
                간호·간병통합서비스
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-xs text-[#87F3FF] font-semibold border border-slate-700/60">
                장애인 건강주치의 의료기관
              </span>
            </div>
          </div>

          {/* 2열: 진료시간 안내 */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#87F3FF]" />
              <span>진료시간 안내</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <span>평일 진료</span>
                <span className="text-white font-medium">
                  09:00 ~ 18:00 (점심 1시~2시)
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <span>토요일 진료</span>
                <span className="text-white font-medium">
                  09:00 ~ 13:00 (점심시간 없음)
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <span>일요일 진료</span>
                <span className="text-white font-medium">
                  09:00 ~ 16:00 (점심 1시~2시)
                </span>
              </li>
              <li className="flex items-center justify-between pt-1">
                <span className="text-white font-medium">[의료진별 진료시간]</span>
                <span className="text-red-400 font-bold">법정공휴일 휴무</span>
              </li>
            </ul>
          </div>

          {/* 3열: 고객센터 및 상담 전화 */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#87F3FF]" />
              <span>고객센터 및 상담</span>
            </h4>
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
              <div className="text-xs text-slate-400 font-medium mb-1">
                대표전화 / 예약상담
              </div>
              <a
                href="tel:1666-1675"
                className="text-2xl sm:text-[26px] font-black text-white hover:text-[#87F3FF] transition-colors block leading-tight tracking-tight"
              >
                1666-1675
              </a>
              <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span className="text-white font-medium">건강검진 예약상담</span>
                <span className="text-slate-300 font-bold">032) 550-8931~2</span>
              </div>
            </div>
          </div>

          {/* 4열: 오시는 길 및 주차 */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#87F3FF]" />
              <span>오시는 길 및 주차</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              인천광역시 계양구 경명대로 1107 (계산동)
              <br />
              <span className="text-xs text-slate-400">
                인천 1호선 계산역 3번 출구 도보 3분
              </span>
            </p>
            <div className="pt-2">
              <Link
                href="/about/directions"
                className="inline-flex items-center gap-1.5 text-xs text-[#87F3FF] hover:text-white transition-colors border border-teal-500/40 rounded-lg px-3.5 py-2 bg-teal-500/10"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>길찾기 및 주차안내</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. 하단 정책 링크 및 사업자 등록 정보 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-6">
          {/* 법적 약관 링크 */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="text-white font-bold hover:underline"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/community/non-reimbursable"
              className="hover:text-white transition-colors"
            >
              비급여 진료비용 고지
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              이용약관
            </Link>
            <Link
              href="/patient-rights"
              className="hover:text-white transition-colors"
            >
              환자권리장전
            </Link>
          </div>

          {/* 사업자등록 및 담당자 정보 */}
          <div className="text-slate-400 text-center md:text-right text-[11px] sm:text-xs leading-relaxed">
            <p className="text-slate-400 mb-0.5">
              사업자 등록 번호 : 389-11-03283 <span className="text-slate-600 mx-1">|</span> 대표자 : 서동광
            </p>
            <p className="text-slate-400 mb-0.5">
              개인정보 책임자 : 윤창선 <span className="text-slate-600 mx-1">|</span> E-mail : hihospital2@naver.com
            </p>
            <p className="text-slate-500">© 2026 인천하이병원. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
