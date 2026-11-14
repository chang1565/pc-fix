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
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-4 text-left"
      >
        <span className="font-bold leading-7 text-ink">
          {question}
        </span>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-2xl font-light text-muted">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="pb-5 leading-7 text-muted">
          {answer}
        </div>
      )}
    </div>
  );
}