# HI Hospital 전체 사이트맵 및 URL 구조 정의서

> **문서 번호**: DOC-SM-001  
> **작성자**: 수진 실장 (Project Manager)  
> **기술 감수**: 박동훈 차장 (Lead System Architect)  
> **연동 프레임워크**: Next.js App Router (`lsk-frontend/src/app/...`)  
> **최종 수정일**: 2026-09-06

---

## 1. 개요 (Overview)

본 문서는 **HI Hospital 통합 병원 웹사이트**의 전체 정보 구조(Information Architecture)와 메뉴 계층(1 Depth ~ 3 Depth), 그리고 Next.js 프론트엔드 라우팅(App Router URL) 및 백엔드 연동 키값을 표준화한 종합 사이트맵입니다.

---

## 2. 전체 메뉴 구조 트리 (Tree View)

```text
HI Hospital 웹 플랫폼
├── 1. 병원소개 (/about)
│   ├── 인사말 (/about/greeting)
│   ├── 의료진소개 (/about/doctors)
│   ├── 진료시간안내 (/about/hours)
│   ├── 입원안내 (/about/hospitalization)
│   └── 오시는길 (/about/directions)
│
├── 2. 뇌신경 (/neurosurgery)
│   ├── 두통•어지럼증 (/neurosurgery/headache-dizziness)
│   ├── 치매 (/neurosurgery/dementia)
│   ├── 뇌졸중 (/neurosurgery/stroke)
│   └── 말초신경병 (/neurosurgery/peripheral-neuropathy)
│
├── 3. 척추클리닉 (/spine)
│   ├── 목디스크 (/spine/cervical-disc)
│   ├── 거북목 (/spine/turtle-neck)
│   ├── 일자목증후군 (/spine/straight-neck)
│   ├── (경추)척추협착증 (/spine/cervical-stenosis)
│   ├── 허리디스크 (/spine/lumbar-disc)
│   ├── 척추관협착증 (/spine/lumbar-stenosis)
│   ├── 압박골절 (/spine/compression-fracture)
│   ├── 척추측만증 (/spine/scoliosis)
│   ├── 척추전방전위증 (/spine/spondylolisthesis)
│   ├── 근막통증증후군 (/spine/myofascial-pain)
│   ├── 수술클리닉 (/spine/surgery)
│   │   ├── 경추유합술 (/spine/surgery/cervical-fusion)
│   │   ├── 목인공디스크 (/spine/surgery/cervical-artificial-disc)
│   │   ├── 척추유합술 (/spine/surgery/lumbar-fusion)
│   │   ├── 미세현미경수술 (/spine/surgery/microscopic)
│   │   ├── 척추체성형술 (/spine/surgery/vertebroplasty)
│   │   └── 허리인공디스크 (/spine/surgery/lumbar-artificial-disc)
│   └── 비수술클리닉 (/spine/non-surgery)
│       ├── 감압신경성형술 (/spine/non-surgery/decompression-neuroplasty)
│       ├── 고주파수핵성형술 (/spine/non-surgery/rf-nucleoplasty)
│       ├── 꼬리뼈내시경레이저 (/spine/non-surgery/coccyx-laser)
│       ├── 척추관풍선확장술 (/spine/non-surgery/balloon-dilation)
│       ├── 선택적신경차단술 (/spine/non-surgery/nerve-block)
│       ├── 슬링운동치료 (/spine/non-surgery/sling-exercise)
│       └── 감압도수치료 (/spine/non-surgery/manual-decompression)
│
├── 4. 무릎·고관절 (/knee-hip)
│   ├── 관절염 (/knee-hip/arthritis)
│   ├── 무릎연골손상 (/knee-hip/cartilage-injury)
│   ├── 무릎인대파열 (/knee-hip/ligament-tear)
│   ├── 연골연화증 (/knee-hip/chondromalacia)
│   ├── 대퇴골두무혈성괴사 (/knee-hip/avn)
│   ├── 고관절염줄기세포 (/knee-hip/hip-stemcell)
│   ├── 연골재생치료 (/knee-hip/cartilage-regeneration)
│   ├── 수술치료 (/knee-hip/surgery)
│   └── 무릎인공관절수술 (/knee-hip/knee-replacement)
│       ├── 무릎관절내시경 (/knee-hip/knee-replacement/arthroscopy)
│       ├── 무릎인대재건술 (/knee-hip/knee-replacement/ligament-reconstruction)
│       ├── 경골근위부절골술 (/knee-hip/knee-replacement/hto)
│       ├── 미세천공술 (/knee-hip/knee-replacement/microfracture)
│       └── 고관절인공관절수술 (/knee-hip/knee-replacement/hip-replacement)
│
├── 5. 어깨관절 (/shoulder)
│   ├── 회전근개파열 (/shoulder/rotator-cuff)
│   ├── 오십견 (/shoulder/frozen-shoulder)
│   ├── 석회화건염 (/shoulder/calcific-tendinitis)
│   ├── 어깨충돌증후군 (/shoulder/impingement)
│   ├── 관절와순파열 (/shoulder/labral-tear)
│   ├── 어깨관절내시경 (/shoulder/arthroscopy)
│   ├── 체외충격파(비수술) (/shoulder/eswt)
│   ├── 주사요법(비수술) (/shoulder/injection)
│   └── 재활운동치료(비수술) (/shoulder/rehabilitation)
│
├── 6. 수·족부 (/hand-foot)
│   ├── 손목터널증후군 (/hand-foot/carpal-tunnel)
│   ├── 테니스엘보 (/hand-foot/tennis-elbow)
│   ├── 방아쇠수지증후군 (/hand-foot/trigger-finger)
│   ├── 무지외반증 (/hand-foot/hallux-valgus)
│   ├── 족저근막염 (/hand-foot/plantar-fasciitis)
│   ├── 발목불안정증 (/hand-foot/ankle-instability)
│   ├── 발목인대파열 (/hand-foot/ankle-ligament-tear)
│   └── 발목인대재건술 (/hand-foot/ankle-ligament-reconstruction)
│
├── 7. 외과진료 (/surgery-general)
│   ├── 대장항문·치핵 (/surgery-general/colorectal-hemorrhoid)
│   ├── 액취증 (/surgery-general/osmidrosis)
│   └── 하지정맥류 (/surgery-general/varicose-veins)
│
├── 8. 내과진료 (/internal-medicine)
│   ├── 일반내과 (/internal-medicine/general)
│   └── 인공신장실 (/internal-medicine/dialysis)
│
├── 9. 건강검진 (/checkup)
│   ├── 국가건강검진 (/checkup/national)
│   ├── 일반검진 (/checkup/general)
│   ├── 암검진 (/checkup/cancer)
│   ├── 종합건강검진 (/checkup/comprehensive)
│   ├── 행복드림건강검진 (/checkup/happy-dream)
│   │   ├── 100세건강검진 (/checkup/happy-dream/age-100)
│   │   ├── 여성건강검진 (/checkup/happy-dream/female)
│   │   └── 남성건강검진 (/checkup/happy-dream/male)
│   └── 채용검진 (/checkup/employment)
│
├── 10. 산부인과 (/obgyn)
│   ├── 폐경클리닉 (/obgyn/menopause)
│   ├── 비만클리닉 (/obgyn/obesity)
│   └── 일반여성질환 (/obgyn/general-women)
│
└── 11. 커뮤니티 (/community)
    ├── 병원소식 (/community/news)
    ├── 블로그 (/community/blog)
    ├── 비급여항목 (/community/non-reimbursable)
    ├── 주간식단표 (/community/diet-menu)
    ├── 온라인문의 (/community/inquiry)
    └── 자주묻는질문 (/community/faq)
```

