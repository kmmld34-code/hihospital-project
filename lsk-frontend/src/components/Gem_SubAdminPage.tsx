"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  RotateCcw, 
  Upload, 
  Plus, 
  Trash2, 
  Copy, 
  ChevronUp, 
  ChevronDown, 
  ExternalLink,
  Layers, 
  Type, 
  Image as ImageIcon,
  CheckCircle2, 
  FileCheck,
  UserCheck,
  Sliders,
  Sparkles,
  ShoppingBag,
  Lightbulb,
  AlertTriangle,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Database,
  FolderOpen,
  PlusCircle,
  Check,
  Film
} from "lucide-react";

/**
 * ==============================================================================
 * [인천하이병원] 차세대 블록 조립형 서브관리자 빌더 시스템 (Gem_SubAdminPage.tsx)
 * ==============================================================================
 * 
 * [대표님 지시사항 100% 반영]
 * 1. 화이트 바탕, 깔끔한 검정 글씨 (신뢰감 높은 병원 공식 라이트 모드)
 * 2. 컴포넌트 명칭 통일: 좌측 팔레트와 우측 캔버스의 블록 이름이 1:1 완벽 일치
 * 3. 기존 뇌신경 상세페이지 원본 100% 안전 보존 (별도 신규 빌더 파이프라인 분리)
 * 4. 병원 전체 메인/하위 메뉴 빈 페이지 불러오기 & RDBMS(Supabase/API) 영구 저장 연동
 * ==============================================================================
 */

// 서브페이지 블록 규격 정의
export interface PageBlockItem {
  id: string;
  type: 
    | "SECTION_TITLE"       // 1. 대제목 & 소제목
    | "READABLE_TEXT"       // 2. 가독성 텍스트 문단
    | "TEXT_WITH_IMAGE"     // 3. 텍스트 + 이미지 조화
    | "DOCTOR_PROFILE"      // 4. 인물/프로필 소개 박스
    | "PRODUCT_CAROUSEL"    // 5. 범용 카드 슬라이더 (Gem_UniversalCardSlider)
    | "TIP_CALLOUT"         // 6. 하이라이트 권고/경고 박스
    | "DISEASE_GRID"        // 7. 굵은 라인형 강조 카드
    | "RED_FLAGS"           // 8. 체크리스트/경고 목록 카드
    | "IMAGE_BLOCK"         // 9. 풀스크린/분할 이미지 박스
    | "VIDEO_BLOCK";        // 10. 풀스크린/분할 비디오 박스
  typeName: string;         // 좌측 팔레트와 1:1 동일한 한글 명칭
  props: {
    align: "left" | "center" | "right";
    animation: boolean;       // 스크롤 감속 리빌(1.1s) 자동
    bgTheme: "white" | "green" | "cream" | "wide_image";
    bgImage?: string;         // 배경 이미지 URL
    bgImageFileName?: string; // 배경 이미지 파일명
    paddingY: "compact" | "standard" | "spacious";
    smartBalance: boolean;    // Auto-Fit 및 Equal-Height
  };
  data: any;
}

// 8대 컴포넌트 정식 규격 명칭 맵 (범용 명칭 적용)
const COMPONENT_NAMES: Record<PageBlockItem["type"], string> = {
  SECTION_TITLE: "대제목 & 소제목",
  READABLE_TEXT: "가독성 텍스트 문단",
  TEXT_WITH_IMAGE: "텍스트 + 이미지 조화",
  DOCTOR_PROFILE: "인물/프로필 소개 박스",
  PRODUCT_CAROUSEL: "범용 카드 슬라이더 (Gem_UniversalCardSlider)",
  TIP_CALLOUT: "하이라이트 권고/경고 박스",
  DISEASE_GRID: "굵은 라인형 강조 카드",
  RED_FLAGS: "체크리스트/경고 목록 카드",
  IMAGE_BLOCK: "풀스크린/분할 이미지 박스",
  VIDEO_BLOCK: "풀스크린/분할 비디오 박스",
};

// 병원 전체 메인메뉴 및 하위 서브페이지 목록 (빈 페이지 로드용)
const HOSPITAL_MENU_TREE = [
  {
    category: "척추센터",
    subpages: [
      { key: "spine/cervical-disc", name: "목디스크 클리닉" },
      { key: "spine/lumbar-disc", name: "허리디스크 클리닉" },
      { key: "spine/stenosis", name: "척추관협착증 클리닉" },
      { key: "spine/turtle-neck", name: "거북목·일자목" },
      { key: "spine/cervical-stenosis", name: "경추 척추관협착증" },
      { key: "spine/lumbar-stenosis", name: "요추 척추관협착증" },
      { key: "spine/compression-fracture", name: "압박골절·측만증" },
      { key: "spine/spondylolisthesis", name: "척추전방전위증" },
      { key: "spine/decompression-neuroplasty", name: "감압신경성형술" },
      { key: "spine/rf-nucleoplasty", name: "고주파수핵성형술" },
      { key: "spine/nerve-block", name: "선택적신경차단술" },
      { key: "spine/microscopic", name: "미세현미경 디스크제거술" },
      { key: "spine/vertebroplasty", name: "척추체성형술" },
    ],
  },
  {
    category: "관절센터",
    subpages: [
      { key: "joint/knee-arthroplasty", name: "무릎 인공관절 클리닉" },
      { key: "joint/shoulder-rotator", name: "어깨 회전근개파열" },
      { key: "joint/arthritis", name: "퇴행성관절염" },
      { key: "joint/sports", name: "스포츠손상 재활" },
    ],
  },
  {
    category: "내과 & 검진센터",
    subpages: [
      { key: "internal/checkup", name: "종합건강검진 프로그램" },
      { key: "internal/endoscopy", name: "위·대장 수면내시경" },
      { key: "internal/chronic", name: "만성질환(고혈압/당뇨)" },
    ],
  },
  {
    category: "뇌신경센터 (신규 빌더 테스트용)",
    subpages: [
      { key: "neurosurgery/builder-preview", name: "블록빌더 신규 페이지 (테스트용)" },
    ],
  },
];

