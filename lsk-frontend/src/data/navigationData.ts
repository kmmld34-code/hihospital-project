/**
 * ==============================================================================
 * [HI Hospital] GNB 네비게이션 및 사이트맵 데이터 명세서 (navigationData.ts)
 * ==============================================================================
 * 작성자: 고윤기 대리 (Frontend Lead Engineer)
 * 기획 및 디자인 감수: 강수진 PM, 정재이 과장 (UI/UX)
 * 최종 수정일: 2026-09-16 (아이디어 회의 결정사항 반영)
 * ==============================================================================
 * [설계 특징]
 * 1. 11개 1Depth 메뉴의 세부 질환 및 클리닉 목록(2Depth, 3Depth) 완전 정의
 * 2. 질환이 많은 특화 메뉴(척추, 무릎·고관절 등)는 2~3열 와이드 레이아웃 지원
 * 3. 각 메뉴별 우측 큐레이션 카드(비수술 퀵링크, 전문의 안내, 자가진단 등) 탑재
 * 4. 전체메뉴 슬라이드 다운 메가 드로어와 완벽 연동
 * ==============================================================================
 */

export interface SubMenuItem {
  name: string;
  href: string;
  badge?: string;
  isHighlight?: boolean;
}

export interface SubMenuColumn {
  title?: string;
  items: SubMenuItem[];
}

export interface CurationCard {
  title: string;
  description: string;
  badge?: string;
  href: string;
  actionText: string;
  requireAuthTitle?: boolean;
}

export interface NavItem {
  id: string;
  name: string;
  href: string;
  columns: SubMenuColumn[];
  curation?: CurationCard;
}

