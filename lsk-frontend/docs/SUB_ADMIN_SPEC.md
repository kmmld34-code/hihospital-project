# [인천하이병원] 서브관리자(Sub-Admin) 상세페이지 편집 시스템 개발 스펙 정의서

- **문서 버전**: v1.0.0
- **최종 수정일**: 2026-09-22
- **승인자**: 병원 대표
- **담당 팀**: 기획(강수진 실장), 디자인(정재이 과장), 프론트엔드(고윤기 대리), 백엔드/보안(김별 사원)

---

## 1. 개요 및 핵심 개발 철학

### 1.1 배경 및 목적
인천하이병원 웹사이트의 서브메뉴 상세페이지는 **1400px 와이드 마스터 그리드, 엄격한 타이포그래피, 고유 테마 컬러, 부드러운 스크롤 인터랙션**을 기반으로 고도화되어 있습니다.  
병원 운영진(서브관리자)이 시즌별 문구 수정이나 이미지 교체를 원할 때, **디자인 레이아웃과 모바일 반응형이 1%도 깨지지 않으면서도 관리자의 디자인 창의성을 유연하게 수용할 수 있는 서브관리자 편집 시스템**을 정의합니다.

### 1.2 핵심 개발 원칙: "구조화된 블록 필드(Structured Block CMS)"
- ❌ **자유 백지 위지윅(HTML 직접 입력) 금지**: 글자 크기, CSS 인라인 스타일, 레이아웃 태그를 직접 수정하게 할 경우 모바일 반응형 및 1400px 그리드가 파괴되므로 원천 차단합니다.
- ⭕ **컴포넌트 레이아웃 락(Lock) & 내용물(Slot) 분리**: 레이아웃 뼈대와 반응형 코드는 시스템이 안전하게 잠그고, 서브관리자에게는 **[대제목], [설명문], [이미지 업로드], [링크 선택], [섹션 On/Off]** 형태의 정형화된 입력 폼(Form)만 제공합니다.

---

## 2. [대표 승인 핵심 스펙] 1400px 와이드 배경 & `z-index` 레이어 아키텍처

### 2.1 2-Track 비주얼 모드 지원
서브관리자의 디자인 역량 및 작업 리소스에 따라 2가지 모드를 자유롭게 선택할 수 있도록 구현합니다.

| 모드 구분 | 대상 사용자 | 입력 스펙 | 렌더링 방식 |
| :--- | :--- | :--- | :--- |
| **A 타입: 기본 일러스트 모드** | 디자인 초보자 / 일반 운영진 | 투명 PNG 일러스트 (권장: 400×400px) | 원형 뱃지 프레임 내부 중앙 자동 배치 |
| **B 타입: 1400px 와이드 배경 모드** | 디자이너 / 감각 있는 서브관리자 | 가로 1400px 와이드 투명 페이드 PNG 파일 | 1400px 섹션 전체 배경으로 자연스럽게 합성 |

### 2.2 `z-index` 계층 렌더링 구조 (기술적 강제)
시스템이 인위적으로 복잡한 CSS 필터나 마스크를 계산하지 않고, **순수한 CSS 레이어 스택 구조**를 통해 어떤 이미지가 업로드되더라도 텍스트 가독성과 클릭 이벤트를 100% 보장합니다.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Layer 3. 텍스트 레이어 (relative z-10)                                   │
│          - 대제목, 본문 설명, 바로가기 버튼                             │
│          - 항상 이미지보다 위에 떠 있어 가독성과 클릭 이벤트 100% 보장     │
├─────────────────────────────────────────────────────────────────────────┤
│ Layer 2. 관리자 업로드 배경 이미지 (absolute inset-0, z-0)                 │
│          - 가로 1400px 와이드 투명 페이드 PNG                           │
│          - 좌측 대형 인물/의료진 누끼 사진 또는 우측 페이드아웃 그래픽   │
│          - 레이아웃 프레임(h-[420px]~[480px], overflow-hidden) 강제     │
├─────────────────────────────────────────────────────────────────────────┤
│ Layer 1. 섹션 기본 배경색 (CSS Background)                              │
│          - 진료과 테마 컬러 (두통: 초록, 치매: 보라, 뇌졸중: 밤색, 말초: 틸) │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 기술 구현 명세:
```tsx
{/* 1400px 와이드 배경 모드 컨테이너 렌더링 예시 */}
<div className="relative overflow-hidden w-full min-h-[440px] rounded-[32px] bg-[#0C7657]">
  {/* Layer 2: 관리자가 업로드한 1400px 투명 PNG (우측으로 갈수록 투명 페이드) */}
  {sectionData.bgImageUrl && (
    <img
      src={sectionData.bgImageUrl}
      alt="섹션 배경 비주얼"
      className="absolute inset-0 w-full h-full object-cover object-left pointer-events-none z-0"
    />
  )}

  {/* Layer 3: 텍스트 및 버튼 (항상 이미지 위에 배치) */}
  <div className="relative z-10 max-w-[1400px] mx-auto p-10 sm:p-14 lg:p-16 flex flex-col justify-center">
    <h3 className="text-3xl sm:text-4xl font-black text-white leading-[1.3] mb-4">
      {sectionData.title}
    </h3>
    <p className="text-lg text-white/90 max-w-2xl leading-[1.7] mb-8">
      {sectionData.description}
    </p>
    <div>
      <Link href={sectionData.linkUrl} className="inline-flex ...">
        상세보기 →
      </Link>
    </div>
  </div>
</div>
```

---

