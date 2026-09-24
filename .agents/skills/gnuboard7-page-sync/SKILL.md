---
name: gnuboard7-page-sync
description: Next.js 프론트엔드의 네비게이션 구조를 파싱하여, 그누보드7의 g7_pages에 블록빌더용 빈 페이지를 일괄 생성하고 동기화하는 스킬
---

# Gnuboard7 Page Sync Skill

이 스킬은 프론트엔드(Next.js 등)와 백엔드(그누보드7)가 분리된 Headless CMS 구조에서, 프론트엔드의 페이지 구조(주메뉴/서브메뉴)를 백엔드 `g7_pages` 테이블과 동기화하기 위해 사용합니다.

## 🎯 주요 목적 (대전제)
1. 프론트엔드 코드 내에 하드코딩된 메뉴/페이지 구조(예: `navigationData.ts`)를 분석합니다.
2. 분석된 주메뉴(허브페이지)와 서브메뉴 리스트를 그누보드7의 순정 페이지 관리 테이블인 `g7_pages`에 일괄 등록(Seeding)합니다.
3. 생성 시 내용은 비워두어(`content: "[]"` 또는 `""`) 초기 로딩 속도를 확보하고, 추후 프론트엔드 블록 에디터를 통해 실시간으로 채워나갈 수 있게 합니다.

## 🛠️ 실행 지침 (Agent Instructions)
이 스킬을 사용하는 에이전트는 다음 절차를 따릅니다.

### 단계 1: 무결성 검토 및 라우팅/API 연결
1. **API 업데이트**: 프론트엔드 측의 페이지 내용 조회/저장 API(예: `route.ts`)가 그누보드7의 `g7_pages`를 참조하도록 수정합니다.
   - 조회(GET): `SELECT slug, title, content FROM g7_pages WHERE slug = ?`
   - 수정(POST): `UPDATE g7_pages SET content = ? WHERE slug = ?`
2. **동적 라우팅 업데이트**: `[category]/[slug]/page.tsx` 등 렌더링 측면에서 DB의 `content`를 우선적으로 가져오도록 수정합니다.
3. **폴백(Fallback)**: DB 접근 실패 시 로컬 JSON 데이터를 읽어오는 이중 안전망을 보장합니다.

### 단계 2: 네비게이션 파싱 및 일괄 등록 (Seeding)
1. 프론트엔드 측의 네비게이션 배열이나 JSON을 읽습니다. (예: `navigationData.ts`)
2. 게시판 페이지(공지사항 등)는 `g7_pages`에 등록하지 않도록 제외 규칙을 적용합니다. (게시판은 별도의 `g7_boards` 등을 사용해야 함)
3. 주메뉴는 `slug = category`, 서브메뉴는 `slug = category-slug` 형태의 식별자 규약을 확립합니다.
4. Node.js 혹은 Python 스크립트를 작성하여 MySQL/MariaDB에 `INSERT IGNORE` 혹은 `ON DUPLICATE KEY UPDATE` 로 일괄 시딩합니다.
   ```sql
   INSERT INTO g7_pages (slug, title, content, content_mode, published) 
   VALUES (?, ?, '[]', 'json', 1) 
   ON DUPLICATE KEY UPDATE title = VALUES(title)
   ```

### 단계 3: 검증
- DB에 올바른 레코드 수(예: 총 65개 등)가 정상적으로 생성되었는지 출력 로그로 확인합니다.
- 프론트엔드 관리자 환경에서 해당 페이지를 호출하여 DB와 정상 연결 및 저장이 이루어지는지 테스트합니다.

## ⚠️ 주의사항
- 비밀번호 등 민감한 DB 커넥션 정보는 스크립트에 하드코딩하지 말고 `.env.local`을 이용하십시오.
- 이미 작성된 `content` 데이터가 덮어씌워지지 않도록 `INSERT` 시 빈 내용(`'[]'`)은 새로운 데이터에만 적용되도록 유의하십시오 (`ON DUPLICATE KEY UPDATE` 에서 `content = VALUES(content)` 제외).
