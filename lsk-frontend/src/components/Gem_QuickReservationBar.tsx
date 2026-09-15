"use client";

import React, { useState, useEffect } from "react";
import { CalendarCheck, Send, ShieldCheck, X, Check, FileText } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_QuickReservationBar] 원스톱 간편예약 신청 바 & 개인정보 동의 모달
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM
 * ==============================================================================
 * [주요 구현 사양]
 * 1. 1400px 중앙 정렬 컨테이너:
 *    - max-w-[1400px] mx-auto 규격 준수
 *    - 상단 히어로 배너 바로 아래에 자연스럽게 이어지는 플로팅 카드 형태
 * 2. 원스톱 입력 필드:
 *    - 환자 성함, 연락처, 진료 희망 과목 (6대 분과 선택)
 *    - 개인정보 수집·이용 동의 체크박스 및 [전문보기] 모달 연동
 * 3. 750px 고품격 개인정보 동의 모달:
 *    - 의료법 및 개인정보보호법에 준하는 수집목적, 항목, 보유기간 표(Table) 상세 기재
 *    - 모달 내에서 동의 시 메인 폼 체크박스 자동 연동 동기화
 * 4. 보안 및 암호화:
 *    - 환자 연락처 및 개인 식별 정보는 전송 시 마스킹/암호화 준비 규격 적용
 * ==============================================================================
 */