## 3. 부서별 세부 스펙 및 기능 명세

### 3.1 프론트엔드 (고윤기 대리)
1. **JSON 스키마 기반 데이터 바인딩**:
   - 상세페이지의 각 섹션 컴포넌트는 하드코딩 텍스트가 아닌 `SectionData` 인터페이스를 Props로 주입받아 렌더링합니다.
2. **반응형 가드 레일**:
   - 모바일(스마트폰) 환경에서는 와이드 배경 이미지가 축소되거나 글자와 겹쳐도 가독성이 유지되도록 미디어 쿼리 최적화 처리.
3. **버튼 줄바꿈 방지**:
   - 관리자가 긴 텍스트를 입력해도 버튼이 깨지지 않도록 `whitespace-nowrap`, `shrink-0` 강제 적용.

### 3.2 UI/UX 디자인 (정재이 과장)
1. **디자인 토큰(Design Tokens) 잠금**:
   - 4대 테마 컬러(초록 `#0C7657`, 보라 `#2E1848`, 밤색 `#381E15`, 틸 `#0D2B35`)와 폰트 패밀리(Pretendard), 타이포그래피 계층은 관리자 화면에서 수정 불가(고정값).
2. **실시간 분할 미리보기 (Split Live Preview)**:
   - 관리자 화면 좌측에 폼을 배치하고, 우측에 실제 모바일/태블릿/데스크톱 화면을 실시간으로 렌더링하여 배포 전 완성도를 확인하도록 지원.
3. **이미지 업로드 가이드라인 제공**:
   - 와이드 배경 업로드 필드에 `권장 규격: 1400×480px, 우측 투명 페이드 PNG, 용량 1MB 이하` 명확히 표기.

### 3.3 기획 및 운영 권한 (강수진 실장)
1. **서브관리자 3단계 권한 제어**:
   - **레벨 1 (일반 운영자)**: 대제목, 소제목, 본문 텍스트, 배지 라벨 수정
   - **레벨 2 (마케팅/디자이너)**: 1400px 와이드 배경 PNG 업로드, 섹션 노출 On/Off 스위치 토글
   - **레벨 3 (최고 관리자/개발팀)**: 섹션 구조 변경, 라우트 매핑, 시스템 설정
2. **섹션별 노출 On/Off 토글**:
   - 진료 이벤트나 계절성 안내 배너를 일시적으로 숨기거나 노출할 수 있는 토글 스위치 제공.

### 3.4 백엔드 및 보안 (김별 사원)
1. **XSS(크로스 사이트 스크립팅) 원천 차단**:
   - 데이터베이스에는 순수 문자열(Plain Text)과 검증된 파일 경로(URL)만 저장하며, 악성 스크립트(`<script>`, `<iframe>`) 유입 차단.
2. **1클릭 리비전 히스토리 (Revision Rollback)**:
   - 수정 시점마다 스냅샷을 DB에 기록하여, 관리자가 실수로 잘못 저장했을 때 언제든 **[이전 버전으로 되돌리기]**를 실행할 수 있도록 보장.

---

## 4. 데이터베이스 스키마 설계 (PostgreSQL / Supabase 기준)

```sql
-- 001_gem_subpage_sections.sql
CREATE TABLE IF NOT EXISTS gem_subpage_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(50) NOT NULL,            -- 예: 'neurosurgery'
  slug VARCHAR(50) NOT NULL,                -- 예: 'headache-dizziness', 'hub'
  section_key VARCHAR(50) NOT NULL,         -- 예: 'clinic_01', 'hero_section'
  visual_mode VARCHAR(20) DEFAULT 'basic',  -- 'basic' (일러스트) 또는 'wide_bg' (1400px 와이드)
  badge_text VARCHAR(100),                  -- 상단 알약형 배지 문구
  title TEXT NOT NULL,                      -- 대제목
  description TEXT,                         -- 본문 설명문
  image_url TEXT,                           -- 업로드된 이미지 경로 (투명 PNG 등)
  link_url VARCHAR(255),                    -- 바로가기 버튼 링크
  link_text VARCHAR(100),                   -- 바로가기 버튼 라벨
  is_visible BOOLEAN DEFAULT TRUE,          -- 노출 On/Off 토글
  display_order INT DEFAULT 1,              -- 노출 순서
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by VARCHAR(100)                   -- 최종 수정자 ID
);

-- 리비전 히스토리 백업 테이블 (1클릭 롤백용)
CREATE TABLE IF NOT EXISTS gem_subpage_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES gem_subpage_sections(id) ON DELETE CASCADE,
  snapshot_data JSONB NOT NULL,             -- 이전 상태의 전체 스키마 데이터
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by VARCHAR(100)
);
```

---

## 5. 단계별 실행 로드맵

1. **1단계 (프론트엔드 컴포넌트 Props 추상화)**:
   - 현재 구현된 4대 상세페이지 및 통합 허브 컴포넌트의 텍스트/이미지를 `SectionData` Props를 받아 렌더링하도록 리팩토링 준비.
   - 1400px 와이드 배경 모드용 `z-index` 3계층 레이아웃 컨테이너 추가.
2. **2단계 (서브관리자 UI 폼 구축)**:
   - Next.js 관리자 라우트(`/admin/subpages/[category]`)에 구조화된 입력 폼 및 파일 업로더 구현.
3. **3단계 (실시간 미리보기 & 롤백 연결)**:
   - 변경 사항을 브라우저 로컬 스토리지 또는 API를 통해 실시간 Split View로 확인하고, 1클릭 롤백 API 연결.
