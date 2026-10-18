# 2026-10-18 PC FIX 콘텐츠 검수 수정

## 수정 범위

- 기존 검수 지적 136개 글: 증상 82개·오류코드 54개. 기존 조치와 실제 배포 데이터가 달라졌는지 확인했다.
- 증상 53개는 공통 후속 목록을 전용 절차로 교체했다. 나머지 지적은 공유 절차의 실행 위치·결과 판단을 수정했다. 공유 절차를 쓰는 다른 글에도 함께 적용된다.
- 확인된 번역 157개를 수정했다. 새로 작성한 절차·제목·결과 설명도 3개 언어로 반영하고 대조했다. 원어민 전체 감수나 실제 고장 재현 시험으로 표시하지 않는다.
- 부팅 전/실행 중 Windows/WinRE, 새 빈 디스크/기존 데이터, 외장 USB/내장 장치, 프린터/스캐너, 절전 진입/복귀를 구분했다.
- 키·메뉴·명령어·로그 위치와 변경 후 결과·복원·중단 조건을 작성했다.

## 검증

필수 검사: npm run lint, node scripts/check-errors.mjs, node scripts/check-locales.mjs, node scripts/check-guidance.mjs, node scripts/check-review-regressions.mjs, npm run build, node scripts/check-rendered-guidance.mjs.

한국어 원문 297개, 외국어 상세 891개, 총 1,188개 상세 HTML의 실제 지침·위치·판단·canonical을 확인한다. 브라우저에서는 검색 → 해결 글 → 언어 변경과 모바일/PC 줄바꿈을 확인한다. 배포 후에는 라이브 응답과 본문 일치를 별도로 확인한다.

## 공식 자료 대조

