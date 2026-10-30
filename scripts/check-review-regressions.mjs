// 증상별 절차 교체와 위험한 의미 반전의 회귀를 검사합니다.
import assert from 'node:assert/strict';
import {load} from './check-errors.mjs';
const {problems}=load('data/problems.ts');
const {errorCodes}=load('data/errorCodes.ts');
const reviewed=load('data/problemSolutionReview.json');
const problem=slug=>problems.find(p=>p.slug===slug);
const actions=page=>page.solutions.flatMap(s=>s.steps).join(' ');
const followUpTitles = slug => problem(slug).solutions.slice(1).map(s => s.title).join(' ');
assert.doesNotMatch(followUpTitles('camera-privacy-blocked'), /드라이버|USB|다른 PC/);
assert.match(problem('camera-privacy-blocked').solutions[1].title, /권한/);
assert.match(problem('webcam-usb-not-detected').solutions[1].title, /USB/);
assert.doesNotMatch(followUpTitles('app-sound-only-not-working'), /케이블|다른 헤드폰/);
assert.match(problem('plugged-in-not-charging').solutions[1].title, /충전 제한/);
assert.doesNotMatch(followUpTitles('drive-letter-missing'), /케이블|드라이버|다른 PC/);
assert.doesNotMatch(followUpTitles('stuck-manufacturer-logo'), /안전 모드|시작 복구|최근 변경/);
assert.doesNotMatch(followUpTitles('controller-not-detected-windows'), /Steam Input/);
assert.doesNotMatch(followUpTitles('mouse-double-click'), /HID|표면/);
assert.doesNotMatch(followUpTitles('mic-too-quiet'), /개인정보|드라이버/);
assert.doesNotMatch(followUpTitles('wifi-no-internet'), /잊고/);
assert.match(problem('audio-device-missing').solutions[1].title, /장치 관리자/);
assert.doesNotMatch(problem('audio-device-missing').solutions.slice(1).map(s=>s.title).join(' '), /음소거|향상 기능|기본 형식/);
for (const slug of ['hdd-clicking', 'battery-swollen']) {
 assert.doesNotMatch(problem(slug).solutions[0].checkPoint, /증상이 사라졌다면/);
 assert.doesNotMatch(problem(slug).warning, /백업을 먼저|가능하면 사용/);
}
for (const solution of problem('hdd-clicking').solutions.slice(1)) {
 assert.match(solution.access.caution, /다시 켜지 마세요/);
 assert.doesNotMatch(solution.access.route.join(' '), /다른 정상 저장장치로 복사/);
}
for (const page of problems) assert.doesNotMatch(page.faqs.map(f=>f.question+' '+f.answer).join(' '), /원인 후보 ‘|백업한 뒤 전문 점검/);
for (const [slug, sections] of Object.entries(reviewed)) {
  const consolidatedMemory = ['high-ram-usage', 'memory-leak'].includes(slug);
  assert.ok(sections.length >= (consolidatedMemory ? 1 : 2), `missing detailed follow-up: ${slug}`);
  if (consolidatedMemory) assert.equal(sections.length, 1, `repeated memory measurement procedure: ${slug}`);
  assert.ok(sections.every(s => s.location && s.checkPoint && s.steps.length), slug);
}
assert.ok(problem('fan-not-spinning').solutions.length >= 4);
assert.match(actions(problem('fan-not-spinning')), /CPU_FAN/);
assert.match(actions(problem('bitlocker-recovery-screen')), /48자리/);
assert.match(actions(problem('hdd-clicking')), /복사본이 열리는지/);
for(const slug of ['laptop-no-power','pc-turns-on-then-off','pc-power-cycles-loop','pc-beeps-on-startup','motherboard-debug-led','cpu-new-install-no-boot','bios-after-ram-upgrade-no-boot','ssd-not-detected-bios']) {
  assert.ok(reviewed[slug],slug);
  assert.doesNotMatch(problem(slug).solutions.slice(1).map(s=>s.title).join(' '),/Windows 업데이트|시스템 파일|이벤트 기록|온도 확인|메모리 진단/,slug);
}
assert.doesNotMatch(problem('high-ram-usage').solutions.slice(1).map(s=>s.title).join(' '),/RAM.*장착|메모리 진단/);
assert.match(actions(problem('high-ram-usage')),/커밋/);
assert.match(actions(problem('memory-leak')),/정상 종료/);
assert.match(actions(problem('windows-activation-error')),/Home·Pro/);
assert.match(actions(problem('hibernate-missing')),/powercfg \/a/);
assert.match(actions(problem('hibernate-missing')),/powercfg \/hibernate \/type full/);
assert.match(actions(problem('network-share-not-accessible')),/SMB1/);
assert.match(actions(problem('scanner-not-detected')),/미리보기/);
assert.doesNotMatch(problem('scanner-not-detected').solutions.map(s=>s.title).join(' '),/대기열/);
assert.match(actions(problem('poor-print-quality')),/잉크젯.*레이저|레이저.*잉크젯/);
assert.match(actions(problem('disk-unallocated')),/기존 파일.*쓰기를 멈추/);
assert.match(actions(problem('disk-unallocated')),/새 단순 볼륨/);
assert.match(problem('battery-swollen').solutions[0].steps[0],/만지거나 옮기지/);
assert.match(problem('fan-not-spinning').solutions[0].steps[0],/사용을 중단/);
assert.match(actions(problem('windows-black-screen-cursor')),/explorer\.exe/);
const installer=errorCodes.find(p=>p.code==='Error 1603');
for (const code of ['Code 22','Code 28','Code 45','Code 52','0x80070070','0xC000007B','0xC0000142','0xC0000135','VCRUNTIME140.dll','VCRUNTIME140_1.dll','MSVCP140.dll','MSVCP120.dll','D3DX9_43.dll','XINPUT1_3.dll','NET::ERR_CERT_DATE_INVALID','Error 1618']) {
  const page=errorCodes.find(p=>p.code===code);
  assert.ok(page.solutions.every(s=>s.steps.length>=2 && s.reason && s.steps.every(step=>step.trim()) && new Set(s.steps).size===s.steps.length), `missing executable error guidance: ${code}`);
}
assert.match(installer.solutions[0].steps.join(' '),/cmd 검색.*명령 프롬프트/);
assert.match(installer.solutions[0].steps.join(' '),/%TEMP%/);
for(const slug of ['sleep-wake-problem','monitor-wakes-no-display','lid-close-not-sleep'])assert.doesNotMatch(problem(slug).solutions.slice(1).map(s=>s.title).join(' '),/깨우기.*해제|타이머.*해제/);
for(const code of ['MEMORY_MANAGEMENT','PAGE_FAULT_IN_NONPAGED_AREA','KERNEL_SECURITY_CHECK_FAILURE','0xC0000005']) {
 const page=errorCodes.find(p=>p.code===code);
 assert.equal(page.solutions.flatMap(s=>s.steps).filter(s=>s.includes('mdsched.exe')).length,1,code);
}
for(const locale of ['en','ja','zh-CN']) {
 const d=load(`data/locales/${locale}.json`);
  const keyLookup=problem('bitlocker-recovery-screen').solutions.flatMap(s=>s.steps).find(s=>s.includes('https://aka.ms/myrecoverykey'));
  assert.ok(d[keyLookup].includes('https://aka.ms/myrecoverykey'), `${locale}: recovery URL changed`);
  assert.match(d[keyLookup], {en:/^Record the first 8/, ja:/記録/, 'zh-CN':/^记下/}[locale], `${locale}: key ID must be recorded, not entered as the recovery key`);
 const service=d['0x80070422 필요한 서비스 비활성화'];
 assert.match(service,{en:/service is disabled/i,ja:/無効になっています/,'zh-CN':/已被禁用/}[locale]);
 const mod=d['검사 결과를 기록하고 저장 데이터와 모드 설정을 백업한 뒤 비공식 모드만 제외하여 같은 장면을 비교하세요. 저장 파일을 임의 삭제하지 마세요.'];
 assert.match(mod,{en:/Disable unofficial mods/,ja:/MOD.*除|MOD.*無効/,'zh-CN':/停用非官方模组/}[locale]);
 assert.doesNotMatch(mod,/using only unofficial mods|仅使用非官方模组/);
 if(locale==='en')assert.match(d['0xC0000135 필요한 DLL 없음'],/required DLL is missing/);
 if(locale==='zh-CN')assert.match(d['0xC0000135 필요한 DLL 없음'],/缺少所需/);
 if(locale==='ja')assert.match(d['파일 탐색기(Windows 키+E로 열기)뿐 아니라 디스크 관리(Windows 키+X → 디스크 관리로 열기)에서 외장 드라이브의 정확한 용량을 확인하세요.'],/Windows\+E.*Windows\+X/);
}
console.log('PASS: reviewed symptom sequences, execution environments, diagnostic outcomes and critical translation regressions.');

