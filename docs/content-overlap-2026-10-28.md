# PC FIX 절차 중복 점검 — 2026-10-28

증상 216개 중 첫 진단을 제외한 추가 절차의 실행 문장과 순서가 같은 그룹 48개, 해당 문서 147개.

전체 본문의 중복 판정이 아니다. 첫 진단·제목·증상·출처·FAQ가 다를 수 있다. 자동 삭제·리다이렉트·noindex 대상 목록으로 사용하지 않는다.

| 그룹 | 문서 수 | URL slug |
| --- | --- | --- |
| 1 | 10 | video-tdr-failure, windows-blue-screen, bsod-memory-management, bsod-irql-not-less-or-equal, bsod-page-fault, bsod-whea-uncorrectable, bsod-dpc-watchdog, bsod-critical-process-died, bsod-driver-power-state, bsod-system-service-exception |
| 2 | 7 | gpu-high-temp, cpu-overheating, computer-overheating, laptop-overheating, fan-loud, fan-always-on, laptop-shuts-down-hot |
| 3 | 6 | external-drive-disconnects, usb-not-recognized, usb-disconnect-reconnect, usb-port-not-working, usb-device-code43, usb-hub-issues |
| 4 | 6 | drive-read-only, disk-smart-error, corrupted-files, chkdsk-loop, nvme-disappears-under-load, disk-freeze-system |
| 5 | 6 | internet-not-working, network-after-windows-update, vpn-breaks-internet, proxy-internet-not-working, limited-connectivity, ip-address-conflict |
| 6 | 5 | screen-flickering, screen-tearing, wrong-resolution, refresh-rate-not-available, game-fullscreen-flicker |
| 7 | 5 | game-stutter, fps-drop, low-fps, game-out-of-video-memory, game-shader-stutter |
| 8 | 4 | computer-boot-failure, automatic-repair-loop, preparing-automatic-repair-stuck, windows-boot-loop |
| 9 | 4 | pc-on-no-display, monitor-no-signal, hdmi-not-working, displayport-not-working |
| 10 | 4 | file-explorer-not-opening, file-explorer-not-responding, taskbar-start-menu-frozen, windows-settings-not-opening |
| 11 | 4 | microsoft-store-not-opening, app-not-opening, app-install-uninstall-fail, dll-missing-error |
| 12 | 4 | ram-not-detected, ram-capacity-half, xmp-expo-unstable, memory-errors-random-crash |
| 13 | 3 | no-bootable-device, operating-system-not-found, boot-black-screen-blinking-cursor |
| 14 | 3 | boot-slow, windows-slow-after-update, computer-slow |
| 15 | 3 | black-screen-after-update, black-screen-after-gpu-driver-update, game-after-driver-update-crash |
| 16 | 3 | display-artifacts, gpu-driver-crash-timeout, gpu-fans-100-black-screen |
| 17 | 3 | windows-login-fail, pin-not-available, user-profile-corrupt |
| 18 | 3 | disk-100-percent, file-copy-slow, ssd-slow-performance |
| 19 | 3 | ssd-not-detected-windows, hdd-not-detected, external-drive-not-recognized |
| 20 | 3 | wifi-not-showing, network-adapter-missing, bluetooth-missing |
| 21 | 3 | dns-not-resolving, specific-websites-not-opening, browser-internet-slow |
| 22 | 3 | bluetooth-cant-pair, bluetooth-disconnect, bluetooth-mouse-lag |
| 23 | 2 | desktop-no-power, power-button-no-response |
| 24 | 2 | computer-shutdown, computer-random-restart |
| 25 | 2 | pc-turns-on-then-off, pc-power-cycles-loop |
| 26 | 2 | pc-beeps-on-startup, motherboard-debug-led |
| 27 | 2 | inaccessible-boot-device-bsod, windows-update-rollback-loop |
| 28 | 2 | windows-black-screen-cursor, black-screen-after-login |
| 29 | 2 | monitor-wakes-no-display, sleep-wake-problem |
| 30 | 2 | game-crash, game-freeze |
| 31 | 2 | game-launch-fail, game-not-responding |
| 32 | 2 | game-audio-cut, no-sound |
| 33 | 2 | game-high-ping, game-packet-loss |
| 34 | 2 | windows-update-fail, windows-update-stuck |
| 35 | 2 | high-cpu-usage, cpu-clock-low-throttling |
| 36 | 2 | high-ram-usage, memory-leak |
| 37 | 2 | c-drive-full, temp-files-growing |
| 38 | 2 | wifi-cant-connect, wifi-disconnect |
| 39 | 2 | ethernet-not-working, ethernet-unidentified-network |
| 40 | 2 | high-ping, packet-loss |
| 41 | 2 | keyboard-not-working, keyboard-some-keys-not-working |
| 42 | 2 | mouse-not-working, mouse-lag |
| 43 | 2 | sd-card-not-recognized, sd-card-write-protected |
| 44 | 2 | webcam-not-working, camera-black-screen |
| 45 | 2 | printer-not-found, printer-wifi-not-working |
| 46 | 2 | slow-printing, printing-from-app-fails |
| 47 | 2 | laptop-not-charging, battery-drains-while-plugged |
| 48 | 2 | battery-drains-fast, laptop-slow-on-battery |

## 편집 결정

- 대표 10개 문서·4개 언어에 독립적인 비교 진단·결과 해석·중단·기록 기준 추가.
- 기존 증상별 첫 진단은 보존. 정확히 다른 증상을 찾은 사용자의 진입 경로를 일괄 삭제하지 않음.
- 통합 전에는 제목의 검색 의도와 첫 분기까지 사람이 비교해야 한다. 동일 의도가 확인된 문서만 리다이렉트와 내부 링크를 함께 수정한다.
- 실제 고장 재현과 외국어 원어민 감수는 미완료. 아래 후속 검토에서 49개 그룹의 통합 판단을 기록했다.

## 182개 글 차별화 검토

검토 기준은 수정 전 49개 그룹의 182개 글이다. 35개는 증상에 맞게 기존 단계의 순서·대상을 수정했고, 83개는 첫 진단과 적용 조건을 유지하며 공통 절차를 공유한다. 0개는 아직 전용 후속 설명 검토 대상으로 남아 있다. 전용 설명 보강 완료 63개, 대표 글 통합 1개를 별도로 기록했다. 단계 재배열과 동일 순서 감소는 독창성이나 AdSense 승인 증명이 아니다.

CPU 100% 중복 글 한 개를 통합하고 네 언어의 기존 주소에 영구 리디렉션을 설정했다. 아래 링크는 운영 사이트 주소다. 배포 상태는 별도 검증 기록을 따른다. 실물 재현 자료와 원어민 감수는 이 편집 검토에 포함되지 않는다.

### 공통 문구 수정

- CPU·GPU 온도 점검 결과 문구를 온도·클럭·팬 결과로 수정
- 수리 의뢰의 POST 전용 진입 안내를 서비스 접수 안내로 수정
- 위험 신호가 있는 기기에서 백업을 위해 재가동하지 않도록 공통 수리 의뢰 문구 수정

### 그룹별 편집 판단

