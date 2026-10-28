import SupportIcon from "@/components/SupportIcon";
import Link from 'next/link';

const icons = ["power", "wifi", "display", "speed", "audio", "usb"] as const;
const groups = [
  { number: '01', title: '전원·부팅', hint: '아예 켜지지 않거나 Windows에 들어갈 수 없어요.', routes: [
    ['/problems/desktop-no-power', '데스크톱의 팬과 전원 표시등도 꺼져 있어요'],
    ['/problems/laptop-no-power', '노트북에 전원·충전 반응이 없어요'],
    ['/problems/computer-boot-failure', '전원은 켜지지만 Windows가 안 떠요'],
    ['/problems/boot-slow', '켜지지만 로그인까지 너무 오래 걸려요'],
  ] },
  { number: '02', title: '인터넷·Wi-Fi', hint: '연결 상태와 실제 접속 여부를 나눠 확인해요.', routes: [
    ['/problems/wifi-not-showing', 'Wi-Fi 버튼이나 목록이 없어요'],
    ['/problems/wifi-no-internet', '연결됨인데 인터넷이 안 돼요'],
    ['/problems/internet-not-working', '유선·무선 인터넷이 갑자기 안 돼요'],
  ] },
  { number: '03', title: '화면·게임', hint: '화면 신호 없음과 게임 중 멈춤을 구분해요.', routes: [
    ['/problems/monitor-no-signal', '모니터에 신호 없음이 떠요'],
    ['/problems/game-black-screen-restart', '게임 중 검은 화면 뒤 재부팅돼요'],
    ['/problems/game-crash', '컴퓨터는 켜져 있고 게임만 종료돼요'],
  ] },
  { number: '04', title: '속도·멈춤', hint: '언제 느려지는지부터 원인 범위를 좁혀요.', routes: [
    ['/problems/boot-slow', '전원을 켤 때부터 느려요'],
    ['/problems/computer-slow', '사용 중에 반응이 느려졌어요'],
    ['/problems/disk-100-percent', '디스크 사용률이 계속 100%예요'],
  ] },
  { number: '05', title: '소리·마이크', hint: '출력 장치와 입력 장치를 따로 확인해요.', routes: [
    ['/problems/no-sound', '스피커나 헤드폰에서 소리가 안 나요'],
    ['/problems/bluetooth-connected-no-sound', 'Bluetooth 연결은 됐는데 무음이에요'],
    ['/problems/microphone-not-working', '내 목소리가 상대에게 전달되지 않아요'],
  ] },
  { number: '06', title: '주변기기', hint: '장치 인식과 실제 기능 동작을 구분해요.', routes: [
    ['/problems/usb-not-recognized', 'USB를 꽂아도 장치가 인식되지 않아요'],
    ['/problems/printer-offline', '프린터가 오프라인으로 나와요'],
    ['/problems/bluetooth-cant-pair', 'Bluetooth 장치를 연결할 수 없어요'],
  ] },
];

export default function SymptomNavigator() {
  return <section id="symptom-start" className="symptom-navigator" aria-labelledby="symptom-heading">
    <div className="section-heading"><div><p className="eyebrow">증상으로 시작하기</p><h2 id="symptom-heading">지금 어떤 상태인가요?</h2></div><p>가까운 상황을 고르면<br className="hidden sm:block" /> 확인할 순서로 이어집니다.</p></div>
    <div className="symptom-grid">{groups.map((group, index) => <details key={group.number} className="symptom-group" name="symptom-group">
      <summary><span className="symptom-icon"><SupportIcon name={icons[index]} /></span><span><strong>{group.title}</strong><span className="symptom-hint">{group.hint}</span></span><span className="symptom-toggle" aria-hidden="true">+</span></summary>
      <ul>{group.routes.map(([href, title]) => <li key={href}><Link href={href}>{title}<span aria-hidden="true">↗</span></Link></li>)}</ul>
    </details>)}</div>
    <p className="navigator-note">타는 냄새, 배터리 팽창, 저장장치 이상음이 있으면 반복 점검을 멈추고 전문 점검을 받으세요. <Link href="/problems/battery-swollen" className="underline">배터리 팽창 안내</Link> · <Link href="/problems/hdd-clicking" className="underline">저장장치 이상음 안내</Link></p>
  </section>;
}
