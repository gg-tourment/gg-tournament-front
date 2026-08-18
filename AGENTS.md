# AGENTS.md — Codex Project Rules (Frontend)

> **Language rule**: All responses, explanations, and comments must be written in Korean (한국어). Code identifiers (component names, function names, variables) follow the naming conventions below in English.

---

## Project Info

- **Name**: GG Tournament Frontend
- **Repository**: gg-tournament-front
- **Backend Repository**: gg-tournament
- **Design Doc**: See PLAN.md

---

## Local Dev Environment

- **OS**: Windows
- **Node.js**: v24.x
- **IDE**: VS Code
- **Terminal**: PowerShell (VS Code built-in terminal)
- **Package Manager**: npm

---

## Tech Stack

| 분류 | 기술 |
|------|------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| Server State | TanStack React Query v5 |
| HTTP Client | Axios |
| Linter | ESLint |

---

## Environment Variables (.env)

Create `.env` in project root (excluded from Git).

```
VITE_API_BASE_URL=http://localhost:8080
```

Production:
```
VITE_API_BASE_URL=https://api.gg-tournament.com
```

---

## Project Structure

```
src/
├── api/
│   ├── client.ts          # axios 인스턴스 (baseURL, 인터셉터)
│   └── {domain}.ts        # 도메인별 API 함수
├── components/
│   ├── common/            # 공통 컴포넌트 (Button, Input, Modal 등)
│   └── {domain}/          # 도메인별 컴포넌트
├── hooks/
│   └── use{Domain}.ts     # React Query 훅
├── pages/
│   └── {Domain}Page.tsx   # 페이지 컴포넌트
├── router/
│   └── index.tsx          # 라우터 설정
├── lib/
│   └── queryClient.ts     # React Query 클라이언트
├── types/
│   └── {domain}.ts        # TypeScript 타입 정의
├── utils/
│   └── {util}.ts          # 유틸 함수
├── App.tsx
├── main.tsx
└── index.css
```

---

## Coding Conventions

### Naming
- Component: `PascalCase` (예: `TournamentCard`)
- Function / Variable: `camelCase` (예: `fetchTournaments`)
- Type / Interface: `PascalCase` (예: `TournamentDetail`)
- File: 컴포넌트는 `PascalCase.tsx`, 나머지는 `camelCase.ts`
- CSS class: Tailwind utility class만 사용

### Component Rules
- 페이지 컴포넌트: `{Domain}Page.tsx` (예: `TournamentListPage.tsx`)
- 공통 컴포넌트: `src/components/common/`
- 도메인 컴포넌트: `src/components/{domain}/`
- Props 타입은 컴포넌트 파일 상단에 `interface {Name}Props` 로 정의

### API Rules
- 도메인별 API 함수는 `src/api/{domain}.ts` 에 작성
- React Query 훅은 `src/hooks/use{Domain}.ts` 에 작성
- API 응답 타입은 `src/types/{domain}.ts` 에 정의

---

## Auth Rules

- JWT Access Token: `localStorage` 에 저장
- 로그인 후 토큰 저장 → axios 인터셉터에서 자동으로 Authorization 헤더 추가
- 401 응답 시 로그인 페이지로 리다이렉트
- 인증 필요 페이지는 `PrivateRoute` 컴포넌트로 보호

---

## React Query Rules

- `queryKey` 는 도메인별로 상수로 관리 (예: `['tournaments', id]`)
- 목록 조회: `useQuery`
- 단건 조회: `useQuery`
- 생성/수정/삭제: `useMutation` + 성공 시 `queryClient.invalidateQueries`
- 로딩/에러 상태는 항상 처리

---

## ⛔ Forbidden

- `any` 타입 사용 금지 — 반드시 타입 정의
- 인라인 스타일 (`style={{}}`) 사용 금지 — Tailwind 클래스 사용
- API 호출을 컴포넌트에서 직접 하지 않음 — hooks 레이어 거칠 것
- 환경변수 하드코딩 금지 — `import.meta.env.VITE_*` 사용

---

## Branch Strategy

```
main               ← production-ready
dev                ← integration branch
feat/{name}        ← feature branch
```

### Flow
```
feat/{name} → (GitHub PR) → dev → (GitHub PR) → main
```

### Rules
- 모든 기능은 `feat/` 브랜치에서 시작
- `main`, `dev` 직접 커밋 금지
- 기능 완료 시 `gh pr create --base dev` 로 PR 생성

---

## Git Commit Format

```
feat: 대회 목록 페이지 구현
fix: 로그인 토큰 저장 버그 수정
style: 대진표 UI 개선
refactor: API 훅 분리
chore: 환경변수 설정 추가
```

---

## Common Commands

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린트
npm run lint
```

---

## Current Progress

Update this section by asking: "AGENTS.md 진행 상태 업데이트해줘"

### Done
- [x] 프로젝트 세팅 (Vite + React + TypeScript)
- [x] Tailwind CSS v4, React Query, React Router, Axios 설치
- [x] 기본 프로젝트 구조 생성
- [x] axios 인스턴스, QueryClient 설정

### In Progress
- [ ] 대회 목록 페이지 (feat/tournament-list)

### Pending
- [ ] 대회 상세 페이지
- [ ] 대회 생성 페이지
- [ ] 로그인 / 회원가입
- [ ] 참가 신청 + 결제
- [ ] 대진표 페이지
- [ ] 내 정보 / 정산 내역

---

## PR Rules

- PR 제목과 내용에 AI 도구 관련 문구를 포함하지 않는다.
- `Co-authored-by` AI 서명을 추가하지 않는다.
- PR 내용은 개발자가 직접 작성한 것처럼 간결하게 작성한다.
- 과도한 파일 목록 나열을 피하고 핵심 구현 내용만 간략히 작성한다.
- AI 도구의 세션 링크를 포함하지 않는다.