---

## 3. 상세 URL 라우팅 및 기능 명세 테이블

### 3.1 병원소개 (About)
| 1 Depth | 2 Depth | 3 Depth | Next.js 라우팅 경로 | 주요 페이지 내용 |
| :--- | :--- | :--- | :--- | :--- |
| 병원소개 | 인사말 | - | `/about/greeting` | 병원장 인사말, 미션 및 비전 |
| 병원소개 | 의료진소개 | - | `/about/doctors` | 전문의 10인 프로필 및 진료분야 안내 |
| 병원소개 | 진료시간안내 | - | `/about/hours` | 요일별 외래진료, 응급실, 점심시간 안내 |
| 병원소개 | 입원안내 | - | `/about/hospitalization` | 입/퇴원 절차, 병실생활, 면회 안내 |
| 병원소개 | 오시는길 | - | `/about/directions` | 지도(카카오맵), 대중교통, 주차장 이용안내 |

---

### 3.2 뇌신경 센터 (Neurosurgery)
| 1 Depth | 2 Depth | 3 Depth | Next.js 라우팅 경로 | 주요 페이지 내용 |
| :--- | :--- | :--- | :--- | :--- |
| 뇌신경 | 두통•어지럼증 | - | `/neurosurgery/headache-dizziness` | 편두통, 긴장성두통, 이석증, 전정신경염 치료 |
| 뇌신경 | 치매 | - | `/neurosurgery/dementia` | 알츠하이머, 혈관성 치매 조기 진단 및 인지치료 |
| 뇌신경 | 뇌졸중 | - | `/neurosurgery/stroke` | 뇌경색/뇌출혈 골든타임 대처 및 예방 관리 |
| 뇌신경 | 말초신경병 | - | `/neurosurgery/peripheral-neuropathy` | 손발저림, 다발성 신경병증 진단검사 |

