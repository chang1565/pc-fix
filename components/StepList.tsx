import type { ReactNode } from "react";
import CopyCommand from "@/components/CopyCommand";

// 단계 문장은 데이터 원문 그대로 두고 화면에서만 단축키·메뉴 경로·명령어를 표시용 부품으로 바꾼다.
// 문장 안 글자는 바꾸지 않는다(한 글자도 추가·삭제하지 않음).

const KEY = "(?:Windows 키|Win|Ctrl|Shift|Alt|Fn|Esc|Delete|Tab|Enter|F\\d{1,2}|[A-Z])";
const KEY_COMBO = new RegExp(`(?<![A-Za-z0-9])${KEY}(?:\\s*\\+\\s*${KEY})+(?![A-Za-z0-9])`, "g");

// 복사 상자를 붙일 명령어(완결된 명령만). 긴 것이 먼저 오도록 정렬한다.
const COPY_COMMANDS = [
  "DISM /Online /Cleanup-Image /RestoreHealth",
  "DISM /Online /Cleanup-Image /ScanHealth",
  "DISM /Online /Cleanup-Image /CheckHealth",
  "sfc /scannow",
  "chkdsk C: /scan",
  "chkdsk /r",
  "ipconfig /flushdns",
  "ipconfig /release",
  "ipconfig /renew",
  "netsh winsock reset",
  "netsh int ip reset",
  "powercfg /lastwake",
  "powercfg /energy",
  "perfmon /rel",
  "shutdown /r /t 0",
].sort((a, b) => b.length - a.length);
const INLINE_ONLY = /[A-Za-z0-9_.-]+\.(?:exe|msc|cpl)(?![A-Za-z0-9])/g;
const COMMAND_RE = new RegExp(
  `(${COPY_COMMANDS.map((c) => c.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")).join("|")})`,
  "g"
);

// 한국어 메뉴 경로의 시작점으로 인정하는 이름. 목록에 없는 말 뒤의 화살표는 그대로 둔다.
const MENU_ROOTS = [
  "고급 네트워크 설정", "프린터 및 스캐너", "네트워크 및 인터넷", "개인정보 및 보안", "Bluetooth 및 장치",
  "시간 및 언어", "전원 및 배터리", "디스플레이 어댑터", "Windows 업데이트", "Windows 로그",
  "작업 관리자", "장치 관리자", "이벤트 뷰어", "문제 해결", "고급 옵션", "시작 설정", "전원 옵션",
  "설정", "제어판", "접근성", "시스템", "전원",
].sort((a, b) => b.length - a.length);
const ARROW = " → ";
const PARTICLE = /(입니다|에서|으로|을|를)$/;

type Part = { kind: "text"; value: string } | { kind: "path"; segments: string[] };

export function splitMenuPaths(text: string): Part[] {
  const parts: Part[] = [];
  let rest = text;
  while (rest) {
    let start = -1;
    let root = "";
    for (const candidate of MENU_ROOTS) {
      const re = new RegExp(`(?<![\\p{L}\\p{N}])${candidate.replace(/\s/g, "\\s")}(?=${ARROW})`, "u");
      const m = re.exec(rest);
      if (m && (start === -1 || m.index < start)) {
        start = m.index;
        root = candidate;
      }
    }
    if (start === -1) break;

    const segments = [root];
    let cursor = start + root.length + ARROW.length;
    for (;;) {
      const remaining = rest.slice(cursor);
      const next = remaining.indexOf(ARROW);
      const sentenceEnd = remaining.search(/[.,)]/);
      if (next !== -1 && (sentenceEnd === -1 || next < sentenceEnd) && remaining.slice(0, next).split(/\s+/).length <= 4 && !remaining.slice(0, next).includes("(")) {
        segments.push(remaining.slice(0, next));
        cursor += next + ARROW.length;
        continue;
      }
      // 마지막 단계: 4어절 안에서 조사로 끝나는 어절까지를 이름으로 본다.
      const words = remaining.split(/(?<=\s)/);
      let taken = "";
      let found = false;
      for (let i = 0; i < Math.min(words.length, 4); i += 1) {
        const word = words[i];
        const core = word.trimEnd().replace(/[.,]+$/, "");
        if (/[(),.]/.test(core)) break;
        const stripped = core.replace(PARTICLE, "");
        if (stripped !== core && stripped.length >= 1) {
          segments.push((taken + stripped).trim());
          cursor += taken.length + stripped.length;
          found = true;
          break;
        }
        if (core !== word.trimEnd()) break;
        taken += word;
      }
      if (!found) {
        const end = sentenceEnd === -1 ? remaining.length : sentenceEnd;
        const chunk = remaining.slice(0, end).trimEnd();
        // 동사로 끝나거나 괄호가 섞인 말은 메뉴 이름으로 보지 않는다.
        if (chunk && chunk.split(/\s+/).length <= 4 && !/[(]/.test(chunk) && !/다$/.test(chunk)) {
          segments.push(chunk);
          cursor += chunk.length;
        } else {
          // 마지막 이름을 못 정하면 화살표를 하나 되돌려 앞 단계까지만 표시한다.
          cursor -= ARROW.length;
        }
      }
      break;
    }
    if (segments.length < 2) {
      // 화살표 뒤 이름을 못 정했으면 원문 그대로 둔다.
      parts.push({ kind: "text", value: rest.slice(0, cursor + ARROW.length) });
      rest = rest.slice(cursor + ARROW.length);
      continue;
    }
    if (start > 0) parts.push({ kind: "text", value: rest.slice(0, start) });
    parts.push({ kind: "path", segments });
    rest = rest.slice(cursor);
  }
  if (rest) parts.push({ kind: "text", value: rest });
  // 이웃한 원문 조각을 하나로 합친다.
  return parts.reduce<Part[]>((merged, part) => {
    const prev = merged[merged.length - 1];
    if (part.kind === "text" && prev?.kind === "text") prev.value += part.value;
    else merged.push(part);
    return merged;
  }, []);
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  // 명령어 → 단축키 → 실행 파일 이름 순으로 잘라 표시한다.
  const out: ReactNode[] = [];
  let index = 0;
  const pushText = (chunk: string, rule: number, key: string) => {
    if (!chunk) return;
    if (rule === 0) {
      const pieces = chunk.split(COMMAND_RE);
      pieces.forEach((piece, i) => (i % 2 === 1 ? out.push(<code key={`${key}c${i}`} className="inline-code">{piece}</code>) : pushText(piece, 1, `${key}c${i}`)));
    } else if (rule === 1) {
      let last = 0;
      for (const m of chunk.matchAll(KEY_COMBO)) {
        const at = m.index ?? 0;
        pushText(chunk.slice(last, at), 2, `${key}k${at}`);
        const keys = m[0].split(/\s*\+\s*/);
        out.push(
          <span key={`${key}K${at}`} className="key-combo">
            {keys.map((k, i) => (
              <span key={i}>
                {i > 0 && <span className="key-plus" aria-hidden="true">+</span>}
                <kbd>{k}</kbd>
              </span>
            ))}
          </span>
        );
        last = at + m[0].length;
      }
      pushText(chunk.slice(last), 2, `${key}k-end`);
    } else {
      let last = 0;
      for (const m of chunk.matchAll(INLINE_ONLY)) {
        const at = m.index ?? 0;
        if (at > last) out.push(chunk.slice(last, at));
        out.push(<code key={`${key}e${at}`} className="inline-code">{m[0]}</code>);
        last = at + m[0].length;
      }
      if (last < chunk.length) out.push(chunk.slice(last));
    }
  };
  pushText(text, 0, `${keyPrefix}${index++}`);
  return out;
}

