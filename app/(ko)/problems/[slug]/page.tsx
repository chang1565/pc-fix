import DisplayAd from "@/components/DisplayAd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import FaqItem from "@/components/FaqItem";
import StepList from "@/components/StepList";
import GuidedSteps from "@/components/GuidedSteps";
import { advancedStart, totalTime } from "@/lib/stepPlan";
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

  const levels = problem.solutions.map((solution) =>
    solution.difficulty === "쉬움" ? "e" as const : solution.difficulty === "어려움" ? "h" as const : "m" as const
  );

  return (
    <main className="doc relative min-h-screen text-ink">
      {/* JSON-LD */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd
          ).replace(/</g, "\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd
          ).replace(/</g, "\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd
          ).replace(/</g, "\u003c"),
        }}
      />

      <SiteHeader />

      <article className="doc-wrap">
        <div className="doc-intro">
          <nav aria-label="현재 위치" className="doc-crumb">
            <Link href="/">PC FIX</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/category/${encodeURIComponent(problem.category)}`}>{problem.category}</Link>
          </nav>

          <h1>{problem.title}</h1>

          <p className="doc-lead">{problem.description}</p>
        </div>

        <section className="doc-sheet doc-fit" aria-labelledby="fit-title">
          <h2 id="fit-title">이 글이 맞는지 먼저 확인하세요</h2>

          {extras && extras.quickCheck.length > 0 && (
            <div className="doc-quick">
              <p className="doc-sub">먼저 구분할 것</p>
              <ul>
                {extras.quickCheck.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="doc-fit-grid">
            <div>
              <p className="doc-sub">이런 증상이 있나요?</p>
              <ul>
                {problem.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="doc-sub">주요 원인</p>
              <ul>
                {problem.causes.map((cause, index) => (
                  <li key={index}>{cause}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <GuidedSteps
          totalTime={totalTime(problem.solutions, "ko")}
          advancedFrom={advancedStart(levels)}
          afterId="after-steps"
          steps={problem.solutions.map((solution, index) => ({
            order: solution.order,
            title: solution.title,
            difficulty: solution.difficulty,
            level: levels[index],
            time: solution.time,
            cost: solution.cost !== "0원" ? solution.cost : undefined,
            body: (
              <>
                <p className="guided-why">{solution.reason}</p>
                <StepList steps={solution.steps} locale="ko" />
                {solution.checkPoint && (
                  <div className="step-check">
                    <p className="step-check-title">확인 포인트</p>
                    <p>{solution.checkPoint}</p>
                  </div>
                )}
              </>
            ),
          }))}
          labels={{
            title: "해결 방법",
            summary: "{count}단계, 모두 하면 {time}. 쉬운 확인부터 적었으니 해결되면 그 단계에서 멈추세요.",
            expandAll: "모두 펼치기",
            collapseAll: "모두 접기",
            ask: "이 단계로 해결됐나요?",
            yes: "네, 해결됐어요",
            no: "아니요, 다음 단계",
            noLast: "아니요, 그래도 안 돼요",
            solvedAt: "{n}단계에서 해결됨",
            triedAt: "{n}단계 확인함, 해결 안 됨",
            undo: "취소",
            rail: "점검 순서",
            notStarted: "아직 시작 전",
            progressTried: "{n}단계까지 확인함",
            progressSolved: "{n}단계에서 해결",
            band: "{n}/{total}단계",
            bandLink: "단계 목록",
            gateTitle: "여기부터 고급 단계",
            gateText: "되돌리기 어렵거나 부품·설정을 직접 다루는 작업입니다. 자신이 없으면 여기까지 확인한 결과를 가지고 점검을 맡겨도 됩니다.",
            advanced: "고급",
            doneTitle: "해결됐다니 다행입니다",
            doneText: "같은 증상이 다시 생기면 이 페이지의 {n}단계부터 확인하세요.",
          }}
        />

        <div id="after-steps" className="doc-after">
          {problem.warning && (
            <section className="doc-caution">
              <h2>주의사항</h2>
              <p>{problem.warning}</p>
            </section>
          )}

          <section className="doc-sheet">
            <h2>자주 묻는 질문</h2>
            <div>
              {faq.map((item, index) => (
                <FaqItem key={index} question={item.question} answer={item.answer} />
              ))}
            </div>
          </section>

          {relatedProblems.length > 0 && (
            <section className="doc-sheet">
              <h2>관련 문제</h2>
              <p className="doc-note-top">증상이 정확히 일치하지 않는다면 아래 문제도 확인해 보세요.</p>
              <ul className="doc-links">
                {relatedProblems.map((relatedProblem) => (
                  <li key={relatedProblem.slug}>
                    <Link href={`/problems/${relatedProblem.slug}`}>
                      <span>{relatedProblem.category}</span>
                      {relatedProblem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {relatedErrors.length > 0 && (
            <section className="doc-sheet">
              <h2>관련 오류 코드</h2>
              <p className="doc-note-top">화면에 아래 코드가 표시됐다면 오류별 확인 절차를 참고하세요.</p>
              <div>{relatedErrors.map(entry => <ErrorCard key={entry.slug} entry={entry} />)}</div>
              <Link href="/errors" className="doc-more">전체 오류 코드 보기</Link>
            </section>
          )}

          {extras && (
            <section className="doc-sources">
              {extras.sources.length > 0 && (
                <>
                  <h2>참고한 공식 문서</h2>
                  <ul>
                    {extras.sources.map((source) => (
                      <li key={source.url}>
                        <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p>
                내용 검토일: {extras.reviewedAt}. 이 안내는 원인 후보와 확인 순서를 정리한 것이며 고장 원인을 확정하는 진단이 아닙니다.
              </p>
            </section>
          )}
        </div>
      </article>

      <div className="display-ad-sides"><DisplayAd label="광고" placement="left" /><DisplayAd label="광고" placement="right" /></div><DisplayAd label="광고" /><SiteFooter />
    </main>
  );
}