---

### 3.3 척추클리닉 (Spine Clinic)
| 1 Depth | 2 Depth | 3 Depth | Next.js 라우팅 경로 | 주요 페이지 내용 |
| :--- | :--- | :--- | :--- | :--- |
| 척추클리닉 | 목디스크 | - | `/spine/cervical-disc` | 경추 추간판탈출증 증상 및 단계별 치료법 |
| 척추클리닉 | 거북목 | - | `/spine/turtle-neck` | 거북목 증후군 교정 및 운동요법 |
| 척추클리닉 | 일자목증후군 | - | `/spine/straight-neck` | 경추 만곡 회복 치료 |
| 척추클리닉 | (경추)척추협착증 | - | `/spine/cervical-stenosis` | 경추 척추관 협착증 정밀 감별 |
| 척추클리닉 | 허리디스크 | - | `/spine/lumbar-disc` | 요추 추간판탈출증 보존/수술 치료 |
| 척추클리닉 | 척추관협착증 | - | `/spine/lumbar-stenosis` | 보행장애, 다리 저림 유발 협착증 전문 치료 |
| 척추클리닉 | 압박골절 | - | `/spine/compression-fracture` | 골다공증성 척추 골절, 척추체성형술 연계 |
| 척추클리닉 | 척추측만증 | - | `/spine/scoliosis` | 청소년/성인 척추 변형 교정 |
| 척추클리닉 | 척추전방전위증 | - | `/spine/spondylolisthesis` | 척추 마디 불안정증 진단 및 고정술 |
| 척추클리닉 | 근막통증증후군 | - | `/spine/myofascial-pain` | 담, 만성 근육 뭉침 및 TPI 주사치료 |
| 척추클리닉 | 수술클리닉 | 경추유합술 | `/spine/surgery/cervical-fusion` | 목 전방/후방 골유합 수술 |
| 척추클리닉 | 수술클리닉 | 목인공디스크 | `/spine/surgery/cervical-artificial-disc` | 경추 인공디스크 치환술(ADR) |
| 척추클리닉 | 수술클리닉 | 척추유합술 | `/spine/surgery/lumbar-fusion` | 최소침습 요추 유합술 |
| 척추클리닉 | 수술클리닉 | 미세현미경수술 | `/spine/surgery/microscopic` | 고배율 미세현미경 하 디스크 제거술 |
| 척추클리닉 | 수술클리닉 | 척추체성형술 | `/spine/surgery/vertebroplasty` | 골시멘트 주입 척추뼈 보강술 |
| 척추클리닉 | 수술클리닉 | 허리인공디스크 | `/spine/surgery/lumbar-artificial-disc` | 요추 움직임 보존 인공디스크 수술 |
| 척추클리닉 | 비수술클리닉 | 감압신경성형술 | `/spine/non-surgery/decompression-neuroplasty` | 특수 카테터 유착 박리술 |
| 척추클리닉 | 비수술클리닉 | 고주파수핵성형술 | `/spine/non-surgery/rf-nucleoplasty` | 고주파 열을 이용한 디스크 감압 |
| 척추클리닉 | 비수술클리닉 | 꼬리뼈내시경레이저 | `/spine/non-surgery/coccyx-laser` | 꼬리뼈 미세내시경 직접 확인 레이저 치료 |
| 척추클리닉 | 비수술클리닉 | 척추관풍선확장술 | `/spine/non-surgery/balloon-dilation` | 풍선 카테터를 통한 협착 공간 확보 |
| 척추클리닉 | 비수술클리닉 | 선택적신경차단술 | `/spine/non-surgery/nerve-block` | C-arm 영상유도하 정밀 약물 주입 |
| 척추클리닉 | 비수술클리닉 | 슬링운동치료 | `/spine/non-surgery/sling-exercise` | 흔들리는 줄을 이용한 심부 근육 강화 |
| 척추클리닉 | 비수술클리닉 | 감압도수치료 | `/spine/non-surgery/manual-decompression` | 전문 물리치료사 1:1 척추 교정 및 감압 |

