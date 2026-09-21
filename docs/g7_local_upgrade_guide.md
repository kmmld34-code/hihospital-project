# 그누보드7 백엔드 로컬 구축 및 코어 업데이트 표준 가이드

본 문서는 프로젝트 초기 구축 단계에서 프론트엔드와 백엔드를 구성할 때, **로컬 환경(PC)에서도 원격(운영) 서버와 동일한 그누보드7 환경을 구축하여 완벽한 테스트 및 연동 빌드가 가능하도록 하는 방법**과 **원격/로컬 코어 업데이트(버전업) 방법**을 기록한 표준 가이드입니다.

---

## 1. 프로젝트 초기 로컬 백엔드 구축 (Docker / Laravel Sail)

과거처럼 XAMPP, APMSetup 등을 로컬 PC에 직접 설치할 필요가 없습니다. 그누보드7은 라라벨(Laravel) 프레임워크를 기반으로 하므로, **Ubuntu WSL과 Docker Desktop**을 활용한 `Laravel Sail` 환경 구축이 표준입니다. 이를 통해 원격(운영) 서버와 100% 동일한 격리된 컨테이너(PHP, MySQL 등) 환경을 클릭 한 번으로 세팅할 수 있습니다.

### [구축 순서]
1. **사전 준비**: Windows에 WSL(Ubuntu) 및 Docker Desktop 설치 후, Docker 설정에서 'WSL Integration'을 켭니다.
2. **패키지 설치**: 로컬 백엔드 폴더(`lsk-backend/g7`) 터미널(WSL bash)에서 다음 명령어로 초기 의존성을 다운로드합니다.
   ```bash
   docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/var/www/html" -w /var/www/html laravelsail/php84-composer:latest composer install --ignore-platform-reqs
   ```
3. **Sail 환경설정 (로컬 전용 DB)**: 운영 DB를 건드리지 않도록 `.env`의 접속 정보를 도커 로컬용으로 수정합니다. (예: `DB_HOST=mysql`, `DB_USERNAME=sail` 등)
4. **로컬 서버 구동 및 마이그레이션**:
   ```bash
   # 서버 백그라운드 구동
   ./vendor/bin/sail up -d
   
   # DB 초기 테이블 생성 및 백필 (설치)
   ./vendor/bin/sail artisan migrate --seed
   ./vendor/bin/sail artisan core:update --local
   ```
5. **구동 확인**: 이후 로컬 프론트엔드에서 `http://localhost`를 바라보고 연동 테스트를 진행하시면 됩니다.

---

## 2. 코어 업데이트 (버전업) 방법: 파일 수동 복사는 절대 금지!

**결론부터 말씀드리면, 과거 그누보드5 시절처럼 `업데이트 폴더 비교 후 바뀐 파일만 추출하여 복사`하는 방식은 그누보드7에서는 시스템을 파괴하는 행위이므로 절대 금지합니다.** 

그누보드7의 코어 업데이트는 파일 교체뿐만 아니라 **의존성 패키지(vendor) 갱신, DB 마이그레이션, 데이터 변환(백필) 스크립트 실행**이 유기적으로 이루어져야 합니다. 반드시 전용 아티즌(Artisan) 명령어를 통해 진행해야 합니다.

### [원격 서버(운영) 업데이트]
SSH로 원격 서버에 접속하거나, 웹 관리자 페이지의 '업데이트' 버튼을 이용합니다.
터미널 환경에서는 백엔드 폴더로 이동 후 아래 명령어를 입력합니다.
```bash
php artisan core:update
```
*(또는 호스팅 환경의 제약이 있다면, 최신 버전의 ZIP 파일을 올린 후 `php artisan core:update --zip=gnuboard7.zip` 명령어로 수행합니다.)*

### [로컬 환경(PC) 업데이트]
로컬에서도 수동 덮어쓰기를 하지 말고, 구축해 둔 Docker(Sail) 환경 안에서 명령어를 실행합니다.
```bash
./vendor/bin/sail artisan core:update
```

### 💡 내부 동작 흐름 (명령어 한 줄로 자동 처리되는 내역)
1. **백업 및 패키지 갱신**: 기존 코어를 `storage/`에 백업하고 `composer install`로 외부 의존성을 갱신합니다.
2. **스마트 병합 (3-way)**: 사용자가 커스텀한 파일은 보존하면서 코어 파일만 골라 안전하게 덮어씁니다.
3. **마이그레이션**: 테이블 구조 변경사항을 DB에 반영합니다.
4. **업그레이드 스텝**: 새 버전에서 요구하는 데이터 백필/변환 작업을 수행하고 캐시를 초기화합니다.
