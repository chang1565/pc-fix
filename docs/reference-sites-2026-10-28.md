# PC FIX 참고 사이트와 문구 기준

PC FIX는 GYEOL과 별개인 컴퓨터 오류·고장 점검 프로젝트다. 문구·브랜드·서비스 콘셉트를 섞지 않는다. 기술 지원 사이트에 맞춰 기기, 증상, 오류 코드와 실행할 점검을 직접 표현한다.

2026-10-28에 확인한 공개 페이지:

| 참고 | 관찰 | PC FIX 적용 |
| --- | --- | --- |
| [iFixit 노트북 문제 해결](https://www.ifixit.com/Troubleshooting/PC_Laptop) | 기기·증상별 가이드와 모델별 질문으로 연결 | 홈의 추상 문구를 제거하고 증상명으로 직접 이동 |
| [Microsoft 중지 코드 문제 해결](https://support.microsoft.com/en-us/windows/experience/performance-optimization/troubleshooting-windows-unexpected-restarts-and-stop-code-errors) | 적용 Windows 버전, 증상의 의미, 버전별 화면 예시, 단계별 조치를 구분 | 구체적인 서비스 제목과 점검 범위를 표시. 상세의 적용 범위·실행 순서·출처 구조 유지 |
| [Dell 전원·POST·부팅·영상 문제 구분](https://www.dell.com/support/kbdoc/en-us/000125609/resolve-no-power-no-post-no-boot-or-no-video-issues-with-your-dell-computer) | 전원 없음·POST 실패·부팅 실패·영상 없음의 관찰 기준을 구별 | 홈 바로가기에서 데스크톱 무전원·화면 신호 없음·Windows 부팅 실패를 구별 |

## 반영

- 제목: “컴퓨터 오류·고장, 증상별 해결 가이드”.
- 설명: 검색할 문제 종류와 원인·설정·결과 확인 범위를 직접 설명.
- 오른쪽 패널: 추상적인 3단계 표어를 기존 가이드에 연결되는 실제 증상 링크로 교체.
- 영어·일본어·중국어 문구도 직접 편집하고 재생성.
- 모바일 패널은 긴 증상명을 읽을 수 있는 세로 목록으로 조정.

본문이나 사진을 복제하지 않았다. 제조사별 분해·진단 절차를 모든 기기에 적용하지 않는다. 실제 모델별 수리 사진·고장 재현 자료는 이번 참고 조사로 확보한 것이 아니다.

## 전면 UI 개편

추가 비교: [Microsoft Windows 지원 홈](https://support.microsoft.com/en-us/windows/), [Dell 지원 홈](https://www.dell.com/support/home/en-us). Dell은 조회 중 지역별 페이지로 연결됐으므로 고정적인 화면 구성으로 일반화하지 않았다.

- Microsoft의 주제별 지원 분류와 iFixit의 기기·증상 탐색을 참고했다. 사진·브랜드 디자인을 복제하지 않았다.
- 기존 좌우 홍보 패널을 중앙 검색과 세 가지 증상 바로가기로 교체했다.
- 숫자 중심 증상 목록을 자체 SVG 아이콘 6종으로 구분했다.
- 대표 가이드는 제목·요약 중심 목록, 전체 분야는 옆의 분류 목록으로 역할을 나눴다.
- 1280px 이상 상세 화면은 점검 목차를 왼쪽에 고정한다. 좁은 화면에서는 본문 위 목차로 돌아간다.
- 검색은 기존 지연 로딩·뒤로가기 복원·빈 결과 처리를 유지했다. 그림은 장식용 벡터이며 실제 수리 사진이 아니다.