export const GEM_EXTENDED_NAV_ITEMS: NavItem[] = [
  // 1. 병원소개
  {
    id: "about",
    name: "병원소개",
    href: "/about",
    columns: [
      {
        title: "병원 안내",
        items: [
          { name: "인사말", href: "/about/greeting" },
          { name: "의료진소개", href: "/about/doctors", isHighlight: true },
          { name: "진료시간안내", href: "/about/hours" },
          { name: "입원안내", href: "/about/hospitalization" },
          { name: "오시는길", href: "/about/directions" },
        ],
      },
    ],
    curation: {
      title: "10인의 분야별 전문의",
      description: "풍부한 임상경험과 최첨단 장비로 환자 중심의 맞춤 진료를 약속합니다.",
      badge: "의료진",
      href: "/about/doctors",
      actionText: "의료진 프로필 보기",
    },
  },

  // 2. 뇌신경
  {
    id: "neurosurgery",
    name: "뇌신경",
    href: "/neurosurgery",
    columns: [
      {
        title: "뇌신경 클리닉",
        items: [
          { name: "두통·어지럼증", href: "/neurosurgery/headache-dizziness", isHighlight: true },
          { name: "치매", href: "/neurosurgery/dementia" },
          { name: "뇌졸중(중풍)", href: "/neurosurgery/stroke", isHighlight: true },
          { name: "말초신경병", href: "/neurosurgery/peripheral-neuropathy" },
        ],
      },
    ],
    curation: {
      title: "골든타임이 중요한 뇌혈관 질환",
      description: "첨단 3.0T MRI 당일 검사 및 판독으로 원인을 신속하게 규명합니다.",
      badge: "정밀진단",
      href: "/neurosurgery/headache-dizziness",
      actionText: "뇌신경센터 안내",
    },
  },

  // 3. 척추클리닉 (특화 센터: 3열 와이드 구조)
  {
    id: "spine",
    name: "척추클리닉",
    href: "/spine",
    columns: [
      {
        title: "목·경추 질환",
        items: [
          { name: "목디스크", href: "/spine/cervical-disc", isHighlight: true },
          { name: "거북목 증후군", href: "/spine/turtle-neck" },
          { name: "일자목증후군", href: "/spine/straight-neck" },
          { name: "경추 척추관협착증", href: "/spine/cervical-stenosis" },
          { name: "근막통증증후군", href: "/spine/myofascial-pain" },
        ],
      },
      {
        title: "허리·요추 질환",
        items: [
          { name: "허리디스크", href: "/spine/lumbar-disc", isHighlight: true },
          { name: "척추관협착증", href: "/spine/lumbar-stenosis", isHighlight: true },
          { name: "척추 압박골절", href: "/spine/compression-fracture" },
          { name: "척추측만증", href: "/spine/scoliosis" },
          { name: "척추전방전위증", href: "/spine/spondylolisthesis" },
        ],
      },
      {
        title: "비수술 / 수술 치료",
        items: [
          { name: "감압신경성형술", href: "/spine/decompression-neuroplasty", badge: "비수술" },
          { name: "고주파수핵성형술", href: "/spine/rf-nucleoplasty", badge: "비수술" },
          { name: "선택적신경차단술", href: "/spine/nerve-block", badge: "비수술" },
          { name: "미세현미경 디스크제거술", href: "/spine/microscopic", badge: "수술" },
          { name: "척추체성형술(골시멘트)", href: "/spine/vertebroplasty", badge: "수술" },
        ],
      },
    ],
    curation: {
      title: "비수술 우선 척추 솔루션",
      description: "환자의 90% 이상은 비수술적 시술과 맞춤 재활로 호전될 수 있습니다.",
      badge: "특화클리닉",
      href: "/spine/decompression-neuroplasty",
      actionText: "비수술 시술 알아보기",
    },
  },

  // 4. 무릎·고관절 (특화 센터: 2열 와이드 구조)
  {
    id: "knee-hip",
    name: "무릎·고관절",
    href: "/knee-hip",
    columns: [
      {
        title: "무릎 관절 질환",
        items: [
          { name: "퇴행성 관절염", href: "/knee-hip/arthritis", isHighlight: true },
          { name: "무릎 연골판 손상", href: "/knee-hip/cartilage-injury" },
          { name: "십자인대 파열", href: "/knee-hip/ligament-tear" },
          { name: "슬개골 연골연화증", href: "/knee-hip/chondromalacia" },
          { name: "줄기세포 연골재생술", href: "/knee-hip/cartilage-regeneration", badge: "재생" },
        ],
      },
      {
        title: "고관절 및 수술치료",
        items: [
          { name: "대퇴골두무혈성괴사", href: "/knee-hip/avn", isHighlight: true },
          { name: "고관절염 줄기세포치료", href: "/knee-hip/hip-stemcell" },
          { name: "무릎 인공관절 치환술", href: "/knee-hip/knee-replacement", badge: "수술" },
          { name: "관절경 최소침습 시술", href: "/knee-hip/knee-replacement/arthroscopy" },
          { name: "휜다리 교정 절골술(HTO)", href: "/knee-hip/knee-replacement/hto" },
        ],
      },
    ],
    curation: {
      title: "고난도 인공관절 치환술",
      description: "로봇 인공관절 및 최소 절개 내시경으로 빠른 보행과 회복을 돕습니다.",
      badge: "관절특화",
      href: "/knee-hip/knee-replacement",
      actionText: "인공관절 센터 바로가기",
    },
  },

  // 5. 어깨관절
  {
    id: "shoulder",
    name: "어깨관절",
    href: "/shoulder",
    columns: [
      {
        title: "어깨 질환 및 치료",
        items: [
          { name: "회전근개 파열", href: "/shoulder/rotator-cuff", isHighlight: true },
          { name: "오십견(유착성관절낭염)", href: "/shoulder/frozen-shoulder", isHighlight: true },
          { name: "석회화건염", href: "/shoulder/calcific-tendinitis" },
          { name: "어깨충돌증후군", href: "/shoulder/impingement" },
          { name: "체외충격파 & 주사치료", href: "/shoulder/eswt", badge: "비수술" },
        ],
      },
    ],
    curation: {
      title: "밤에 잠 못 이루는 어깨 통증",
      description: "정밀 초음파 검진 후 당일 비수술 주사 및 충격파로 염증을 가라앉힙니다.",
      badge: "어깨센터",
      href: "/shoulder/rotator-cuff",
      actionText: "어깨 치료법 확인",
    },
  },

  // 6. 수·족부
  {
    id: "hand-foot",
    name: "수·족부",
    href: "/hand-foot",
    columns: [
      {
        title: "손·발 특화 질환",
        items: [
          { name: "손목터널증후군", href: "/hand-foot/carpal-tunnel", isHighlight: true },
          { name: "테니스/골프엘보", href: "/hand-foot/tennis-elbow" },
          { name: "방아쇠수지", href: "/hand-foot/trigger-finger" },
          { name: "무지외반증", href: "/hand-foot/hallux-valgus", isHighlight: true },
          { name: "족저근막염", href: "/hand-foot/plantar-fasciitis" },
          { name: "발목인대 재건술", href: "/hand-foot/ankle-ligament-reconstruction" },
        ],
      },
    ],
    curation: {
      title: "섬세한 수부·족부 미세수술",
      description: "일상의 손동작과 건강한 발걸음을 되찾아 드립니다.",
      badge: "수족부",
      href: "/hand-foot/plantar-fasciitis",
      actionText: "수·족부 클리닉 안내",
    },
  },

  // 7. 외과진료
  {
    id: "surgery-general",
    name: "외과진료",
    href: "/surgery-general",
    columns: [
      {
        title: "일반 외과",
        items: [
          { name: "대장항문·치핵", href: "/surgery-general/colorectal-hemorrhoid", isHighlight: true },
          { name: "액취증 클리닉", href: "/surgery-general/osmidrosis" },
          { name: "하지정맥류 시술", href: "/surgery-general/varicose-veins", isHighlight: true },
        ],
      },
    ],
    curation: {
      title: "최소 통증 당일 외과 시술",
      description: "무통 치핵 수술 및 고주파 하지정맥류로 일상 복귀가 빠릅니다.",
      badge: "외과센터",
      href: "/surgery-general/varicose-veins",
      actionText: "외과 진료 안내",
    },
  },

  // 8. 내과진료
  {
    id: "internal-medicine",
    name: "내과진료",
    href: "/internal-medicine",
    columns: [
      {
        title: "내과 & 인공신장",
        items: [
          { name: "일반내과(고혈압/당뇨)", href: "/internal-medicine/general", isHighlight: true },
          { name: "인공신장실(혈액투석)", href: "/internal-medicine/dialysis", isHighlight: true },
        ],
      },
    ],
    curation: {
      title: "최신 혈액투석 장비 인공신장실",
      description: "투석 전문 의료진과 쾌적한 전용 병상으로 안전하고 편안합니다.",
      badge: "신장센터",
      href: "/internal-medicine/dialysis",
      actionText: "인공신장실 둘러보기",
    },
  },

  // 9. 건강검진
  {
    id: "checkup",
    name: "건강검진",
    href: "/checkup",
    columns: [
      {
        title: "검진 프로그램",
        items: [
          { name: "국가건강검진", href: "/checkup/national" },
          { name: "5대 암검진", href: "/checkup/cancer", isHighlight: true },
          { name: "종합건강검진", href: "/checkup/comprehensive", isHighlight: true },
          { name: "100세 맞춤 시니어검진", href: "/checkup/happy-dream/age-100" },
          { name: "여성·남성 정밀검진", href: "/checkup/happy-dream/female" },
          { name: "채용 신체검진", href: "/checkup/employment" },
        ],
      },
    ],
    curation: {
      title: "원스톱 종합건강검진센터",
      description: "정밀 내시경 및 영상의학과 전문의 판독으로 질병을 조기 예방합니다.",
      badge: "검진센터",
      href: "/checkup/comprehensive",
      actionText: "검진 프로그램 안내",
    },
  },

  // 10. 산부인과
  {
    id: "obgyn",
    name: "산부인과",
    href: "/obgyn",
    columns: [
      {
        title: "여성 건강 클리닉",
        items: [
          { name: "폐경·갱년기 클리닉", href: "/obgyn/menopause", isHighlight: true },
          { name: "비만·체형 클리닉", href: "/obgyn/obesity" },
          { name: "일반여성질환 검진", href: "/obgyn/general-women" },
        ],
      },
    ],
    curation: {
      title: "여성 생애주기 맞춤 케어",
      description: "여성 호르몬 불균형과 갱년기 증상을 편안하게 상담받으세요.",
      badge: "여성클리닉",
      href: "/obgyn/menopause",
      actionText: "산부인과 안내",
    },
  },

  // 11. 커뮤니티
  {
    id: "community",
    name: "커뮤니티",
    href: "/community",
    columns: [
      {
        title: "소식 및 소통",
        items: [
          { name: "병원소식 & 공지", href: "/community/news", isHighlight: true },
          { name: "건강칼럼(블로그)", href: "/community/blog" },
          { name: "비급여 진료비용 안내", href: "/community/non-reimbursable" },
          { name: "주간 영양 식단표", href: "/community/diet-menu" },
          { name: "온라인문의", href: "/community/inquiry", isHighlight: true },
          { name: "자주 묻는 질문(FAQ)", href: "/community/faq" },
        ],
      },
    ],
    curation: {
      title: "1:1 온라인상담",
      description: "1:1문의는 로그인 후 이용 가능하며, 문의하신 질문과 답변 내역을 안전하게 따로 관리하실 수 있습니다.",
      badge: "온라인문의",
      href: "/community/inquiry",
      actionText: "온라인 문의 남기기",
      requireAuthTitle: true,
    },
  },
];

