import type { KoGuide } from "./types";

const SRC_WU_ERRORS = {
  title: "Microsoft Learn: Common Windows Update errors",
  url: "https://learn.microsoft.com/en-us/troubleshoot/windows-client/installing-updates-features-roles/common-windows-update-errors",
};
const SRC_NETFX35_ERRORS = {
  title: "Microsoft Learn: .NET Framework 3.5 installation errors",
  url: "https://learn.microsoft.com/en-us/troubleshoot/windows-client/application-management/dotnet-framework-35-installation-error",
};
const SRC_NETFX35_DISM = {
  title: "Microsoft Learn: Deploy .NET Framework 3.5 by using DISM",
  url: "https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/deploy-net-framework-35-by-using-deployment-image-servicing-and-management--dism",
};
const SRC_CLEAN_BOOT = {
  title: "Microsoft 지원: Windows에서 클린 부팅을 수행하는 방법",
  url: "https://support.microsoft.com/topic/how-to-perform-a-clean-boot-in-windows-da2f9573-6eec-00ad-2f8a-a97a1807f3dd",
};
const SRC_UPGRADE_RESOLUTION = {
  title: "Microsoft Learn: Windows 10 upgrade resolution procedures",
  url: "https://learn.microsoft.com/en-us/troubleshoot/windows-client/setup-upgrade-and-drivers/windows-10-upgrade-resolution-procedures",
};
const SRC_SETUPDIAG = {
  title: "Microsoft Learn: SetupDiag",
  url: "https://learn.microsoft.com/en-us/windows/deployment/upgrade/setupdiag",
};
const SRC_DEVICE_MANAGER_CODES = {
  title: "Microsoft 지원: Windows 장치 관리자의 오류 코드",
  url: "https://support.microsoft.com/en-gb/windows/hardware/drivers/error-codes-in-device-manager-in-windows?nochrome=true",
};

