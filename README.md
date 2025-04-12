# 🧭 Loca - 위치 기반 커뮤니티 웹앱

**Loca**는 사용자의 위치를 기반으로 지역별 게시판을 제공하고, 자유롭게 글을 작성하거나 소통할 수 있는 커뮤니티 플랫폼입니다.

---

## 📌 주요 기능

### ✅ 인증 및 사용자 상태

- Firebase Authentication 기반 로그인/회원가입 구현
- 로그인한 사용자만 글쓰기/댓글 작성 가능
- 본인 게시글/댓글만 삭제 버튼 노출

### 📝 게시글 기능

- 지역 + 카테고리 기반 게시판 구조
- 글 등록 시 제목, 본문, 태그 입력
- 작성된 글 상세 조회
- 태그 + 카테고리 동시 출력
- 본인 작성 글 삭제 기능

### 💬 댓글 기능

- 댓글 작성/삭제 가능
- 댓글 리스트 UI 및 작성 폼 분리 (컴포넌트화)
- 댓글 등록 후 자동 리패치 (`invalidateQueries` 사용)

### 🔄 무한 스크롤 (Infinite Scroll)

- 게시글 5개 단위로 페이징
- React Query `useInfiniteQuery` 사용
- `IntersectionObserver` 기반 무한 로딩 구현 예정

### 🌙 다크 모드 지원

- Zustand로 다크 모드 상태 전역 관리
- Tailwind + 조건부 className으로 스타일링 대응

### 🗺 위치 기반 기능

- 브라우저 Geolocation API로 사용자 위치(위도/경도) 수집
- Kakao 지도 API를 통해 위/경도 → 시/도 지역명으로 변환
- Zustand로 지역 상태 전역 관리
- 게시글 작성 및 목록 조회 시 해당 지역 정보를 기반으로 동작

---

## 🛠 기술 스택

## 🛠 기술 스택

| 영역        | 기술                                                                         |
| ----------- | ---------------------------------------------------------------------------- |
| 프론트엔드  | React (Next.js 15 - App Router), TypeScript                                  |
| 상태 관리   | Zustand                                                                      |
| 데이터 통신 | React Query (`useInfiniteQuery`, `invalidateQueries`)                        |
| 인증        | Firebase Authentication (JWT + HttpOnly 쿠키)                                |
| 백엔드      | Express, MongoDB (Mongoose), REST API                                        |
| 위치 기능   | Geolocation API, Kakao Map API (Reverse Geocoding)                           |
| 스타일링    | Tailwind CSS, 조건부 className, 다크 모드 대응                               |
| 유틸/기타   | React Query Devtools, 환경변수 관리 (`.env`), `clsx` 미사용 방식 클래스 처리 |
| 컴포넌트화  | UI Button, Input, Textarea 등 공용 컴포넌트 구성 및 다크 대응 완비           |

---
