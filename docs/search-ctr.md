# 검색 CTR 개선 기록

2026-10-16 Search Console에서 확인. 기준 기간: 2026-10-07~2026-10-13.

| 범위 | 클릭 | 노출 | CTR | 평균 순위 |
| --- | ---: | ---: | ---: | ---: |
| 전체 | 48 | 약 3,200 | 1.5% | 24.2 |
| 한국 | 34 | 635 | 5.4% | 10.4 |
| 일본 | 7 | 429 | 1.6% | 20.2 |
| 미국 | 1 | 842 | 0.1% | 37.7 |
| ERR_CACHE_MISS | 0 | 195 | 0% | 9.5 |
| ERR_NETWORK_CHANGED | 0 | 21 | 0% | 15.8 |
| 이 하드웨어 장치가 현재 컴퓨터에 연결되어 있지 않습니다. (코드 45) | 0 | 8 | 0% | 8.0 |

## 수정

- 위 오류 3개의 SEO 제목과 설명을 한국어·영어·일본어·중국어로 개선.
- 오류명, 검색자가 보는 메시지, 본문에 있는 확인 절차를 명확히 표기.
- ERR_CACHE_MISS의 결제·주문 중복 제출 주의 유지.
- URL, canonical, hreflang, 문제 해결 절차와 검색 기능 유지.
- 번역 재생성 중 발견한 누락된 광고 라벨 번역 보완.

## 비교 방법

### 노출 10회 이상 검색어로 범위 확대

동일한 7일 기준으로 노출 내림차순 목록에서 확인한 대상은 9개다. 다음 검색어는 8회로 기준 미만이었다. 검색어 필터를 적용한 뒤 페이지 탭에서 실제 노출 URL을 확인했다.

| 검색어 | 노출 | 클릭 | 평균 순위 | 확인된 실제 페이지 |
| --- | ---: | ---: | ---: | --- |
| err_cache_miss | 195 | 0 | 9.5 | 기존 개선 대상 /errors/err-cache-miss |
| pc 1722 | 22 | 0 | 8.1 | /en/errors/error-1722 (21), /errors/error-1722 (1) |
| err_network_changed | 21 | 0 | 15.8 | 기존 개선 대상 /errors/err-network-changed |
| 0x800736b1 | 16 | 1 | 6.1 | /en/errors/0x800736b1 (12), /ja/errors/0x800736b1 (4) |
| err_name_not_resolved | 14 | 0 | 21.4 | /ja/errors/err-name-not-resolved (12), /en/errors/err-name-not-resolved (2) |
| system service exception | 13 | 0 | 13.8 | /problems/bsod-system-service-exception (11), /ja/errors/system-service-exception (1), /en/errors/system-service-exception (1) |
| 0x8024200d | 12 | 2 | 14.7 | /ja/errors/0x8024200d (10), /errors/0x8024200d (2) |
| dxgi_error_device_reset | 10 | 0 | 6.8 | /errors/dxgi-error-device-reset (6), /en/errors/dxgi-error-device-reset (4) |
| dxgi_error_invalid_call | 10 | 0 | 9.9 | /en/errors/dxgi-error-invalid-call (8), /ja/errors/dxgi-error-invalid-call (2) |

위 대상 중 기존 2개를 제외한 오류 7개와 실제 검색 결과에 노출되는 SYSTEM_SERVICE_EXCEPTION 증상 페이지의 메타데이터를 4개 언어로 추가 개선했다. 기존 코드 45를 포함해 총 11종류·44페이지가 대상이다. 본문에 있는 확인 절차만 설명하며 해결이나 순위 상승을 보장하지 않는다.

라이브 반영 후 구글이 변경 내용을 다시 수집한 다음, 같은 검색어·페이지·국가·기기를 기준으로 이전과 이후의 완전한 14일을 비교한다. 클릭·노출·CTR·평균 순위를 함께 본다. 현재 표본이 작으므로 CTR 상승이나 순위 개선을 보장하지 않는다. 전체 평균만으로 제목 효과를 판단하지 않는다.

자동 점검이나 예약은 설정하지 않았다. 배포 여부는 Git 및 운영 서버에서 별도 확인한다.

## 검증

- `node scripts/check-locales.mjs`: 검색·80개 오류·번역·명령어·링크 검사 통과.
- `npm run lint`: 오류 0개. 기존 problems.ts 미사용 변수 경고 1개.
- `npm run build`: TypeScript 및 1,290개 정적 페이지 생성 통과.
- 확대 변경 후 44개 HTML의 제목·설명·Open Graph·canonical과 오류 페이지의 구조화 데이터 일치 확인.