---

### 3.4 무릎·고관절 센터 (Knee & Hip)
| 1 Depth | 2 Depth | 3 Depth | Next.js 라우팅 경로 | 주요 페이지 내용 |
| :--- | :--- | :--- | :--- | :--- |
| 무릎·고관절 | 관절염 | - | `/knee-hip/arthritis` | 퇴행성 관절염 단계별 맞춤 치료 |
| 무릎·고관절 | 무릎연골손상 | - | `/knee-hip/cartilage-injury` | 반월상 연골판 손상 봉합 및 절제 |
| 무릎·고관절 | 무릎인대파열 | - | `/knee-hip/ligament-tear` | 전/후방 십자인대, 측부인대 손상 치료 |
| 무릎·고관절 | 연골연화증 | - | `/knee-hip/chondromalacia` | 슬개골 연골 연화증 보존치료 |
| 무릎·고관절 | 대퇴골두무혈성괴사 | - | `/knee-hip/avn` | 엉덩이 관절 혈류 차단 괴사 조기진단 |
| 무릎·고관절 | 고관절염줄기세포 | - | `/knee-hip/hip-stemcell` | 자가/동종 줄기세포를 통한 관절 재생 |
| 무릎·고관절 | 연골재생치료 | - | `/knee-hip/cartilage-regeneration` | 콜라겐/줄기세포 연골 복원술 |
| 무릎·고관절 | 수술치료 | - | `/knee-hip/surgery` | 정형외과 무릎 수술 총괄 안내 |
| 무릎·고관절 | 무릎인공관절수술 | 무릎관절내시경 | `/knee-hip/knee-replacement/arthroscopy` | 5mm 최소 절개 관절내시경 시술 |
| 무릎·고관절 | 무릎인공관절수술 | 무릎인대재건술 | `/knee-hip/knee-replacement/ligament-reconstruction` | 자가건/동종건 십자인대 재건 |
| 무릎·고관절 | 무릎인공관절수술 | 경골근위부절골술 | `/knee-hip/knee-replacement/hto` | O자형 휜다리 교정 절골술 |
| 무릎·고관절 | 무릎인공관절수술 | 미세천공술 | `/knee-hip/knee-replacement/microfracture` | 연골 결손 부위 뼈 천공 재생술 |
| 무릎·고관절 | 무릎인공관절수술 | 고관절인공관절수술 | `/knee-hip/knee-replacement/hip-replacement` | 고관절 전치환술/반치환술 |

---

### 3.5 어깨관절 (Shoulder)
| 1 Depth | 2 Depth | 3 Depth | Next.js 라우팅 경로 | 주요 페이지 내용 |
| :--- | :--- | :--- | :--- | :--- |
| 어깨관절 | 회전근개파열 | - | `/shoulder/rotator-cuff` | 어깨 힘줄 파열 봉합술 및 비수술 치료 |
| 어깨관절 | 오십견 | - | `/shoulder/frozen-shoulder` | 유착성 관절낭염 관절 수동술 및 스트레칭 |
| 어깨관절 | 석회화건염 | - | `/shoulder/calcific-tendinitis` | 석회 침착 분쇄(체외충격파) 및 흡입술 |
| 어깨관절 | 어깨충돌증후군 | - | `/shoulder/impingement` | 견봉하 공간 감압 및 자세 교정 |
| 어깨관절 | 관절와순파열 | - | `/shoulder/labral-tear` | 슬랩(SLAP) 병변 및 방카르트 복원술 |
| 어깨관절 | 어깨관절내시경 | - | `/shoulder/arthroscopy` | 미세침습 어깨 내시경 수술 |
| 어깨관절 | 체외충격파(비수술) | - | `/shoulder/eswt` | 집중형/방사형 체외충격파 조직 재생 |
| 어깨관절 | 주사요법(비수술) | - | `/shoulder/injection` | 프롤로주사, DNA재생주사, 콜라겐주사 |
| 어깨관절 | 재활운동치료(비수술) | - | `/shoulder/rehabilitation` | 관절 가동범위 회복 맞춤 도수/재활운동 |