const procedures = load('data/procedureReview.json');
const rtcAccess = problem('windows-time-wrong').solutions.find(s => s.title === 'RTC/CMOS 배터리 또는 메인보드 점검하기').access;
assert.match(rtcAccess.when, /BIOS\/UEFI 날짜·시간/);
assert.doesNotMatch(rtcAccess.when, /POST|부품 교체/);
assert.match(procedures['시간대와 자동 시간 설정 확인하기'].checkPoint, /시간 동기화 서비스·조직 정책/);
assert.match(procedures['시간대와 자동 시간 설정 확인하기'].checkPoint, /오차만으로 배터리 고장이라고 판단하지 마세요/);
assert.match(procedures['CPU·GPU 사용률과 온도 확인하기'].checkPoint, /온도·클럭·팬/);
assert.doesNotMatch(procedures['CPU·GPU 사용률과 온도 확인하기'].checkPoint, /메모리·디스크/);
assert.match(procedures['하드웨어 점검 또는 수리 의뢰하기'].steps.join(' '), /백업을 위해 다시 켜지 마세요/);
const serviceGuide = problem('touchpad-not-working').solutions.find(s => s.title === '하드웨어 점검 또는 수리 의뢰하기').access;
assert.doesNotMatch(serviceGuide.when, /POST|부품 교체 직후/);
assert.match(serviceGuide.route.join(' '), /서비스 접수/);
for (const title of ['언어·반복 입력·필터 키 설정 확인하기', '물리 키 상태와 오염 확인하기']) {
 assert.doesNotMatch(procedures[title].checkPoint, /마우스|스크롤|포인팅/);
 assert.match(procedures[title].checkPoint, /키|입력/);
 for (const locale of ['en', 'ja', 'zh-CN']) {
  const text = load(`data/locales/${locale}.json`)[procedures[title].checkPoint];
  assert.ok(text, `missing keyboard result: ${locale}`);
  assert.doesNotMatch(text, /mouse|マウス|鼠标/i);
 }
}
