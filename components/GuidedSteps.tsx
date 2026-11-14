"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

// 해결 단계 목록(시안 G). 한 번에 한 단계만 펼쳐 두고, "해결 안 됨"을 누르면 다음 단계를 연다.
// 넓은 화면은 오른쪽에 점검 순서를 고정하고, 좁은 화면은 머리말 아래에 진행 띠를 띄운다.
// 해결 여부는 이 화면 안에서만 쓰고 저장하거나 서버로 보내지 않는다.
// 문구는 페이지(번역 대상 파일)에서 labels로 받는다. {n}·{total}·{count}·{time} 자리를 채운다.

export type GuidedStep = {
  order: number;
  title: string;
  difficulty: string;
  level: "e" | "m" | "h";
  time: string;
  cost?: string;
  body: ReactNode;
};

export type GuidedLabels = {
  title: string;
  summary: string;
  expandAll: string;
  collapseAll: string;
  ask: string;
  yes: string;
  no: string;
  noLast: string;
  solvedAt: string;
  triedAt: string;
  undo: string;
  rail: string;
  notStarted: string;
  progressTried: string;
  progressSolved: string;
  band: string;
  bandLink: string;
  gateTitle: string;
  gateText: string;
  advanced: string;
  doneTitle: string;
  doneText: string;
};

type Mark = "tried" | "solved";

const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const scrollTo = (element: Element | null | undefined, block: ScrollLogicalPosition = "start") =>
  element?.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block });