function StepText({ text, locale }: { text: string; locale: string }) {
  if (locale !== "ko") return <>{renderInline(text, "s")}</>;
  return (
    <>
      {splitMenuPaths(text).map((part, i) =>
        part.kind === "text" ? (
          <span key={i}>{renderInline(part.value, `t${i}`)}</span>
        ) : (
          <span key={i} className="menu-path">
            {part.segments.map((segment, j) => (
              <span key={j}>
                {j > 0 && <span className="menu-sep" aria-hidden="true">›</span>}
                <span className="menu-chip">{segment}</span>
              </span>
            ))}
          </span>
        )
      )}
    </>
  );
}

function findCommands(steps: string[]): string[] {
  const found: string[] = [];
  for (const step of steps) {
    for (const m of step.matchAll(COMMAND_RE)) if (!found.includes(m[0])) found.push(m[0]);
  }
  return found;
}

// 여러 안내에서 함께 쓰는 짧은 공용 안내(한국어 전용). 단계 문장에 키워드가 있으면 그 단계 아래에 접어서 붙인다.
const SHARED_GUIDES: { keyword: string; title: string; steps: ReactNode[] }[] = [
  {
    keyword: "작업 관리자",
    title: "작업 관리자 여는 법",
    steps: [
      <>키보드에서 <StepText text="Ctrl + Shift + Esc" locale="ko" />를 동시에 누릅니다.</>,
      "또는 작업 표시줄 빈 곳을 마우스 오른쪽 버튼으로 눌러 작업 관리자를 선택합니다.",
      <>화면이 멈춰 반응이 없으면 <StepText text="Ctrl + Alt + Delete" locale="ko" />를 누른 뒤 작업 관리자를 고릅니다.</>,
    ],
  },
  {
    keyword: "관리자 권한",
    title: "관리자 권한 터미널 여는 법",
    steps: [
      <>시작 버튼을 마우스 오른쪽 버튼으로 누르거나 <StepText text="Win + X" locale="ko" />를 누릅니다.</>,
      "터미널(관리자)를 선택합니다. Windows 10은 Windows PowerShell(관리자)입니다.",
      "사용자 계정 컨트롤 창이 뜨면 예를 누릅니다.",
    ],
  },
];

type StepListProps = { steps: string[]; locale: string };

export default function StepList({ steps, locale }: StepListProps) {
  const commands = findCommands(steps);
  const guides = locale === "ko" ? SHARED_GUIDES.filter((g) => steps.some((s) => s.includes(g.keyword))) : [];
  return (
    <>
      <ol className="step-do">
        {steps.map((step, index) => (
          <li key={index}>
            <StepText text={step} locale={locale} />
          </li>
        ))}
      </ol>
      {commands.map((command) => (
        <CopyCommand key={command} command={command} locale={locale} />
      ))}
      {guides.map((guide) => (
        <details key={guide.keyword} className="shared-guide">
          <summary>{guide.title}</summary>
          <ol>
            {guide.steps.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </details>
      ))}
    </>
  );
}
