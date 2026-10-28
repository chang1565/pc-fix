# PC FIX 콘텐츠 개선 — 2026-10-28

이 문서는 초기 10개 가이드 개정 기록이다. 후속 63개 보강·중복 통합·검증은 [현재 보고서](content-overlap-2026-10-28.md)를 확인한다.

## 변경

- 대표 10개 증상 × 4개 언어에 적용 조건, 비교 진단, 결과별 다음 행동, 성공 확인, 중단 기준, 문의용 기록 항목 추가.
- 인터넷, Wi-Fi 인터넷 없음, 소리 없음, 부팅 지연, 일반 성능 저하, 디스크 100%, USB 인식, Bluetooth 페어링, 프린터 오프라인, 업데이트 실패.
- 홈에서 대표 가이드로 연결. 상세에서는 설정 변경 절차보다 비교 진단을 먼저 표시.
- 소개 페이지에 AI 활용·작성 기준·실물 재현 미완료·오류 신고 기준 공개.
- 기존 번역 수집·생성 흐름에 신규 데이터와 컴포넌트 연결. 복구 환경과 업데이트 제거의 의미가 섞인 번역 수정.
- 수정된 대표 문서와 홈의 sitemap 날짜만 갱신.

## 중복 분석과 한계

[중복 보고서](content-overlap-2026-10-28.md): 증상 217개 중 추가 절차의 실행 문장·순서가 같은 49개 그룹, 183개 문서. 전체 본문 중복률이 아니다. 각 글의 첫 분기와 검색 의도가 달라 URL 자동 통합·삭제는 하지 않았다.

이번 변경은 비교 진단 안내다. 실물 고장 재현이나 수리 성공 사례가 아니다. 실제 화면을 생성 이미지로 대체하지 않았다. 실물 자료, 전체 중복 후보의 통합 판단, 외국어 원어민 감수는 남아 있다. 운영 배포와 AdSense 재심사 제출은 하지 않았다.

## 검증

- lint, production build 통과: 1,290 정적 경로 생성.
- check-locales: 언어별 번역 8,043개 및 명령·검색·링크 검사 통과.
- check-guidance, check-procedure-guides, check-review-regressions 통과.
- check-indexability: 1,284 사이트맵 페이지의 초기 HTML·canonical·robots·도달 가능 경로 통과.
- check-rendered-guidance: 상세 1,188개·기존 절차 5,472개 렌더링 통과.
- check-diagnostic-workflows: 신규 진단 10개 × 4개 언어의 실제 HTML과 홈 링크 통과.
- 브라우저: 한국어 Wi-Fi 상세 390px, 영문 홈→Wi-Fi 상세 1366px 확인. 가로 넘침 없음. 모든 기기·언어 화면의 수동 검증은 아님.
- git diff --check 통과.

## 재현 자료 수집 기준

실제로 관찰한 사례만 장치 모델, Windows 빌드, 오류·발생 조건, 변경 전 화면, 변경한 한 항목, 변경 후 결과, 재시작 후 유지 여부로 기록한다. 계정·제품 키·IP 등 식별 정보는 가린다. 고장 재현을 위해 운영 PC의 네트워크·디스크·드라이버를 임의로 손상시키지 않는다. 정상 설정 화면만으로 수리 성공을 주장하지 않는다.

## 참고

- [Google AdSense 콘텐츠 품질 기준](https://support.google.com/adsense/answer/81904?hl=ko)
- [Microsoft Wi-Fi 연결 진단](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows)
- 개별 글 하단의 기존 제조사·Microsoft 공식 참고 자료. 문서 기반 안내의 근거이며 실제 고장 재현 증거가 아니다.
