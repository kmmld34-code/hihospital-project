"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

/**
 * ==============================================================================
 * [The LSK] 스크롤 리빌 애니메이션 래퍼 컴포넌트 (Gem_ScrollReveal.tsx)
 * ==============================================================================
 * 역할:
 *  - 브라우저의 기본 기능인 Intersection Observer API를 사용하여,
 *    화면(뷰포트) 스크롤 시 요소가 나타날 때 부드러운 Fade-In & Slide 애니메이션을 적용합니다.
 *  - 별도의 외부 무거운 라이브러리(Framer Motion 등) 설치 없이도 완벽하고 가볍게 동작합니다.
 * 
 * 주요 Props:
 *  - children: 애니메이션을 적용할 내부 UI 콘텐츠
 *  - direction: 등장 방향 ("up" | "down" | "left" | "right" | "none")
 *  - delay: 지연 시간 (초 단위, 예: 0.1, 0.2 등 - 순차적 계단식 등장 효과)
 *  - duration: 애니메이션 지속 시간 (초 단위, 기본 0.7초)
 *  - className: 추가 Tailwind CSS 클래스
 * ==============================================================================
 */

interface GemScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export default function Gem_ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  threshold = 0.15,
}: GemScrollRevealProps) {
  // 화면에 진입했는지 여부를 추적하는 상태값
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 요소가 지정된 비율(threshold)만큼 보이면 활성화
          if (entry.isIntersecting) {
            setIsVisible(true);
            // 한 번 나타난 후에는 관찰을 종료하여 브라우저 성능을 최적화합니다.
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -50px 0px", // 화면 하단에 살짝 진입했을 때 미리 감지
      }
    );

    const currentTarget = domRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [threshold]);

  // 방향별 초기 위치 오프셋 스타일 계산
  const getTransformOffset = () => {
    if (isVisible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return "translate3d(0, 40px, 0)";
      case "down":
        return "translate3d(0, -40px, 0)";
      case "left":
        return "translate3d(40px, 0, 0)";
      case "right":
        return "translate3d(-40px, 0, 0)";
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransformOffset(),
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // 매끄러운 감속 곡선
        transitionDelay: `${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
