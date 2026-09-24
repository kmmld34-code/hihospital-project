/**
 * ==============================================================================
 * [Next.js Config] 인천하이병원 웹 시스템 프론트엔드 환경 설정
 * ==============================================================================
 * 담당자: 고윤기 대리 (Frontend Lead Engineer)
 * 아키텍처 감수: 박동훈 차장 (Lead System Architect)
 * QA 검수: 오은수 대리 (QA & Performance Engineer)
 * ==============================================================================
 * [이미지 최적화 원칙 반영]
 * 1. formats: 차세대 이미지 압축 포맷인 AVIF와 WebP를 자동 지원하여 트래픽 60~80% 절감
 * 2. remotePatterns: 스티치 CDN(googleusercontent) 및 외부 미디어의 안전한 자동 변환 서빙
 * ==============================================================================
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  images: {
    // 1. 차세대 이미지 포맷 자동 변환 활성화 (AVIF -> WebP 순으로 우선 지원)
    formats: ['image/avif', 'image/webp'],
    
    // 2. 외부 원격 이미지 최적화 도메인 패턴
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.iconify.design',
        pathname: '/**',
      },
    ],
    // 3. 디바이스별 반응형 이미지 브레이크포인트
    deviceSizes: [640, 750, 828, 1080, 1200, 1400, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
