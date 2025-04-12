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

---

## 🛠 기술 스택

| 영역        | 기술                                                               |
| ----------- | ------------------------------------------------------------------ |
| 프론트엔드  | React (Next.js 14, App Router), TypeScript                         |
| 상태 관리   | Zustand                                                            |
| 데이터 통신 | React Query (`useInfiniteQuery` 포함)                              |
| 인증        | Firebase Authentication                                            |
| 백엔드      | Express + MongoDB (Mongoose)                                       |
| 스타일링    | Tailwind CSS, 다크 모드 대응                                       |
| 기타        | React Query Devtools, 환경변수 분리, `clsx` 미사용 방식 class 처리 |

---
