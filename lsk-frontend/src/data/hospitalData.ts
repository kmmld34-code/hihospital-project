/**
 * ==============================================================================
 * [HI Hospital] 프론트엔드 정적 데이터 명세 (SSG 최적화)
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 정재이 과장 (UI/UX), 수진 실장 (PM)
 * ==============================================================================
 */

// 1. 헤더 네비게이션 메뉴 (11개 1Depth 메뉴)
export const GEM_NAV_ITEMS = [
  { name: "병원소개", href: "/about" },
  { name: "뇌신경", href: "/neurosurgery" },
  { name: "척추클리닉", href: "/spine", badge: "특화" },
  { name: "무릎·고관절", href: "/knee-hip", badge: "특화" },
  { name: "어깨관절", href: "/shoulder" },
  { name: "수·족부", href: "/hand-foot" },
  { name: "외과진료", href: "/surgery-general" },
  { name: "내과진료", href: "/internal-medicine" },
  { name: "건강검진", href: "/checkup" },
  { name: "산부인과", href: "/obgyn" },
  { name: "커뮤니티", href: "/community" },
];

// 2. 최상단 히어로 배너 슬라이드 (기본 4개, 관리자 확장 가능)
export interface GemSlideItem {
  id: string;
  order: number;
  badge: string;
  headline: string;
  subheadline: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  accentColor: string;
}

export const GEM_HERO_SLIDES: GemSlideItem[] = [
  {
    id: "slide-01",
    order: 1,
    badge: "대학병원급 정밀 진단 시스템",
    headline: "응급치료부터 고난이도 수술까지!\n척추·관절 명의의 정확한 진료",
    subheadline: "365일 24시간 응급시설을 완비한 척추·관절 특화 전문 HI Hospital",
    backgroundImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80",
    ctaText: "온라인 진료예약 바로가기",
    ctaLink: "/appointments",
    accentColor: "#0052CC",
  },
  {
    id: "slide-02",
    order: 2,
    badge: "첨단 3.0T MRI & 128채널 CT",
    headline: "원스톱 당일 검사 & 당일 판독\n기다림 없는 쾌속 진단 솔루션",
    subheadline: "대학병원급 고해상도 영상장비로 통증의 미세한 근본 원인까지 정밀 포착합니다.",
    backgroundImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1920&q=80",
    ctaText: "첨단 영상장비 둘러보기",
    ctaLink: "/about/facility",
    accentColor: "#00A8B5",
  },
  {
    id: "slide-03",
    order: 3,
    badge: "풍부한 임상경험의 10인 전문의",
    headline: "대학병원 출신 각 분과별 전문의의\n정직하고 세심한 1:1 책임 진료",
    subheadline: "과잉진료 없는 바른 진단으로 환자 한 분 한 분의 평생 관절 건강을 지킵니다.",
    backgroundImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1920&q=80",
    ctaText: "10인 전문의 프로필 확인",
    ctaLink: "/about/doctors",
    accentColor: "#071E54",
  },
  {
    id: "slide-04",
    order: 4,
    badge: "칼 대신, 정확한 시술로",
    headline: "환자 부담을 획기적으로 줄이는\n비수술 우선 척추·관절 맞춤 치료",
    subheadline: "신경차단술, 체외충격파(ESWT), 1:1 감압도수치료로 일상 복귀를 앞당깁니다.",
    backgroundImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80",
    ctaText: "비수술 치료클리닉 안내",
    ctaLink: "/spine/non-surgery",
    accentColor: "#0052CC",
  },
];

// 3. 우측 고정 사이드 배너 (Sticky Quick Menu)
export const GEM_QUICK_MENU_ITEMS = [
  { id: "resv", label: "간편예약", icon: "CalendarCheck", href: "/appointments", isHighlight: true },
  { id: "hours", label: "진료시간", icon: "Clock", href: "/about/hours", isHighlight: false },
  { id: "directions", label: "오시는길", icon: "MapPin", href: "/about/directions", isHighlight: false },
  { id: "call", label: "전화상담", icon: "PhoneCall", href: "tel:1600-8549", isHighlight: false },
  { id: "kakao", label: "카톡상담", icon: "MessageSquare", href: "https://pf.kakao.com", isHighlight: false },
];

