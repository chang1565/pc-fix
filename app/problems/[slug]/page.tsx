import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import FaqItem from "@/components/FaqItem";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

import {
  findProblemBySlug,
  problems,
  type Problem,
} from "@/data/problems";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return problems.map((problem) => ({
    slug: problem.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const problem = findProblemBySlug(slug);

  if (!problem) {
    return {
      title: "문제를 찾을 수 없습니다 | PC FIX",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: problem.seoTitle,
    description: problem.seoDescription,

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: problem.seoTitle,
      description: problem.seoDescription,
      type: "article",
      siteName: "PC FIX",
    },
  };
}

export default async function ProblemPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const problem = findProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  const relatedProblems = problem.relatedSlugs
    .map(findProblemBySlug)
    .filter(
      (item): item is Problem =>
        Boolean(item)
    );

  const faq = problem.faqs;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "PC FIX",
        item: "/",
      },

      {
        "@type": "ListItem",
        position: 2,
        name: problem.category,
        item: `/category/${encodeURIComponent(
          problem.category
        )}`,
      },

      {
        "@type": "ListItem",
        position: 3,
        name: problem.title,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",

    "@type": "TechArticle",

    headline: problem.title,

    description:
      problem.seoDescription,

    about: problem.category,

    author: {
      "@type": "Organization",
      name: "PC FIX",
    },

    publisher: {
      "@type": "Organization",
      name: "PC FIX",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",

    "@type": "FAQPage",

    mainEntity: faq.map((item) => ({
      "@type": "Question",

      name: item.question,

      acceptedAnswer: {
        "@type": "Answer",

        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* JSON-LD */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd
          ).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd
          ).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd
          ).replace(/</g, "\\u003c"),
        }}
      />

      <SiteHeader />

      <div className="mx-auto max-w-5xl px-5 py-8 sm:py-12">
        {/* Breadcrumb */}

        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link
            href="/"
            className="transition hover:text-blue-600"
          >
            PC FIX
          </Link>

          <span>›</span>

          <Link
            href={`/category/${encodeURIComponent(
              problem.category
            )}`}
            className="transition hover:text-blue-600"
          >
            {problem.category}
          </Link>

          <span>›</span>

          <span className="text-slate-700">
            {problem.title}
          </span>
        </nav>

        {/* 문제 소개 */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-4">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {problem.category}
            </span>
          </div>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
            {problem.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            {problem.description}
          </p>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm leading-6 text-blue-900">
              <strong>
                해결 순서
              </strong>

              <br />

              가장 간단하고 비용이 적게 드는
              방법부터 정리되어 있습니다.
              위쪽 해결 방법부터 하나씩
              확인하세요.
            </p>
          </div>
        </section>

        {/* 증상 + 원인 */}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">
              이런 증상이 있나요?
            </h2>

            <ul className="mt-5 space-y-3">
              {problem.symptoms.map(
                (symptom, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-6 text-slate-700"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />

                    <span>
                      {symptom}
                    </span>
                  </li>
                )
              )}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">
              주요 원인
            </h2>

            <ul className="mt-5 space-y-3">
              {problem.causes.map(
                (cause, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-6 text-slate-700"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />

                    <span>
                      {cause}
                    </span>
                  </li>
                )
              )}
            </ul>
          </section>
        </div>

        {/* 해결 방법 */}

        <section className="mt-10">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              해결 방법
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              위에서부터 차례대로
              확인하세요. 문제가 해결되었다면
              다음 단계는 진행할 필요가 없습니다.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            {problem.solutions.map(
              (solution) => (
                <article
                  key={solution.order}
                  id={`solution-${solution.order}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="border-b border-slate-100 bg-slate-50 px-5 py-5 sm:px-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                          {solution.order}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-slate-950 sm:text-xl">
                            {solution.title}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {solution.reason}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-2 text-xs font-semibold">
                        <span className="rounded-full bg-white px-3 py-1.5 text-slate-700 ring-1 ring-slate-200">
                          난이도{" "}
                          {solution.difficulty}
                        </span>

                        <span className="rounded-full bg-white px-3 py-1.5 text-slate-700 ring-1 ring-slate-200">
                          시간{" "}
                          {solution.time}
                        </span>

                        <span className="rounded-full bg-white px-3 py-1.5 text-slate-700 ring-1 ring-slate-200">
                          비용{" "}
                          {solution.cost}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-6 sm:px-6">
                    <ol className="space-y-4">
                      {solution.steps.map(
                        (step, index) => (
                          <li
                            key={index}
                            className="flex gap-3 text-sm leading-7 text-slate-700"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-600">
                              {index + 1}
                            </span>

                            <span>
                              {step}
                            </span>
                          </li>
                        )
                      )}
                    </ol>

                    {solution.checkPoint && (
                      <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
                        <p className="text-sm font-bold text-green-800">
                          확인 포인트
                        </p>

                        <p className="mt-1 text-sm leading-6 text-green-700">
                          {solution.checkPoint}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        {/* 주의사항 */}

        {problem.warning && (
          <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-lg font-black text-amber-900">
              주의사항
            </h2>

            <p className="mt-2 text-sm leading-7 text-amber-800">
              {problem.warning}
            </p>
          </section>
        )}

        {/* 자주 묻는 질문 */}

        <section className="mt-16">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              자주 묻는 질문
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              이 문제와 관련해 자주 확인하는
              내용을 정리했습니다.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {faq.map(
              (item, index) => (
                <FaqItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              )
            )}
          </div>
        </section>

        
{/* 관련 문제 */}

{relatedProblems.length > 0 && (
  <>
    {/* FAQ와 관련 문제 사이 강제 여백 */}
    <div
      aria-hidden="true"
      style={{
        height: "96px",
      }}
    />

    <section
      style={{
        borderTop: "1px solid #e2e8f0",
        paddingTop: "48px",
      }}
    >
      <div>
        <h2 className="text-2xl font-black text-slate-950">
          관련 문제
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          증상이 정확히 일치하지 않는다면 아래 문제도 확인해 보세요.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {relatedProblems.map((relatedProblem) => (
          <Link
            key={relatedProblem.slug}
            href={`/problems/${relatedProblem.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            <span className="text-xs font-bold text-blue-600">
              {relatedProblem.category}
            </span>

            <h3 className="mt-2 font-bold text-slate-950 group-hover:text-blue-600">
              {relatedProblem.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
              {relatedProblem.description}
            </p>

            <div className="mt-4 text-sm font-bold text-blue-600">
              해결 방법 보기 →
            </div>
          </Link>
        ))}
      </div>
    </section>
  </>
)}
        {/* 하단 CTA */}

        <section className="mt-14 rounded-3xl bg-slate-900 p-7 text-white sm:p-9">
          <h2 className="text-2xl font-black">
            다른 증상도 찾아보세요
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            PC FIX 검색창에 현재 보이는
            증상을 그대로 입력하면 관련 문제를
            찾아드립니다.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
          >
            다른 문제 검색하기 →
          </Link>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}