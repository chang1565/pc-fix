"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: { push: (entry: Record<string, never>) => unknown };
  }
}

export default function DisplayAd({ label = "광고", placement = "bottom" }: { label?: string; placement?: "top" | "bottom" | "left" | "right" }) {
  const side = placement === "left" || placement === "right";
  const container = side ? `display-ad-side display-ad-${placement}` : "display-ad-block mx-auto my-8 w-full max-w-5xl px-5";
  const height = side ? 600 : 250;
  const element = useRef<HTMLModElement>(null);
  const wrapper = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const requested = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    // AdSense는 전역 큐에서 ins를 선택하므로 숨겨진 칸은 아직 생성하지 않습니다.
    const box = wrapper.current;
    if (!box) return;
    const observer = new ResizeObserver(() => {
      if (box.getBoundingClientRect().width === 0) return;
      setReady(true);
      observer.disconnect();
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || !element.current || requested.current) return;
    requested.current = true;
    try {
      window.adsbygoogle ??= [] as Record<string, never>[];
      window.adsbygoogle.push({});
    } catch (error) {
      console.warn("Display ad could not be initialized", error);
    }
  }, [ready]);

  if (process.env.NODE_ENV !== "production") {
    return (
      <aside aria-label={label} data-ad-placement={placement} className={container}>
        <div style={{ minHeight: height }} className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100 px-3 text-center text-sm text-slate-500">
          <strong>{label} 영역 · {placement} · 반응형 디스플레이</strong>
          <span>개발용 자리 표시 · 슬롯 4458770043</span>
        </div>
      </aside>
    );
  }

  return (
    <aside ref={wrapper} aria-label={label} data-ad-placement={placement} className={container}>
      <p className="mb-3 text-center text-xs text-slate-400">{label}</p>
      {ready ? <ins
        ref={element}
        className="adsbygoogle"
        style={side ? { width: 160, height: 600 } : { display: "block" }}
        data-ad-client="ca-pub-5914836791785057"
        data-ad-slot="4458770043"
        data-ad-format={side ? undefined : "auto"}
        data-full-width-responsive={side ? undefined : "true"}
      /> : <div aria-hidden="true" className="display-ad-space" style={side ? { minHeight: height } : undefined} />}
    </aside>
  );
}
