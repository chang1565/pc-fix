import DisplayAd from "@/components/DisplayAd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import FaqItem from "@/components/FaqItem";
import StepList from "@/components/StepList";
import { totalTime } from "@/lib/stepPlan";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ErrorCard from "@/components/ErrorCard";
import { errorCodes } from "@/data/errorCodes";
import { languageAlternates } from "@/lib/localization";
import { applyProblemGuide } from "@/lib/koGuide";

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
    alternates: languageAlternates(`/problems/${problem.slug}`),
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

  const found = findProblemBySlug(slug);

  if (!found) {
    notFound();
  }

  const { problem, extras } = applyProblemGuide(found);

  const relatedProblems = problem.relatedSlugs
    .map(findProblemBySlug)
    .filter(
      (item): item is Problem =>
        Boolean(item)
    );

  const faq = problem.faqs;
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://pcfixbase.com").replace(/\/$/, "");
  const relatedErrors = errorCodes.filter(entry => entry.relatedProblemSlugs.includes(problem.slug)).slice(0, 6);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "PC FIX",
        item: `${baseUrl}/`,
      },

      {
        "@type": "ListItem",
        position: 2,
        name: problem.category,
        item: `${baseUrl}/category/${encodeURIComponent(
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
    url: `${baseUrl}/problems/${problem.slug}`,
    inLanguage: "ko",

    description:
      problem.seoDescription,

    about: problem.category,
    ...(extras ? { dateModified: extras.reviewedAt } : {}),

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
    <main className="relative min-h-screen bg-surface text-ink">
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

      <div className="mx-auto max-w-5xl px-5 py-8 sm:py-10">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link
            href="/"
            className="hover:text-action hover:underline"
          >
            PC FIX
          </Link>

          <span aria-hidden="true">›</span>

          <Link
            href={`/category/${encodeURIComponent(
              problem.category
            )}`}
            className="hover:text-action hover:underline"
          >
            {problem.category}
          </Link>
        </nav>

        <article className="max-w-3xl">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {problem.title}
          </h1>

          <p className="mt-4 text-lg leading-8 text-muted">
            {problem.description}
          </p>

          <nav className="step-plan" aria-labelledby="step-plan-title">
            <h2 id="step-plan-title">점검 순서</h2>
            <p className="step-plan-note">
              위에서부터 차례대로
              확인하세요. 문제가 해결되었다면
              다음 단계는 진행할 필요가 없습니다.
            </p>
            <ol>
              {problem.solutions.map((solution) => (
                <li key={solution.order}>
                  <a href={`#solution-${solution.order}`}>
                    <span className="step-plan-n">{solution.order}</span>
                    <span className="step-plan-t">{solution.title}</span>
                    <span className="step-plan-m">{solution.time}</span>
                  </a>
                </li>
              ))}
            </ol>
            <p className="step-plan-foot">
              모두 하면{" "}
              {totalTime(problem.solutions, "ko")}
              {problem.solutions.every((solution) => solution.cost === "0원") && (
                <>
                  <span aria-hidden="true"> · </span>
                  비용 없음
                </>
              )}
            </p>
          </nav>

          {extras && extras.quickCheck.length > 0 && (
            <section className="mt-10 rounded-xl bg-paper p-5 sm:p-6">
              <h2 className="text-lg font-extrabold">
                먼저 구분할 것
              </h2>

              <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
                {extras.quickCheck.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <section>
              <h2 className="border-b border-ink pb-2 text-base font-extrabold">
                이런 증상이 있나요?
              </h2>

              <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-7 text-ink">
                {problem.symptoms.map(
                  (symptom, index) => (
                    <li key={index}>{symptom}</li>
                  )
                )}
              </ul>
            </section>

            <section>
              <h2 className="border-b border-ink pb-2 text-base font-extrabold">
                주요 원인
              </h2>

              <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-7 text-ink">
                {problem.causes.map(
                  (cause, index) => (
                    <li key={index}>{cause}</li>
                  )
                )}
              </ul>
            </section>
          </div>

          <section className="mt-14">
            <h2 className="text-2xl font-extrabold tracking-tight">
              해결 방법
            </h2>

            <ol className="step-list mt-4">
              {problem.solutions.map(
                (solution) => (
                  <li
                    key={solution.order}
                    id={`solution-${solution.order}`}
                  >
                    <span className="step-list-n" aria-hidden="true">
                      {solution.order}
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-xl font-bold leading-snug sm:text-[1.375rem]">
                        {solution.title}
                      </h3>

                      <p className="step-list-meta">
                        <span>
                          난이도{" "}
                          {solution.difficulty}
                        </span>
                        <span>{solution.time}</span>
                        {solution.cost !== "0원" && <span>{solution.cost}</span>}
                      </p>

                      <p className="mt-3 leading-7 text-muted">
                        {solution.reason}
                      </p>

                      <StepList steps={solution.steps} locale="ko" />

                      {solution.checkPoint && (
                        <div className="step-check">
                          <p className="text-sm font-bold text-check">
                            확인 포인트
                          </p>

                          <p className="mt-0.5 leading-7">
                            {solution.checkPoint}
                          </p>
                        </div>
                      )}
                    </div>
                  </li>
                )
              )}
            </ol>
          </section>

          {problem.warning && (
            <section className="mt-10 border-l-4 border-caution bg-caution-soft px-5 py-4">
              <h2 className="font-extrabold text-caution">
                주의사항
              </h2>

              <p className="mt-1 leading-7">
                {problem.warning}
              </p>
            </section>
          )}

          {extras && (
            <section className="mt-10 border-t border-line pt-6">
              {extras.sources.length > 0 && (
                <>
                  <h2 className="font-bold">참고한 공식 문서</h2>
                  <ul className="mt-3 space-y-2">
                    {extras.sources.map((source) => (
                      <li key={source.url}>
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-action underline">
                          {source.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p className="mt-4 text-xs text-muted">
                내용 검토일: {extras.reviewedAt}. 이 안내는 원인 후보와 확인 순서를 정리한 것이며 고장 원인을 확정하는 진단이 아닙니다.
              </p>
            </section>
          )}

          <section className="mt-12">
            <h2 className="border-b border-ink pb-2 text-xl font-extrabold">
              자주 묻는 질문
            </h2>

            <div>
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
        </article>

        {relatedProblems.length > 0 && (
          <section className="mt-12 max-w-3xl">
            <h2 className="border-b border-ink pb-2 text-xl font-extrabold">
              관련 문제
            </h2>

            <p className="mt-3 text-sm text-muted">
              증상이 정확히 일치하지 않는다면 아래 문제도 확인해 보세요.
            </p>

            <ul className="mt-1">
              {relatedProblems.map((relatedProblem) => (
                <li key={relatedProblem.slug} className="border-b border-line">
                  <Link
                    href={`/problems/${relatedProblem.slug}`}
                    className="group flex items-baseline gap-3 py-3.5"
                  >
                    <span className="w-16 shrink-0 text-xs text-muted">
                      {relatedProblem.category}
                    </span>

                    <span className="font-semibold group-hover:text-action group-hover:underline">
                      {relatedProblem.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedErrors.length > 0 && (
          <section className="mt-12 max-w-3xl">
            <h2 className="border-b border-ink pb-2 text-xl font-extrabold">관련 오류 코드</h2>
            <p className="mt-3 text-sm text-muted">화면에 아래 코드가 표시됐다면 오류별 확인 절차를 참고하세요.</p>
            <div>{relatedErrors.map(entry => <ErrorCard key={entry.slug} entry={entry} />)}</div>
            <Link href="/errors" className="mt-4 inline-block text-sm font-semibold text-action hover:underline">전체 오류 코드 보기</Link>
          </section>
        )}
      </div>

      <div className="display-ad-sides"><DisplayAd label="광고" placement="left" /><DisplayAd label="광고" placement="right" /></div><DisplayAd label="광고" /><SiteFooter />
    </main>
  );
}
