"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GEM_EXTENDED_NAV_ITEMS } from "@/data/navigationData";
import { CATEGORY_HUB_DATA } from "@/data/categoryHubData";
import Gem_SubPageHeader, { SubPageTabItem } from "@/components/Gem_SubPageHeader";
import Gem_ScrollReveal from "@/components/Gem_ScrollReveal";

/**
 * ==============================================================================
 * [인천하이병원] 서브페이지 공통 1400px 와이드 뷰어 (Gem_SubpageViewer.tsx)
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 총괄 감수: 강수진 실장 (PM)
 *
 * [대표님 피드백 반영]
 * 1. 화면 폭 1400px (max-w-[1400px])를 과감하고 여유있게 풀 활용
 * 2. 첨부 이미지 1번 시안: 살구빛/웜베이지 크림 와이드 박스 + 좌측 볼드 타이틀 + 우측 2열 체크리스트
 * 3. 백엔드 pages 테이블에 등록된 내용 관리 HTML을 와이드 레이아웃으로 쾌적하게 렌더링
 * ==============================================================================
 */

interface PageData {
  id: number;
  slug: string;
  title: string;
  content: string;
  category?: string;
  published?: boolean;
}

interface GemSubpageViewerProps {
  category: string; // 예: "neurosurgery", "knee-hip", "spine"
  slug: string;     // 예: "headache-dizziness", "cartilage-injury"
}

