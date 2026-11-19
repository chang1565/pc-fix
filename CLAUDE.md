@AGENTS.md

# Claude Code 인계 노트 (Codex → Claude 이관, 2026-11-14)

PC FIX(pcfixbase.com)는 증상·오류 코드로 원인 후보와 확인 순서를 안내하는 **다국어(ko/en/ja/zh) 진단 웹 서비스**다. 결담록(GYEOL)과는 완전히 다른 프로젝트다. GitHub `chang1565/pc-fix`, 브랜치 `main`.

## 기준 소스

- **기준은 운영 서버에서 라이브로 서비스 중인 버전이다(사용자 확정).** 로컬 폴더·GitHub보다 우선한다.
- 2026-11-19 확인: 라이브 컨테이너 `pc-fix` 이미지 `pc-fix:ko-guides-20261119`, 서버 `~/pc-fix` git HEAD `8c074c3` = GitHub `main` = 이 로컬 폴더. 서버 작업트리의 커밋 안 된 파일은 배포용 `Dockerfile`, `docker-compose.yml`, `.dockerignore`와 `docker-compose.yml.bak-날짜` 백업뿐이다. 서버 상세는 `C:\Users\1565c\Documents\Claude\개발\SERVER.md`.
- 배포 방식: GitHub `main`에 푸시 → 서버에서 `git pull --ff-only` → `docker-compose.yml`의 `image:` 태그를 새 이름(예: `pc-fix:내용-YYYYMMDD`)으로 바꾸고(바꾸기 전 `docker-compose.yml.bak-YYYYMMDD`로 복사) → `docker compose build && docker compose up -d`. 이전 이미지는 되돌리기용으로 남긴다.
- 11/14~11/19 배포 이력: `fa6f0da` 새 디자인(단계 접기·고급 단계 표시) → `e4e6621` 내용 검수 수정·소개/문의 보강·숨은 광고 자리 오류 수정 → `8c074c3` 한국어 증상·오류 297개 전부 직접 쓴 안내(`data/koGuides/batch1~18.ts`).
- 작업 시작 시: (1) 서버의 라이브 이미지·`git status`·`git diff --stat`을 읽기 전용으로 확인하고, (2) 서버에 커밋 안 된 수정이 있으면 그 내용을 사용자와 확인한 뒤, (3) 로컬을 `git pull --ff-only`로 맞추고 그 위에서 작업한다. 서버의 미커밋 수정을 덮어쓰지 않는다.
- `C:\Users\1565c\Documents\Claude\개발\work\pc-fix-portfolio`(예전 위치 OneDrive\문서\ChatGPT\개발)는 10/28 구버전 사본이다. 거기서 작업하지 않는다.
- `work/`는 untracked 폴더다(색인 점검 결과 JSON 등 작업 기록). 커밋하지 않는다.
- 작업 시작 시 `git status`와 `git log -5`를 먼저 확인한다. 운영 반영 버전과 로컬이 같은지 모를 때는 운영 서버의 커밋을 확인한 뒤 작업한다.

## 구성과 명령

- Next.js 16 App Router, React 19, TypeScript, Tailwind 4. **이 Next.js는 학습 데이터와 다르다.** 코드를 쓰기 전에 `node_modules/next/dist/docs/`의 관련 문서를 읽는다(`AGENTS.md` 규칙).
- 한국어 증상·오류 페이지 본문은 `data/koGuides/batch*.ts`(직접 쓴 안내, 형식 `types.ts`)가 `problems.ts`·`errorCodes.ts`의 틀 문장을 덮어쓴다(`lib/koGuide.ts`). 외국어 페이지는 koGuides를 쓰지 않고 기존 번역 사전을 쓴다.
- 콘텐츠는 `data/`의 TypeScript·JSON, 번역은 저장된 JSON 사전이다. 이용자가 볼 때 외부 번역 API를 호출하지 않는다.
- 검색: `lib/search.ts`(후보·자모 유사도), `lib/unifiedSearch.ts`(증상·오류 통합). 다국어 경로: `lib/localization.ts`. sitemap: `app/sitemap.ts`.
- 실행: `npm ci`, `npm run dev`(localhost:3000), `npm run build`, `npm start`, `npm run lint`.
- 검증: `node scripts/check-errors.mjs`, `node scripts/check-locales.mjs`, `npx tsc --noEmit`, `npm run lint`, `npm run build`. 변경 범위에 맞게 먼저 관련 검사를 돌리고, 안정되면 전체를 한 번 돌린다.
- 문서: `docs/localization.md`, `docs/security.md`, `docs/search-ctr.md`, `docs/search-recrawl-2026-11-09.md`.