// ==============================================================================
// [전체메뉴 사이트맵 전용 슬림 데이터 명세 (GEM_SITEMAP_NAV_ITEMS)]
// ==============================================================================
// 정재이 과장 & 대표님 지침 반영:
// 척추클리닉, 무릎·고관절의 복잡한 3단 개별 시술법을 생략하고 
// 2단 대표 카테고리(척추 비수술클리닉, 척추 수술클리닉, 무릎 인공관절수술)로 슬림화하여
// 11개 진료과 컬럼의 세로 높이를 고르게 평준화하고 화면 압박감을 40% 이상 해소함.
// ==============================================================================
export const GEM_SITEMAP_NAV_ITEMS = [
  {
    id: "about",
    name: "병원소개",
    href: "/about",
    items: [
      { name: "인사말", href: "/about/greeting" },
      { name: "의료진소개", href: "/about/doctors" },
      { name: "진료시간안내", href: "/about/hours" },
      { name: "입원안내", href: "/about/hospitalization" },
      { name: "오시는길", href: "/about/directions" },
    ],
  },
  {
    id: "neurosurgery",
    name: "뇌신경",
    href: "/neurosurgery",
    items: [
      { name: "두통·어지럼증", href: "/neurosurgery/headache-dizziness" },
      { name: "치매", href: "/neurosurgery/dementia" },
      { name: "뇌졸중(중풍)", href: "/neurosurgery/stroke" },
      { name: "말초신경병", href: "/neurosurgery/peripheral-neuropathy" },
    ],
  },
  {
    id: "spine",
    name: "척추클리닉",
    href: "/spine",
    items: [
      { name: "목디스크", href: "/spine/cervical-disc" },
      { name: "거북목·일자목", href: "/spine/turtle-neck" },
      { name: "경추 척추관협착증", href: "/spine/cervical-stenosis" },
      { name: "허리디스크", href: "/spine/lumbar-disc" },
      { name: "척추관협착증", href: "/spine/lumbar-stenosis" },
      { name: "압박골절·측만증", href: "/spine/compression-fracture" },
      { name: "척추전방전위증", href: "/spine/spondylolisthesis" },
      { name: "척추 비수술클리닉", href: "/spine/decompression-neuroplasty" },
      { name: "척추 수술클리닉", href: "/spine/microscopic" },
    ],
  },
  {
    id: "knee-hip",
    name: "무릎·고관절",
    href: "/knee-hip",
    items: [
      { name: "퇴행성 관절염", href: "/knee-hip/arthritis" },
      { name: "무릎 연골판 손상", href: "/knee-hip/cartilage-injury" },
      { name: "십자인대 파열", href: "/knee-hip/ligament-tear" },
      { name: "슬개골 연골연화증", href: "/knee-hip/chondromalacia" },
      { name: "대퇴골두무혈성괴사", href: "/knee-hip/avn" },
      { name: "줄기세포 연골재생술", href: "/knee-hip/cartilage-regeneration" },
      { name: "무릎 인공관절수술", href: "/knee-hip/knee-replacement" },
    ],
  },
  {
    id: "shoulder",
    name: "어깨관절",
    href: "/shoulder",
    items: [
      { name: "회전근개 파열", href: "/shoulder/rotator-cuff" },
      { name: "오십견", href: "/shoulder/frozen-shoulder" },
      { name: "석회화건염", href: "/shoulder/calcific-tendinitis" },
      { name: "어깨충돌증후군", href: "/shoulder/impingement" },
      { name: "체외충격파&주사", href: "/shoulder/eswt" },
    ],
  },
  {
    id: "hand-foot",
    name: "수·족부",
    href: "/hand-foot",
    items: [
      { name: "손목터널증후군", href: "/hand-foot/carpal-tunnel" },
      { name: "테니스·골프엘보", href: "/hand-foot/tennis-elbow" },
      { name: "방아쇠수지", href: "/hand-foot/trigger-finger" },
      { name: "무지외반증", href: "/hand-foot/hallux-valgus" },
      { name: "족저근막염", href: "/hand-foot/plantar-fasciitis" },
      { name: "발목인대 재건술", href: "/hand-foot/ankle-ligament-reconstruction" },
    ],
  },
  {
    id: "surgery-general",
    name: "외과진료",
    href: "/surgery-general",
    items: [
      { name: "대장항문·치핵", href: "/surgery-general/colorectal-hemorrhoid" },
      { name: "액취증 클리닉", href: "/surgery-general/osmidrosis" },
      { name: "하지정맥류 시술", href: "/surgery-general/varicose-veins" },
    ],
  },
  {
    id: "internal-medicine",
    name: "내과진료",
    href: "/internal-medicine",
    items: [
      { name: "일반내과(만성질환)", href: "/internal-medicine/general" },
      { name: "인공신장실(혈액투석)", href: "/internal-medicine/dialysis" },
    ],
  },
  {
    id: "checkup",
    name: "건강검진",
    href: "/checkup",
    items: [
      { name: "국가건강검진", href: "/checkup/national" },
      { name: "5대 암검진", href: "/checkup/cancer" },
      { name: "종합건강검진", href: "/checkup/comprehensive" },
      { name: "100세 맞춤 시니어검진", href: "/checkup/happy-dream/age-100" },
      { name: "여성·남성 정밀검진", href: "/checkup/happy-dream/female" },
    ],
  },
  {
    id: "obgyn",
    name: "산부인과",
    href: "/obgyn",
    items: [
      { name: "폐경·갱년기 클리닉", href: "/obgyn/menopause" },
      { name: "비만·체형 클리닉", href: "/obgyn/obesity" },
      { name: "일반여성질환 검진", href: "/obgyn/general-women" },
    ],
  },
  {
    id: "community",
    name: "커뮤니티",
    href: "/community",
    items: [
      { name: "병원소식 & 공지", href: "/community/news" },
      { name: "건강칼럼(블로그)", href: "/community/blog" },
      { name: "비급여 진료비용", href: "/community/non-reimbursable" },
      { name: "주간 영양 식단표", href: "/community/diet-menu" },
      { name: "온라인문의", href: "/community/inquiry" },
      { name: "자주 묻는 질문(FAQ)", href: "/community/faq" },
    ],
  },
];

