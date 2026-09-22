# 🚀 LSK 프로젝트 개발 환경 및 관리 명령어 가이드

본 문서는 LSK 프로젝트의 **백엔드(Laravel Sail / 그누보드7)** 및 **프론트엔드(Next.js 14 Turbopack)** 로컬 개발 서버를 효율적으로 구동하고 관리하기 위한 공식 명령어 가이드입니다.

---

## 📌 1. 빠른 시작 요약

| 구분 | 위치 | 주요 실행 명령어 | 접속 주소 |
| :--- | :--- | :--- | :--- |
| **백엔드 (G7/Laravel)** | WSL: `~/projects/hihospital-project/lsk-backend/g7` | `./vendor/bin/sail up -d` | `http://localhost` (포트 80) |
| **프론트엔드 (Next.js)** | `lsk-frontend` | `npm run dev` | `http://localhost:3000` |

> 💡 **바탕화면 바로가기 안내:**  
> 윈도우 바탕화면에 생성된 **[프로젝트 경로]** 바로가기를 더블 클릭하시면 WSL 내부 리눅스 프로젝트 폴더가 윈도우 탐색기로 즉시 열립니다.

---

## 🐘 2. 백엔드(Backend) 관리 명령어 (WSL / Docker Sail)

백엔드는 WSL 리눅스 네이티브 파일 시스템(`/home/kmmld34/projects/hihospital-project/lsk-backend/g7`)에서 구동됩니다.  
명령어를 실행하기 전 반드시 WSL 터미널을 열고 백엔드 디렉터리로 이동하세요.

```bash
# 백엔드 디렉터리 이동
cd ~/projects/hihospital-project/lsk-backend/g7
```

### 1) 서버 구동 및 중지
* **백엔드 서버 켜기 (백그라운드 실행)**:
  ```bash
  ./vendor/bin/sail up -d
  ```
  *(컨테이너가 켜지면 브라우저에서 `http://localhost`로 접속 가능합니다.)*

* **백엔드 서버 끄기**:
  ```bash
  ./vendor/bin/sail down
  ```

* **서버 실시간 로그 확인**:
  ```bash
  ./vendor/bin/sail logs -f
  ```
  *(로그 확인을 종료하려면 `Ctrl + C`를 누르세요.)*

### 2) 데이터베이스 및 아티즌(Artisan) 명령어
* **DB 마이그레이션 실행 (테이블 생성 및 갱신)**:
  ```bash
  ./vendor/bin/sail artisan migrate
  ```

* **그누보드7 코어 로컬 업데이트 (표준)**:
  ```bash
  ./vendor/bin/sail artisan core:update --local
  ```

* **라라벨 설정 및 캐시 비우기 (오동작 시 해결법)**:
  ```bash
  ./vendor/bin/sail artisan optimize:clear
  ```

* **컨테이너 내부 리눅스 쉘 접속**:
  ```bash
  ./vendor/bin/sail shell
  ```

---

## ⚡ 3. 프론트엔드(Frontend) 관리 명령어 (Next.js 14)

프론트엔드는 윈도우 터미널(PowerShell) 또는 WSL 터미널 어디서든 실행할 수 있습니다.

```powershell
# 프론트엔드 디렉터리 이동
cd "d:\The LSK 프로젝트\hihospital-project\lsk-frontend"
# (또는 WSL 내부: cd ~/projects/hihospital-project/lsk-frontend)
```

### 1) 개발 서버 구동 (터보팩 적용)
* **초고속 개발 서버 실행**:
  ```bash
  npm run dev
  ```
  *(터보팩 엔진이 적용되어 초고속 컴파일 및 핫 리로딩이 진행됩니다. `http://localhost:3000` 접속)*

* **개발 서버 종료**:
  터미널에서 `Ctrl + C` 누른 후 `y` 입력

### 2) 빌드 및 검사
* **프로덕션 빌드 테스트 (실제 배포 전 오류 검증)**:
  ```bash
  npm run build
  ```

* **빌드된 프로덕션 서버 실행**:
  ```bash
  npm start
  ```

* **코드 문법 검사 (ESLint)**:
  ```bash
  npm run lint
  ```

* **새로운 라이브러리/패키지 설치**:
  ```bash
  npm install [패키지명]
  ```

---

## 🛠️ 4. 트러블슈팅 (자주 묻는 질문)

### Q1. `http://localhost` 백엔드가 열리지 않아요.
* 도커 데스크톱(Docker Desktop)이 윈도우에서 실행 중인지 먼저 확인하세요.
* WSL 터미널에서 `cd ~/projects/hihospital-project/lsk-backend/g7 && ./vendor/bin/sail ps` 를 입력하여 컨테이너 상태가 `Up`인지 확인합니다.

### Q2. 80번 또는 3000번 포트가 이미 사용 중이라고 나와요.
* 다른 웹 서버(IIS, Apache, 이전 Node 프로세스 등)가 포트를 점유하고 있을 수 있습니다.
* 컴퓨터를 재부팅하거나 기존 터미널 창을 모두 닫고 다시 실행해 보세요.

---
*문서 작성일: 2026-09-22 | 작성자: AI 수석엔지니어 강서진 실장 (교육용)*
