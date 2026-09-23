"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

/**
 * ==============================================================================
 * [The LSK] 스크롤 리빌 애니메이션 컴포넌트 (Gem_ScrollReveal.tsx)
 * ==============================================================================
 * 모션 스펙: 원거리 출발 감속 안착 글라이딩 인터랙션
 * 
 * [개선 사항]
 * 1. 이동 시작점 거리 대폭 확장: 40px ➔ 90px~120px (먼 곳에서 출발하는 깊이감 있는 궤적)
 * 2. 지속 시간(Duration) 확장: 1.1초 (우아하고 완만한 글라이딩 감속)
 * 3. 큐빅 베지어 감속 곡선: cubic-bezier(0.16, 1, 0.3, 1)로 감속 브레이크 효과 극대화
 * 4. 안전한 지연 시간(delay) 처리: 초(s) 단위와 밀리초(ms, 10 이상) 단위 자동 보정
 * ==============================================================================
 */

interface GemScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number; // 초(s) 또는 밀리초(ms) 단위
  duration?: number;
  className?: string;
  threshold?: number;
  distance?: number; // 이동 거리 (기본값: 방향에 맞춰 90~120px)
}

export default function Gem_ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 1.1, // 지속 시간: 1.1초의 완만하고 우아한 속도감
  className = "",
  threshold = 0.05, // 화면에 살짝 들어오면 즉각 부드럽게 출발
  distance,
}: GemScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  // 단위 안전 보정: 10 이상이면 밀리초(ms)로 판단하여 초(s)로 변환
  const safeDelay = delay >= 10 ? delay / 1000 : delay;
  const safeDuration = duration >= 10 ? duration / 1000 : duration;

  useEffect(() => {
    // SSR 또는 관찰자가 지원되지 않을 때 즉시 노출
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: "50px 0px -20px 0px", // 뷰포트 진입 전 미리 트리거하여 화면 깜빡임 방지
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

  // 방향별 원거리 시작 오프셋 계산 (먼 거리에서 자연스러운 진입)
  const getTransformOffset = () => {
    if (isVisible) return "translate3d(0, 0, 0)";
    
    // 사용자가 직접 distance를 준 경우 우선 적용
    const dY = distance ?? 90;  // 상하 90px
    const dX = distance ?? 120; // 좌우 120px (먼 시작점)

    switch (direction) {
      case "up":
        return `translate3d(0, ${dY}px, 0)`;
      case "down":
        return `translate3d(0, -${dY}px, 0)`;
      case "left":
        return `translate3d(${dX}px, 0, 0)`;
      case "right":
        return `translate3d(-${dX}px, 0, 0)`;
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
        transitionDuration: `${safeDuration}s`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // 감속 안착
        transitionDelay: `${safeDelay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
