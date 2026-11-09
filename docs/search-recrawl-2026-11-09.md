# 복원 후 검색 수집 점검 · 2026-11-09

- 기준 운영본: `454522b` (10/18 대규모 개편 직전 `d3f1bcd` 내용 복원).
- Search Console: 최근 24시간 클릭·노출 0. 색인 집계는 여전히 10/23(색인 1,006·제외 291), 사이트맵 마지막 수집 10/28(성공·1,280 URL)이다. 오늘 복원 결과를 나타내지 않는다.
- ERR_CACHE_MISS: 크롤링 후 미색인, 표시된 마지막 수집 10/9. 영어 홈 `/en`: 마지막 수집 11/4, Google이 `/`을 표준으로 선택했다. 현재 자체 canonical을 강제로 한국어 주소로 합치지 않는다.

## 보완

- 사이트맵 수정일에 실제 운영 내용 복원일 11/9를 고정 기록한다. 빌드마다 현재 날짜로 갱신하지 않는다. 외국어 페이지가 오래된 공통 날짜로 덮이는 처리도 제거한다. 정책 페이지의 근거 없는 수정일은 생략한다.
- 기존 언어 메뉴를 실제 `a href` 링크로 연결한다. 현재 글·언어별 카테고리·검색어·해시·언어 선택 쿠키를 유지한다.
- 공개 문의 이메일에만 Cloudflare `email_off` 표시를 적용해 `/cdn-cgi/l/email-protection` 404 링크가 생성되지 않게 한다.
- 복원된 해결 글·제목·메타 설명·데이터·국가별 홈 이동 동작은 이번 보완으로 수정하지 않는다.

## 검증

- lint, 오류/언어 검사, 전체 빌드.
- `node scripts/check-rendered-indexing.mjs`: 1,284개 초기 HTML의 제목·canonical·언어 링크·내부 링크·사이트맵 날짜·루트에서의 링크 도달성 검사.
- 운영 반영, 실제 언어 이동·좁은 화면 확인과 Google 수집 요청 결과는 별도 실행 기록에 남긴다. 검색 노출 회복과 색인 복귀는 이 검사만으로 증명되지 않는다.

근거: [Google 링크 안내](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [사이트맵 수정일 안내](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [재수집 요청 안내](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
