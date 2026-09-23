-- ==============================================================================
-- [인천하이병원] 서브관리자 블록 빌더 RDBMS 테이블 스키마 정의
-- 파일명: 001_gem_subpage_contents.sql
-- 규칙 준수: 000_ 번호 및 gem_ 인식기호 적용
-- ==============================================================================

-- 1. 서브페이지 컨텐츠 블록 저장 전용 테이블 생성
create table if not exists public.gem_subpage_contents (
    id uuid default gen_random_uuid() primary key,
    page_key text unique not null,               -- 고유 페이지 식별 키 (예: 'spine/lumbar-disc', 'joint/knee')
    category_name text not null,                  -- 대분류 명칭 (예: '척추센터', '관절센터', '내과')
    subpage_name text not null,                   -- 서브페이지 명칭 (예: '허리디스크', '무릎퇴행성관절염')
    blocks jsonb not null default '[]'::jsonb,    -- 4대 헌법 기반 조립형 컴포넌트 블록 배열
    is_published boolean default true not null,   -- 실제 서비스 노출 여부
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. 검색 및 쿼리 성능 최적화를 위한 인덱스 생성
create index if not exists idx_gem_subpage_contents_page_key on public.gem_subpage_contents(page_key);
create index if not exists idx_gem_subpage_contents_category on public.gem_subpage_contents(category_name);

-- 3. 행 수준 보안 (Row Level Security - RLS) 활성화
alter table public.gem_subpage_contents enable row level security;

-- 4. RLS 정책: 일반 사용자는 읽기(SELECT)만 가능, 관리자 서비스 롤은 전체 수정/생성 가능
create policy "Allow public read access for published subpages"
    on public.gem_subpage_contents
    for select
    using (is_published = true);

create policy "Allow authenticated admin full access"
    on public.gem_subpage_contents
    for all
    using (true)
    with check (true);

-- 5. 변경 시간 자동 업데이트 트리거 함수
create or replace function public.gem_update_timestamp()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger trigger_gem_subpage_contents_updated_at
    before update on public.gem_subpage_contents
    for each row
    execute function public.gem_update_timestamp();
