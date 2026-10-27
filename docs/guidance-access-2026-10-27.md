# 전체 문제 해결 안내 보강 — 2026-10-27

- 증상 217개와 오류 80개, 총 297개 글을 대상으로 했다. 4개 언어의 상세 URL은 1,188개다.
- 실제 후속 조치 1,151개를 434종의 고유 절차로 분류했다. 각 절차에 적용 조건, 여는 경로 3개, 주의사항을 명시적으로 연결했다. 미분류 절차는 빌드를 실패시킨다.
- 설명이 짧은 43종의 절차를 구체화했다. 전원·영상 연결, 키보드·마우스·SD 카드, 공유기 비교, 충전, SFC 후 업데이트 등을 다룬다. 단계별 확인 위치·판단·후속 행동은 기존 안내와 함께 제공한다.
- 글 상단의 상황별 링크는 해당 조치의 앵커로 이동한다. 여는 방법과 주의사항은 펼쳐 볼 수 있다. 첫 조치 뒤에는 해당 절차의 경로 도식을 배치했다. 56종의 도식이 실제 글에서 사용된다.
- 그림은 코드로 작성한 SVG 안내 도식이다. 실제 Windows 화면이나 고장 재현 사진으로 표시하지 않는다. 글자와 설명은 4개 언어로 제공한다.
- 번역 초안에서 인증서 경고 무시, 전원 종료와 AC 분리의 결합 조건, TPM 초기화와 디스크 포맷의 구분, MOD·서비스 시작 유형·UAC 용어를 교정했다. 실행 이름 `optionalfeatures`의 번역 오류를 수정하고 보호 규칙과 회귀 검사를 추가했다.
- 기존 URL, H1, 검색 제목·설명, 증상 분기, 주의 문구, 관련 글 관계를 이전 조립 데이터와 비교했다. 이 값들은 유지했고 조치 수를 줄이지 않았다. 실제 수정한 글의 검토일과 사이트맵 수정일을 갱신했다.
- 국가별 자동 언어 이동, 통합 검색, 광고 설정은 변경하지 않았다.

## 범위 확인

[전체 URL별 적용 목록](guidance-access-2026-10-27.csv)에 297개 원문 URL, 조치 수, 안내 유형, 짧은 절차 수정 수를 기록했다. 외국어 페이지는 같은 원문 데이터를 저장된 번역 사전으로 변환한다.

## 검증

- 전체 빌드: 정적 페이지 1,290개 생성.
- 상세 HTML 검사: 1,188개 페이지, 5,472개 섹션의 기존 지시문·위치·결과와 새 적용 조건·앵커·접근 가능한 도식 확인.
- 사이트맵 검사: 1,284개 URL의 canonical, robots, 초기 본문, 언어 링크와 홈에서의 내부 링크 도달성 확인.
- 4개 언어 데이터·명령어·검색·위험 중단 경로 검사 통과.
- Chrome: 390px에서 4개 언어의 주요 글 16개, 360·768·1366px에서 대표 글 6개 확인. 가로 넘침·도식 잘림·좌우 광고와 본문 겹침 없음. 검색 → 상세 글 → 조치 바로가기 → 여는 방법 펼치기 확인.

재검사 명령:

```text
npm run lint -- --ignore-pattern work/**
node scripts/check-errors.mjs
node scripts/check-locales.mjs
node scripts/check-guidance.mjs
node scripts/check-review-regressions.mjs
node scripts/check-procedure-guides.mjs
npm run build
node scripts/check-rendered-guidance.mjs
node scripts/check-indexability.mjs
```

## 참고한 공식 절차

- [Windows 복구 옵션](https://support.microsoft.com/en-us/windows/experience/backup-recovery/recovery-options-in-windows)
- [장치 관리자 오류 코드](https://support.microsoft.com/en-us/windows/hardware/drivers/error-codes-in-device-manager-in-windows)
- [디스크 관리와 새 디스크 초기화 조건](https://learn.microsoft.com/en-us/windows-server/storage/disk-management/initialize-new-disks)
- [Wi-Fi 연결 문제와 공유기 재시작](https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-wi-fi-connection-issues-in-windows)
- [Chrome 시크릿 모드](https://support.google.com/chrome/answer/95464)
- [Steam 파일 무결성 확인](https://help.steampowered.com/en/faqs/view/0C48-FCBD-DA71-93EB)

## 검증의 한계

인터넷 자료 대조, 데이터·초기 HTML 검사, 브라우저 확인을 수행했다. 실제 하드웨어 고장을 모두 재현한 시험이나 외국어 원어민 감수는 수행하지 않았다. 검사 통과는 Google 색인·순위 회복 또는 AdSense 승인을 보장하지 않는다. 기존에 접수된 색인·광고 심사 요청은 이 변경만으로 반복 제출하지 않는다.