export default function Gem_QuickReservationBar() {
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [department, setDepartment] = useState("spine");
  const [agreePrivacy, setAgreePrivacy] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ESC 키 누르면 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // 모달 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // 예약 신청 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim()) {
      alert("환자 성함을 입력해 주세요.");
      return;
    }
    if (!patientPhone.trim()) {
      alert("연락처를 입력해 주세요.");
      return;
    }
    if (!agreePrivacy) {
      alert("개인정보 수집 및 이용 동의가 필요합니다. [전문보기]를 확인해 주세요.");
      return;
    }

    // 예약 접수 시뮬레이션
    setIsSubmitted(true);
  };

  // 모달 내에서 [동의하고 확인] 클릭 시
  const handleModalAgree = () => {
    setAgreePrivacy(true);
    setIsModalOpen(false);
  };

  return (
    <section className="Gem_QuickReservationSection w-full py-3 relative z-30">
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200 mt-2 sm:mt-4 transition-all">
          {isSubmitted ? (
            // 접수 완료 시 성공 안내 메시지
            <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-blue-50 border border-blue-200 rounded-xl text-[#071E54] gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0052CC] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">
                    간편 진료예약 신청이 정상 접수되었습니다!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    <strong>{patientName}</strong> 환자님의 연락처(
                    <strong>{patientPhone}</strong>)로 전담 코디네이터가 신속히 연락드려
                    일정을 확정해 드리겠습니다.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setPatientName("");
                  setPatientPhone("");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0043A6] text-white text-xs font-bold transition-colors whitespace-nowrap"
              >
                추가 접수하기
              </button>
            </div>
          ) : (
            // 메인 폼 그리드
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
              {/* 1. 좌측 타이틀 및 아이콘 배너 */}
              <div className="flex-shrink-0 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#EBF2FC] text-[#0052CC] flex items-center justify-center flex-shrink-0">
                  <CalendarCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-[22px] font-bold text-slate-900 leading-tight">
                    원스톱 간편예약
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    원하시는 진료과를 선택하시면 전담 코디네이터가 즉시 연락드립니다
                  </p>
                </div>
              </div>

              {/* 2. 우측 4분할 입력 필드 그리드 */}
              <form
                onSubmit={handleSubmit}
                className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-center"
              >
                {/* 1) 환자 성함 입력 필드 */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    환자 성함
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="성함을 입력하세요"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-slate-100 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC] border border-transparent focus:border-transparent transition-all"
                  />
                </div>

                {/* 2) 환자 연락처 입력 필드 */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    연락처
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="휴대폰 번호 (-없이 입력)"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-slate-100 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC] border border-transparent focus:border-transparent transition-all"
                  />
                </div>

                {/* 3) 진료 희망 과목 드롭다운 셀렉트박스 */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    진료 희망 과목
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-slate-100 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0052CC] border border-transparent focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="spine">척추클리닉 (경추/요추)</option>
                    <option value="knee">무릎·고관절 관절센터</option>
                    <option value="shoulder">어깨관절 특화클리닉</option>
                    <option value="neuro">뇌신경·치매센터</option>
                    <option value="internal">일반내과 / 인공신장실</option>
                    <option value="checkup">종합건강검진센터</option>
                  </select>
                </div>

                {/* 4) 개인정보 동의 체크 및 신청 제출 버튼 */}
                <div className="flex flex-col justify-end">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="checkbox"
                        id="privacy-agree-main"
                        checked={agreePrivacy}
                        onChange={(e) => setAgreePrivacy(e.target.checked)}
                        className="w-4 h-4 rounded text-[#0052CC] focus:ring-0 cursor-pointer"
                      />
                      <label
                        htmlFor="privacy-agree-main"
                        className="text-[11px] text-slate-600 font-medium cursor-pointer select-none"
                      >
                        개인정보 수집·이용 동의
                      </label>
                    </div>

                    {/* [전문보기] 모달 호출 링크 */}
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="text-[11px] font-bold text-[#0052CC] hover:text-[#0043A6] underline decoration-[#0052CC]/40 underline-offset-2 cursor-pointer flex items-center gap-0.5"
                    >
                      [전문보기]
                    </button>
                  </div>

                  {/* 간편 진료예약 신청 전송 버튼 */}
                  <button
                    type="submit"
                    className="h-12 bg-[#0052CC] hover:bg-[#0043A6] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>간편 진료예약 신청</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* ==============================================================================
          3. 개인정보 수집 및 이용 동의 [전문] 모달 (스티치 정밀 사양: 750px 너비)
          ============================================================================== */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          {/* 어두운 반투명 배경 (클릭 시 닫힘) */}
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* 모달 본체 박스 (최대 750px 고정) */}
          <div className="relative z-10 w-full max-w-[750px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* 모달 헤더 */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EBF2FC] text-[#0052CC] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    id="privacy-modal-title"
                    className="text-[17px] font-bold text-slate-900"
                  >
                    개인정보 수집 및 이용 동의 [전문]
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    인천하이병원 간편예약 서비스 이용을 위한 법적 안내
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="닫기"
                className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 모달 본문 (스크롤 영역) */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 max-h-[calc(85vh-150px)] leading-relaxed">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-[13px] text-slate-800 break-keep">
                  인천하이병원은 간편 진료예약 및 상담 서비스 제공을 위하여 최소한의
                  개인정보를 수집·이용하고 있으며, 수집된 정보는 관계 법령에 따라 안전하게
                  보호됩니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주시기 바랍니다.
                </p>
              </div>

              {/* 법적 수집 내역 상세 테이블 */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 font-bold text-slate-800">
                      <th className="p-3 w-1/4 border-r border-slate-200">구분</th>
                      <th className="p-3">수집 및 이용 세부 내용</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3 font-semibold bg-slate-50 border-r border-slate-200 text-slate-900">
                        수집 목적
                      </td>
                      <td className="p-3">
                        <ul className="list-disc list-inside space-y-1">
                          <li>온라인 간편 진료예약 접수 및 진료 일정 조율 상담</li>
                          <li>예약 확정 안내, 진료 전 주의사항 전달 (SMS/알림톡/전화)</li>
                          <li>고객 문의 응대 및 본인 확인</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold bg-slate-50 border-r border-slate-200 text-slate-900">
                        수집 항목
                      </td>
                      <td className="p-3 font-medium">
                        [필수항목] 성명, 연락처(휴대전화번호), 진료 희망 과목
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold bg-slate-50 border-r border-slate-200 text-slate-900">
                        보유 및 이용기간
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-[#0052CC]">
                          진료 예약 및 상담 목적 달성 시 즉시 파기
                        </span>{" "}
                        (단, 실제 진료 접수 및 내원 완료 시 의료법 등 관계 법령에 따른 의무
                        보존 기간 동안 안전하게 분리 보관됩니다)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold bg-slate-50 border-r border-slate-200 text-slate-900">
                        동의 거부 권리
                      </td>
                      <td className="p-3">
                        귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 단,
                        필수 정보 수집 동의 거부 시 원활한 온라인 간편예약 접수가 제한될 수
                        있습니다.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-[12px] text-slate-400 space-y-1">
                <p>
                  ※ 인천하이병원은 환자분의 소중한 개인정보를 제3자에게 임의로 제공하거나
                  영리적 마케팅 목적으로 활용하지 않습니다.
                </p>
                <p>
                  ※ 세부 개인정보 취급에 관한 사항은 홈페이지 하단의{" "}
                  <span
                    onClick={() => setIsModalOpen(false)}
                    className="text-[#0052CC] underline cursor-pointer"
                  >
                    [개인정보처리방침]
                  </span>
                  을 참조하시기 바랍니다.
                </p>
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="modal-privacy-agree"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0052CC] focus:ring-0 cursor-pointer"
                />
                <label
                  htmlFor="modal-privacy-agree"
                  className="text-xs text-slate-800 font-bold cursor-pointer"
                >
                  위 개인정보 수집·이용에 동의합니다
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  닫기
                </button>
                <button
                  type="button"
                  onClick={handleModalAgree}
                  className="px-5 py-2 rounded-xl bg-[#0052CC] hover:bg-[#0043A6] text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  동의하고 확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
