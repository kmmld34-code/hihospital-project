"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, ShieldCheck } from "lucide-react";

/**
 * ==============================================================================
 * [Gem_QuickReservationBar] 플로팅 간편 진료예약 신청 바
 * ==============================================================================
 * - 규칙: max-w-[1400px] mx-auto 중앙 정렬 박스 내부 배치
 * - 기능: 환자 성함, 연락처, 희망 진료과목 입력 후 즉시 상담 접수
 * - 접두어: Gem_ 접두사 엄수
 * ==============================================================================
 */
export default function Gem_QuickReservationBar() {
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [deptName, setDeptName] = useState("척추클리닉");
  const [agreePrivacy, setAgreePrivacy] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      alert("성함과 연락처를 모두 입력해 주세요.");
      return;
    }
    if (!agreePrivacy) {
      alert("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    // 접수 완료 시뮬레이션
    setIsSubmitted(true);
  };

  return (
    <section className="Gem_QuickResvSection w-full py-2 relative z-30">
      <div className="Gem_Container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="Gem_QuickResvBox bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 sm:p-6 md:p-8">
          {isSubmitted ? (
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900">
              <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                <CheckCircle2 className="w-8 h-8 text-[#0052CC] flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-base">간편 진료예약 신청이 정상 접수되었습니다!</h4>
                  <p className="text-xs text-blue-700">
                    전문 상담 간호사가 남겨주신 연락처({patientPhone})로 빠르게 전화드려 예약을 도와드리겠습니다.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setPatientName("");
                  setPatientPhone("");
                }}
                className="text-xs bg-[#0052CC] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0043A6]"
              >
                추가 예약 신청
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* 좌측 타이틀 안내 */}
              <div className="lg:w-1/4">
                <span className="text-xs font-bold text-[#0052CC] tracking-wider uppercase block">
                  FAST & EASY RESERVATION
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">
                  온라인 <span className="text-[#0052CC]">간편 예약</span> 신청
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  빠르고 친절하게 전담 상담사가 연락드립니다.
                </p>
              </div>

              {/* 중앙 입력 폼 필드들 */}
              <div className="lg:w-2/4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. 환자 성함 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">환자 성함</label>
                  <input
                    type="text"
                    required
                    placeholder="성함 입력"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent bg-slate-50/50"
                  />
                </div>

                {/* 2. 환자 연락처 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">연락처</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent bg-slate-50/50"
                  />
                </div>

                {/* 3. 희망 진료과목 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">희망 진료과목</label>
                  <select
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent bg-slate-50/50"
                  >
                    <option value="척추클리닉">척추클리닉 (목/허리)</option>
                    <option value="관절센터">무릎·고관절 센터</option>
                    <option value="어깨관절">어깨관절 센터</option>
                    <option value="뇌신경센터">뇌신경 (두통/치매)</option>
                    <option value="일반외과">외과 (치핵/하지정맥류)</option>
                    <option value="내과/인공신장">내과 / 인공신장실</option>
                    <option value="건강검진">종합건강검진</option>
                  </select>
                </div>
              </div>

              {/* 우측 동의 및 신청 버튼 */}
              <div className="lg:w-1/4 flex flex-col justify-center space-y-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center bg-[#0052CC] hover:bg-[#0043A6] text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>간편예약 접수하기</span>
                </button>

                {/* 개인정보 수집 동의 */}
                <label className="flex items-center text-[11px] text-slate-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="rounded text-[#0052CC] focus:ring-[#0052CC] mr-1.5"
                  />
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400 mr-1" />
                  <span>개인정보 수집 및 상담 전화 이용 동의 [필수]</span>
                </label>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