// 4. 10인의 전문 의료진 데이터 (바로서구병원 벤치마킹)
export const GEM_DOCTORS = [
  {
    id: "doc-1",
    name: "김진수",
    role: "대표원장 / 정형외과 전문의",
    dept: "관절정형외과",
    specialty: ["무릎 인공관절", "관절내시경", "스포츠외상"],
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    schedule: "월/수/금 진료",
  },
  {
    id: "doc-2",
    name: "이승환",
    role: "원장 / 신경외과 전문의",
    dept: "척추외과",
    specialty: ["목·허리디스크", "미세현미경수술", "척추내시경"],
    imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    schedule: "화/목/토 진료",
  },
  {
    id: "doc-3",
    name: "박도현",
    role: "원장 / 정형외과 전문의",
    dept: "관절정형외과",
    specialty: ["어깨 회전근개", "오십견", "체외충격파"],
    imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80",
    schedule: "월/화/목 진료",
  },
  {
    id: "doc-4",
    name: "최유진",
    role: "원장 / 신경과 전문의",
    dept: "신경과",
    specialty: ["두통·어지럼증", "치매 조기진단", "말초신경병"],
    imageUrl: "https://images.unsplash.com/photo-1594824813629-87a419eb9431?auto=format&fit=crop&w=600&q=80",
    schedule: "수/금/토 진료",
  },
  {
    id: "doc-5",
    name: "정우택",
    role: "원장 / 일반외과 전문의",
    dept: "일반외과",
    specialty: ["대장항문·치핵", "하지정맥류", "액취증"],
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    schedule: "월/수/목 진료",
  },
  {
    id: "doc-6",
    name: "한상민",
    role: "원장 / 내과 전문의",
    dept: "내과",
    specialty: ["신장투석", "고혈압·당뇨", "만성질환 케어"],
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    schedule: "월/화/수/금 진료",
  },
];

// 5. 3D 인터랙티브 신체 부위 및 질환 매핑 (인천하이병원 시그니처 3D)
export const GEM_BODY_PARTS = [
  {
    id: "neck",
    label: "목 (경추)",
    diseases: ["목디스크 (경추 추간판탈출증)", "거북목·일자목 증후군", "경추 척추관협착증"],
    targetLink: "/spine/cervical-disc",
  },
  {
    id: "shoulder",
    label: "어깨",
    diseases: ["회전근개파열", "오십견 (유착성 관절낭염)", "석회화건염", "어깨충돌증후군"],
    targetLink: "/shoulder",
  },
  {
    id: "back",
    label: "허리 (요추)",
    diseases: ["허리디스크 (요추 추간판탈출증)", "척추관협착증", "척추전방전위증", "압박골절"],
    targetLink: "/spine/lumbar-disc",
  },
  {
    id: "knee",
    label: "무릎·고관절",
    diseases: ["퇴행성 관절염", "반월상 연골판 손상", "십자인대 파열", "대퇴골두무혈성괴사"],
    targetLink: "/knee-hip",
  },
  {
    id: "handfoot",
    label: "손·발·발목",
    diseases: ["손목터널증후군", "방아쇠수지", "족저근막염", "발목인대 불안정증"],
    targetLink: "/hand-foot",
  },
  {
    id: "brain",
    label: "두부 (뇌신경)",
    diseases: ["만성 두통·어지럼증", "치매 조기검진", "뇌졸중 예방", "손발저림 신경병증"],
    targetLink: "/neurosurgery",
  },
];

// 6. 중점 특화 진료센터 4대 축
export const GEM_SPECIAL_CENTERS = [
  {
    title: "최소침습 척추센터",
    subtitle: "Spine Center",
    desc: "미세현미경 디스크 제거술, 척추내시경, 최소침습 유합술",
    badge: "비수술/수술 원스톱",
    icon: "Activity",
    link: "/spine",
  },
  {
    title: "맞춤형 관절센터",
    subtitle: "Joint Center",
    desc: "3D 맞춤 인공관절 수술, 관절내시경, 줄기세포 연골재생",
    badge: "정밀 관절 보존",
    icon: "ShieldAlert",
    link: "/knee-hip",
  },
  {
    title: "뇌신경·치매센터",
    subtitle: "Neurology Center",
    desc: "두통, 어지럼증 클리닉, 뇌졸중 골든타임 대처, 치매 조기검진",
    badge: "신경과 전문의 협진",
    icon: "Brain",
    link: "/neurosurgery",
  },
  {
    title: "인공신장실 (혈액투석)",
    subtitle: "Kidney Care Center",
    desc: "최신 고효율 투석기계 완비, 감염 예방 독립 음압 투석실",
    badge: "투석전문의 상주",
    icon: "HeartPulse",
    link: "/internal-medicine/dialysis",
  },
];