export const batch16Errors: Record<string, KoGuide> = {
  "0x800f081f": {
    reviewedAt: "2026-11-19",
    description:
      "0x800F081F(CBS_E_SOURCE_MISSING)는 Windows가 기능을 켜거나 구성요소를 고치는 데 필요한 원본 파일을 찾지 못했다는 뜻입니다. 주로 .NET Framework 3.5를 켤 때나 DISM /RestoreHealth를 실행할 때 나타납니다. 원본을 따로 지정하지 않았다면 Windows Update 쪽을, 직접 /Source를 지정했다면 그 경로와 이미지 버전부터 봅니다.",
    quickCheck: [
      "실패한 작업이 ‘Windows 기능 켜기/끄기’의 .NET Framework 3.5인가요, 아니면 관리자 터미널에서 실행한 DISM /RestoreHealth인가요?",
      "명령에 /Source를 붙여 ISO나 폴더를 직접 지정했나요? 지정했다면 그 경로에 실제로 파일이 들어 있는지가 첫 확인 대상입니다.",
      "설정 → Windows 업데이트 위쪽에 ‘일부 설정은 조직에서 관리합니다’가 보이면 회사 정책이 원본 다운로드를 막고 있을 수 있습니다.",
    ],
    causes: [
      "지정한 원본 경로에 sxs 폴더나 install.wim이 없음",
      "현재 Windows와 버전·빌드·언어가 다른 설치 이미지",
      "원본 위치에 대한 읽기 권한 부족",
      "구성요소 저장소 손상으로 Windows Update 원본만으로는 복구 불가",
      "조직 정책이 Windows Update 원본 사용을 제한",
    ],
    solutions: [
      {
        title: "현재 Windows 버전과 에디션 적어 두기",
        reason:
          "복구 원본은 지금 설치된 Windows와 버전·에디션·아키텍처가 같아야 하므로, 이 정보가 없으면 맞는 ISO를 고를 수 없습니다.",
        difficulty: "쉬움",
        time: "3~5분",
        steps: [
          "Win + R을 누르고 winver 를 입력해 버전(예: 24H2)과 OS 빌드 번호를 적습니다.",
          "설정 → 시스템 → 정보에서 에디션(Home·Pro 등)과 시스템 종류(x64·ARM64)를 확인합니다.",
          "오류가 난 작업이 .NET 3.5 설치인지 DISM 복구인지, 실행한 명령 전체를 함께 메모합니다.",
        ],
        checkPoint:
          "버전·에디션·아키텍처를 모두 적었다면 원본 없이 다시 시도하는 다음 단계로 갑니다. 이 정보는 3~5단계에서 ISO와 비교할 때 그대로 씁니다.",
      },
      {
        title: "대기 중인 업데이트 설치 후 원본 지정 없이 다시 실행",
        reason:
          "개인 PC는 기본적으로 Windows Update에서 원본을 받아 오므로, 업데이트가 밀려 있거나 VPN이 연결을 바꾸면 원본을 찾지 못할 수 있습니다.",
        difficulty: "쉬움",
        time: "15~30분",
        steps: [
          "설정 → Windows 업데이트에서 대기 중인 업데이트를 모두 설치하고 재부팅합니다.",
          "VPN을 사용 중이면 연결을 끊습니다.",
          ".NET 3.5라면 Win + R → optionalfeatures 에서 ‘.NET Framework 3.5(.NET 2.0 및 3.0 포함)’를 체크하고 확인을 누릅니다.",
          "DISM 복구라면 관리자 터미널에서 DISM /Online /Cleanup-Image /RestoreHealth 를 /Source 없이 실행합니다.",
        ],
        checkPoint:
          "이번에 성공하면 원본 다운로드 경로 문제였을 가능성이 큽니다. 같은 0x800F081F가 나오면 오프라인 원본을 직접 지정하는 단계로 넘어갑니다.",
      },
      {
        title: "지정한 원본 경로가 실제로 열리는지 확인",
        reason:
          "Microsoft 문서는 지정한 경로에 필요한 파일이 없거나, 읽기 권한이 없거나, 파일 세트가 불완전할 때 이 코드가 난다고 설명합니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "탑재한 ISO나 USB의 드라이브 문자를 파일 탐색기에서 확인합니다(예: E:).",
          "E:\\sources\\sxs 폴더를 직접 열어 microsoft-windows-netfx3-ondemand-package 로 시작하는 .cab 파일이 있는지 봅니다.",
          "DISM 복구용이면 E:\\sources 폴더에 install.wim 또는 install.esd 중 무엇이 있는지 확인합니다.",
          "명령에 적은 드라이브 문자와 폴더 이름이 실제와 한 글자도 다르지 않은지 비교합니다.",
        ],
        checkPoint:
          "폴더가 열리지 않거나 파일이 없으면 ISO를 다시 받거나 탑재부터 다시 합니다. 파일이 있는데도 실패하면 ISO 버전이 현재 Windows와 다른지 다음 단계에서 맞춰 봅니다.",
      },
      {
        title: "같은 버전 ISO로 .NET Framework 3.5 오프라인 설치",
        reason:
          "Windows Update를 거치지 않고 설치 미디어의 sxs 폴더를 원본으로 쓰면, 다운로드 경로 문제와 원본 누락을 함께 피할 수 있습니다.",
        difficulty: "보통",
        time: "20~40분",
        steps: [
          "Microsoft 공식 다운로드 페이지에서 1단계에서 적은 버전·언어와 같은 Windows ISO를 받고, 더블클릭해 탑재합니다.",
          "시작 버튼을 마우스 오른쪽 클릭 → 터미널(관리자)을 엽니다. Windows 10은 Windows PowerShell(관리자)입니다.",
          "DISM /Online /Enable-Feature /FeatureName:NetFx3 /All /Source:E:\\sources\\sxs /LimitAccess 를 실행합니다. E는 탑재된 드라이브 문자로 바꿉니다.",
        ],
        checkPoint:
          "‘작업을 완료했습니다’가 나오면 끝입니다. 다시 0x800F081F가 나오면 ISO의 빌드가 현재 Windows와 다를 수 있으니 winver 결과와 ISO 버전을 다시 비교합니다.",
      },
      {
        title: "DISM 복구에 install.wim을 원본으로 지정",
        reason:
          "구성요소 저장소를 고치는 /RestoreHealth는 sxs 폴더가 아니라 설치 이미지 안의 파일을 쓰므로, 에디션에 맞는 이미지 번호까지 지정해야 합니다.",
        difficulty: "보통",
        time: "20~40분",
        steps: [
          "관리자 터미널에서 DISM /Get-WimInfo /WimFile:E:\\sources\\install.wim 를 실행해 내 에디션(예: Windows 11 Pro)의 인덱스 번호를 찾습니다.",
          "DISM /Online /Cleanup-Image /RestoreHealth /Source:WIM:E:\\sources\\install.wim:6 /LimitAccess 처럼 끝의 숫자를 찾은 인덱스로 바꿔 실행합니다.",
          "ISO에 install.esd만 있으면 경로와 접두어를 ESD:E:\\sources\\install.esd:6 형식으로 바꿉니다.",
          "완료되면 sfc /scannow 를 실행하고 재부팅합니다.",
        ],
        checkPoint:
          "복원 작업이 완료되면 원래 하려던 업데이트나 기능 설치를 다시 시도합니다. 맞는 ISO로도 실패하면 Windows 업데이트로 시스템을 다시 설치하는 방법을 검토합니다(개인 파일 백업 먼저).",
      },
    ],
    faqs: [
      {
        question: "인터넷에서 받은 아무 Windows ISO나 써도 되나요?",
        answer:
          "안 됩니다. Microsoft는 버전이 다른 원본으로 .NET 3.5를 설치하면 지원·업데이트가 어려운 상태가 될 수 있다고 경고합니다. Microsoft 공식 페이지에서 현재와 같은 버전·언어의 ISO를 받으세요.",
      },
      {
        question: "0x800F081F와 0x800F0906은 무엇이 다른가요?",
        answer:
          "0x800F0906은 Windows Update에서 파일을 내려받지 못한 경우이고, 0x800F081F는 원본 위치를 찾았지만 필요한 파일이 없거나 맞지 않는 경우에 더 자주 나옵니다. 그래서 081F는 지정한 경로와 이미지 버전을 먼저 봅니다.",
      },
    ],
    sources: [SRC_WU_ERRORS, SRC_NETFX35_ERRORS, SRC_NETFX35_DISM],
  },

  "0x800f0906": {
    reviewedAt: "2026-11-19",
    description:
      "0x800F0906(CBS_E_DOWNLOAD_FAILURE)은 .NET Framework 3.5 같은 주문형 기능을 켤 때 Windows Update에서 원본 파일을 내려받지 못했다는 뜻입니다. 기능 설치 파일은 PC에 들어 있지 않고 켤 때 받아 오기 때문에, 인터넷·프록시·회사 업데이트 서버 설정이 결과를 좌우합니다. 네트워크 경로가 막혔는지, 조직 정책이 막았는지부터 나눕니다.",
    quickCheck: [
      "브라우저에서 다른 사이트는 정상적으로 열리나요? 아무 사이트도 안 열리면 인터넷 연결 문제부터 해결해야 합니다.",
      "회사·학교에서 지급한 PC인가요? 그렇다면 WSUS 같은 관리 서버가 원본 다운로드를 막고 있을 수 있습니다.",
      "VPN이나 수동 프록시를 켜 둔 상태에서 시도했나요?",
    ],
    causes: [
      "Windows Update 서버에 연결하지 못하는 네트워크 상태",
      "쓰지 않는 수동 프록시·VPN이 연결 경로를 바꿈",
      "조직 정책이 Windows Update 대신 관리 서버를 쓰도록 지정",
      "보안 프로그램의 웹 필터가 다운로드를 차단",
    ],
    solutions: [
      {
        title: "VPN을 끄고 수동 프록시 설정 확인",
        reason:
          "Microsoft 문서는 이 코드의 원인으로 네트워크·프록시·방화벽 구성을 먼저 꼽으므로, 가장 쉽게 바뀌는 연결 경로부터 정리합니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "작업 표시줄이나 VPN 앱에서 VPN 연결을 끊습니다.",
          "설정 → 네트워크 및 인터넷 → 프록시에서 ‘수동 프록시 설정’의 ‘프록시 서버 사용’이 켜져 있는지 봅니다.",
          "지금 쓰는 프록시가 아니라면 끕니다. 회사에서 지정한 프록시라면 그대로 두고 관리자에게 문의합니다.",
        ],
        checkPoint:
          "프록시나 VPN을 끈 상태에서 다음 단계의 기능 설치가 성공하면 그 경로가 원인이었을 가능성이 큽니다. 아무것도 켜져 있지 않았다면 그대로 다음 단계로 갑니다.",
      },
      {
        title: "Windows 기능 창에서 .NET 3.5 다시 켜기",
        reason:
          "연결 경로를 정리한 뒤 같은 기능을 다시 요청하면, 일시적인 다운로드 실패였는지 바로 구분할 수 있습니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "Win + R을 누르고 optionalfeatures 를 입력합니다.",
          "‘.NET Framework 3.5(.NET 2.0 및 3.0 포함)’에 체크하고 확인을 누릅니다.",
          "‘Windows 업데이트에서 파일 다운로드’가 나오면 선택하고 끝날 때까지 기다립니다.",
        ],
        checkPoint:
          "설치가 끝나고 재부팅을 요청하면 해결된 것입니다. 다시 0x800F0906이 뜨면 WinHTTP 프록시와 보안 필터를 확인합니다.",
      },
      {
        title: "WinHTTP 프록시와 보안 프로그램 웹 필터 확인",
        reason:
          "Windows Update는 브라우저와 별도로 WinHTTP 프록시 설정을 쓰기 때문에, 브라우저는 되는데 기능 설치만 실패하는 경우가 있습니다.",
        difficulty: "보통",
        time: "10분",
        steps: [
          "시작 버튼을 마우스 오른쪽 클릭 → 터미널(관리자)을 엽니다.",
          "netsh winhttp show proxy 를 실행합니다. ‘직접 액세스(프록시 서버 없음)’이 정상입니다.",
          "개인 PC인데 모르는 프록시 주소가 나오면 netsh winhttp reset proxy 를 실행합니다.",
          "타사 백신의 웹 보호·HTTPS 검사 기능을 잠시 끄고 기능 설치를 다시 시도한 뒤, 바로 다시 켭니다.",
        ],
        checkPoint:
          "프록시 초기화나 필터 해제 후 성공하면 그 설정이 다운로드를 막았던 것입니다. 보안 프로그램이 원인이면 Microsoft 업데이트 주소를 예외로 두는 방법을 제조사 안내에서 찾습니다.",
      },
      {
        title: "설치 ISO의 sxs 폴더로 오프라인 설치",
        reason:
          "다운로드 경로를 끝내 열 수 없으면, 설치 미디어에 들어 있는 .NET 3.5 원본을 직접 지정해 인터넷 없이 설치할 수 있습니다.",
        difficulty: "보통",
        time: "20~40분",
        steps: [
          "Win + R → winver 로 현재 버전을 확인하고, Microsoft 공식 페이지에서 같은 버전·언어의 ISO를 받아 더블클릭해 탑재합니다.",
          "관리자 터미널에서 DISM /Online /Enable-Feature /FeatureName:NetFx3 /All /Source:D:\\sources\\sxs /LimitAccess 를 실행합니다. D는 탑재된 드라이브 문자로 바꿉니다.",
          "/LimitAccess는 Windows Update에 다시 접속하지 않도록 막는 옵션이므로 그대로 둡니다.",
        ],
        checkPoint:
          "완료되면 끝입니다. 이번에는 0x800F081F가 나온다면 ISO 버전이 현재 Windows와 맞지 않거나 sxs 폴더가 비어 있을 수 있습니다.",
      },
      {
        title: "관리되는 PC는 원본 정책 확인 요청",
        reason:
          "WSUS를 쓰도록 설정된 PC는 관리 서버에 기능 파일이 없으면 계속 실패하므로, 정책을 바꿀 권한이 있는 관리자가 처리해야 합니다.",
        difficulty: "보통",
        time: "관리자 처리 시간",
        steps: [
          "관리자에게 오류 코드 0x800F0906과 설치하려는 기능(.NET Framework 3.5)을 알립니다.",
          "관리자는 컴퓨터 구성 → 관리 템플릿 → 시스템의 ‘선택적 구성 요소 설치 및 구성 요소 복구에 대한 설정 지정’ 정책에서 대체 원본 경로를 넣거나 Windows Update에서 직접 받도록 허용할 수 있습니다.",
          "정책이 바뀐 뒤 관리자 터미널에서 gpupdate /force 를 실행하고 다시 설치합니다.",
        ],
        checkPoint:
          "정책 적용 후 설치되면 마칩니다. 개인 PC인데 이 정책이 걸려 있다면 예전에 회사 관리 도구나 최적화 프로그램이 남긴 설정일 수 있으니, 직접 지우기 전에 판매처나 관리자에게 확인합니다.",
      },
    ],
    faqs: [
      {
        question: "방화벽을 완전히 끄고 설치하면 되나요?",
        answer:
          "권하지 않습니다. 방화벽 전체를 끄기보다 VPN·프록시·보안 프로그램의 웹 필터를 하나씩 비교하는 편이 안전하고 원인도 정확히 남습니다.",
      },
      {
        question: "Home 에디션에는 그룹 정책 편집기가 없는데 어떻게 하나요?",
        answer:
          "개인 Home PC라면 대부분 정책 문제보다는 연결 문제입니다. 프록시를 정리해도 안 되면 ISO의 sxs 폴더로 오프라인 설치하는 방법을 쓰면 됩니다.",
      },
    ],
    sources: [SRC_NETFX35_ERRORS, SRC_NETFX35_DISM],
  },

  "0x800f0922": {
    reviewedAt: "2026-11-19",
    description:
      "0x800F0922(CBS_E_INSTALLERS_FAILED)는 업데이트 파일을 받은 뒤 설치 마지막 단계의 처리 작업이 실패해 변경 사항을 되돌렸다는 뜻입니다. 같은 코드가 누적 업데이트, .NET 3.5 설치, 기능 업그레이드에서 모두 나올 수 있어 어떤 작업에서 났는지와 CBS 로그 내용이 원인을 가릅니다. 재부팅 중 ‘변경 내용을 되돌리는 중’이 보였는지도 함께 기억해 둡니다.",
    quickCheck: [
      "업데이트 기록에서 실패한 항목이 누적 업데이트(KB)인지, .NET Framework 관련인지, 기능 업데이트인지 확인했나요?",
      "VPN이 연결된 상태에서 설치했나요? VPN을 끄고 한 번 더 시도해 볼 가치가 있습니다.",
      "최근 듀얼 부팅을 만들거나 디스크를 교체·복제했나요? 그렇다면 시스템 파티션 공간을 볼 필요가 있습니다.",
    ],
    causes: [
      "설치 후처리(advanced installer) 단계 실패",
      "VPN·프록시로 설치 중 필요한 서버 접근 실패",
      "EFI 시스템 파티션·시스템 예약 파티션의 여유 공간 부족",
      "구성요소 저장소나 시스템 파일 손상",
      "설치 원본 폴더의 권한 문제(.NET 3.5)",
    ],
    solutions: [
      {
        title: "실패한 KB 번호와 시각 기록 후 재부팅해서 한 번 더 시도",
        reason:
          "되돌리기가 끝난 직후에는 남은 작업이 정리되지 않았을 수 있고, 시각을 알아야 뒤에서 CBS 로그의 해당 줄을 찾을 수 있습니다.",
        difficulty: "쉬움",
        time: "10~30분",
        steps: [
          "설정 → Windows 업데이트 → 업데이트 기록에서 실패한 항목의 이름, KB 번호, 날짜를 적습니다.",
          "PC를 재부팅합니다(시스템 종료가 아니라 ‘다시 시작’).",
          "설정 → Windows 업데이트에서 다시 시도를 누르고, 끝날 때까지 다른 설치 작업을 하지 않습니다.",
        ],
        checkPoint:
          "두 번째 시도에서 설치되면 일시적인 처리 실패였을 수 있습니다. 같은 KB가 같은 코드로 다시 실패하면 연결 경로를 정리하는 다음 단계로 갑니다.",
      },
      {
        title: "VPN을 끄고 Windows 업데이트 문제 해결사 실행",
        reason:
          "VPN이 설치 중 필요한 서버 접근을 바꿀 수 있어 먼저 빼 보고, 문제 해결사로 업데이트 서비스 상태를 함께 점검합니다.",
        difficulty: "쉬움",
        time: "10~15분",
        steps: [
          "VPN 연결을 끊고, 설정 → 네트워크 및 인터넷 → 프록시에서 쓰지 않는 수동 프록시를 끕니다.",
          "설정 → 시스템 → 문제 해결 → 기타 문제 해결사에서 Windows 업데이트 옆의 실행을 누릅니다. Windows 10은 설정 → 업데이트 및 보안 → 문제 해결 → 추가 문제 해결사입니다.",
          "제안된 수정을 적용하고 재부팅한 뒤 같은 KB를 다시 설치합니다.",
        ],
        checkPoint:
          "문제 해결사가 수정한 항목이 있고 설치가 성공하면 끝입니다. ‘문제를 찾을 수 없음’이 나오고 계속 실패하면 로그를 봐야 합니다.",
      },
      {
        title: "CBS.log에서 실패 시각 근처 오류 찾기",
        reason:
          "같은 0x800F0922라도 원인이 여러 가지라서, 어떤 설치 처리기가 실패했는지는 CBS 로그에만 구체적으로 남습니다.",
        difficulty: "보통",
        time: "15~20분",
        steps: [
          "파일 탐색기 주소창에 C:\\Windows\\Logs\\CBS 를 입력하고, CBS.log를 바탕 화면에 복사합니다(원본을 직접 열면 사용 중이라 안 열릴 수 있습니다).",
          "복사본을 메모장으로 열고 Ctrl + F로 0x800f0922 를 검색합니다.",
          "1단계에서 적은 시각 근처에서 Failed나 Error가 붙은 줄, 그리고 그 위에 나오는 패키지·구성요소 이름을 적습니다.",
        ],
        checkPoint:
          "로그에 .NET이나 특정 언어 팩·기능 이름이 보이면 그 기능을 먼저 다룹니다. 파일 손상을 가리키는 줄이 많으면 다음 단계의 DISM·sfc로 넘어갑니다.",
      },
      {
        title: "DISM과 sfc로 구성요소 점검",
        reason:
          "설치 후처리는 기존 구성요소 저장소를 기반으로 진행되므로, 저장소가 손상돼 있으면 마지막 단계에서 실패할 수 있습니다.",
        difficulty: "보통",
        time: "20~40분",
        steps: [
          "Win + X를 누르고 터미널(관리자)을 선택합니다. Windows 10은 Windows PowerShell(관리자)입니다.",
          "DISM /Online /Cleanup-Image /RestoreHealth 를 실행하고 100%까지 기다립니다.",
          "이어서 sfc /scannow 를 실행한 뒤 재부팅하고 업데이트를 다시 설치합니다.",
        ],
        checkPoint:
          "DISM이 손상을 고쳤다고 나오고 업데이트가 성공하면 끝입니다. DISM 자체가 0x800F081F 같은 다른 코드로 실패하면 그 코드 안내를 먼저 따릅니다.",
      },
      {
        title: "EFI·시스템 예약 파티션 여유 공간은 보기만 하기",
        reason:
          "부팅 파일을 바꾸는 업데이트는 작은 시스템 파티션에 공간이 있어야 하므로, 공간이 거의 없으면 이 코드의 원인 후보가 됩니다.",
        difficulty: "어려움",
        time: "5분(확인만)",
        steps: [
          "Win + X → 디스크 관리를 엽니다.",
          "디스크 0에서 ‘EFI 시스템 파티션’ 또는 ‘시스템 예약’ 파티션의 용량과 사용 가능 공간을 확인합니다. 이 단계에서는 아무것도 바꾸지 않습니다.",
          "여유가 수 MB 수준이면 최근 설치한 듀얼 부팅·부팅 관리 도구가 있는지 떠올려 적어 둡니다.",
          "파티션 정리나 크기 조정은 전체 백업을 만든 뒤 Microsoft 지원이나 전문가 안내를 받아 진행합니다.",
        ],
        checkPoint:
          "공간이 충분하면 이 원인은 제외하고 CBS 로그 내용으로 돌아갑니다. 공간이 부족해 보여도 파티션을 임의로 지우거나 늘리면 부팅이 안 될 수 있으니 혼자 진행하지 않습니다.",
      },
    ],
    faqs: [
      {
        question: "0x800F0922는 항상 시스템 파티션 공간 문제인가요?",
        answer:
          "아닙니다. 서비스 처리 실패, VPN, 구성요소 손상 등 여러 원인이 같은 코드를 냅니다. 로그로 확인하기 전에 시스템 파티션을 건드리는 것은 권하지 않습니다.",
      },
      {
        question: ".NET Framework 3.5를 켤 때도 이 코드가 나오는데 같은 문제인가요?",
        answer:
          "Microsoft 문서에 따르면 이 코드는 .NET 전용이 아닙니다. 설치 원본을 지정했다면 그 sxs 폴더에 ‘읽기 및 실행’ 권한이 있는지 확인한 뒤 DISM으로 다시 설치해 보세요.",
      },
    ],
    sources: [SRC_WU_ERRORS, SRC_NETFX35_ERRORS],
  },

  "0x80070422": {
    reviewedAt: "2026-11-19",
    description:
      "0x80070422(ERROR_SERVICE_DISABLED)는 작업에 필요한 Windows 서비스가 ‘사용 안 함’으로 설정돼 시작조차 못 했다는 뜻입니다. 업데이트 확인을 누르자마자 실패하거나 Microsoft Store·기능 설치가 바로 멈출 때 주로 보입니다. 어느 서비스가 꺼졌는지와, 누가 그것을 껐는지(최적화 프로그램·정책)를 나눠 보면 됩니다.",
    quickCheck: [
      "‘업데이트 확인’을 누르자마자 1~2초 안에 이 코드가 나오나요? 그렇다면 다운로드 문제가 아니라 서비스가 꺼진 상태일 가능성이 큽니다.",
      "업데이트 차단·PC 최적화·게임 부스터 같은 프로그램을 설치한 적이 있나요?",
      "오류가 Windows 업데이트에서 나나요, Microsoft Store 앱 설치에서 나나요?",
    ],
    causes: [
      "Windows Update 서비스 시작 유형이 ‘사용 안 함’",
      "BITS·Cryptographic Services 같은 연관 서비스 중지",
      "최적화·업데이트 차단 도구가 서비스를 다시 끔",
      "조직 정책으로 서비스가 제한됨",
      "Store 설치 시 Windows Defender 방화벽 서비스 중지",
    ],
    solutions: [
      {
        title: "서비스 창에서 Windows Update 상태 보기",
        reason:
          "Microsoft 문서는 이 코드가 Windows Update 서비스가 실행되지 않을 때 난다고 설명하므로, 실제 상태를 눈으로 확인하는 것이 첫 단계입니다.",
        difficulty: "쉬움",
        time: "2분",
        steps: [
          "Win + R을 누르고 services.msc 를 입력합니다.",
          "목록에서 Windows Update를 찾아 ‘상태’와 ‘시작 유형’ 열을 봅니다.",
          "시작 유형이 ‘사용 안 함’인지 적어 둡니다.",
        ],
        checkPoint:
          "‘사용 안 함’이면 다음 단계에서 되돌립니다. ‘수동’이나 ‘자동’인데도 오류가 나면 3단계의 연관 서비스를 확인합니다.",
      },
      {
        title: "Windows Update 시작 유형을 수동으로 되돌리고 시작",
        reason:
          "Windows Update 서비스의 기본값은 필요할 때 켜지는 ‘수동’이므로, 이 값으로 돌려놓으면 업데이트 확인 시 다시 시작될 수 있습니다.",
        difficulty: "쉬움",
        time: "3분",
        steps: [
          "services.msc 에서 Windows Update를 두 번 클릭합니다.",
          "시작 유형을 ‘수동’으로 바꾸고 적용 → 시작을 누릅니다.",
          "명령으로 하려면 관리자 터미널에서 sc config wuauserv start= demand 와 net start wuauserv 를 차례로 실행합니다(start= 뒤의 공백 필요).",
          "설정 → Windows 업데이트에서 업데이트 확인을 누릅니다.",
        ],
        checkPoint:
          "업데이트 목록을 불러오면 해결된 것입니다. 재부팅 후 다시 ‘사용 안 함’으로 돌아가 있다면 4단계에서 되돌리는 프로그램을 찾습니다.",
      },
      {
        title: "BITS와 Cryptographic Services 함께 확인",
        reason:
          "업데이트 다운로드는 BITS가, 서명 확인은 Cryptographic Services가 맡기 때문에 둘 중 하나만 꺼져도 같은 코드가 날 수 있습니다.",
        difficulty: "쉬움",
        time: "3분",
        steps: [
          "services.msc 에서 Background Intelligent Transfer Service의 시작 유형이 ‘사용 안 함’이 아닌지 봅니다. 꺼져 있으면 ‘수동’으로 바꿉니다.",
          "Cryptographic Services는 ‘자동’이고 상태가 ‘실행 중’인지 확인합니다.",
          "바꾼 서비스가 있으면 시작을 누른 뒤 업데이트를 다시 확인합니다.",
        ],
        checkPoint:
          "연관 서비스를 켠 뒤 성공하면 끝입니다. 세 서비스가 모두 정상인데 실패하면 Store·기능 설치 쪽인지 5단계에서 확인합니다.",
      },
      {
        title: "서비스를 다시 끄는 프로그램·정책 찾기",
        reason:
          "서비스를 켜도 재부팅하면 다시 꺼진다면, 업데이트 차단 도구나 정책이 시작할 때마다 설정을 덮어쓰고 있을 수 있습니다.",
        difficulty: "보통",
        time: "10분",
        steps: [
          "설정 → 앱 → 설치된 앱(Windows 10은 앱 및 기능)에서 업데이트 차단·최적화·서비스 관리 도구를 찾습니다.",
          "해당 프로그램 안에서 ‘업데이트 차단’ 옵션을 끄거나 프로그램을 제거한 뒤 재부팅합니다.",
          "설정 → Windows 업데이트 위쪽에 ‘일부 설정은 조직에서 관리합니다’가 보이면 관리자에게 문의합니다.",
        ],
        checkPoint:
          "프로그램을 정리한 뒤 재부팅해도 서비스가 ‘수동’으로 유지되면 원인을 찾은 것입니다. 회사 PC라면 정책을 직접 바꾸지 말고 관리자 결정을 따릅니다.",
      },
      {
        title: "Store·기능 설치에서 나면 방화벽 서비스 확인",
        reason:
          "Microsoft Store 앱 설치나 일부 기능 설치는 Windows Defender 방화벽 서비스가 꺼져 있으면 이 코드로 실패할 수 있습니다.",
        difficulty: "쉬움",
        time: "3분",
        steps: [
          "services.msc 에서 Windows Defender Firewall 서비스를 찾습니다.",
          "시작 유형이 ‘자동’이고 상태가 ‘실행 중’인지 확인합니다. 꺼져 있으면 ‘자동’으로 바꾸고 시작합니다.",
          "Store 앱 설치나 기능 설치를 다시 시도합니다.",
        ],
        checkPoint:
          "방화벽 서비스를 켠 뒤 설치되면 그 서비스가 원인이었을 가능성이 큽니다. 타사 방화벽을 쓰면서 Windows 방화벽 서비스를 껐다면, 타사 제품 안내에서 함께 쓰는 방법을 확인합니다.",
      },
    ],
    faqs: [
      {
        question: "서비스 목록을 전부 ‘자동’으로 바꾸면 빨리 해결되지 않나요?",
        answer:
          "서비스마다 기본값이 다르고, 불필요하게 자동으로 바꾸면 부팅이 느려지거나 다른 문제가 생길 수 있습니다. 이 오류와 관련된 서비스만 기본값으로 돌리세요.",
      },
      {
        question: "업데이트를 막으려고 일부러 서비스를 껐는데요?",
        answer:
          "서비스를 끄면 보안 업데이트까지 모두 멈춥니다. 업데이트를 미루고 싶다면 설정 → Windows 업데이트의 ‘업데이트 일시 중지’를 쓰는 편이 안전합니다.",
      },
    ],
    sources: [SRC_WU_ERRORS],
  },

  "0x80073712": {
    reviewedAt: "2026-11-19",
    description:
      "0x80073712는 Windows 구성요소 저장소(WinSxS)에 업데이트 설치에 필요한 파일이나 정보가 없거나 손상됐다는 뜻입니다. 같은 누적 업데이트가 며칠째 반복 실패하는 형태로 많이 나타납니다. 캐시 삭제로는 고쳐지지 않는 경우가 많아, DISM 복구가 성공하는지를 기준으로 다음 단계를 정합니다.",
    quickCheck: [
      "재부팅을 기다리는 업데이트가 있나요? 설정 → Windows 업데이트에 ‘다시 시작 필요’가 보이면 먼저 재부팅합니다.",
      "실패하는 것이 특정 KB 하나인가요, 모든 업데이트인가요?",
      "업데이트 도중 전원이 꺼지거나 강제 종료한 적이 있나요?",
    ],
    causes: [
      "구성요소 매니페스트·카탈로그 손상",
      "중간에 끊긴 이전 업데이트",
      "디스크 오류로 인한 시스템 파일 손상",
      "일부만 설치된 구성요소가 남은 상태",
    ],
    solutions: [
      {
        title: "보류된 재부팅부터 끝내기",
        reason:
          "재부팅이 필요한 작업이 남아 있으면 구성요소 저장소가 중간 상태로 보일 수 있어, 복구 명령보다 먼저 정리해야 합니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "작업을 저장하고 시작 → 전원 → 다시 시작을 누릅니다.",
          "재부팅 화면에서 ‘업데이트 작업 중’이 나오면 끝날 때까지 전원을 끄지 않습니다.",
          "로그인 후 설정 → Windows 업데이트에서 다시 시도합니다.",
        ],
        checkPoint:
          "재부팅 후 설치되면 보류 작업 때문이었습니다. 같은 0x80073712가 나오면 DISM으로 저장소 상태를 검사합니다.",
      },
      {
        title: "DISM으로 구성요소 저장소 검사와 복구",
        reason:
          "이 코드는 구성요소 저장소 자체의 손상을 가리키므로, 저장소를 Windows Update 원본으로 고치는 DISM이 핵심 단계입니다.",
        difficulty: "보통",
        time: "20~40분",
        steps: [
          "작업 표시줄 검색에 터미널을 입력하고 ‘관리자 권한으로 실행’을 누릅니다.",
          "DISM /Online /Cleanup-Image /ScanHealth 로 손상 여부를 먼저 확인합니다.",
          "DISM /Online /Cleanup-Image /RestoreHealth 를 실행하고 ‘복원 작업을 완료했습니다’가 나오는지 봅니다. 중간에 20%나 62%에서 오래 멈춘 것처럼 보여도 기다립니다.",
        ],
        checkPoint:
          "복원이 완료되면 sfc 단계로 갑니다. RestoreHealth가 0x800F081F로 실패하면 원본이 필요하다는 뜻이므로 같은 버전 ISO를 원본으로 지정하는 방법을 씁니다.",
      },
      {
        title: "sfc로 시스템 파일 점검 후 업데이트 재시도",
        reason:
          "DISM이 저장소를 고친 뒤 sfc를 돌리면, 그 저장소를 기준으로 실제 시스템 파일까지 맞춰 줍니다.",
        difficulty: "쉬움",
        time: "15~20분",
        steps: [
          "같은 관리자 터미널에서 sfc /scannow 를 실행합니다.",
          "검사가 100% 끝나면 재부팅합니다.",
          "설정 → Windows 업데이트에서 실패했던 업데이트를 다시 설치합니다.",
        ],
        checkPoint:
          "설치되면 마칩니다. 다른 업데이트는 되는데 특정 KB만 계속 실패하면 카탈로그 수동 설치를 시도합니다.",
      },
      {
        title: "Microsoft Update 카탈로그로 해당 KB 직접 설치",
        reason:
          "Windows Update가 받는 차등 패키지 대신 완전한 독립 실행형 패키지를 쓰면, 일부 손상된 조각을 거치지 않고 설치될 수 있습니다.",
        difficulty: "보통",
        time: "15~30분",
        steps: [
          "업데이트 기록에서 실패한 KB 번호를 확인합니다.",
          "브라우저에서 catalog.update.microsoft.com 에 접속해 KB 번호를 검색합니다.",
          "현재 Windows 버전(winver)과 시스템 종류(x64·ARM64)에 맞는 항목을 받아 .msu 파일을 실행하고 재부팅합니다.",
        ],
        checkPoint:
          "수동 설치가 성공하면 끝입니다. 수동 설치도 0x80073712로 실패하고 DISM 복구도 안 되면 마지막 단계를 검토합니다.",
      },
      {
        title: "백업 후 Windows 업데이트로 시스템 다시 설치",
        reason:
          "저장소 손상이 DISM으로도 복구되지 않으면, 앱과 파일을 유지하면서 Windows 시스템 파일 전체를 새로 쓰는 방법이 남습니다.",
        difficulty: "어려움",
        time: "1~2시간",
        steps: [
          "문서·사진·바탕 화면 등 중요한 파일을 외장 드라이브나 클라우드에 먼저 백업합니다.",
          "BitLocker를 쓰는 PC라면 Microsoft 계정에서 복구 키를 미리 확인해 둡니다.",
          "Windows 11은 설정 → 시스템 → 복구 → ‘Windows 업데이트를 사용하여 문제 해결’의 ‘지금 다시 설치’를 누릅니다.",
          "이 항목이 없으면(Windows 10 등) 같은 버전 공식 ISO를 탑재해 setup.exe를 실행하고 ‘개인 파일 및 앱 유지’를 선택합니다.",
        ],
        checkPoint:
          "다시 설치가 끝나면 Windows 업데이트를 확인해 남은 업데이트가 정상 설치되는지 봅니다. 이 과정도 실패하면 디스크 상태 점검이나 전문가 상담이 필요할 수 있습니다.",
      },
    ],
    faqs: [
      {
        question: "SoftwareDistribution 폴더만 지우면 해결되나요?",
        answer:
          "이 코드는 다운로드 캐시가 아니라 구성요소 저장소 손상을 가리키는 경우가 많아, 캐시 삭제만으로는 해결되지 않을 수 있습니다. DISM 결과를 먼저 확인하세요.",
      },
      {
        question: "DISM이 오래 걸리는데 중간에 꺼도 되나요?",
        answer:
          "끄지 마세요. 진행률이 한동안 멈춘 것처럼 보이는 것은 흔한 일입니다. 중간에 끊으면 저장소 상태가 더 나빠질 수 있습니다.",
      },
    ],
    warning:
      "‘지금 다시 설치’나 setup.exe 업그레이드는 시스템 파일을 덮어쓰는 작업입니다. 개인 파일 유지 옵션을 골라도 시작 전에 중요한 파일을 백업하세요.",
    sources: [SRC_WU_ERRORS],
  },

  "0x80070020": {
    reviewedAt: "2026-11-19",
    description:
      "0x80070020(ERROR_SHARING_VIOLATION)은 업데이트가 바꿔야 할 파일을 다른 프로그램이 붙잡고 있어 접근하지 못했다는 뜻입니다. Microsoft는 백신 같은 타사 필터 드라이버를 대표 원인으로 듭니다. 동시에 돌던 검사·설치가 끝나면 풀리는 일시적 충돌인지, 매번 같은 프로그램이 막는지를 나눕니다.",
    quickCheck: [
      "업데이트하는 동안 백신 전체 검사, 백업 프로그램, 다른 프로그램 설치가 돌고 있었나요?",
      "재부팅 직후 다른 앱을 열지 않은 상태에서도 같은 코드가 나오나요?",
      "기능 업그레이드(예: 23H2 → 24H2) 중에 났나요, 월간 업데이트 중에 났나요?",
    ],
    causes: [
      "다른 설치·업데이트가 동시에 진행",
      "백신·보안 프로그램의 파일 실시간 검사",
      "백업·동기화 도구가 시스템 파일을 잠금",
      "타사 서비스나 필터 드라이버의 파일 잠금",
    ],
    solutions: [
      {
        title: "진행 중인 검사·설치를 끝내고 재부팅",
        reason:
          "파일을 잡고 있던 작업이 끝나고 재부팅하면 잠금이 풀리므로, 가장 흔한 동시 실행 충돌은 이 단계에서 해결됩니다.",
        difficulty: "쉬움",
        time: "10~30분",
        steps: [
          "작업 표시줄 오른쪽 알림 영역과 작업 관리자(Ctrl + Shift + Esc)에서 진행 중인 백신 검사, 백업, 다른 설치 프로그램이 있는지 봅니다.",
          "끝날 때까지 기다린 뒤 PC를 다시 시작합니다.",
          "로그인 후 다른 프로그램을 열지 않고 설정 → Windows 업데이트에서 다시 시도합니다.",
        ],
        checkPoint:
          "이번에 설치되면 동시 실행 충돌이었습니다. 아무것도 돌지 않았는데 같은 코드가 나오면 보안 프로그램을 비교합니다.",
      },
      {
        title: "타사 백신 실시간 보호를 잠시 끄고 비교",
        reason:
          "Microsoft 문서가 이 코드의 원인으로 백신 같은 타사 필터 드라이버를 직접 언급하므로, 한 번 끄고 비교하면 범위를 크게 줄일 수 있습니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "타사 백신의 설정에서 실시간 보호(또는 파일 보호)를 일시 중지합니다. 보통 ‘10분’, ‘재시작할 때까지’ 같은 선택지가 있습니다.",
          "그 상태에서 업데이트를 다시 설치합니다.",
          "설치가 끝나면 실시간 보호를 바로 다시 켭니다.",
        ],
        checkPoint:
          "보호를 끈 상태에서만 성공하면 그 제품이 원인일 가능성이 큽니다. 제품을 최신 버전으로 업데이트하고 제조사 지원에 이 코드를 알립니다. 차이가 없으면 클린 부팅으로 넘어갑니다.",
      },
      {
        title: "클린 부팅으로 타사 서비스 없이 설치",
        reason:
          "클린 부팅은 Microsoft 서비스만 남기고 시작하므로, 파일을 잡는 프로그램이 무엇인지 몰라도 한 번에 배제할 수 있습니다.",
        difficulty: "보통",
        time: "20~30분",
        steps: [
          "Win + R → msconfig 를 입력해 시스템 구성을 엽니다.",
          "서비스 탭에서 ‘모든 Microsoft 서비스 숨기기’를 체크하고 ‘모두 사용 안 함’을 누릅니다.",
          "시작 프로그램 탭에서 ‘작업 관리자 열기’를 누르고, 사용 중인 시작 앱을 모두 ‘사용 안 함’으로 바꾼 뒤 어떤 항목을 껐는지 적어 둡니다.",
          "재부팅하고 업데이트를 설치합니다.",
          "끝나면 msconfig 일반 탭에서 ‘정상 시작’을 고르고, 작업 관리자에서 꺼 둔 시작 앱을 다시 켭니다.",
        ],
        checkPoint:
          "클린 부팅에서 설치되면 타사 서비스 중 하나가 원인일 가능성이 큽니다. 꺼 둔 항목을 절반씩 다시 켜 보면 어떤 프로그램인지 좁힐 수 있습니다.",
      },
      {
        title: "업데이트 다운로드 폴더 새로 만들기",
        reason:
          "이전 시도에서 잠긴 채 남은 임시 파일이 다음 설치를 막을 수 있으므로, 다운로드 폴더를 새로 만들어 깨끗하게 받게 합니다.",
        difficulty: "보통",
        time: "10~15분",
        steps: [
          "Win + X → 터미널(관리자)을 열고, 사용자 계정 컨트롤 창에서 예를 누릅니다.",
          "net stop wuauserv 와 net stop bits 를 차례로 실행합니다.",
          "ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old 를 실행합니다.",
          "net start bits 와 net start wuauserv 로 서비스를 다시 켜고 업데이트를 확인합니다.",
        ],
        checkPoint:
          "새로 받아서 설치되면 해결된 것입니다. 업데이트 기록이 비어 보일 수 있지만 설치된 업데이트 자체는 그대로입니다. ‘액세스 거부’로 이름이 안 바뀌면 서비스가 아직 실행 중이니 재부팅 후 다시 합니다.",
      },
      {
        title: "CBS 로그와 Process Monitor로 잠긴 파일 찾기",
        reason:
          "위 단계로도 해결되지 않으면 어떤 파일을 어떤 프로세스가 잡고 있는지 직접 봐야 하며, Microsoft 문서도 이 방법을 안내합니다.",
        difficulty: "어려움",
        time: "30~60분",
        steps: [
          "C:\\Windows\\Logs\\CBS\\CBS.log를 바탕 화면에 복사해 메모장으로 열고, 0x80070020이 나온 줄에서 접근하려던 파일 경로를 적습니다.",
          "Microsoft Sysinternals 공식 페이지에서 Process Monitor를 받아 실행한 뒤 업데이트를 다시 설치합니다.",
          "실패하면 Ctrl + E로 기록을 멈추고, Filter에서 Path contains 에 CBS 로그의 파일 이름을 넣어 그 파일에 접근한 프로세스를 찾습니다.",
          "찾은 프로세스의 프로그램을 업데이트하거나 제조사 안내에 따라 제거한 뒤 다시 설치합니다.",
        ],
        checkPoint:
          "특정 프로그램이 반복해서 보이면 그 프로그램이 잠금 원인일 가능성이 큽니다. 시스템 프로세스만 보인다면 결과 파일을 보관해 Microsoft 지원에 문의합니다.",
      },
    ],
    faqs: [
      {
        question: "보안 프로그램을 아예 삭제해야 하나요?",
        answer:
          "먼저 실시간 보호를 잠시 끄거나 클린 부팅으로 비교하세요. 특정 제품이 원인으로 확인되면 최신 버전 업데이트나 제조사의 수정 안내를 따르는 것이 우선입니다.",
      },
      {
        question: "Windows 업그레이드 중에도 이 코드가 나오는데 방법이 같나요?",
        answer:
          "네. Microsoft 업그레이드 문서도 0x80070020에 대해 msconfig로 클린 부팅한 뒤 다시 시도하라고 안내합니다.",
      },
    ],
    sources: [SRC_WU_ERRORS, SRC_CLEAN_BOOT, SRC_UPGRADE_RESOLUTION],
  },

  "0x80072ee2": {
    reviewedAt: "2026-11-19",
    description:
      "0x80072EE2(WININET_E_TIMEOUT)는 Windows Update가 업데이트 서버에 요청을 보냈지만 정해진 시간 안에 응답을 받지 못했다는 뜻입니다. 업데이트 확인 단계에서 오래 돌다가 실패하는 경우가 많고, PC 파일 손상보다는 통신 경로 문제일 가능성이 큽니다. 다른 네트워크에서도 같은지 비교하면 PC 쪽인지 네트워크 쪽인지 빠르게 갈립니다.",
    quickCheck: [
      "브라우저로 다른 사이트는 빠르게 열리나요, 아니면 인터넷 전체가 느린가요?",
      "휴대폰 핫스팟에 연결하면 업데이트 확인이 되나요? 된다면 집·회사 네트워크 쪽 원인일 가능성이 큽니다.",
      "회사 PC라서 WSUS·Intune 같은 관리 서버에서 업데이트를 받나요?",
    ],
    causes: [
      "느리거나 불안정한 인터넷 연결",
      "VPN·프록시를 거치며 응답 지연",
      "WinHTTP 프록시에 남은 옛 설정",
      "보안 프로그램·공유기 필터의 업데이트 주소 차단",
      "조직 업데이트 서버 연결 실패",
    ],
    solutions: [
      {
        title: "VPN을 끄고 다른 네트워크에서 비교",
        reason:
          "시간 초과는 경로 문제인 경우가 많아서, 네트워크만 바꿔 같은 동작을 해 보면 PC 문제인지 네트워크 문제인지 바로 나뉩니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "VPN을 쓰고 있다면 연결을 끊고 설정 → Windows 업데이트에서 업데이트 확인을 누릅니다.",
          "그래도 시간이 초과되면 휴대폰 핫스팟에 연결해 같은 확인을 해 봅니다.",
          "핫스팟 데이터 사용량이 걱정되면 ‘업데이트 확인’까지만 해 보고 다운로드는 원래 네트워크에서 합니다.",
        ],
        checkPoint:
          "핫스팟에서는 되면 공유기·회사 방화벽·통신사 경로 쪽입니다. 핫스팟에서도 똑같이 실패하면 PC의 프록시·보안 설정을 봅니다.",
      },
      {
        title: "Windows 프록시와 WinHTTP 프록시 정리",
        reason:
          "업데이트 확인은 WinHTTP 설정을 따르므로, 예전에 쓰던 프록시 주소가 남아 있으면 응답 없는 서버를 기다리다 시간이 초과될 수 있습니다.",
        difficulty: "보통",
        time: "5~10분",
        steps: [
          "설정 → 네트워크 및 인터넷 → 프록시에서 쓰지 않는 수동 프록시를 끕니다.",
          "관리자 터미널에서 netsh winhttp show proxy 를 실행합니다.",
          "개인 PC인데 모르는 프록시 서버가 표시되면 netsh winhttp reset proxy 로 직접 연결로 되돌립니다.",
          "업데이트 확인을 다시 누릅니다.",
        ],
        checkPoint:
          "프록시를 정리한 뒤 목록이 뜨면 옛 설정이 원인이었을 가능성이 큽니다. 이미 ‘직접 액세스’였다면 DNS와 보안 필터를 확인합니다.",
      },
      {
        title: "DNS 캐시 비우고 업데이트 서버 이름 확인",
        reason:
          "업데이트 서버 주소를 잘못 기억하고 있거나 DNS 응답이 느리면, 연결 시도가 지연돼 시간 초과로 이어질 수 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "관리자 터미널에서 ipconfig /flushdns 를 실행합니다.",
          "nslookup update.microsoft.com 을 실행해 주소가 바로 돌아오는지 봅니다.",
          "응답이 늦거나 오류가 나면 공유기 전원을 껐다가 1분 뒤 켭니다.",
        ],
        checkPoint:
          "주소가 바로 돌아오는데도 시간 초과가 나면 이름 확인은 정상이므로 보안 필터 쪽을 봅니다. nslookup이 실패하면 DNS 문제부터 해결합니다.",
      },
      {
        title: "보안 프로그램 웹 필터를 잠시 끄고 비교",
        reason:
          "HTTPS 검사나 웹 보호 기능이 업데이트 연결을 중간에서 붙잡으면 응답이 늦어져 시간 초과가 날 수 있습니다.",
        difficulty: "보통",
        time: "10분",
        steps: [
          "타사 보안 프로그램에서 웹 보호·HTTPS 검사·네트워크 보호 기능을 일시 중지합니다.",
          "업데이트 확인을 다시 누릅니다.",
          "결과와 관계없이 확인이 끝나면 보호 기능을 바로 다시 켭니다.",
        ],
        checkPoint:
          "필터를 끈 상태에서만 성공하면 그 제품에서 Microsoft 업데이트 주소를 예외로 두는 방법을 제조사 안내에서 찾습니다.",
      },
      {
        title: "회사 PC는 업데이트 원본 접근을 관리자에게 확인",
        reason:
          "Microsoft 문서는 이 코드가 WSUS·Configuration Manager·Intune 같은 업데이트 원본에 연결하지 못할 때도 난다고 설명하므로, 관리 서버 쪽 확인이 필요합니다.",
        difficulty: "보통",
        time: "관리자 처리 시간",
        steps: [
          "관리자에게 오류 코드 0x80072EE2, 발생 시각, 사용 중인 네트워크(사내·재택 VPN)를 알립니다.",
          "관리자는 업데이트 원본 서버와 방화벽이 이 PC의 접근을 허용하는지 확인합니다.",
        ],
        checkPoint:
          "관리자가 경로를 열어 준 뒤 업데이트 확인이 되면 끝입니다. 개인 PC라면 이 단계는 건너뜁니다.",
      },
    ],
    faqs: [
      {
        question: "시스템 파일 검사(sfc)부터 해야 하나요?",
        answer:
          "연결 시간 초과는 통신 경로 문제인 경우가 대부분이라, 네트워크 비교와 프록시 확인이 먼저입니다. 파일 손상으로 단정하고 복구 명령부터 돌릴 필요는 없습니다.",
      },
      {
        question: "다음 날 다시 해 보니 됐는데 무엇이 문제였나요?",
        answer:
          "업데이트 서버나 통신사 경로의 일시적인 지연이었을 수 있습니다. 같은 코드가 자주 반복될 때만 위 단계를 차례로 확인하면 됩니다.",
      },
    ],
    sources: [SRC_WU_ERRORS],
  },

  "0x80072efe": {
    reviewedAt: "2026-11-19",
    description:
      "0x80072EFE(WININET_E_CONNECTION_ABORTED)는 업데이트 서버와의 연결이 비정상적으로 끊겼다는 뜻으로, 다운로드가 시작됐다가 중간에 멈추는 형태로 자주 보입니다. Microsoft는 이 코드를 BITS가 파일을 끝까지 옮기지 못한 상황으로 설명합니다. 연결 자체가 흔들리는지, 중간 장치(프록시·보안 필터)가 끊는지를 나눠 봅니다.",
    quickCheck: [
      "다운로드가 0%에서 바로 실패하나요, 몇십 %까지 가다가 끊기나요? 중간에 끊긴다면 연결 안정성 쪽을 먼저 봅니다.",
      "Wi-Fi로 연결돼 있나요? 유선으로 바꾸면 달라지는지 비교할 수 있나요?",
      "PC 시계가 실제 시각과 맞나요? 많이 틀리면 보안 연결이 끊길 수 있습니다.",
    ],
    causes: [
      "Wi-Fi 신호 불안정·공유기 문제",
      "PC 날짜·시간 불일치로 보안 연결 실패",
      "프록시나 보안 필터가 연결을 종료",
      "BITS 전송 작업 꼬임",
      "다운로드 폴더에 파일을 쓰지 못함",
    ],
    solutions: [
      {
        title: "유선이나 다른 연결로 바꿔 끊김 비교",
        reason:
          "다운로드 도중 연결이 끊기는 코드이므로, 연결 방식만 바꿨을 때 결과가 달라지면 원인 범위가 네트워크로 좁혀집니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "가능하면 랜 케이블로 공유기에 연결하고 Wi-Fi는 끕니다.",
          "유선이 어렵다면 공유기 전원을 껐다가 1분 뒤 켜고, 공유기 가까이에서 다시 받습니다.",
          "설정 → Windows 업데이트에서 다시 시도를 누르고 진행률이 끝까지 가는지 지켜봅니다.",
        ],
        checkPoint:
          "유선이나 공유기 재시작 뒤 끝까지 받아지면 무선 연결 불안정이 원인이었을 가능성이 큽니다. 유선에서도 같은 지점에서 끊기면 시계와 프록시를 확인합니다.",
      },
      {
        title: "날짜·시간 자동 동기화",
        reason:
          "업데이트 다운로드는 보안 연결을 쓰는데, PC 시계가 크게 틀리면 인증서 확인이 실패해 연결이 끊길 수 있습니다.",
        difficulty: "쉬움",
        time: "3분",
        steps: [
          "설정 → 시간 및 언어 → 날짜 및 시간을 엽니다.",
          "‘자동으로 시간 설정’과 ‘자동으로 표준 시간대 설정’을 켜고 ‘지금 동기화’를 누릅니다.",
          "작업 표시줄 시계가 실제 시각과 맞는지 확인한 뒤 다운로드를 다시 시작합니다.",
        ],
        checkPoint:
          "시계가 틀려 있었고 동기화 뒤 다운로드가 된다면 해결입니다. 원래 맞았다면 다음 단계로 갑니다. 재부팅할 때마다 시계가 틀어지면 메인보드 배터리 문제일 수 있습니다.",
      },
      {
        title: "프록시와 보안 필터가 연결을 끊는지 확인",
        reason:
          "프록시나 HTTPS 검사 기능은 큰 파일 전송을 중간에 끊는 경우가 있어, 하나씩 빼 보면 원인을 찾을 수 있습니다.",
        difficulty: "보통",
        time: "10~15분",
        steps: [
          "관리자 터미널에서 netsh winhttp show proxy 를 실행해 프록시가 설정돼 있는지 봅니다.",
          "개인 PC인데 모르는 프록시가 있으면 netsh winhttp reset proxy 를 실행합니다.",
          "타사 백신의 네트워크·HTTPS 검사를 잠시 끄고 다운로드해 본 뒤 바로 다시 켭니다.",
        ],
        checkPoint:
          "필터를 끄거나 프록시를 지운 뒤 끝까지 받아지면 그 설정이 연결을 끊고 있었습니다. 회사 프록시라면 관리자에게 해당 다운로드 주소 허용을 요청합니다.",
      },
      {
        title: "BITS 전송 목록에서 실패한 파일 확인",
        reason:
          "Microsoft 문서는 이 코드에서 BITS 작업 목록을 보면 실패한 파일과 HTTP 코드를 확인할 수 있다고 안내합니다.",
        difficulty: "보통",
        time: "10분",
        steps: [
          "관리자 터미널에서 bitsadmin /list /allusers /verbose 를 실행합니다.",
          "출력에서 0x80072EFE가 붙은 작업을 찾아 함께 표시된 파일 주소와 HTTP 상태를 적습니다.",
          "같은 주소를 브라우저에서 열어 다운로드가 되는지 비교합니다.",
        ],
        checkPoint:
          "브라우저로도 그 파일이 안 받아지면 네트워크·프록시 쪽에서 막는 것입니다. 브라우저로는 받아지면 다음 단계에서 업데이트 다운로드 데이터를 새로 만듭니다.",
      },
      {
        title: "업데이트 다운로드 데이터 초기화 후 다시 받기",
        reason:
          "끊긴 전송이 반쯤 받은 상태로 남아 있으면 같은 지점에서 계속 실패할 수 있어, 처음부터 새로 받게 합니다.",
        difficulty: "보통",
        time: "10~20분",
        steps: [
          "관리자 터미널에서 net stop wuauserv 와 net stop bits 를 실행합니다.",
          "두 서비스가 멈추면 ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old 로 폴더 이름을 바꿉니다.",
          "net start bits 와 net start wuauserv 를 실행한 뒤 업데이트를 다시 확인합니다.",
        ],
        checkPoint:
          "새로 받은 업데이트가 끝까지 내려오면 해결된 것입니다. 이름 바꾸기가 ‘액세스 거부’로 실패하면 서비스가 아직 멈추지 않은 것이니 재부팅 직후 다시 합니다.",
      },
    ],
    faqs: [
      {
        question: "캐시만 지우면 통신이 복구되나요?",
        answer:
          "연결을 끊는 원인이 네트워크에 있으면 캐시를 지워도 같은 지점에서 다시 끊깁니다. 유선 비교와 프록시 확인을 먼저 하고, 캐시 초기화는 그다음에 하세요.",
      },
      {
        question: "0x80072EE2와 무엇이 다른가요?",
        answer:
          "0x80072EE2는 응답을 기다리다 시간이 초과된 경우이고, 0x80072EFE는 연결이 맺어진 뒤 중간에 끊긴 경우입니다. 그래서 EFE는 연결 안정성과 중간 장치를 더 먼저 봅니다.",
      },
    ],
    sources: [SRC_WU_ERRORS],
  },

  "0x8024402c": {
    reviewedAt: "2026-11-19",
    description:
      "0x8024402C(WU_E_PT_WINHTTP_NAME_NOT_RESOLVED)는 Windows Update가 업데이트 서버나 프록시 서버의 이름을 IP 주소로 바꾸지 못했다는 뜻입니다. 회사 네트워크를 떠난 노트북이나 프록시 설정을 바꾼 뒤 자주 나타납니다. 잘못된 프록시 주소, DNS 응답, 남아 있는 회사 업데이트 서버 설정 중 어디서 막히는지 순서대로 봅니다.",
    quickCheck: [
      "회사·학교에서 쓰던 노트북을 집에서 쓰고 있나요? 그렇다면 회사 프록시나 업데이트 서버 설정이 남아 있을 수 있습니다.",
      "브라우저에서는 사이트가 정상적으로 열리나요? 열리는데 업데이트만 실패하면 WinHTTP 프록시를 의심합니다.",
      "최근 DNS 주소를 직접 바꾸거나 광고 차단 DNS를 설정했나요?",
    ],
    causes: [
      "존재하지 않는 프록시 서버 주소",
      "WinHTTP에 남은 옛 프록시 설정",
      "DNS 서버 응답 실패나 잘못된 수동 DNS",
      "더 이상 접근할 수 없는 WSUS 서버 주소",
    ],
    solutions: [
      {
        title: "설정 앱의 수동 프록시 확인",
        reason:
          "프록시 서버 이름을 찾지 못해도 이 코드가 나므로, 지금 쓰지 않는 프록시가 켜져 있는지부터 봅니다.",
        difficulty: "쉬움",
        time: "3분",
        steps: [
          "설정 → 네트워크 및 인터넷 → 프록시를 엽니다.",
          "‘수동 프록시 설정’에 주소가 들어 있고 켜져 있다면, 그 주소가 지금 연결된 네트워크에서 쓰는 것인지 확인합니다.",
          "쓰지 않는 프록시라면 끄고 업데이트 확인을 다시 누릅니다.",
        ],
        checkPoint:
          "프록시를 끈 뒤 업데이트가 확인되면 원인을 찾은 것입니다. 꺼져 있었거나 변화가 없으면 WinHTTP 설정을 확인합니다.",
      },
      {
        title: "WinHTTP 프록시 확인 후 초기화",
        reason:
          "Windows Update는 WinHTTP 설정으로 서버를 찾기 때문에, 브라우저 설정과 별개로 이곳에 옛 프록시가 남아 있으면 이름 확인에 실패합니다.",
        difficulty: "보통",
        time: "5분",
        steps: [
          "Win + X 메뉴에서 터미널(관리자)을 실행합니다.",
          "netsh winhttp show proxy 를 실행합니다.",
          "개인 PC인데 프록시 서버 주소가 나오면 netsh winhttp reset proxy 를 실행해 직접 연결로 되돌립니다.",
          "회사 PC라면 표시된 주소를 적어 관리자에게 확인합니다.",
        ],
        checkPoint:
          "‘직접 액세스(프록시 서버 없음)’으로 바뀐 뒤 업데이트가 되면 해결입니다. 처음부터 직접 액세스였다면 DNS를 확인합니다.",
      },
      {
        title: "DNS 캐시 비우고 이름 확인 테스트",
        reason:
          "프록시가 없는데도 이름 확인에 실패한다면 DNS 서버가 응답하지 않거나 잘못된 주소를 돌려주고 있을 수 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "관리자 터미널에 ipconfig /flushdns 를 입력해 저장된 이름 확인 결과를 지웁니다.",
          "nslookup www.microsoft.com 을 실행해 주소(Addresses)가 돌아오는지 봅니다.",
          "응답이 없거나 시간이 초과되면 공유기를 재시작한 뒤 다시 실행합니다.",
        ],
        checkPoint:
          "주소가 정상적으로 나오면 DNS는 동작하는 것입니다. 계속 실패하면 다음 단계에서 DNS 설정을 자동으로 되돌립니다.",
      },
      {
        title: "수동 DNS를 자동(DHCP)으로 되돌리기",
        reason:
          "직접 입력한 DNS 서버가 바뀌었거나 응답하지 않으면 업데이트 서버 이름을 찾지 못하므로, 공유기가 주는 DNS로 돌려 비교합니다.",
        difficulty: "보통",
        time: "5분",
        steps: [
          "설정 → 네트워크 및 인터넷 → Wi-Fi(또는 이더넷) → 연결된 네트워크의 속성(하드웨어 속성)을 엽니다.",
          "‘DNS 서버 할당’ 옆의 편집을 누르고 ‘자동(DHCP)’을 선택해 저장합니다.",
          "Windows 10은 제어판 → 네트워크 및 공유 센터 → 어댑터 설정 변경 → 어댑터 속성 → 인터넷 프로토콜 버전 4(TCP/IPv4)에서 ‘자동으로 DNS 서버 주소 받기’를 고릅니다.",
          "ipconfig /flushdns 를 한 번 더 실행하고 업데이트를 확인합니다.",
        ],
        checkPoint:
          "자동 DNS에서 업데이트가 되면 이전 수동 DNS가 원인이었을 가능성이 큽니다. 그래도 실패하면 회사 업데이트 서버 설정이 남아 있는지 봅니다.",
      },
      {
        title: "WSUS 서버 주소가 남아 있는지 읽기만 하기",
        reason:
          "정책으로 지정된 회사 업데이트 서버 이름은 회사 밖에서 찾을 수 없으므로, 그런 값이 남아 있으면 이 코드가 계속 날 수 있습니다.",
        difficulty: "어려움",
        time: "5~10분",
        steps: [
          "관리자 터미널에서 reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate /v WUServer 를 실행합니다. 이 명령은 값을 읽기만 합니다.",
          "‘지정한 레지스트리 키 또는 값을 찾을 수 없습니다’가 나오면 WSUS 설정은 없는 것입니다.",
          "서버 주소가 나오고 회사·학교에서 관리하는 PC라면 관리자에게 접근 방법을 확인받습니다.",
          "더 이상 관리받지 않는 개인 PC라면 해당 키를 내보내 백업한 뒤, 관리 해제 절차를 판매처나 이전 관리자에게 확인하고 진행합니다.",
        ],
        checkPoint:
          "값이 없으면 이 원인은 제외됩니다. 값이 있는데 임의로 지우면 회사 보안 정책을 위반할 수 있으니, 관리 주체를 먼저 확인합니다.",
      },
    ],
    faqs: [
      {
        question: "회사 업데이트 서버 설정을 그냥 지워도 되나요?",
        answer:
          "관리 중인 PC라면 지우지 마세요. 정책은 다시 적용될 수 있고 회사 규정을 어길 수 있습니다. 서버 주소와 접근 방법을 관리자에게 확인하는 것이 맞습니다.",
      },
      {
        question: "브라우저는 되는데 왜 업데이트만 이름을 못 찾나요?",
        answer:
          "브라우저와 Windows Update가 서로 다른 프록시 설정을 쓸 수 있기 때문입니다. netsh winhttp show proxy 결과를 확인해 보세요.",
      },
    ],
    sources: [SRC_WU_ERRORS],
  },

  "0x80240034": {
    reviewedAt: "2026-11-19",
    description:
      "0x80240034(WU_E_DOWNLOAD_FAILED)는 업데이트 파일 다운로드가 끝까지 완료되지 못했다는 뜻입니다. 특정 KB만 매번 같은 지점에서 실패하는지, 모든 업데이트가 받아지지 않는지에 따라 접근이 달라집니다. 다운로드 데이터가 꼬였을 때와 연결이 끊길 때가 많아, 다운로드 폴더 정리와 공식 패키지 설치로 나눠 해결합니다.",
    quickCheck: [
      "업데이트 기록에서 실패한 것이 특정 KB 하나인가요, 여러 업데이트가 함께 실패하나요?",
      "C 드라이브 여유 공간이 10GB 이상 남아 있나요?",
      "다운로드 진행률이 매번 같은 % 근처에서 멈추나요?",
    ],
    causes: [
      "다운로드 도중 연결 중단",
      "SoftwareDistribution\\Download 폴더의 손상된 임시 데이터",
      "보안 프로그램이 내려받은 파일을 차단",
      "C 드라이브 여유 공간 부족",
    ],
    solutions: [
      {
        title: "재부팅 후 안정된 연결에서 문제 해결사 실행",
        reason:
          "다운로드 실패는 연결 끊김과 서비스 상태 이상이 흔한 원인이라, 재부팅과 문제 해결사로 두 가지를 함께 정리합니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "PC를 다시 시작하고, 가능하면 유선 연결이나 공유기 가까운 곳에서 진행합니다.",
          "설정 → 시스템 → 문제 해결 → 기타 문제 해결사에서 Windows 업데이트를 실행합니다. Windows 10은 설정 → 업데이트 및 보안 → 문제 해결 → 추가 문제 해결사입니다.",
          "설정 → Windows 업데이트 → 업데이트 기록에서 실패한 KB가 하나인지 여러 개인지 적어 둡니다.",
        ],
        checkPoint:
          "다시 시도해 받아지면 해결입니다. 실패한 KB 번호가 매번 같다면 4단계의 카탈로그 설치가 빠를 수 있습니다.",
      },
      {
        title: "C 드라이브 여유 공간 확보",
        reason:
          "업데이트는 받은 파일을 풀어서 설치하므로 실제 파일 크기보다 훨씬 많은 공간이 필요하고, 공간이 모자라면 다운로드 단계에서 멈출 수 있습니다.",
        difficulty: "쉬움",
        time: "10분",
        steps: [
          "설정 → 시스템 → 저장소에서 C 드라이브 사용량을 확인합니다.",
          "‘임시 파일’을 눌러 휴지통·다운로드 폴더 등 지워도 되는 항목을 확인한 뒤 삭제합니다. 다운로드 폴더에 필요한 파일이 있으면 체크를 해제합니다.",
          "여유 공간을 늘린 뒤 업데이트를 다시 받습니다.",
        ],
        checkPoint:
          "공간을 확보한 뒤 받아지면 공간 부족이 원인이었을 가능성이 큽니다. 원래 공간이 충분했다면 다운로드 폴더를 비우는 다음 단계로 갑니다.",
      },
      {
        title: "Download 폴더 비워 처음부터 다시 받기",
        reason:
          "중간에 끊긴 파일 조각이 남아 있으면 같은 데이터를 이어 받으려다 계속 실패할 수 있어, 다운로드 폴더를 비우면 새로 받습니다.",
        difficulty: "보통",
        time: "10~15분",
        steps: [
          "관리자 터미널에서 net stop wuauserv 를, 이어서 net stop bits 를 입력해 두 서비스를 멈춥니다.",
          "파일 탐색기에서 C:\\Windows\\SoftwareDistribution\\Download 폴더를 열고, 안의 내용만 모두 지웁니다(Download 폴더 자체는 남겨 둡니다).",
          "net start bits 와 net start wuauserv 를 실행하고 업데이트 확인을 누릅니다.",
        ],
        checkPoint:
          "새로 받아서 설치되면 손상된 임시 데이터가 원인이었을 가능성이 큽니다. 지울 때 ‘사용 중’ 경고가 나오면 서비스가 아직 멈추지 않은 것이니 명령을 다시 실행합니다.",
      },
      {
        title: "Microsoft Update 카탈로그에서 해당 KB 받기",
        reason:
          "특정 KB 하나만 계속 실패한다면, Windows Update를 거치지 않고 독립 실행형 패키지를 받아 설치하면 다운로드 경로 문제를 피할 수 있습니다.",
        difficulty: "보통",
        time: "15~30분",
        steps: [
          "winver 와 설정 → 시스템 → 정보에서 Windows 버전과 시스템 종류(x64·ARM64)를 확인합니다.",
          "catalog.update.microsoft.com 검색창에 실패한 KB 번호를 넣습니다.",
          "버전·아키텍처가 맞는 항목의 다운로드를 눌러 .msu 파일을 받아 실행하고 재부팅합니다.",
        ],
        checkPoint:
          "수동 설치가 성공하면 끝입니다. 브라우저로도 파일이 받아지지 않으면 네트워크나 보안 프로그램이 다운로드를 막는 것이니 다음 단계로 갑니다.",
      },
      {
        title: "보안 프로그램의 다운로드 검사 끄고 비교",
        reason:
          "웹 보호 기능이 내려받는 업데이트 파일을 검사하다 차단하면 다운로드가 실패로 기록될 수 있습니다.",
        difficulty: "보통",
        time: "10분",
        steps: [
          "타사 백신에서 웹 보호·다운로드 검사 기능을 잠시 끕니다.",
          "업데이트를 다시 받아 봅니다.",
          "확인이 끝나면 보호 기능을 즉시 다시 켭니다.",
        ],
        checkPoint:
          "끈 상태에서만 받아지면 그 제품의 예외 설정이나 최신 버전 업데이트가 필요합니다. 차이가 없으면 오류 코드와 KB 번호를 적어 Microsoft 지원에 문의합니다.",
      },
    ],
    faqs: [
      {
        question: "다른 사이트에 올라온 KB 파일을 받아도 되나요?",
        answer:
          "공식 Microsoft Update 카탈로그만 사용하세요. 다른 곳에서 받은 업데이트 파일은 변조 여부를 확인할 수 없습니다.",
      },
      {
        question: "Download 폴더 안의 파일을 지워도 문제없나요?",
        answer:
          "업데이트 서비스를 멈춘 상태라면 이미 설치된 업데이트에는 영향이 없고, 필요한 파일은 다시 내려받습니다. 다만 대기 중이던 업데이트는 처음부터 다시 받습니다.",
      },
    ],
    sources: [SRC_WU_ERRORS],
  },

  "0x8024200d": {
    reviewedAt: "2026-11-19",
    description:
      "0x8024200D(WU_E_UH_NEEDANOTHERDOWNLOAD)는 설치 처리기가 받은 데이터만으로는 부족해 업데이트 데이터를 더 받아야 한다고 보고한 상태입니다. 다운로드가 끝난 것처럼 보였는데 설치 단계에서 실패할 때 많이 보입니다. 패키지를 끝까지 다시 받게 하거나, 처음부터 완전한 독립 실행형 패키지를 쓰는 쪽으로 해결합니다.",
    quickCheck: [
      "다운로드가 100%까지 간 뒤 설치 단계에서 실패하나요, 다운로드 중에 멈추나요?",
      "업데이트 도중 노트북 덮개를 닫거나 절전 모드로 들어간 적이 있나요?",
      "데이터 통신 연결(핫스팟 등)로 설정돼 다운로드가 제한되고 있지는 않나요?",
    ],
    causes: [
      "불완전하게 받은 업데이트 패키지",
      "절전·덮개 닫힘으로 중단된 다운로드",
      "데이터 통신 연결 설정으로 인한 다운로드 제한",
      "손상된 다운로드 캐시",
    ],
    solutions: [
      {
        title: "재부팅 후 같은 업데이트를 끝까지 받기",
        reason:
          "추가 데이터가 필요하다는 신호이므로, 연결을 유지한 채 다시 받게 하면 빠진 부분을 채워 설치될 수 있습니다.",
        difficulty: "쉬움",
        time: "15~30분",
        steps: [
          "PC를 다시 시작합니다.",
          "노트북이라면 전원 어댑터를 연결하고 덮개를 연 상태로 둡니다.",
          "설정 → Windows 업데이트에서 업데이트 확인을 누르고 다운로드와 설치가 끝날 때까지 지켜봅니다.",
        ],
        checkPoint:
          "이번에 설치되면 중단된 다운로드가 원인이었을 가능성이 큽니다. 같은 지점에서 또 실패하면 절전·데이터 통신 설정을 확인합니다.",
      },
      {
        title: "절전 시간과 데이터 통신 연결 설정 확인",
        reason:
          "업데이트 중 절전으로 들어가거나 데이터 통신 연결로 지정돼 다운로드가 제한되면 패키지 일부만 받은 채 설치를 시도할 수 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "설정 → 시스템 → 전원 및 배터리 → 화면 및 절전(Windows 10은 전원 및 절전)에서 전원 연결 시 절전 시간을 ‘안 함’이나 넉넉한 시간으로 바꿉니다.",
          "설정 → 네트워크 및 인터넷 → Wi-Fi(또는 이더넷) → 연결된 네트워크 속성에서 ‘데이터 통신 연결’이 켜져 있으면 업데이트 동안 끕니다.",
          "설정 → Windows 업데이트 → 고급 옵션의 ‘데이터 통신 연결을 통해 업데이트 다운로드’ 설정도 함께 확인합니다.",
        ],
        checkPoint:
          "설정을 바꾼 뒤 다운로드가 끝까지 진행되면 해결입니다. 이미 설정이 적절했다면 다운로드 데이터를 새로 만듭니다.",
      },
      {
        title: "SoftwareDistribution 폴더 이름 바꿔 새로 받기",
        reason:
          "불완전한 패키지가 캐시에 남아 있으면 Windows Update가 그 파일을 계속 재사용하므로, 폴더를 새로 만들어 처음부터 받게 합니다.",
        difficulty: "보통",
        time: "10~20분",
        steps: [
          "관리자 권한 터미널을 엽니다(Win + X → 터미널(관리자)).",
          "net stop wuauserv 와 net stop bits 를 실행합니다.",
          "ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old 를 입력해 기존 캐시 폴더를 옆으로 치워 둡니다.",
          "net start bits 와 net start wuauserv 를 실행하고 업데이트를 다시 확인합니다.",
        ],
        checkPoint:
          "새 폴더에서 받은 패키지가 설치되면 끝입니다. 문제가 해결되고 며칠 지나면 SoftwareDistribution.old 폴더는 지워도 됩니다.",
      },
      {
        title: "카탈로그의 완전한 패키지로 설치",
        reason:
          "Microsoft Update 카탈로그의 .msu는 추가 다운로드 없이 설치할 수 있는 완전한 패키지라, 추가 데이터를 요구하는 상황을 피할 수 있습니다.",
        difficulty: "보통",
        time: "15~30분",
        steps: [
          "설정 → Windows 업데이트 → 업데이트 기록에서 0x8024200D로 실패한 항목의 KB 번호를 적습니다.",
          "catalog.update.microsoft.com 에서 KB 번호를 검색하고, 현재 Windows 버전과 x64·ARM64 구분이 맞는 항목을 받습니다.",
          "받은 .msu를 실행하고 설치가 끝나면 재부팅합니다.",
        ],
        checkPoint:
          "수동 설치가 끝나면 Windows 업데이트에서 다시 확인해 같은 항목이 사라졌는지 봅니다. 수동 설치도 실패하면 DISM /Online /Cleanup-Image /RestoreHealth 로 구성요소 상태를 점검합니다.",
      },
    ],
    faqs: [
      {
        question: "인터넷 없이 다시 설치해도 되나요?",
        answer:
          "Windows Update로 설치한다면 추가 데이터를 받아야 하므로 연결이 필요합니다. 오프라인으로 해야 한다면 카탈로그의 완전한 .msu 패키지를 다른 PC에서 받아 옮겨 설치하세요.",
      },
      {
        question: "SoftwareDistribution.old 폴더는 언제 지우나요?",
        answer:
          "새 폴더로 업데이트가 정상 설치되는 것을 확인한 뒤에 지우면 됩니다. 지워도 이미 설치된 업데이트에는 영향이 없습니다.",
      },
    ],
    sources: [SRC_WU_ERRORS],
  },

  "0x80070643": {
    reviewedAt: "2026-11-19",
    description:
      "0x80070643(ERROR_INSTALL_FAILURE)은 업데이트 설치 프로그램이 작업 도중 치명적 오류로 멈췄다는 일반적인 코드입니다. .NET Framework 업데이트, Microsoft Defender 관련 업데이트, 복구 환경(WinRE) 업데이트에서 자주 보이며 원인이 업데이트 종류마다 다릅니다. 그래서 어떤 KB가 실패했는지부터 확인하고 그 종류에 맞는 단계로 갑니다.",
    quickCheck: [
      "업데이트 기록에서 실패한 항목 이름에 ‘.NET Framework’, ‘Windows 복구 환경’, ‘Microsoft Defender’ 중 무엇이 들어 있나요?",
      "그 KB 하나만 실패하고 다른 업데이트는 정상인가요?",
      "Windows 10에서 복구 환경(WinRE) 업데이트가 실패하는 경우라면 복구 파티션 크기와 관련된 알려진 문제일 수 있습니다.",
    ],
    causes: [
      ".NET Framework 구성요소 손상",
      "복구 파티션 공간 부족으로 인한 WinRE 업데이트 실패",
      "업데이트별 설치 전제 조건 미충족",
      "이전에 중단된 설치가 남긴 상태",
    ],
    solutions: [
      {
        title: "실패한 업데이트의 이름과 KB 번호 확인",
        reason:
          "같은 코드라도 .NET·WinRE·Defender 업데이트는 해결 방법이 전혀 다르므로, 종류를 먼저 알아야 엉뚱한 작업을 피할 수 있습니다.",
        difficulty: "쉬움",
        time: "3분",
        steps: [
          "설정 → Windows 업데이트 → 업데이트 기록을 엽니다.",
          "실패로 표시된 항목의 전체 이름과 KB 번호를 적습니다.",
          "같은 KB가 여러 날짜에 반복 실패했는지도 확인합니다.",
        ],
        checkPoint:
          "이름에 .NET이 있으면 4단계, ‘복구 환경’이 있으면 5단계를 먼저 봅니다. 그 외에는 다음 단계로 KB 문서의 알려진 문제를 확인합니다.",
      },
      {
        title: "Microsoft 지원 사이트에서 KB의 알려진 문제 읽기",
        reason:
          "특정 업데이트에서 이 코드가 알려진 문제로 등록돼 있으면, Microsoft가 해당 KB 문서에 원인과 대처를 따로 적어 둡니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "브라우저에서 support.microsoft.com 에 접속해 KB 번호(예: KB5034441)를 검색합니다.",
          "해당 문서의 ‘알려진 문제’ 또는 ‘Known issues’ 항목과 설치 전제 조건을 읽습니다.",
          "필요한 선행 업데이트(서비스 스택 업데이트 등)가 있으면 먼저 설치합니다.",
        ],
        checkPoint:
          "알려진 문제로 안내돼 있으면 그 문서의 지시를 우선 따릅니다. 별다른 안내가 없으면 재부팅 후 재시도로 넘어갑니다.",
      },
      {
        title: "재부팅하고 해당 업데이트만 다시 설치",
        reason:
          "다른 설치 작업이 겹쳤거나 이전 설치가 정리되지 않았을 때는 깨끗한 상태에서 한 번 더 시도하는 것만으로 설치되는 경우가 있습니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "다른 프로그램 설치나 업데이트가 진행 중이지 않은지 확인하고 PC를 다시 시작합니다.",
          "설정 → Windows 업데이트에서 다시 시도를 누릅니다.",
          "Defender 관련 업데이트라면 Windows 보안 → 바이러스 및 위협 방지 → 보호 업데이트에서 ‘업데이트 확인’을 눌러 별도로 받아 봅니다.",
        ],
        checkPoint:
          "재시도에서 설치되면 끝입니다. 같은 코드가 반복되면 업데이트 종류에 맞는 4·5단계로 갑니다.",
      },
      {
        title: ".NET 업데이트라면 .NET Framework Repair Tool 실행",
        reason:
          ".NET 업데이트는 기존 .NET 구성요소 상태를 확인한 뒤 설치되므로, 구성요소가 손상돼 있으면 0x80070643으로 실패할 수 있습니다.",
        difficulty: "보통",
        time: "15~20분",
        steps: [
          "Microsoft 공식 다운로드 센터에서 ‘Microsoft .NET Framework Repair Tool’을 받아 실행합니다.",
          "도구가 제안하는 변경을 적용하고 마칠 때까지 기다린 뒤 재부팅합니다.",
          "같은 .NET 업데이트를 다시 설치합니다. 계속 실패하면 Microsoft Update 카탈로그에서 그 KB를 받아 직접 실행합니다.",
        ],
        checkPoint:
          "복구 후 설치되면 .NET 구성요소 문제였습니다. 수동 설치도 실패하면 오류 시각의 C:\\Windows\\Logs\\CBS\\CBS.log를 함께 보관해 지원 문의 때 사용합니다.",
      },
      {
        title: "WinRE 업데이트라면 복구 환경 상태 확인",
        reason:
          "복구 환경 업데이트는 복구 파티션에 공간이 있어야 설치되는데, 공간이 모자라면 이 코드로 실패할 수 있고, 일부 KB 문서에 그 대처가 따로 안내된 적이 있습니다.",
        difficulty: "보통",
        time: "5분",
        steps: [
          "검색에서 cmd 를 입력하고 명령 프롬프트를 ‘관리자 권한으로 실행’합니다.",
          "reagentc /info 를 실행해 ‘Windows RE 상태’가 Enabled인지와 ‘Windows RE 위치’를 확인합니다.",
          "Win + X → 디스크 관리에서 ‘복구 파티션’의 크기와 사용 가능 공간을 확인합니다. 이 단계에서는 아무것도 바꾸지 않습니다.",
        ],
        checkPoint:
          "WinRE가 Disabled이거나 복구 파티션 여유가 거의 없다면 해당 KB 문서에 안내된 절차가 필요할 수 있습니다. 직접 하기 어렵다면 이 업데이트는 보류하고 다음 단계를 혼자 진행하지 않습니다.",
      },
      {
        title: "복구 파티션 크기 조정은 백업 후 Microsoft 절차대로만",
        reason:
          "파티션 크기를 바꾸는 작업은 실수하면 부팅이 안 되거나 데이터가 손상될 수 있어, 공식 절차와 백업이 갖춰졌을 때만 진행해야 합니다.",
        difficulty: "어려움",
        time: "1시간 이상",
        steps: [
          "전체 시스템 백업이나 중요한 파일 백업을 먼저 만듭니다.",
          "BitLocker를 쓰는 PC라면 복구 키를 미리 확인합니다.",
          "해당 KB 문서에 연결된 Microsoft의 복구 파티션 수동 조정 안내를 처음부터 끝까지 읽고, 명령을 그대로 따릅니다.",
          "자신이 없으면 PC 제조사 지원이나 전문가에게 맡깁니다.",
        ],
        checkPoint:
          "작업 후 reagentc /info 에서 Enabled가 나오고 업데이트가 설치되면 끝입니다. 중간에 오류가 나면 더 진행하지 말고 그 화면을 기록해 지원을 받습니다.",
      },
    ],
    faqs: [
      {
        question: ".NET 복구만 하면 모든 0x80070643이 해결되나요?",
        answer:
          "아닙니다. 이 코드는 여러 업데이트에서 쓰이는 일반 설치 실패 코드입니다. 실패한 업데이트가 .NET이 아니라면 .NET 복구는 효과가 없을 수 있습니다.",
      },
      {
        question: "실패한 WinRE 업데이트를 그냥 두면 위험한가요?",
        answer:
          "Windows 자체는 계속 사용할 수 있지만 그 업데이트가 고치려던 복구 환경 취약점은 남습니다. 파티션 작업이 부담스럽다면 KB 문서의 최신 안내나 제조사 지원을 확인하세요.",
      },
    ],
    warning:
      "복구 파티션 크기 조정은 디스크 구조를 바꾸는 작업이라 실수하면 부팅이 안 될 수 있습니다. 반드시 백업과 BitLocker 복구 키를 준비한 뒤 Microsoft 안내대로만 진행하세요.",
    sources: [SRC_WU_ERRORS],
  },

  "0x80070003": {
    reviewedAt: "2026-11-19",
    description:
      "0x80070003(ERROR_PATH_NOT_FOUND)은 업데이트 구성요소가 접근해야 할 폴더나 실행 파일 경로를 찾지 못했다는 뜻입니다. 사용자 폴더나 임시 폴더를 다른 드라이브로 옮긴 뒤, 또는 업데이트가 중간에 끊긴 뒤 나타나는 경우가 많습니다. 경로를 바꾼 적이 있는지와, 업데이트 데이터가 불완전한지를 나눠 봅니다.",
    quickCheck: [
      "최근 임시 폴더·사용자 폴더·프로그램 폴더를 다른 드라이브로 옮기거나 정리 도구로 지운 적이 있나요?",
      "외장 드라이브를 분리한 뒤부터 문제가 생겼나요?",
      "업데이트 설치 중에 전원이 꺼지거나 강제 종료한 적이 있나요?",
    ],
    causes: [
      "TEMP·TMP 환경 변수가 없는 폴더를 가리킴",
      "옮기거나 분리한 드라이브의 폴더 경로",
      "불완전한 업데이트 데이터",
      "시스템 폴더 이동·삭제로 끊어진 경로",
    ],
    solutions: [
      {
        title: "임시 폴더 환경 변수가 실제 폴더를 가리키는지 확인",
        reason:
          "업데이트는 설치 중 임시 폴더를 쓰기 때문에, TEMP·TMP가 사라진 드라이브나 폴더를 가리키면 경로 없음 오류가 날 수 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "Win + R → sysdm.cpl 을 입력하고 고급 탭 → 환경 변수를 엽니다.",
          "사용자 변수와 시스템 변수의 TEMP·TMP 값을 확인합니다. 기본값은 사용자 쪽이 %USERPROFILE%\\AppData\\Local\\Temp, 시스템 쪽이 %SystemRoot%\\TEMP 입니다.",
          "값에 적힌 폴더를 파일 탐색기 주소창에 붙여 넣어 실제로 열리는지 봅니다.",
        ],
        checkPoint:
          "폴더가 열리지 않으면 값을 위 기본값으로 바꾸고 재부팅한 뒤 업데이트를 다시 시도합니다. 모두 정상이면 다음 단계로 갑니다.",
      },
      {
        title: "옮긴 폴더가 있는 외장 드라이브 연결",
        reason:
          "폴더를 외장 드라이브로 옮긴 상태에서 드라이브를 빼 두면 Windows가 그 경로를 찾지 못하므로, 다시 연결만 해도 해결될 수 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "문서·다운로드 등 폴더 위치를 바꿀 때 쓴 외장 드라이브나 SD 카드를 다시 연결합니다.",
          "파일 탐색기에서 드라이브 문자가 예전과 같은지 확인합니다.",
          "연결된 상태에서 업데이트를 다시 시도합니다.",
        ],
        checkPoint:
          "연결 후 설치되면 옮긴 경로가 원인이었을 가능성이 큽니다. 드라이브 문자가 바뀌었다면 디스크 관리에서 원래 문자로 맞추는 것을 검토합니다.",
      },
      {
        title: "문제 해결사 실행 후 업데이트 데이터 초기화",
        reason:
          "중간에 끊긴 업데이트가 존재하지 않는 경로를 기록해 두었을 수 있어, 업데이트 데이터를 새로 만들면 경로 정보도 새로 생성됩니다.",
        difficulty: "보통",
        time: "15~20분",
        steps: [
          "설정 → 시스템 → 문제 해결 → 기타 문제 해결사에서 Windows 업데이트를 실행하고 재부팅합니다.",
          "계속되면 관리자 터미널에서 net stop wuauserv 와 net stop bits 를 실행합니다.",
          "ren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old 를 실행한 뒤 net start bits 와 net start wuauserv 로 다시 켭니다.",
          "업데이트를 다시 확인합니다.",
        ],
        checkPoint:
          "새로 받아 설치되면 업데이트 데이터 문제였습니다. 같은 코드가 반복되면 CBS 로그에서 어떤 경로인지 확인합니다.",
      },
      {
        title: "CBS 로그에서 찾지 못한 경로 확인",
        reason:
          "Microsoft 문서는 이 코드에서 CBS.log의 오류 줄을 보면 접근하지 못한 경로를 알 수 있다고 안내합니다.",
        difficulty: "보통",
        time: "15분",
        steps: [
          "C:\\Windows\\Logs\\CBS\\CBS.log를 바탕 화면에 복사해 메모장으로 엽니다.",
          "Ctrl + F로 , error (쉼표와 공백 포함)나 0x80070003 을 검색하고, 실패 시각과 맞는 줄을 찾습니다.",
          "그 줄과 위아래에 나오는 폴더·파일 경로를 적습니다.",
        ],
        checkPoint:
          "경로가 옮긴 폴더나 지운 프로그램 폴더라면 그 원인을 되돌리는 쪽으로 갑니다. Windows 시스템 경로라면 DISM과 sfc를 실행합니다.",
      },
      {
        title: "DISM과 sfc로 구성요소 점검",
        reason:
          "시스템 쪽 경로 정보가 손상됐다면 구성요소 저장소를 고친 뒤 시스템 파일을 맞추는 것이 공식 복구 순서입니다.",
        difficulty: "보통",
        time: "20~40분",
        steps: [
          "관리자 터미널에서 DISM /Online /Cleanup-Image /RestoreHealth 를 실행합니다.",
          "끝나면 sfc /scannow 를 실행합니다.",
          "재부팅하고 업데이트를 다시 확인합니다.",
        ],
        checkPoint:
          "복구 후 설치되면 끝입니다. 로그에 나온 폴더를 빈 폴더로 직접 만드는 방법은 안의 파일과 권한이 맞지 않아 효과가 없을 수 있으니 쓰지 않습니다.",
      },
      {
        title: "옮긴 시스템 폴더는 백업 후 사용한 도구로 되돌리기",
        reason:
          "Windows나 Program Files 폴더를 옮기거나 링크로 바꾼 경우에는 잘못 되돌리면 앱이 실행되지 않거나 부팅이 안 될 수 있습니다.",
        difficulty: "어려움",
        time: "30분 이상",
        steps: [
          "중요한 파일을 외장 드라이브나 클라우드에 먼저 백업합니다.",
          "폴더를 옮길 때 사용한 도구의 ‘되돌리기’ 기능이나 그 도구의 공식 안내를 찾습니다.",
          "파일 탐색기에서 시스템 폴더를 직접 끌어다 옮기지 않습니다.",
          "되돌리기 방법이 없으면 백업 후 ‘개인 파일 및 앱 유지’로 Windows를 다시 설치하는 방법을 검토합니다.",
        ],
        checkPoint:
          "원래 경로로 돌아온 뒤 업데이트가 설치되면 해결입니다. 되돌리는 방법이 확실하지 않으면 진행하지 말고 전문가와 상의합니다.",
      },
    ],
    faqs: [
      {
        question: "로그에 나온 폴더를 직접 만들면 되지 않나요?",
        answer:
          "빈 폴더만으로는 그 안에 있어야 할 파일과 권한이 채워지지 않아 해결되지 않는 경우가 많습니다. 업데이트 데이터 초기화와 DISM 복구를 먼저 하세요.",
      },
      {
        question: "Windows 업그레이드 중에 0x80070003이 나오면 같은 문제인가요?",
        answer:
          "업그레이드 중 뒤에 0x20007 같은 확장 코드가 붙어 있다면 Microsoft 문서상 드라이버 설치 단계 실패일 수 있습니다. 이 경우 드라이버 점검과 설치 로그 확인이 먼저입니다.",
      },
    ],
    warning:
      "Windows·Program Files 같은 시스템 폴더를 직접 옮기거나 지우면 부팅이 안 될 수 있습니다. 되돌리기 전에 반드시 중요한 파일을 백업하세요.",
    sources: [SRC_WU_ERRORS, SRC_UPGRADE_RESOLUTION],
  },

  "0xc1900101": {
    reviewedAt: "2026-11-19",
    description:
      "0xC1900101은 Windows 기능 업그레이드(예: 새 버전 설치) 도중 문제가 생겨 이전 버전으로 되돌렸다는 일반적인 롤백 코드입니다. Microsoft는 이 코드가 대개 호환되지 않는 드라이버를 가리킨다고 설명합니다. 뒤에 붙은 확장 코드(예: 0x20017, 0x30018)가 실패 단계를 알려 주므로, 그 코드와 설치 로그로 어느 드라이버·장치인지 좁혀 갑니다.",
    quickCheck: [
      "오류에 0xC1900101 뒤로 0x20017, 0x30018, 0x4000D 같은 확장 코드가 함께 표시됐나요? 전체 코드를 적어 두세요.",
      "업그레이드 중 재부팅 단계에서 파란 화면이나 멈춤이 있었나요?",
      "키보드·마우스 외에 USB 저장장치, 도킹 스테이션, SD 카드 등이 연결된 상태였나요?",
    ],
    causes: [
      "새 Windows와 호환되지 않는 장치 드라이버",
      "외부 장치·도킹 스테이션 드라이버 충돌",
      "타사 백신이나 디스크 암호화 필터 드라이버",
      "오래된 BIOS·펌웨어",
      "C 드라이브 여유 공간 부족",
    ],
    solutions: [
      {
        title: "전체 오류 코드와 확장 코드 기록",
        reason:
          "0xC1900101은 공통 롤백 코드라서, 뒤에 붙은 확장 코드가 있어야 설치 어느 단계에서 어떤 종류의 문제가 났는지 알 수 있습니다.",
        difficulty: "쉬움",
        time: "3분",
        steps: [
          "오류 화면이나 설정 → Windows 업데이트 → 업데이트 기록에 표시된 전체 코드(예: 0xC1900101 - 0x30018)를 적습니다.",
          "업그레이드 도우미나 설치 미디어로 시도했다면 그 창에 나온 메시지도 사진으로 남깁니다.",
          "몇 % 지점, 몇 번째 재부팅에서 되돌아갔는지 기억나는 대로 적습니다.",
        ],
        checkPoint:
          "확장 코드가 있으면 Microsoft 업그레이드 문서의 해당 행에 맞는 조치를 우선 봅니다. 코드가 없더라도 다음 단계의 장치 분리는 공통으로 효과가 있습니다.",
      },
      {
        title: "외부 장치 분리하고 여유 공간 확보",
        reason:
          "Microsoft는 여러 확장 코드에서 마우스·키보드·모니터를 뺀 모든 주변장치를 분리하라고 안내하며, 업그레이드에는 64비트 기준 20GB 이상의 여유 공간이 필요합니다.",
        difficulty: "쉬움",
        time: "10분",
        steps: [
          "키보드·마우스·모니터 외의 USB 장치, 외장 드라이브, 도킹 스테이션, SD 카드, 프린터를 모두 분리합니다.",
          "설정 → 시스템 → 저장소에서 C 드라이브 여유 공간이 20GB 이상인지 확인하고, 부족하면 임시 파일을 정리합니다.",
          "설치 미디어로 진행한다면 시작 화면에서 ‘업데이트 다운로드 및 설치(권장)’를 선택한 뒤 다시 업그레이드합니다.",
        ],
        checkPoint:
          "이번에 업그레이드가 끝까지 진행되면 외부 장치나 공간이 원인이었을 가능성이 큽니다. 같은 코드로 되돌아가면 보안 프로그램과 드라이버를 확인합니다.",
      },
      {
        title: "타사 백신·암호화 프로그램 정리 후 클린 부팅으로 시도",
        reason:
          "Microsoft 문서는 백신·암호화 필터 드라이버를 롤백 원인으로 들고, 최소한의 드라이버로 시작하는 클린 부팅 상태에서 업그레이드하라고 권합니다.",
        difficulty: "보통",
        time: "30~60분",
        steps: [
          "타사 백신은 최신 버전으로 업데이트하거나 업그레이드 동안 제거합니다. 제거하면 Microsoft Defender가 자동으로 켜집니다.",
          "타사 디스크 암호화 프로그램을 쓰고 있다면 제조사 안내에서 Windows 업그레이드 전 조치를 확인합니다.",
          "Win + R → msconfig → 서비스 탭에서 ‘모든 Microsoft 서비스 숨기기’ → ‘모두 사용 안 함’을 누르고, 작업 관리자의 시작 앱도 모두 끈 뒤 재부팅합니다.",
          "그 상태에서 업그레이드를 실행하고, 끝나면 msconfig에서 ‘정상 시작’으로 되돌립니다.",
        ],
        checkPoint:
          "클린 부팅에서 성공하면 타사 소프트웨어가 원인이었을 가능성이 큽니다. 그래도 되돌아가면 SetupDiag로 실패한 드라이버를 찾습니다.",
      },
      {
        title: "SetupDiag로 실패 원인 요약 보기",
        reason:
          "SetupDiag는 Windows 설치 로그를 분석해 업그레이드 실패 원인을 알려 주는 Microsoft 도구라, 로그를 직접 읽지 않아도 문제 드라이버를 좁힐 수 있습니다.",
        difficulty: "보통",
        time: "15~20분",
        steps: [
          "Microsoft Learn의 SetupDiag 문서에서 최신 SetupDiag.exe를 받아 다운로드 폴더에 저장합니다.",
          "관리자 터미널을 열고 cd $env:USERPROFILE\\Downloads 로 이동한 뒤 .\\SetupDiag.exe 를 실행합니다(명령 프롬프트라면 cd %USERPROFILE%\\Downloads 후 SetupDiag.exe).",
          "같은 폴더에 생긴 SetupDiagResults.log를 메모장으로 열어 일치한 규칙 이름과 드라이버·장치 이름을 확인합니다.",
          "직접 로그를 볼 때는 C:\\$WINDOWS.~BT\\Sources\\Panther 폴더(숨김)의 setuperr.log를 엽니다.",
        ],
        checkPoint:
          "결과에 특정 드라이버(.sys)나 장치 이름이 나오면 그 장치의 드라이버를 다음 단계에서 업데이트하거나 제거합니다. 여러 오류가 나오면 로그의 마지막 실패가 직접적인 원인일 가능성이 큽니다.",
      },
      {
        title: "PC 제조사 권장 드라이버로 맞추기",
        reason:
          "호환되지 않는 드라이버가 롤백의 가장 흔한 원인이므로, 제조사가 새 Windows용으로 제공하는 칩셋·저장장치·그래픽·무선랜 드라이버로 바꾸는 것이 핵심입니다.",
        difficulty: "보통",
        time: "30~60분",
        steps: [
          "Win + R → msinfo32 의 ‘시스템 모델’로 PC 모델명을 확인합니다.",
          "PC 제조사 지원 페이지에서 그 모델이 업그레이드할 Windows 버전을 지원하는지, 권장 드라이버 목록이 있는지 확인합니다.",
          "칩셋, 저장장치(RST·NVMe), 그래픽, 무선랜·블루투스 드라이버를 목록대로 설치하고 재부팅합니다.",
          "SetupDiag에서 이름이 나온 드라이버가 더 이상 필요 없는 장치용이면 장치 관리자에서 디바이스 제거 후 업그레이드합니다.",
        ],
        checkPoint:
          "드라이버를 맞춘 뒤 업그레이드가 끝나면 해결입니다. 그래도 같은 단계에서 되돌아가고 제조사가 BIOS 업데이트를 권하면 마지막 단계를 검토합니다.",
      },
      {
        title: "BIOS는 백업 후 제조사 절차로만 업데이트",
        reason:
          "Microsoft 문서도 일부 확장 코드에서 BIOS 업데이트를 권하지만, 실패하면 PC가 켜지지 않을 수 있어 가장 마지막에 신중히 진행해야 합니다.",
        difficulty: "어려움",
        time: "30분~1시간",
        cost: "실패 시 수리비",
        steps: [
          "중요한 파일을 백업합니다.",
          "BitLocker를 쓰는 PC라면 Microsoft 계정이나 회사 관리자에게서 복구 키를 미리 확인합니다. BIOS 업데이트 후 복구 키를 요구할 수 있습니다.",
          "노트북은 전원 어댑터를 연결하고 배터리를 충분히 충전합니다.",
          "PC 제조사 지원 페이지에서 모델에 맞는 BIOS를 받아, 제조사가 안내한 방법(전용 업데이트 도구 등)으로만 설치합니다. 진행 중에는 전원을 끄지 않습니다.",
        ],
        checkPoint:
          "BIOS 업데이트 후 정상 부팅되면 업그레이드를 다시 시도합니다. 그래도 실패하면 SetupDiag 결과와 확장 코드를 정리해 제조사나 Microsoft 지원에 문의합니다.",
      },
    ],
    faqs: [
      {
        question: "확장 코드까지 꼭 적어야 하나요?",
        answer:
          "네. 0xC1900101 뒤의 코드는 설치 어느 단계에서 실패했는지를 구분해 주고, Microsoft 문서도 확장 코드별로 조치를 다르게 안내합니다. 전체 메시지를 보관하세요.",
      },
      {
        question: "업그레이드가 실패해 되돌아갔는데 파일은 괜찮나요?",
        answer:
          "롤백은 이전 Windows 상태로 되돌리는 정상 절차라 대부분 파일과 앱이 그대로 남습니다. 그래도 다시 시도하기 전에 중요한 파일을 백업해 두는 것이 안전합니다.",
      },
      {
        question: "같은 업그레이드를 계속 다시 시도해도 되나요?",
        answer:
          "원인을 바꾸지 않고 반복하면 같은 지점에서 되돌아갈 가능성이 큽니다. 장치 분리, 드라이버 정리, SetupDiag 확인 중 하나라도 바꾼 뒤 시도하세요.",
      },
    ],
    warning:
      "BIOS 업데이트 중 전원이 끊기면 PC가 켜지지 않을 수 있고, BitLocker 복구 키를 요구할 수 있습니다. 백업과 복구 키를 준비한 뒤 제조사 절차대로만 진행하세요.",
    sources: [SRC_UPGRADE_RESOLUTION, SRC_SETUPDIAG, SRC_CLEAN_BOOT],
  },

  "device-manager-code-10": {
    reviewedAt: "2026-11-19",
    description:
      "장치 관리자의 코드 10은 ‘이 장치를 시작할 수 없습니다’라는 뜻으로, Windows가 장치를 인식은 했지만 드라이버로 시작하는 단계에서 실패한 상태입니다. USB 장치, 오디오, 네트워크 어댑터에서 노란 느낌표와 함께 자주 보입니다. 최근 드라이버를 바꾼 뒤 생겼는지, 장치를 다른 포트·PC에 꽂아도 같은지로 드라이버 쪽과 장치·연결 쪽을 나눕니다.",
    quickCheck: [
      "드라이버를 업데이트하거나 Windows 업데이트를 설치한 직후부터 생겼나요? 그렇다면 드라이버 롤백이 먼저입니다.",
      "USB 장치라면 다른 포트나 다른 PC에 꽂아도 인식이 안 되나요?",
      "장치 속성의 ‘일반’ 탭 상태 문구에 코드 10 외에 다른 설명이 함께 표시되나요?",
    ],
    causes: [
      "새로 설치한 드라이버와 장치의 호환 문제",
      "손상되거나 오래된 드라이버",
      "USB 허브·케이블·포트 연결 불량",
      "장치 펌웨어 문제",
      "장치 자체 이상",
    ],
    solutions: [
      {
        title: "장치 상태와 이벤트 탭에서 실패 시점 확인",
        reason:
          "언제부터 시작에 실패했는지 알면 최근 드라이버 변경 때문인지, 원래 연결 문제였는지를 바로 가를 수 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "Win + X → 장치 관리자를 엽니다.",
          "노란 느낌표가 있는 장치를 두 번 클릭하고 일반 탭의 ‘장치 상태’ 문구를 적습니다.",
          "이벤트 탭에서 ‘장치를 시작하지 않았습니다’ 같은 항목의 날짜·시각을 보고, 드라이버 탭의 ‘드라이버 날짜’와 비교합니다.",
        ],
        checkPoint:
          "실패가 드라이버 설치 직후부터 시작됐다면 3단계 롤백을 먼저 합니다. 날짜가 겹치지 않으면 다음 단계에서 연결부터 확인합니다.",
      },
      {
        title: "USB 장치는 본체 포트와 다른 PC로 비교",
        reason:
          "허브나 케이블 문제로 전원이 부족하면 장치가 시작 단계에서 실패할 수 있어, 연결을 바꿔 보면 드라이버 문제와 구분됩니다.",
        difficulty: "쉬움",
        time: "10분",
        steps: [
          "USB 허브나 연장 케이블을 빼고 PC 본체 포트(데스크톱은 뒷면 포트)에 직접 꽂습니다.",
          "다른 케이블이 있으면 바꿔서 연결합니다.",
          "가능하면 같은 장치를 다른 PC에 연결해 정상 동작하는지 봅니다.",
        ],
        checkPoint:
          "다른 포트에서 정상이면 원래 포트나 허브 쪽 문제입니다. 다른 PC에서도 코드 10이나 인식 실패가 나면 장치 자체 문제일 가능성이 큽니다. 다른 PC에서는 되면 이 PC의 드라이버를 봅니다.",
      },
      {
        title: "드라이버를 이전 버전으로 롤백",
        reason:
          "최근 업데이트된 드라이버가 장치와 맞지 않으면 시작 실패가 나므로, 예전에 정상 동작하던 버전으로 되돌리면 바로 확인됩니다.",
        difficulty: "보통",
        time: "5~10분",
        steps: [
          "장치 관리자에서 해당 장치 → 속성 → 드라이버 탭을 엽니다.",
          "‘드라이버 롤백’ 버튼이 활성화돼 있으면 누르고, 이유를 선택한 뒤 확인합니다.",
          "PC를 다시 시작하고 장치 상태를 확인합니다.",
        ],
        checkPoint:
          "롤백 뒤 ‘이 장치가 올바르게 작동하고 있습니다’로 바뀌면 새 드라이버가 원인이었을 가능성이 큽니다. 버튼이 비활성화돼 있거나 효과가 없으면 다음 단계로 갑니다.",
      },
      {
        title: "장치를 제거하고 하드웨어 변경 사항 검색",
        reason:
          "드라이버 설정이 꼬였을 때 장치를 제거했다가 다시 검색하면 Windows가 장치를 새로 등록하고 드라이버를 다시 연결합니다.",
        difficulty: "보통",
        time: "5~10분",
        steps: [
          "장치를 마우스 오른쪽 클릭 → 디바이스 제거를 누릅니다. 처음에는 드라이버 삭제 확인란을 체크하지 않습니다.",
          "장치 관리자 상단 메뉴 동작 → 하드웨어 변경 사항 검색을 누릅니다.",
          "장치가 다시 나타나면 상태를 확인합니다.",
        ],
        checkPoint:
          "다시 설치된 뒤 정상이면 해결입니다. 같은 코드 10이 나오면 제조사 드라이버로 교체합니다.",
      },
      {
        title: "PC·장치 제조사 사이트의 모델별 드라이버 설치",
        reason:
          "Microsoft 문서는 코드 10에 드라이버 업데이트를 권하며, Windows 기본 드라이버보다 제조사의 모델별 드라이버가 장치 초기화에 맞는 경우가 많습니다.",
        difficulty: "보통",
        time: "15~30분",
        steps: [
          "노트북·브랜드 PC는 PC 제조사 지원 페이지에서, 별도로 산 장치는 장치 제조사 사이트에서 모델명을 검색합니다.",
          "현재 Windows 버전을 지원하는 드라이버를 받아 설치합니다.",
          "필요하면 장치 펌웨어 업데이트도 같은 페이지에서 확인합니다.",
          "재부팅 후 장치 상태를 봅니다.",
        ],
        checkPoint:
          "제조사 드라이버로 정상화되면 끝입니다. 다른 PC에서도 실패했던 장치라면 제조사 지원이나 보증 수리를 문의합니다.",
      },
    ],
    faqs: [
      {
        question: "코드 10이면 장치가 고장 난 건가요?",
        answer:
          "꼭 그렇지는 않습니다. 드라이버 초기화 실패로도 같은 코드가 납니다. 다른 포트·다른 PC·이전 드라이버로 비교해 장치 자체 문제인지 확인하세요.",
      },
      {
        question: "오디오 장치에서 코드 10이 나오면 무엇부터 보나요?",
        answer:
          "PC 제조사 페이지의 오디오 드라이버와 함께 칩셋 드라이버가 최신인지 확인하세요. 오디오 장치는 칩셋 쪽 구성요소에 의존하는 경우가 있습니다.",
      },
    ],
    sources: [SRC_DEVICE_MANAGER_CODES],
  },

  "device-manager-code-28": {
    reviewedAt: "2026-11-19",
    description:
      "장치 관리자의 코드 28은 ‘이 장치에 대한 드라이버가 설치되지 않았습니다’라는 뜻입니다. Windows를 새로 설치한 직후 ‘알 수 없는 장치’나 ‘기타 장치’ 아래에 느낌표가 남는 형태로 흔히 보입니다. 먼저 하드웨어 ID로 어떤 장치인지 알아낸 뒤, 그 장치에 맞는 드라이버를 공식 경로에서 넣는 순서로 진행합니다.",
    quickCheck: [
      "장치 이름이 ‘알 수 없는 장치’, ‘PCI 장치’, ‘SM 버스 컨트롤러’처럼 모호하게 표시되나요? 그렇다면 칩셋 드라이버 누락일 가능성이 큽니다.",
      "Windows를 새로 설치했거나 초기화한 직후인가요?",
      "노트북·브랜드 PC인가요, 조립 PC인가요? 드라이버를 받을 곳이 달라집니다.",
    ],
    causes: [
      "Windows 재설치 후 필수 드라이버 누락",
      "칩셋 드라이버 미설치",
      "Windows Update에 해당 장치용 드라이버가 없음",
      "장치를 식별하지 못해 드라이버를 고르지 못함",
    ],
    solutions: [
      {
        title: "하드웨어 ID로 어떤 장치인지 확인",
        reason:
          "드라이버가 없어 이름조차 모호하게 보이는 경우가 많아, 하드웨어 ID를 알아야 맞는 드라이버를 찾을 수 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "Win + X → 장치 관리자에서 코드 28 장치를 두 번 클릭합니다.",
          "자세히 탭 → 속성 목록에서 ‘하드웨어 ID’를 고르고 첫 줄을 마우스 오른쪽 클릭해 복사합니다(예: PCI\\VEN_8086&DEV_...).",
          "Win + R → msinfo32 에서 ‘시스템 제조업체’와 ‘시스템 모델’을 함께 적습니다.",
        ],
        checkPoint:
          "VEN_ 뒤 4자리는 칩 제조사(8086은 Intel, 10EC는 Realtek 등)를 나타냅니다. 모델명과 함께 적었다면 다음 단계에서 Windows가 직접 드라이버를 찾도록 해 봅니다.",
      },
      {
        title: "장치를 제거하고 하드웨어 변경 사항 검색",
        reason:
          "Microsoft 문서는 코드 28에 장치를 제거한 뒤 하드웨어 변경 사항을 검색해 다시 설치하는 방법을 안내합니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "장치를 마우스 오른쪽 클릭 → 디바이스 제거를 누릅니다.",
          "상단 메뉴 동작 → 하드웨어 변경 사항 검색을 누릅니다.",
          "장치가 이름이 바뀌어 다시 나타나는지 봅니다.",
        ],
        checkPoint:
          "정상 이름과 드라이버로 다시 설치되면 끝입니다. 여전히 코드 28이면 Windows에 기본 드라이버가 없는 것이니 다음 단계에서 받아 옵니다.",
      },
      {
        title: "Windows Update 선택적 드라이버 설치",
        reason:
          "제조사가 Windows Update에 올린 드라이버는 선택적 업데이트에만 표시되는 경우가 있어, 자동 업데이트만으로는 설치되지 않을 수 있습니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "설정 → Windows 업데이트 → 고급 옵션 → 선택적 업데이트를 엽니다. Windows 10은 설정 → 업데이트 및 보안 → Windows 업데이트 → 선택적 업데이트 보기입니다.",
          "드라이버 업데이트를 펼쳐 해당 장치나 칩 제조사 이름이 있는 항목을 체크하고 다운로드 및 설치를 누릅니다.",
          "재부팅 후 장치 관리자를 다시 확인합니다.",
        ],
        checkPoint:
          "목록에 항목이 있었고 설치 후 느낌표가 사라지면 해결입니다. 목록이 비어 있으면 제조사 드라이버를 받습니다.",
      },
      {
        title: "PC 제조사의 칩셋 드라이버부터 차례로 설치",
        reason:
          "칩셋 드라이버가 없으면 그 아래에 연결된 여러 장치가 함께 코드 28로 남으므로, 칩셋을 먼저 넣으면 나머지가 자동으로 잡히기도 합니다.",
        difficulty: "보통",
        time: "20~40분",
        steps: [
          "노트북·브랜드 PC는 제조사 지원 페이지에서 모델명을 검색해 현재 Windows용 칩셋 드라이버를 먼저 설치하고 재부팅합니다.",
          "남은 장치는 같은 페이지의 무선랜·블루투스·오디오·카드리더 드라이버로 채웁니다.",
          "조립 PC는 메인보드 제조사 페이지에서 받고, 별도로 꽂은 장치는 하드웨어 ID의 VEN 값으로 확인한 제조사 사이트에서 받습니다.",
        ],
        checkPoint:
          "칩셋 설치 후 장치 개수가 줄었다면 순서가 맞은 것입니다. 남은 장치는 다음 단계처럼 드라이버 폴더를 직접 지정합니다.",
      },
      {
        title: "압축 파일 드라이버는 폴더를 직접 지정",
        reason:
          "설치 프로그램 없이 .inf 파일만 들어 있는 드라이버는 실행해도 설치되지 않아, 장치 관리자에서 폴더를 지정해야 합니다.",
        difficulty: "보통",
        time: "10분",
        steps: [
          "받은 드라이버 압축 파일을 원하는 폴더에 풉니다.",
          "장치 관리자에서 해당 장치 → 마우스 오른쪽 클릭 → 드라이버 업데이트 → ‘내 컴퓨터에서 드라이버 찾아보기’를 누릅니다.",
          "압축을 푼 폴더를 지정하고 ‘하위 폴더 포함’을 체크한 뒤 다음을 누릅니다.",
        ],
        checkPoint:
          "‘드라이버를 업데이트했습니다’가 나오면 끝입니다. ‘최적의 드라이버를 찾을 수 없음’이 나오면 하드웨어 ID와 받은 드라이버의 장치가 다른 것이니 다시 확인합니다.",
      },
    ],
    faqs: [
      {
        question: "자동 드라이버 업데이트 프로그램을 써도 되나요?",
        answer:
          "PC 제조사 페이지와 Windows Update 선택적 드라이버를 먼저 쓰세요. 출처가 불분명한 드라이버 도구는 맞지 않는 드라이버나 원치 않는 프로그램을 함께 설치할 수 있습니다.",
      },
      {
        question: "코드 28 장치를 그냥 둬도 되나요?",
        answer:
          "어떤 장치인지에 따라 다릅니다. 칩셋·무선랜처럼 기능에 영향을 주는 장치라면 설치가 필요하고, 쓰지 않는 카드리더 등이라면 당장 문제는 없을 수 있습니다. 하드웨어 ID로 확인한 뒤 정하세요.",
      },
    ],
    sources: [SRC_DEVICE_MANAGER_CODES],
  },

  "device-manager-code-31": {
    reviewedAt: "2026-11-19",
    description:
      "장치 관리자의 코드 31은 ‘Windows가 이 장치에 필요한 드라이버를 로드할 수 없어 장치가 제대로 작동하지 않습니다’라는 뜻입니다. 드라이버는 설치돼 있는데 불러오는 단계에서 실패한 상태로, 네트워크 어댑터나 그래픽 장치에서 자주 보입니다. 드라이버 파일 자체 문제인지, VPN·보안 프로그램 같은 다른 소프트웨어가 끼어든 문제인지를 나눠 봅니다.",
    quickCheck: [
      "같은 PC에서 코드 31이 붙은 장치가 하나인가요, 여러 개인가요? 여러 개라면 시스템 파일 쪽을 의심합니다.",
      "문제가 생기기 직전에 VPN·방화벽·백업·암호화 프로그램을 설치하거나 업데이트했나요?",
      "네트워크 어댑터에서 났다면 인터넷이 안 되므로, 드라이버를 받을 다른 PC나 휴대폰이 있나요?",
    ],
    causes: [
      "손상된 드라이버 파일",
      "현재 Windows와 맞지 않는 드라이버 버전",
      "VPN·보안 프로그램의 필터 드라이버 충돌",
      "시스템 파일 손상",
    ],
    solutions: [
      {
        title: "장치 관리자에서 드라이버 업데이트 실행",
        reason:
          "Microsoft 문서는 코드 31에 드라이버를 다시 설치하라고 안내하며, Windows가 가진 다른 버전으로 바꾸기만 해도 로드되는 경우가 있습니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "Win + X → 장치 관리자에서 코드 31 장치를 마우스 오른쪽 클릭 → 드라이버 업데이트를 누릅니다.",
          "‘드라이버 자동 검색’을 선택합니다.",
          "‘이미 최신 드라이버가 설치됨’이 나오면 다시 드라이버 업데이트 → 내 컴퓨터에서 드라이버 찾아보기 → ‘컴퓨터의 사용 가능한 드라이버 목록에서 직접 선택’을 눌러 다른 버전을 고릅니다.",
        ],
        checkPoint:
          "다른 버전으로 바꾼 뒤 장치가 정상으로 표시되면 해결입니다. 목록에 다른 버전이 없거나 효과가 없으면 드라이버를 지우고 새로 설치합니다.",
      },
      {
        title: "드라이버 패키지까지 지우고 제조사 드라이버로 다시 설치",
        reason:
          "손상된 드라이버 파일이 남아 있으면 같은 파일을 계속 불러오다 실패하므로, 패키지까지 제거한 뒤 새 파일로 설치해야 합니다.",
        difficulty: "보통",
        time: "20~30분",
        steps: [
          "PC·장치 제조사 사이트에서 현재 Windows용 드라이버를 먼저 받아 둡니다. 네트워크 장치라면 다른 PC나 휴대폰으로 받아 USB 메모리에 옮깁니다.",
          "장치 관리자에서 해당 장치 → 디바이스 제거 → ‘이 장치의 드라이버를 제거하려고 합니다’를 체크하고 제거합니다.",
          "재부팅한 뒤 받아 둔 드라이버를 설치합니다.",
        ],
        checkPoint:
          "새 드라이버로 정상 동작하면 끝입니다. 같은 코드가 나오면 드라이버 자체보다 다른 소프트웨어가 로드를 막고 있을 수 있습니다.",
      },
      {
        title: "VPN·보안 프로그램을 공식 방법으로 제거해 비교",
        reason:
          "VPN·방화벽·암호화 프로그램은 장치 드라이버 위에 필터를 끼워 넣기 때문에, 그 필터가 깨지면 정상 드라이버도 로드에 실패할 수 있습니다.",
        difficulty: "보통",
        time: "15~30분",
        steps: [
          "설정 → 앱 → 설치된 앱(Windows 10은 앱 및 기능)에서 문제가 시작된 날 설치·업데이트한 VPN, 방화벽, 백업·암호화 프로그램을 찾습니다.",
          "그 프로그램의 제거 기능이나 공급업체 제거 도구로 지우고 재부팅합니다.",
          "장치 관리자에서 상태가 바뀌었는지 확인합니다. 레지스트리의 필터 값을 직접 지우지 않습니다.",
        ],
        checkPoint:
          "제거 후 장치가 정상화되면 그 프로그램이 원인이었을 가능성이 큽니다. 다시 쓰려면 최신 버전을 설치한 뒤 장치 상태를 다시 봅니다.",
      },
      {
        title: "여러 장치에서 나면 DISM과 sfc 실행",
        reason:
          "서로 다른 장치가 한꺼번에 코드 31을 보인다면 개별 드라이버보다 드라이버를 불러오는 Windows 구성요소가 손상됐을 수 있습니다.",
        difficulty: "보통",
        time: "20~40분",
        steps: [
          "Win + X → 터미널(관리자)을 열어 둡니다.",
          "DISM /Online /Cleanup-Image /RestoreHealth 를 실행하고 끝까지 기다립니다.",
          "이어서 sfc /scannow 를 실행한 뒤 재부팅하고 장치 관리자를 다시 확인합니다.",
        ],
        checkPoint:
          "복구 후 장치들이 정상으로 돌아오면 시스템 파일 문제였습니다. 그래도 남으면 문제가 시작되기 전 날짜의 복원 지점으로 시스템 복원(rstrui)을 검토합니다.",
      },
    ],
    faqs: [
      {
        question: "레지스트리의 UpperFilters·LowerFilters를 지우라는 글이 있던데요?",
        answer:
          "장치 종류마다 필요한 필터가 있을 수 있어 임의로 지우면 다른 장치까지 안 될 수 있습니다. 해당 장치 종류에 대한 공식 안내가 있을 때만, 키를 백업한 뒤 따르세요.",
      },
      {
        question: "네트워크 어댑터가 코드 31이라 인터넷이 안 되는데 드라이버는 어떻게 받나요?",
        answer:
          "다른 PC나 휴대폰으로 PC 제조사 사이트에서 랜·무선랜 드라이버를 받아 USB 메모리로 옮겨 설치하세요. 휴대폰 USB 테더링이 되면 임시로 그 연결을 써도 됩니다.",
      },
    ],
    sources: [SRC_DEVICE_MANAGER_CODES],
  },

  "device-manager-code-43": {
    reviewedAt: "2026-11-19",
    description:
      "장치 관리자의 코드 43은 ‘장치가 문제를 보고해 Windows가 이 장치를 중지했습니다’라는 뜻입니다. 드라이버나 장치가 스스로 오류를 알렸다는 의미라서, USB 장치와 그래픽카드에서 갑자기 동작이 멈출 때 자주 보입니다. USB와 그래픽카드는 확인 순서가 다르므로, 어떤 장치인지부터 나눈 뒤 연결·전원·드라이버 순으로 좁힙니다.",
    quickCheck: [
      "코드 43이 붙은 것이 USB 장치(‘알 수 없는 USB 장치’ 포함)인가요, 디스플레이 어댑터(그래픽카드)인가요?",
      "같은 장치를 다른 PC에 연결하면 정상인가요?",
      "그래픽카드라면 드라이버 업데이트 직후인가요, 아니면 PC 내부를 만지거나 옮긴 뒤인가요?",
    ],
    causes: [
      "드라이버가 장치 오류를 보고",
      "USB 전원 부족·케이블 불량",
      "USB 선택적 절전 기능으로 인한 연결 끊김",
      "그래픽카드 장착·보조 전원 연결 불량",
      "장치 자체 이상",
    ],
    solutions: [
      {
        title: "완전히 종료하고 전원을 뺐다가 다시 연결",
        reason:
          "장치가 오류 상태에 걸려 있으면 일반 재시작으로는 초기화되지 않을 수 있어, 전원을 완전히 끊어 장치를 처음 상태로 돌립니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "작업을 저장하고 Shift 키를 누른 채 시작 → 전원 → 시스템 종료를 눌러 빠른 시작 없이 완전히 끕니다.",
          "전원 케이블(노트북은 어댑터)과 문제 장치를 뺀 채 1분 정도 기다립니다.",
          "PC를 켠 뒤 장치를 다시 연결하고 장치 관리자에서 상태를 봅니다.",
        ],
        checkPoint:
          "다시 연결 후 정상이면 일시적인 장치 오류 상태였습니다. 곧 다시 코드 43이 붙으면 연결과 전원 쪽을 확인합니다.",
      },
      {
        title: "USB 장치는 포트·케이블·다른 PC로 구분",
        reason:
          "USB 장치가 전원 부족이나 신호 불량으로 오류를 보고하면 코드 43이 나기 때문에, 연결 경로를 바꾸면 장치 문제인지 PC 문제인지 나뉩니다.",
        difficulty: "쉬움",
        time: "10분",
        steps: [
          "허브를 빼고 다른 케이블로 PC 본체 포트에 직접 연결합니다.",
          "외장 하드처럼 전원을 많이 쓰는 장치는 전원 어댑터가 따로 있으면 연결합니다.",
          "같은 장치를 다른 PC에 연결해 정상 인식되는지 봅니다.",
        ],
        checkPoint:
          "다른 PC에서도 코드 43이나 인식 실패가 나면 장치나 케이블 쪽 문제일 가능성이 큽니다. 다른 PC에서는 정상이면 이 PC의 절전 설정과 드라이버를 봅니다.",
      },
      {
        title: "USB 선택적 절전 모드 끄고 비교",
        reason:
          "절전 기능이 USB 포트 전원을 잠깐 끊으면 일부 장치가 복귀 중 오류를 보고해 코드 43으로 멈출 수 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "Win + R → control 을 입력해 제어판을 엽니다.",
          "전원 옵션 → 사용 중인 전원 관리 옵션의 ‘설정 변경’ → ‘고급 전원 관리 옵션 설정 변경’을 누릅니다.",
          "USB 설정 → USB 선택적 절전 모드 설정을 ‘사용 안 함’으로 바꾸고 적용합니다. 항목이 보이지 않으면 이 단계는 건너뜁니다.",
          "PC를 다시 시작하고 장치를 연결합니다.",
        ],
        checkPoint:
          "절전 해제 후 코드 43이 다시 나지 않으면 절전 기능과의 충돌이었습니다. 변화가 없으면 설정을 원래대로 돌려도 됩니다.",
      },
      {
        title: "그래픽카드는 드라이버를 깨끗이 다시 설치",
        reason:
          "그래픽 드라이버가 손상되거나 버전이 맞지 않으면 GPU가 오류를 보고해 화면이 기본 해상도로 떨어지고 코드 43이 표시될 수 있습니다.",
        difficulty: "보통",
        time: "20~30분",
        steps: [
          "그래픽카드 제조사(NVIDIA·AMD·Intel)나 노트북 제조사 사이트에서 현재 Windows용 드라이버를 먼저 받아 둡니다.",
          "장치 관리자 → 디스플레이 어댑터에서 해당 그래픽카드 → 디바이스 제거 → ‘이 장치의 드라이버를 제거하려고 합니다’를 체크하고 제거합니다.",
          "다시 시작한 뒤 미리 받아 둔 그래픽 드라이버 설치 파일을 실행합니다.",
          "최근 드라이버 업데이트 직후 생긴 문제라면 한 단계 이전 버전을 설치해 비교합니다.",
        ],
        checkPoint:
          "드라이버를 다시 설치한 뒤 정상이면 소프트웨어 문제였습니다. 새 드라이버로도 곧바로 코드 43이 붙으면 장착·전원 상태를 확인합니다.",
      },
      {
        title: "데스크톱 그래픽카드 재장착과 보조 전원 확인",
        reason:
          "그래픽카드가 슬롯에 덜 꽂혔거나 보조 전원 커넥터가 헐거우면 카드가 오류를 보고할 수 있는데, 이는 내부 부품을 다루는 작업이라 마지막에 합니다.",
        difficulty: "어려움",
        time: "20~30분",
        steps: [
          "PC를 완전히 끄고 전원 플러그를 뽑은 뒤 전원 버튼을 몇 초 눌러 남은 전기를 뺍니다.",
          "케이스 금속 부분을 만져 정전기를 없앤 뒤 측면 덮개를 엽니다.",
          "그래픽카드 고정 나사와 슬롯 잠금 장치를 풀고 카드를 뺐다가 끝까지 다시 꽂습니다.",
          "6핀·8핀 보조 전원 커넥터를 딸깍 소리가 날 때까지 끝까지 꽂고 덮개를 닫은 뒤 켭니다.",
        ],
        checkPoint:
          "재장착 후 정상이면 접촉 문제였습니다. 그래도 코드 43이 남고 다른 PC에서도 같은 증상이면 카드 자체 이상일 수 있으니 제조사 보증 수리를 문의합니다.",
      },
    ],
    faqs: [
      {
        question: "코드 43은 그래픽카드 고장만 뜻하나요?",
        answer:
          "아닙니다. USB 장치, 블루투스, 웹캠 등 여러 장치에서 쓰이는 코드입니다. USB 장치는 연결·전원 확인이, 그래픽카드는 드라이버와 장착 상태 확인이 먼저입니다.",
      },
      {
        question: "‘알 수 없는 USB 장치(장치 설명자 요청 실패)’도 같은 문제인가요?",
        answer:
          "같은 코드 43 계열로 표시되는 경우가 많습니다. 케이블·포트 교체와 다른 PC 연결로 장치 쪽인지 먼저 확인하세요.",
      },
    ],
    warning:
      "그래픽카드를 다시 꽂기 전에는 반드시 전원 플러그를 뽑으세요. 케이스를 열면 제조사에 따라 보증에 영향을 줄 수 있으니, 보증 기간 내라면 먼저 제조사에 문의하세요.",
    sources: [SRC_DEVICE_MANAGER_CODES],
  },

  "device-manager-code-52": {
    reviewedAt: "2026-11-19",
    description:
      "장치 관리자의 코드 52는 ‘Windows가 이 장치에 필요한 드라이버의 디지털 서명을 확인할 수 없습니다’라는 뜻입니다. 오래된 장치용 드라이버나 공식이 아닌 경로에서 받은 드라이버를 설치한 뒤 자주 나타납니다. 지금 설치된 드라이버가 어디서 왔는지 확인하고, 현재 Windows를 지원하는 서명된 드라이버로 바꾸는 것이 기본 방향입니다.",
    quickCheck: [
      "이 장치의 드라이버를 제조사 공식 사이트에서 받았나요, 아니면 드라이버 모음 사이트나 동봉 CD에서 받았나요?",
      "장치 제조사가 현재 Windows 버전(Windows 11 등)을 지원한다고 밝히고 있나요?",
      "Windows 업데이트 직후 갑자기 코드 52가 생겼나요?",
    ],
    causes: [
      "서명되지 않았거나 서명이 만료된 드라이버",
      "설치 과정에서 손상된 드라이버 패키지",
      "현재 Windows를 지원하지 않는 오래된 드라이버",
      "비공식 경로에서 받은 드라이버",
    ],
    solutions: [
      {
        title: "설치된 드라이버의 공급자·서명자 확인",
        reason:
          "서명 확인 실패가 원인이므로, 지금 드라이버를 누가 만들었고 서명이 있는지부터 보면 교체할 대상이 분명해집니다.",
        difficulty: "쉬움",
        time: "3분",
        steps: [
          "Win + X → 장치 관리자에서 코드 52 장치를 두 번 클릭합니다.",
          "드라이버 탭에서 드라이버 공급자, 날짜, 버전, 디지털 서명자를 적습니다.",
          "디지털 서명자가 비어 있거나 ‘디지털 서명되지 않음’이면 그 드라이버를 받은 곳을 떠올려 적습니다.",
        ],
        checkPoint:
          "서명이 없거나 출처가 불분명하면 교체 대상입니다. 서명자가 표시되는데도 코드 52라면 패키지 손상일 수 있으니 다시 설치하는 단계로 갑니다.",
      },
      {
        title: "Windows Update 선택적 드라이버에서 서명된 버전 찾기",
        reason:
          "Windows Update로 배포되는 드라이버는 Microsoft 서명 검증을 거친 것이라, 해당 장치용이 있으면 가장 안전하게 바꿀 수 있습니다.",
        difficulty: "쉬움",
        time: "10~15분",
        steps: [
          "설정 → Windows 업데이트 → 고급 옵션 → 선택적 업데이트 → 드라이버 업데이트를 엽니다.",
          "해당 장치나 제조사 이름이 있는 항목을 체크하고 다운로드 및 설치를 누릅니다.",
          "재부팅 후 장치 상태를 확인합니다.",
        ],
        checkPoint:
          "목록의 드라이버로 정상화되면 끝입니다. 해당 항목이 없으면 제조사 사이트에서 받는 다음 단계로 갑니다.",
      },
      {
        title: "문제 드라이버를 지우고 제조사 서명 드라이버 설치",
        reason:
          "서명 문제가 있는 패키지가 남아 있으면 Windows가 계속 그 파일을 쓰려고 하므로, 패키지까지 지운 뒤 서명된 새 버전을 넣어야 합니다.",
        difficulty: "보통",
        time: "20~30분",
        steps: [
          "PC·장치 제조사 공식 사이트에서 현재 Windows 버전을 지원하는 최신 드라이버를 먼저 받아 둡니다.",
          "코드 52 장치를 마우스 오른쪽 클릭 → 디바이스 제거를 누르고, ‘이 장치의 드라이버를 제거하려고 합니다’까지 체크해 서명 문제가 있는 패키지를 함께 지웁니다.",
          "PC를 다시 시작하고 공식 사이트에서 받은 서명된 드라이버를 설치합니다.",
          "설치 후 드라이버 탭의 디지털 서명자가 표시되는지 확인합니다.",
        ],
        checkPoint:
          "서명자가 표시되고 장치가 정상으로 바뀌면 해결입니다. 제조사 최신 드라이버로도 코드 52가 나면 그 드라이버가 현재 Windows를 지원하지 않을 수 있습니다.",
      },
      {
        title: "지원 드라이버가 없으면 제조사 문의 또는 대체 장치 검토",
        reason:
          "Microsoft 문서도 코드 52에 대해 제조사의 최신 드라이버를 받거나 제조사에 도움을 요청하라고 안내하며, 서명된 드라이버가 없다면 Windows 쪽에서 안전하게 우회할 방법이 마땅치 않습니다.",
        difficulty: "보통",
        time: "제조사 답변 시간",
        cost: "대체 장치 구입 시 부품값",
        steps: [
          "장치 제조사 지원 창구에 모델명, 현재 Windows 버전(winver 결과), 코드 52를 알리고 서명된 호환 드라이버가 있는지 문의합니다.",
          "제조사가 지원 종료를 안내하면 현재 Windows를 공식 지원하는 대체 장치를 검토합니다.",
        ],
        checkPoint:
          "서명된 드라이버를 받으면 3단계 방법으로 설치합니다. 지원이 끝난 장치라면 서명 검사를 끄고 쓰기보다 교체하는 편이 보안상 안전합니다.",
      },
    ],
    faqs: [
      {
        question: "드라이버 서명 강제를 영구적으로 끄면 안 되나요?",
        answer:
          "권하지 않습니다. 서명 검사는 변조되거나 악성인 드라이버가 커널에 올라오는 것을 막는 장치라, 끄면 PC 전체 보안이 약해집니다. 서명된 호환 드라이버를 쓰는 것이 맞습니다.",
      },
      {
        question: "Windows 업데이트 뒤 갑자기 코드 52가 생겼어요.",
        answer:
          "업데이트로 서명 검증 기준이 강화되면서 오래된 드라이버가 막혔을 수 있습니다. 제조사 사이트에 최신 버전이 있는지 먼저 확인하세요.",
      },
    ],
    sources: [SRC_DEVICE_MANAGER_CODES],
  },

  "device-manager-code-19": {
    reviewedAt: "2026-11-19",
    description:
      "장치 관리자의 코드 19는 ‘레지스트리의 구성 정보가 불완전하거나 손상돼 Windows가 이 하드웨어 장치를 시작할 수 없습니다’라는 뜻입니다. 장치 관련 프로그램(가상 드라이브, 백업, CD 굽기, 장치 관리 도구 등)을 설치하거나 지운 뒤 남은 설정이 원인인 경우가 많습니다. 장치를 다시 등록하는 가벼운 방법부터 시도하고, 레지스트리 직접 편집은 공식 절차가 있을 때만 합니다.",
    quickCheck: [
      "코드 19가 생기기 직전에 그 장치와 관련된 프로그램을 설치하거나 제거했나요?",
      "문제 장치가 DVD 드라이브·키보드·USB 컨트롤러처럼 여러 프로그램이 필터를 거는 종류인가요?",
      "시스템 보호(복원 지점)가 켜져 있어 오류 이전 날짜의 복원 지점이 있나요?",
    ],
    causes: [
      "장치 구성 정보(레지스트리) 손상",
      "제거한 프로그램이 남긴 필터 설정",
      "중단된 드라이버 설치",
      "장치 관련 프로그램 간 충돌",
    ],
    solutions: [
      {
        title: "장치를 제거한 뒤 하드웨어 변경 검색으로 다시 등록",
        reason:
          "Microsoft 문서는 코드 19에 드라이버를 제거하고 다시 설치하라고 안내하며, 장치를 다시 등록하면 구성 정보가 새로 만들어집니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "Win + X → 장치 관리자를 열고 노란 느낌표 장치를 두 번 클릭해 장치 상태에 코드 19가 표시되는지 확인합니다.",
          "코드 19 장치를 마우스 오른쪽 클릭 → 디바이스 제거를 고릅니다. 구성 정보만 다시 만들 목적이므로 드라이버 삭제 확인란은 비워 둡니다.",
          "상단 메뉴 동작 → 하드웨어 변경 사항 검색을 누르거나 PC를 다시 시작합니다.",
        ],
        checkPoint:
          "다시 등록된 장치가 정상이면 해결입니다. 같은 코드 19가 바로 다시 나오면 다른 프로그램이 남긴 설정이 계속 적용되는 것일 수 있습니다.",
      },
      {
        title: "필터를 남긴 프로그램을 다시 설치한 뒤 정상 제거",
        reason:
          "프로그램을 불완전하게 지우면 장치에 걸어 둔 필터 설정만 남아 장치가 시작되지 못하므로, 같은 프로그램의 제거 기능으로 깨끗이 정리하는 것이 안전합니다.",
        difficulty: "보통",
        time: "15~30분",
        steps: [
          "오류 직전에 설치하거나 제거한 장치 관련 프로그램을 설정 → 앱 → 설치된 앱(Windows 10은 앱 및 기능)에서 확인합니다.",
          "아직 설치돼 있다면 그 프로그램을 최신 버전으로 업데이트하거나 제거 기능으로 지우고 재시작합니다.",
          "이미 지운 프로그램이라면 제조사 공식 사이트에서 같은 프로그램을 다시 설치한 뒤, 그 프로그램의 제거 기능으로 다시 지우고 재시작합니다.",
          "1단계의 디바이스 제거 → 하드웨어 변경 사항 검색을 한 번 더 합니다.",
        ],
        checkPoint:
          "정상 제거 뒤 장치가 살아나면 그 프로그램의 잔여 설정이 원인이었을 가능성이 큽니다. 어떤 프로그램인지 짐작이 안 되면 다음 단계의 시스템 복원을 검토합니다.",
      },
      {
        title: "오류 이전 복원 지점으로 시스템 복원",
        reason:
          "Microsoft 문서는 코드 19에 이전 레지스트리 구성이나 복원 지점으로 되돌리는 방법도 안내하며, 원인 프로그램을 모를 때 유용합니다.",
        difficulty: "어려움",
        time: "20~40분",
        steps: [
          "Win + R에 rstrui 를 입력해 시스템 복원을 엽니다.",
          "코드 19가 생기기 전 날짜의 복원 지점을 고릅니다.",
          "‘영향을 받는 프로그램 검색’을 눌러 복원 후 지워질 앱과 드라이버를 확인합니다.",
          "노트북은 전원 어댑터를 연결한 채 진행하고, 복원 중에는 전원을 끄지 않습니다.",
        ],
        checkPoint:
          "복원 후 장치가 정상이면 그 이후의 변경이 원인이었을 가능성이 큽니다. 지워진 프로그램은 필요한 것만 최신 버전으로 다시 설치합니다. 복원 지점이 없으면 이 단계는 쓸 수 없습니다.",
      },
      {
        title: "UpperFilters·LowerFilters 편집은 공식 절차와 백업이 있을 때만",
        reason:
          "장치 클래스의 필터 값이 원인일 수 있지만 장치에 따라 꼭 필요한 필터도 있어, 잘못 지우면 키보드·DVD 등이 아예 동작하지 않을 수 있습니다.",
        difficulty: "어려움",
        time: "15~30분",
        steps: [
          "해당 장치 종류(예: DVD/CD-ROM 드라이브)에 대해 Microsoft나 장치 제조사가 필터 값 삭제를 공식 안내하는 문서가 있는지 먼저 찾습니다.",
          "공식 안내가 있을 때만 regedit을 열고, 안내된 키를 마우스 오른쪽 클릭 → 내보내기로 .reg 파일로 백업합니다.",
          "안내에 적힌 값만 정확히 지우고, 다른 값은 건드리지 않은 채 재부팅합니다.",
          "문제가 생기면 백업한 .reg 파일을 더블클릭해 원래 값으로 되돌립니다.",
        ],
        checkPoint:
          "안내대로 편집 후 장치가 정상이면 끝입니다. 공식 안내를 찾지 못했다면 편집하지 말고 PC 제조사 지원이나 전문가에게 문의합니다.",
      },
    ],
    faqs: [
      {
        question: "UpperFilters 값을 무조건 지우면 해결되나요?",
        answer:
          "아닙니다. 장치에 따라 필수 필터가 들어 있을 수 있어, 지우면 다른 기능이 멈출 수 있습니다. 해당 장치 종류의 공식 절차와 레지스트리 백업 없이 지우지 마세요.",
      },
      {
        question: "시스템 복원을 하면 내 파일도 사라지나요?",
        answer:
          "시스템 복원은 문서·사진 같은 개인 파일은 건드리지 않고, 복원 지점 이후 설치한 앱·드라이버·설정을 되돌립니다. ‘영향을 받는 프로그램 검색’으로 미리 확인할 수 있습니다.",
      },
    ],
    warning:
      "레지스트리를 잘못 편집하면 장치나 Windows가 정상적으로 동작하지 않을 수 있습니다. 편집 전에는 반드시 해당 키를 내보내 백업하세요.",
    sources: [SRC_DEVICE_MANAGER_CODES],
  },
};
