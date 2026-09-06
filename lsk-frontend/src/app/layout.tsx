import type { Metadata } from "next";
import "./globals.css";
import Gem_Header from "@/components/Gem_Header";
import Gem_Footer from "@/components/Gem_Footer";
import Gem_QuickMenu from "@/components/Gem_QuickMenu";

export const metadata: Metadata = {
  title: "HI Hospital - 척추·관절·뇌신경 전문병원",
  description:
    "응급치료부터 고난이도 수술까지! 풍부한 임상경험을 가진 10인 전문의의 1:1 맞춤 진료. 24시간 응급의료센터, 첨단 3.0T MRI 및 비수술 클리닉 완비.",
  keywords: [
    "HI Hospital",
    "척추병원",
    "관절병원",
    "목디스크",
    "허리디스크",
    "인공관절",
    "신경과",
    "정형외과",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col bg-white text-slate-800">
        {/* 1. 상단 글로벌 네비게이션 헤더 (풀배경 + 내부 1400px 정렬) */}
        <Gem_Header />

        {/* 2. 우측 스크롤 고정 세로형 퀵메뉴 배너 */}
        <Gem_QuickMenu />

        {/* 3. 본문 메인 영역 */}
        <main className="flex-1 w-full">{children}</main>

        {/* 4. 최하단 푸터 (풀배경 딥네이비 + 내부 1400px 정렬) */}
        <Gem_Footer />
      </body>
    </html>
  );
}