---

### 3.6 수·족부 (Hand & Foot)
| 1 Depth | 2 Depth | 3 Depth | Next.js 라우팅 경로 | 주요 페이지 내용 |
| :--- | :--- | :--- | :--- | :--- |
| 수·족부 | 손목터널증후군 | - | `/hand-foot/carpal-tunnel` | 수근관 증후군 신경 감압 및 최소절개술 |
| 수·족부 | 테니스엘보 | - | `/hand-foot/tennis-elbow` | 외측상과염 충격파 및 보존 치료 |
| 수·족부 | 방아쇠수지증후군 | - | `/hand-foot/trigger-finger` | 손가락 딸깍거림 힘줄 건막 유리술 |
| 수·족부 | 무지외반증 | - | `/hand-foot/hallux-valgus` | 엄지발가락 뼈 돌출 교정 절골술 |
| 수·족부 | 족저근막염 | - | `/hand-foot/plantar-fasciitis` | 발바닥 뒤꿈치 통증 체외충격파/스트레칭 |
| 수·족부 | 발목불안정증 | - | `/hand-foot/ankle-instability` | 만성 발목 삠 현상 교정 및 재활 |
| 수·족부 | 발목인대파열 | - | `/hand-foot/ankle-ligament-tear` | 급성 발목 염좌 및 인대 정밀 봉합 |
| 수·족부 | 발목인대재건술 | - | `/hand-foot/ankle-ligament-reconstruction` | 해부학적 인대 재건술 (MBO) |

---

### 3.7 외과진료 (General Surgery)
| 1 Depth | 2 Depth | 3 Depth | Next.js 라우팅 경로 | 주요 페이지 내용 |
| :--- | :--- | :--- | :--- | :--- |
| 외과진료 | 대장항문·치핵 | - | `/surgery-general/colorectal-hemorrhoid` | 치핵, 치열, 치루 무통 최소침습 수술 |
| 외과진료 | 액취증 | - | `/surgery-general/osmidrosis` | 땀샘 및 냄새 유발 아포크린선 영구 흡입술 |
| 외과진료 | 하지정맥류 | - | `/surgery-general/varicose-veins` | 고주파/레이저/베나실 혈관 폐쇄술 |

---

### 3.8 내과진료 (Internal Medicine)
| 1 Depth | 2 Depth | 3 Depth | Next.js 라우팅 경로 | 주요 페이지 내용 |
| :--- | :--- | :--- | :--- | :--- |
| 내과진료 | 일반내과 | - | `/internal-medicine/general` | 고혈압, 당뇨, 고지혈증, 만성질환 케어 |
| 내과진료 | 인공신장실 | - | `/internal-medicine/dialysis` | 최신 혈액투석 장비 및 쾌적한 투석 환경 |

---

### 3.9 건강검진 (Health Checkup)
| 1 Depth | 2 Depth | 3 Depth | Next.js 라우팅 경로 | 주요 페이지 내용 |
| :--- | :--- | :--- | :--- | :--- |
| 건강검진 | 국가건강검진 | - | `/checkup/national` | 국민건강보험공단 일반검진 항목 안내 |
| 건강검진 | 일반검진 | - | `/checkup/general` | 기초 신체 계측 및 혈액/소변 검사 |
| 건강검진 | 암검진 | - | `/checkup/cancer` | 5대암(위암, 대장암, 간암, 유방암, 자궁경부암) |
| 건강검진 | 종합건강검진 | - | `/checkup/comprehensive` | 정밀 CT/MRI 포함 프리미엄 종합검진 |
| 건강검진 | 행복드림건강검진 | 100세건강검진 | `/checkup/happy-dream/age-100` | 시니어 척추·관절·뇌신경 특화 검진 프로그램 |
| 건강검진 | 행복드림건강검진 | 여성건강검진 | `/checkup/happy-dream/female` | 여성호르몬, 갑상선, 유방, 골밀도 정밀 검진 |
| 건강검진 | 행복드림건강검진 | 남성건강검진 | `/checkup/happy-dream/male` | 남성 활력, 전립선, 간기능, 심혈관 검진 |
| 건강검진 | 채용검진 | - | `/checkup/employment` | 공무원/일반 기업 입사 제출용 신체검사 |