export default function GuidedSteps({
  steps,
  totalTime,
  advancedFrom,
  afterId,
  labels,
}: {
  steps: GuidedStep[];
  totalTime: string;
  advancedFrom: number | null;
  afterId: string;
  labels: GuidedLabels;
}) {
  const total = steps.length;
  const [open, setOpen] = useState<Set<number>>(() => new Set([1]));
  const [marks, setMarks] = useState<Record<number, Mark>>({});
  const [current, setCurrent] = useState(1);
  const [bandOn, setBandOn] = useState(false);
  const headRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLElement>>(new Map());

  const go = useCallback((order: number) => {
    setOpen((prev) => new Set(prev).add(order));
    requestAnimationFrame(() => scrollTo(itemRefs.current.get(order)));
  }, []);

  // 예전 주소(#solution-3)나 점검 순서 링크로 들어오면 그 단계를 연다.
  useEffect(() => {
    const fromHash = () => {
      const match = /^#solution-(\d+)$/.exec(window.location.hash);
      if (match) go(Number(match[1]));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [go]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setCurrent(Number((entry.target as HTMLElement).dataset.order))),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    itemRefs.current.forEach((element) => observer.observe(element));
    const head = headRef.current;
    const band = new IntersectionObserver(([entry]) => setBandOn(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    if (head) band.observe(head);
    return () => {
      observer.disconnect();
      band.disconnect();
    };
  }, []);

  const toggle = (order: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(order)) next.delete(order);
      else next.add(order);
      return next;
    });
  const allOpen = open.size === total;

  const answer = (order: number, solved: boolean) => {
    if (solved) {
      setMarks((prev) => {
        const next: Record<number, Mark> = {};
        for (const [key, value] of Object.entries(prev)) if (value !== "solved") next[Number(key)] = value;
        next[order] = "solved";
        return next;
      });
      requestAnimationFrame(() => scrollTo(document.getElementById("guided-done"), "center"));
      return;
    }
    setMarks((prev) => ({ ...prev, [order]: "tried" }));
    setOpen((prev) => {
      const next = new Set(prev);
      next.delete(order);
      if (order < total) next.add(order + 1);
      return next;
    });
    requestAnimationFrame(() =>
      order < total ? scrollTo(itemRefs.current.get(order + 1)) : scrollTo(document.getElementById(afterId))
    );
  };
  const undo = (order: number) =>
    setMarks((prev) => {
      const next = { ...prev };
      delete next[order];
      return next;
    });

  const solved = Number(Object.keys(marks).find((key) => marks[Number(key)] === "solved") ?? 0);
  const tried = Object.keys(marks).filter((key) => marks[Number(key)] === "tried").map(Number);
  const reached = solved ? total : tried.length ? Math.max(...tried) : 0;
  const state = solved
    ? fill(labels.progressSolved, { n: solved })
    : tried.length
      ? fill(labels.progressTried, { n: Math.max(...tried) })
      : labels.notStarted;
  const percent = `${(reached / total) * 100}%`;

  return (
    <section className="guided" aria-labelledby="guided-title">
      <div className="guided-main">
        <div className="guided-head" ref={headRef} id="guided-top">
          <h2 id="guided-title">{labels.title}</h2>
          <p>{fill(labels.summary, { count: total, time: totalTime })}</p>
          <button type="button" className="guided-all" aria-pressed={allOpen} onClick={() => setOpen(allOpen ? new Set() : new Set(steps.map((s) => s.order)))}>
            {allOpen ? labels.collapseAll : labels.expandAll}
          </button>
        </div>

        <div className="guided-list">
          {steps.map((step) => {
            const isOpen = open.has(step.order);
            const mark = marks[step.order];
            const advanced = advancedFrom !== null && step.order >= advancedFrom;
            const last = step.order === total;
            return (
              <div key={step.order} className="guided-group">
                {advancedFrom === step.order && (
                  <div className="guided-gate" role="note">
                    <p className="guided-gate-title">{labels.gateTitle}</p>
                    <p>{labels.gateText}</p>
                  </div>
                )}
                <section
                  id={`solution-${step.order}`}
                  data-order={step.order}
                  ref={(element) => {
                    if (element) itemRefs.current.set(step.order, element);
                    else itemRefs.current.delete(step.order);
                  }}
                  className={`guided-step${isOpen ? " is-open" : ""}${mark ? ` is-${mark}` : ""}${advanced ? " is-advanced" : ""}`}
                >
                  <h3>
                    <button type="button" className="guided-toggle" aria-expanded={isOpen} aria-controls={`solution-${step.order}-body`} onClick={() => toggle(step.order)}>
                      <span className="guided-node" aria-hidden="true">{step.order}</span>
                      <span className="guided-title">{step.title}</span>
                      <span className="guided-meta">
                        <span className={`guided-level guided-level-${step.level}`}>{step.difficulty}</span>
                        <span>{step.time}</span>
                        {step.cost && <span>{step.cost}</span>}
                        {advanced && <span className="guided-badge">{labels.advanced}</span>}
                      </span>
                      <svg className="guided-chev" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 8l5 5 5-5" /></svg>
                    </button>
                  </h3>
                  <div className="guided-body" id={`solution-${step.order}-body`} hidden={!isOpen}>
                    {step.body}
                    <div className="guided-ask" role="group" aria-label={step.title}>
                      {mark ? (
                        <p className="guided-result">
                          <span>{fill(mark === "solved" ? labels.solvedAt : labels.triedAt, { n: step.order })}</span>
                          <button type="button" onClick={() => undo(step.order)}>{labels.undo}</button>
                        </p>
                      ) : (
                        <>
                          <p className="guided-q">{labels.ask}</p>
                          <div className="guided-buttons">
                            <button type="button" className="guided-yes" onClick={() => answer(step.order, true)}>{labels.yes}</button>
                            <button type="button" className="guided-no" onClick={() => answer(step.order, false)}>{last ? labels.noLast : labels.no}</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            );
          })}
        </div>

        {solved > 0 && (
          <div className="guided-done" id="guided-done" role="status">
            <p className="guided-done-title">{labels.doneTitle}</p>
            <p>{fill(labels.doneText, { n: solved })}</p>
          </div>
        )}
      </div>

      <aside className="guided-rail" aria-label={labels.rail}>
        <div className="guided-rail-in">
          <p className="guided-rail-title">{labels.rail}</p>
          <ol>
            {steps.map((step) => (
              <li key={step.order} className={`${current === step.order ? "is-now" : ""}${marks[step.order] ? ` is-${marks[step.order]}` : ""}`}>
                <a href={`#solution-${step.order}`} onClick={(event) => { event.preventDefault(); go(step.order); }}>
                  <span className="guided-rail-n">{step.order}</span>
                  <span className="guided-rail-t">{step.title}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="guided-progress"><span style={{ width: percent }} /></div>
          <p className="guided-rail-state">{state}</p>
        </div>
      </aside>

      <div className={`guided-band${bandOn ? " is-on" : ""}`} aria-hidden="true">
        <span className="guided-band-step">{fill(labels.band, { n: current, total })}</span>
        <span className="guided-band-state">{state}</span>
        <button type="button" tabIndex={-1} onClick={() => scrollTo(headRef.current)}>{labels.bandLink}</button>
        <span className="guided-band-bar"><span style={{ width: percent }} /></span>
      </div>
    </section>
  );
}
