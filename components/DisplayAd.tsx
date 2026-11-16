"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle?: { push: (entry: Record<string, never>) => unknown };
  }
}

export default function DisplayAd({ label = "광고", placement = "bottom" }: { label?: string; placement?: "top" | "bottom" | "left" | "right" }) {
  const side = placement === "left" || placement === "right";
  const container = side ? `display-ad-side display-ad-${placement}` : "mx-auto my-8 w-full max-w-5xl px-5";
  const height = side ? 600 : 250;
  const box = useRef<HTMLElement>(null);
  const requested = useRef(false);
  const [visible, setVisible] = useState(false);

  // adsbygoogle.push()는 "이 태그"가 아니라 문서에서 아직 처리 안 된 첫 광고 태그를 채운다.
  // 화면에 숨겨진 자리(모바일의 좌우 광고)에 태그가 있으면 그걸 먼저 잡아 availableWidth=0 오류가 나므로,
  // 자리가 실제로 보일 때만 태그를 만든다.
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const element = box.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      if (element.getBoundingClientRect().width === 0) return;
      observer.disconnect();
      setVisible(true);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || requested.current) return;
    requested.current = true;
    try {
      window.adsbygoogle ??= [] as Record<string, never>[];
      window.adsbygoogle.push({});
    } catch (error) {
      console.warn("Display ad could not be initialized", error);
    }
  }, [visible]);

  if (process.env.NODE_ENV !== "production") {
    return (
      <aside aria-label={label} data-ad-placement={placement} className={container}>
        <div style={{ minHeight: height }} className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-line bg-paper px-3 text-center text-sm text-muted">
          <strong>{label} 영역 · {placement} · 반응형 디스플레이</strong>
          <span>개발용 자리 표시 · 슬롯 4458770043</span>
        </div>
      </aside>
    );
  }

  return (
    <aside ref={box} aria-label={label} data-ad-placement={placement} className={container}>
      <p className="display-ad-label">{label}</p>
      {visible && (
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: height }}
          data-ad-client="ca-pub-5914836791785057"
          data-ad-slot="4458770043"
          data-ad-format="auto"
          data-full-width-responsive={side ? "false" : "true"}
        />
      )}
    </aside>
  );
}
