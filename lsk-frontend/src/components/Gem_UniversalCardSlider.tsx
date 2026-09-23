'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export interface CardItem {
  id: string;
  imageSrc?: string;
  badge?: {
    text: string;
    colorTheme?: 'green' | 'blue' | 'red' | 'gray';
  };
  title: string;
  description: string;
  link?: string;
}

export interface Gem_UniversalCardSliderProps {
  speed?: number;
  sectionTitle?: string;
  viewAllLink?: string;
  cards: CardItem[];
  isGreenTheme?: boolean;
}

const themeColors = {
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
  red: 'bg-red-100 text-red-700',
  gray: 'bg-gray-100 text-gray-700',
};

export default function Gem_UniversalCardSlider({ sectionTitle, viewAllLink, cards, isGreenTheme = false, speed = 3000 }: Gem_UniversalCardSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    loop: true,
  }, [Autoplay({ delay: speed, stopOnInteraction: false })]);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full relative py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
        {sectionTitle && (
          <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${isGreenTheme ? 'text-white' : 'text-gray-900'}`}>
            {sectionTitle}
          </h3>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className={`p-2 rounded-full border transition-all ${
              prevBtnDisabled 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            } ${isGreenTheme ? 'border-white/20 text-white hover:bg-white/10' : ''}`}
            aria-label="이전 슬라이드"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className={`p-2 rounded-full border transition-all ${
              nextBtnDisabled 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            } ${isGreenTheme ? 'border-white/20 text-white hover:bg-white/10' : ''}`}
            aria-label="다음 슬라이드"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 sm:-ml-6 px-4 sm:px-0 pb-8 pt-2">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className="relative flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 pl-4 sm:pl-6"
            >
              <div className="group h-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-gray-100">
                {/* Image Area */}
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                  {card.imageSrc ? (
                    <Image
                      src={card.imageSrc}
                      alt={card.title || '여기에 제목을 입력하세요'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 85vw, (max-width: 768px) 45vw, (max-width: 1024px) 35vw, 28vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium tracking-widest text-sm uppercase">
                      NO IMAGE
                    </div>
                  )}
                  {/* Badge */}
                  {card.badge && (
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${themeColors[card.badge.colorTheme || 'green']}`}>
                        {card.badge.text || '태그'}
                      </span>
                    </div>
                  )}
                </div>
                {/* Content Area */}
                <div className="p-6 flex-grow flex flex-col justify-between bg-white">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-[#005a3c] transition-colors">{card.title || '여기에 제목을 입력하세요'}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{card.description || '여기에 내용을 입력하세요'}</p>
                  </div>
                </div>
                {/* Link Overlay */}
                {card.link && (
                  <a href={card.link} className="absolute inset-0 z-20" aria-label={`${card.title || '여기에 제목을 입력하세요'} 자세히 보기`}>
                    <span className="sr-only">{card.title || '여기에 제목을 입력하세요'} 자세히 보기</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Gem_UniversalCardSlider.Skeleton = function Skeleton() {
  return (
    <div className="w-full relative py-4 animate-pulse">
      <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <div className="flex gap-4 sm:gap-6 px-4 sm:px-0 pb-8 pt-2 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 pl-4 sm:pl-6">
            <div className="w-full aspect-square bg-gray-200 rounded-t-2xl"></div>
            <div className="p-6 bg-white border border-gray-100 border-t-0 rounded-b-2xl h-32">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
