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
