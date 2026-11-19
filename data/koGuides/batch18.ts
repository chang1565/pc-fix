import type { KoGuide } from "./types";

const NTSTATUS = { title: "Microsoft Learn: [MS-ERREF] NTSTATUS Values", url: "https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-erref/596a1078-e883-4972-9bbc-49e60bebca55" };
const VC_REDIST = { title: "Microsoft Learn: Latest Supported Visual C++ Redistributable Downloads", url: "https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170" };
const SFC = { title: "Microsoft 지원: Windows에서 시스템 파일 검사기 사용", url: "https://support.microsoft.com/en-us/windows/using-system-file-checker-in-windows-365e0031-36b1-6031-f804-8fd86e0ef4ca" };
const OFFICE_REPAIR = { title: "Microsoft 지원: Office 응용 프로그램 복구", url: "https://support.microsoft.com/en-us/office/repair-an-office-application-7821d4b6-7c1d-4205-aa0e-a6b40c5bb88b" };
const NET35 = { title: "Microsoft Learn: Install .NET Framework 3.5 on Windows 10", url: "https://learn.microsoft.com/en-us/dotnet/framework/install/dotnet-35-windows" };
const WIN_SECURITY = { title: "Microsoft 지원: Windows 보안 앱의 바이러스 및 위협 방지", url: "https://support.microsoft.com/en-us/windows/allow-an-app-to-access-controlled-folders-b5b6627a-b008-2ca2-7931-7e51e912b034" };
const DX_WEB = { title: "Microsoft 다운로드 센터: DirectX End-User Runtime Web Installer", url: "https://www.microsoft.com/en-us/download/details.aspx?id=35" };
const DX_JUNE2010 = { title: "Microsoft 다운로드 센터: DirectX End-User Runtimes (June 2010)", url: "https://www.microsoft.com/en-us/download/details.aspx?id=8109" };
const MSI_CODES = { title: "Microsoft Learn: MsiExec.exe and InstMsi.exe error messages", url: "https://learn.microsoft.com/en-us/windows/win32/msi/error-codes" };
const MSI_MESSAGES = { title: "Microsoft Learn: Windows Installer Error Messages", url: "https://learn.microsoft.com/en-us/windows/win32/msi/windows-installer-error-messages" };
const MSIEXEC = { title: "Microsoft Learn: msiexec 명령", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/msiexec" };
const SXS = { title: "Microsoft Learn: About Side-by-Side Assemblies", url: "https://learn.microsoft.com/en-us/windows/win32/sbscs/about-side-by-side-assemblies-" };

export const batch18Errors: Record<string, KoGuide> = {
  "0xc000007b": {
    reviewedAt: "2026-11-19",
    description:
      "0xC000007B는 Windows가 실행 파일이나 함께 불러올 DLL을 정상적인 형식으로 읽지 못했다는 뜻입니다(STATUS_INVALID_IMAGE_FORMAT). 게임이나 오래된 프로그램에서 64비트 앱이 32비트 DLL을 불러오거나 그 반대가 되는 경우에 자주 보이므로, 먼저 앱의 비트 수와 누가 DLL을 바꿨는지를 나눠 봅니다.",
    quickCheck: [
      "앱이 C:\\Program Files (x86)에 설치돼 있나요? 그렇다면 32비트 앱일 가능성이 크고 x86 런타임이 필요합니다.",
      "오류가 나기 전에 인터넷에서 받은 DLL을 앱 폴더나 System32에 직접 넣은 적이 있나요?",
      "이 앱 하나만 0xC000007B로 실패하나요, 아니면 여러 프로그램이 같은 코드로 멈추나요?",
    ],
    causes: [
      "32비트·64비트 DLL이 섞여 불러와지는 상황",
      "직접 복사해 넣은 DLL의 버전·비트 불일치",
      "Visual C++ 런타임의 x86 또는 x64 한쪽 누락",
      "게임이 요구하는 레거시 DirectX 구성요소 누락",
      "설치 중단으로 손상된 실행 파일",
    ],
    solutions: [
      {
        title: "Visual C++ 재배포 패키지를 x86·x64 모두 설치",
        reason:
          "64비트 Windows에서도 32비트 앱은 x86 런타임을 쓰기 때문에, 한쪽만 설치돼 있으면 비트가 맞지 않는 DLL을 찾게 되어 이 코드가 날 수 있습니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "Microsoft Learn의 ‘Latest Supported Visual C++ Redistributable Downloads’ 문서에서 vc_redist.x64.exe와 vc_redist.x86.exe를 받습니다(https://aka.ms/vc14/vc_redist.x64.exe, https://aka.ms/vc14/vc_redist.x86.exe).",
          "두 파일을 차례로 실행합니다. 이미 설치돼 있다는 창이 나오면 ‘복구’를 고릅니다.",
          "PC를 다시 시작한 뒤 앱을 실행합니다.",
        ],
        checkPoint:
          "앱이 열리면 런타임 쪽 문제였을 가능성이 큽니다. 그대로라면 직접 넣은 DLL이 있는지 다음 단계에서 확인합니다.",
      },
      {
        title: "직접 넣은 DLL을 빼고 앱 파일 복구",
        reason:
          "다른 PC나 DLL 배포 사이트에서 가져온 파일은 비트 수가 다를 수 있고, 이런 파일 하나가 0xC000007B의 직접 원인이 되는 경우가 많습니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "앱 설치 폴더에 직접 넣은 DLL이 있다면 지우지 말고 바탕 화면의 새 폴더로 옮겨 둡니다.",
          "게임은 런처의 파일 검사를 실행합니다(Steam: 라이브러리 → 게임 오른쪽 클릭 → 속성 → 설치된 파일 → 게임 파일 무결성 확인).",
          "일반 앱은 설정 → 앱 → 설치된 앱 → 해당 앱 옆 ··· → 수정(또는 복구)을 실행합니다. Windows 10은 설정 → 앱 → 앱 및 기능입니다.",
        ],
        checkPoint:
          "복구 뒤 실행되면 옮겨 둔 DLL은 다시 쓰지 않습니다. System32·SysWOW64에 DLL을 넣었던 경우라면 마지막 단계의 시스템 파일 복구로 넘어갑니다.",
      },
      {
        title: "게임이 요구하는 DirectX·.NET 구성요소 설치",
        reason:
          "오래된 게임은 Windows에 기본으로 없는 레거시 DirectX 파일이나 .NET Framework 3.5를 불러오는데, 이 과정에서 형식 오류가 함께 보고되기도 합니다.",
        difficulty: "쉬움",
        time: "10~15분",
        steps: [
          "게임 설치 폴더에 _CommonRedist 또는 Redist 폴더가 있으면 안의 DirectX·vcredist 설치 파일을 실행합니다.",
          "폴더가 없으면 Microsoft 다운로드 센터의 DirectX End-User Runtime Web Installer(dxwebsetup.exe)를 실행합니다.",
          "게임 요구사항에 .NET Framework 3.5가 있으면 Win + R → optionalfeatures 입력 → ‘.NET Framework 3.5(.NET 2.0 및 3.0 포함)’를 체크하고 확인을 누릅니다.",
        ],
        checkPoint:
          "설치 뒤 게임이 시작되면 끝입니다. 여러 앱이 같은 코드로 실패한다면 Windows 쪽 파일을 의심하고 다음 단계로 갑니다.",
      },
      {
        title: "DISM과 SFC로 Windows 시스템 파일 되돌리기",
        reason:
          "System32에 다른 버전의 DLL이 덮어씌워졌다면 앱을 고쳐도 같은 오류가 반복되므로, Windows 원본 파일을 다시 맞춰야 합니다.",
        difficulty: "보통",
        time: "20~40분",
        steps: [
          "시작 버튼 오른쪽 클릭 → 터미널(관리자)를 엽니다. Windows 10은 Windows PowerShell(관리자)입니다.",
          "DISM.exe /Online /Cleanup-image /Restorehealth 를 입력하고 ‘작업을 완료했습니다’가 나올 때까지 기다립니다.",
          "이어서 sfc /scannow 를 실행하고 끝나면 PC를 다시 시작합니다.",
        ],
        checkPoint:
          "SFC가 손상 파일을 복구했다고 나오고 앱이 실행되면 해결된 것입니다. 복구할 수 없다는 메시지가 나오거나 그대로라면 앱 이름·버전과 오류 창을 제작사에 전달합니다.",
      },
    ],
    faqs: [
      {
        question: "Windows가 64비트면 x64 런타임만 설치하면 되나요?",
        answer:
          "아닙니다. 32비트로 만든 앱은 64비트 Windows에서도 x86 런타임을 씁니다. 어떤 앱인지 모르면 x86과 x64를 둘 다 설치해 두는 편이 안전합니다.",
      },
      {
        question: "오류 창에 나온 DLL을 다운로드 사이트에서 받아 넣으면 되나요?",
        answer:
          "권하지 않습니다. 비트 수나 버전이 다른 파일이 들어가면 오히려 0xC000007B가 생길 수 있고, 출처를 알 수 없는 파일은 보안 위험도 있습니다. Microsoft 런타임 패키지나 앱 복구로 정상 파일을 받으세요.",
      },
    ],
    sources: [NTSTATUS, VC_REDIST, DX_WEB, SFC],
  },

  "0xc0000142": {
    reviewedAt: "2026-11-19",
    description:
      "0xC0000142는 프로그램이 시작하면서 불러온 DLL의 초기화가 실패해 프로세스가 비정상 종료됐다는 뜻입니다(STATUS_DLL_INIT_FAILED). Office·게임을 누르자마자 이 창이 뜨고 꺼진다면, 업데이트가 덜 끝난 상태인지, 앱 구성요소가 손상됐는지, 다른 상주 프로그램이 끼어드는지를 차례로 나눕니다.",
    quickCheck: [
      "설정 → Windows 업데이트에 ‘다시 시작 필요’가 떠 있나요? 그렇다면 재시작부터 합니다.",
      "Office 앱(Word·Excel·Outlook)만 실패하나요, 게임·다른 프로그램도 같은 코드로 실패하나요?",
      "최근 화면 녹화·오버레이·보안 프로그램을 새로 설치했나요?",
    ],
    causes: [
      "재시작을 기다리는 Windows·앱 업데이트",
      "Office 또는 앱 구성요소 손상",
      "시작 시 끼어드는 오버레이·보안·상주 프로그램 충돌",
      "Visual C++ 런타임 손상",
      "Windows 시스템 파일 손상",
    ],
    solutions: [
      {
        title: "보류 중인 업데이트를 마치고 다시 시작",
        reason:
          "업데이트가 파일 교체를 재시작 뒤로 미뤄 둔 상태에서는 앱이 새 파일과 옛 파일을 섞어 불러와 초기화에 실패할 수 있습니다.",
        difficulty: "쉬움",
        time: "5~15분",
        steps: [
          "열린 문서를 저장합니다.",
          "설정 → Windows 업데이트를 열어 ‘지금 다시 시작’이 보이면 누릅니다. 없으면 ‘업데이트 확인’을 눌러 남은 업데이트를 설치합니다.",
          "시작 → 전원 → ‘업데이트 및 다시 시작’이 보이면 그 항목으로 재시작합니다.",
        ],
        checkPoint:
          "재시작 뒤 앱이 여러 번 정상 실행되면 업데이트 대기 상태가 원인이었을 수 있습니다. 같은 창이 뜨면 앱 종류에 따라 다음 단계를 고릅니다.",
      },
      {
        title: "Office라면 빠른 복구 후 온라인 복구",
        reason:
          "Office는 여러 앱이 공유 구성요소를 쓰기 때문에, 그 일부가 손상되면 Word·Excel이 모두 0xC0000142로 실패할 수 있습니다.",
        difficulty: "쉬움",
        time: "10~40분",
        steps: [
          "Office 앱을 모두 닫습니다.",
          "설정 → 앱 → 설치된 앱에서 Microsoft 365 또는 Office 옆 ··· → 수정을 누릅니다. Windows 10은 앱 및 기능에서 항목을 선택하고 수정을 누릅니다.",
          "‘빠른 복구’를 먼저 실행하고 Office 앱을 열어 봅니다.",
          "그래도 같으면 같은 화면에서 ‘온라인 복구’를 실행합니다. 인터넷 연결이 필요하고 Office를 다시 내려받아 시간이 더 걸립니다.",
        ],
        checkPoint:
          "복구 뒤 정상이면 끝입니다. 온라인 복구 뒤에도 같거나 Office가 아닌 앱이라면 다음 단계에서 상주 프로그램 영향을 확인합니다.",
      },
      {
        title: "클린 부팅으로 충돌 프로그램 찾기",
        reason:
          "화면 오버레이나 보안 프로그램은 다른 앱이 시작될 때 DLL을 주입하는 경우가 있어, 이 주입이 실패하면 초기화 오류로 보일 수 있습니다.",
        difficulty: "보통",
        time: "20~30분",
        steps: [
          "Win + R → msconfig 입력 → 서비스 탭에서 ‘모든 Microsoft 서비스 숨기기’를 체크하고 ‘모두 사용 안 함’을 누릅니다.",
          "Ctrl + Shift + Esc로 작업 관리자를 열고 시작 앱(Windows 10은 시작프로그램 탭)의 항목을 모두 ‘사용 안 함’으로 바꾼 뒤 재시작합니다.",
          "이 상태에서 문제 앱을 실행해 봅니다. 확인이 끝나면 msconfig와 작업 관리자에서 끈 항목을 다시 켭니다.",
        ],
        checkPoint:
          "클린 부팅에서만 정상이라면 서비스를 절반씩 켜며 재시작해 충돌하는 프로그램을 좁힙니다. 클린 부팅에서도 같으면 앱과 런타임 복구로 넘어갑니다.",
      },
      {
        title: "앱과 Visual C++ 런타임 복구",
        reason:
          "초기화에 실패한 DLL이 앱 자체 파일이나 공용 Visual C++ 런타임에 속해 있다면, 그 패키지를 복구해 버전을 다시 맞춰야 합니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "게임은 런처의 파일 검사를, 일반 앱은 설정 → 앱 → 설치된 앱 → ··· → 수정(복구)을 실행합니다.",
          "같은 목록에서 ‘Microsoft Visual C++ 2015-2022 Redistributable (x64)’와 ‘(x86)’을 각각 ··· → 수정 → 복구합니다.",
          "PC를 다시 시작하고 앱을 실행합니다.",
        ],
        checkPoint:
          "복구 뒤 정상이면 끝입니다. 여러 앱이 동시에 같은 코드로 실패한다면 Windows 파일 쪽 가능성이 커지므로 마지막 단계를 진행합니다.",
      },
      {
        title: "DISM·SFC로 Windows 구성요소 검사",
        reason:
          "서로 다른 프로그램이 같은 오류로 멈춘다면 공통으로 쓰는 Windows DLL이 손상됐을 수 있습니다.",
        difficulty: "보통",
        time: "20~40분",
        steps: [
          "시작 버튼 오른쪽 클릭 → 터미널(관리자)를 엽니다.",
          "DISM.exe /Online /Cleanup-image /Restorehealth 를 실행합니다.",
          "완료 메시지가 나오면 sfc /scannow 를 실행하고 재시작합니다.",
        ],
        checkPoint:
          "검사 뒤 여러 앱이 정상으로 돌아오면 끝입니다. 한 앱만 계속 실패하면 이벤트 뷰어 → Windows 로그 → 응용 프로그램에서 오류 시각의 기록을 캡처해 제작사에 문의합니다.",
      },
    ],
    faqs: [
      {
        question: "오류 창에 나온 DLL 파일 하나만 새로 받으면 되나요?",
        answer:
          "초기화 실패는 파일이 없는 것과 다릅니다. 파일은 있지만 다른 구성요소와 버전이 맞지 않거나 손상된 경우가 많으므로, 그 파일이 속한 앱이나 런타임 패키지 전체를 복구하는 편이 맞습니다.",
      },
      {
        question: "Office를 지우고 다시 설치해야 하나요?",
        answer:
          "대부분 온라인 복구가 재설치와 비슷한 효과를 냅니다. 온라인 복구도 실패할 때만 제거 후 재설치를 검토하세요. 라이선스 계정 정보를 미리 확인해 두면 좋습니다.",
      },
    ],
    sources: [NTSTATUS, OFFICE_REPAIR, VC_REDIST, SFC],
  },

  "0xc0000135": {
    reviewedAt: "2026-11-19",
    description:
      "0xC0000135는 앱을 시작하는 데 필요한 DLL을 찾지 못했다는 뜻입니다(STATUS_DLL_NOT_FOUND). 오류 창이나 이벤트 기록에 나온 DLL 이름을 보면 .NET, Visual C++, 앱 자체 파일 중 어느 쪽이 빠졌는지 대체로 가를 수 있습니다.",
    quickCheck: [
      "오류 창에 mscoree.dll, hostfxr.dll, vcruntime·msvcp로 시작하는 이름 중 하나가 보이나요?",
      "앱을 막 설치했나요, 아니면 잘 쓰던 앱이 갑자기 실패하나요? 후자라면 백신 격리 기록도 봅니다.",
      "앱 제작사 홈페이지의 시스템 요구사항에 .NET이나 Visual C++ 버전이 적혀 있나요?",
    ],
    causes: [
      ".NET Framework 또는 .NET 런타임 미설치",
      "Visual C++ 재배포 패키지 누락",
      "보안 프로그램이 앱 폴더의 DLL을 격리",
      "설치가 끝까지 되지 않아 앱 파일 일부 누락",
    ],
    solutions: [
      {
        title: "DLL 이름으로 필요한 런타임 구분",
        reason:
          "같은 0xC0000135라도 빠진 파일에 따라 설치할 패키지가 완전히 다르므로, 이름부터 확인하면 불필요한 설치를 줄일 수 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "오류 창에 DLL 이름이 있으면 그대로 적거나 캡처합니다.",
          "이름이 안 보이면 Win + X → 이벤트 뷰어 → Windows 로그 → 응용 프로그램에서 오류 시각의 기록을 엽니다.",
          "mscoree.dll이면 .NET Framework, hostfxr.dll이면 최신 .NET 런타임, vcruntime·msvcp로 시작하면 Visual C++ 쪽일 가능성이 큽니다.",
        ],
        checkPoint:
          ".NET 계열이면 다음 단계, Visual C++ 계열이면 그다음 단계로 갑니다. 앱 이름이 들어간 DLL이라면 보안 격리와 앱 복구 단계로 바로 넘어갑니다.",
      },
      {
        title: "앱이 요구하는 .NET 런타임 설치",
        reason:
          "Windows에 기본으로 들어 있는 .NET Framework 4는 3.5 이하용 앱을 실행하지 못하고, 최신 .NET 앱은 별도 런타임이 있어야 시작됩니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          ".NET Framework 3.5가 필요하면 Win + R → optionalfeatures → ‘.NET Framework 3.5(.NET 2.0 및 3.0 포함)’를 체크하고 확인을 누릅니다. 인터넷 연결이 필요합니다.",
          "Windows 11 26H1(빌드 28000) 이후에서는 이 항목이 Windows 기능으로 제공되지 않으므로 Microsoft가 안내하는 독립 설치 파일을 써야 합니다.",
          "hostfxr.dll처럼 최신 .NET이 필요하면 Microsoft .NET 다운로드 페이지에서 앱이 요구하는 버전의 Desktop Runtime(x64 또는 x86)을 설치합니다.",
        ],
        checkPoint:
          "설치 뒤 앱이 시작되면 끝입니다. 이미 설치돼 있는데도 같은 이름이 나오면 앱 쪽 파일 문제일 수 있으니 격리 기록을 확인합니다.",
      },
      {
        title: "Visual C++ DLL이면 재배포 패키지 설치",
        reason:
          "vcruntime·msvcp 계열 DLL은 앱이 아니라 Microsoft Visual C++ 재배포 패키지가 제공하므로, 해당 패키지가 없으면 앱이 시작 단계에서 멈춥니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "DLL 이름 끝 숫자를 봅니다. 140이면 2015-2022(v14), 120이면 2013, 100이면 2010 패키지입니다.",
          "Microsoft Learn의 Visual C++ 재배포 패키지 문서에서 해당 버전의 x86·x64 파일을 받아 둘 다 설치합니다.",
          "PC를 다시 시작합니다.",
        ],
        checkPoint:
          "메시지가 사라지면 끝입니다. 패키지를 설치했는데도 같은 DLL이 없다고 나오면 다음 단계에서 보안 격리를 확인합니다.",
      },
      {
        title: "보호 기록에서 격리된 파일 확인 후 앱 복구 설치",
        reason:
          "잘 실행되던 앱이 갑자기 이 코드를 내면 백신이 앱 폴더의 DLL을 격리해 파일이 사라졌을 가능성이 있습니다.",
        difficulty: "쉬움",
        time: "10~15분",
        steps: [
          "Windows 보안 → 바이러스 및 위협 방지 → 보호 기록에서 앱 설치 경로가 들어간 항목을 찾습니다. 다른 백신을 쓰면 그 프로그램의 격리 목록을 봅니다.",
          "격리 기록이 있으면 파일을 되살리기보다 제작사 공식 사이트에서 설치 파일을 새로 받아 복구 설치합니다.",
          "격리 기록이 없어도 설정 → 앱 → 설치된 앱 → ··· → 수정(또는 제거 후 재설치)으로 앱 파일을 다시 채웁니다.",
        ],
        checkPoint:
          "복구 뒤 실행되면 끝입니다. 다시 격리되면 제작사에 오탐 여부를 문의하고, 격리 기록 없이 계속 실패하면 DLL 이름과 Windows 버전을 함께 전달합니다.",
      },
    ],
    faqs: [
      {
        question: "무조건 .NET Framework 3.5를 켜면 해결되나요?",
        answer:
          "아닙니다. 앱마다 필요한 런타임이 다릅니다. mscoree.dll이 언급되거나 요구사항에 3.5가 적혀 있을 때만 의미가 있고, Visual C++ DLL이 없다는 경우에는 효과가 없습니다.",
      },
      {
        question: "다른 PC에서 같은 DLL을 복사해 와도 되나요?",
        answer:
          "버전이나 비트 수가 다르면 0xC000007B 같은 다른 오류로 바뀔 수 있습니다. 런타임 패키지나 앱 설치 파일로 정상 경로를 통해 받는 것이 안전합니다.",
      },
    ],
    sources: [NTSTATUS, NET35, VC_REDIST, WIN_SECURITY],
  },

  "0xc000012f": {
    reviewedAt: "2026-11-19",
    description:
      "0xC000012F는 ‘잘못된 이미지(Bad Image)’ 창과 함께 나오며, 앱이 불러오려는 파일이 정상적인 실행 파일 형식이 아니라는 뜻입니다. 창에 표시된 DLL 경로가 앱 폴더인지 C:\\Windows 아래인지에 따라 앱을 고칠지 Windows를 고칠지가 갈립니다.",
    quickCheck: [
      "Bad Image 창의 경로가 C:\\Program Files 같은 앱 폴더인가요, C:\\Windows\\System32·SysWOW64인가요?",
      "Windows 업데이트가 설치된 직후부터 이 창이 뜨기 시작했나요?",
      "같은 창이 앱마다 다른 DLL 이름으로 계속 나오나요? 그렇다면 저장장치 상태도 의심합니다.",
    ],
    causes: [
      "앱 폴더의 DLL 손상 또는 잘못된 버전",
      "설치·업데이트 중단으로 덜 쓰인 파일",
      "업데이트 직후 교체된 Windows 파일 문제",
      "저장장치 오류로 손상된 파일",
    ],
    solutions: [
      {
        title: "Bad Image 창의 경로 기록하기",
        reason:
          "이 오류는 손상된 파일의 전체 경로를 알려 주므로, 경로를 보면 복구 대상을 바로 정할 수 있습니다.",
        difficulty: "쉬움",
        time: "2분",
        steps: [
          "창을 닫기 전에 Win + Shift + S로 캡처하거나 경로를 메모장에 적습니다.",
          "경로에 앱 이름이 들어 있으면 다음 단계(앱 복구)로, C:\\Windows가 들어 있으면 그다음 단계(Windows 복구)로 갑니다.",
          "표시된 DLL을 직접 지우거나 다른 PC에서 복사해 덮어쓰지 않습니다.",
        ],
        checkPoint:
          "경로를 확보했으면 해당 단계로 넘어갑니다. 창이 너무 빨리 사라지면 이벤트 뷰어 → Windows 로그 → 응용 프로그램에서 같은 시각의 기록을 찾습니다.",
      },
      {
        title: "앱 폴더 DLL이면 앱 복구 또는 재설치",
        reason:
          "앱이 함께 설치한 파일이 손상된 경우라 앱 설치 프로그램이 정상 파일로 바꿔 넣어야 합니다.",
        difficulty: "쉬움",
        time: "10~30분",
        steps: [
          "설정 → 앱 → 설치된 앱에서 해당 앱 ··· → 수정(또는 복구)을 실행합니다. Office라면 빠른 복구 후 안 되면 온라인 복구를 고릅니다.",
          "복구 메뉴가 없으면 앱을 제거하고 공식 사이트에서 새로 받은 설치 파일로 다시 설치합니다.",
          "게임은 런처의 파일 검사(Steam은 게임 파일 무결성 확인)로 대신할 수 있습니다.",
        ],
        checkPoint:
          "같은 경로가 다시 나오지 않으면 끝입니다. 복구했는데도 같은 파일이 계속 손상된다면 마지막 단계에서 드라이브를 검사합니다.",
      },
      {
        title: "업데이트 직후라면 해당 업데이트 제거",
        reason:
          "System32 파일이 업데이트 직후 문제를 일으킨 경우, 그 업데이트를 빼면 이전 파일로 돌아가 오류가 멈출 수 있습니다.",
        difficulty: "보통",
        time: "10~20분",
        steps: [
          "설정 → Windows 업데이트 → 업데이트 기록에서 오류가 시작된 날짜에 설치된 항목을 확인합니다.",
          "같은 화면 아래 ‘업데이트 제거’에서 그 업데이트를 제거하고 재시작합니다. Windows 10은 설정 → 업데이트 및 보안 → 업데이트 기록 보기 → 업데이트 제거입니다.",
        ],
        checkPoint:
          "제거 뒤 창이 사라지면 Microsoft가 수정판을 낼 때까지 같은 업데이트가 다시 설치되는지 지켜봅니다. 업데이트와 관계없거나 그대로라면 다음 단계로 갑니다.",
      },
      {
        title: "DISM·SFC로 Windows DLL 복원",
        reason:
          "경로가 C:\\Windows 아래라면 Windows 구성요소 저장소에서 원본 파일을 다시 가져와야 합니다.",
        difficulty: "보통",
        time: "20~40분",
        steps: [
          "시작 버튼 오른쪽 클릭 → 터미널(관리자)를 엽니다.",
          "DISM.exe /Online /Cleanup-image /Restorehealth 를 먼저 실행합니다.",
          "완료되면 sfc /scannow 를 실행하고 재시작합니다.",
        ],
        checkPoint:
          "재시작 뒤 같은 경로가 나오지 않으면 끝입니다. SFC가 일부 파일을 복구하지 못했다고 나오면 Windows 복구 설치를 검토해야 하므로 다음 단계에서 백업과 드라이브 검사를 먼저 합니다.",
      },
      {
        title: "중요 파일 백업 후 드라이브 오류 검사",
        reason:
          "여러 파일이 번갈아 Bad Image로 나온다면 저장장치에서 파일이 깨지고 있을 수 있어, 복구를 반복하기 전에 데이터를 지키고 드라이브 상태를 봐야 합니다.",
        difficulty: "어려움",
        time: "30분~1시간",
        steps: [
          "문서·사진 등 중요한 파일을 외장 드라이브나 클라우드에 먼저 복사합니다.",
          "터미널(관리자)에서 chkdsk C: /scan 을 실행해 온라인으로 오류를 검사합니다.",
          "오류가 발견됐다고 나오면 결과 화면을 캡처해 두고, 재시작이 필요한 복구는 백업이 끝난 뒤에 진행합니다.",
        ],
        checkPoint:
          "오류가 없다고 나오면 저장장치 쪽 가능성은 낮아집니다. 오류가 반복해서 나오면 저장장치 교체를 검토하고, 그 전에는 큰 복구 작업을 미룹니다.",
      },
    ],
    faqs: [
      {
        question: "Bad Image 창에 나온 DLL을 삭제하면 되나요?",
        answer:
          "필수 파일일 수 있어 삭제하면 앱이나 Windows가 더 크게 망가질 수 있습니다. 앱 복구나 SFC 같은 공식 복구 절차로 정상 파일을 다시 넣으세요.",
      },
      {
        question: "0xC000007B와 무엇이 다른가요?",
        answer:
          "둘 다 실행 이미지 형식 문제지만, 0xC000012F는 파일 자체가 실행 파일 형식이 아닐 만큼 깨진 경우에 주로 보입니다. 그래서 비트 수보다 파일 손상과 복구를 먼저 봅니다.",
      },
    ],
    warning:
      "같은 오류가 여러 파일에서 번갈아 나오면 저장장치 손상 가능성이 있습니다. 복구 작업 전에 중요한 파일부터 백업하세요.",
    sources: [NTSTATUS, OFFICE_REPAIR, SFC],
  },

  "0xc0000022": {
    reviewedAt: "2026-11-19",
    description:
      "0xC0000022는 앱이 실행에 필요한 파일이나 개체에 접근하려 했지만 권한이 없어 거부됐다는 뜻입니다(STATUS_ACCESS_DENIED). 특정 계정에서만 안 되는지, 보안 기능이 막는지, 설치 폴더 권한이 바뀌었는지를 나누면 범위가 빨리 좁혀집니다.",
    quickCheck: [
      "관리자 계정이나 다른 사용자 계정에서는 같은 앱이 실행되나요?",
      "Windows 보안 알림이나 ‘앱이 차단됨’ 메시지가 함께 떴나요?",
      "회사·학교에서 관리하는 PC인가요? 그렇다면 정책으로 막혔을 수 있습니다.",
    ],
    causes: [
      "설치 폴더·파일의 읽기 및 실행 권한 누락",
      "제어된 폴더 액세스 등 보안 기능의 차단",
      "회사 정책(AppLocker 등)에 의한 실행 제한",
      "사용자 계정별 권한 차이",
    ],
    solutions: [
      {
        title: "관리자 권한·다른 계정으로 실행해 비교",
        reason:
          "권한 거부 오류는 계정에 따라 결과가 달라지므로, 비교만으로도 계정 권한 문제인지 보안 차단인지 갈라집니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "앱 바로 가기를 오른쪽 클릭 → ‘관리자 권한으로 실행’을 누릅니다.",
          "가능하면 같은 PC의 다른 사용자 계정으로 로그인해 일반 실행해 봅니다.",
        ],
        checkPoint:
          "관리자 권한이나 다른 계정에서만 실행되면 설치 폴더 권한 쪽 가능성이 큽니다. 어느 쪽에서도 같으면 보안 차단 기록을 먼저 확인합니다.",
      },
      {
        title: "Windows 보안 보호 기록과 제어된 폴더 액세스 확인",
        reason:
          "제어된 폴더 액세스나 백신이 앱의 파일 접근을 막으면 앱 입장에서는 권한 거부로 보입니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "Windows 보안 → 바이러스 및 위협 방지 → 보호 기록에서 이 앱 경로가 들어간 차단 기록을 찾습니다.",
          "같은 화면의 ‘랜섬웨어 방지 관리’에서 제어된 폴더 액세스가 켜져 있는지 봅니다.",
          "켜져 있고 이 앱이 차단됐다면 ‘제어된 폴더 액세스를 통해 앱 허용’ → ‘허용되는 앱 추가’에서 공식 설치 경로의 실행 파일만 추가합니다.",
        ],
        checkPoint:
          "허용 뒤 실행되면 끝입니다. 허용한 앱은 보호 폴더의 파일에 접근할 수 있으므로 출처가 확실한 앱만 추가하세요. 차단 기록이 없으면 다음 단계로 갑니다.",
      },
      {
        title: "설치 폴더의 읽기 및 실행 권한 확인",
        reason:
          "폴더를 다른 드라이브에서 복사해 왔거나 권한을 손댄 적이 있으면 일반 사용자에게 실행 권한이 빠져 있을 수 있습니다.",
        difficulty: "보통",
        time: "10~20분",
        steps: [
          "앱 설치 폴더를 오른쪽 클릭 → 속성 → 보안 탭을 엽니다.",
          "Users(또는 현재 계정)를 선택해 ‘읽기 및 실행’이 허용인지 봅니다.",
          "빠져 있으면 권한을 직접 바꾸기보다 앱을 제거한 뒤 공식 설치 프로그램으로 기본 경로(C:\\Program Files)에 다시 설치합니다.",
        ],
        checkPoint:
          "재설치 뒤 일반 계정에서 실행되면 끝입니다. 권한 항목이 회색으로 바꿀 수 없게 돼 있다면 관리 정책이 적용된 상태일 수 있으니 관리자에게 문의합니다.",
      },
      {
        title: "여러 앱이 동시에 실패하면 시스템 파일 검사",
        reason:
          "한 앱이 아니라 여러 프로그램이 같은 코드로 막힌다면 공통 시스템 파일이나 권한 구성이 손상됐을 가능성이 있습니다.",
        difficulty: "보통",
        time: "20~40분",
        steps: [
          "터미널(관리자)에서 DISM.exe /Online /Cleanup-image /Restorehealth 를 실행합니다.",
          "완료되면 sfc /scannow 를 실행하고 재시작합니다.",
        ],
        checkPoint:
          "검사 뒤 여러 앱이 정상으로 돌아오면 끝입니다. 회사 PC에서 특정 앱만 막혀 있다면 우회하지 말고 관리자에게 사용 승인을 요청합니다.",
      },
    ],
    faqs: [
      {
        question: "0xC0000005 액세스 위반과 같은 오류인가요?",
        answer:
          "다릅니다. 0xC0000022는 파일·개체 접근 권한이 거부된 것이고, 0xC0000005는 프로그램이 잘못된 메모리 주소에 접근한 예외입니다. 확인할 곳도 권한·보안 쪽과 앱·드라이버 쪽으로 나뉩니다.",
      },
      {
        question: "항상 관리자 권한으로 실행하도록 설정해도 되나요?",
        answer:
          "임시 확인용으로는 괜찮지만 상시 설정은 권하지 않습니다. 앱이 필요 이상으로 높은 권한을 갖게 되므로, 원인을 찾아 일반 권한에서 실행되도록 고치는 편이 안전합니다.",
      },
    ],
    sources: [NTSTATUS, WIN_SECURITY, SFC],
  },

  "vcruntime140-dll": {
    reviewedAt: "2026-11-19",
    description:
      "VCRUNTIME140.dll이 없다는 메시지는 Visual C++로 만든 앱이 Microsoft Visual C++ v14(2015~2022 이후) 런타임을 찾지 못할 때 나옵니다. 새로 설치한 게임·프로그램을 처음 실행할 때 흔하며, 런타임이 아예 없는지, 있는데 손상됐는지, 비트 수가 맞지 않는지를 가르면 됩니다.",
    quickCheck: [
      "설정 → 앱 → 설치된 앱에서 ‘Visual C++’로 검색했을 때 2015-2022 Redistributable 항목이 (x64)·(x86) 둘 다 있나요?",
      "앱을 막 설치했나요, 아니면 잘 되던 앱에서 갑자기 나타났나요?",
      "인터넷에서 받은 vcruntime140.dll을 앱 폴더에 넣어 본 적이 있나요?",
    ],
    causes: [
      "Visual C++ v14 재배포 패키지 미설치",
      "x86 또는 x64 패키지 한쪽만 설치",
      "설치된 런타임 패키지 손상",
      "앱 설치 과정에서 의존성 설치 건너뜀",
      "보안 프로그램의 파일 격리",
    ],
    solutions: [
      {
        title: "설치된 Visual C++ 2015-2022 항목 확인",
        reason:
          "이미 설치돼 있으면 새로 받기보다 복구가 맞고, 없으면 설치가 맞기 때문에 첫 확인만으로 다음 행동이 정해집니다.",
        difficulty: "쉬움",
        time: "2분",
        steps: [
          "설정 → 앱 → 설치된 앱을 엽니다. Windows 10은 설정 → 앱 → 앱 및 기능입니다.",
          "검색창에 Visual C++ 를 입력합니다.",
          "‘Microsoft Visual C++ 2015-2022 Redistributable (x64)’와 ‘(x86)’이 있는지 봅니다. 이름이 2015-2019 등으로 보일 수도 있습니다.",
        ],
        checkPoint:
          "한쪽이라도 없으면 다음 단계에서 설치합니다. 둘 다 있다면 그다음 단계에서 복구합니다.",
      },
      {
        title: "Microsoft 공식 vc_redist를 x64·x86 모두 설치",
        reason:
          "VCRUNTIME140.dll은 이 패키지가 설치하는 파일이므로, 공식 패키지를 설치하면 버전과 서명이 맞는 파일이 제자리에 들어갑니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "https://aka.ms/vc14/vc_redist.x64.exe 와 https://aka.ms/vc14/vc_redist.x86.exe 를 받습니다(Microsoft Learn 문서의 공식 링크).",
          "두 파일을 차례로 실행해 설치합니다.",
          "PC를 다시 시작하고 앱을 실행합니다.",
        ],
        checkPoint:
          "메시지가 사라지면 끝입니다. 설치가 이미 돼 있다고 나오면 다음 단계에서 복구합니다.",
      },
      {
        title: "기존 2015-2022 패키지 복구",
        reason:
          "패키지는 목록에 있어도 파일이 손상되거나 일부가 지워졌다면 앱은 여전히 파일을 찾지 못합니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "설치된 앱 목록에서 ‘Microsoft Visual C++ 2015-2022 Redistributable (x64)’ 옆 ··· → 수정을 누릅니다.",
          "열린 창에서 ‘복구’를 선택합니다.",
          "(x86) 항목도 같은 방법으로 복구하고 재시작합니다.",
        ],
        checkPoint:
          "복구 뒤 실행되면 끝입니다. 그대로라면 앱 자체가 의존성을 제대로 설치하지 못했을 수 있으니 다음 단계로 갑니다.",
      },
      {
        title: "앱 복구와 격리 기록 확인",
        reason:
          "일부 앱은 런타임을 자기 폴더에 함께 두는데, 그 파일이 빠졌거나 백신이 격리했다면 시스템 런타임과 별개로 오류가 날 수 있습니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "앱 폴더에 직접 넣은 vcruntime140.dll이 있으면 다른 폴더로 옮깁니다.",
          "앱은 설치된 앱 → ··· → 수정으로 복구하고, 게임은 Steam의 게임 파일 무결성 확인 등 런처 복구를 실행합니다.",
          "Windows 보안 → 바이러스 및 위협 방지 → 보호 기록에서 vcruntime140.dll이나 앱 경로의 격리 기록이 있는지 봅니다.",
        ],
        checkPoint:
          "복구 뒤 실행되면 끝입니다. 격리가 반복되면 제작사에 알리고, 기록이 없는데도 계속되면 오류 창과 앱 버전을 제작사에 전달합니다.",
      },
    ],
    faqs: [
      {
        question: "DLL 다운로드 사이트에서 vcruntime140.dll만 받아도 되나요?",
        answer:
          "권하지 않습니다. 개별 파일은 버전·비트 수·서명이 맞는지 알기 어렵고 악성 파일일 위험도 있습니다. Microsoft 공식 재배포 패키지가 같은 파일을 정상 경로로 설치합니다.",
      },
      {
        question: "Visual C++ 2015, 2017, 2019, 2022를 각각 설치해야 하나요?",
        answer:
          "Microsoft 문서에 따르면 2017 이후 버전은 같은 v14 재배포 파일을 공유하므로 최신 v14 패키지 하나(x86·x64)로 충분합니다. 2013 이하 버전은 별도 패키지입니다.",
      },
    ],
    sources: [VC_REDIST, WIN_SECURITY],
  },

  "vcruntime140-1-dll": {
    reviewedAt: "2026-11-19",
    description:
      "VCRUNTIME140_1.dll 누락은 VCRUNTIME140.dll은 있지만 더 새로운 v14 런타임에 포함된 추가 파일이 없을 때 나타납니다. 예전에 설치한 Visual C++ 2015·2017 패키지만 있는 PC에서 최근 빌드된 64비트 앱을 실행할 때 흔하므로, 설치된 패키지의 버전과 x64 여부부터 봅니다.",
    quickCheck: [
      "설치된 앱에서 Visual C++ 항목 이름이 2015나 2017로만 되어 있나요? 그렇다면 오래된 v14일 수 있습니다.",
      "(x64) 항목이 아예 없나요? 이 파일은 주로 64비트 앱에서 요구됩니다.",
      "VCRUNTIME140.dll 메시지는 안 나오고 _1이 붙은 파일만 없다고 나오나요?",
    ],
    causes: [
      "오래된 Visual C++ 2015·2017 v14 패키지만 설치",
      "x64 패키지 미설치",
      "v14 패키지 손상",
      "앱 폴더의 오래된 런타임 파일이 먼저 불러와지는 상황",
    ],
    solutions: [
      {
        title: "설치된 v14 패키지 버전과 x64 항목 확인",
        reason:
          "VCRUNTIME140_1.dll은 Visual Studio 2019 무렵 이후의 v14 패키지에 들어 있으므로, 패키지 버전이 낮으면 이름은 같아도 파일이 없을 수 있습니다.",
        difficulty: "쉬움",
        time: "3분",
        steps: [
          "설정 → 앱 → 설치된 앱에서 Visual C++ 를 검색합니다. Windows 10은 앱 및 기능입니다.",
          "(x64) 항목이 있는지, 이름이 2015 또는 2017로만 되어 있는지 확인합니다.",
          "항목을 선택하면 보이는 버전 번호가 14.2x보다 낮은지도 봅니다.",
        ],
        checkPoint:
          "x64 항목이 없거나 오래됐다면 다음 단계에서 최신 x64를 설치합니다. 최신 x64가 이미 있다면 복구 단계로 넘어갑니다.",
      },
      {
        title: "최신 vc_redist.x64.exe 설치",
        reason:
          "최신 v14 패키지는 이전 v14 설치를 그 자리에서 올려 주며, 이 과정에서 빠져 있던 _1 파일이 추가됩니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "https://aka.ms/vc14/vc_redist.x64.exe 를 받아 실행합니다.",
          "32비트 앱도 쓰고 있다면 https://aka.ms/vc14/vc_redist.x86.exe 도 함께 설치해 둡니다.",
          "설치가 끝나면 재시작한 뒤 앱을 실행합니다.",
        ],
        checkPoint:
          "메시지 없이 열리면 끝입니다. ‘이미 최신 버전이 설치됨’이 나오거나 그대로라면 다음 단계에서 복구합니다.",
      },
      {
        title: "x64 패키지 복구",
        reason:
          "최신 버전이 설치돼 있는데도 파일이 없다고 나오면 설치 상태가 손상돼 일부 파일이 빠졌을 가능성이 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "설치된 앱 → ‘Microsoft Visual C++ 2015-2022 Redistributable (x64)’ ··· → 수정 → 복구를 실행합니다.",
          "완료 후 PC를 다시 시작합니다.",
        ],
        checkPoint:
          "복구 뒤 실행되면 끝입니다. 계속되면 앱 폴더 쪽 파일을 확인합니다.",
      },
      {
        title: "앱 폴더의 오래된 런타임 파일 정리 후 앱 복구",
        reason:
          "앱 폴더에 예전 vcruntime140.dll이 함께 들어 있으면 Windows가 그 파일을 먼저 불러와 짝이 맞는 _1 파일을 찾지 못할 수 있습니다.",
        difficulty: "보통",
        time: "10~20분",
        steps: [
          "앱 실행 파일이 있는 폴더에 vcruntime140.dll·msvcp140.dll을 직접 넣은 적이 있다면 다른 폴더로 옮깁니다. 앱이 원래 포함한 파일이면 건드리지 않습니다.",
          "설치된 앱 → ··· → 수정으로 앱을 복구하거나 런처의 파일 검사를 실행합니다.",
        ],
        checkPoint:
          "복구 뒤 실행되면 끝입니다. 계속되면 앱이 지원하는 Windows 버전과 아키텍처(x64·ARM64)를 제작사 요구사항에서 다시 확인합니다.",
      },
    ],
    faqs: [
      {
        question: "VCRUNTIME140.dll이 있는데 왜 _1 파일이 없나요?",
        answer:
          "두 파일은 같은 v14 계열이지만 _1 파일은 나중 버전 패키지에 추가된 것입니다. 오래된 v14 패키지에는 VCRUNTIME140.dll만 있을 수 있어 최신 패키지로 올려야 합니다.",
      },
      {
        question: "ARM64 노트북에서도 x64 패키지를 설치하나요?",
        answer:
          "Microsoft 문서에 따르면 최신 x64 재배포 패키지에는 ARM64와 x64 바이너리가 함께 들어 있습니다. 앱이 x64용이라면 x64 패키지를 설치하면 됩니다.",
      },
    ],
    sources: [VC_REDIST],
  },

  "msvcp140-dll": {
    reviewedAt: "2026-11-19",
    description:
      "MSVCP140.dll은 Visual C++ v14의 C++ 표준 라이브러리 파일로, 새 게임이나 그래픽·영상 프로그램을 실행할 때 없다는 메시지가 자주 보입니다. 같은 v14 패키지가 설치하는 파일이라 런타임 설치·복구로 대부분 정리되고, 게임이라면 게임 폴더의 재배포 설치 파일도 함께 봅니다.",
    quickCheck: [
      "게임인가요? 설치 폴더에 _CommonRedist 같은 폴더가 있으면 게임이 필요한 런타임을 함께 제공합니다.",
      "VCRUNTIME140.dll 오류도 같이 나오나요? 둘 다라면 v14 패키지가 통째로 빠졌을 가능성이 큽니다.",
      "백신이 최근 게임 폴더에서 무언가를 격리했다는 알림을 띄웠나요?",
    ],
    causes: [
      "Visual C++ v14 런타임 누락",
      "x86·x64 중 앱에 맞는 패키지 누락",
      "게임 설치 중 재배포 패키지 설치 단계 건너뜀",
      "보안 프로그램의 MSVCP140.dll 격리",
    ],
    solutions: [
      {
        title: "Visual C++ v14 패키지를 두 아키텍처 모두 설치",
        reason:
          "MSVCP140.dll은 Visual C++ 2015-2022 재배포 패키지에 포함되므로, 이 패키지를 설치하거나 복구하면 표준 라이브러리 파일이 다시 갖춰집니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "Microsoft Learn 문서의 공식 링크에서 vc_redist.x64.exe와 vc_redist.x86.exe를 받습니다.",
          "둘 다 실행하고, 이미 설치됐다고 나오면 ‘복구’를 고릅니다.",
          "재시작한 뒤 프로그램을 다시 실행합니다.",
        ],
        checkPoint:
          "오류가 사라지면 끝입니다. 남아 있으면 게임이 제공하는 설치 파일을 다음 단계에서 실행합니다. 다른 앱이 쓰는 이전 Visual C++ 버전은 지우지 않습니다.",
      },
      {
        title: "게임 폴더의 재배포 설치 파일 실행",
        reason:
          "게임은 자신이 빌드된 런타임 설치 파일을 함께 넣어 두는 경우가 많고, 첫 실행 때 이 설치가 실패하면 표준 라이브러리 오류가 납니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "게임 설치 폴더에서 _CommonRedist\\vcredist 아래 폴더를 엽니다. 폴더 이름은 게임마다 다를 수 있습니다(Redist, Prerequisites 등).",
          "안에 있는 vc_redist.x64.exe·vc_redist.x86.exe를 실행합니다.",
        ],
        checkPoint:
          "실행되면 끝입니다. 폴더가 없거나 실행해도 같으면 다음 단계에서 게임 파일을 검사합니다.",
      },
      {
        title: "런처에서 게임 파일 검사",
        reason:
          "게임 폴더에 함께 들어 있던 런타임 파일이 손상됐다면 시스템 런타임과 관계없이 오류가 날 수 있어, 런처가 원본과 비교해 다시 받게 합니다.",
        difficulty: "쉬움",
        time: "10~30분",
        steps: [
          "Steam: 라이브러리 → 게임 오른쪽 클릭 → 속성 → 설치된 파일 → 게임 파일 무결성 확인.",
          "다른 런처는 게임 메뉴의 ‘복구’ 또는 ‘파일 검사’를 실행합니다.",
          "일반 프로그램은 설정 → 앱 → 설치된 앱 → ··· → 수정으로 복구합니다.",
        ],
        checkPoint:
          "검사 뒤 실행되면 끝입니다. 검사 직후에는 되다가 다시 같은 오류가 나면 보안 프로그램이 파일을 지우는지 확인합니다.",
      },
      {
        title: "보안 프로그램의 격리 기록 확인",
        reason:
          "백신이 게임 폴더의 MSVCP140.dll을 오탐으로 격리하면 복구할 때마다 파일이 다시 사라질 수 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "Windows 보안 → 바이러스 및 위협 방지 → 보호 기록에서 MSVCP140.dll이나 게임 폴더 경로가 나온 기록을 찾습니다.",
          "다른 백신을 쓰면 그 프로그램의 격리 목록을 봅니다.",
          "기록이 있으면 격리 파일을 되살리지 말고 런처 파일 검사로 정상 파일을 다시 받습니다.",
        ],
        checkPoint:
          "다시 격리되면 백신 제조사와 게임 개발사에 오탐을 알립니다. 격리 기록이 없고 앞 단계로도 해결되지 않으면 오류 창 캡처와 게임 버전을 개발사에 전달합니다.",
      },
    ],
    faqs: [
      {
        question: "예전 Visual C++ 버전을 모두 지우고 새로 설치해야 하나요?",
        answer:
          "아닙니다. 2013 이하 패키지는 다른 앱이 따로 쓰고 있을 수 있습니다. 필요한 v14 패키지를 추가하거나 복구만 하고, 일괄 삭제는 하지 마세요.",
      },
      {
        question: "MSVCP140.dll과 MSVCP120.dll은 같은 파일인가요?",
        answer:
          "다릅니다. 140은 Visual C++ v14(2015 이후), 120은 Visual C++ 2013 파일입니다. 오류 창의 숫자에 맞는 패키지를 설치해야 합니다.",
      },
    ],
    sources: [VC_REDIST, WIN_SECURITY],
  },

  "msvcp120-dll": {
    reviewedAt: "2026-11-19",
    description:
      "MSVCP120.dll은 Visual C++ 2013(VC++ 12.0) 표준 라이브러리 파일입니다. 구형 게임이나 업무 프로그램을 새 PC에 옮겨 설치했을 때 자주 보이며, 최신 v14 패키지와는 별개라서 2013 패키지를 따로 설치해야 합니다.",
    quickCheck: [
      "설치된 앱에서 ‘Microsoft Visual C++ 2013 Redistributable’ 항목이 있나요? (x86)·(x64) 중 어느 쪽이 있는지도 봅니다.",
      "최신 Visual C++ 2015-2022만 설치하고 이 오류가 사라질 거라고 예상했나요? 2013은 따로 필요합니다.",
      "앱이 C:\\Program Files (x86)에 설치돼 있나요? 그렇다면 x86 2013 패키지가 필요할 가능성이 큽니다.",
    ],
    causes: [
      "Visual C++ 2013 패키지 미설치",
      "앱에 맞는 x86 패키지 누락",
      "기존 2013 패키지 손상",
      "앱 폴더의 의존 파일 손상",
    ],
    solutions: [
      {
        title: "Visual C++ 2013 패키지를 x86·x64 모두 설치",
        reason:
          "Microsoft 문서상 2013 이하 재배포 패키지는 v14와 나란히 따로 설치되므로, MSVCP120.dll은 2013 패키지를 설치해야만 생깁니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "Microsoft Learn ‘Latest Supported Visual C++ Redistributable Downloads’ 문서에서 ‘Visual Studio 2013 (VC++ 12.0)’ 항목을 찾습니다.",
          "vcredist_x86.exe와 vcredist_x64.exe를 받아 둘 다 설치합니다. 앱이 32비트인지 모를 때도 둘 다 설치하면 됩니다.",
          "재시작한 뒤 앱을 실행합니다.",
        ],
        checkPoint:
          "오류가 사라지면 끝입니다. 이미 설치돼 있다고 나오면 다음 단계에서 기존 2013 패키지를 복구합니다.",
      },
      {
        title: "설치된 2013 패키지 복구",
        reason:
          "패키지가 목록에 있어도 파일이 손상되면 앱이 MSVCP120.dll을 읽지 못하므로, 복구로 파일을 다시 씁니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "설정 → 앱 → 설치된 앱에서 ‘Microsoft Visual C++ 2013 Redistributable’의 (x86)·(x64) 항목을 찾습니다. Windows 10은 앱 및 기능입니다.",
          "각 항목의 ··· → 수정에서 ‘복구’를 실행하고 재시작합니다.",
        ],
        checkPoint:
          "복구 뒤 실행되면 끝입니다. 계속되면 앱 폴더 쪽 파일을 다음 단계에서 확인합니다.",
      },
      {
        title: "앱 폴더의 런타임 설치 파일과 복구 기능 사용",
        reason:
          "구형 앱은 설치 폴더나 설치 디스크에 맞는 2013 설치 파일을 함께 두는 경우가 많고, 그 파일이 앱이 기대하는 버전입니다.",
        difficulty: "쉬움",
        time: "10~15분",
        steps: [
          "설치 폴더에서 vcredist, Redist, _CommonRedist 같은 이름의 폴더를 찾아 2013 설치 파일을 실행합니다.",
          "앱 폴더에 직접 넣은 MSVCP120.dll이 있다면 다른 곳으로 옮겨 두고 실행해 비교합니다.",
          "게임이라면 런처의 파일 검사로 누락된 파일을 다시 받습니다.",
        ],
        checkPoint:
          "실행되면 끝입니다. 여전히 실패하면 제작사에 현재 Windows 지원 여부와 필요한 런타임 목록을 문의합니다.",
      },
    ],
    faqs: [
      {
        question: "최신 Visual C++ 2015-2022를 설치하면 MSVCP120.dll도 생기나요?",
        answer:
          "아닙니다. v14 패키지는 140 계열 파일만 설치합니다. MSVCP120.dll은 Visual C++ 2013 패키지에만 들어 있습니다.",
      },
      {
        question: "지원이 끝난 2013 패키지를 설치해도 괜찮나요?",
        answer:
          "Microsoft 문서에서 2013 패키지는 지원 종료 버전으로 분류돼 있지만, 이 런타임을 요구하는 앱을 실행하려면 필요합니다. 가능하면 앱 제작사에 최신 런타임을 쓰는 버전이 있는지도 확인해 보세요.",
      },
    ],
    sources: [VC_REDIST],
  },

  "msvcr100-dll": {
    reviewedAt: "2026-11-19",
    description:
      "MSVCR100.dll은 Visual C++ 2010(VC++ 10.0) 런타임 파일로, 10년 넘은 프로그램을 다시 설치하거나 새 PC에 옮겼을 때 없다는 오류가 납니다. 2010 SP1 패키지를 설치하면 대부분 해결되지만, 앱 자체가 지금 Windows를 지원하는지도 함께 확인해야 합니다.",
    quickCheck: [
      "설치된 앱 목록에 ‘Microsoft Visual C++ 2010 Redistributable’이 있나요?",
      "앱이 C:\\Program Files (x86)에 설치됐나요? 오래된 앱은 32비트가 많아 x86 패키지가 핵심입니다.",
      "제작사가 이 프로그램의 업데이트를 아직 제공하나요?",
    ],
    causes: [
      "Visual C++ 2010 런타임 미설치",
      "x86 패키지 누락",
      "2010 패키지 손상",
      "현재 Windows를 고려하지 않은 구형 앱",
    ],
    solutions: [
      {
        title: "Visual C++ 2010 SP1 재배포 패키지 설치",
        reason:
          "MSVCR100.dll은 2010 패키지만 제공하는 파일이라 최신 Visual C++로는 대신할 수 없습니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "Microsoft Learn Visual C++ 다운로드 문서의 ‘Visual Studio 2010 (VC++ 10.0) SP1’ 항목에서 vcredist_x86.exe와 vcredist_x64.exe를 받습니다.",
          "x86을 먼저 설치하고, 64비트 Windows라면 x64도 설치합니다.",
          "재시작한 뒤 프로그램을 실행합니다.",
        ],
        checkPoint:
          "오류가 사라지면 끝입니다. 이미 설치돼 있다고 나오면 패키지를 제거하지 말고 다음 단계의 복구로 넘어갑니다.",
      },
      {
        title: "2010 패키지 복구 후 앱의 설치 파일 실행",
        reason:
          "패키지가 손상됐거나, 앱이 설치 디스크에 함께 둔 특정 2010 버전을 기대하는 경우가 있습니다.",
        difficulty: "쉬움",
        time: "10분",
        steps: [
          "설치된 앱에서 ‘Microsoft Visual C++ 2010 Redistributable’ 항목의 ··· → 수정 → 복구를 선택합니다. 복구 메뉴가 없으면 받은 설치 파일을 다시 실행해 복구를 고릅니다.",
          "앱 설치 폴더나 설치 디스크의 vcredist·Redist 폴더에 2010 설치 파일이 있으면 실행합니다.",
        ],
        checkPoint:
          "실행되면 끝입니다. 그래도 같다면 앱이 지금 Windows에서 동작하는지부터 확인합니다.",
      },
      {
        title: "호환성 모드로 실행해 비교",
        reason:
          "런타임이 갖춰졌는데도 시작하지 못하면 앱이 예전 Windows 동작을 전제로 만들어졌을 수 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "앱 실행 파일을 오른쪽 클릭 → 속성 → 호환성 탭을 엽니다.",
          "‘이 프로그램을 실행할 호환 모드’를 체크하고 Windows 7 또는 Windows 8을 고른 뒤 적용합니다.",
          "앱을 실행해 봅니다.",
        ],
        checkPoint:
          "호환 모드에서 실행되면 그 설정을 유지합니다. 그래도 실패하면 다음 단계에서 앱 지원 상태를 확인합니다.",
      },
      {
        title: "제작사 지원 상태와 최신 버전 확인",
        reason:
          "Visual C++ 2010은 2020년에 지원이 끝났기 때문에, 이 런타임에 묶인 앱은 최신 버전으로 옮기는 것이 장기적으로 안전합니다.",
        difficulty: "쉬움",
        time: "10분",
        steps: [
          "제작사 사이트에서 앱의 지원 OS 목록과 최신 버전 유무를 확인합니다.",
          "최신 버전이 있으면 그 버전을 설치합니다.",
        ],
        checkPoint:
          "최신 버전에서 정상 실행되면 그 버전을 씁니다. 최신 버전이 없고 모든 방법이 실패하면 제작사 지원이나 대체 프로그램을 알아봅니다.",
      },
    ],
    faqs: [
      {
        question: "구형 런타임을 설치하면 앱이 안전해지나요?",
        answer:
          "런타임 설치는 실행에 필요한 파일만 채울 뿐입니다. 2010 런타임과 그 앱의 보안 업데이트 상태는 따로 확인해야 합니다.",
      },
      {
        question: "MSVCR100.dll과 MSVCP100.dll이 둘 다 없다고 나오면요?",
        answer:
          "두 파일 모두 Visual C++ 2010 패키지에 들어 있으므로 같은 2010 SP1 패키지를 설치하면 함께 채워집니다.",
      },
    ],
    sources: [VC_REDIST],
  },

  "d3dx9-43-dll": {
    reviewedAt: "2026-11-19",
    description:
      "D3DX9_43.dll은 DirectX 9 시절 게임이 쓰는 보조 라이브러리(D3DX9)로, Windows 10·11에는 기본으로 들어 있지 않습니다. DirectX 12가 설치된 PC에서도 구형 게임을 처음 실행할 때 이 오류가 날 수 있으며, Microsoft의 레거시 DirectX 런타임을 설치하면 대부분 해결됩니다.",
    quickCheck: [
      "게임 설치 폴더에 _CommonRedist\\DirectX나 DirectX 폴더가 있나요?",
      "D3DX9_43 외에 d3dx9_42, d3dx10 같은 다른 번호도 없다고 나오나요? 그렇다면 레거시 런타임이 통째로 빠졌을 가능성이 큽니다.",
      "예전에 이 DLL을 인터넷에서 받아 게임 폴더에 넣은 적이 있나요?",
    ],
    causes: [
      "레거시 DirectX(D3DX9) 런타임 미설치",
      "게임 설치 중 DirectX 설치 단계 건너뜀",
      "게임 폴더에 넣은 잘못된 DLL",
      "게임 파일 손상",
    ],
    solutions: [
      {
        title: "게임 폴더의 DXSETUP.exe 실행",
        reason:
          "게임이 함께 제공한 DirectX 설치 파일은 그 게임이 필요한 레거시 구성요소를 정확히 담고 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "게임 설치 폴더에서 _CommonRedist\\DirectX, DirectX, Redist 중 있는 폴더를 엽니다.",
          "안의 DXSETUP.exe를 실행해 설치를 마칩니다.",
          "게임을 다시 실행합니다.",
        ],
        checkPoint:
          "게임이 시작되면 끝입니다. 폴더나 DXSETUP.exe가 없으면 다음 단계에서 Microsoft 웹 설치 관리자를 씁니다.",
      },
      {
        title: "DirectX End-User Runtime Web Installer로 레거시 구성요소 설치",
        reason:
          "Microsoft 다운로드 센터 설명에 따르면 이 런타임은 D3DX9를 쓰는 게임에 필요한 레거시 DirectX SDK 라이브러리를 설치합니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "Microsoft 다운로드 센터에서 DirectX End-User Runtime Web Installer(dxwebsetup.exe)를 받아 실행합니다.",
          "설치 중 다른 프로그램 설치를 권하는 화면이 나오면 필요 없는 항목의 체크를 해제합니다.",
          "인터넷이 없는 PC라면 같은 센터의 ‘DirectX End-User Runtimes (June 2010)’ 오프라인 패키지를 다른 PC에서 받아 옮겨 설치합니다.",
        ],
        checkPoint:
          "같은 DLL 메시지가 사라지면 끝입니다. 계속되면 게임 폴더 쪽 파일을 다음 단계에서 정리합니다.",
      },
      {
        title: "게임 폴더의 DLL을 빼고 파일 검사",
        reason:
          "게임 폴더에 넣은 다른 버전의 d3dx9_43.dll이 Windows에 설치된 정상 파일보다 먼저 불러와져 문제를 일으킬 수 있습니다.",
        difficulty: "쉬움",
        time: "10~30분",
        steps: [
          "게임 실행 파일이 있는 폴더에 직접 넣은 d3dx9_43.dll이 있으면 다른 폴더로 옮깁니다.",
          "Steam은 게임 속성 → 설치된 파일 → 게임 파일 무결성 확인, 다른 런처는 복구 기능을 실행합니다.",
        ],
        checkPoint:
          "검사 뒤 시작되면 끝입니다. 그래도 같다면 오류 창 문구와 Windows 버전을 게임 개발사에 전달합니다.",
      },
    ],
    faqs: [
      {
        question: "DirectX 12가 있는데 왜 이 파일이 없나요?",
        answer:
          "D3DX9는 Windows에 포함된 DirectX 본체가 아니라 예전 DirectX SDK에 들어 있던 보조 라이브러리입니다. 그래서 최신 DirectX가 있어도 레거시 런타임을 따로 설치해야 합니다.",
      },
      {
        question: "DLL 사이트에서 d3dx9_43.dll만 받아 넣어도 되나요?",
        answer:
          "출처를 알 수 없는 파일은 버전·비트가 맞지 않거나 악성일 수 있습니다. Microsoft 다운로드 센터의 런타임 설치 파일을 쓰세요.",
      },
    ],
    sources: [DX_WEB, DX_JUNE2010],
  },

  "xinput1-3-dll": {
    reviewedAt: "2026-11-19",
    description:
      "XINPUT1_3.dll은 구형 게임이 컨트롤러 입력을 읽을 때 쓰는 레거시 XInput 1.3 라이브러리입니다. 컨트롤러를 연결하지 않아도 게임이 시작할 때 이 파일을 불러오면 오류가 나며, 레거시 DirectX 런타임 설치와 게임 폴더의 컨트롤러 모드 파일 정리로 나눠 확인합니다.",
    quickCheck: [
      "게임 폴더에 x360ce 같은 컨트롤러 변환 도구나 직접 넣은 xinput1_3.dll이 있나요?",
      "오류가 아예 게임 시작 전에 나나요, 아니면 게임은 열리는데 컨트롤러만 안 되나요?",
      "같은 PC에서 다른 구형 게임도 DirectX 관련 DLL 오류를 내나요?",
    ],
    causes: [
      "레거시 DirectX(XInput 1.3) 런타임 미설치",
      "컨트롤러 변환 모드가 넣은 xinput1_3.dll",
      "게임 설치 불완전",
      "컨트롤러 인식 문제(게임은 열리지만 입력이 안 되는 경우)",
    ],
    solutions: [
      {
        title: "게임의 DirectX 설치 파일 또는 웹 설치 관리자 실행",
        reason:
          "XInput 1.3은 Microsoft 레거시 DirectX 런타임에 포함된 구성요소라, 이 런타임을 설치하면 정상 파일이 시스템에 들어갑니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "게임 폴더의 _CommonRedist\\DirectX나 Redist 폴더에 DXSETUP.exe가 있으면 실행합니다.",
          "없으면 Microsoft 다운로드 센터의 DirectX End-User Runtime Web Installer(dxwebsetup.exe)를 실행합니다.",
          "설치 후 게임을 다시 실행합니다.",
        ],
        checkPoint:
          "게임이 시작되면 끝입니다. 같은 오류가 남으면 게임 폴더에 다른 xinput 파일이 있는지 다음 단계에서 봅니다.",
      },
      {
        title: "컨트롤러 모드 DLL을 빼고 게임 파일 검사",
        reason:
          "컨트롤러 변환 도구는 게임 폴더에 자체 xinput1_3.dll을 넣는데, 이 파일이 깨지거나 비트가 맞지 않으면 게임이 시작하지 못합니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "게임 실행 파일이 있는 폴더에서 xinput1_3.dll, x360ce.ini 등 모드 관련 파일을 다른 폴더로 옮깁니다.",
          "런처의 파일 검사(Steam은 게임 파일 무결성 확인)로 원본 파일을 되돌립니다.",
        ],
        checkPoint:
          "모드 파일을 뺀 뒤 실행되면 모드 없이 쓰거나 모드의 최신 버전을 확인합니다. 게임은 열리는데 컨트롤러만 안 된다면 다음 단계로 갑니다.",
      },
      {
        title: "joy.cpl로 컨트롤러 인식과 입력 시험",
        reason:
          "DLL 오류가 사라진 뒤에도 입력이 안 되면 파일보다 컨트롤러 연결이나 인식 쪽 문제일 수 있어, Windows 기본 도구로 먼저 확인합니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "Win + R → joy.cpl 을 입력해 게임 컨트롤러 창을 엽니다.",
          "컨트롤러가 목록에 있으면 선택하고 ‘속성’에서 버튼과 스틱을 움직여 반응을 봅니다.",
          "목록에 없으면 다른 USB 포트·케이블·무선 수신기로 바꿔 연결합니다.",
        ],
        checkPoint:
          "여기서는 반응하는데 게임에서만 안 되면 게임의 입력 설정이나 Steam 입력 설정을 확인합니다. 목록에 없다면 장치 관리자에서 컨트롤러 항목에 경고 표시가 있는지 봅니다.",
      },
    ],
    faqs: [
      {
        question: "컨트롤러를 안 쓰는데도 이 파일이 필요한가요?",
        answer:
          "게임이 시작할 때 XInput 라이브러리를 불러오도록 만들어졌다면 컨트롤러 연결 여부와 관계없이 파일이 있어야 실행됩니다.",
      },
      {
        question: "Windows에 xinput1_4.dll이 있는데 그걸로 대신할 수 없나요?",
        answer:
          "게임은 파일 이름까지 지정해 불러오기 때문에 다른 버전으로 이름만 바꿔 넣는 방식은 권하지 않습니다. 레거시 DirectX 런타임으로 xinput1_3.dll을 정식 설치하세요.",
      },
    ],
    sources: [DX_WEB, DX_JUNE2010],
  },

  "error-1603": {
    reviewedAt: "2026-11-19",
    description:
      "Error 1603은 Windows Installer가 ‘설치 중 치명적인 오류가 발생했다’고만 알려 주는 일반 실패 코드입니다(ERROR_INSTALL_FAILURE). 코드만으로는 원인을 알 수 없어서, 재시작 후 간단히 다시 시도한 다음에는 상세 로그로 실제로 멈춘 작업을 찾아야 합니다.",
    quickCheck: [
      "같은 프로그램의 이전 버전이 이미 설치돼 있나요?",
      "설치 파일을 네트워크 드라이브·USB·압축 파일 안에서 바로 실행했나요?",
      "설치 위치를 기본값이 아닌 암호화·압축 폴더나 가상 드라이브로 바꿨나요?",
    ],
    causes: [
      "이전 설치의 잔여 구성",
      "설치 대상 폴더의 SYSTEM 권한 부족",
      "암호화·압축 폴더나 가상 드라이브 경로",
      "설치 패키지 내부 작업 실패",
      "실행 중인 같은 프로그램과의 충돌",
    ],
    solutions: [
      {
        title: "재시작 후 로컬 드라이브에서 다시 설치",
        reason:
          "설치 중인 파일이 사용 중이거나 원본이 네트워크·USB에 있으면 설치가 중간에 실패해 롤백될 수 있어, 가장 단순한 조건으로 다시 시도합니다.",
        difficulty: "쉬움",
        time: "10~15분",
        steps: [
          "작업을 저장하고 PC를 다시 시작합니다. 설치하려는 프로그램이 실행 중이면 알림 영역 아이콘까지 종료합니다.",
          "설치 파일을 C 드라이브의 다운로드 폴더로 복사한 뒤 오른쪽 클릭 → ‘관리자 권한으로 실행’합니다.",
          "설치 경로는 기본값(C:\\Program Files)을 쓰고 암호화·압축 폴더나 SUBST 가상 드라이브는 피합니다.",
        ],
        checkPoint:
          "설치가 끝나고 프로그램이 실행되면 끝입니다. 같은 1603이 나면 다음 단계에서 로그로 실패 위치를 찾습니다.",
      },
      {
        title: "상세 설치 로그에서 Return value 3 찾기",
        reason:
          "1603은 일반 코드라 로그에서 ‘Return value 3’이 찍힌 작업을 찾아야 실제로 무엇이 실패했는지 보입니다.",
        difficulty: "보통",
        time: "15~30분",
        steps: [
          ".msi 설치 파일이면 터미널(관리자)에서 msiexec /i \"C:\\경로\\package.msi\" /L*V \"%TEMP%\\install.log\" 를 실행합니다. 경로는 실제 파일 위치로 바꿉니다. PowerShell에서는 %TEMP% 대신 $env:TEMP 를 씁니다.",
          ".exe 설치 파일은 제작사가 안내하는 로그 옵션을 쓰거나, 설치 직후 %TEMP% 폴더에 새로 생긴 MSI*.log 파일을 찾습니다(Win + R → %TEMP%).",
          "로그를 메모장으로 열고 Ctrl + F로 Return value 3 을 검색해 바로 위 10~20줄의 작업 이름과 오류 문구를 적습니다.",
        ],
        checkPoint:
          "폴더 접근·권한 문구가 보이면 다음 단계로 갑니다. 다른 작업 이름이면 로그 파일과 함께 제작사에 문의합니다. 코드만 보고 레지스트리를 지우지 않습니다.",
      },
      {
        title: "이전 버전 제거와 대상 폴더 SYSTEM 권한 확인",
        reason:
          "Windows Installer는 SYSTEM 계정으로 파일을 쓰기 때문에 대상 폴더에 SYSTEM 권한이 없거나 이전 버전이 남아 있으면 설치를 끝내지 못할 수 있습니다.",
        difficulty: "보통",
        time: "15~20분",
        steps: [
          "설정 → 앱 → 설치된 앱에서 같은 제품의 이전 버전이 있으면 먼저 제거하거나 복구합니다.",
          "설치 대상 폴더가 이미 있다면 오른쪽 클릭 → 속성 → 보안 탭에서 SYSTEM에 ‘모든 권한’이 허용인지 봅니다.",
          "목록에서 이전 버전이 제거되지 않으면 Microsoft 지원 사이트의 ‘프로그램 설치 및 제거 문제 해결사’를 받아 실행합니다.",
        ],
        checkPoint:
          "정리 뒤 설치가 끝나면 프로그램 실행까지 확인합니다. 여전히 1603이면 로그의 실패 작업, Windows 버전을 제작사에 전달합니다.",
      },
    ],
    faqs: [
      {
        question: "1603 코드만 보고 원인을 알 수 있나요?",
        answer:
          "어렵습니다. Microsoft 문서에서도 ‘설치 중 치명적 오류’라는 일반 설명만 있습니다. 상세 로그의 Return value 3 주변을 봐야 어떤 작업에서 멈췄는지 알 수 있습니다.",
      },
      {
        question: "인터넷에서 본 레지스트리 정리 방법을 따라 해도 되나요?",
        answer:
          "원인이 확인되지 않은 상태에서 레지스트리를 지우면 다른 프로그램 설치 정보까지 망가질 수 있습니다. 로그와 제작사 안내로 원인을 확인한 뒤에만 진행하세요.",
      },
    ],
    sources: [MSI_CODES, MSIEXEC],
  },

  "error-1618": {
    reviewedAt: "2026-11-19",
    description:
      "Error 1618은 다른 Windows Installer 설치가 이미 진행 중이라 새 설치를 시작할 수 없다는 뜻입니다(ERROR_INSTALL_ALREADY_RUNNING). 눈에 보이지 않는 Windows·앱 업데이트가 백그라운드에서 돌고 있는 경우가 많으므로, 무엇이 설치 중인지 찾고 끝나기를 기다리는 것이 먼저입니다.",
    quickCheck: [
      "작업 표시줄이나 숨겨진 아이콘에 다른 설치 창이 열려 있나요?",
      "설정 → Windows 업데이트에서 ‘설치 중’이나 ‘다시 시작 필요’가 보이나요?",
      "PC를 켠 직후에만 1618이 나고 몇 분 뒤에는 괜찮나요?",
    ],
    causes: [
      "다른 프로그램 설치가 동시에 진행",
      "백그라운드 Windows·Microsoft Store 업데이트",
      "재시작을 기다리는 이전 설치",
      "부팅 시 자동 실행되는 업데이트 도구",
      "회사 관리 도구의 소프트웨어 배포",
    ],
    solutions: [
      {
        title: "진행 중인 설치와 업데이트 찾기",
        reason:
          "Windows Installer는 한 번에 하나의 설치만 처리하므로, 지금 돌고 있는 작업을 찾아 끝내야 새 설치가 시작됩니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "작업 표시줄과 숨겨진 아이콘(^)에서 진행 중인 설치 창이 있는지 봅니다.",
          "설정 → Windows 업데이트에서 업데이트가 설치 중인지, Microsoft Store 앱 → 다운로드(또는 라이브러리)에서 앱 업데이트가 진행 중인지 봅니다.",
          "Ctrl + Shift + Esc → 세부 정보 탭에서 setup.exe, 제작사 업데이트 도구 등 설치 프로그램이 실행 중인지 확인합니다.",
        ],
        checkPoint:
          "진행 중인 작업이 있으면 끝날 때까지 기다린 뒤 설치합니다. msiexec.exe를 강제로 끝내지 않습니다. 보이는 작업이 없으면 다음 단계로 재시작합니다.",
      },
      {
        title: "설치를 정상 종료하고 재시작한 뒤 하나만 설치",
        reason:
          "이전 설치가 재시작을 기다리며 잠금 상태를 유지하는 경우, 재시작하면 잠금이 풀립니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "열려 있는 설치 창은 ‘취소’나 ‘닫기’ 버튼으로 정상 종료합니다.",
          "작업을 저장하고 시작 → 전원 → 다시 시작을 누릅니다. ‘업데이트 및 다시 시작’이 보이면 그 항목을 고릅니다.",
          "재시작 후 다른 프로그램을 열기 전에 설치하려던 프로그램 하나만 먼저 설치합니다.",
        ],
        checkPoint:
          "설치가 시작되면 끝입니다. 재시작 직후에도 1618이 나면 시작할 때 자동으로 도는 업데이트 도구를 확인합니다.",
      },
      {
        title: "부팅 때 자동으로 도는 업데이트 도구 확인",
        reason:
          "드라이버·런처 업데이트 도구가 부팅 직후 설치를 시작하면, 사용자가 설치를 시도하는 시점과 겹쳐 1618이 반복될 수 있습니다.",
        difficulty: "보통",
        time: "15~20분",
        steps: [
          "재시작 후 5~10분 기다렸다가 다시 설치해 봅니다.",
          "그래도 같으면 작업 관리자 → 시작 앱(Windows 10은 시작프로그램 탭)에서 업데이트 도구·런처 항목을 잠시 ‘사용 안 함’으로 바꾸고 재시작합니다.",
          "설치를 마친 뒤 끈 항목을 다시 ‘사용’으로 돌립니다.",
        ],
        checkPoint:
          "시작 앱을 줄인 뒤 설치되면 그 도구와 시간이 겹쳤을 가능성이 큽니다. 회사 PC에서 계속되면 관리 도구가 배포 중일 수 있으니 관리자에게 확인합니다.",
      },
    ],
    faqs: [
      {
        question: "작업 관리자에서 msiexec.exe를 강제 종료해도 되나요?",
        answer:
          "진행 중인 설치를 중간에 끊으면 그 프로그램의 설치 상태가 손상될 수 있습니다. msiexec.exe는 설치가 없을 때도 대기 상태로 떠 있을 수 있으므로, 강제 종료보다 정상 취소와 재시작을 권합니다.",
      },
      {
        question: "1603과 1618은 어떻게 다른가요?",
        answer:
          "1618은 설치를 시작조차 못 한 것이고, 1603은 설치를 진행하다 실패한 것입니다. 1618은 기다리거나 재시작하면 풀리는 경우가 많습니다.",
      },
    ],
    sources: [MSI_CODES],
  },

  "error-1722": {
    reviewedAt: "2026-11-19",
    description:
      "Error 1722는 설치 패키지가 설치 도중 실행한 프로그램(사용자 지정 작업)이 예상대로 끝나지 않았다는 뜻입니다. 오류 창에 작업 이름(Action)·위치·명령이 함께 표시되므로, 그 이름으로 어떤 구성요소나 서비스 등록에서 실패했는지 찾는 것이 출발점입니다.",
    quickCheck: [
      "오류 창에 ‘Action’ 다음에 나온 작업 이름과 ‘command’ 경로가 보이나요? 지우기 전에 캡처합니다.",
      "설치 후반의 서비스 등록·구성 단계에서 롤백되나요?",
      "제작사 요구사항에 .NET Framework, Visual C++, SQL 같은 선행 구성요소가 적혀 있나요?",
    ],
    causes: [
      "패키지 안 사용자 지정 작업의 실패",
      ".NET·Visual C++ 등 선행 구성요소 누락",
      "Windows Installer 서비스 사용 안 함 설정",
      "보안 프로그램이 설치 중 실행 파일 차단",
      "손상되거나 오래된 설치 파일",
    ],
    solutions: [
      {
        title: "오류 창과 로그에서 실패한 작업 이름 찾기",
        reason:
          "Microsoft 문서에 따르면 1722 메시지에는 작업 이름·위치·명령이 들어가므로, 이 정보가 실제로 실패한 프로그램을 가리킵니다.",
        difficulty: "보통",
        time: "10~20분",
        steps: [
          "오류 창의 Action 이름과 location·command 문구를 그대로 적거나 캡처합니다.",
          ".msi라면 터미널(관리자)에서 msiexec /i \"C:\\경로\\package.msi\" /L*V \"%TEMP%\\setup1722.log\" 로 상세 로그를 만듭니다. PowerShell에서는 %TEMP% 대신 $env:TEMP 를 씁니다.",
          "로그를 메모장으로 열고 그 작업 이름과 Return value 3 을 검색합니다.",
        ],
        checkPoint:
          "작업 이름에 .NET, VC, SQL, Service 같은 단어가 있으면 다음 단계에서 해당 구성요소를 설치합니다. 알 수 없는 이름이면 로그를 보관해 제작사에 전달합니다.",
      },
      {
        title: "선행 구성요소 설치",
        reason:
          "사용자 지정 작업은 .NET이나 Visual C++ 런타임으로 만든 프로그램인 경우가 많아, 그 런타임이 없으면 작업이 시작하자마자 실패합니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "제작사 시스템 요구사항에 나온 Visual C++ 재배포 패키지를 Microsoft Learn 문서에서 받아 설치합니다.",
          ".NET Framework 3.5가 필요하면 Win + R → optionalfeatures 에서 ‘.NET Framework 3.5(.NET 2.0 및 3.0 포함)’를 켭니다.",
          "PC를 다시 시작하고 설치를 다시 시도합니다.",
        ],
        checkPoint:
          "구성 단계를 넘어가면 끝입니다. 같은 작업에서 다시 멈추면 Windows Installer 서비스 상태를 확인합니다.",
      },
      {
        title: "Windows Installer 서비스 시작 유형 확인",
        reason:
          "서비스가 ‘사용 안 함’으로 바뀌어 있으면 설치 중 다른 패키지를 호출하는 작업이 실패할 수 있습니다.",
        difficulty: "쉬움",
        time: "5분",
        steps: [
          "Win + R → services.msc 를 입력합니다.",
          "목록에서 Windows Installer를 더블클릭해 시작 유형이 ‘사용 안 함’이 아닌지 봅니다. 기본값은 ‘수동’입니다.",
          "‘사용 안 함’이면 ‘수동’으로 바꾸고 적용합니다.",
        ],
        checkPoint:
          "설정을 바로잡은 뒤 설치가 끝나면 해결된 것입니다. 이미 수동이었다면 다음 단계에서 설치 파일과 실행 환경을 바꿔 봅니다.",
      },
      {
        title: "최신 설치 파일을 로컬에서 관리자 권한으로 실행",
        reason:
          "오래된 설치 파일은 현재 Windows에서 실패하는 작업을 포함할 수 있고, 백신이 설치 중 생성되는 실행 파일을 막는 경우도 있습니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "제작사 공식 사이트에서 설치 파일을 새로 받아 C 드라이브의 로컬 폴더에 저장합니다.",
          "오른쪽 클릭 → ‘관리자 권한으로 실행’으로 설치합니다.",
          "실패하면 Windows 보안 → 바이러스 및 위협 방지 → 보호 기록에 설치 중 차단된 항목이 있는지 확인합니다.",
        ],
        checkPoint:
          "설치가 끝나면 서비스나 프로그램이 정상 등록됐는지 실행해 봅니다. 같은 작업이 계속 실패하면 상세 로그, 작업 이름, Windows 버전을 제작사에 전달합니다.",
      },
    ],
    faqs: [
      {
        question: "Windows Installer 자체가 고장 난 건가요?",
        answer:
          "대부분은 아닙니다. 1722는 패키지 안에서 실행된 프로그램이 실패했다는 뜻이라, Windows Installer보다는 그 작업과 필요한 구성요소를 먼저 확인합니다.",
      },
      {
        question: "1603과 같이 나오면 어느 쪽을 먼저 보나요?",
        answer:
          "1722가 먼저 나왔다면 그 작업 실패 때문에 전체 설치가 1603으로 끝났을 가능성이 큽니다. 1722의 작업 이름을 먼저 확인하세요.",
      },
    ],
    sources: [MSI_MESSAGES, MSIEXEC, NET35, VC_REDIST],
  },

  "0x800736b1": {
    reviewedAt: "2026-11-19",
    description:
      "0x800736B1은 ‘응용 프로그램의 side-by-side 구성이 잘못되었으므로 시작하지 못했습니다’라는 메시지와 함께 나오며, 앱이 매니페스트에 적어 둔 특정 버전의 어셈블리(주로 Visual C++ 런타임)를 찾지 못했다는 뜻입니다. 이벤트 뷰어의 SideBySide 기록에 필요한 이름·버전·아키텍처가 남으므로 그것부터 확인합니다.",
    quickCheck: [
      "이벤트 뷰어의 응용 프로그램 로그에 원본이 SideBySide인 오류가 오류 시각에 남아 있나요?",
      "기록에 Microsoft.VC80·VC90 같은 이름이 보이나요? 그렇다면 오래된 Visual C++ 런타임 쪽입니다.",
      "앱을 최근에 다른 PC에서 복사해 왔거나 설치 도중 중단한 적이 있나요?",
    ],
    causes: [
      "앱이 요구하는 특정 Visual C++ 버전 누락",
      "x86·amd64 아키텍처 불일치",
      "앱 매니페스트와 설치 파일 불일치",
      "앱 설치 손상",
    ],
    solutions: [
      {
        title: "이벤트 뷰어 SideBySide 기록에서 필요한 어셈블리 확인",
        reason:
          "Microsoft 문서에 따르면 side-by-side 어셈블리는 매니페스트에 이름과 버전으로 지정되므로, 기록에 나온 정확한 이름이 무엇을 설치할지 알려 줍니다.",
        difficulty: "쉬움",
        time: "5~10분",
        steps: [
          "Win + X → 이벤트 뷰어 → Windows 로그 → 응용 프로그램을 엽니다.",
          "오류 시각 부근에서 원본이 SideBySide인 항목을 엽니다.",
          "‘종속 어셈블리’ 부분의 이름(예: Microsoft.VC90.CRT), 버전, processorArchitecture(x86·amd64)를 적습니다.",
        ],
        checkPoint:
          "이름이 Microsoft.VC로 시작하면 다음 단계에서 해당 Visual C++ 버전을 설치합니다. 앱 이름이 들어간 어셈블리라면 앱 복구 단계로 넘어갑니다.",
      },
      {
        title: "기록에 맞는 Visual C++ 버전과 아키텍처 설치",
        reason:
          "구형 앱은 최신 v14가 아니라 2005·2008 같은 특정 버전을 지정하므로, 기록에 나온 버전과 아키텍처를 정확히 맞춰야 합니다.",
        difficulty: "쉬움",
        time: "10분",
        steps: [
          "VC80은 Visual Studio 2005, VC90은 2008, VC100은 2010입니다. Microsoft Learn Visual C++ 다운로드 문서에서 해당 연도의 SP1 패키지를 찾습니다.",
          "processorArchitecture가 x86이면 x86 패키지를, amd64이면 x64 패키지를 설치합니다. 모르면 둘 다 설치합니다.",
          "PC를 다시 시작하고 앱을 실행합니다.",
        ],
        checkPoint:
          "앱이 실행되고 같은 SideBySide 기록이 새로 생기지 않으면 끝입니다. 기록이 다른 어셈블리 이름으로 바뀌면 그 이름으로 이 단계를 반복합니다.",
      },
      {
        title: "앱 복구 설치",
        reason:
          "매니페스트와 실제 설치 파일이 어긋난 경우 런타임을 설치해도 맞지 않으므로, 앱 설치 프로그램이 짝을 다시 맞추게 합니다.",
        difficulty: "쉬움",
        time: "10~20분",
        steps: [
          "설정 → 앱 → 설치된 앱에서 해당 앱 ··· → 수정(복구)을 실행합니다. Windows 10은 앱 및 기능입니다.",
          "복구 메뉴가 없으면 제거 후 공식 사이트에서 받은 설치 파일로 다시 설치합니다.",
          "다른 PC에서 폴더만 복사해 온 앱이라면 반드시 설치 파일로 정식 설치합니다.",
        ],
        checkPoint:
          "복구 뒤 실행되면 끝입니다. 같은 메시지가 남으면 다음 단계에서 sxstrace로 실패 지점을 자세히 봅니다.",
      },
      {
        title: "sxstrace로 어셈블리 검색 과정 추적",
        reason:
          "이벤트 기록만으로 부족할 때 sxstrace는 Windows가 어떤 경로에서 어떤 버전을 찾다 실패했는지 줄 단위로 보여 줍니다.",
        difficulty: "보통",
        time: "15~20분",
        steps: [
          "터미널(관리자)에서 작업 폴더로 이동한 뒤 sxstrace trace -logfile:sxs.etl 을 실행합니다.",
          "추적이 켜진 상태에서 문제 앱을 한 번 실행하고, 오류가 뜨면 터미널로 돌아와 Enter를 눌러 추적을 멈춥니다.",
          "sxstrace parse -logfile:sxs.etl -outfile:sxs.txt 를 실행해 텍스트로 바꾸고, 메모장에서 ERROR 줄을 찾습니다.",
        ],
        checkPoint:
          "ERROR 줄에 나온 어셈블리를 설치해 해결되면 끝입니다. 해결되지 않으면 sxs.txt와 SideBySide 이벤트 내용을 제작사에 전달합니다.",
      },
    ],
    faqs: [
      {
        question: "최신 Visual C++ 하나만 설치하면 충분한가요?",
        answer:
          "구형 앱은 매니페스트에 특정 버전을 지정하기 때문에 최신 v14로 대신되지 않습니다. 이벤트 기록에 나온 버전을 설치해야 합니다.",
      },
      {
        question: "Windows를 다시 설치해야 하는 오류인가요?",
        answer:
          "대부분 아닙니다. 이 오류는 앱 하나의 구성 문제인 경우가 많아 해당 런타임 설치나 앱 복구로 정리됩니다.",
      },
    ],
    sources: [SXS, VC_REDIST],
  },
};
