@AGENTS.md

# Claude Code 작업 노트

PC FIX(pcfixbase.com)는 증상·오류 코드로 원인 후보와 확인 순서를 안내하는 **다국어(ko/en/ja/zh) 진단 웹 서비스**다. GitHub `chang1565/pc-fix`, 브랜치 `main`.

- 서버·배포·로컬 경로·색인 작업 기록 같은 운영 정보는 커밋하지 않는 `CLAUDE.local.md`에 있다. 이 저장소는 공개이므로 서버 주소·내부 네트워크·포트·방화벽·계정 정보와 개인 PC 경로를 커밋하지 않는다.
- 기준은 운영 서버에서 라이브로 서비스 중인 버전이다. 작업 전 `git status`, `git log -5`로 상태를 확인한다.
- `work/`는 작업 기록 폴더이며 커밋하지 않는다.

## 구성과 명령

- Next.js 16 App Router, React 19, TypeScript, Tailwind 4. **이 Next.js는 학습 데이터와 다르다.** 코드를 쓰기 전에 `node_modules/next/dist/docs/`의 관련 문서를 읽는다(`AGENTS.md` 규칙).
- 한국어 증상·오류 페이지 본문은 `data/koGuides/batch*.ts`(직접 쓴 안내, 형식 `types.ts`)가 `problems.ts`·`errorCodes.ts`의 틀 문장을 덮어쓴다(`lib/koGuide.ts`). 외국어 페이지는 koGuides를 쓰지 않고 기존 번역 사전을 쓴다.
- 콘텐츠는 `data/`의 TypeScript·JSON, 번역은 저장된 JSON 사전이다. 이용자가 볼 때 외부 번역 API를 호출하지 않는다.
- 검색: `lib/search.ts`(후보·자모 유사도), `lib/unifiedSearch.ts`(증상·오류 통합). 다국어 경로: `lib/localization.ts`. sitemap: `app/sitemap.ts`.
- 실행: `npm ci`, `npm run dev`(localhost:3000), `npm run build`, `npm start`, `npm run lint`.
- 검증: `node scripts/check-errors.mjs`, `node scripts/check-locales.mjs`, `npx tsc --noEmit`, `npm run lint`, `npm run build`. 변경 범위에 맞게 먼저 관련 검사를 돌리고, 안정되면 전체를 한 번 돌린다.
- 문서: `docs/localization.md`, `docs/security.md`, `docs/search-ctr.md`, `docs/search-recrawl-2026-11-09.md`.

## 콘텐츠 원칙 (사용자가 확정한 것)

- 추상 슬로건 대신 **기기·오류·증상별 해결 언어**를 쓴다.
- 의미 검수는 자동 구조 검사만으로 끝내지 않는다. 대표 증상·오류의 적용 조건·결과·출처를 직접 읽는다.
- 외국어 본문에는 기계 번역 초안이 있다. 명령어·오류 코드·식별자 보존을 자동 검사하되, 원어민 감수가 끝났다고 말하지 않는다.
- 가이드는 고장 원인을 확정하는 진단이 아니다. 그렇게 보이는 문구를 만들지 않는다.
- 같은 서버의 결담록과 콘텐츠·브랜드를 섞지 않는다.
