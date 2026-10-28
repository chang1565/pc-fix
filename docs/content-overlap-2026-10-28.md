# PC FIX 절차 중복 점검 — 2026-10-28

증상 217개 중 첫 진단을 제외한 추가 절차의 실행 문장과 순서가 같은 그룹 49개, 해당 문서 183개.

전체 본문의 중복 판정이 아니다. 첫 진단·제목·증상·출처·FAQ가 다를 수 있다. 자동 삭제·리다이렉트·noindex 대상 목록으로 사용하지 않는다.

| 그룹 | 문서 수 | URL slug |
| --- | --- | --- |
| 1 | 10 | video-tdr-failure, windows-blue-screen, bsod-memory-management, bsod-irql-not-less-or-equal, bsod-page-fault, bsod-whea-uncorrectable, bsod-dpc-watchdog, bsod-critical-process-died, bsod-driver-power-state, bsod-system-service-exception |
| 2 | 10 | game-audio-cut, bluetooth-connected-no-sound, bluetooth-audio-low-quality, no-sound, audio-device-missing, audio-crackling, audio-low-volume, sound-after-update, headphones-not-detected, app-sound-only-not-working |
| 3 | 9 | game-crash, game-black-screen-restart, game-freeze, game-launch-fail, game-not-responding, game-alt-tab-crash, game-dx12-crash, game-only-pc-restart, game-only-shutdown |
| 4 | 7 | gpu-high-temp, cpu-overheating, computer-overheating, laptop-overheating, fan-loud, fan-always-on, laptop-shuts-down-hot |
| 5 | 6 | external-drive-disconnects, usb-not-recognized, usb-disconnect-reconnect, usb-port-not-working, usb-device-code43, usb-hub-issues |
| 6 | 6 | drive-read-only, disk-smart-error, corrupted-files, chkdsk-loop, nvme-disappears-under-load, disk-freeze-system |
| 7 | 6 | internet-not-working, network-after-windows-update, vpn-breaks-internet, proxy-internet-not-working, limited-connectivity, ip-address-conflict |
| 8 | 6 | printer-not-found, printer-offline, print-queue-stuck, print-spooler-not-running, printer-driver-error, printer-wifi-not-working |
| 9 | 5 | computer-boot-failure, stuck-manufacturer-logo, automatic-repair-loop, preparing-automatic-repair-stuck, windows-boot-loop |
| 10 | 5 | boot-slow, windows-slow-after-update, high-cpu-windows-update, computer-slow, startup-slow |
| 11 | 5 | pc-on-no-display, monitor-no-signal, monitor-black-screen, hdmi-not-working, displayport-not-working |
| 12 | 5 | screen-flickering, screen-tearing, wrong-resolution, refresh-rate-not-available, game-fullscreen-flicker |
| 13 | 5 | game-stutter, fps-drop, low-fps, game-out-of-video-memory, game-shader-stutter |
| 14 | 5 | webcam-usb-not-detected, webcam-not-working, camera-privacy-blocked, camera-black-screen, camera-used-by-another-app |
| 15 | 5 | laptop-not-charging, plugged-in-not-charging, battery-drains-while-plugged, battery-percentage-stuck, battery-not-detected |
| 16 | 4 | file-explorer-not-opening, file-explorer-not-responding, taskbar-start-menu-frozen, windows-settings-not-opening |
| 17 | 4 | microsoft-store-not-opening, app-not-opening, app-install-uninstall-fail, dll-missing-error |
| 18 | 4 | ssd-not-detected-windows, hdd-not-detected, external-drive-not-recognized, drive-letter-missing |
| 19 | 4 | ram-not-detected, ram-capacity-half, xmp-expo-unstable, memory-errors-random-crash |
| 20 | 3 | no-bootable-device, operating-system-not-found, boot-black-screen-blinking-cursor |
| 21 | 3 | black-screen-after-update, black-screen-after-gpu-driver-update, game-after-driver-update-crash |
| 22 | 3 | display-artifacts, gpu-driver-crash-timeout, gpu-fans-100-black-screen |
| 23 | 3 | windows-login-fail, pin-not-available, user-profile-corrupt |
| 24 | 3 | high-cpu-usage, cpu-100-percent, cpu-clock-low-throttling |
| 25 | 3 | disk-100-percent, file-copy-slow, ssd-slow-performance |
| 26 | 3 | wifi-no-internet, wifi-cant-connect, wifi-disconnect |
| 27 | 3 | wifi-not-showing, network-adapter-missing, bluetooth-missing |
| 28 | 3 | dns-not-resolving, specific-websites-not-opening, browser-internet-slow |
| 29 | 3 | bluetooth-cant-pair, bluetooth-disconnect, bluetooth-mouse-lag |
| 30 | 3 | keyboard-not-working, keyboard-some-keys-not-working, keyboard-double-typing |
| 31 | 3 | mouse-not-working, mouse-lag, mouse-double-click |
| 32 | 2 | desktop-no-power, power-button-no-response |
| 33 | 2 | computer-shutdown, computer-random-restart |
| 34 | 2 | pc-turns-on-then-off, pc-power-cycles-loop |
| 35 | 2 | pc-beeps-on-startup, motherboard-debug-led |
| 36 | 2 | inaccessible-boot-device-bsod, windows-update-rollback-loop |
| 37 | 2 | windows-black-screen-cursor, black-screen-after-login |
| 38 | 2 | monitor-wakes-no-display, sleep-wake-problem |
| 39 | 2 | game-controller-not-detected, controller-not-detected-windows |
| 40 | 2 | game-high-ping, game-packet-loss |
| 41 | 2 | windows-update-fail, windows-update-stuck |
| 42 | 2 | high-ram-usage, memory-leak |
| 43 | 2 | c-drive-full, temp-files-growing |
| 44 | 2 | ethernet-not-working, ethernet-unidentified-network |
| 45 | 2 | high-ping, packet-loss |
| 46 | 2 | sd-card-not-recognized, sd-card-write-protected |
| 47 | 2 | microphone-not-working, mic-too-quiet |
| 48 | 2 | slow-printing, printing-from-app-fails |
| 49 | 2 | battery-drains-fast, laptop-slow-on-battery |

## 편집 결정

- 대표 10개 문서·4개 언어에 독립적인 비교 진단·결과 해석·중단·기록 기준 추가.
- 기존 증상별 첫 진단은 보존. 정확히 다른 증상을 찾은 사용자의 진입 경로를 일괄 삭제하지 않음.
- 통합 전에는 제목의 검색 의도와 첫 분기까지 사람이 비교해야 한다. 동일 의도가 확인된 문서만 리다이렉트와 내부 링크를 함께 수정한다.
- 대표 글의 실제 고장 재현, 화면 증거, 외국어 원어민 감수와 전체 통합 판단은 아직 미완료.