export default function Gem_SubAdminPage() {
  // 상단 GNB 탭 상태
  const [activeGnb, setActiveGnb] = useState<"content" | "main" | "reserve" | "hours" | "doctors">("content");

  // 현재 선택된 서브페이지 키
  const [currentSubpageKey, setCurrentSubpageKey] = useState("spine/lumbar-disc");

  // 등록된 블록 목록 상태 (현재 선택된 서브페이지의 블록들)
  const [blocks, setBlocks] = useState<PageBlockItem[]>([]);

  // RDBMS 로딩 상태 & 토스트
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // 파일 업로드 관련 상태
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadBlockId, setActiveUploadBlockId] = useState<string | null>(null);

  // 현재 선택된 카테고리/페이지 정보
  const currentCategoryInfo = HOSPITAL_MENU_TREE.flatMap((cat) =>
    cat.subpages.map((sub) => ({ ...sub, category: cat.category }))
  ).find((item) => item.key === currentSubpageKey) || {
    key: currentSubpageKey,
    name: "새 페이지",
    category: "일반",
  };

  // 1. 서브페이지 변경 시 RDBMS에서 데이터 조회 (GET /api/admin/subpages)
  useEffect(() => {
    async function loadPageFromRDBMS() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/admin/subpages?page_key=${encodeURIComponent(currentSubpageKey)}`);
        const json = await res.json();

        if (json.success && json.data && json.data.blocks && json.data.blocks.length > 0) {
          setBlocks(json.data.blocks);
        } else {
          // RDBMS에 아직 등록되지 않은 깨끗한 빈 페이지
          setBlocks([]);
        }
      } catch (err) {
        console.error("RDBMS 로드 오류:", err);
        setBlocks([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadPageFromRDBMS();
  }, [currentSubpageKey]);

  // 2. 블록 추가 핸들러 (좌측 팔레트 클릭 시)
  const handleAddBlock = (type: PageBlockItem["type"]) => {
    const newId = `blk_${Date.now()}`;
    const typeName = COMPONENT_NAMES[type];
    let newBlock: PageBlockItem;

    switch (type) {
      case "SECTION_TITLE":
        newBlock = {
          id: newId,
          type,
          typeName,
          props: { align: "center", animation: true, bgTheme: "white", paddingY: "standard", smartBalance: true },
          data: { badgeText: "", mainTitle: "", leadText: "" },
        };
        break;
      case "READABLE_TEXT":
        newBlock = {
          id: newId,
          type,
          typeName,
          props: { align: "left", animation: true, bgTheme: "white", paddingY: "standard", smartBalance: true },
          data: { 
            highlightText: "",
            paragraph: "",
            textAlign: "left",
            widthMode: "full"
          },
        };
        break;
      case "TEXT_WITH_IMAGE":
        newBlock = {
          id: newId,
          type,
          typeName,
          props: { align: "left", animation: true, bgTheme: "white", paddingY: "standard", smartBalance: true },
          data: {
            imageMode: "standard",
            imagePosition: "right",
            customImage: "",
            customImageFileName: "선택된 이미지 없음",
            heading: "",
            description: "",
          },
        };
        break;
      case "DOCTOR_PROFILE":
        newBlock = {
          id: newId,
          type,
          typeName,
          props: { align: "left", animation: true, bgTheme: "white", paddingY: "standard", smartBalance: true },
          data: {
            doctorName: "",
            department: "",
            career: "",
            specialty: "",
            quote: "",
            customImage: "",
            customImageFileName: "원장님 프로필 사진",
            linkUrl: "",
            linkTarget: "_blank",
          },
        };
        break;
      case "PRODUCT_CAROUSEL":
        newBlock = {
          id: newId,
          type,
          typeName,
          props: { align: "center", animation: true, bgTheme: "white", paddingY: "standard", smartBalance: true },
          data: {
            carouselTitle: "",
            speed: 3000,
            autoPlay: true,
            cards: [
              { title: "", desc: "", tag: "", imageUrl: "", linkUrl: "", linkTarget: "_blank" },
              { title: "", desc: "", tag: "", imageUrl: "", linkUrl: "", linkTarget: "_blank" },
              { title: "", desc: "", tag: "", imageUrl: "", linkUrl: "", linkTarget: "_blank" },
              { title: "", desc: "", tag: "", imageUrl: "", linkUrl: "", linkTarget: "_blank" },
            ],
          },
        };
        break;
      case "TIP_CALLOUT":
        newBlock = {
          id: newId,
          type,
          typeName,
          props: { align: "left", animation: true, bgTheme: "white", paddingY: "standard", smartBalance: true },
          data: {
            tipText: "",
            highlightText: "",
          },
        };
        break;
      case "DISEASE_GRID":
        newBlock = {
          id: newId,
          type,
          typeName,
          props: { align: "center", animation: true, bgTheme: "green", paddingY: "standard", smartBalance: true },
          data: {
            badgeText: "",
            items: [
              { name: "", desc: "", cure: "", imageUrl: "", linkUrl: "", linkTarget: "_blank" },
              { name: "", desc: "", cure: "", imageUrl: "", linkUrl: "", linkTarget: "_blank" },
            ],
          },
        };
        break;
      case "RED_FLAGS":
        newBlock = {
          id: newId,
          type,
          typeName,
          props: { align: "left", animation: true, bgTheme: "green", paddingY: "standard", smartBalance: true },
          data: {
            subTitle: "sub title",
            warningTitle: "",
            description: "",
            highlightBottom: "",
            flags: ["", "", ""],
          },
        };
        break;
      case "IMAGE_BLOCK":
        newBlock = {
          id: newId,
          type,
          typeName,
          props: { align: "center", animation: true, bgTheme: "white", paddingY: "standard", smartBalance: true },
          data: { mediaUrl: "", title: "", desc: "", linkUrl: "", linkTarget: "_blank", widthMode: "full" },
        };
        break;
      case "VIDEO_BLOCK":
        newBlock = {
          id: newId,
          type,
          typeName,
          props: { align: "center", animation: true, bgTheme: "white", paddingY: "standard", smartBalance: true },
          data: { mediaUrl: "", title: "", desc: "", linkUrl: "", linkTarget: "_blank", widthMode: "full" },
        };
        break;
    }

    setBlocks((prev) => [...prev, newBlock]);
  };

  // 3. 블록 순서 이동
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setBlocks((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === blocks.length - 1) return;
    setBlocks((prev) => {
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  // 4. 블록 복제 및 삭제
  const handleDuplicate = (index: number) => {
    const target = blocks[index];
    const duplicated: PageBlockItem = {
      ...JSON.parse(JSON.stringify(target)),
      id: `blk_${Date.now()}`,
    };
    setBlocks((prev) => {
      const next = [...prev];
      next.splice(index + 1, 0, duplicated);
      return next;
    });
  };

  const handleDelete = (index: number) => {
    if (confirm("이 컴포넌트 블록을 삭제하시겠습니까?")) {
      setBlocks((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // 5. 이미지 파일 업로드 (컴포넌트 및 캐러셀 카드 동시 지원)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadBlockId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setBlocks((prev) =>
        prev.map((b) => {
          // 캐러셀 카드 및 굵은 라인형 강조 카드 이미지 업로드 처리 (형식: blockId:cardIndex)
          if (activeUploadBlockId.includes(":")) {
            const [bId, cIdxStr] = activeUploadBlockId.split(":");
            if (b.id === bId) {
              if (cIdxStr === "media") {
                // 이미지/비디오 컴포넌트 업로드 처리
                return { ...b, data: { ...b.data, mediaUrl: result } };
              } else if (cIdxStr === "bg") {
                // 추가할 내용: 배경 이미지
                return { ...b, props: { ...b.props, bgImage: result, bgImageFileName: file.name } };
              } else {
                const cIdx = parseInt(cIdxStr, 10);
                if (b.type === "PRODUCT_CAROUSEL") {
                  const nextCards = [...b.data.cards];
                  nextCards[cIdx].imageUrl = result;
                  return { ...b, data: { ...b.data, cards: nextCards } };
                } else if (b.type === "DISEASE_GRID") {
                  const nextItems = [...b.data.items];
                  nextItems[cIdx].imageUrl = result;
                  return { ...b, data: { ...b.data, items: nextItems } };
                }
              }
            }
          }
          // 일반 컴포넌트 업로드 처리
          if (b.id === activeUploadBlockId) {
            return {
              ...b,
              data: {
                ...b.data,
                customImage: result,
                customImageFileName: file.name,
              },
            };
          }
          return b;
        })
      );
      setActiveUploadBlockId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };

  // 6. RDBMS 영구 저장 핸들러 (POST /api/admin/subpages)
  const handleSaveToRDBMS = async () => {
    setIsLoading(true);
    try {
      const payload = {
        page_key: currentSubpageKey,
        category_name: currentCategoryInfo.category,
        subpage_name: currentCategoryInfo.name,
        blocks: blocks,
      };

      const res = await fetch("/api/admin/subpages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setToastMsg(`[${currentCategoryInfo.name}] 페이지가 RDBMS 데이터베이스에 성공적으로 저장되었습니다!`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
      } else {
        alert("저장 실패: " + json.error);
      }
    } catch (err: any) {
      alert("RDBMS 저장 중 네트워크 오류 발생: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 7. 블록 비우기 (초기화)
  const handleClearBlocks = () => {
    if (confirm("현재 페이지의 모든 블록을 비우고 빈 페이지로 만드시겠습니까?")) {
      setBlocks([]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 flex flex-col font-sans select-none">
      {/* =========================================================================
          1. 상단 글로벌 네비게이션 바 (GNB) - 화이트 & 다크그레이 깔끔한 테마
          ========================================================================= */}
      <header className="sticky top-0 z-50 h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>병원 홈으로</span>
          </Link>
          <div className="h-5 w-px bg-slate-200" />

          {/* 상단 가로 메뉴 탭 */}
          <nav className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveGnb("content")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeGnb === "content"
                  ? "bg-[#0C7657] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>컨텐츠(상세페이지) 관리</span>
            </button>
            <button
              onClick={() => setActiveGnb("main")}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                activeGnb === "main" ? "bg-[#0C7657] text-white" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              메인페이지 관리
            </button>
            <button
              onClick={() => setActiveGnb("reserve")}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                activeGnb === "reserve" ? "bg-[#0C7657] text-white" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              예약 관리
            </button>
            <button
              onClick={() => setActiveGnb("hours")}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                activeGnb === "hours" ? "bg-[#0C7657] text-white" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              진료시간 안내
            </button>
            <button
              onClick={() => setActiveGnb("doctors")}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                activeGnb === "doctors" ? "bg-[#0C7657] text-white" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              원장님 소개 관리
            </button>
          </nav>
        </div>

        {/* 우측 글로벌 액션 버튼 */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${currentSubpageKey}`}
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#0C7657] bg-slate-100 hover:bg-emerald-50 transition border border-slate-300"
          >
            <span>실제 페이지 확인</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleClearBlocks}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 transition border border-slate-200"
            title="현재 블록 모두 비우기"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>블록 비우기</span>
          </button>
          <button
            onClick={handleSaveToRDBMS}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0C7657] hover:bg-[#085B42] transition shadow-md flex-shrink-0"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isLoading ? "저장 중..." : "저장하기"}</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. 메인 워크스페이스 (화이트 바탕 / 좌측 8대 블록 꾸러미 / 우측 조립 캔버스)
          ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* -----------------------------------------------------------------------
            [좌측 세로 메뉴바] 컴포넌트 팔레트 (화이트 테마)
            ----------------------------------------------------------------------- */}
        <aside className="w-80 border-r border-slate-200 bg-white flex flex-col flex-shrink-0 overflow-y-auto">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0C7657]" />
              <span>컴포넌트 블록 꾸러미</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-1">
              원하는 컴포넌트를 클릭하면 우측 캔버스에 즉시 추가됩니다.
            </p>
          </div>

          {/* 블록 라이브러리 목록 (8종) */}
          <div className="p-3 space-y-2">
            {/* 1. 대제목 & 소제목 */}
            <button
              onClick={() => handleAddBlock("SECTION_TITLE")}
              className="w-full p-3 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-[#0C7657] text-left transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0C7657] flex items-center justify-center font-bold">
                  <Type className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#0C7657]">대제목 &amp; 소제목</p>
                  <p className="text-[10px] text-slate-400">알약 뱃지 + 대제목 + 리드문</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#0C7657]" />
            </button>

            {/* 2. 가독성 텍스트 문단 */}
            <button
              onClick={() => handleAddBlock("READABLE_TEXT")}
              className="w-full p-3 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-[#0C7657] text-left transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0C7657] flex items-center justify-center">
                  <AlignLeft className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#0C7657]">가독성 텍스트 문단</p>
                  <p className="text-[10px] text-slate-400">1400px 여유 호흡 레이아웃</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#0C7657]" />
            </button>

            {/* 3. 텍스트 + 이미지 조화 */}
            <button
              onClick={() => handleAddBlock("TEXT_WITH_IMAGE")}
              className="w-full p-3 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-[#0C7657] text-left transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0C7657] flex items-center justify-center">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#0C7657]">텍스트 + 이미지 조화</p>
                  <p className="text-[10px] text-slate-400">표준 320px vs 1400px 와이드 z-0</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#0C7657]" />
            </button>

            {/* 4. 인물/프로필 소개 박스 */}
            <button
              onClick={() => handleAddBlock("DOCTOR_PROFILE")}
              className="w-full p-3 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-[#0C7657] text-left transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0C7657] flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#0C7657]">인물/프로필 소개 박스</p>
                  <p className="text-[10px] text-slate-400">사진 + 직책 + 이력 리스트</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#0C7657]" />
            </button>

            {/* 5. 범용 카드 슬라이더 (Gem_UniversalCardSlider) */}
            <button
              onClick={() => handleAddBlock("PRODUCT_CAROUSEL")}
              className="w-full p-3 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-[#0C7657] text-left transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0C7657] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#0C7657]">범용 카드 슬라이더 (Gem_UniversalCardSlider)</p>
                  <p className="text-[10px] text-slate-400">우측 ➔ 좌측 이동 무한 롤링</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#0C7657]" />
            </button>

            {/* 6. 하이라이트 권고/경고 박스 */}
            <button
              onClick={() => handleAddBlock("TIP_CALLOUT")}
              className="w-full p-3 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-[#0C7657] text-left transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#0C7657]">하이라이트 권고/경고 박스</p>
                  <p className="text-[10px] text-slate-400">풀와이드 중요 메시지 강조</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#0C7657]" />
            </button>

            {/* 7. 굵은 라인형 강조 카드 */}
            <button
              onClick={() => handleAddBlock("DISEASE_GRID")}
              className="w-full p-3 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-[#0C7657] text-left transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0C7657] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#0C7657]">굵은 라인형 강조 카드</p>
                  <p className="text-[10px] text-slate-400">아이콘/이미지 및 세로 정렬</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#0C7657]" />
            </button>

            {/* 8. 체크리스트/경고 목록 카드 */}
            <button
              onClick={() => handleAddBlock("RED_FLAGS")}
              className="w-full p-3 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-[#0C7657] text-left transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#0C7657]">체크리스트/경고 목록 카드</p>
                  <p className="text-[10px] text-slate-400">주의/경고 플래그 리스트</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#0C7657]" />
            </button>

            {/* 9. 풀스크린/분할 이미지 박스 */}
            <button
              onClick={() => handleAddBlock("IMAGE_BLOCK")}
              className="w-full p-3 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-[#0C7657] text-left transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0C7657] flex items-center justify-center">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#0C7657]">풀스크린/분할 이미지 박스</p>
                  <p className="text-[10px] text-slate-400">100% 또는 50% 가로 폭 지원</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#0C7657]" />
            </button>

            {/* 10. 풀스크린/분할 비디오 박스 */}
            <button
              onClick={() => handleAddBlock("VIDEO_BLOCK")}
              className="w-full p-3 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-[#0C7657] text-left transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#0C7657]">풀스크린/분할 비디오 박스</p>
                  <p className="text-[10px] text-slate-400">유튜브 임베드 및 동영상 오버레이</p>
                </div>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#0C7657]" />
            </button>
          </div>
        </aside>

        {/* -----------------------------------------------------------------------
            [우측 조립형 캔버스] 화이트/라이트 테마 & RDBMS 동기화 작업대
            ----------------------------------------------------------------------- */}
        <main className="flex-1 flex flex-col bg-slate-100/60 overflow-y-auto">
          {/* 상단 서브페이지 선택 바 (병원 전체 메뉴 트리 지원) */}
          <div className="h-14 border-b border-slate-200 bg-white px-6 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <FolderOpen className="w-4 h-4 text-[#0C7657]" />
                <span>서브페이지 선택:</span>
              </span>

              {/* 병원 전체 카테고리/서브페이지 드롭다운 */}
              <select
                value={currentSubpageKey}
                onChange={(e) => setCurrentSubpageKey(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-[#0C7657] font-bold focus:outline-none focus:border-[#0C7657]"
              >
                {HOSPITAL_MENU_TREE.map((group) => (
                  <optgroup key={group.category} label={`[ ${group.category} ]`}>
                    {group.subpages.map((sub) => (
                      <option key={sub.key} value={sub.key}>
                        {group.category} &gt; {sub.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <span className="text-slate-400">|</span>
              <span className="text-[11px] text-slate-500">
                등록된 블록: <strong className="text-slate-800 font-bold">{blocks.length}개</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-500 text-[11px]">
                변경 후 우측 상단 <strong>[저장하기]</strong>를 클릭하세요.
              </span>
            </div>
          </div>

          {/* 블록 적층 캔버스 본문 */}
          <div className="p-6 max-w-5xl w-full mx-auto space-y-6">
            {/* 빈 페이지 상태 안내 */}
            {blocks.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-16 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#0C7657] flex items-center justify-center mx-auto">
                  <PlusCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-800">
                    [{currentCategoryInfo.name}] 페이지가 현재 비어 있습니다
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    좌측의 <strong>컴포넌트 블록 꾸러미</strong>에서 원하는 요소를 클릭하여 순서대로 쌓아 올리세요. 작성이 끝나면 상단 [RDBMS에 영구 저장]을 누르면 완성됩니다!
                  </p>
                </div>
              </div>
            ) : (
              blocks.map((block, index) => (
                <div
                  key={block.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-slate-300 transition"
                >
                  {/* 1. 블록 헤더: [좌측 팔레트와 1:1 완벽 동일한 명칭 표기] */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-100/70 border border-emerald-200 text-[#0C7657] font-mono text-xs font-bold">
                        #{index + 1}
                      </span>
                      {/* 컴포넌트 명칭 통일 */}
                      <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                        {block.typeName}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">
                        {block.type}
                      </span>
                    </div>

                    {/* 블록 컨트롤 버튼 (위/아래 이동, 복제, 삭제) */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-900 disabled:opacity-30"
                        title="위로 이동"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        disabled={index === blocks.length - 1}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-900 disabled:opacity-30"
                        title="아래로 이동"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <div className="h-3.5 w-px bg-slate-200 mx-1" />
                      <button
                        onClick={() => handleDuplicate(index)}
                        className="p-1.5 rounded hover:bg-emerald-50 text-slate-500 hover:text-[#0C7657]"
                        title="블록 복제"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-1.5 rounded hover:bg-rose-50 text-slate-500 hover:text-rose-600"
                        title="블록 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 2. 블록 공통 속성 제어 바 (정렬, 배경 테마, 애니메이션, 스마트 밸런스) */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    {/* 정렬 제어 */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 text-[11px] font-semibold">정렬:</span>
                      <div className="flex items-center bg-white border border-slate-200 rounded p-0.5">
                        <button
                          onClick={() => {
                            const next = [...blocks];
                            next[index].props.align = "left";
                            setBlocks(next);
                          }}
                          className={`p-1 rounded ${block.props.align === "left" ? "bg-[#0C7657] text-white" : "text-slate-500 hover:text-slate-900"}`}
                          title="좌측 정렬"
                        >
                          <AlignLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const next = [...blocks];
                            next[index].props.align = "center";
                            setBlocks(next);
                          }}
                          className={`p-1 rounded ${block.props.align === "center" ? "bg-[#0C7657] text-white" : "text-slate-500 hover:text-slate-900"}`}
                          title="중앙 정렬"
                        >
                          <AlignCenter className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const next = [...blocks];
                            next[index].props.align = "right";
                            setBlocks(next);
                          }}
                          className={`p-1 rounded ${block.props.align === "right" ? "bg-[#0C7657] text-white" : "text-slate-500 hover:text-slate-900"}`}
                          title="우측 정렬"
                        >
                          <AlignRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* 배경 테마 */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 text-[11px] font-semibold">배경 테마:</span>
                      <select
                        value={block.props.bgTheme}
                        onChange={(e) => {
                          const next = [...blocks];
                          next[index].props.bgTheme = e.target.value as any;
                          setBlocks(next);
                        }}
                        className="bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-700 text-xs focus:outline-none"
                      >
                        <option value="white">순백색 (White)</option>
                        <option value="green">하이 딥그린 (#0C7657)</option>
                        <option value="cream">살구빛 크림 (#FAF5F0)</option>
                        <option value="purple">퍼플 (#662D91)</option>
                        <option value="navy">네이비 (#074AAD)</option>
                        <option value="light_gray">연회색 (#F3F4F9)</option>
                        <option value="blue">블루 (#3375C8)</option>
                        <option value="wide_image">1400px 와이드 배경 모드</option>
                      </select>
                      {block.props.bgTheme === "wide_image" && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setActiveUploadBlockId(`${block.id}:bg`);
                              fileInputRef.current?.click();
                            }}
                            className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-700 hover:text-[#0C7657] transition whitespace-nowrap"
                          >
                            <Upload className="w-3 h-3" />
                            {block.props.bgImage ? "배경 사진 변경" : "배경 사진 업로드"}
                          </button>
                          {block.props.bgImage && (
                            <button
                              onClick={() => {
                                const next = [...blocks];
                                next[index].props.bgImage = "";
                                next[index].props.bgImageFileName = "";
                                setBlocks(next);
                              }}
                              className="text-[10px] text-rose-500 hover:underline whitespace-nowrap"
                            >
                              삭제
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 애니메이션 자동 */}
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={block.props.animation}
                        onChange={(e) => {
                          const next = [...blocks];
                          next[index].props.animation = e.target.checked;
                          setBlocks(next);
                        }}
                        className="rounded border-slate-300 text-[#0C7657] focus:ring-0"
                      />
                      <span className="text-[11px]">1.1s 감속 스크롤 리빌 자동</span>
                    </label>

                    {/* 스마트 밸런스 */}
                    <label className="flex items-center gap-1.5 cursor-pointer text-[#0C7657] font-bold">
                      <input
                        type="checkbox"
                        checked={block.props.smartBalance}
                        onChange={(e) => {
                          const next = [...blocks];
                          next[index].props.smartBalance = e.target.checked;
                          setBlocks(next);
                        }}
                        className="rounded border-slate-300 text-[#0C7657] focus:ring-0"
                      />
                      <span className="text-[11px]">Auto-Fit &amp; 높이 정렬</span>
                    </label>
                  </div>

                  {/* 3. 블록별 고유 데이터 입력 폼 (화이트 테마) */}
                  {/* [1. 대제목 & 소제목] */}
                  {block.type === "SECTION_TITLE" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 mb-1 block">알약형 뱃지 문구</label>
                        <input
                          type="text"
                          value={block.data.badgeText}
                          onChange={(e) => {
                            const next = [...blocks];
                            next[index].data.badgeText = e.target.value;
                            setBlocks(next);
                          }}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#0C7657]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 mb-1 block">대제목</label>
                        <input
                          type="text"
                          value={block.data.mainTitle}
                          onChange={(e) => {
                            const next = [...blocks];
                            next[index].data.mainTitle = e.target.value;
                            setBlocks(next);
                          }}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#0C7657]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[11px] font-semibold text-slate-600 mb-1 block">인트로 리드문구</label>
                        <textarea
                          rows={2}
                          value={block.data.leadText}
                          onChange={(e) => {
                            const next = [...blocks];
                            next[index].data.leadText = e.target.value;
                            setBlocks(next);
                          }}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#0C7657]"
                        />
                      </div>
                    </div>
                  )}

                  {/* [2. 가독성 텍스트 문단] */}
                  {block.type === "READABLE_TEXT" && (
                    <div className="space-y-3 pt-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2 pb-3 border-b border-slate-200">
                        {/* 정렬 옵션 */}
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">문단 정렬</label>
                          <div className="flex gap-2">
                            {["left", "center", "right"].map((alignOpt) => (
                              <button
                                key={alignOpt}
                                onClick={() => {
                                  const next = [...blocks];
                                  next[index].data.textAlign = alignOpt;
                                  setBlocks(next);
                                }}
                                className={`flex-1 py-1 text-xs font-bold border rounded transition ${
                                  (block.data.textAlign || "center") === alignOpt
                                    ? "bg-[#0C7657] text-white border-[#0C7657]"
                                    : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                {alignOpt === "left" ? "좌측정렬" : alignOpt === "center" ? "가운데정렬" : "우측정렬"}
                              </button>
                            ))}
                          </div>
                        </div>
                        {/* 50% 분할 옵션 */}
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">가로 크기 (100% / 50%)</label>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                const next = [...blocks];
                                next[index].data.widthMode = "full";
                                setBlocks(next);
                              }}
                              className={`flex-1 py-1 text-xs font-bold border rounded transition ${
                                (block.data.widthMode || "full") === "full"
                                  ? "bg-[#0C7657] text-white border-[#0C7657]"
                                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              100% 전체 사용
                            </button>
                            <button
                              onClick={() => {
                                const next = [...blocks];
                                next[index].data.widthMode = "half";
                                setBlocks(next);
                              }}
                              className={`flex-1 py-1 text-xs font-bold border rounded transition ${
                                block.data.widthMode === "half"
                                  ? "bg-[#0C7657] text-white border-[#0C7657]"
                                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              50% 절반 크기
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 mb-1 block">강조 문구 (타이틀격, 선택사항)</label>
                        <input
                          type="text"
                          placeholder="본문보다 큰 글씨로 윗쪽에 배치될 문구"
                          value={block.data.highlightText || ""}
                          onChange={(e) => {
                            const next = [...blocks];
                            next[index].data.highlightText = e.target.value;
                            setBlocks(next);
                          }}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#0C7657]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 mb-1 block">가독성 높은 본문 (엔터키 줄바꿈 반영)</label>
                        <textarea
                          rows={4}
                          value={block.data.paragraph}
                          onChange={(e) => {
                            const next = [...blocks];
                            next[index].data.paragraph = e.target.value;
                            setBlocks(next);
                          }}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0C7657]"
                        />
                      </div>
                    </div>
                  )}

                  {/* [3. 텍스트 + 이미지 조화] */}
                  {block.type === "TEXT_WITH_IMAGE" && (
                    <div className="space-y-3 pt-1">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-emerald-50 text-[#0C7657] flex items-center justify-center flex-shrink-0">
                            <FileCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">
                              {block.data.customImageFileName || "선택된 이미지 없음"}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              어떤 비율의 사진이든 정해진 액자(320px/1400px)에 스마트하게 틀어박힘
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={block.data.imageMode}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.imageMode = e.target.value;
                              setBlocks(next);
                            }}
                            className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-[#0C7657] font-bold"
                          >
                            <option value="standard">표준 320px 프레임</option>
                            <option value="wide_image">1400px 와이드 배경 (z-0)</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveUploadBlockId(block.id);
                              fileInputRef.current?.click();
                            }}
                            className="flex items-center gap-1 px-3 py-1 text-xs bg-emerald-50 hover:bg-emerald-100 text-[#0C7657] border border-emerald-300 rounded transition font-bold"
                          >
                            <Upload className="w-3 h-3" />
                            <span>사진 업로드</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">소제목</label>
                          <input
                            type="text"
                            value={block.data.heading}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.heading = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">이미지 배치 위치</label>
                          <select
                            value={block.data.imagePosition}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.imagePosition = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-700"
                          >
                            <option value="right">우측 배치 (Right)</option>
                            <option value="left">좌측 배치 (Left)</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">상세 설명문</label>
                          <textarea
                            rows={2}
                            value={block.data.description}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.description = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* [4. 인물/프로필 소개 박스] */}
                  {block.type === "DOCTOR_PROFILE" && (
                    <div className="space-y-4 pt-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">프로필 사진 파일명</label>
                          <input
                            type="text"
                            readOnly
                            value={block.data.customImageFileName || "선택된 이미지 없음"}
                            className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-500 cursor-not-allowed"
                          />
                        </div>
                        <div className="flex-shrink-0 pt-5">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveUploadBlockId(block.id);
                              fileInputRef.current?.click();
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-emerald-50 hover:bg-emerald-100 text-[#0C7657] border border-emerald-300 rounded transition font-bold"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>사진 업로드</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">인물 이름/성함</label>
                          <input
                            type="text"
                            value={block.data.doctorName}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.doctorName = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">직책 / 세부분야</label>
                          <input
                            type="text"
                            value={block.data.department}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.department = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">주요 사항 (해시태그 형태 권장)</label>
                          <input
                            type="text"
                            value={block.data.specialty || ""}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.specialty = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                            placeholder="예: #핵심태그1 #핵심태그2"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">주요 약력 (엔터로 구분)</label>
                          <textarea
                            rows={3}
                            value={block.data.career}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.career = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">핵심 인용구 (철학/슬로건)</label>
                          <textarea
                            rows={3}
                            value={block.data.quote}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.quote = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">바로가기 링크 주소 (비워두면 버튼 숨김)</label>
                          <input
                            type="text"
                            value={block.data.linkUrl || ""}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.linkUrl = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                            placeholder="예: /spine/lumbar-disc"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* [5. 범용 카드 슬라이더 (Gem_UniversalCardSlider)] */}
                  {block.type === "PRODUCT_CAROUSEL" && (
                    <div className="space-y-4 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">캐러셀 메인 제목</label>
                          <input
                            type="text"
                            value={block.data.carouselTitle}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.carouselTitle = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#0C7657]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">롤링 속도 (ms)</label>
                          <select
                            value={block.data.speed}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.speed = Number(e.target.value);
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-[#0C7657]"
                          >
                            <option value={2000}>2초 (매우 빠르게)</option>
                            <option value={3000}>3초 (빠르게)</option>
                            <option value={4000}>4초 (보통)</option>
                            <option value={5000}>5초 (부드럽게)</option>
                            <option value={6000}>6초 (매우 부드럽게)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 mb-1 block">아이템 관리</label>
                          <button
                            onClick={() => {
                              const next = [...blocks];
                              next[index].data.cards.push({ title: "", desc: "", tag: "", imageUrl: "", linkUrl: "", linkTarget: "_blank" });
                              setBlocks(next);
                            }}
                            className="w-full bg-[#0C7657] hover:bg-[#085B42] text-white rounded px-3 py-1.5 text-xs font-bold transition flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>새 카드 추가하기</span>
                          </button>
                        </div>
                      </div>

                      {/* 캐러셀 개별 아이템(Card) 리스트 관리 UI */}
                      <div className="space-y-3">
                        <label className="text-[11px] font-semibold text-slate-600 block border-b border-slate-200 pb-1">캐러셀 카드 목록 세부설정 (블록 쌓기)</label>
                        {block.data.cards.map((card: any, cIdx: number) => (
                          <div key={cIdx} className="bg-slate-50 rounded-xl border border-slate-200 p-3 flex flex-col gap-3 relative group">
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                              <button
                                onClick={() => {
                                  if(confirm("이 카드를 삭제하시겠습니까?")) {
                                    const next = [...blocks];
                                    next[index].data.cards.splice(cIdx, 1);
                                    setBlocks(next);
                                  }
                                }}
                                className="p-1 bg-white border border-rose-200 text-rose-500 rounded hover:bg-rose-50"
                                title="카드 삭제"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-2 pr-8">
                              <span className="w-5 h-5 rounded bg-emerald-100 text-[#0C7657] text-[10px] font-bold flex items-center justify-center shrink-0">
                                {cIdx + 1}
                              </span>
                              <input
                                type="text"
                                placeholder="태그 (예: 맞춤치료)"
                                value={card.tag}
                                onChange={(e) => {
                                  const next = [...blocks];
                                  next[index].data.cards[cIdx].tag = e.target.value;
                                  setBlocks(next);
                                }}
                                className="w-24 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-emerald-700 font-bold focus:outline-none focus:border-[#0C7657]"
                              />
                              <input
                                type="text"
                                placeholder="카드 제목"
                                value={card.title}
                                onChange={(e) => {
                                  const next = [...blocks];
                                  next[index].data.cards[cIdx].title = e.target.value;
                                  setBlocks(next);
                                }}
                                className="flex-1 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#0C7657]"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pl-7">
                              <div className="md:col-span-1">
                                <input
                                  type="text"
                                  placeholder="설명 (서브 텍스트)"
                                  value={card.desc}
                                  onChange={(e) => {
                                    const next = [...blocks];
                                    next[index].data.cards[cIdx].desc = e.target.value;
                                    setBlocks(next);
                                  }}
                                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:border-[#0C7657]"
                                />
                              </div>
                              <div className="md:col-span-1">
                                <input
                                  type="text"
                                  placeholder="클릭 시 이동할 링크 URL (선택)"
                                  value={card.linkUrl}
                                  onChange={(e) => {
                                    const next = [...blocks];
                                    next[index].data.cards[cIdx].linkUrl = e.target.value;
                                    setBlocks(next);
                                  }}
                                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-blue-600 focus:outline-none focus:border-[#0C7657]"
                                />
                              </div>
                              <div className="md:col-span-1">
                                <select
                                  value={card.linkTarget || "_blank"}
                                  onChange={(e) => {
                                    const next = [...blocks];
                                    next[index].data.cards[cIdx].linkTarget = e.target.value;
                                    setBlocks(next);
                                  }}
                                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:border-[#0C7657]"
                                >
                                  <option value="_blank">새 창으로 열기</option>
                                  <option value="_self">현재 창 이동</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="pl-7 flex items-center gap-2">
                              {card.imageUrl ? (
                                <div className="h-10 w-14 rounded bg-slate-200 border border-slate-300 overflow-hidden relative shrink-0">
                                  <img src={card.imageUrl} alt="카드 이미지" className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="h-10 w-14 rounded bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0">
                                  <ImageIcon className="w-4 h-4 text-slate-300" />
                                </div>
                              )}
                              <button
                                onClick={() => {
                                  setActiveUploadBlockId(`${block.id}:${cIdx}`);
                                  fileInputRef.current?.click();
                                }}
                                className="px-3 py-1 bg-white border border-slate-300 rounded text-xs text-slate-600 hover:text-[#0C7657] hover:border-[#0C7657] transition"
                              >
                                {card.imageUrl ? "이미지 변경" : "이미지 추가"}
                              </button>
                              {card.imageUrl && (
                                <button
                                  onClick={() => {
                                    const next = [...blocks];
                                    next[index].data.cards[cIdx].imageUrl = "";
                                    setBlocks(next);
                                  }}
                                  className="text-[10px] text-rose-500 hover:underline ml-1"
                                >
                                  지우기
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* [6. 하이라이트 권고/경고 박스] */}
                  {block.type === "TIP_CALLOUT" && (
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-amber-700 mb-1 block">메시지 본문</label>
                        <textarea
                          rows={2}
                          value={block.data.tipText}
                          onChange={(e) => {
                            const next = [...blocks];
                            next[index].data.tipText = e.target.value;
                            setBlocks(next);
                          }}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-amber-800 mb-1 block">형광펜 강조 문구</label>
                        <input
                          type="text"
                          value={block.data.highlightText}
                          onChange={(e) => {
                            const next = [...blocks];
                            next[index].data.highlightText = e.target.value;
                            setBlocks(next);
                          }}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                        />
                      </div>
                    </div>
                  )}

                  {/* [7. 굵은 라인형 강조 카드] */}
                  {block.type === "DISEASE_GRID" && (
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-semibold text-slate-600 block">항목별 강조 카드 리스트</label>
                        <button
                          onClick={() => {
                            const next = [...blocks];
                            next[index].data.items.push({ name: "새 항목", desc: "내용", cure: "보조텍스트", imageUrl: "", linkUrl: "", linkTarget: "_blank" });
                            setBlocks(next);
                          }}
                          className="bg-[#0C7657] hover:bg-[#085B42] text-white rounded px-2 py-1 text-[10px] font-bold transition flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>카드 추가</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {block.data.items.map((item: any, iIdx: number) => (
                          <div key={iIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col gap-3 relative group">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                              <button
                                onClick={() => {
                                  if(confirm("이 항목을 삭제하시겠습니까?")) {
                                    const next = [...blocks];
                                    next[index].data.items.splice(iIdx, 1);
                                    setBlocks(next);
                                  }
                                }}
                                className="p-1 bg-white border border-rose-200 text-rose-500 rounded hover:bg-rose-50"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            
                            <div className="flex gap-3">
                              {/* 이미지 업로드 영역 */}
                              <div className="flex flex-col gap-1 items-center justify-start shrink-0">
                                {item.imageUrl ? (
                                  <div className="w-16 h-16 rounded bg-slate-200 border border-slate-300 overflow-hidden relative">
                                    <img src={item.imageUrl} alt="아이콘" className="w-full h-full object-cover" />
                                  </div>
                                ) : (
                                  <div className="w-16 h-16 rounded bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-300">
                                    <ImageIcon className="w-6 h-6" />
                                  </div>
                                )}
                                <button
                                  onClick={() => {
                                    setActiveUploadBlockId(`${block.id}:${iIdx}`);
                                    fileInputRef.current?.click();
                                  }}
                                  className="px-2 py-1 bg-white border border-slate-300 rounded text-[10px] text-slate-600 hover:text-[#0C7657] transition w-16 text-center"
                                >
                                  {item.imageUrl ? "변경" : "이미지"}
                                </button>
                              </div>

                              <div className="flex-1 space-y-2">
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="핵심 타이틀"
                                    value={item.name}
                                    onChange={(e) => {
                                      const next = [...blocks];
                                      next[index].data.items[iIdx].name = e.target.value;
                                      setBlocks(next);
                                    }}
                                    className="w-1/3 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-[#0C7657] font-bold focus:outline-none focus:border-[#0C7657]"
                                  />
                                  <input
                                    type="text"
                                    placeholder="보조 텍스트 (우측 배치)"
                                    value={item.cure}
                                    onChange={(e) => {
                                      const next = [...blocks];
                                      next[index].data.items[iIdx].cure = e.target.value;
                                      setBlocks(next);
                                    }}
                                    className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-emerald-700 font-medium focus:outline-none focus:border-[#0C7657]"
                                  />
                                </div>
                                <textarea
                                  rows={2}
                                  placeholder="설명 본문"
                                  value={item.desc}
                                  onChange={(e) => {
                                    const next = [...blocks];
                                    next[index].data.items[iIdx].desc = e.target.value;
                                    setBlocks(next);
                                  }}
                                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0C7657]"
                                />
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="이동할 링크 URL (선택)"
                                    value={item.linkUrl || ""}
                                    onChange={(e) => {
                                      const next = [...blocks];
                                      next[index].data.items[iIdx].linkUrl = e.target.value;
                                      setBlocks(next);
                                    }}
                                    className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-blue-600 focus:outline-none focus:border-[#0C7657]"
                                  />
                                  <select
                                    value={item.linkTarget || "_blank"}
                                    onChange={(e) => {
                                      const next = [...blocks];
                                      next[index].data.items[iIdx].linkTarget = e.target.value;
                                      setBlocks(next);
                                    }}
                                    className="w-32 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none"
                                  >
                                    <option value="_blank">새 창 열기</option>
                                    <option value="_self">현재 창 이동</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* [8. 체크리스트/경고 목록 카드] */}
                  {block.type === "RED_FLAGS" && (
                    <div className="space-y-3 pt-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-emerald-700 mb-1 block">서브 타이틀 뱃지</label>
                          <input
                            type="text"
                            value={block.data.subTitle ?? "sub title"}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.subTitle = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-rose-700 mb-1 block">목록 메인 타이틀</label>
                          <input
                            type="text"
                            value={block.data.warningTitle}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.warningTitle = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 mb-1 block">목록 메인 타이틀 아래 설명 (선택)</label>
                        <textarea
                          rows={2}
                          value={block.data.description}
                          onChange={(e) => {
                            const next = [...blocks];
                            next[index].data.description = e.target.value;
                            setBlocks(next);
                          }}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-600 block">체크리스트 항목</label>
                        {block.data.flags.map((flag: string, fIdx: number) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold">
                              {fIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={flag}
                              onChange={(e) => {
                                const next = [...blocks];
                                next[index].data.flags[fIdx] = e.target.value;
                                setBlocks(next);
                              }}
                              className="flex-1 bg-white border border-slate-300 rounded px-3 py-1 text-xs text-slate-900"
                            />
                            <button
                              onClick={() => {
                                const next = [...blocks];
                                next[index].data.flags.splice(fIdx, 1);
                                setBlocks(next);
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition"
                              title="항목 삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const next = [...blocks];
                            if (!next[index].data.flags) next[index].data.flags = [];
                            next[index].data.flags.push("");
                            setBlocks(next);
                          }}
                          className="mt-2 flex items-center justify-center gap-1 w-full py-2 bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-lg text-[11px] font-semibold text-slate-600 transition"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          새 항목 추가하기
                        </button>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-rose-700 mb-1 block">하단 강조 문구 한줄 (선택)</label>
                        <input
                          type="text"
                          value={block.data.highlightBottom || ""}
                          onChange={(e) => {
                            const next = [...blocks];
                            next[index].data.highlightBottom = e.target.value;
                            setBlocks(next);
                          }}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-300"
                          placeholder="예: 지체 없이 병원에 방문하셔서 정확한 진단을 받으시길 바랍니다."
                        />
                      </div>
                    </div>
                  )}

                  {/* [9/10. 풀스크린/분할 미디어 박스 (이미지/동영상 공통)] */}
                  {(block.type === "IMAGE_BLOCK" || block.type === "VIDEO_BLOCK") && (
                    <div className="space-y-4 pt-1">
                      {/* 가로 크기 50% 분할 옵션 */}
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 mb-1 block">가로 크기 (100% / 50%)</label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const next = [...blocks];
                              next[index].data.widthMode = "full";
                              setBlocks(next);
                            }}
                            className={`flex-1 py-1 text-xs font-bold border rounded transition ${
                              (block.data.widthMode || "full") === "full"
                                ? "bg-[#0C7657] text-white border-[#0C7657]"
                                : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            100% 전체 폭 사용
                          </button>
                          <button
                            onClick={() => {
                              const next = [...blocks];
                              next[index].data.widthMode = "half";
                              setBlocks(next);
                            }}
                            className={`flex-1 py-1 text-xs font-bold border rounded transition ${
                              block.data.widthMode === "half"
                                ? "bg-[#0C7657] text-white border-[#0C7657]"
                                : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            50% 절반 크기 (조합형)
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 미디어 입력부 */}
                        <div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <label className="text-[11px] font-semibold text-[#0C7657] block">
                            {block.type === "IMAGE_BLOCK" ? "이미지 소스" : "비디오 소스 (유튜브 링크 전용)"}
                          </label>
                          <div className="flex flex-col gap-2">
                            {block.data.mediaUrl ? (
                              <div className="h-32 w-full rounded bg-black border border-slate-300 overflow-hidden relative flex items-center justify-center">
                                {block.type === "IMAGE_BLOCK" ? (
                                  <img src={block.data.mediaUrl} className="w-full h-full object-cover opacity-80" alt="Preview" />
                                ) : (
                                  <span className="text-white text-xs font-bold">비디오 설정됨</span>
                                )}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                                  <button
                                    onClick={() => {
                                      const next = [...blocks];
                                      next[index].data.mediaUrl = "";
                                      setBlocks(next);
                                    }}
                                    className="px-3 py-1 bg-rose-500 text-white rounded text-xs font-bold"
                                  >
                                    삭제
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="h-32 w-full rounded bg-white border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 gap-2">
                                {block.type === "IMAGE_BLOCK" ? <ImageIcon className="w-6 h-6" /> : <Film className="w-6 h-6" />}
                                <span className="text-[10px]">미디어 없음</span>
                              </div>
                            )}
                            
                            <div className="flex gap-2 items-center">
                              <input
                                type="text"
                                placeholder={block.type === "IMAGE_BLOCK" ? "외부 이미지 URL 입력" : "유튜브(YouTube) 공유 링크 URL 입력"}
                                value={block.data.mediaUrl || ""}
                                onChange={(e) => {
                                  const next = [...blocks];
                                  next[index].data.mediaUrl = e.target.value;
                                  setBlocks(next);
                                }}
                                className="flex-1 bg-white border border-slate-300 rounded px-2 py-1.5 text-xs focus:border-[#0C7657] focus:outline-none"
                              />
                              {block.type === "IMAGE_BLOCK" && (
                                <button
                                  onClick={() => {
                                    setActiveUploadBlockId(`${block.id}:media`);
                                    fileInputRef.current?.click();
                                  }}
                                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded text-xs font-bold whitespace-nowrap"
                                >
                                  PC 업로드
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 오버레이 텍스트 및 링크 */}
                        <div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <label className="text-[11px] font-semibold text-[#0C7657] block">이미지 위 텍스트 오버레이</label>
                          <input
                            type="text"
                            placeholder="오버레이 큰 제목 (선택)"
                            value={block.data.title || ""}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.title = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#0C7657]"
                          />
                          <textarea
                            rows={2}
                            placeholder="본문 설명글 (선택)"
                            value={block.data.desc || ""}
                            onChange={(e) => {
                              const next = [...blocks];
                              next[index].data.desc = e.target.value;
                              setBlocks(next);
                            }}
                            className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-[#0C7657]"
                          />
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="버튼 연결 URL (선택)"
                              value={block.data.linkUrl || ""}
                              onChange={(e) => {
                                const next = [...blocks];
                                next[index].data.linkUrl = e.target.value;
                                setBlocks(next);
                              }}
                              className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-blue-600 focus:outline-none focus:border-[#0C7657]"
                            />
                            <select
                              value={block.data.linkTarget || "_blank"}
                              onChange={(e) => {
                                const next = [...blocks];
                                next[index].data.linkTarget = e.target.value;
                                setBlocks(next);
                              }}
                              className="w-28 bg-white border border-slate-300 rounded px-2 py-1 text-[10px] text-slate-700 focus:outline-none"
                            >
                              <option value="_blank">새 창 열기</option>
                              <option value="_self">현재 창 이동</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* 숨김 글로벌 파일 인풋 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* RDBMS 저장 완료 알림 토스트 */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-[#0C7657] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <div>
            <p className="text-xs font-bold">RDBMS 영구 저장 완료</p>
            <p className="text-[11px] text-emerald-100">{toastMsg}</p>
          </div>
        </div>
      )}
    </div>
  );
}
