# HI Hospital 플랫폼 핵심 API 연동 가이드 및 명세서

> **작성자**: 박동훈 차장 (Lead System Architect)  
> **총괄**: 수진 실장 (Project Manager)  
> **대상**: 프론트엔드(Next.js) 및 백엔드(g7 / Gem_Custom) 개발팀  
> **API 규격 표준 파일**: [`docs/openapi.yaml`](file:///d:/The%20LSK%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/hihospital-project/docs/openapi.yaml)

---

## 1. 개요 및 아키텍처 원칙

본 문서는 **HI Hospital 통합 병원 웹 플랫폼**의 프론트엔드-백엔드 간 비동기 REST API 통신(Axios) 규격을 정의합니다.

### 🏛️ 시스템 구조
```text
[ Next.js 14+ Frontend ]  (lsk-frontend)
         │  ▲
         │  │  Axios HTTP (JSON / Bearer JWT)
         ▼  │
[ g7 API Backend Gateway ] (lsk-backend/Gem_Custom)
         │  ▲
         │  │  Data Encryption (AES-256 / SHA-256)
         ▼  │
[ MySQL / PostgreSQL Database ]
```

---

## 2. 보안 및 개인정보 보호 3대 원칙 (Strict Security)

1. **전송 암호화 (Transport Layer Security)**
   - 모든 API 통신은 HTTPS 프로토콜을 통과해야 합니다.
   - 요청 헤더에 `Authorization: Bearer <ACCESS_TOKEN>` 형식을 사용합니다.

2. **민감 개인정보 암호화 (Storage Encryption)**
   - **환자 인적사항(주민번호/연락처)**: 데이터베이스 저장 전 반드시 AES-256-GCM 알고리즘으로 양방향 암호화 처리합니다.
   - **비밀번호**: 단방향 해시 알고리즘(Bcrypt 또는 Argon2)으로 솔팅(Salting) 후 저장합니다.

3. **데이터 마스킹 (Response Data Masking)**
   - 목록 조회 및 일반 응답 시 환자 이름(`홍*동`), 전화번호(`010-****-1234`), 이메일(`h***@domain.com`)은 백엔드에서 마스킹 후 전달됩니다.

---

## 3. 핵심 도메인별 API 엔드포인트 요약

| 도메인 | 메서드 | 엔드포인트 | 설명 | 인증 필요 |
| :--- | :---: | :--- | :--- | :---: |
| **01. 인증 & 회원** | `POST` | `/api/v1/auth/login` | 로그인 및 JWT 토큰 발급 | X |
| | `POST` | `/api/v1/auth/register` | 신규 회원가입 (환자 계정) | X |
| | `POST` | `/api/v1/auth/refresh` | Access Token 갱신 | X |
| | `GET` | `/api/v1/auth/me` | 내 프로필 정보 조회 | O |
| **02. 진료과 & 의료진** | `GET` | `/api/v1/departments` | 진료과 목록 조회 | X |
| | `GET` | `/api/v1/departments/{id}` | 진료과 상세 & 소속 의료진 | X |
| | `GET` | `/api/v1/doctors` | 의료진 검색 및 필터 목록 | X |
| | `GET` | `/api/v1/doctors/{id}` | 의료진 상세 프로필 및 진료일정 | X |
| **03. 진료 예약** | `GET` | `/api/v1/appointments/available-slots` | 날짜/의료진별 예약 가능 시간 슬롯 | X |
| | `POST` | `/api/v1/appointments` | 진료 예약 신청 (회원/비회원) | 선택(토큰/본인인증) |
| | `GET` | `/api/v1/appointments/my` | 내 예약 내역 조회 | O |
| | `PATCH` | `/api/v1/appointments/{id}/cancel` | 진료 예약 취소 신청 | O |
| **04. 온라인 상담** | `GET` | `/api/v1/consultations` | 상담 게시글 목록 (비밀글 필터링) | X |
| | `POST` | `/api/v1/consultations` | 1:1 온라인 상담 등록 (비밀번호 설정 가능) | X |
| | `GET` | `/api/v1/consultations/{id}` | 상담 상세 내용 및 전문의 답변 | 비밀글 시 PW 필요 |
| **05. 게시판 & 소식** | `GET` | `/api/v1/boards/{board_id}/posts` | 공지사항/건강칼럼/언론보도 목록 | X |
| | `GET` | `/api/v1/boards/{board_id}/posts/{id}` | 게시글 상세 내용 및 첨부파일 | X |
| **06. 병원 안내** | `GET` | `/api/v1/hospital/info` | 병원 정보, 진료시간, 오시는 길 | X |

---

## 4. 프론트엔드 Axios 클라이언트 연동 모범 예제 (Next.js)

```typescript
// lsk-frontend/src/lib/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (JWT 토큰 자동 주입)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => Promise.reject(error));

// 응답 인터셉터 (401 만료 시 자동 리프레시 처리)
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      // Refresh Token 로직 또는 로그인 화면 이동 처리
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 5. 진료 예약 API 호출 예제

```typescript
// lsk-frontend/src/features/appointment/api.ts
import apiClient from '@/lib/api/client';

export interface CreateAppointmentDto {
  doctor_id: string;
  dept_id: string;
  appointment_date: string; // YYYY-MM-DD
  appointment_time: string; // HH:mm
  patient_name: string;
  patient_phone: string;
  symptom_detail: string;
  is_first_visit: boolean;
}

// 1. 예약 가능 시간 슬롯 조회
export const fetchAvailableSlots = async (doctorId: string, date: string) => {
  return apiClient.get('/appointments/available-slots', {
    params: { doctor_id: doctorId, date },
  });
};

// 2. 예약 신청
export const submitAppointment = async (payload: CreateAppointmentDto) => {
  return apiClient.post('/appointments', payload);
};
```
