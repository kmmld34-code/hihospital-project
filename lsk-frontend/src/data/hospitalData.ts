/**
 * ==============================================================================
 * [HI Hospital] 프론트엔드 정적 데이터 명세 (SSG 최적화 및 스티치 디자인 반영)
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM, 정재이 과장 (UI/UX)
 * ==============================================================================
 * 이 파일은 인천하이병원의 메인 페이지와 전체 사이트에서 공통으로 사용되는
 * 메뉴, 히어로 배너 슬라이드, 의료진 프로필, 수술 실적, 특화센터, 진료 부위 자가진단,
 * 최신 시설 및 검사장비 데이터를 한 곳에 정의하여 유지보수성을 극대화한 파일입니다.
 * ==============================================================================
 */

// 1. 헤더 GNB 네비게이션 메뉴 (11개 1Depth 메뉴)
export const GEM_NAV_ITEMS = [
  { name: "병원소개", href: "/about", pathKey: "about-hospital" },
  { name: "뇌신경", href: "/neurosurgery", pathKey: "neurosurgery" },
  { name: "척추클리닉", href: "/spine", pathKey: "spine-center", badge: "특화" },
  { name: "무릎·고관절", href: "/knee-hip", pathKey: "knee-hip-center", badge: "특화" },
  { name: "어깨관절", href: "/shoulder", pathKey: "shoulder-clinic" },
  { name: "수·족부", href: "/hand-foot", pathKey: "hand-foot-clinic" },
  { name: "외과진료", href: "/surgery-general", pathKey: "general-surgery" },
  { name: "내과진료", href: "/internal-medicine", pathKey: "internal-medicine" },
  { name: "건강검진", href: "/checkup", pathKey: "health-checkup" },
  { name: "산부인과", href: "/obgyn", pathKey: "obgyn-clinic" },
  { name: "커뮤니티", href: "/community", pathKey: "community" },
];

