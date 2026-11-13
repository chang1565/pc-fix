// 한국어 카테고리 페이지 전용 안내. 상황별로 먼저 볼 글을 연결한다.
export type CategoryGuide = {
  intro: string;
  paths: { when: string; slug: string }[];
};

export const koCategoryGuides: Record<string, CategoryGuide> = {
  전원: {
    intro: "전원 문제는 전원 버튼을 눌렀을 때 팬·LED가 전혀 반응하지 않는지, 켜졌다가 꺼지는지, 쓰는 중에 꺼지는지에 따라 확인할 곳이 다릅니다. 반응이 아예 없으면 콘센트·케이블·파워서플라이 쪽을, 켜진 뒤 꺼지면 온도·전원 공급·부품 장착 상태를 먼저 봅니다.",
    paths: [
      { when: "버튼을 눌러도 팬·LED가 전혀 반응하지 않는다", slug: "desktop-no-power" },
      { when: "몇 초 켜졌다가 바로 꺼진다", slug: "pc-turns-on-then-off" },
      { when: "쓰는 도중에 경고 없이 꺼지거나 재부팅된다", slug: "computer-random-restart" },
      { when: "절전 모드에서 혼자 깨어난다", slug: "pc-wakes-from-sleep" },
    ],
  },
  부팅: {
    intro: "부팅 문제는 제조사 로고가 뜨기 전(POST 단계)에 멈추는지, 로고 뒤 Windows 시작 단계에서 멈추는지로 먼저 나눕니다. 로고 전이면 비프음·메인보드 LED가 단서가 되고, 로고 뒤라면 부팅 디스크 인식과 Windows 복구 환경을 확인합니다.",
    paths: [
      { when: "비프음이 나거나 메인보드 LED가 켜진 채 화면이 안 나온다", slug: "motherboard-debug-led" },
      { when: "No Bootable Device 같은 부팅 장치 오류가 뜬다", slug: "no-bootable-device" },
      { when: "자동 복구 화면이 계속 반복된다", slug: "automatic-repair-loop" },
      { when: "부팅은 되지만 시간이 너무 오래 걸린다", slug: "boot-slow" },
    ],
  },
  Windows: {
    intro: "Windows 문제는 블루스크린, 업데이트, 로그인, 탐색기·시작 메뉴, 앱 실행으로 나뉩니다. 블루스크린이라면 화면에 표시된 중지 코드 이름으로 해당 글을 찾는 것이 가장 빠르고, 업데이트 이후 생긴 문제라면 업데이트 기록부터 확인합니다.",
    paths: [
      { when: "블루스크린 중지 코드가 SYSTEM_SERVICE_EXCEPTION이다", slug: "bsod-system-service-exception" },
      { when: "블루스크린 중지 코드가 IRQL_NOT_LESS_OR_EQUAL이다", slug: "bsod-irql-not-less-or-equal" },
      { when: "Windows 업데이트가 설치되지 않는다", slug: "windows-update-fail" },
      { when: "설정 앱이 열리지 않는다", slug: "windows-settings-not-opening" },
    ],
  },
  화면: {
    intro: "화면 문제는 모니터에 '신호 없음'이 뜨는지, 신호는 있는데 검은지, Windows는 보이는데 깜빡이거나 멈추는지에 따라 원인 범위가 달라집니다. 신호 없음이면 케이블·입력 소스·그래픽 출력 포트를, Windows 화면 이후라면 드라이버와 디스플레이 설정을 먼저 봅니다.",
    paths: [
      { when: "본체는 켜졌는데 모니터에 '신호 없음'이 뜬다", slug: "monitor-no-signal" },
      { when: "쓰던 중 화면이 갑자기 검게 변한다", slug: "computer-black-screen" },
      { when: "Windows 업데이트 뒤 검은 화면이 나온다", slug: "black-screen-after-update" },
      { when: "화면이 깜빡이거나 번쩍인다", slug: "screen-flickering" },
    ],
  },
  그래픽: {
    intro: "그래픽 문제는 드라이버 쪽인지 그래픽카드 하드웨어 쪽인지 구분하는 것이 먼저입니다. 드라이버 업데이트 직후 생겼다면 이전 버전으로 되돌려 비교하고, 드라이버와 관계없이 화면 깨짐·인식 실패가 생기면 장착·전원·온도를 확인합니다.",
    paths: [
      { when: "그래픽 드라이버 업데이트 뒤 화면이 검게 나온다", slug: "black-screen-after-gpu-driver-update" },
      { when: "화면에 점·줄·깨짐이 보인다", slug: "display-artifacts" },
      { when: "장치 관리자에 그래픽카드가 보이지 않는다", slug: "gpu-not-detected" },
      { when: "게임 중 GPU 사용률이 낮고 FPS가 안 나온다", slug: "gpu-low-usage-fps" },
    ],
  },
  게임: {
    intro: "게임 문제는 튕김(게임만 종료), 멈춤(화면 정지), 끊김(짧은 버벅임), PC 전체 재부팅으로 나눠 보면 원인 범위가 크게 좁혀집니다. 게임만 꺼지면 게임 파일·드라이버·오버레이를, PC 전체가 재부팅되면 전원·온도 쪽을 먼저 확인합니다.",
    paths: [
      { when: "게임만 갑자기 꺼지고 바탕화면으로 나온다", slug: "game-crash" },
      { when: "게임 중 화면이 검게 변하고 PC가 재부팅된다", slug: "game-black-screen-restart" },
      { when: "처음 실행하거나 새 지역에 들어갈 때만 심하게 끊긴다", slug: "game-shader-stutter" },
      { when: "게임패드·컨트롤러를 게임이 인식하지 않는다", slug: "game-controller-not-detected" },
    ],
  },
  성능: {
    intro: "느려짐 문제는 작업 관리자(Ctrl+Shift+Esc)의 프로세스 탭에서 CPU·메모리·디스크 중 어느 항목이 높은지부터 확인하면 해당하는 글로 바로 갈 수 있습니다. 부팅 직후에만 느린지, 오래 켜두면 느려지는지도 함께 기록해 두세요.",
    paths: [
      { when: "특별한 작업 없이 전체적으로 느려졌다", slug: "computer-slow" },
      { when: "작업 관리자에서 CPU가 계속 100% 가까이 표시된다", slug: "high-cpu-usage" },
      { when: "메모리 사용률이 계속 높다", slug: "high-ram-usage" },
      { when: "특정 프로그램을 오래 켜두면 메모리가 계속 늘어난다", slug: "memory-leak" },
    ],
  },
  저장장치: {
    intro: "저장장치 문제는 데이터가 남아 있을 수 있으므로 초기화·포맷보다 백업이 먼저입니다. BIOS에서도 안 보이는지, BIOS에는 보이지만 Windows에서 안 보이는지에 따라 연결 문제와 파티션·드라이버 문제를 나눌 수 있습니다.",
    paths: [
      { when: "SSD·NVMe가 BIOS에서도 보이지 않는다", slug: "ssd-not-detected-bios" },
      { when: "BIOS에는 보이는데 Windows 탐색기에 없다", slug: "ssd-not-detected-windows" },
      { when: "작업 관리자에서 디스크 사용률이 100%다", slug: "disk-100-percent" },
      { when: "S.M.A.R.T. 경고가 뜬다", slug: "disk-smart-error" },
    ],
  },
  메모리: {
    intro: "메모리 문제는 RAM을 추가·교체한 직후인지, XMP·EXPO 같은 메모리 프로필을 켠 뒤인지가 가장 큰 단서입니다. 최근 바꾼 것이 있다면 먼저 원래 상태로 되돌려 증상이 사라지는지 비교합니다.",
    paths: [
      { when: "RAM을 추가·교체한 뒤 부팅되지 않는다", slug: "bios-after-ram-upgrade-no-boot" },
      { when: "XMP·EXPO를 켜면 재부팅·블루스크린이 생긴다", slug: "xmp-expo-unstable" },
      { when: "설치한 RAM 용량의 절반만 표시된다", slug: "ram-capacity-half" },
    ],
  },
  CPU: {
    intro: "CPU 문제는 사용률이 높은 것(소프트웨어 부하)과 온도·클럭이 비정상인 것(냉각·전원 설정)을 나눠 봐야 합니다. 작업 관리자에서 사용률과 현재 속도를, 제조사 도구나 모니터링 프로그램에서 온도를 함께 확인합니다.",
    paths: [
      { when: "CPU 온도가 너무 높다", slug: "cpu-overheating" },
      { when: "CPU 클럭이 낮게 고정되고 성능이 안 나온다", slug: "cpu-clock-low-throttling" },
      { when: "CPU를 교체한 뒤 부팅되지 않는다", slug: "cpu-new-install-no-boot" },
    ],
  },
  인터넷: {
    intro: "인터넷 문제는 같은 공유기를 쓰는 휴대폰 같은 다른 기기는 되는지부터 확인합니다. 다른 기기도 안 되면 공유기·회선 문제일 가능성이 크고, 이 PC만 안 되면 어댑터·IP·DNS 설정을 차례로 봅니다.",
    paths: [
      { when: "인터넷 연결이 갑자기 끊겼다", slug: "internet-not-working" },
      { when: "Wi-Fi는 연결됐다고 나오는데 인터넷이 안 된다", slug: "wifi-no-internet" },
      { when: "인터넷은 되는데 사이트 주소만 열리지 않는다", slug: "dns-not-resolving" },
      { when: "Windows 업데이트 뒤 인터넷이 안 된다", slug: "network-after-windows-update" },
    ],
  },
  Bluetooth: {
    intro: "Bluetooth 문제는 Windows에서 Bluetooth 메뉴 자체가 사라졌는지, 메뉴는 있지만 장치 연결이 안 되는지, 연결 후 소리·입력이 불안정한지로 나뉩니다. 메뉴가 없으면 어댑터와 드라이버를, 연결이 불안정하면 거리·간섭·전원 관리를 확인합니다.",
    paths: [
      { when: "설정에서 Bluetooth 버튼이 보이지 않는다", slug: "bluetooth-missing" },
      { when: "장치가 페어링되지 않는다", slug: "bluetooth-cant-pair" },
      { when: "연결된 장치가 자꾸 끊긴다", slug: "bluetooth-disconnect" },
    ],
  },
  주변기기: {
    intro: "주변기기 문제는 같은 장치를 다른 USB 포트나 다른 PC에 연결해 보는 교차 테스트가 가장 빠른 구분 방법입니다. 다른 PC에서도 같으면 장치 쪽, 이 PC에서만 그렇다면 포트·드라이버·전원 관리 쪽을 확인합니다.",
    paths: [
      { when: "USB 장치가 연결됐다 끊겼다를 반복한다", slug: "usb-disconnect-reconnect" },
      { when: "USB 장치를 전혀 인식하지 못한다", slug: "usb-not-recognized" },
      { when: "마우스 커서가 끊기거나 버벅인다", slug: "mouse-lag" },
      { when: "노트북 터치패드 커서가 튀거나 혼자 움직인다", slug: "touchpad-cursor-jumps" },
    ],
  },
  오디오: {
    intro: "소리 문제는 Windows의 출력·입력 장치가 올바르게 선택돼 있는지부터 확인합니다. 작업 표시줄의 스피커 아이콘에서 출력 장치를 확인하고, 특정 앱에서만 문제라면 그 앱의 오디오 설정을 따로 봅니다.",
    paths: [
      { when: "스피커·헤드폰에서 소리가 전혀 나지 않는다", slug: "no-sound" },
      { when: "마이크가 인식되는데 소리가 입력되지 않는다", slug: "microphone-not-working" },
      { when: "통화 상대에게 내 소리가 울리거나 PC 소리가 같이 들어간다", slug: "mic-echo-feedback" },
    ],
  },
  카메라: {
    intro: "카메라 문제는 Windows 카메라 앱에서는 되는지부터 확인합니다. 카메라 앱에서도 안 되면 권한·장치 인식 문제를, 카메라 앱에서는 되는데 특정 앱에서만 안 되면 앱 권한이나 다른 앱의 카메라 점유를 의심합니다.",
    paths: [
      { when: "카메라나 웹캠이 아예 작동하지 않는다", slug: "webcam-not-working" },
      { when: "앱에서 카메라 권한 문제로 카메라를 못 쓴다", slug: "camera-privacy-blocked" },
      { when: "다른 앱에서 카메라를 사용 중이라는 오류가 난다", slug: "camera-used-by-another-app" },
    ],
  },
  프린터: {
    intro: "프린터 문제는 프린터 본체에 오류 표시가 있는지, Windows에서 프린터가 오프라인으로 보이는지, 대기열에 작업이 쌓여 있는지를 먼저 확인합니다. 프린터 자체 화면이나 LED 오류는 제조사 설명서의 오류 코드가 가장 정확한 단서입니다.",
    paths: [
      { when: "프린터가 오프라인으로 표시된다", slug: "printer-offline" },
      { when: "인쇄 작업이 대기열에 걸려 지워지지 않는다", slug: "print-queue-stuck" },
      { when: "인쇄는 되는데 속도가 지나치게 느리다", slug: "slow-printing" },
    ],
  },
  노트북: {
    intro: "노트북 전원 문제는 충전기 표시등과 Windows 배터리 아이콘의 '전원 연결됨' 표시를 함께 확인합니다. 배터리가 부풀어 오른 것이 보이면 다른 확인보다 사용 중지가 먼저입니다.",
    paths: [
      { when: "충전기를 연결해도 충전 표시가 되지 않는다", slug: "laptop-not-charging" },
      { when: "전원 연결됨으로 나오는데 충전되지 않는다", slug: "plugged-in-not-charging" },
      { when: "배터리가 부풀어 오른 것 같다", slug: "battery-swollen" },
    ],
  },
  발열: {
    intro: "발열 문제는 팬이 도는지, 도는데도 온도가 높은지, 팬 소리만 큰지에 따라 확인 순서가 다릅니다. 요즘 그래픽카드와 일부 쿨러는 온도가 낮을 때 팬을 멈추는 제로 RPM 기능이 있어, 팬이 멈춘 것 자체가 고장은 아닐 수 있습니다.",
    paths: [
      { when: "CPU·노트북 팬이 돌지 않는다", slug: "fan-not-spinning" },
      { when: "아무 작업을 안 해도 팬이 계속 빠르게 돈다", slug: "fan-always-on" },
      { when: "노트북이 뜨거워진 뒤 갑자기 꺼진다", slug: "laptop-shuts-down-hot" },
    ],
  },
};