---

### 3.10 산부인과 (Obstetrics & Gynecology)
| 1 Depth | 2 Depth | 3 Depth | Next.js 라우팅 경로 | 주요 페이지 내용 |
| :--- | :--- | :--- | :--- | :--- |
| 산부인과 | 폐경클리닉 | - | `/obgyn/menopause` | 갱년기 호르몬 대체 요법, 골다공증 예방 |
| 산부인과 | 비만클리닉 | - | `/obgyn/obesity` | 여성 체형 및 대사질환 맞춤 다이어트 프로그램 |
| 산부인과 | 일반여성질환 | - | `/obgyn/general-women` | 자궁경부암 백신, 질염, 자궁근종 정밀 초음파 |

---

### 3.11 커뮤니티 (Community)
| 1 Depth | 2 Depth | 3 Depth | Next.js 라우팅 경로 | 주요 페이지 내용 |
| :--- | :--- | :--- | :--- | :--- |
| 커뮤니티 | 병원소식 | - | `/community/news` | 원내 행사, 공지사항, 언론보도 |
| 커뮤니티 | 블로그 | - | `/community/blog` | 의료진 건강칼럼 및 의학 상식 포스팅 |
| 커뮤니티 | 비급여항목 | - | `/community/non-reimbursable` | 의료법 준수 비급여 진료비용 고지표 |
| 커뮤니티 | 주간식단표 | - | `/community/diet-menu` | 입원 환자 주간 영양 식단표 안내 |
| 커뮤니티 | 온라인문의 | - | `/community/inquiry` | 1:1 온라인 상담 및 진료 상담 신청 |
| 커뮤니티 | 자주묻는질문 | - | `/community/faq` | 진료예약, 서류발급, 주차 등 FAQ |

---

## 4. 메인 랜딩페이지 컴포넌트 구조 연계 (바로서구병원 레퍼런스)

사용자께서 전달해 주신 병원 공식 메인 화면 레퍼런스를 기반으로, 위 사이트맵의 주요 항목들이 홈 화면에 다음과 같이 배치됩니다:

```text
[ GNB 헤더 영역 ]
- 로고, 11개 1Depth 메뉴 드롭다운, 온라인 예약 바로가기, 대표전화 (1600-8549)

[ 1. 히어로 메인 슬라이더 ]
- "응급치료부터 고난이도 수술까지! 척추·관절 전문 병원"
- 빠른 예약 / 진료시간 배너

[ 2. 퀵 간편예약 바 (Sticky Call-to-Action) ]
- 이름, 연락처, 희망 진료과목 입력 후 즉시 상담/예약 신청

[ 3. 의료진 소개 섹션 ]
- "풍부한 임상경험을 가진 10인의 전문의"
- 전문의 프로필 카드 캐러셀 및 클릭 시 /about/doctors 연동

[ 4. 핵심 특화 진료센터 큐레이션 ]
- 관절내시경 / 인공관절 / 뇌신경·치매 / 비수술 척추치료

[ 5. 병원 스토리 & 언론보도 (NEWS) ]
- 실제 환자 회복 인터뷰 및 치료 후기 / YouTube 영상 연계
- 언론에 보도된 HI Hospital 소식

[ 6. 병원 시설 둘러보기 (Facility Tour) ]
- 외래 진료실, 물리치료실, 고해상도 MRI/CT실, 입원실 갤러리

[ 7. 진료안내 & 오시는 길 & 푸터 ]
- 진료시간 안내표 (평일, 토요일, 응급실 운영 안내)
- 카카오맵 약도, 대중교통 및 주차 안내
- 비급여항목 고지, 개인정보처리방침, 사업자 정보
```