## 운영

- 홈서버(Ubuntu N100): Docker 컨테이너 `pc-fix`, Cloudflare로 도메인·HTTPS. 같은 서버에서 결담록과 포트·구성을 분리해 운영한다. PC FIX의 3000번 포트와 메트릭 20242번 포트는 집 LAN·로컬에서만 허용하는 방화벽 규칙이 있다(`C:\Users\1565c\Documents\Claude\개발\outputs\pcfix-security-firewall.sh`, **운영 방화벽이므로 실행 금지·사용자 확인 필수**).
- 배포·서버 접속(SSH)·컨테이너 재시작은 사용자 확인 후에만 한다. 서버 주소·계정·비밀번호는 문서에 적지 않는다.
- 배포 후에는 실제 반영과 핵심 동작(대표 페이지, 검색, 언어 전환)을 확인하고, 로컬 검증과 운영 반영을 구분해서 보고한다.

## 색인·SEO (진행 중인 일)

- 10/18 전 콘텐츠 재작성 이후 색인이 빠졌고, 이전 버전으로 되돌린 뒤 11/9에 크롤 가능한 언어 링크와 sitemap 날짜를 복구했다. 현재는 **재수집·색인 회복을 지켜보는 단계**다.
- 2026-11-19 분석(`work/index-breakdown-2026-11-19.json`, 데이터 11/13 기준): 색인 538 / 미색인 759(크롤링됨-색인 안 됨 718). **빠진 것은 한국어 원문**이다. 한국어 증상·오류 297개 중 33개만 색인, 영어·일본어는 대부분 색인, 중국어도 약함. 그래서 번역 페이지를 noindex하지 않는다.
- 2026-11-19: 한국어 297개를 직접 쓴 안내로 바꿔 배포하고, 사이트맵 1회 재제출 + 노출 있던 한국어 10개 색인 요청(`work/index-requests-2026-11-19.json`).
- 예약 작업 `pcfix-daily-index-requests`(매일 10:11)가 `work/index-request-queue.json` 대기열에서 하루 10개씩 색인 요청한다(약 29일). 대기열이 비면 사용자에게 끄라고 알린다. 예전 문서에 있던 화요일 점검 `pc-fix-index-recovery-check`는 Codex 쪽 작업이었고 Claude에는 없다.
- **배포 직후 색인 요청·사이트맵 재제출·대량 제목 변경을 반복하지 않는다.** 색인 요청과 애드센스 재검토는 "요청"일 뿐 색인·승인이 아니다. 나중에 현재 상태를 다시 조회한다.
- 애드센스 재심사 대비 검수 기록: `C:\Users\1565c\Documents\Claude\개발\outputs\adsense-audit-2026-10-18.md`(개인정보 고지 불일치, 모바일 빈 광고 공간, 반복 본문·번역 품질 문제). Google 공식 판정이 아니다.

## 콘텐츠 원칙 (사용자가 확정한 것)

- 추상 슬로건 대신 **기기·오류·증상별 해결 언어**를 쓴다.
- 의미 검수는 자동 구조 검사만으로 끝내지 않는다. 대표 증상·오류의 적용 조건·결과·출처를 직접 읽는다.
- 외국어 본문에는 기계 번역 초안이 있다. 명령어·오류 코드·식별자 보존을 자동 검사하되, 원어민 감수가 끝났다고 말하지 않는다.
- 가이드는 고장 원인을 확정하는 진단이 아니다. 그렇게 보이는 문구를 만들지 않는다.
- 같은 서버의 결담록과 콘텐츠·브랜드를 섞지 않는다.

## 관련

- 홈서버 모니터·백업: `C:\Users\1565c\Documents\Claude\개발\outputs\`
- 과거 Codex 대화 기록: `C:\Users\1565c\.codex\memories\`(읽기 전용 참고, 전역 `CLAUDE.md` 참고)
