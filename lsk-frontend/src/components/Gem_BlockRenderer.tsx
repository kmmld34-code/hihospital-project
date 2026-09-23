"use client";

import React from "react";
import Gem_SubPageHeader from "@/components/Gem_SubPageHeader";
import Gem_ScrollReveal from "@/components/Gem_ScrollReveal";
import Gem_UniversalCardSlider from "@/components/Gem_UniversalCardSlider";
import { PageBlockItem } from "@/components/Gem_SubAdminPage";
import { CATEGORY_HUB_DATA } from "@/data/categoryHubData";

interface BlockRendererProps {
  category: string;
  slug: string;
  categoryTitle?: string;
  subpageTitle?: string;
  blocks: PageBlockItem[];
}

export default function Gem_BlockRenderer({
  category,
  slug,
  categoryTitle = "진료센터",
  subpageTitle = "진료안내",
  blocks,
}: BlockRendererProps) {
  const breadcrumbs = [
    { label: categoryTitle, href: `/${category}` },
    { label: subpageTitle, href: `/${category}/${slug}` },
  ];

  const hubInfo = CATEGORY_HUB_DATA[category];
  const tabItems = hubInfo?.items.map((it) => ({
    name: it.name,
    href: it.href,
  })) || [{ name: subpageTitle, href: `/${category}/${slug}` }];

  // ----------------------------------------------------------------------
  // 50% 분할(widthMode === 'half') 블록 자동 묶음 처리 (Pre-processing)
  // ----------------------------------------------------------------------
  const groupedBlocks: { id: string; isGroup: boolean; items: PageBlockItem[] }[] = [];
  let tempGroup: PageBlockItem[] = [];

  blocks.forEach((block, index) => {
    if (block.data?.widthMode === "half") {
      tempGroup.push(block);
      if (tempGroup.length === 2) {
        groupedBlocks.push({ id: `group_${index}`, isGroup: true, items: [...tempGroup] });
        tempGroup = [];
      }
    } else {
      if (tempGroup.length > 0) {
        groupedBlocks.push({ id: `group_rem_${index}`, isGroup: true, items: [...tempGroup] });
        tempGroup = [];
      }
      groupedBlocks.push({ id: block.id || `blk_${index}`, isGroup: false, items: [block] });
    }
  });
  if (tempGroup.length > 0) {
    groupedBlocks.push({ id: `group_last`, isGroup: true, items: [...tempGroup] });
  }

  // --- 개별 블록 렌더링 헬퍼 ---
  const renderBlockContent = (block: PageBlockItem, isGreenTheme: boolean) => {
    switch (block.type) {
      case "SECTION_TITLE":
        return (
          <div className="space-y-16">
            <Gem_ScrollReveal direction="up" duration={1.1}>
              <div className="text-center">
                <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight ${isGreenTheme ? "text-white" : "text-gray-900"}`}>
                  {block.data.mainTitle}
                </h2>
              </div>
            </Gem_ScrollReveal>
            {block.data.leadText && (
              <Gem_ScrollReveal direction="up" delay={0.1} duration={1.1}>
                <div className="text-center max-w-5xl mx-auto">
                  <p className={`text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium whitespace-pre-line ${isGreenTheme ? "text-white/95" : "text-gray-700"}`}>
                    {block.data.leadText}
                  </p>
                </div>
              </Gem_ScrollReveal>
            )}
            {block.data.badgeText && (
              <Gem_ScrollReveal direction="up" delay={0.15} duration={1.1}>
                <div className="flex justify-center">
                  <span className={`inline-block px-10 py-3.5 rounded-full text-lg sm:text-xl font-black shadow-sm tracking-wide ${isGreenTheme ? "bg-white text-[#0C7657]" : "bg-[#0C7657] text-white"}`}>
                    {block.data.badgeText}
                  </span>
                </div>
              </Gem_ScrollReveal>
            )}
          </div>
        );

      case "READABLE_TEXT":
        const alignClass = block.data.textAlign === "left" ? "text-left" : block.data.textAlign === "right" ? "text-right" : "text-center";
        return (
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className={`w-full ${alignClass}`}>
              {block.data.highlightText && (
                <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black mb-6 tracking-tight ${isGreenTheme ? "text-white" : "text-gray-900"}`}>
                  {block.data.highlightText}
                </h3>
              )}
              <p className={`text-lg sm:text-xl lg:text-2xl leading-relaxed whitespace-pre-line font-medium ${isGreenTheme ? "text-white/90" : "text-gray-700"}`}>
                {block.data.paragraph}
              </p>
            </div>
          </Gem_ScrollReveal>
        );

      case "TEXT_WITH_IMAGE":
        if (block.data.imageMode === "wide_image") {
          return (
            <div className="relative w-full rounded-[32px] overflow-hidden min-h-[380px] p-8 sm:p-14 lg:p-16 flex items-center shadow-sm border border-gray-100">
              {block.data.customImage && (
                <div className="absolute inset-0 z-0 bg-cover bg-right opacity-30" style={{ backgroundImage: `url(${block.data.customImage})` }} />
              )}
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/95 to-transparent" />
              <div className="relative z-10 max-w-2xl space-y-4">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">{block.data.heading}</h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed whitespace-pre-line font-normal">{block.data.description}</p>
              </div>
            </div>
          );
        } else {
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-4">
              <div className={`lg:col-span-7 ${block.data.imagePosition === "left" ? "order-1 lg:order-2" : ""}`}>
                <Gem_ScrollReveal direction={block.data.imagePosition === "left" ? "right" : "left"} duration={1.2}>
                  <div className="space-y-4">
                    <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isGreenTheme ? "text-white" : "text-gray-900"}`}>{block.data.heading}</h3>
                    <p className={`text-lg sm:text-xl lg:text-2xl leading-relaxed whitespace-pre-line font-normal ${isGreenTheme ? "text-white/95" : "text-gray-700"}`}>{block.data.description}</p>
                  </div>
                </Gem_ScrollReveal>
              </div>
              <div className={`lg:col-span-5 flex justify-center ${block.data.imagePosition === "left" ? "order-2 lg:order-1 lg:justify-start" : "lg:justify-end"}`}>
                <Gem_ScrollReveal direction={block.data.imagePosition === "left" ? "left" : "right"} duration={1.2} delay={0.15}>
                  <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-[32px] overflow-hidden shadow-sm border border-gray-200/90 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    {block.data.customImage ? (
                      <img src={block.data.customImage} alt={block.data.heading} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-50 text-[#0C7657] p-6 text-center">
                        <span className="font-black text-xl">인천하이병원</span>
                        <span className="text-sm text-gray-500 mt-2 font-medium">1400px 표준 고화질 비주얼</span>
                      </div>
                    )}
                  </div>
                </Gem_ScrollReveal>
              </div>
            </div>
          );
        }

      case "DOCTOR_PROFILE":
        return (
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="w-full bg-gradient-to-br from-white to-[#F8FAFC] rounded-[32px] p-6 sm:p-10 lg:p-16 shadow-sm border border-slate-100 text-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center lg:items-stretch relative z-10">
                <div className="lg:col-span-5 w-full">
                  <div className="w-full max-w-[400px] mx-auto lg:max-w-none aspect-[4/5] rounded-[28px] overflow-hidden shadow-sm bg-slate-50 flex-shrink-0 border-4 border-white">
                    {block.data.customImage ? (
                      <img src={block.data.customImage} alt={block.data.doctorName} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-[#0C7657] p-4 bg-emerald-50/30">
                        <span className="font-bold text-center">원장님 프로필 사진</span>
                        <span className="text-xs mt-2 opacity-60">권장 비율 4:5</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-7 flex flex-col justify-center w-full">
                  <div className="mb-8 text-center lg:text-left">
                    <span className="inline-block text-xs font-black text-[#0C7657] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full mb-3">{block.data.department || "직책을 입력하세요"}</span>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">{block.data.doctorName || "이름을 입력하세요"}</h3>
                    {block.data.specialty && (
                      <p className="mt-4 text-sm sm:text-base text-slate-500 font-medium break-keep leading-relaxed border-l-2 border-slate-200 pl-3 inline-block lg:block lg:pl-0 lg:border-none lg:text-slate-500">
                        {block.data.specialty}
                      </p>
                    )}
                  </div>
                  
                  <div className="w-full bg-white/60 backdrop-blur-sm rounded-[24px] p-6 sm:p-8 lg:p-10 border border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex-1 flex flex-col relative overflow-hidden">
                    {block.data.quote && (
                      <div className="mb-6 pb-6 border-b border-slate-100 relative">
                        <span className="absolute -top-3 -left-2 text-6xl text-emerald-900/5 font-serif leading-none pointer-events-none">"</span>
                        <p className="text-xl sm:text-2xl font-black text-slate-800 leading-snug break-keep pt-3 relative z-10 tracking-tight">{block.data.quote}</p>
                      </div>
                    )}
                    
                    <div className="text-sm sm:text-base text-slate-600 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      {block.data.career ? (
                        block.data.career.split('\n').map((line: string, idx: number) => {
                          if (!line.trim()) return null;
                          return (
                            <div key={idx} className="flex items-start gap-2 break-inside-avoid">
                              <span className="w-1 h-1 rounded-full bg-slate-300 mt-2.5 flex-shrink-0"></span>
                              <p className="flex-1">{line}</p>
                            </div>
                          );
                        })
                      ) : (
                        <p className="col-span-full">약력을 엔터로 구분하여 입력하세요</p>
                      )}
                    </div>
                  </div>

                  {block.data.linkUrl && (
                    <div className="mt-8 flex justify-center lg:justify-start">
                      <a href={block.data.linkUrl} target={block.data.linkTarget || "_blank"} rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3.5 border border-slate-200 rounded-full bg-white text-slate-800 text-sm font-bold hover:border-[#0C7657] hover:text-[#0C7657] hover:shadow-md transition-all duration-300 group">
                        자세히 보기
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Gem_ScrollReveal>
        );

      case "PRODUCT_CAROUSEL":
        return (
          <Gem_ScrollReveal direction="up" duration={1.0}>
            <Gem_UniversalCardSlider
              sectionTitle={block.data.carouselTitle}
              speed={block.data.speed}
              isGreenTheme={isGreenTheme}
              cards={block.data.cards?.map((card: any, idx: number) => ({
                id: `slider-item-${idx}`,
                imageSrc: card.imageUrl,
                title: card.title,
                description: card.desc,
                badge: card.tag ? { text: card.tag, colorTheme: 'green' } : undefined,
                link: card.linkUrl
              })) || []}
            />
          </Gem_ScrollReveal>
        );

      case "TIP_CALLOUT":
        return (
          <Gem_ScrollReveal direction="up" duration={1.1}>
            <div className="w-full bg-emerald-50/70 rounded-2xl p-6 sm:p-8 lg:p-10 border border-emerald-100 flex flex-col md:flex-row items-start md:items-center gap-5 sm:gap-6 lg:gap-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0">
                💡
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-base sm:text-lg lg:text-xl text-emerald-900/80 leading-relaxed font-medium whitespace-pre-line break-keep">
                  {block.data.tipText || "안내 문구를 입력하세요"}
                </p>
                {block.data.highlightText && (
                  <p className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-950 mt-2 break-keep tracking-tight">
                    {block.data.highlightText}
                  </p>
                )}
              </div>
            </div>
          </Gem_ScrollReveal>
        );

      case "DISEASE_GRID":
        return (
          <div className="space-y-10">
            {block.data.badgeText && (
              <div className="flex justify-center">
                <span className="inline-block px-10 py-4 rounded-full bg-white text-[#0C7657] text-lg sm:text-xl lg:text-2xl font-black shadow-md tracking-wide">{block.data.badgeText}</span>
              </div>
            )}
            <div className="space-y-8 lg:space-y-10 w-full">
              {block.data.items?.map((item: any, iIdx: number) => {
                const CardContent = (
                  <div className="w-full bg-white text-gray-800 rounded-[28px] p-8 sm:p-10 lg:p-12 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-l-[12px] border-[#0C7657] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-6">
                      {item.imageUrl && (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{item.name}</span>
                        {item.linkUrl && (
                          <span className="text-sm font-bold text-[#0C7657] mt-1 flex items-center gap-1 group-hover:underline">상세보기 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg></span>
                        )}
                      </div>
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed md:text-right space-y-2 mt-4 md:mt-0 flex-1 md:pl-10">
                      <p className="whitespace-pre-line break-keep">{item.desc}</p>
                      {item.cure && <p className="inline-block bg-emerald-50 text-[#0C7657] px-4 py-1.5 rounded-lg font-extrabold text-sm sm:text-base">{item.cure}</p>}
                    </div>
                  </div>
                );
                return item.linkUrl ? (
                  <Gem_ScrollReveal key={iIdx} direction="up" delay={iIdx * 0.05} duration={1.1}><a href={item.linkUrl} target={item.linkTarget || "_blank"} rel="noopener noreferrer" className="block w-full group">{CardContent}</a></Gem_ScrollReveal>
                ) : (
                  <Gem_ScrollReveal key={iIdx} direction="up" delay={iIdx * 0.05} duration={1.1}><div className="w-full">{CardContent}</div></Gem_ScrollReveal>
                );
              })}
            </div>
          </div>
        );

      case "RED_FLAGS":
        return (
          <Gem_ScrollReveal direction="up" duration={1.2}>
            <div className="w-full bg-white text-gray-800 rounded-[36px] p-8 sm:p-14 lg:p-16 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#0C7657] text-xs font-black tracking-wider uppercase border border-emerald-100">{block.data.subTitle || "sub title"}</span>
                  <h4 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">{block.data.warningTitle || "여기에 제목을 입력하세요"}</h4>
                  {block.data.description && (
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed pt-4 break-keep">
                      {block.data.description}
                    </p>
                  )}
                  {block.data.highlightBottom && (
                    <div className="mt-8 border-l-4 border-[#1E3A8A] pl-4 py-1">
                      <p className="text-lg sm:text-xl font-bold text-[#1E3A8A] leading-snug break-keep">
                        {block.data.highlightBottom}
                      </p>
                    </div>
                  )}
                </div>
                <div className="lg:col-span-7 space-y-3.5">
                  {block.data.flags?.map((flag: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-center gap-4 bg-[#FAF5F0] px-5 py-4 rounded-2xl border border-[#F0E4D8] hover:-translate-y-1 hover:shadow-sm transition-all cursor-default">
                      <div className="w-6 h-6 rounded-full bg-[#0C7657] flex items-center justify-center flex-shrink-0 text-white text-xs font-black shadow-sm">✓</div>
                      <span className="text-base sm:text-lg font-bold text-gray-900">{flag || "체크리스트 항목을 입력하세요"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Gem_ScrollReveal>
        );

      case "IMAGE_BLOCK":
      case "VIDEO_BLOCK":
        const isVideo = block.type === "VIDEO_BLOCK";
        // 유튜브 링크 체크
        const getYoutubeId = (url: string) => {
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
          const match = url?.match(regExp);
          return (match && match[2].length === 11) ? match[2] : null;
        };
        const ytId = getYoutubeId(block.data.mediaUrl);
        const MediaContent = (
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-[32px] overflow-hidden shadow-sm border border-gray-100/10 group">
            {/* 미디어 렌더링 */}
            {isVideo && ytId ? (
              <iframe
                className="w-full h-full pointer-events-none"
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : isVideo && block.data.mediaUrl ? (
              <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center text-gray-500 gap-2">
                <span className="text-sm font-bold bg-white px-3 py-1 rounded-full shadow-sm text-rose-600">유효하지 않은 유튜브 링크</span>
                <span className="text-xs">올바른 유튜브 링크(youtu.be/... 또는 youtube.com/watch?v=...)를 입력해주세요.</span>
              </div>
            ) : block.data.mediaUrl ? (
              <img src={block.data.mediaUrl} alt={block.data.title || "Image"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Media Source Empty</div>
            )}
            
            {/* 오버레이 효과 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* 오버레이 텍스트 및 버튼 */}
            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end text-white text-center items-center gap-4">
              {block.data.title && (
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">{block.data.title}</h3>
              )}
              {block.data.desc && (
                <p className="text-base sm:text-lg lg:text-xl text-gray-100 whitespace-pre-line max-w-2xl">{block.data.desc}</p>
              )}
              {block.data.linkUrl && (
                <a
                  href={block.data.linkUrl}
                  target={block.data.linkTarget || "_blank"}
                  rel="noopener noreferrer"
                  className="mt-4 px-8 py-3.5 bg-white text-gray-900 font-bold rounded-full hover:bg-emerald-50 hover:text-[#0C7657] transition-colors shadow-sm"
                >
                  자세히 보기
                </a>
              )}
            </div>
          </div>
        );

        return (
          <Gem_ScrollReveal direction="up" duration={1.1}>
            {MediaContent}
          </Gem_ScrollReveal>
        );

      default:
        return <div>Unknown Block Type</div>;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-800 overflow-x-hidden">
      <Gem_SubPageHeader
        categoryTitle={categoryTitle}
        categorySubTitle="INCHEON HI HOSPITAL SPECIALIZED CLINIC"
        description="환자 한 분 한 분의 빠른 쾌유를 위해 풍부한 임상경험의 전문의가 1:1 맞춤 진료를 제공합니다."
        currentHref={`/${category}/${slug}`}
        breadcrumbs={breadcrumbs}
        tabItems={tabItems}
        rightGraphicSrc="/images/subpage_medical_icon.jpg"
      />

      <div className="w-full">
        {groupedBlocks.map((group) => {
          const firstBlock = group.items[0];
          const bgTheme = firstBlock.props.bgTheme as string;
          const isGreenTheme = bgTheme === "green" || bgTheme === "purple" || bgTheme === "navy" || bgTheme === "blue";
          
          let bgClass = "bg-white text-gray-800";
          let bgStyle: any = {};
          if (bgTheme === "green") bgClass = "bg-[#0C7657] text-white";
          else if (bgTheme === "cream") bgClass = "bg-[#FAF5F0] text-gray-900 border-y border-[#F0E4D8]";
          else if (bgTheme === "purple") bgClass = "bg-[#662D91] text-white";
          else if (bgTheme === "navy") bgClass = "bg-[#074AAD] text-white";
          else if (bgTheme === "blue") bgClass = "bg-[#3375C8] text-white";
          else if (bgTheme === "light_gray") bgClass = "bg-[#F3F4F9] text-gray-900 border-y border-[#E5E7EB]";
          else if (bgTheme === "wide_image") {
            bgClass = "text-gray-900 relative";
            if (firstBlock.props.bgImage) {
              bgStyle = {
                backgroundImage: `url(${firstBlock.props.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              };
            }
          }

          return (
            <section key={group.id} className={`w-full py-20 lg:py-28 ${bgClass}`} style={bgStyle}>
              <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 ${group.items.length === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" : "space-y-16"}`}>
                {group.items.map((block) => (
                  <div key={block.id} className="w-full h-full">
                    {renderBlockContent(block, isGreenTheme)}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