| 그룹 | 판단 | 구분 기준과 남은 작업 |
| --- | --- | --- |
| 1 | 조건부 유지 | 유지. 중지 코드마다 첫 진단은 다르다. 일반 블루스크린은 공통 복구가 타당하나 TDR·WHEA·메모리·전원 전환 코드는 관련 오류 코드 문서의 전용 절차를 먼저 안내할 여지가 있다. |
| 2 | 수정 및 보강 | 유지. 게임 프로세스만 종료되는 경우와 PC 전원 자체가 끊기는 경우를 분리한다. 실행 실패·Alt+Tab·DX12에는 무조건적인 부품 진단을 덜고, 전원 종료에는 온도·전원 확인을 우선한다. |
| 3 | 수정 및 보강 | 유지. 앱별 무음·출력 선택·접촉·음질·업데이트 회귀는 진입 조건이 다르다. 앱 무음의 케이블 교체, 작은 음량의 일괄 드라이버 재설치 등 불필요한 후속 단계를 줄인다. Bluetooth 통화 프로필은 별도 상세 설명이 더 필요하다. |
| 4 | 공통 오류 수정 | 유지. 온도 점검의 결과 문구가 CPU·메모리·디스크 점유율로 잘못 연결돼 있다. 온도·클럭·팬 결과로 맞춘다. CPU/GPU 센서 차이는 첫 진단에 있으나 모델별 재현 자료는 없다. |
| 5 | 조건부 유지 | 유지. USB 직접 연결·다른 포트·장치 관리자 비교는 공통으로 타당하다. 외장 저장장치는 데이터 보존과 중단 조건이 먼저이며, 포트·허브·장치 자체의 차이는 첫 진단을 유지한다. |
| 6 | 보강 필요 | 유지. 읽기 전용·SMART·파일 손상·반복 CHKDSK·NVMe 해제는 첫 분기가 다르다. 공통 백업·건강 상태 검사는 유지하되 읽기 전용의 파일시스템 검사는 상태를 확인한 경우에만 안내해야 한다. |
| 7 | 보강 필요 | 유지. VPN·프록시·IP 충돌·업데이트 회귀를 회선 전체 장애와 분리해야 한다. 공유기 재시작·IP 초기화·드라이버 재설치를 모든 증상에 같은 순서로 제시하지 않도록 전용 후속 단계가 필요하다. |
| 8 | 수정 및 보강 | 유지. 프린터 검색·무선 연결에는 연결 경로를, 대기열 정체에는 본인 작업 취소를, 드라이버 오류에는 지원 패키지를 먼저 둔다. 오프라인의 포트 IP와 스풀러 재중단은 추가 전용 설명 대상이다. |
| 9 | 수정 및 보강 | 유지. 제조사 로고에서 POST가 멈추면 Windows 복구 화면 전제가 성립하지 않는다. 외장 장치·BIOS·하드웨어 진단으로 좁힌다. 자동 복구 반복의 복구 환경별 다음 행동은 추가 보강 대상이다. |
| 10 | 수정 및 보강 | 유지. 로그인 후 느림에는 시작 앱을 우선한다. 업데이트 진행 중 부하에는 시작 앱 변경을 빼고 완료·실패 상태부터 본다. 부팅 전 지연과 로그인 후 지연은 첫 진단으로 구분한다. |
| 11 | 수정 | 유지. 모니터 자체 메뉴까지 안 보이는 경우 PC RAM 탈착을 기본 조치로 제시하지 않는다. 모니터 전원·입력·케이블·다른 화면 비교와 점검 요청만 유지한다. |
| 12 | 보강 필요 | 유지. 화면 찢어짐은 동기화·VRR, 주사율 미노출은 지원 모드·대역폭, 깜빡임은 앱·드라이버·케이블 분기가 핵심이다. 단순 단계 재배열만으로 해결하지 않고 전용 설정 비교 문서가 필요하다. |
| 13 | 보강 필요 | 유지. FPS 저하·프레임 시간 튐·VRAM 부족·셰이더 첫 실행 끊김은 측정값이 다르다. 첫 분기는 적절하나 후속 절차는 같은 성능 프리셋이라 측정 예시·실패 조건이 더 필요하다. |
| 14 | 수정 | 유지. USB 미인식은 연결·드라이버 확인, 권한 차단은 허용 범위 확인, 점유 오류는 다른 앱 종료부터 시작한다. 권한 차단에 USB 교체·드라이버 재설치를 나열하지 않는다. |
| 15 | 수정 | 유지. 충전 제한에 걸린 상태는 정상일 수 있으므로 충전 한도 확인을 먼저 둔다. 잔량 고정·배터리 미인식은 배터리 진단과 제조사 지원을 우선하며 무조건 하드 리셋하지 않는다. |
| 16 | 조건부 유지 | 유지. 탐색기·작업 표시줄·설정 앱은 공통 Windows 구성요소 점검을 공유할 수 있다. 특정 폴더만 멈춤·한 계정만 실패라는 첫 분기를 유지하며 모든 경우 탐색기 재시작이 해결이라고 단정하지 않는다. |
| 17 | 보강 필요 | 유지. Store 캐시·일반 앱 복구·Installer 실패·누락 런타임은 전용 작업이 다르다. 오류 코드별 문서를 연결하고 일반 SFC·디스크 검사만으로 끝내지 않는 후속 집필이 필요하다. |
| 18 | 수정 | 유지. 드라이브 문자만 없고 기존 정상 볼륨이 보이면 케이블 탈착·드라이버 재설치를 기본 순서에서 제외한다. 디스크 관리와 기존 데이터 보존을 남긴다. |
| 19 | 조건부 유지 | 유지. 미인식은 BIOS 인식·슬롯, 용량 절반은 예약·OS 제한, XMP 불안정은 기본값 비교가 핵심이다. 첫 분기는 구분돼 있으며 모듈별 교차 검사 자체는 공통으로 유지할 수 있다. |
| 20 | 조건부 유지 | 유지. 세 메시지 모두 부팅 드라이브 인식·부팅 항목 확인이 공통이다. 증상명이 비슷하다는 이유만으로 페이지를 삭제하지 않는다. 복구 키·데이터 보존·원래 부팅 모드 조건을 유지한다. |
| 21 | 보강 필요 | 유지. Windows 업데이트와 GPU 드라이버 회귀의 롤백 위치가 다르다. 두 후속 절차가 변경 날짜 확인을 반복하므로 정상/안전 모드/복구 환경별 설명을 분리하는 편집이 필요하다. |
| 22 | 조건부 유지 | 유지. 화면 깨짐·TDR 복구·팬 급증은 첫 분기와 위험 신호가 다르지만 기본 클럭·지원 드라이버 비교는 공통이다. 재설치 두 단계는 증거가 있을 때만 진행하도록 조건을 유지한다. |
| 23 | 보강 필요 | 유지. PIN 실패·계정 암호 실패·프로필 손상은 다른 문제다. 공통 재시작을 늘리는 대신 본인 계정 복구·PIN 재설정·원래 파일 보존 경로를 각각 자세히 설명할 필요가 있다. |
| 24 | 조건부 유지 | cpu-100-percent를 high-cpu-usage로 통합. 두 글 모두 지속적인 CPU 100%와 같은 프로세스·인터럽트 분기이며 검색어는 대표 글에 보존한다. 클럭 제한 글은 유지한다. |
| 25 | 조건부 유지 | 유지. 디스크 포화·복사 속도·SSD 성능의 측정 조건은 다르다. 상태·온도·연결 검사는 공통이며 큰 파일/작은 파일과 활성 시간/전송률 차이를 첫 진단에서 유지한다. |
| 26 | 수정 | 유지. Wi-Fi에 이미 연결된 인터넷 불가는 비밀번호 프로필 삭제부터 시작하지 않는다. 다른 기기·회선 비교를 먼저 두고 저장 네트워크 삭제는 연결 인증 실패 글에 유지한다. |
| 27 | 보강 필요 | 유지. Wi-Fi 메뉴 없음·네트워크 어댑터 없음·Bluetooth 없음의 장치 관리자 방법은 공통이다. 현재 두 후속 절차가 상태·드라이버 확인을 반복해 모델별 무선 구성 차이를 더 설명할 필요가 있다. |
| 28 | 조건부 유지 | 유지. DNS 조회 실패·한 사이트 장애·브라우저 지연의 첫 비교 조건은 다르다. 공용 DNS 교체는 사내망 제한을 유지하며 브라우저별 비교를 생략하지 않는다. |
| 29 | 조건부 유지 | 유지. 페어링·끊김·마우스 지연은 연결 기록·거리·배터리·절전 조건을 각각 비교한다. 기본 Bluetooth 조치 공유는 타당하며 원인 확인 없이 전체 장치 기록을 지우지 않는 조건을 유지한다. |
| 30 | 수정 | 유지. 짧은 키 입력의 중복은 다른 키보드·반복 설정·물리 키 점검을 먼저 한다. 이미 입력되는 키보드의 일괄 HID 재설치는 기본 순서에서 제외한다. |
| 31 | 수정 | 유지. 한 번 클릭이 두 번 들어오는 문제는 다른 마우스와 스위치·더블클릭 설정 비교로 좁힌다. 센서 표면·무선 연결·HID 재설치를 같은 비중으로 나열하지 않는다. |
| 32 | 조건부 유지 | 유지. 완전 무전원과 대기 전원은 있는데 버튼만 무반응인 상태가 다르다. 전원 공급 확인은 공유할 수 있지만 프런트 패널의 모델별 확인 경로를 추후 보강할 수 있다. |
| 33 | 조건부 유지 | 유지. 꺼짐과 자동 재시작은 전원 단절·중지 코드의 기록으로 분리한다. 온도·전원·튜닝 점검의 공유는 타당하며 Kernel-Power만으로 파워 고장을 확정하지 않는다. |
| 34 | 조건부 유지 | 유지. 즉시 종료와 반복 트레이닝은 관찰 시간·진단등·최근 메모리 변경으로 구분한다. 전원 차단 후 장착 확인을 공유하되 정상 트레이닝 대기를 유지한다. |
| 35 | 조건부 유지 | 유지. 비프음과 진단 LED는 제조사 모델별 코드 해석이라는 공통 절차가 타당하다. 특정 제조사의 표를 다른 보드에 적용하지 않는 조건이 차별화의 핵심이다. |
| 36 | 보강 필요 | 유지. 부팅 장치 접근 불가는 저장장치 모드·인식, 업데이트 롤백은 KB·복구 환경이 핵심이다. 공통 복구 두 단계를 환경별 다음 행동으로 다시 나눌 필요가 있다. |
| 37 | 보강 필요 | 유지. 커서만 보임과 로그인 뒤 검은 화면은 탐색기·프로필·시작 앱으로 겹친다. 첫 두 절차가 탐색기 실행을 반복하므로 셸 복구와 계정별 비교로 내용을 나누는 것이 적절하다. |
| 38 | 조건부 유지 | 유지. 화면만 복귀하지 않는 상태와 PC 전체가 복귀하지 않는 상태를 첫 분기에서 구분한다. 지원 드라이버·외장 장치 비교는 공통으로 유지한다. |
| 39 | 수정 | 유지. Windows 컨트롤러 자체가 없는 상태에서는 Steam Input보다 USB·Bluetooth·공식 드라이버·다른 호스트 비교가 우선이다. 게임에서만 안 되는 글은 게임 입력 설정을 유지한다. |
| 40 | 조건부 유지 | 유지. 지연과 손실은 수치가 다르지만 유선 비교·백그라운드 전송·서버 경로 확인은 공통이다. 중간 홉 무응답을 실제 게임 손실로 단정하지 않는 기준을 유지한다. |
| 41 | 보강 필요 | 유지. 실패 코드가 나온 상태와 설치가 진행 중인 정체는 재시작 가능 조건이 다르다. 진행 중 전원 유지와 완료 후 실패 KB 점검을 후속 절차에서도 분리해야 한다. |
| 42 | 보강 필요 | 유지. 높은 사용량과 지속 증가 누수는 종료 후 반환·커밋·비페이징 풀 차이가 핵심이다. 현재 두 절차가 같은 측정을 반복하므로 정상 캐시와 증가 추세 예시를 보강한다. |
| 43 | 보강 필요 | 유지. 공간 부족은 정리 대상 선정, 임시 파일 증가는 생성 앱·덤프 원인 확인이 핵심이다. 공통 정리 절차만으로 원인이 해결됐다고 보이지 않도록 별도 사례가 필요하다. |
| 44 | 조건부 유지 | 유지. 케이블 미연결과 링크는 있으나 DHCP/게이트웨이가 없는 상태는 첫 분기가 다르다. 물리 링크와 IP 확인은 공유하되 고정 IP를 임의 초기화하지 않는 제한을 유지한다. |
| 45 | 보강 필요 | 유지. ping 지연과 패킷 손실은 같은 측정 명령을 사용해도 결과 해석이 다르다. 현재 두 후속 절차의 측정 중복을 줄이고 지연 변동·최종 목적지 손실 예시를 추가할 필요가 있다. |
| 46 | 조건부 유지 | 유지. SD 카드 미인식과 쓰기 금지는 리더기·잠금 탭·기존 파일 보호를 공유할 수 있다. RAW·0GB 상태와 잠금 탭 문제를 첫 분기에서 구분한다. |
| 47 | 수정 | 유지. 마이크 입력이 이미 있으나 작을 때는 입력 장치·레벨·거리·다른 기기 비교에 집중한다. 신호 없음에 필요한 개인정보 권한·드라이버 재설치를 기본 순서에서 제외한다. |
| 48 | 보강 필요 | 유지. 느린 인쇄는 문서 크기·첫 장 지연, 특정 앱 실패는 다른 앱·PDF 출력 비교가 핵심이다. 현재 두 절차의 자체 테스트 반복을 각 증상의 결과 해석으로 나눌 필요가 있다. |
| 49 | 보강 필요 | 유지. 배터리 소모와 배터리 모드 성능 제한은 사용 시간과 클럭이라는 다른 결과를 본다. 공통 배터리 보고서 외에 정상 전력 제한과 열화의 비교 예시가 더 필요하다. |