export default function Gem_SubpageViewer({ category, slug }: GemSubpageViewerProps) {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // 1. 네비게이션 데이터에서 대메뉴 및 서브메뉴 정보 조회
  const navItem = GEM_EXTENDED_NAV_ITEMS.find((item) => item.id === category);
  const hubInfo = CATEGORY_HUB_DATA[category];

  // 서브메뉴 플랫 리스트 추출
  const subItems: { name: string; href: string; badge?: string }[] = [];
  if (navItem) {
    navItem.columns.forEach((col) => {
      col.items.forEach((sub) => {
        subItems.push({
          name: sub.name,
          href: sub.href,
          badge: sub.badge,
        });
      });
    });
  }

  // 현재 서브메뉴의 이름 찾기
  const currentHref = `/${category}/${slug}`;
  const currentSubItem = subItems.find((s) => s.href === currentHref);
  const currentTitle = currentSubItem?.name || slug;

  // 허브 데이터에서 해당 아이템 정보 조회 (상세 정보 보강용)
  const hubItem = hubInfo?.items.find((i) => i.id === slug);

  // 2. 백엔드 pages API 호출 (slug 규칙: {category}-{slug})
  useEffect(() => {
    let isMounted = true;
    const fetchPage = async () => {
      setIsLoading(true);
      setHasError(false);

      const targetSlug = `${category}-${slug}`;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost";

      try {
        const res = await fetch(`${apiUrl}/api/modules/sirsoft-page/pages/${targetSlug}`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`페이지를 찾을 수 없습니다. (상태코드: ${res.status})`);
        }

        const data = await res.json();
        if (isMounted) {
          setPageData(data.data || data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    fetchPage();

    return () => {
      isMounted = false;
    };
  }, [category, slug]);

  // 상단 탭 목록 구성
  const tabItems: SubPageTabItem[] = subItems.map((item) => ({
    name: item.name,
    href: item.href,
    badge: item.badge,
  }));

  // 브레드크럼(경로) 구성
  const breadcrumbs = [
    { label: navItem?.name || "진료안내", href: `/${category}` },
    { label: currentTitle, href: currentHref },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* =====================================================================
          1. 서브페이지 공통 헤더 & 가로 서브메뉴 탭
          ===================================================================== */}
      <Gem_SubPageHeader
        categoryTitle={navItem?.name || "진료과 안내"}
        categorySubTitle={hubInfo?.englishTitle || "INCHEON HI HOSPITAL"}
        description={
          hubInfo?.slogan ||
          "정확한 원인 진단과 따뜻한 소통으로, 환자의 아픔과 걱정을 덜어드리는 인천하이병원입니다."
        }
        currentHref={currentHref}
        breadcrumbs={breadcrumbs}
        tabItems={tabItems}
        rightGraphicSrc="/images/subpage_medical_icon.jpg"
      />

      {/* =====================================================================
          2. 서브페이지 본문 영역 (1400px 와이드 컨테이너 풀 활용)
          ===================================================================== */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-24 space-y-16">
        {isLoading ? (
          // 로딩 스켈레톤
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 rounded w-1/4" />
            <div className="h-5 bg-gray-200 rounded w-1/2" />
            <div className="h-80 bg-gray-100 rounded-3xl" />
            <div className="space-y-4">
              <div className="h-5 bg-gray-200 rounded" />
              <div className="h-5 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        ) : (
          <div>
            {/* 타이틀 및 요약 헤더 */}
            <div className="border-b-2 border-gray-900 pb-8 mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-[#006699] text-xs font-bold tracking-wider uppercase mb-3 border border-sky-100">
                {hubItem?.badge || "CLINIC OVERVIEW"}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                {currentTitle}
              </h1>
              {hubItem?.tagline && (
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#006699] mt-3">
                  “{hubItem.tagline}”
                </p>
              )}
              <p className="text-base sm:text-lg text-gray-700 mt-4 leading-relaxed max-w-4xl">
                {hubItem?.description ||
                  "인천하이병원은 최첨단 영상 진단 장비와 풍부한 임상경험을 갖춘 전문의 협진을 통해 환자 개개인에게 가장 적합한 맞춤형 치료를 제공합니다."}
              </p>
            </div>

            {/* ===============================================================
                [첨부 이미지 1번 스타일]
                살구빛/웜베이지 크림 와이드 박스 + 좌측 볼드 타이틀 + 우측 2열 체크리스트
                =============================================================== */}
            {hubItem?.symptoms && hubItem.symptoms.length > 0 && (
              <Gem_ScrollReveal direction="up" duration={0.6}>
                <div className="bg-[#FAF5F0] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#F0E4D8] mb-16">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* 좌측 (약 35% 폭) */}
                    <div className="lg:col-span-5">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-snug">
                        {currentTitle} 의심증상
                      </h2>
                      <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                        평소 이런 증상이 있다면 전문의의 상담과 진단을 받아보아야 합니다.
                      </p>
                    </div>

                    {/* 우측 (약 65% 폭): 2열 와이드 대형 체크리스트 */}
                    <div className="lg:col-span-7">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        {hubItem.symptoms.map((symptom, idx) => (
                          <div key={idx} className="flex items-start gap-3.5">
                            <div className="w-6 h-6 rounded-full bg-[#E05326] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                              <svg className="w-3.5 h-3.5 text-white stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                              {symptom}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Gem_ScrollReveal>
            )}

            {/* 백엔드 pages 테이블에 등록된 HTML 컨텐츠 본문 (있는 경우) */}
            {pageData?.content && (
              <div className="mb-16">
                <Gem_ScrollReveal direction="up" duration={0.6}>
                  <div
                    className="prose prose-lg lg:prose-xl max-w-none text-gray-700 leading-relaxed
                               prose-headings:text-gray-900 prose-headings:font-bold
                               prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-4 prose-h2:mt-12 prose-h2:mb-6
                               prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                               prose-p:text-base sm:prose-p:text-lg prose-p:leading-relaxed
                               prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
                               prose-li:text-gray-700 prose-li:my-1"
                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                  />
                </Gem_ScrollReveal>
              </div>
            )}

            {/* 하이병원 특화 치료 원칙 (1400px 와이드 3열 카드) */}
            <div className="mb-16">
              <Gem_ScrollReveal direction="up" duration={0.6}>
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    인천하이병원 차별화 진료 시스템
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">
                    첨단 의료 인프라와 11인 전문의 협진으로 환자 중심 치료를 실천합니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  <div className="bg-[#f8fafc] rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#006699] flex items-center justify-center font-black text-xl mb-6">
                      01
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">당일 정밀 원스톱 진단</h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      3.0T MRI, 128채널 저선량 CT 등 대학병원급 정밀 진단 장비로 질환의 원인을 신속하고 정확하게 규명합니다.
                    </p>
                  </div>
                  <div className="bg-[#f8fafc] rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#006699] flex items-center justify-center font-black text-xl mb-6">
                      02
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">비수술 우선 맞춤 치료</h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      불필요한 수술을 지양하고, 신경성형술·체외충격파·도수재활 등 자기 신체를 보존하는 비수술 치료를 우선합니다.
                    </p>
                  </div>
                  <div className="bg-[#f8fafc] rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#006699] flex items-center justify-center font-black text-xl mb-6">
                      03
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">11인 전문의 다학제 협진</h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      신경외과, 정형외과, 내과, 마취통증의학과 등 분야별 전문의가 팀을 이루어 빈틈없는 토탈 케어를 실현합니다.
                    </p>
                  </div>
                </div>
              </Gem_ScrollReveal>
            </div>
          </div>
        )}

        {/* 하단 진료 예약 및 허브 목록 복귀 */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/${category}`}
            className="inline-flex items-center gap-2 text-base font-bold text-[#006699] hover:underline"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{navItem?.name || "센터"} 전체 클리닉 보기</span>
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/community/inquiry"
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 text-center transition-colors"
            >
              온라인 상담 문의
            </Link>
            <Link
              href="/about/hours"
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#006699] text-white text-sm font-semibold hover:bg-[#004d73] text-center shadow-sm transition-colors"
            >
              진료 예약 안내
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
