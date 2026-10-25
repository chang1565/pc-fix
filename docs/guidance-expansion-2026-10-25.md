# 축약된 문제 해결 안내 보완 — 2026-10-25

## 변경 범위

- 10월 18일 편집 전 데이터(d3f1bcd)와 현재 안내를 비교했다.
- 단일 조치로 축약된 증상 53개와 진단 안내만 남았던 HDD 클릭음·BitLocker 복구 화면을 포함해 증상 55개를 보완했다.
- 증상별 후속 조치 58개를 추가했다. 팬 정지는 정상 정지 조건·제조사 진단·전원 분리 후 연결 확인으로 나누고, 손상 디스크·팽창 배터리·암호화 복구는 안전 중단과 지원 경로를 유지했다.
- 실행 안내가 짧아진 오류 16개도 확인해 메뉴 경로, 확인 결과, 재시도·중단 기준을 추가했다. 대상: 0x80070070, Code 22/28/45/52, NET::ERR_CERT_DATE_INVALID, 0xC000007B/0142/0135, VCRUNTIME140.dll, VCRUNTIME140_1.dll, MSVCP140.dll, MSVCP120.dll, D3DX9_43.dll, XINPUT1_3.dll, Error 1618.
- 기존 단계의 이유가 비어 있지 않으면 상세 화면에 다시 표시한다. 신규 단계와 오류 안내에는 증상에 맞는 이유를 작성했다.
- 제목·H1·메타 설명·URL은 유지했다. 실제 내용을 바꾼 페이지의 사이트맵 수정일을 반영하고 외국어 URL에 오래된 공통 날짜를 덮어쓰던 처리를 제거했다.
- 새 안내를 영어·일본어·중국어에 반영했다. 자동 번역 초안을 검토하고 복구 키, 배터리 위험, 팬 연결, 보안 해제 금지, 런타임 아키텍처 등의 의미 오류와 UI 용어를 수정했다.

## 검토 기준

위치·여는 키 또는 메뉴 → 확인할 값·증상 → 결과별 다음 행동을 제공한다. 부팅 전 문제에 Windows용 복구를 적용하지 않고, 고장 디스크의 반복 검사·복구 키 없는 파티션 삭제·팬 정지 상태의 강제 고부하·드라이버 서명 검사 해제를 안내하지 않는다. 단계 수나 글자 수 자체는 유용성의 증명이 아니다.

## 참고한 공식 자료

- Microsoft, BitLocker 복구 키: https://support.microsoft.com/en-us/windows/security/encryption/find-your-bitlocker-recovery-key
- Microsoft, Windows 복구 옵션: https://support.microsoft.com/en-gb/windows/experience/backup-recovery/recovery-options-in-windows
- Microsoft, 절전·최대 절전 파일: https://learn.microsoft.com/en-us/windows/win32/power/system-power-states
- Dell, 팬 문제와 모델별 진단: https://www.dell.com/support/kbdoc/en-us/000179087/how-to-troubleshoot-fan-issues

## 검증 범위

검사 도구는 검색·메타·번역·명령어·실행 환경·안전 중단과 빌드된 4개 언어 상세 HTML의 실제 표시 여부를 확인한다. HDD·BitLocker는 단계 수 1개 고정 대신 안전한 후속 안내가 있고 일반 수리 경로를 노출하지 않는지 검사한다. 실제 하드웨어 고장 재현이나 검색 순위 회복을 증명하는 검사는 아니다.
