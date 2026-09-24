-- ==============================================================================
-- [인천하이병원] 카페24 MySQL 데이터베이스 서브페이지 관리 테이블 생성 스키마
-- 파일명: 001_gem_create_subpages_table.sql
-- 목적: 관리자 페이지의 블록 빌더 데이터 및 서브페이지 본문 데이터를 영구 보존하고
--       로컬 환경과 Vercel 원격 환경 간의 실시간 양방향 동기화를 구현합니다.
-- ==============================================================================

-- 1. 서브페이지 내용관리 테이블 생성
CREATE TABLE IF NOT EXISTS `gem_subpage_contents` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '고유 식별자 PK',
  `page_key` VARCHAR(191) NOT NULL COMMENT '페이지 고유 식별키 (예: spine/lumbar-disc)',
  `category_name` VARCHAR(100) NOT NULL COMMENT '대분류 카테고리명 (예: 척추센터)',
  `subpage_name` VARCHAR(100) NOT NULL COMMENT '서브페이지 국문 명칭 (예: 허리디스크 클리닉)',
  `blocks` LONGTEXT NOT NULL COMMENT '블록 빌더 JSON 문자열 (대용량 이미지/텍스트 포함)',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '최초 생성 일시',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '최종 수정 일시',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_gem_subpage_page_key` (`page_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='인천하이병원 동적 서브페이지 관리 테이블';

-- ==============================================================================
-- [초기 샘플 또는 안내]
-- 생성 후 관리자 화면(/admin/subpages)에서 '서브페이지 저장'을 클릭하면
-- 해당 테이블에 자동으로 최신 JSON 데이터가 동기화되어 저장됩니다.
-- ==============================================================================
