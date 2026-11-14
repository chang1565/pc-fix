@AGENTS.md

# Claude Code 인계 노트 (Codex → Claude 이관, 2026-11-14)

PC FIX(pcfixbase.com)는 증상·오류 코드로 원인 후보와 확인 순서를 안내하는 **다국어(ko/en/ja/zh) 진단 웹 서비스**다. 결담록(GYEOL)과는 완전히 다른 프로젝트다. GitHub `chang1565/pc-fix`, 브랜치 `main`.

## 기준 소스

- **기준은 운영 서버에서 라이브로 서비스 중인 버전이다(사용자 확정).** 로컬 폴더·GitHub보다 우선한다.
- 2026-11-14 확인: 라이브 컨테이너 `pc-fix` 이미지 `pc-fix:search-recovery-20261109`. 서버 `~/pc-fix`의 git HEAD는 `5aa494f`(11/9 20:35 `Give localized information pages distinct search metadata`)로 GitHub `main`과 같다. 서버 작업트리의 커밋 안 된 파일은 배포용 `Dockerfile`, `docker-compose.yml`, `.dockerignore` 3개(untracked)뿐이고 소스 수정은 없다(`git diff` 비어 있음). 서버 상세는 `C:\Users\1565c\OneDrive\문서\ChatGPT\개발\SERVER.md`.
- 이 로컬 폴더(`C:\Users\1565c\Desktop\pc-fix`)는 `0d9624e`로 커밋 1개 뒤처져 있었다.
- 작업 시작 시: (1) 서버의 라이브 이미지·`git status`·`git diff --stat`을 읽기 전용으로 확인하고, (2) 서버에 커밋 안 된 수정이 있으면 그 내용을 사용자와 확인한 뒤, (3) 로컬을 `git pull --ff-only`로 맞추고 그 위에서 작업한다. 서버의 미커밋 수정을 덮어쓰지 않는다.
- `C:\Users\1565c\OneDrive\문서\ChatGPT\개발\work\pc-fix-portfolio`는 10/28 구버전 사본이다. 거기서 작업하지 않는다.
- `work/`는 untracked 폴더다(색인 점검 결과 JSON 등 작업 기록). 커밋하지 않는다.
- 작업 시작 시 `git status`와 `git log -5`를 먼저 확인한다. 운영 반영 버전과 로컬이 같은지 모를 때는 운영 서버의 커밋을 확인한 뒤 작업한다.

## 구성과 명령

- Next.js 16 App Router, React 19, TypeScript, Tailwind 4. **이 Next.js는 학습 데이터와 다르다.** 코드를 쓰기 전에 `node_modules/next/dist/docs/`의 관련 문서를 읽는다(`AGENTS.md` 규칙).
- 콘텐츠는 `data/`의 TypeScript·JSON, 번역은 저장된 JSON 사전이다. 이용자가 볼 때 외부 번역 API를 호출하지 않는다.
- 검색: `lib/search.ts`(후보·자모 유사도), `lib/unifiedSearch.ts`(증상·오류 통합). 다국어 경로: `lib/localization.ts`. sitemap: `app/sitemap.ts`.
- 실행: `npm ci`, `npm run dev`(localhost:3000), `npm run build`, `npm start`, `npm run lint`.
- 검증: `node scripts/check-errors.mjs`, `node scripts/check-locales.mjs`, `npx tsc --noEmit`, `npm run lint`, `npm run build`. 변경 범위에 맞게 먼저 관련 검사를 돌리고, 안정되면 전체를 한 번 돌린다.
- 문서: `docs/localization.md`, `docs/security.md`, `docs/search-ctr.md`, `docs/search-recrawl-2026-11-09.md`.

## 운영

- 홈서버(Ubuntu N100): Docker 컨테이너 `pc-fix`, Cloudflare로 도메인·HTTPS. 같은 서버에서 결담록과 포트·구성을 분리해 운영한다. PC FIX의 3000번 포트와 메트릭 20242번 포트는 집 LAN·로컬에서만 허용하는 방화벽 규칙이 있다(`C:\Users\1565c\OneDrive\문서\ChatGPT\개발\outputs\pcfix-security-firewall.sh`, **운영 방화벽이므로 실행 금지·사용자 확인 필수**).
- 배포·서버 접속(SSH)·컨테이너 재시작은 사용자 확인 후에만 한다. 서버 주소·계정·비밀번호는 문서에 적지 않는다.
- 배포 후에는 실제 반영과 핵심 동작(대표 페이지, 검색, 언어 전환)을 확인하고, 로컬 검증과 운영 반영을 구분해서 보고한다.

## 색인·SEO (진행 중인 일)

- 10/18 전 콘텐츠 재작성 이후 색인이 빠졌고, 이전 버전으로 되돌린 뒤 11/9에 크롤 가능한 언어 링크와 sitemap 날짜를 복구했다. 현재는 **재수집·색인 회복을 지켜보는 단계**다.
- 매주 화요일 18시에 Claude 예약 작업 `pc-fix-index-recovery-check`가 Search Console을 읽기 전용으로 점검하고 `work/index-recheck-날짜.json`을 남긴다. 기준 파일은 `work/index-recheck-2026-11-03.json`.
- **배포 직후 색인 요청·사이트맵 재제출·대량 제목 변경을 반복하지 않는다.** 색인 요청과 애드센스 재검토는 "요청"일 뿐 색인·승인이 아니다. 나중에 현재 상태를 다시 조회한다.
- 애드센스 재심사 대비 검수 기록: `C:\Users\1565c\OneDrive\문서\ChatGPT\개발\outputs\adsense-audit-2026-10-18.md`(개인정보 고지 불일치, 모바일 빈 광고 공간, 반복 본문·번역 품질 문제). Google 공식 판정이 아니다.

## 콘텐츠 원칙 (사용자가 확정한 것)

- 추상 슬로건 대신 **기기·오류·증상별 해결 언어**를 쓴다.
- 의미 검수는 자동 구조 검사만으로 끝내지 않는다. 대표 증상·오류의 적용 조건·결과·출처를 직접 읽는다.
- 외국어 본문에는 기계 번역 초안이 있다. 명령어·오류 코드·식별자 보존을 자동 검사하되, 원어민 감수가 끝났다고 말하지 않는다.
- 가이드는 고장 원인을 확정하는 진단이 아니다. 그렇게 보이는 문구를 만들지 않는다.
- 같은 서버의 결담록과 콘텐츠·브랜드를 섞지 않는다.

## 관련

- 홈서버 모니터·백업: `C:\Users\1565c\OneDrive\문서\ChatGPT\개발\outputs\`
- 과거 Codex 대화 기록: `C:\Users\1565c\.codex\memories\`(읽기 전용 참고, 전역 `CLAUDE.md` 참고)
