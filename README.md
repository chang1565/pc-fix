# PC FIX

컴퓨터에 나타난 증상이나 오류 코드를 검색하면 원인 후보와 확인 순서를 안내하는 웹 서비스입니다. 전문 용어를 몰라도 관찰한 현상으로 문제를 찾을 수 있도록 구성했습니다.

**운영 서비스:** [pcfixbase.com](https://pcfixbase.com/) · **소스 코드:** [chang1565/pc-fix](https://github.com/chang1565/pc-fix)

![PC FIX 운영 화면](docs/images/home.png)

![0xc0000005 통합 검색 결과](docs/images/search.png)

## 서비스와 이용 흐름

`증상·오류 코드 입력 → 관련 항목 선택 → 원인 후보 확인 → 해결 절차·FAQ 확인`

- **증상별 가이드:** 전원·부팅·화면·게임·인터넷 등 217개 문제를 검색과 카테고리로 탐색합니다.
- **오류 코드 가이드:** 7개 오류 분류의 80개 항목에 설명·해결 절차·관련 증상을 제공합니다.
- **통합 검색:** `게임하다 검은화면 재부팅`, `0xc0000005`, `Code 43`을 같은 검색창에서 처리합니다.
- **검색 상태 유지:** URL에 검색어를 저장해 상세 화면에서 돌아와도 검색을 복원합니다.
- **다국어:** 한국어·영어·일본어·중국어 간체를 제공합니다. 언어 전환 시 문서와 검색어를 유지합니다.
- **문서별 검색 노출:** canonical, hreflang, 구조화 데이터, robots와 sitemap을 구성했습니다.

## 기술 구성

| 영역 | 사용 기술 |
| --- | --- |
| 화면·라우팅 | Next.js 16 App Router, React 19, TypeScript |
| 스타일 | Tailwind CSS 4, CSS |
| 콘텐츠 | TypeScript 데이터, JSON 번역 사전 |
| 검색 | 동의어 정규화, n-gram·한글 자모 유사도, 오타 거리, 오류 코드 일치 |
| 운영 | Ubuntu 홈서버, Docker, Cloudflare |

문제·오류 데이터에서 상세 페이지를 생성합니다. 한국어 원본과 저장된 번역 사전으로 언어별 화면을 구성하며, 이용자가 문서를 읽을 때 외부 번역 API를 호출하지 않습니다. 가이드는 기기를 직접 검사하거나 고장 원인을 확정하는 진단 기능은 아닙니다.

## 검색과 다국어 처리

### 자연어 검색과 코드 검색의 우선순위

제목·키워드·증상에서 후보를 추린 뒤 상위 후보의 문자열과 한글 자모 유사도를 계산합니다. 정확한 오류 코드에는 오류 문서를 먼저 보여줍니다. 일반 증상에서는 기존 증상 결과의 상대 순위를 유지하며 관련 오류를 함께 보여줍니다.

### 상세 문서에서 돌아왔을 때 사라지는 검색

검색어를 `?q=`에 반영하고 최초 진입과 `popstate`에서 복원합니다. 입력에는 250ms 디바운스를 적용했습니다. 문서를 확인하고 돌아온 사용자가 같은 검색어를 다시 입력하는 일을 줄입니다.

### 다국어 콘텐츠의 일관성

언어 전환 시 slug·검색어·URL fragment를 유지합니다. 자동 검사로 오류 코드·실행 명령·관련 링크의 보존을 확인합니다. 언어별 canonical과 hreflang을 제공하며 sitemap에는 1,284개 URL을 포함합니다. 크롤링 가능한 구조이며 검색 순위나 색인 완료를 보장하지 않습니다.

## 코드 살펴보기

| 파일 | 확인할 내용 |
| --- | --- |
| [lib/search.ts](lib/search.ts) | 증상 후보 추출과 유사도 계산 |
| [lib/unifiedSearch.ts](lib/unifiedSearch.ts) | 증상·오류 결과 통합과 우선순위 |
| [app/(ko)/page.tsx](app/%28ko%29/page.tsx) | 검색어 복원과 디바운스 |
| [lib/localization.ts](lib/localization.ts) | 언어별 경로와 대체 언어 링크 |
| [app/sitemap.ts](app/sitemap.ts) | 데이터 기반 다국어 sitemap |
| [scripts/check-errors.mjs](scripts/check-errors.mjs) | 검색·데이터·링크 회귀 검사 |

## 운영

Ubuntu 홈서버에서 Docker로 실행합니다. Cloudflare를 통해 도메인과 HTTPS를 연결하며, 같은 서버의 결(GYEOL)과 서비스 구성·포트를 분리했습니다. 특정 서비스 포트의 외부 직접 접근은 별도 규칙으로 제한합니다. 자세한 설정은 [보안·운영 설정](docs/security.md)에 있습니다.

HTTPS 리다이렉트와 보안 응답 헤더를 설정하고 Next.js 식별 헤더를 비활성화했습니다. 개발과 수정에는 Codex를 활용했습니다.

외국어 본문에는 기계 번역 초안이 포함되어 있습니다. 기술 용어와 알려진 의미 오류를 수정하고 자동 검사를 두었으나 전체 본문에 대한 원어민 감수는 완료되지 않았습니다.

## 로컬 실행

```sh
npm ci
npm run dev
```

[localhost:3000](http://localhost:3000)에서 확인합니다. 운영 빌드는 `npm run build`, 실행은 `npm start`를 사용합니다.

## 검증

```sh
node scripts/check-errors.mjs
node scripts/check-locales.mjs
npx tsc --noEmit
npm run lint
npm run build
```

데이터 검사는 증상 217개·오류 80개, 코드 검색 우선순위, 기존 증상 순위, 관련 링크, sitemap 중복과 날짜 일관성을 확인합니다. 번역 검사는 명령·식별자 보존과 알려진 오역을 확인합니다.

2026-10-14 확인 결과: `check-errors.mjs`의 데이터·검색·링크·sitemap 검사는 통과했습니다. 공개 홈페이지 응답과 실제 `0xc0000005` 검색 결과도 확인했습니다. `check-locales.mjs`는 영어 사전의 `광고` 항목 누락으로 실패했으며, 번역 검사가 모두 통과한 상태는 아닙니다.

TypeScript·lint·전체 빌드는 이번 문서 수정에서 재실행하지 않았습니다. 기존 Windows 환경에는 프로덕션 빌드가 경로·권한 오류로 중단된 이력이 있습니다.

자세한 내용: [다국어 구조](docs/localization.md) · [보안·운영 설정](docs/security.md)
