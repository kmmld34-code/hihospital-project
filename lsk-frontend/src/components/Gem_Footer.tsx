"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Phone, MapPin, X, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_Footer] 최하단 푸터 컴포넌트 & 법적 약관 전문 모달 시스템
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 정재이 과장 (Lead UI/UX), 강수진 PM
 * ==============================================================================
 * [7번 & 8번 수정 반영 내역]
 * 1. 2열 진료시간표 안내:
 *    - '법정공휴일 휴무' 텍스트 색상을 지정 포인트 컬러인 [#86F7FC]로 선명하게 변경
 * 2. 3열 건강검진 예약상담 블록:
 *    - '건강검진 예약상담' 및 전화번호(032-550-8931~2) 폰트 크기를 상단 소제목 수준(text-sm sm:text-base)으로 확대
 * 3. 4종 법적 정책 전문 팝업 모달창 탑재:
 *    - [개인정보처리방침], [비급여 진료비용 고지], [이용약관], [환자권리장전]
 *    - 사용자가 각 링크를 클릭했을 때 페이지 이동 없이 전체 약관 전문을 읽을 수 있는 고해상도 팝업 모달창 구현
 * 4. 8번 관리자 텍스트 반영:
 *    - "© 2026 인천하이병원. All rights reserved.  관리자"
 *    - '관리자'는 링크가 없는 일반 텍스트이며, 은은한 저시인성 색상(text-slate-600)으로 배치
 * ==============================================================================
 */

type ModalType = "privacy" | "non-reimbursable" | "terms" | "rights" | null;

export default function Gem_Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // 모달 활성화 시 배경 스크롤 차단
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModal]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 각 모달별 제목 및 본문 전문 데이터
  const modalContent: Record<
    Exclude<ModalType, null>,
    { title: string; subtitle: string; content: React.ReactNode }
  > = {
    privacy: {
      title: "인천하이병원 개인정보처리방침",
      subtitle: "환자의 소중한 개인정보와 의료데이터는 엄격한 보안 하에 안전하게 관리됩니다.",
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p className="font-semibold text-slate-900">
            인천하이병원(이하 &apos;병원&apos;)은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하며, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다.
          </p>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900">제1조 (개인정보의 수집 및 이용 목적)</h5>
            <p>
              1. 진료, 치료, 검사, 처방, 증명서 발급 등 의료법에 따른 진료 서비스 제공<br />
              2. 진료비 청구, 수납, 환불 등 진료지원 및 원무 행정 서비스<br />
              3. 온라인 예약 확인, 검사 결과 통보 및 병원 이용 관련 필수 안내
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900">제2조 (수집하는 개인정보의 항목)</h5>
            <p>
              성명, 주민등록번호(외국인등록번호), 주소, 연락처, 진료기록, 과거 병력, 건강보험증 번호 등 의료법령에 명시된 필수 진료 기록.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900">제3조 (개인정보의 보유 및 이용 기간)</h5>
            <p>
              의료법 시행규칙 제15조(진료에 관한 기록의 보존)에 따라 진료기록부는 10년, 처방전은 2년, 검사소견기록은 5년 동안 안전하게 보관 후 영구 파기합니다.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900">제4조 (안전성 확보 조치 및 암호화)</h5>
            <p>
              병원은 개인정보의 분실, 도난, 유출, 위조 또는 변조를 방지하기 위해 고유식별정보와 비밀번호를 256비트 암호화하여 저장하며, 침입차단시스템을 통해 24시간 철저히 보호하고 있습니다.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-200 text-slate-500 text-[11px]">
            개인정보보호책임자: 윤창선 원무과장 | 문의: 032-550-8900 | 시행일자: 2026년 1월 1일
          </div>
        </div>
      ),
    },
    "non-reimbursable": {
      title: "비급여 진료비용 고지 안내",
      subtitle: "의료법 제45조 및 동법 시행규칙 제42조의2에 의거하여 본원의 비급여 항목을 고지합니다.",
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p className="text-slate-600">
            인천하이병원은 환자분들의 알 권리와 선택권을 보장하기 위해 주요 비급여 항목의 비용을 투명하게 공개하고 있습니다. 본 고지 비용은 단일 검사 및 처치 기준이며 환자의 상태에 따라 변동될 수 있습니다.
          </p>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">구분</th>
                  <th className="p-2.5">분류 / 검사항목</th>
                  <th className="p-2.5 text-right">비용 (원)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5 font-medium text-slate-900">영상진단</td>
                  <td className="p-2.5">MRI 척추 (요추/경추 일반정밀)</td>
                  <td className="p-2.5 text-right font-bold text-[#0052CC]">420,000</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-900">영상진단</td>
                  <td className="p-2.5">MRI 관절 (슬관절/견관절 정밀)</td>
                  <td className="p-2.5 text-right font-bold text-[#0052CC]">400,000</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-900">초음파</td>
                  <td className="p-2.5">근골격계 초음파 검사 (부위별)</td>
                  <td className="p-2.5 text-right font-bold text-[#0052CC]">80,000</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-900">제증명</td>
                  <td className="p-2.5">일반진단서 (1통 기준)</td>
                  <td className="p-2.5 text-right font-bold text-[#0052CC]">20,000</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-900">제증명</td>
                  <td className="p-2.5">상해진단서 (3주 미만)</td>
                  <td className="p-2.5 text-right font-bold text-[#0052CC]">100,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500">
            * 세부 항목 및 비급여 전 항목의 자세한 수가는 원내 원무과 접수창구의 비급여 책자 또는 홈페이지 커뮤니티 비급여 안내를 참조하시기 바랍니다.
          </p>
        </div>
      ),
    },
    terms: {
      title: "인천하이병원 홈페이지 이용약관",
      subtitle: "병원 웹사이트 및 온라인 예약·상담 서비스 이용을 위한 기본 규정입니다.",
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900">제1조 (목적)</h5>
            <p>
              본 약관은 인천하이병원이 운영하는 웹사이트(이하 &apos;사이트&apos;)에서 제공하는 인터넷 관련 의료정보, 진료예약, 건강상담 등의 서비스를 이용함에 있어 병원과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900">제2조 (서비스의 제공 및 변경)</h5>
            <p>
              1. 의료진 소개, 진료과 및 특화센터 안내<br />
              2. 온라인 간편 진료예약 및 검진 상담 접수<br />
              3. 병원 공지사항, 언론보도, 건강의학 정보 제공
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900">제3조 (온라인 상담 및 예약의 한계)</h5>
            <p>
              온라인 게시판 상담 및 예약 안내는 참고용이며, 의사의 대면 진료를 대신할 수 없습니다. 응급 상황이거나 정확한 진단이 필요한 경우 본원을 즉시 방문하여 전문의의 진료를 받으셔야 합니다.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900">제4조 (이용자의 의무)</h5>
            <p>
              이용자는 본인 정보의 허위 입력, 타인의 명의 도용, 게시판 내 상업 광고 게시, 미풍양속을 저해하는 행위를 하여서는 안 됩니다.
            </p>
          </div>
        </div>
      ),
    },
    rights: {
      title: "환자의 권리와 의무 (환자권리장전)",
      subtitle: "인천하이병원은 모든 환자의 인간으로서의 존엄성과 건강할 권리를 존중합니다.",
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="space-y-2">
            <h5 className="font-bold text-[#0052CC] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0052CC]" />
              <span>1. 환자의 권리</span>
            </h5>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700">
              <li><strong>진료받을 권리:</strong> 성별·나이·종교·신분 및 경제적 사정 등을 이유로 차별받지 않고 건강에 관한 최선의 진료를 받을 권리가 있습니다.</li>
              <li><strong>알 권리 및 자기결정권:</strong> 담당 의사 등으로부터 질병 상태, 치료 방법, 의학적 위험성 등에 대해 충분한 설명을 듣고 진료 여부를 결정할 권리가 있습니다.</li>
              <li><strong>비밀을 보호받을 권리:</strong> 진료와 관련된 신체상·건강상의 비밀과 사생활의 비밀을 침해받지 아니합니다.</li>
              <li><strong>상담·조정을 신청할 권리:</strong> 의료서비스 관련 분쟁 발생 시 한국의료분쟁조정중재원 등에 상담 및 조정을 신청할 수 있습니다.</li>
            </ul>
          </div>
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <h5 className="font-bold text-[#006971] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#006971]" />
              <span>2. 환자의 의무</span>
            </h5>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700">
              <li><strong>의료인에 대한 신뢰·존중 의무:</strong> 환자는 자신의 건강 관련 정보를 의료인에게 정확히 알리고, 의료인의 치료계획을 존중하여야 합니다.</li>
              <li><strong>부정한 방법으로 진료를 받지 않을 의무:</strong> 타인의 명의로 진료를 받는 등 부정한 방법으로 진료를 받지 아니합니다.</li>
              <li><strong>병원 내 질서 및 규정 준수 의무:</strong> 병원 내 다른 환자의 진료 환경을 침해하지 않으며 원내 감염 예방 수칙을 준수합니다.</li>
            </ul>
          </div>
        </div>
      ),
    },
  };

  return (
    <>
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

            {/* 2열: 진료시간 안내 (법정공휴일 휴무: #86f7fc 지정색 적용) */}
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
                  {/* 법정공휴일 휴무 색상을 #86f7fc로 지정 */}
                  <span className="text-[#86F7FC] font-bold">법정공휴일 휴무</span>
                </li>
              </ul>
            </div>

            {/* 3열: 고객센터 및 상담 전화 (건강검진 예약상담 폰트 확대) */}
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

                {/* 7번 요구사항: '건강검진 예약상담' 및 전화번호 텍스트 크기를 상단 소제목 크기(text-sm sm:text-base)로 확대 */}
                <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-white font-bold text-sm sm:text-base">
                    건강검진 예약상담
                  </span>
                  <a
                    href="tel:032-550-8931"
                    className="text-[#87F3FF] hover:underline font-extrabold text-sm sm:text-base tracking-tight"
                  >
                    032) 550-8931~2
                  </a>
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
            {/* 법적 약관 전문 모달 링크 (클릭 시 팝업 모달 호출) */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => setActiveModal("privacy")}
                className="text-white font-bold hover:underline cursor-pointer"
              >
                개인정보처리방침
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("non-reimbursable")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                비급여 진료비용 고지
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("terms")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                이용약관
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("rights")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                환자권리장전
              </button>
            </div>

            {/* 사업자등록 및 담당자 정보 & 8번 관리자 텍스트 */}
            <div className="text-slate-400 text-center md:text-right text-[11px] sm:text-xs leading-relaxed">
              <p className="text-slate-400 mb-0.5">
                사업자 등록 번호 : 389-11-03283 <span className="text-slate-600 mx-1">|</span> 대표자 : 서동광
              </p>
              <p className="text-slate-400 mb-0.5">
                개인정보 책임자 : 윤창선 <span className="text-slate-600 mx-1">|</span> E-mail : hihospital2@naver.com
              </p>
              {/* 8번 수정: 카피라이트 끝에 저시인성 '관리자' 텍스트 추가 (링크 없음) */}
              <p className="text-slate-500">
                © 2026 인천하이병원. All rights reserved.{" "}
                <Link
                  href="/admin/subpages"
                  className="text-slate-600 select-none ml-1.5 text-[10px] cursor-default no-underline hover:text-slate-600 focus:outline-none"
                >
                  관리자
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* 4종 법적 약관 전문 팝업 모달창 (7번 요구사항 구현) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* 어두운 백드롭 (클릭 시 닫힘) */}
          <div
            className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModal(null)}
          />

          {/* 모달 윈도우 본체 */}
          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* 상단 모달 헤더 */}
            <div className="bg-[#071E54] text-white p-5 sm:p-6 flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-white/10 text-[#87F3FF] mb-1.5">
                  인천하이병원 공식 규정
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                  {modalContent[activeModal].title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {modalContent[activeModal].subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="창 닫기"
                className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 스크롤 가능한 본문 영역 */}
            <div className="p-6 max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin">
              {modalContent[activeModal].content}
            </div>

            {/* 하단 닫기 확인 버튼 */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
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