### 글별 판단

| 그룹 | 글 | 처리 | 변경 또는 진단 초점 |
| --- | --- | --- | --- |
| 1 | [VIDEO_TDR_FAILURE 블루스크린 문제](https://pcfixbase.com/problems/video-tdr-failure) | 공통 절차 유지 | 블루스크린의 그래픽 드라이버 파일명과 최근 GPU 드라이버 변경을 기록하세요. |
| 1 | [Windows 블루스크린이 계속 발생하는 문제](https://pcfixbase.com/problems/windows-blue-screen) | 공통 절차 유지 | 중지 코드와 오류 파일명, 같은 코드가 반복되는지부터 기록하세요. |
| 1 | [MEMORY_MANAGEMENT 블루스크린 문제](https://pcfixbase.com/problems/bsod-memory-management) | 공통 절차 유지 | 최근 RAM 증설·XMP·EXPO 변경 여부와 기본 설정에서의 메모리 검사 결과를 확인하세요. |
| 1 | [IRQL_NOT_LESS_OR_EQUAL 블루스크린 문제](https://pcfixbase.com/problems/bsod-irql-not-less-or-equal) | 공통 절차 유지 | 블루스크린의 드라이버 이름과 최근 네트워크·보안·장치 드라이버 변경을 확인하세요. |
| 1 | [PAGE_FAULT_IN_NONPAGED_AREA 블루스크린 문제](https://pcfixbase.com/problems/bsod-page-fault) | 공통 절차 유지 | 새 RAM·백신·스토리지 드라이버 설치와 오류 파일명을 기록하세요. |
| 1 | [WHEA_UNCORRECTABLE_ERROR 블루스크린 문제](https://pcfixbase.com/problems/bsod-whea-uncorrectable) | 공통 절차 유지 | WHEA-Logger의 구성요소와 CPU 언더볼트·오버클럭 적용 여부를 기록하세요. |
| 1 | [DPC_WATCHDOG_VIOLATION 블루스크린 문제](https://pcfixbase.com/problems/bsod-dpc-watchdog) | 공통 절차 유지 | 발생 직전 디스크 복사·영상·네트워크 작업과 사용 장치 모델을 기록하세요. |
| 1 | [CRITICAL_PROCESS_DIED 블루스크린 문제](https://pcfixbase.com/problems/bsod-critical-process-died) | 공통 절차 유지 | 안전 모드 진입 가능 여부와 디스크 오류 이벤트를 확인하세요. |
| 1 | [DRIVER_POWER_STATE_FAILURE 블루스크린 문제](https://pcfixbase.com/problems/bsod-driver-power-state) | 공통 절차 유지 | 절전 진입·복귀·종료 중 어느 단계인지와 연결된 USB·네트워크 장치를 기록하세요. |
| 1 | [SYSTEM_SERVICE_EXCEPTION 블루스크린 문제](https://pcfixbase.com/problems/bsod-system-service-exception) | 공통 절차 유지 | 오류 화면의 .sys 파일명과 최근 그래픽·보안 프로그램 변경을 확인하세요. |
| 2 | [게임이 갑자기 튕기거나 종료되는 문제](https://pcfixbase.com/problems/game-crash) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 2 | [게임 중 화면이 검게 변하고 컴퓨터가 재부팅되는 문제](https://pcfixbase.com/problems/game-black-screen-restart) | 순서·대상 수정 | 기본 순서에서 제외: 게임 파일 검사 또는 복구하기 |
| 2 | [게임 화면이 멈추고 프리징되는 문제](https://pcfixbase.com/problems/game-freeze) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 2 | [게임이 실행되지 않거나 시작 직후 종료되는 문제](https://pcfixbase.com/problems/game-launch-fail) | 순서·대상 수정 | 기본 순서에서 제외: 온도와 전원 상태 확인하기 · 메모리와 저장장치 진단하기 |
| 2 | [게임이 응답 없음 상태로 멈추는 문제](https://pcfixbase.com/problems/game-not-responding) | 순서·대상 수정 | 기본 순서에서 제외: 온도와 전원 상태 확인하기 · 메모리와 저장장치 진단하기 |
| 2 | [Alt+Tab 전환 후 게임이 튕기거나 검은 화면이 되는 문제](https://pcfixbase.com/problems/game-alt-tab-crash) | 순서·대상 수정 | 기본 순서에서 제외: 온도와 전원 상태 확인하기 · 메모리와 저장장치 진단하기 |
| 2 | [DirectX 12 모드에서 게임이 자주 튕기는 문제](https://pcfixbase.com/problems/game-dx12-crash) | 순서·대상 수정 | 기본 순서에서 제외: 온도와 전원 상태 확인하기 · 메모리와 저장장치 진단하기 |
| 2 | [게임을 할 때만 컴퓨터가 재부팅되는 문제](https://pcfixbase.com/problems/game-only-pc-restart) | 순서·대상 수정 | 기본 순서에서 제외: 게임 파일 검사 또는 복구하기 |
| 2 | [게임을 할 때만 컴퓨터 전원이 꺼지는 문제](https://pcfixbase.com/problems/game-only-shutdown) | 순서·대상 수정 | 기본 순서에서 제외: 게임을 재시작하고 오류 메시지 기록하기 · 게임 파일 검사 또는 복구하기 · 게임과 그래픽 드라이버 업데이트 확인하기 |
| 3 | [게임 중 소리가 끊기거나 사라지는 문제](https://pcfixbase.com/problems/game-audio-cut) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 3 | [Bluetooth 이어폰이 연결됐는데 소리가 나지 않는 문제](https://pcfixbase.com/problems/bluetooth-connected-no-sound) | 순서·대상 수정 | 기본 순서에서 제외: 오디오 향상 기능과 기본 형식을 바꿔 비교하기 |
| 3 | [Bluetooth 헤드셋 음질이 갑자기 나빠지는 문제](https://pcfixbase.com/problems/bluetooth-audio-low-quality) | 순서·대상 수정 | 기본 순서에서 제외: 음소거와 올바른 출력 장치 확인하기 · Windows 오디오 문제 해결 실행하기 |
| 3 | [스피커나 헤드폰에서 소리가 전혀 나지 않는 문제](https://pcfixbase.com/problems/no-sound) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 3 | [소리가 지직거리거나 깨지는 문제](https://pcfixbase.com/problems/audio-crackling) | 순서·대상 수정 | 기본 순서에서 제외: 음소거와 올바른 출력 장치 확인하기 |
| 3 | [볼륨을 최대로 해도 소리가 너무 작은 문제](https://pcfixbase.com/problems/audio-low-volume) | 순서·대상 수정 | 기본 순서에서 제외: 케이블·잭·Bluetooth 연결 확인하기 · Windows 오디오 문제 해결 실행하기 · 오디오 드라이버 업데이트 또는 재설치하기 |
| 3 | [Windows 업데이트 후 소리가 나지 않는 문제](https://pcfixbase.com/problems/sound-after-update) | 순서·대상 수정 | 기본 순서에서 제외: 케이블·잭·Bluetooth 연결 확인하기 · 오디오 향상 기능과 기본 형식을 바꿔 비교하기 · 다른 헤드폰·스피커로 교차 테스트하기 |
| 3 | [유선 헤드폰이나 이어폰이 인식되지 않는 문제](https://pcfixbase.com/problems/headphones-not-detected) | 순서·대상 수정 | 기본 순서에서 제외: Windows 오디오 문제 해결 실행하기 · 오디오 향상 기능과 기본 형식을 바꿔 비교하기 |
| 3 | [시스템 소리는 나는데 특정 앱에서만 소리가 안 나는 문제](https://pcfixbase.com/problems/app-sound-only-not-working) | 순서·대상 수정 | 기본 순서에서 제외: 케이블·잭·Bluetooth 연결 확인하기 · 다른 헤드폰·스피커로 교차 테스트하기 |
| 4 | [그래픽카드 온도가 너무 높은 문제](https://pcfixbase.com/problems/gpu-high-temp) | 공통 절차 유지 | 모델별 GPU 코어·핫스폿·메모리 온도 중 어떤 센서가 높은지와 부하를 확인하세요. |
| 4 | [CPU 온도가 너무 높은 문제](https://pcfixbase.com/problems/cpu-overheating) | 공통 절차 유지 | CPU 모델별 온도 한계와 유휴·부하 온도, 팬·펌프 회전을 확인하세요. |
| 4 | [컴퓨터 온도가 지나치게 높아지는 문제](https://pcfixbase.com/problems/computer-overheating) | 공통 절차 유지 | CPU·GPU·저장장치 중 높은 센서와 부하·팬 상태를 각각 확인하세요. |
| 4 | [노트북이 너무 뜨거워지는 문제](https://pcfixbase.com/problems/laptop-overheating) | 공통 절차 유지 | 단단한 평면에서 통풍구를 막지 않은 상태와 침구 위 사용 상태의 차이를 확인하세요. |
| 4 | [컴퓨터 팬 소리가 갑자기 매우 커지는 문제](https://pcfixbase.com/problems/fan-loud) | 공통 절차 유지 | 부하 증가에 따른 바람 소리인지 긁힘·진동인지와 CPU·GPU 사용률을 확인하세요. |
| 4 | [팬이 아무 작업을 안 해도 계속 빠르게 도는 문제](https://pcfixbase.com/problems/fan-always-on) | 공통 절차 유지 | 유휴 상태의 실제 CPU 사용률·온도와 제조사 냉각 프로필을 확인하세요. |
| 4 | [노트북이 뜨거워진 뒤 갑자기 꺼지는 문제](https://pcfixbase.com/problems/laptop-shuts-down-hot) | 공통 절차 유지 | 종료 전 CPU·GPU 온도와 팬 바람, 식은 뒤에만 켜지는지 기록하세요. |
| 5 | [외장하드가 사용 중 계속 연결 해제되는 문제](https://pcfixbase.com/problems/external-drive-disconnects) | 공통 절차 유지 | 허브 없이 본체 포트에 연결하고 끊김이 케이블 움직임·대용량 복사와 연결되는지 보세요. |
| 5 | [USB 장치가 인식되지 않는 문제](https://pcfixbase.com/problems/usb-not-recognized) | 공통 절차 유지 | 허브 없이 본체 포트에 직결하고 장치 관리자(Windows 키+R → devmgmt.msc 입력 → Enter)에 새 항목이나 오류가 생기는지 확인하세요. |
| 5 | [USB 장치가 계속 연결됐다 끊기는 문제](https://pcfixbase.com/problems/usb-disconnect-reconnect) | 공통 절차 유지 | 연결음이 반복될 때 특정 케이블·포트·절전 복귀·파일 복사와 관계가 있는지 보세요. |
| 5 | [특정 USB 포트만 작동하지 않는 문제](https://pcfixbase.com/problems/usb-port-not-working) | 공통 절차 유지 | 같은 장치를 정상 포트와 문제 포트에 비교하고 전면·후면 포트를 구분하세요. |
| 5 | [장치 관리자에서 USB Code 43 오류가 뜨는 문제](https://pcfixbase.com/problems/usb-device-code43) | 공통 절차 유지 | 오류 항목이 USB 컨트롤러인지 연결한 주변기기인지 정확한 이름을 확인하세요. |
| 5 | [USB 허브에 연결한 장치가 불안정한 문제](https://pcfixbase.com/problems/usb-hub-issues) | 공통 절차 유지 | 허브 없이 단독 연결했을 때와 여러 장치를 함께 쓸 때를 비교하세요. |
| 6 | [USB나 디스크가 읽기 전용으로 되어 저장이 안 되는 문제](https://pcfixbase.com/problems/drive-read-only) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 6 | [디스크 S.M.A.R.T. 오류나 경고가 뜨는 문제](https://pcfixbase.com/problems/disk-smart-error) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 6 | [파일이 손상되어 열리지 않거나 오류가 나는 문제](https://pcfixbase.com/problems/corrupted-files) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 6 | [부팅 때마다 디스크 검사 CHKDSK가 반복되는 문제](https://pcfixbase.com/problems/chkdsk-loop) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 6 | [NVMe SSD가 부하 중 사라지거나 재부팅 후만 다시 보이는 문제](https://pcfixbase.com/problems/nvme-disappears-under-load) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 6 | [디스크 사용률이 치솟으면서 컴퓨터 전체가 멈추는 문제](https://pcfixbase.com/problems/disk-freeze-system) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 7 | [컴퓨터 인터넷 연결이 갑자기 안 되는 문제](https://pcfixbase.com/problems/internet-not-working) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 7 | [Windows 업데이트 후 인터넷이 안 되는 문제](https://pcfixbase.com/problems/network-after-windows-update) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 7 | [VPN을 켜거나 끈 뒤 인터넷이 안 되는 문제](https://pcfixbase.com/problems/vpn-breaks-internet) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 7 | [프록시 설정 때문에 인터넷 접속이 안 되는 문제](https://pcfixbase.com/problems/proxy-internet-not-working) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 7 | [네트워크에 연결되지만 제한됨 또는 인터넷 없음으로 표시되는 문제](https://pcfixbase.com/problems/limited-connectivity) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 7 | [IP 주소 충돌 메시지가 뜨거나 인터넷이 불안정한 문제](https://pcfixbase.com/problems/ip-address-conflict) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 8 | [Windows에서 프린터를 찾거나 추가할 수 없는 문제](https://pcfixbase.com/problems/printer-not-found) | 순서·대상 수정 | 기본 순서에서 제외: 인쇄 대기열 지우기 · 다른 앱에서 테스트하기 |
| 8 | [프린터가 오프라인으로 표시되어 인쇄되지 않는 문제](https://pcfixbase.com/problems/printer-offline) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 8 | [인쇄 작업이 대기열에 걸려 삭제되지 않는 문제](https://pcfixbase.com/problems/print-queue-stuck) | 순서·대상 수정 | 기본 순서에서 제외: USB 또는 네트워크 연결 확인하기 · 프린터를 제거 후 다시 추가하기 |
| 8 | [Print Spooler 서비스 오류로 인쇄가 안 되는 문제](https://pcfixbase.com/problems/print-spooler-not-running) | 순서·대상 수정 | 기본 순서에서 제외: 프린터 전원을 껐다 켜고 상태 확인하기 · USB 또는 네트워크 연결 확인하기 · 다른 앱에서 테스트하기 |
| 8 | [프린터 드라이버 오류나 호환성 문제로 인쇄가 안 되는 문제](https://pcfixbase.com/problems/printer-driver-error) | 순서·대상 수정 | 기본 순서에서 제외: 프린터 전원을 껐다 켜고 상태 확인하기 · USB 또는 네트워크 연결 확인하기 · 인쇄 대기열 지우기 |
| 8 | [무선 프린터가 Wi-Fi에서 검색되지 않는 문제](https://pcfixbase.com/problems/printer-wifi-not-working) | 순서·대상 수정 | 기본 순서에서 제외: 인쇄 대기열 지우기 · 다른 앱에서 테스트하기 |
| 9 | [컴퓨터 전원은 켜지는데 Windows로 부팅되지 않는 문제](https://pcfixbase.com/problems/computer-boot-failure) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 9 | [컴퓨터가 제조사 로고 화면에서 멈추는 문제](https://pcfixbase.com/problems/stuck-manufacturer-logo) | 순서·대상 수정 | 기본 순서에서 제외: Windows 시작 복구 실행하기 · 안전 모드에서 같은 증상 확인하기 · 최근 변경 사항 되돌리기 |
| 9 | [자동 복구 화면이 계속 반복되는 문제](https://pcfixbase.com/problems/automatic-repair-loop) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 9 | [Preparing Automatic Repair 화면에서 멈추는 문제](https://pcfixbase.com/problems/preparing-automatic-repair-stuck) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 9 | [Windows 로고 이후 계속 재부팅되는 문제](https://pcfixbase.com/problems/windows-boot-loop) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 10 | [컴퓨터 부팅이 너무 오래 걸리는 문제](https://pcfixbase.com/problems/boot-slow) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 10 | [Windows 업데이트 후 컴퓨터가 느려진 문제](https://pcfixbase.com/problems/windows-slow-after-update) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 10 | [Windows Update 때문에 CPU 사용률이 계속 높은 문제](https://pcfixbase.com/problems/high-cpu-windows-update) | 순서·대상 수정 | 기본 순서에서 제외: 불필요한 시작 프로그램 줄이기 |
| 10 | [컴퓨터가 갑자기 느려진 문제](https://pcfixbase.com/problems/computer-slow) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 10 | [Windows 로그인 후 사용 가능해지기까지 너무 오래 걸리는 문제](https://pcfixbase.com/problems/startup-slow) | 순서·대상 수정 | 첫 점검: 불필요한 시작 프로그램 줄이기 |
| 11 | [본체는 켜지는데 화면이 전혀 나오지 않는 문제](https://pcfixbase.com/problems/pc-on-no-display) | 공통 절차 유지 | 처음 전원을 켤 때부터 BIOS 화면도 없는지 확인하고 모니터 케이블이 올바른 GPU 출력에 연결됐는지 보세요. |
| 11 | [모니터에 신호 없음(No Signal)이 뜨는 문제](https://pcfixbase.com/problems/monitor-no-signal) | 공통 절차 유지 | 모니터에서 선택한 HDMI·DP 입력과 실제 꽂은 포트가 같은지 확인하세요. |
| 11 | [모니터 전원은 켜져 있지만 화면이 검은 문제](https://pcfixbase.com/problems/monitor-black-screen) | 순서·대상 수정 | 기본 순서에서 제외: 그래픽카드 연결 위치와 POST 진단 확인하기 · RAM·GPU 장착과 보조전원 점검하기 |
| 11 | [HDMI로 연결했는데 화면이 나오지 않는 문제](https://pcfixbase.com/problems/hdmi-not-working) | 공통 절차 유지 | HDMI 케이블을 변환기 없이 직접 연결하고 TV·모니터의 정확한 입력을 선택하세요. |
| 11 | [DisplayPort 연결에서 화면이 나오지 않는 문제](https://pcfixbase.com/problems/displayport-not-working) | 공통 절차 유지 | 모니터의 DP 입력을 선택하고 전원을 껐다 켠 뒤 정상 DP 케이블로 직접 연결하세요. |
| 12 | [화면이 계속 깜빡이거나 번쩍이는 문제](https://pcfixbase.com/problems/screen-flickering) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 12 | [게임이나 영상에서 화면이 찢어져 보이는 문제](https://pcfixbase.com/problems/screen-tearing) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 12 | [원하는 화면 해상도가 선택되지 않는 문제](https://pcfixbase.com/problems/wrong-resolution) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 12 | [모니터 120Hz·144Hz·165Hz가 선택되지 않는 문제](https://pcfixbase.com/problems/refresh-rate-not-available) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 12 | [게임 전체화면에서 화면이 깜빡이는 문제](https://pcfixbase.com/problems/game-fullscreen-flicker) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 13 | [게임이 짧게 끊기고 버벅이는 문제](https://pcfixbase.com/problems/game-stutter) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 13 | [게임 FPS가 갑자기 크게 떨어지는 문제](https://pcfixbase.com/problems/fps-drop) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 13 | [컴퓨터 사양에 비해 게임 FPS가 낮은 문제](https://pcfixbase.com/problems/low-fps) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 13 | [게임에서 Out of Video Memory 오류가 나는 문제](https://pcfixbase.com/problems/game-out-of-video-memory) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 13 | [게임에서 셰이더 컴파일 때문에 끊김이 심한 문제](https://pcfixbase.com/problems/game-shader-stutter) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 14 | [USB 웹캠이 장치로 인식되지 않는 문제](https://pcfixbase.com/problems/webcam-usb-not-detected) | 순서·대상 수정 | 기본 순서에서 제외: 카메라 물리 셔터·기능 키 확인하기 · 카메라 개인정보 권한 확인하기 |
| 14 | [Windows 카메라나 웹캠이 작동하지 않는 문제](https://pcfixbase.com/problems/webcam-not-working) | 공통 절차 유지 | Windows 카메라 앱에서도 실패하는지와 셔터·키보드 카메라 토글을 확인하세요. |
| 14 | [카메라 개인정보 권한 때문에 앱에서 카메라를 못 쓰는 문제](https://pcfixbase.com/problems/camera-privacy-blocked) | 순서·대상 수정 | 기본 순서에서 제외: 카메라 물리 셔터·기능 키 확인하기 · 카메라 드라이버 업데이트 또는 재설치하기 · 외장 카메라는 다른 USB 포트와 다른 PC에서 테스트하기 |
| 14 | [카메라는 인식되지만 영상이 검은 화면인 문제](https://pcfixbase.com/problems/camera-black-screen) | 공통 절차 유지 | 물리 셔터를 열고 밝은 환경에서 Windows 카메라 앱 영상을 확인하세요. |
| 14 | [카메라가 다른 앱에서 사용 중이라는 오류가 나는 문제](https://pcfixbase.com/problems/camera-used-by-another-app) | 순서·대상 수정 | 기본 순서에서 제외: 카메라 물리 셔터·기능 키 확인하기 · 외장 카메라는 다른 USB 포트와 다른 PC에서 테스트하기 |
| 15 | [노트북 충전기를 연결해도 충전 표시가 되지 않는 문제](https://pcfixbase.com/problems/laptop-not-charging) | 공통 절차 유지 | 충전 LED·Windows 전원 인식과 정품 호환 어댑터 정격·충전 지원 포트를 확인하세요. |
| 15 | [전원 연결됨인데 배터리가 충전되지 않는 문제](https://pcfixbase.com/problems/plugged-in-not-charging) | 순서·대상 수정 | 기본 순서에서 제외: 노트북을 종료하고 하드 리셋하기 |
| 15 | [충전기를 꽂았는데도 게임 중 배터리가 줄어드는 문제](https://pcfixbase.com/problems/battery-drains-while-plugged) | 공통 절차 유지 | 정격 어댑터를 직접 연결하고 유휴 상태와 게임 부하에서 잔량 변화를 비교하세요. |
| 15 | [배터리 퍼센트가 오르거나 내려가지 않고 고정되는 문제](https://pcfixbase.com/problems/battery-percentage-stuck) | 순서·대상 수정 | 기본 순서에서 제외: 충전기와 콘센트부터 확인하기 · 노트북을 종료하고 하드 리셋하기 |
| 15 | [Windows에서 배터리가 감지되지 않는 문제](https://pcfixbase.com/problems/battery-not-detected) | 순서·대상 수정 | 기본 순서에서 제외: 노트북을 종료하고 하드 리셋하기 · 배터리 보호·충전 제한 설정 확인하기 |
| 16 | [파일 탐색기가 열리지 않는 문제](https://pcfixbase.com/problems/file-explorer-not-opening) | 공통 절차 유지 | Windows+E와 작업 관리자(Ctrl+Shift+Esc로 열기)에서 탐색기 실행이 모두 실패하는지 확인하세요. |
| 16 | [파일 탐색기가 자주 응답 없음이 되는 문제](https://pcfixbase.com/problems/file-explorer-not-responding) | 공통 절차 유지 | 특정 폴더·외장 드라이브에 들어갈 때만 멈추는지 확인하세요. |
| 16 | [작업 표시줄이나 시작 메뉴가 멈추는 문제](https://pcfixbase.com/problems/taskbar-start-menu-frozen) | 공통 절차 유지 | 작업 관리자(Ctrl+Shift+Esc로 열기)와 키보드 단축키가 작동하는지 확인하고 파일을 저장하세요. |
| 16 | [Windows 설정 앱이 열리지 않는 문제](https://pcfixbase.com/problems/windows-settings-not-opening) | 공통 절차 유지 | Windows+I와 시작 메뉴 모두에서 설정이 열리지 않는지, 다른 계정도 같은지 확인하세요. |
| 17 | [Microsoft Store가 열리지 않는 문제](https://pcfixbase.com/problems/microsoft-store-not-opening) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 17 | [Windows 프로그램이나 앱이 실행되지 않는 문제](https://pcfixbase.com/problems/app-not-opening) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 17 | [프로그램 설치나 제거가 실패하는 문제](https://pcfixbase.com/problems/app-install-uninstall-fail) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 17 | [DLL 파일이 없다는 오류 때문에 프로그램이 실행되지 않는 문제](https://pcfixbase.com/problems/dll-missing-error) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 18 | [SSD는 BIOS에 보이지만 Windows에서 안 보이는 문제](https://pcfixbase.com/problems/ssd-not-detected-windows) | 공통 절차 유지 | 디스크 관리(Windows 키+X → 디스크 관리로 열기)에서 모델·용량·온라인 상태와 파티션이 보이는지 확인하세요. |
| 18 | [하드디스크가 인식되지 않는 문제](https://pcfixbase.com/problems/hdd-not-detected) | 공통 절차 유지 | BIOS와 디스크 관리(Windows 키+X → 디스크 관리로 열기) 양쪽에서 모델·용량을 확인하고 이상음 여부를 살펴보세요. |
| 18 | [외장하드나 외장 SSD가 인식되지 않는 문제](https://pcfixbase.com/problems/external-drive-not-recognized) | 공통 절차 유지 | 파일 탐색기(Windows 키+E로 열기)뿐 아니라 디스크 관리(Windows 키+X → 디스크 관리로 열기)에서 외장 드라이브의 정확한 용량을 확인하세요. |
| 18 | [디스크는 보이는데 드라이브 문자가 없어 탐색기에 안 뜨는 문제](https://pcfixbase.com/problems/drive-letter-missing) | 순서·대상 수정 | 기본 순서에서 제외: 케이블·포트·슬롯을 다시 확인하기 · 다른 포트 또는 다른 PC에서 교차 테스트하기 · 스토리지/칩셋 드라이버 업데이트 또는 재설치하기 |
| 19 | [설치한 RAM이 아예 인식되지 않는 문제](https://pcfixbase.com/problems/ram-not-detected) | 공통 절차 유지 | BIOS의 총 용량과 모듈별 인식 상태를 확인하고 설명서의 권장 슬롯을 비교하세요. |
| 19 | [설치한 RAM 용량의 절반만 표시되는 문제](https://pcfixbase.com/problems/ram-capacity-half) | 공통 절차 유지 | BIOS 총 용량과 Windows의 설치됨·사용 가능·하드웨어 예약을 비교하세요. |
| 19 | [XMP나 EXPO를 켜면 재부팅·블루스크린이 발생하는 문제](https://pcfixbase.com/problems/xmp-expo-unstable) | 공통 절차 유지 | 현재 튜닝 값을 기록하고 XMP·EXPO를 끈 기본 메모리 설정에서 같은 작업을 비교하세요. |
| 19 | [RAM 오류 때문에 프로그램과 Windows가 무작위로 튕기는 문제](https://pcfixbase.com/problems/memory-errors-random-crash) | 공통 절차 유지 | 메모리 검사 오류가 기본 설정에서도 나는지와 특정 모듈·슬롯을 따라가는지 확인하세요. |
| 20 | [No Bootable Device 오류가 뜨는 문제](https://pcfixbase.com/problems/no-bootable-device) | 공통 절차 유지 | BIOS의 저장장치 목록과 부팅 목록을 각각 확인하세요. 드라이브 인식과 부팅 항목은 다릅니다. |
| 20 | [Operating System Not Found 오류가 뜨는 문제](https://pcfixbase.com/problems/operating-system-not-found) | 공통 절차 유지 | 외장 USB를 분리하고 기존 OS 디스크가 BIOS에 남아 있는지 확인하세요. |
| 20 | [부팅할 때 검은 화면에 커서만 깜빡이는 문제](https://pcfixbase.com/problems/boot-black-screen-blinking-cursor) | 공통 절차 유지 | 마우스 포인터가 아니라 텍스트 커서만 깜빡이는지와 BIOS의 부팅 항목을 확인하세요. |
| 21 | [Windows 업데이트 후 검은 화면이 나오는 문제](https://pcfixbase.com/problems/black-screen-after-update) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 21 | [그래픽 드라이버 업데이트 후 검은 화면이 나오는 문제](https://pcfixbase.com/problems/black-screen-after-gpu-driver-update) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 21 | [그래픽 드라이버 업데이트 후 게임이 튕기는 문제](https://pcfixbase.com/problems/game-after-driver-update-crash) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 22 | [화면에 점·줄·깨짐 같은 그래픽 이상이 생기는 문제](https://pcfixbase.com/problems/display-artifacts) | 공통 절차 유지 | 화면 깨짐을 스크린샷으로 저장하고 다른 기기에서 같은 이미지가 깨져 보이는지 비교하세요. |
| 22 | [그래픽 드라이버가 멈추거나 timeout이 발생하는 문제](https://pcfixbase.com/problems/gpu-driver-crash-timeout) | 공통 절차 유지 | 이벤트의 디스플레이 드라이버 복구 시각과 충돌한 앱·GPU 온도를 기록하세요. |
| 22 | [화면이 꺼지면서 그래픽카드 팬이 100%로 도는 문제](https://pcfixbase.com/problems/gpu-fans-100-black-screen) | 공통 절차 유지 | 화면이 사라질 때 소리가 남는지, GPU 팬만 급증하는지와 전원 커넥터 이상을 확인하세요. |
| 23 | [Windows 계정에 로그인할 수 없는 문제](https://pcfixbase.com/problems/windows-login-fail) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 23 | [Windows Hello PIN을 사용할 수 없다는 오류가 뜨는 문제](https://pcfixbase.com/problems/pin-not-available) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 23 | [사용자 프로필이 손상되어 로그인 후 설정이 사라지는 문제](https://pcfixbase.com/problems/user-profile-corrupt) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 24 | [CPU 사용률이 계속 100%에 가까운 문제](https://pcfixbase.com/problems/high-cpu-usage) | 공통 절차 유지 | 프로세스를 CPU 사용률로 정렬하고 유휴·작업 중 각각 어떤 프로세스가 높은지 기록하세요. |
| 24 | [CPU 사용률이 계속 100%인 문제](https://pcfixbase.com/problems/high-cpu-usage) | 대표 글 통합 | 기존 주소는 대표 글로 영구 연결. 검색어 보존. |
| 24 | [CPU 클럭이 낮게 고정되고 성능이 나오지 않는 문제](https://pcfixbase.com/problems/cpu-clock-low-throttling) | 공통 절차 유지 | 유휴 절전으로 낮은 클럭인지, 실제 작업 중에도 낮은지 온도·전력 제한과 함께 확인하세요. |
| 25 | [작업 관리자에서 디스크 사용률이 100%가 되는 문제](https://pcfixbase.com/problems/disk-100-percent) | 공통 절차 유지 | 디스크 활성 시간 100%와 실제 전송량·응답 시간·점유 프로세스를 함께 보세요. |
| 25 | [SSD·USB·외장하드 파일 복사 속도가 너무 느린 문제](https://pcfixbase.com/problems/file-copy-slow) | 공통 절차 유지 | 큰 파일 하나와 작은 파일 여러 개의 속도, 원본·대상 위치와 연결 규격을 비교하세요. |
| 25 | [SSD 속도가 기대보다 매우 느린 문제](https://pcfixbase.com/problems/ssd-slow-performance) | 공통 절차 유지 | 여유 공간·온도·현재 PCIe 링크와 큰 파일 복사 초반·후반 속도를 비교하세요. |
| 26 | [Wi-Fi는 연결됐는데 인터넷이 안 되는 문제](https://pcfixbase.com/problems/wifi-no-internet) | 순서·대상 수정 | 기본 순서에서 제외: Wi-Fi를 잊고 다시 연결하기 |
| 26 | [특정 Wi-Fi에 연결할 수 없는 문제](https://pcfixbase.com/problems/wifi-cant-connect) | 공통 절차 유지 | 그 Wi-Fi만 실패하는지, 비밀번호와 보안 방식이 맞는지 다른 기기로 비교하세요. |
| 26 | [Wi-Fi가 계속 끊기는 문제](https://pcfixbase.com/problems/wifi-disconnect) | 공통 절차 유지 | 절전 복귀·거리·특정 시간대에 끊기는지와 다른 무선 기기도 같이 끊기는지 기록하세요. |
| 27 | [Wi-Fi 목록이나 Wi-Fi 버튼 자체가 보이지 않는 문제](https://pcfixbase.com/problems/wifi-not-showing) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 27 | [장치 관리자에서 네트워크 어댑터가 사라진 문제](https://pcfixbase.com/problems/network-adapter-missing) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 27 | [Windows에서 Bluetooth 버튼이나 메뉴가 사라진 문제](https://pcfixbase.com/problems/bluetooth-missing) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 28 | [인터넷은 연결됐지만 DNS 때문에 사이트 주소가 안 열리는 문제](https://pcfixbase.com/problems/dns-not-resolving) | 공통 절차 유지 | 여러 도메인 조회가 실패하는지, VPN·프록시 사용 여부와 다른 기기의 동작을 비교하세요. |
| 28 | [특정 웹사이트만 열리지 않는 문제](https://pcfixbase.com/problems/specific-websites-not-opening) | 공통 절차 유지 | 오류 문구를 기록하고 같은 사이트를 다른 브라우저·다른 네트워크에서 비교하세요. |
| 28 | [속도 측정은 정상인데 브라우저만 인터넷이 느린 문제](https://pcfixbase.com/problems/browser-internet-slow) | 공통 절차 유지 | 같은 사이트를 확장 기능이 꺼진 새 브라우저 프로필과 다른 브라우저에서 비교하세요. |
| 29 | [Bluetooth 장치가 페어링되지 않는 문제](https://pcfixbase.com/problems/bluetooth-cant-pair) | 공통 절차 유지 | 장치가 실제 페어링 모드인지와 다른 휴대폰·PC에 자동 연결돼 있는지 확인하세요. |
| 29 | [Bluetooth 장치가 계속 연결 해제되는 문제](https://pcfixbase.com/problems/bluetooth-disconnect) | 공통 절차 유지 | 거리·배터리와 절전 복귀 전후 연결 차이를 확인하세요. |
| 29 | [Bluetooth 마우스가 끊기거나 지연되는 문제](https://pcfixbase.com/problems/bluetooth-mouse-lag) | 공통 절차 유지 | 마우스를 가까이 놓고 배터리와 USB 3.x 장치·2.4GHz 무선 간섭을 비교하세요. |
| 30 | [키보드가 전혀 입력되지 않는 문제](https://pcfixbase.com/problems/keyboard-not-working) | 공통 절차 유지 | 외장 키보드·화상 키보드와 BIOS·로그인 화면에서 입력되는지 비교하세요. |
| 30 | [키보드 일부 키만 입력되지 않는 문제](https://pcfixbase.com/problems/keyboard-some-keys-not-working) | 공통 절차 유지 | 메모장과 다른 앱에서 같은 키가 실패하는지, 다른 키보드는 정상인지 비교하세요. |
| 30 | [키보드가 한 번 눌렀는데 두 번 입력되는 문제](https://pcfixbase.com/problems/keyboard-double-typing) | 순서·대상 수정 | 기본 순서에서 제외: 키보드를 다시 연결하고 다른 포트에서 테스트하기 · 키보드/HID 드라이버 업데이트 또는 재설치하기 |
| 31 | [마우스가 전혀 움직이지 않는 문제](https://pcfixbase.com/problems/mouse-not-working) | 공통 절차 유지 | 커서만 안 움직이는지 클릭도 안 되는지, 유선·동글·Bluetooth 연결을 구분하세요. |
| 31 | [마우스 커서가 끊기거나 버벅이는 문제](https://pcfixbase.com/problems/mouse-lag) | 공통 절차 유지 | 유선 마우스에서도 지연되는지와 높은 CPU·디스크 부하를 함께 확인하세요. |
| 31 | [마우스가 한 번 클릭했는데 더블클릭되는 문제](https://pcfixbase.com/problems/mouse-double-click) | 순서·대상 수정 | 기본 순서에서 제외: 다른 포트·표면·배터리로 기본 점검하기 · USB·Bluetooth 연결 간섭 확인하기 · 마우스/HID 드라이버 업데이트 또는 재설치하기 |
| 32 | [데스크톱 전원이 아예 들어오지 않는 문제](https://pcfixbase.com/problems/desktop-no-power) | 공통 절차 유지 | 본체 팬·전원 LED도 모두 꺼져 있는지 확인하고 정상 콘센트와 전원 케이블로 비교하세요. |
| 32 | [전원 버튼을 눌러도 반응이 없는 문제](https://pcfixbase.com/problems/power-button-no-response) | 공통 절차 유지 | 대기 전원 LED는 켜지는데 케이스 버튼만 반응하지 않는지 확인하세요. |
| 33 | [컴퓨터 전원이 갑자기 꺼지는 문제](https://pcfixbase.com/problems/computer-shutdown) | 공통 절차 유지 | 꺼진 직전 온도·실행 작업과 전원 LED가 완전히 꺼졌는지 기록하세요. |
| 33 | [컴퓨터가 사용 중 갑자기 재부팅되는 문제](https://pcfixbase.com/problems/computer-random-restart) | 공통 절차 유지 | 블루스크린 뒤 재시작인지 전원 단절 뒤 재시작인지 신뢰성 기록과 발생 시각으로 구분하세요. |
| 34 | [컴퓨터가 켜졌다가 바로 꺼지는 문제](https://pcfixbase.com/problems/pc-turns-on-then-off) | 공통 절차 유지 | 전원을 누른 뒤 몇 초 만에 꺼지는지와 POST 진단 LED를 확인하세요. |
| 34 | [컴퓨터가 켜졌다 꺼졌다를 반복하는 문제](https://pcfixbase.com/problems/pc-power-cycles-loop) | 공통 절차 유지 | 최근 RAM·BIOS 변경과 메인보드 설명서의 메모리 트레이닝 시간을 확인하세요. |
| 35 | [부팅할 때 비프음이 나고 화면이 안 나오는 문제](https://pcfixbase.com/problems/pc-beeps-on-startup) | 공통 절차 유지 | 짧고 긴 비프음 횟수를 기록하고 정확한 메인보드 모델의 설명서와 대조하세요. |
| 35 | [메인보드 CPU·DRAM·VGA·BOOT LED가 계속 켜지는 문제](https://pcfixbase.com/problems/motherboard-debug-led) | 공통 절차 유지 | 순차 점등 후 꺼지는 정상 표시와 특정 CPU·DRAM·VGA·BOOT LED가 계속 남는 상태를 구분하세요. |
| 36 | [INACCESSIBLE_BOOT_DEVICE 블루스크린 문제](https://pcfixbase.com/problems/inaccessible-boot-device-bsod) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 36 | [업데이트 후 되돌리기와 재부팅을 반복하는 문제](https://pcfixbase.com/problems/windows-update-rollback-loop) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 37 | [Windows 검은 화면에 마우스 커서만 보이는 문제](https://pcfixbase.com/problems/windows-black-screen-cursor) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 37 | [Windows 로그인 후 검은 화면이 되는 문제](https://pcfixbase.com/problems/black-screen-after-login) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 38 | [절전 모드에서 깨어난 뒤 모니터 화면이 안 나오는 문제](https://pcfixbase.com/problems/monitor-wakes-no-display) | 공통 절차 유지 | 모니터 전원을 다시 켜면 영상이 돌아오는지와 PC의 절전 복귀 여부를 구분하세요. |
| 38 | [절전 모드에서 컴퓨터가 깨어나지 않는 문제](https://pcfixbase.com/problems/sleep-wake-problem) | 공통 절차 유지 | 전원 LED·팬은 복귀했는데 화면만 없는지, PC 전체가 복귀하지 않는지 구분하세요. |
| 39 | [게임에서 게임패드·컨트롤러가 인식되지 않는 문제](https://pcfixbase.com/problems/game-controller-not-detected) | 공통 절차 유지 | Windows 키+R → joy.cpl → 해당 컨트롤러 → 속성 → 테스트에서 버튼·축이 반응하는지 먼저 확인하세요. |
| 39 | [Windows에서 게임패드가 인식되지 않는 문제](https://pcfixbase.com/problems/controller-not-detected-windows) | 순서·대상 수정 | 기본 순서에서 제외: 게임 입력 설정과 Steam Input 확인하기 |
| 40 | [게임 핑이 높고 지연이 심한 문제](https://pcfixbase.com/problems/game-high-ping) | 공통 절차 유지 | 게임 서버 지역과 다른 장치의 업로드·다운로드를 확인하고 유선 연결로 비교하세요. |
| 40 | [게임에서 패킷 손실 때문에 끊기는 문제](https://pcfixbase.com/problems/game-packet-loss) | 공통 절차 유지 | 게임의 손실 표시와 공유기·외부 경로의 손실을 같은 시간대에 비교하세요. |
| 41 | [Windows 업데이트 설치가 실패하는 문제](https://pcfixbase.com/problems/windows-update-fail) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 41 | [Windows 업데이트가 특정 퍼센트에서 멈추는 문제](https://pcfixbase.com/problems/windows-update-stuck) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 42 | [메모리 사용률이 계속 높은 문제](https://pcfixbase.com/problems/high-ram-usage) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 42 | [특정 프로그램을 오래 켜두면 메모리가 계속 늘어나는 문제](https://pcfixbase.com/problems/memory-leak) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 43 | [C 드라이브 용량이 거의 없는 문제](https://pcfixbase.com/problems/c-drive-full) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 43 | [임시 파일이나 시스템 파일이 계속 늘어나는 문제](https://pcfixbase.com/problems/temp-files-growing) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 44 | [랜선을 연결해도 인터넷이 안 되는 문제](https://pcfixbase.com/problems/ethernet-not-working) | 공통 절차 유지 | 랜 포트 링크 LED와 Windows의 케이블 연결 상태를 보고 정상 케이블·공유기 포트로 비교하세요. |
| 44 | [이더넷에 식별되지 않은 네트워크가 뜨는 문제](https://pcfixbase.com/problems/ethernet-unidentified-network) | 공통 절차 유지 | IP가 자동 할당됐는지와 기본 게이트웨이가 있는지 확인하세요. |
| 45 | [인터넷 핑이 평소보다 높은 문제](https://pcfixbase.com/problems/high-ping) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 45 | [인터넷 패킷 손실이 발생하는 문제](https://pcfixbase.com/problems/packet-loss) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 46 | [SD 카드가 컴퓨터에서 인식되지 않는 문제](https://pcfixbase.com/problems/sd-card-not-recognized) | 공통 절차 유지 | 다른 정상 카드리더기로 모델·용량이 표시되는지 확인하고 기존 데이터 유무를 구분하세요. |
| 46 | [SD 카드가 쓰기 금지되어 파일 저장이 안 되는 문제](https://pcfixbase.com/problems/sd-card-write-protected) | 공통 절차 유지 | 카드 어댑터의 잠금 탭과 다른 리더기에서도 읽기 전용인지 확인하세요. |
| 47 | [마이크가 인식되지만 소리가 입력되지 않는 문제](https://pcfixbase.com/problems/microphone-not-working) | 공통 절차 유지 | Windows 입력 테스트의 레벨 막대가 움직이는지와 선택된 마이크·물리 음소거를 확인하세요. |
| 47 | [마이크 소리가 너무 작게 들어가는 문제](https://pcfixbase.com/problems/mic-too-quiet) | 순서·대상 수정 | 기본 순서에서 제외: Windows 개인정보 권한 확인하기 · 오디오/마이크 드라이버 업데이트 또는 재설치하기 |
| 48 | [프린터 인쇄 속도가 지나치게 느린 문제](https://pcfixbase.com/problems/slow-printing) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 48 | [Word·Excel·브라우저 등 특정 앱에서만 인쇄가 안 되는 문제](https://pcfixbase.com/problems/printing-from-app-fails) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 49 | [노트북 배터리가 너무 빨리 닳는 문제](https://pcfixbase.com/problems/battery-drains-fast) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |
| 49 | [노트북이 배터리 사용 중에만 너무 느려지는 문제](https://pcfixbase.com/problems/laptop-slow-on-battery) | 전용 설명 보강 완료 | 완료: 비교 조건·결과별 조치·해결 확인·중단 기준·문의 기록을 전용 안내에 반영 |

### 참고 문서

- 앱별 음량과 출력 장치부터 확인하는 순서: [Microsoft 앱별 오디오 문제](https://support.microsoft.com/en-us/windows/hardware/audio/fix-app-audio-not-working-while-system-sounds-work-in-windows).
- 카메라 권한과 앱 점유·장치 인식의 구분: [Microsoft 카메라 문제 해결](https://support.microsoft.com/en-gb/windows/hardware/camera/camera-doesn-t-work-in-windows?nochrome=true), [카메라와 마이크 권한](https://support.microsoft.com/en-us/windows/privacy/windows-camera-microphone-and-privacy).

원문 첫 진단과 수정 전후 단계 제목은 content-differentiation-review-2026-10-28.json에 보관한다.