// 2. 최상단 히어로 배너 슬라이드 인터페이스 및 데이터
export interface GemSlideItem {
  id: string;
  order: string;
  totalSlides: string;
  badge1: string;
  badge2: string;
  headline: string;
  subheadline: string;
  highlightText: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

export const GEM_HERO_SLIDES: GemSlideItem[] = [
  {
    id: "slide-01",
    order: "01",
    totalSlides: "04",
    badge1: "원인 추적 정밀 진단 시스템",
    badge2: "간호·간병 통합 서비스 전 병동 운영",
    headline: "척추·관절 통증의 \n정확한 진단 및 \n개인별 맞춤 치료 솔루션",
    subheadline: "10인의 전문의가 함께하는 인천하이병원은 최소침습 치료를 우선으로 합니다!",
    highlightText: "고난도 인공관절 치환술까지 환자의 건강한 회복을 최우선으로 생각합니다!",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoGtPxeI9KEcVTq4jotzYlY-HHIDNwlnStVvi5m7gH9Qd7PqglEadlAZk_ta7bAvXSvE7vy1hO9Qf3h1px0ayTQwKX796w9WgEBtiA6CWfDnfbPSOzaTK3ZALBuJdnX5gW0kb1w7Ec1ftSlPaTXNm83lrpFjMTzeUleUsBGD5P918cn4yq9ojcQNILN_9tBZIADdymVAUWPDpOEWbppuNXpPTBwKQOUyC1rrxKSCeMcFDupWjx0ZR6xA",
    ctaText: "온라인 간편 예약하기",
    ctaLink: "/appointments",
  },
  {
    id: "slide-02",
    order: "02",
    totalSlides: "04",
    badge1: "첨단 3.0T MRI & 128채널 CT",
    badge2: "원스톱 당일 검사 & 당일 판독 시스템",
    headline: "기다림 없는 빠른 진단 \n대학병원급 최첨단 \n초정밀 영상의학 장비 완비",
    subheadline: "독일 지멘스 3.0T MRI를 도입하여 미세한 혈관과 관절 손상까지 정밀하게 찾아냅니다.",
    highlightText: "당일 예약 및 판독으로 환자분의 대기 시간을 획기적으로 줄여드립니다.",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSK0Yzi7KoU2TT8jPbBcN7nv4xPFat2bKDv8hP3kTE0-RJrAk08AXj0zQ8MbJg1byA4qHlZ_rO8bmuw72LK9-7A0faqceelIWm6rj8NsUXTWMocitwIchRDUIbQxK5JfOCXP_idJkqjN3MnN-mMZbHPISgptBmfeVQm7KDT9hboyphiIYxyWmKMdc_cIyfbkPjQLPuJKovpUIWsLMJqZJLgaQPtFgKX9ycAFaP-7kaLQXvuOXbs-eLzQ",
    ctaText: "영상진단센터 둘러보기",
    ctaLink: "/about/facility",
  },
  {
    id: "slide-03",
    order: "03",
    totalSlides: "04",
    badge1: "풍부한 임상경험의 10인 전문의",
    badge2: "서울아산병원 출신 및 전 병원장 협진",
    headline: "가족을 돌보는 정성으로 \n검증된 실력의 명의들이 \n책임지는 바른 진료",
    subheadline: "과잉 진료 없는 양심적인 진단과 비수술 우선 원칙으로 환자 맞춤 케어를 실현합니다.",
    highlightText: "척추, 관절, 뇌신경, 외과, 내과 전문의가 유기적인 협진 시스템을 운영합니다.",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLXCoqADW7__WiCQ-cDYKB3fzIAnQ7eHuUw1T3rnLZUeDXxt_JqGM8YfQVu88IrJ7FMFI8H4qJAyPd8iClyWoW0v0_L1UxTH5fKP4bSa9S5aa0q9_vaddQ9J-IVYj5xIgij8xaU-lGnHLkXLmEiXFkkepYEriSmT1m3Kg8eZ-dY43eLwzsoYpCOQyMRPsDgHBDlFDqldlT9bbnTOEWorNYHE-cB-Un-mPeHxGGEqFBtqm8fvD707ZeXQ",
    ctaText: "의료진 프로필 확인",
    ctaLink: "/about/doctors",
  },
  {
    id: "slide-04",
    order: "04",
    totalSlides: "04",
    badge1: "칼 대신 정확한 최소침습 시술",
    badge2: "양방향 내시경 및 1:1 도수재활",
    headline: "환자의 부담을 줄이는 \n비수술 중심 척추·관절 \n단계별 특화 솔루션",
    subheadline: "신경차단술, 양방향 척추내시경, 전문 물리치료사의 1:1 감압 도수재활을 제공합니다.",
    highlightText: "수술 없이 빠르게 일상으로 복귀할 수 있도록 최적의 회복 플랜을 제시합니다.",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC64XtvqD6NErcP36sReN8MGaT9iivtJ8TYjisIdfS5ePeKMz1w2CEpoLKuOx5WD4qVJ28nyP89kQejNLZOYYejYWeCamrnlxedOzi6liYjrG9mgzJM9uLE5MCJViF_TZkuPZ6E7bJ9wS_9rQvIoz2F8TAvsHKk_aJ4_WLgT2x4eNMsDXjDRYMyDow-hXJrnLyC8In1jIrK1dFi3NDMLwDYhI2I11hgqI8AfvgrMPqmqkPKH8s1rZ7bmA",
    ctaText: "비수술 치료클리닉 안내",
    ctaLink: "/spine/non-surgery",
  },
];

// 3. 우측 고정 사이드 배너 (Sticky Quick Menu)
export const GEM_QUICK_MENU_ITEMS = [
  { id: "resv", label: "간편예약", icon: "CalendarCheck", href: "/appointments", isHighlight: true },
  { id: "hours", label: "진료시간", icon: "Clock", href: "/about/hours", isHighlight: false },
  { id: "directions", label: "오시는길", icon: "MapPin", href: "/about/directions", isHighlight: false },
  { id: "call", label: "1600-8549", icon: "PhoneCall", href: "tel:1600-8549", isHighlight: false },
  { id: "kakao", label: "카톡상담", icon: "MessageSquare", href: "https://pf.kakao.com", isHighlight: false, isAmber: true },
];

// 4. 스티치 통증 부위 자가진단 데이터 (Diagnosis & Clinic)
export interface GemPainDiagnosisItem {
  id: string;
  name: string;
  title: string;
  clinic: string;
  path: string;
  items: string[];
}

export const GEM_PAIN_DIAGNOSIS_DATA: Record<string, GemPainDiagnosisItem> = {
  neck: {
    id: "neck",
    name: "목 (경추)",
    title: "목 (경추) 중점 진료 안내",
    clinic: "척추센터",
    path: "/spine",
    items: [
      "목디스크 (경추 추간판탈출증)",
      "거북목·일자목 증후군",
      "경추 척추관협착증",
    ],
  },
  shoulder: {
    id: "shoulder",
    name: "어깨",
    title: "어깨 (견관절) 중점 진료 안내",
    clinic: "관절센터",
    path: "/shoulder",
    items: [
      "회전근개 파열",
      "오십견 (유착성 관절낭염)",
      "어깨 석회화건염",
    ],
  },
  lumbar: {
    id: "lumbar",
    name: "허리 (요추)",
    title: "허리 (요추) 중점 진료 안내",
    clinic: "척추센터",
    path: "/spine",
    items: [
      "허리디스크 (요추 추간판탈출증)",
      "척추관협착증",
      "척추전방전위증 및 분리증",
    ],
  },
  knee: {
    id: "knee",
    name: "무릎·고관절",
    title: "무릎·고관절 중점 진료 안내",
    clinic: "인공관절센터",
    path: "/knee-hip",
    items: [
      "퇴행성 무릎관절염 (인공관절/줄기세포)",
      "반월상 연골판 파열",
      "고관절 대퇴골두 무혈성괴사",
    ],
  },
  handfoot: {
    id: "handfoot",
    name: "손·발·발목",
    title: "손·발·발목 중점 진료 안내",
    clinic: "수·족부클리닉",
    path: "/hand-foot",
    items: [
      "손목터널증후군 (수근관증후군)",
      "족저근막염 및 아킬레스건염",
      "무지외반증 및 발목 인대손상",
    ],
  },
  brain: {
    id: "brain",
    name: "두부 (뇌신경)",
    title: "두부 (뇌신경) 중점 진료 안내",
    clinic: "뇌신경센터",
    path: "/neurosurgery",
    items: [
      "만성 편두통 및 긴장형 두통",
      "이석증 및 전정신경 어지럼증",
      "뇌졸중(중풍) 예방 및 치매 조기검진",
    ],
  },
};

// 5. 10인의 전문 의료진 데이터 (스티치 디자인 반영)
export interface GemDoctorItem {
  id: string;
  name: string;
  deptBadge: string;
  badgeColor: "primary" | "secondary" | "tertiary" | "slate";
  specialtyTitle: string;
  deptGroup: string;
  subTitle: string;
  imageUrl: string;
  treatments: string[];
}

export const GEM_DOCTORS: GemDoctorItem[] = [
  {
    id: "doc-1",
    name: "서동광 원장",
    deptBadge: "신경외과",
    badgeColor: "primary",
    specialtyTitle: "신경외과 전문의",
    deptGroup: "신경외과",
    subTitle: "서울아산병원 신경외과 전문의 / 서울아산병원 외래교수",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvVsPq-BZUGFbgzGZyOypTtM_SmAQ5lEZxVwNTHLqkF2l9dXmVk-rinxXoV0Zi0TiPxVUp6VCF9k2vtzBVeDnSQd4H9TorUb6rS1iWXJuUeBceoqeUIBkLGodrPy8NG26SUene8k4cQBB1A9JJp578InOET81LoksqammaOHN1ESt9uRbdESW6YfoT9Ksv3UCWYQVuE6ucemRcsRKCwZI4G9P3BCCIpAtl2DzZrYxZnCVcYGyMS25x1uBU_b-upEWRtUecvt329cp3Bpg",
    treatments: [
      "척추질환/목,허리디스크,협착증,골절",
      "뇌‣신경질환/두통,어지럼증,뇌졸중,말초신경병",
      "미세현미경 디스크 수술 및 척추내시경 수술",
    ],
  },
  {
    id: "doc-2",
    name: "이동걸 원장",
    deptBadge: "신경외과",
    badgeColor: "secondary",
    specialtyTitle: "신경외과 전문의",
    deptGroup: "신경외과",
    subTitle: "(전)인천 나누리병원 병원장 / 아산병원 신경외과 외래교수",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbS_O5st5RkSj8SAg48nRBjDcdwrymlQd8ezNFL4U9aFsS-8p9xDZQpiLNLPpyJ7SfLVCcm5dMayJFvODrwW8rtvE2plmbmCbhkcIg0WofCs5MqzLHVBP8da0V64dH9m5OL2xaN4_1iHO3cJg4Plwnf06sNf_CCimEzW0zNtGEM8nuC7G4rw0kFRI73B1rAqg6dgCkW6j2m5Jc9XjH8RfXZ3xaUppqbwv8C3QB0X3a-3r1jFpCFK8TerLS-d6Ikn8G1BrTzk-PIiD9DRw",
    treatments: [
      "최근 5년간 척추수술 5,000례 이상 집도",
      "목, 허리디스크 / 척추 질환",
      "척추내시경, 미세현미경 수술 및 인공디스크",
    ],
  },
  {
    id: "doc-3",
    name: "김인철 원장",
    deptBadge: "신경외과",
    badgeColor: "tertiary",
    specialtyTitle: "신경외과 전문의",
    deptGroup: "신경외과",
    subTitle: "(전)일산 하이병원 병원장 / 가천의대 길병원 신경외과 외래교수",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR5I9pwd3PZw8gePKlYBcN6ABCQgPxp7iEuo3wGOKVoKnnrmb6KAKErMl8KBlMPO_bbWpjLrkoesZe0Ck8hgZTnvvL4giCrVpQ3KR1KX5LlL-UF9y7R-pnFjvtTE_xFgzLqNvn6hyvmhf-NjuB1rBiyMpqrVp0Umz8Cxrx8whs5QmJfKI63Kna2ghrQfCnzIReATmhDsLWjMi8a5ASkx2Hl7koCCSbbqfP2w5RRtBECcbfUNOMB_H6_u42JwUlOdGBOGockKl167J8wCk",
    treatments: [
      "비수술 척추치료 / 목, 허리디스크",
      "척추관협착증, 퇴행성 척추질환, 척추측만증",
      "경추유합술, 척추체성형술, 인공 디스크",
    ],
  },
  {
    id: "doc-4",
    name: "김민영 원장",
    deptBadge: "정형외과",
    badgeColor: "slate",
    specialtyTitle: "정형외과 전문의",
    deptGroup: "정형외과",
    subTitle: "서울아산병원 정형외과 전문의 / (전)부천 순천향대학병원 교수",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIY0RPPMAxpC_d4KoBc7sox_Iszs5yFGxGYvCJlnf86cpiw2uQXDWaxmwpo6I7w2pkikaT-I7QblaM6TqkRlUanYDQ87hBxTdJ7IBXIMYIxIB6uiGs737UhEMcYrVvPYaa-uwJqIgAhx_28j1SYadsXubzpBSIG-kolmLKJn3yfTbGCB0k_cmJ-b_PE6lSF2DmARFvVmCg-KxCsyvyxC480Dy1SewWPF5oxxnXEo6wJeijPs_f4E0SMGNGdah4N4JB5krdQYcNHYlpqWw",
    treatments: [
      "인공관절수술(무릎, 고관절 등) 3,000례 이상",
      "관절내시경(무릎, 어깨, 발목 등) 5,000례 이상",
      "수족부 / 외상 수술 2,000례 이상",
    ],
  },
  {
    id: "doc-5",
    name: "박진우 원장",
    deptBadge: "정형외과",
    badgeColor: "primary",
    specialtyTitle: "정형외과 전문의",
    deptGroup: "정형외과",
    subTitle: "연세대학교 세브란스병원 정형외과 외래교수 / 인공관절 학회 정회원",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvVsPq-BZUGFbgzGZyOypTtM_SmAQ5lEZxVwNTHLqkF2l9dXmVk-rinxXoV0Zi0TiPxVUp6VCF9k2vtzBVeDnSQd4H9TorUb6rS1iWXJuUeBceoqeUIBkLGodrPy8NG26SUene8k4cQBB1A9JJp578InOET81LoksqammaOHN1ESt9uRbdESW6YfoT9Ksv3UCWYQVuE6ucemRcsRKCwZI4G9P3BCCIpAtl2DzZrYxZnCVcYGyMS25x1uBU_b-upEWRtUecvt329cp3Bpg",
    treatments: [
      "무릎·고관절 로봇 인공관절 치환술",
      "반월상 연골판 파열 및 줄기세포 연골재생",
      "어깨 회전근개 파열 최소침습 관절경 수술",
    ],
  },
  {
    id: "doc-6",
    name: "최현석 원장",
    deptBadge: "정형외과",
    badgeColor: "secondary",
    specialtyTitle: "정형외과 전문의",
    deptGroup: "정형외과",
    subTitle: "고려대학교 구로병원 정형외과 전임의 / 스포츠의학 세부전문의",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbS_O5st5RkSj8SAg48nRBjDcdwrymlQd8ezNFL4U9aFsS-8p9xDZQpiLNLPpyJ7SfLVCcm5dMayJFvODrwW8rtvE2plmbmCbhkcIg0WofCs5MqzLHVBP8da0V64dH9m5OL2xaN4_1iHO3cJg4Plwnf06sNf_CCimEzW0zNtGEM8nuC7G4rw0kFRI73B1rAqg6dgCkW6j2m5Jc9XjH8RfXZ3xaUppqbwv8C3QB0X3a-3r1jFpCFK8TerLS-d6Ikn8G1BrTzk-PIiD9DRw",
    treatments: [
      "발목 인대파열 및 족저근막염 체외충격파",
      "손목터널증후군 및 방아쇠수지 미세수술",
      "스포츠 관절 손상 재활 및 맞춤 도수치료",
    ],
  },
  {
    id: "doc-7",
    name: "이정훈 원장",
    deptBadge: "외과",
    badgeColor: "tertiary",
    specialtyTitle: "외과 전문의",
    deptGroup: "외과",
    subTitle: "서울대학교병원 외과 임상자문의 / 대한대장항문학회 평생회원",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR5I9pwd3PZw8gePKlYBcN6ABCQgPxp7iEuo3wGOKVoKnnrmb6KAKErMl8KBlMPO_bbWpjLrkoesZe0Ck8hgZTnvvL4giCrVpQ3KR1KX5LlL-UF9y7R-pnFjvtTE_xFgzLqNvn6hyvmhf-NjuB1rBiyMpqrVp0Umz8Cxrx8whs5QmJfKI63Kna2ghrQfCnzIReATmhDsLWjMi8a5ASkx2Hl7koCCSbbqfP2w5RRtBECcbfUNOMB_H6_u42JwUlOdGBOGockKl167J8wCk",
    treatments: [
      "무통 치핵·치루·치열 당일 최소침습 수술",
      "하지정맥류 고주파 및 베나실 혈관폐쇄술",
      "액취증 영구 땀샘 흡입 제거술",
    ],
  },
  {
    id: "doc-8",
    name: "정수연 원장",
    deptBadge: "내과",
    badgeColor: "slate",
    specialtyTitle: "내과 전문의",
    deptGroup: "내과",
    subTitle: "삼성서울병원 소화기내과 외래교수 / 신장투석 전문의",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIY0RPPMAxpC_d4KoBc7sox_Iszs5yFGxGYvCJlnf86cpiw2uQXDWaxmwpo6I7w2pkikaT-I7QblaM6TqkRlUanYDQ87hBxTdJ7IBXIMYIxIB6uiGs737UhEMcYrVvPYaa-uwJqIgAhx_28j1SYadsXubzpBSIG-kolmLKJn3yfTbGCB0k_cmJ-b_PE6lSF2DmARFvVmCg-KxCsyvyxC480Dy1SewWPF5oxxnXEo6wJeijPs_f4E0SMGNGdah4N4JB5krdQYcNHYlpqWw",
    treatments: [
      "고혈압, 당뇨, 고지혈증 만성질환 평생케어",
      "최신 인공신장실 고효율 혈액투석 클리닉",
      "위·대장 수면내시경 및 용종 절제술",
    ],
  },
  {
    id: "doc-9",
    name: "한혜진 원장",
    deptBadge: "산부인과",
    badgeColor: "primary",
    specialtyTitle: "산부인과 전문의",
    deptGroup: "산부인과",
    subTitle: "차병원 여성의학연구소 전임의 / 대한폐경학회 정회원",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvVsPq-BZUGFbgzGZyOypTtM_SmAQ5lEZxVwNTHLqkF2l9dXmVk-rinxXoV0Zi0TiPxVUp6VCF9k2vtzBVeDnSQd4H9TorUb6rS1iWXJuUeBceoqeUIBkLGodrPy8NG26SUene8k4cQBB1A9JJp578InOET81LoksqammaOHN1ESt9uRbdESW6YfoT9Ksv3UCWYQVuE6ucemRcsRKCwZI4G9P3BCCIpAtl2DzZrYxZnCVcYGyMS25x1uBU_b-upEWRtUecvt329cp3Bpg",
    treatments: [
      "폐경·갱년기 호르몬 불균형 맞춤 솔루션",
      "여성 대사증후군 및 비만·체형 교정",
      "자궁경부암 백신 및 일반 여성질환 정밀검진",
    ],
  },
  {
    id: "doc-10",
    name: "윤태호 원장",
    deptBadge: "영상의학과",
    badgeColor: "secondary",
    specialtyTitle: "영상의학과 전문의",
    deptGroup: "영상의학과",
    subTitle: "서울아산병원 영상의학과 임상강사 / 척추관절 영상 판독 전문",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbS_O5st5RkSj8SAg48nRBjDcdwrymlQd8ezNFL4U9aFsS-8p9xDZQpiLNLPpyJ7SfLVCcm5dMayJFvODrwW8rtvE2plmbmCbhkcIg0WofCs5MqzLHVBP8da0V64dH9m5OL2xaN4_1iHO3cJg4Plwnf06sNf_CCimEzW0zNtGEM8nuC7G4rw0kFRI73B1rAqg6dgCkW6j2m5Jc9XjH8RfXZ3xaUppqbwv8C3QB0X3a-3r1jFpCFK8TerLS-d6Ikn8G1BrTzk-PIiD9DRw",
    treatments: [
      "독일 지멘스 첨단 3.0T MRI 정밀 판독",
      "128채널 MDCT 당일 신속 판독 시스템",
      "초정밀 근골격계 및 혈관 초음파 검진",
    ],
  },
];

// 6. 신뢰할 수 있는 임상 경험과 풍부한 수술 실적 (Clinical Excellence & Track Record)
export const GEM_CLINICAL_METRICS = [
  {
    deptTag: "척추클리닉",
    tagColor: "bg-blue-50 text-[#0052CC]",
    title: "최근 5년간 척추수술",
    count: "5,000",
    unit: "례+",
    desc: "양방향 내시경 및 미세현미경 고난도 척추수술",
    icon: "AirlineSeatReclineExtra",
  },
  {
    deptTag: "관절클리닉",
    tagColor: "bg-teal-50 text-[#008B96]",
    title: "인공관절 치환술",
    count: "3,000",
    unit: "례+",
    desc: "3D 시뮬레이션 기반 로봇 맞춤형 인공관절",
    icon: "PrecisionManufacturing",
  },
  {
    deptTag: "관절클리닉",
    tagColor: "bg-blue-50 text-[#0052CC]",
    title: "관절 내시경 시술",
    count: "5,000",
    unit: "례+",
    desc: "무릎·어깨 회전근개 등 최소침습 관절경",
    icon: "Healing",
  },
  {
    deptTag: "수족부외상",
    tagColor: "bg-amber-50 text-[#B45309]",
    title: "수·족부 외상 및 재건",
    count: "2,000",
    unit: "례+",
    desc: "미세 신경접합 및 무지외반증 교정 클리닉",
    icon: "Footprints",
  },
];

// 7. 중점 특화 진료센터 큐레이션 (4대 특화센터)
export interface GemSpecialCenterItem {
  id: string;
  badge: string;
  badgeColor: string;
  englishTitle: string;
  bannerTitle: string;
  title: string;
  desc: string;
  icon: string;
  link: string;
}

export const GEM_SPECIAL_CENTERS: GemSpecialCenterItem[] = [
  {
    id: "spine",
    badge: "수술/비수술 원스톱",
    badgeColor: "bg-blue-50 text-[#0052CC]",
    englishTitle: "Spine Center",
    bannerTitle: "척추정밀 클리닉",
    title: "최소침습 척추센터",
    desc: "미세현미경 및 양방향 척추내시경을 통해 정상 조직 손상을 최소화하고 당일 또는 단기 입원으로 빠른 회복을 실현합니다.",
    icon: "https://lh3.googleusercontent.com/aida/AEtjO1VVRvXon-sx1lZ1aoYZAY0bcGdOyR94Vq0r4QdOu2hv4fASH-B_drTo6eP_LQgw9CYRBrwWCSnEXl-eC2dCl8u6Tl1-McftvlWKJjPCYg_3U4g347ufXKld2f_2vVTCC6mvRIZzkzVsf_0CATTT-2QeV4LCoHw_Z5JXYPc1aSTUdXMdu4396kQN56LdirD6-TXmyVva49kO0OUpEypPB6NkVNFIZDd4fFqduig1iQj-lbA7kMSQvIDYWNUU",
    link: "/spine",
  },
  {
    id: "joint",
    badge: "최소절개 빠른보행",
    badgeColor: "bg-teal-50 text-[#008B96]",
    englishTitle: "Joint Center",
    bannerTitle: "인공관절 특화클리닉",
    title: "맞춤형 인공관절센터",
    desc: "3D 시뮬레이션 기반 환자 맞춤형 인공관절 및 초정밀 관절경 시술로 관절 수명을 극대화하고 오차 없는 정확도를 보장합니다.",
    icon: "precision_manufacturing",
    link: "/knee-hip",
  },
  {
    id: "neuro",
    badge: "골든타임 케어",
    badgeColor: "bg-amber-50 text-[#B45309]",
    englishTitle: "Neuro Center",
    bannerTitle: "뇌신경·치매 클리닉",
    title: "뇌신경·치매센터",
    desc: "두통, 만성 어지럼증, 뇌혈관 질환 위험인자를 선제적으로 분석하고 조기 치매 스크리닝을 통한 체계적인 인지 재활을 지원합니다.",
    icon: "psychology",
    link: "/neurosurgery",
  },
  {
    id: "dialysis",
    badge: "쾌적한 투석환경",
    badgeColor: "bg-slate-100 text-slate-600",
    englishTitle: "Dialysis Center",
    bannerTitle: "인공신장 투석클리닉",
    title: "인공신장실 (혈액투석)",
    desc: "최신 NCU-18 고효율 투석 장비와 초순수투석액을 공급하는 정수시스템을 갖추고 있으며 신장내과 투석 전문의가 상주하여 안심할 수 있는 치료 환경을 제공합니다.",
    icon: "bloodtype",
    link: "/internal-medicine",
  },
];

// 8. 하이병원 뉴스 및 언론보도 데이터
export const GEM_NEWS_ITEMS = [
  {
    id: "news-1",
    tag: "병원소식",
    tagBg: "bg-teal-50 text-[#008B96]",
    date: "2025.02.18",
    title: "보건복지부 3주기 인증의료기관 획득… 환자안전 및 의료 질 최고수준 공인",
    desc: "부천 하이병원이 엄격한 평가 기준을 거쳐 보건복지부 공인 인증의료기관 자격을 획득하였습니다.",
    link: "/community/news",
  },
  {
    id: "news-2",
    tag: "최신장비도입",
    tagBg: "bg-blue-50 text-[#0052CC]",
    date: "2025.02.10",
    title: "독일 지멘스 최신형 3.0T MRI 추가 도입 및 가동… 대기시간 대폭 단축",
    desc: "미세 뇌혈관 및 관절 연골 손상까지 고해상도로 포착하는 최상위 MRI 장비를 구축하여 신속 정밀 검사를 제공합니다.",
    link: "/community/news",
  },
  {
    id: "news-3",
    tag: "사회공헌",
    tagBg: "bg-amber-50 text-[#B45309]",
    date: "2025.01.28",
    title: "지역 소외계층 어르신을 위한 '사랑나눔 척추·관절 무료 정밀검진' 성료",
    desc: "부천시와 연계하여 경제적 어려움으로 치료를 받지 못한 독거 어르신 120명에게 무료 MRI 및 도수치료를 지원했습니다.",
    link: "/community/news",
  },
  {
    id: "news-4",
    tag: "학술·연구",
    tagBg: "bg-blue-50 text-[#0052CC]",
    date: "2025.01.15",
    title: "척추관절센터 의료진, 대한척추신경외과학회 학술대회 우수 논문상 수상",
    desc: "양방향 척추내시경(UBE) 수술법의 임상 결과 분석 논문이 우수성을 인정받아 최우수 학술상을 수상하였습니다.",
    link: "/community/news",
  },
];

// 9. 병원 시설 및 최신 검사장비 데이터
export interface GemFacilityItem {
  id: string;
  category: string;
  tag: string;
  name: string;
  desc: string;
  imageUrl: string;
}

export const GEM_FACILITIES: GemFacilityItem[] = [
  {
    id: "fac-1",
    category: "수술센터",
    tag: "수술실",
    name: "수술실",
    desc: "감염없는 청정 환경",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLXCoqADW7__WiCQ-cDYKB3fzIAnQ7eHuUw1T3rnLZUeDXxt_JqGM8YfQVu88IrJ7FMFI8H4qJAyPd8iClyWoW0v0_L1UxTH5fKP4bSa9S5aa0q9_vaddQ9J-IVYj5xIgij8xaU-lGnHLkXLmEiXFkkepYEriSmT1m3Kg8eZ-dY43eLwzsoYpCOQyMRPsDgHBDlFDqldlT9bbnTOEWorNYHE-cB-Un-mPeHxGGEqFBtqm8fvD707ZeXQ",
  },
  {
    id: "fac-2",
    category: "영상진단센터",
    tag: "MRI 검사실",
    name: "독일 Siemens 3.0T MRI",
    desc: "고해상도 미세혈관 스캔",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSK0Yzi7KoU2TT8jPbBcN7nv4xPFat2bKDv8hP3kTE0-RJrAk08AXj0zQ8MbJg1byA4qHlZ_rO8bmuw72LK9-7A0faqceelIWm6rj8NsUXTWMocitwIchRDUIbQxK5JfOCXP_idJkqjN3MnN-mMZbHPISgptBmfeVQm7KDT9hboyphiIYxyWmKMdc_cIyfbkPjQLPuJKovpUIWsLMJqZJLgaQPtFgKX9ycAFaP-7kaLQXvuOXbs-eLzQ",
  },
  {
    id: "fac-3",
    category: "영상진단센터",
    tag: "CT 검사실",
    name: "128채널 정밀 CT",
    desc: "최저 피폭 초고속 3D 입체",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCje17LEJ8OhJrE865SgzW0yG48dbaLzWO8Na-Auu6tODZBgcN3qAPF46KnLBfJNOjmFFjuEz8v-VZkggvUdkDhXNDu6jocZOlFfJHI3qX4ZApCiQ71RZiYaYDUtPINbIoekZItZr2z0rFuX7QfHWyIOk7Rjah6tJQzr565VW6pWZFX1LJWMn5b5xPml-EEaXYz-Q6QkpV1pi0MzhzTJxLNiVs6Q487C6CJATtQe_9TEnvKzsIrWl9pVg",
  },
  {
    id: "fac-4",
    category: "도수재활센터",
    tag: "도수치료실",
    name: "1:1 맞춤 도수재활센터",
    desc: "전문 물리치료사 맞춤 플랜",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC64XtvqD6NErcP36sReN8MGaT9iivtJ8TYjisIdfS5ePeKMz1w2CEpoLKuOx5WD4qVJ28nyP89kQejNLZOYYejYWeCamrnlxedOzi6liYjrG9mgzJM9uLE5MCJViF_TZkuPZ6E7bJ9wS_9rQvIoz2F8TAvsHKk_aJ4_WLgT2x4eNMsDXjDRYMyDow-hXJrnLyC8In1jIrK1dFi3NDMLwDYhI2I11hgqI8AfvgrMPqmqkPKH8s1rZ7bmA",
  },
  {
    id: "fac-5",
    category: "입원실/간호간병",
    tag: "입원병동",
    name: "간호·간병 통합 입원실",
    desc: "보호자 없는 24시 전담 간호",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLBXzGeTEoJfODDGfD9ISG0RBF97BnQFenVKG5Bb5d7tqR4h6abpBtSunFwcibfrAMte_u_fQmbZOA9qEx1Aqgn_Otfb1tupLNLQeMn8e9VkuOMutnzMPcP2rC1jV_BswGXHMNmv00HEaRD4T_8iFNhNetsrJ-UzYkb_BZAq45o7yF30-5qeTlGf0qDvnv5eLo2wHrQCigEUI0p9N00c6AW7x6HkL8kOcUI8C0Rz0P55GRWyknQQ7S9w",
  },
  {
    id: "fac-6",
    category: "건강검진센터",
    tag: "인공신장실",
    name: "NCU-18 최신 혈액투석실",
    desc: "초순수 정수시스템 / 신장 전문의 상주",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl_BsRXyrO9JziKWVEFEXa05O5DU-mY0DBOf7ZC-pBHH_iRREMcTYwYqzJ2FYWDJrBZ4Hq-vERsyP-FXiv7BBA69TH0UEOI9vvaJppWU5oB9NE45hUfAzrpZaJj2l34L7qou1kjIbTiJ-QAb8eNLK4g66QqcrpByuuHCqqELB5IdXRkSg3JX7Ppgca4FIZGmv2_TF2lCdIF0kUfliAj_GZFVYFwKje5Zej5GT6RcP6raHTYKCuUdRF2Q",
  },
];

// 10. [최우진 대리 백엔드 연동용] 생생한 환자 치료 스토리 데이터 모델 및 시더 데이터
export interface GemPatientStoryItem {
  id: string;
  category: string;
  categoryBg: string;
  patientName: string; // 개인정보 마스킹 (박OO 환자 등)
  patientAge: string;
  title: string;
  quote: string;
  summary: string;
  rating: number;
  doctorInCharge: string;
  treatmentName: string;
  imageUrl: string;
  beforeSymptoms: string;
  afterRecovery: string;
  doctorComment: string;
  date: string;
}

export const GEM_PATIENT_STORIES: GemPatientStoryItem[] = [
  {
    id: "story-1",
    category: "허리디스크 비수술",
    categoryBg: "bg-[#EBF2FC] text-[#0052CC]",
    patientName: "박OO 환자",
    patientAge: "62세",
    title: "밤마다 잠을 못 이룰 정도로 극심했던 허리통증, 비수술 신경성형술로 말끔히 회복했습니다!",
    quote: "여러 병원에서 무조건 수술을 권유받아 걱정이 컸는데, 인천하이병원에서는 정확한 정밀검사 후 비수술 치료를 최우선으로 진행해 주셨습니다. 원장님의 자상한 설명 덕분에 불안감 없이 빠르게 회복했습니다.",
    summary: "극심한 허리 방사통으로 보행 장애를 겪던 중 감압신경성형술을 통해 당일 시술 후 보행 기능을 완벽히 회복한 사례입니다.",
    rating: 5.0,
    doctorInCharge: "서동광 병원장 (신경외과)",
    treatmentName: "초정밀 감압신경성형술",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwpp_AWm8PeRte1qe35tMrpkS-vfNJyHsC4Uy8fpCVTOQcUVOdGF0HfQZzjFKhti8_268D1AoeCtTlkwArI36dxEkDc0yIiIxf5CVSuM-YIxU-kcWF8dGWzq-YfqoWR8D8Ei03mo2BbC5cSMJVtYTh6WcQ_ZK32lN--qQjd9yZd6Z7P5H1LtJp5pT5mMtJ3Ewp97ovrMdtaUIHB9_fvoGfa8Q8sNOZghY8oTLc4eGhGpWkPjxlRSqOoA",
    beforeSymptoms: "우측 다리 저림 및 10분 이상 직립 불능, 진통제 복용에도 야간 통증 지속",
    afterRecovery: "시술 2주 차 통증지수(VAS) 8점에서 1점으로 감소, 정상 일상생활 및 가벼운 등산 가능",
    doctorComment: "정밀 MRI 검사 결과 제4-5 요추간판 탈출증으로 신경 압박이 심했으나 마비 증상이 없어 비수술 카테터 신경성형술을 시행하여 염증과 부종을 안전하게 제거했습니다.",
    date: "2026.02.10",
  },
  {
    id: "story-2",
    category: "무릎 인공관절 로봇수술",
    categoryBg: "bg-teal-50 text-[#006971]",
    patientName: "김OO 환자",
    patientAge: "68세",
    title: "계단 오르내리기가 무서웠는데, 3D 맞춤 인공관절 수술 후 다음 날 바로 보행 연습을 시작했습니다.",
    quote: "연골이 다 닳아서 O자형 다리로 변형되고 매일 울면서 지냈어요. 김인철 원장님 집도로 수술받고 통증도 거의 없고 다리도 곧게 펴져서 제2의 인생을 살고 있습니다.",
    summary: "말기 무릎 퇴행성관절염으로 다리 변형이 동반된 환자에게 3D 시뮬레이션 기반 최소절개 인공관절 치환술을 적용하여 조기 보행을 실현한 케이스입니다.",
    rating: 5.0,
    doctorInCharge: "김인철 명예원장 (정형외과)",
    treatmentName: "3D 환자맞춤형 인공관절 치환술",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoGtPxeI9KEcVTq4jotzYlY-HHIDNwlnStVvi5m7gH9Qd7PqglEadlAZk_ta7bAvXSvE7vy1hO9Qf3h1px0ayTQwKX796w9WgEBtiA6CWfDnfbPSOzaTK3ZALBuJdnX5gW0kb1w7Ec1ftSlPaTXNm83lrpFjMTzeUleUsBGD5P918cn4yq9ojcQNILN_9tBZIADdymVAUWPDpOEWbppuNXpPTBwKQOUyC1rrxKSCeMcFDupWjx0ZR6xA",
    beforeSymptoms: "양측 무릎 관절강 협착 말기, 심한 O자 다리 변형 및 야간 관절통",
    afterRecovery: "수술 다음 날 보행기(워커) 보행 시작, 수술 3주 차 독립 보행 및 굴곡 각도 125도 확보",
    doctorComment: "환자분의 관절 각도와 골밀도를 3D 디지털 모델링하여 오차 없이 정확한 위치에 임플란트를 삽입함으로써 정상 인대 손상을 최소화하여 빠른 회복을 이끌어냈습니다.",
    date: "2026.01.28",
  },
  {
    id: "story-3",
    category: "목디스크 고주파시술",
    categoryBg: "bg-indigo-50 text-indigo-700",
    patientName: "이OO 환자",
    patientAge: "49세",
    title: "어깨와 팔이 끊어질 듯 저려서 컴퓨터 작업을 못 했는데, 고주파수핵성형술 후 통증이 90% 사라졌어요.",
    quote: "사무직이라 하루 종일 모니터를 보는데 손가락 끝까지 전기가 통하듯 찌릿찌릿했습니다. 절개 없는 1mm 미세 바늘 시술로 당일 퇴원하여 직장에 바로 복귀할 수 있었습니다.",
    summary: "경추 추간판 탈출증으로 인한 극심한 상지 방사통을 절개 없는 고주파 열에너지로 감압 및 수축시킨 최소침습 시술 성공 사례입니다.",
    rating: 5.0,
    doctorInCharge: "이동걸 대표원장 (신경외과)",
    treatmentName: "경추 고주파 수핵성형술",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo2bCq9vYmGqCsmF4N-1n2VlJ8pY4q8T3j9_pQ0e0x-1mXj2w_N6d4bY5vQ7k9lA8e1f5g8_pP0r8q2t5",
    beforeSymptoms: "제5-6 경추 디스크 돌출, 우측 어깨 결림 및 제4, 5 수지 저림증",
    afterRecovery: "시술 즉시 팔 저림 80% 호전, 시술 1개월 차 경추 가동범위 완벽 회복",
    doctorComment: "절개 없이 국소마취 하에 1mm 가느다란 특수 바늘을 디스크 내부로 진입시켜 고주파 플라즈마 에너지로 신경 압박 부위만 선택적으로 수축시켜 안정성을 극대화했습니다.",
    date: "2026.02.04",
  },
  {
    id: "story-4",
    category: "척추관협착증 내시경",
    categoryBg: "bg-amber-50 text-[#603B00]",
    patientName: "정OO 환자",
    patientAge: "73세",
    title: "10분도 못 걷고 주저앉아야 했는데, 양방향 척추내시경 수술 후 허리를 꼿꼿이 펴고 산책합니다.",
    quote: "나이가 많아 큰 수술은 엄두도 못 냈는데, 인천하이병원에서 내시경으로 구멍 두 개만 내어 두꺼워진 인대만 쏙 긁어내 주셨어요. 흉터도 거의 없고 통증도 씻은 듯 사라졌습니다.",
    summary: "고령의 중증 척추관협착증 환자에게 전신마취 없이 척추 마취와 양방향 내시경(UBE)을 적용하여 안전하게 척추관을 넓혀준 고난도 치료 사례입니다.",
    rating: 5.0,
    doctorInCharge: "장현진 원장 (신경외과)",
    treatmentName: "양방향 척추내시경 감압술 (UBE)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwpp_AWm8PeRte1qe35tMrpkS-vfNJyHsC4Uy8fpCVTOQcUVOdGF0HfQZzjFKhti8_268D1AoeCtTlkwArI36dxEkDc0yIiIxf5CVSuM-YIxU-kcWF8dGWzq-YfqoWR8D8Ei03mo2BbC5cSMJVtYTh6WcQ_ZK32lN--qQjd9yZd6Z7P5H1LtJp5pT5mMtJ3Ewp97ovrMdtaUIHB9_fvoGfa8Q8sNOZghY8oTLc4eGhGpWkPjxlRSqOoA",
    beforeSymptoms: "간헐적 파행증(50m 보행 후 주저앉음), 둔부 및 양 하지 당김과 냉감",
    afterRecovery: "수술 3일 후 퇴원, 하루 6,000보 연속 보행 가능, 보행 장애 완치",
    doctorComment: "초고화질 내시경으로 신경 조직을 10배 확대하여 보면서 신경을 누르는 황색인대만 정밀 제거하고 정상 뼈와 근육 손상을 최소화하여 고령 환자도 안전하게 치료를 마칠 수 있었습니다.",
    date: "2026.01.15",
  },
];