- [전원·POST·부팅 구분](https://www.dell.com/support/kbdoc/en-us/000125609/resolve-no-power-no-post-no-boot-or-no-video-issues-with-your-dell-computer)
- [Windows 이미지 복구](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/repair-a-windows-image?view=windows-11)
- [호환 복구 원본](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/configure-a-windows-repair-source?view=windows-11)
- [클린 부팅과 복원](https://support.microsoft.com/en-us/windows/experience/startup-boot/how-to-perform-a-clean-boot-in-windows)
- [Chrome 사이트별 쿠키 삭제](https://support.google.com/chrome/answer/95647)

문서 기반의 상황·절차 검증이다. 실제 장치에 장애를 주입하거나 수리 성공률을 측정하지 않았다.

## 지적된 글별 반영

|종류|주소|검수 항목|
|---|---|---|
|증상|/problems/laptop-no-power|M01|
|증상|/problems/pc-turns-on-then-off|M01|
|증상|/problems/pc-power-cycles-loop|M01|
|증상|/problems/pc-beeps-on-startup|M01|
|증상|/problems/motherboard-debug-led|M01|
|증상|/problems/safe-mode-stuck|U01|
|증상|/problems/inaccessible-boot-device-bsod|U10|
|증상|/problems/windows-black-screen-cursor|U02|
|증상|/problems/black-screen-after-login|U02|
|증상|/problems/black-screen-after-update|U03|
|증상|/problems/black-screen-after-gpu-driver-update|U03|
|증상|/problems/screen-flickering|U06|
|증상|/problems/screen-tearing|U06|
|증상|/problems/wrong-resolution|U06|
|증상|/problems/refresh-rate-not-available|U06|
|증상|/problems/second-monitor-not-detected|U05, U06|
|증상|/problems/monitor-wakes-no-display|U21|
|증상|/problems/gpu-not-detected|U04|
|증상|/problems/gpu-driver-install-fail|U04|
|증상|/problems/gpu-high-temp|U22|
|증상|/problems/gpu-low-usage-fps|U04|
|증상|/problems/game-after-driver-update-crash|U03|
|증상|/problems/game-fullscreen-flicker|U06|
|증상|/problems/windows-update-rollback-loop|U10|
|증상|/problems/file-explorer-not-opening|U07|
|증상|/problems/file-explorer-not-responding|U07|
|증상|/problems/taskbar-start-menu-frozen|U07|
|증상|/problems/windows-search-not-working|U07, U08|
|증상|/problems/system-file-corruption|U09|
|증상|/problems/windows-activation-error|M03|
|증상|/problems/windows-settings-not-opening|U07|
|증상|/problems/windows-reset-fail|M04|
|증상|/problems/restore-point-fail|M04|
|증상|/problems/high-ram-usage|M02|
|증상|/problems/memory-leak|M02|
|증상|/problems/c-drive-full|M05|
|증상|/problems/temp-files-growing|M05|
|증상|/problems/ssd-not-detected-bios|M06, U11|
|증상|/problems/ssd-not-detected-windows|U11|
|증상|/problems/hdd-not-detected|U11|
|증상|/problems/external-drive-not-recognized|U11|
|증상|/problems/drive-letter-missing|U11|
|증상|/problems/disk-unallocated|U11, U12|
|증상|/problems/cpu-overheating|U22|
|증상|/problems/cpu-new-install-no-boot|M01|
|증상|/problems/bios-after-ram-upgrade-no-boot|M01|
|증상|/problems/wifi-not-showing|U13|
|증상|/problems/wifi-slow|U14|
|증상|/problems/ethernet-speed-100mbps|U14|
|증상|/problems/network-adapter-missing|U13|
|증상|/problems/high-ping|U14|
|증상|/problems/packet-loss|U14|
|증상|/problems/network-share-not-accessible|M07|
|증상|/problems/bluetooth-missing|U13|
|증상|/problems/usb-not-recognized|U15|
|증상|/problems/usb-disconnect-reconnect|U15|
|증상|/problems/usb-port-not-working|U15|
|증상|/problems/usb-slow-transfer|U14, U15|
|증상|/problems/usb-device-code43|U15|
|증상|/problems/usb-hub-issues|U15|
|증상|/problems/mouse-not-working|U16|
|증상|/problems/mouse-lag|U16|
|증상|/problems/mouse-double-click|U16|
|증상|/problems/touchpad-not-working|U16|
|증상|/problems/touchpad-cursor-jumps|U16|
|증상|/problems/mic-echo-feedback|U17|
|증상|/problems/slow-printing|U18|
|증상|/problems/poor-print-quality|M09|
|증상|/problems/scanner-not-detected|M08|
|증상|/problems/printing-from-app-fails|U18|
|증상|/problems/battery-drains-fast|U19|
|증상|/problems/battery-swollen|U20|
|증상|/problems/computer-overheating|U22|
|증상|/problems/laptop-overheating|U22|
|증상|/problems/fan-loud|U22|
|증상|/problems/fan-always-on|U22|
|증상|/problems/fan-not-spinning|U20, U22|
|증상|/problems/laptop-shuts-down-hot|U22|
|증상|/problems/laptop-slow-on-battery|U19|
|증상|/problems/sleep-wake-problem|U21|
|증상|/problems/lid-close-not-sleep|U21|
|증상|/problems/hibernate-missing|M10|
|오류코드|/errors/critical-process-died|E01|
|오류코드|/errors/memory-management|E02|
|오류코드|/errors/irql-not-less-or-equal|E03|
|오류코드|/errors/page-fault-in-nonpaged-area|E05|
|오류코드|/errors/whea-uncorrectable-error|E06|
|오류코드|/errors/dpc-watchdog-violation|E07|
|오류코드|/errors/video-tdr-failure|E08|
|오류코드|/errors/inaccessible-boot-device|E09|
|오류코드|/errors/kernel-security-check-failure|E10|
|오류코드|/errors/driver-power-state-failure|E11|
|오류코드|/errors/unexpected-store-exception|E12|
|오류코드|/errors/ntfs-file-system|E13|
|오류코드|/errors/driver-irql-not-less-or-equal|E14|
|오류코드|/errors/0x80070005|E15|
|오류코드|/errors/0x80070002|E16|
|오류코드|/errors/0x80070057|E17|
|오류코드|/errors/0x8007000d|E18|
|오류코드|/errors/0x80070570|E20|
|오류코드|/errors/0x800f081f|E21|
|오류코드|/errors/0x800f0906|E22|
|오류코드|/errors/0x800f0922|E23|
|오류코드|/errors/0x80070422|E24|
|오류코드|/errors/0x80070020|E26|
|오류코드|/errors/0x80072ee2|E27|
|오류코드|/errors/0x80072efe|E28|
|오류코드|/errors/0x8024402c|E29|
|오류코드|/errors/0x80240034|E30|
|오류코드|/errors/0x80070643|E32|
|오류코드|/errors/0x80070003|E33|
|오류코드|/errors/0xc1900101|E34|
|오류코드|/errors/device-manager-code-10|E35|
|오류코드|/errors/device-manager-code-31|E37|
|오류코드|/errors/device-manager-code-43|E38|
|오류코드|/errors/device-manager-code-19|E41|
|오류코드|/errors/device-manager-code-39|E43|
|오류코드|/errors/dxgi-error-device-hung|E44|
|오류코드|/errors/dxgi-error-device-removed|E45|
|오류코드|/errors/dxgi-error-device-reset|E46|
|오류코드|/errors/dxgi-error-driver-internal-error|E47|
|오류코드|/errors/dxgi-error-unsupported|E49|
|오류코드|/errors/dns-probe-finished-bad-config|E51|
|오류코드|/errors/dns-probe-finished-no-internet|E52|
|오류코드|/errors/err-connection-reset|E53|
|오류코드|/errors/err-connection-timed-out|E54|
|오류코드|/errors/err-connection-refused|E55|
|오류코드|/errors/err-internet-disconnected|E58|
|오류코드|/errors/err-too-many-redirects|E59|
|오류코드|/errors/err-ssl-protocol-error|E60|
|오류코드|/errors/err-cert-authority-invalid|E62|
|오류코드|/errors/0xc0000005|E64|
|오류코드|/errors/0xc000012f|E68|
|오류코드|/errors/0xc0000022|E69|
|오류코드|/errors/msvcr100-dll|E74|
|오류코드|/errors/error-1603|E77|
