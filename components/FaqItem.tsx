"use client";

import { useState } from "react";

type FaqItemProps = {
  question: string;
  answer: string;
};

export default function FaqItem({
  question,
  answer,
}: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left"
      >
        <span className="font-bold leading-7 text-slate-900">
          {question}
        </span>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-2xl font-light text-slate-400 transition hover:bg-slate-50">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-slate-100 px-6 py-6 text-sm leading-7 text-slate-600">
          {answer}
        </div>
      )}
    </div>
  );
}