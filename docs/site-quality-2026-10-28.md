# PC FIX 전체 품질 개편 — 2026-10-28

## 사용자 경험

- 홈을 검색, 6개 증상군의 19개 진입 경로, 대표 가이드, 분야별 탐색 순서로 구성했다. 배터리 팽창·저장장치 이상음 중단 안내 2개도 연결했다.
- 네이비·초록·밝은 배경으로 시각 체계를 정리했다. 모바일 설명 패널 축소, 한글 단어 단위 줄바꿈, 키보드 포커스와 움직임 줄이기 설정을 반영했다.
- 상세 문서는 중단 경고를 절차보다 먼저 보여주고 공식 출처로 바로 이동할 수 있게 했다.
- 반복 설명을 줄인 절차 목차, 선택적으로 펼치는 경로 도식, JavaScript 없이 읽을 수 있는 FAQ를 적용했다.
- 증상·오류 전체 상세에 점검 기록 입력·복사·지우기를 추가했다. 기록은 컴포넌트 상태에만 두며 서버 전송·영구 저장을 하지 않는다. 새로고침하면 소실됨을 알린다.
- 4개 언어로 생성하고 홈의 핵심 문구와 버튼 번역을 별도로 다듬었다.

## 콘텐츠

- `procedureReview.json`의 결과 판단 29종을 조치별로 개정했다. 실제 반영된 증상 글은 86개다.
- 키보드 점검에 마우스·스크롤 결과를 제시하던 오류를 수정하고 재발 방지 검사를 추가했다.
- Wi-Fi와 Bluetooth 연결, 입력 장치, 프린터, 저장장치, 드라이버별 성공·실패 판단을 구분했다.
- `procedureReviewDates.json`으로 개정된 절차를 기록하고 해당 글의 수정일을 사이트맵에 반영했다.

## 초기 로딩

홈의 소개·카테고리 요약은 서버에서 만들고 브라우저에는 필요한 필드만 전달한다. 전체 검색 자료는 입력 후 동적 import로 불러온다. 검색 대기·불러오기 실패·빈 결과를 구분하고, 늦게 도착한 이전 검색 결과는 무시한다. 초기화 전 입력으로 검색어가 지워지는 경우도 막았다.

같은 로컬 환경에서 이전 production 빌드와 비교한 홈 HTML의 초기 script 파일 합계다. 압축 전 파일 크기이며 실제 회선 전송량·로딩 시간·Core Web Vitals 측정은 아니다. 검색 실행 시 추가 자료가 로드된다.

| 언어 | 이전 bytes | 개편 bytes | 감소 |
| --- | ---: | ---: | ---: |
| 한국어 | 1,483,028 | 606,583 | 약 59% |
| 영어 | 3,890,756 | 606,548 | 약 84% |
| 일본어 | 4,251,698 | 607,514 | 약 86% |
| 중국어 | 3,769,220 | 606,107 | 약 84% |

## 검증

- lint·TypeScript·production build 통과. 1,290 정적 경로 생성.
- check-errors, check-guidance, check-review-regressions, check-locales, check-procedure-guides 통과.
- check-indexability: 사이트맵 1,284개 초기 HTML·canonical·robots·도달 가능 경로 통과.
- check-rendered-guidance: 상세 1,188개, 절차 5,472개 출력 검사 통과.
- check-diagnostic-workflows: 대표 가이드 10개 × 4개 언어 검사 통과.
- 신규 check-site-quality: 언어별 21개 진입 링크, 850KB 초기 JS 예산, 전체 상세의 FAQ·출처·기록·도식 HTML 검사 통과.
- 브라우저: 한국어 증상 선택→Wi-Fi 상세→기록 입력·복사·지우기 확인. 오류 코드 검색→상세→뒤로가기 검색어 복원, 빈 결과·초기화 확인.
- 한국어·영어·일본어·중국어 홈 390px, 한국어 데스크톱 1366px 확인. 대표 화면에서 가로 넘침 없음. 모든 기기·화면의 수동 검증은 아님.
- [최종 데스크톱 화면](images/quality-home-20261028.jpg).

## 남은 작업

운영 배포와 AdSense 재심사는 하지 않았다. 실제 하드웨어 고장 재현·실제 수리 성공 사례·원어민 전체 감수·검색 순위 또는 광고 심사 결과는 검증하지 않았다. 앞서 만든 중복 보고서의 전체 통합 판단도 남아 있다. 이번 코드·문구·UI 검사로 수리 성공이나 AdSense 승인을 보장하지 않는다.

## 재검사 명령

`npm run lint`, `npm run build` 후 `node scripts/check-site-quality.mjs`, `node scripts/check-indexability.mjs`, `node scripts/check-rendered-guidance.mjs`, `node scripts/check-diagnostic-workflows.mjs`를 실행한다. 콘텐츠 변경 시 기존 guidance·locales·procedure-guides·review-regressions 검사도 실행한다.
