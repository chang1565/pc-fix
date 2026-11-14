"use client";

import { useState } from "react";

const LABELS: Record<string, { copy: string; done: string }> = {
  ko: { copy: "복사", done: "복사됨" },
  en: { copy: "Copy", done: "Copied" },
  ja: { copy: "コピー", done: "コピーしました" },
  "zh-CN": { copy: "复制", done: "已复制" },
};

export default function CopyCommand({ command, locale }: { command: string; locale: string }) {
  const [copied, setCopied] = useState(false);
  const label = LABELS[locale] ?? LABELS.en;

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="command-box">
      <code>{command}</code>
      <button type="button" onClick={copy}>
        {copied ? label.done : label.copy}
      </button>
    </div>
  );
}
