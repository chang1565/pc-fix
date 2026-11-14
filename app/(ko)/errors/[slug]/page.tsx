import DisplayAd from "@/components/DisplayAd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FaqItem from "@/components/FaqItem";
import StepList from "@/components/StepList";
import GuidedSteps from "@/components/GuidedSteps";
import { advancedStart, totalTime } from "@/lib/stepPlan";
import { errorCodes, findErrorBySlug } from "@/data/errorCodes";
import { findProblemBySlug } from "@/data/problems";
import { languageAlternates } from "@/lib/localization";
import { applyErrorGuide } from "@/lib/koGuide";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return errorCodes.map(entry => ({ slug: entry.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = findErrorBySlug((await params).slug);
  if (!entry) return { title: "오류를 찾을 수 없습니다", robots: { index: false } };
  return { title: entry.seoTitle, description: entry.seoDescription,
    alternates: languageAlternates(`/errors/${entry.slug}`),
    openGraph: { title: entry.seoTitle, description: entry.seoDescription, type: "article", url: `/errors/${entry.slug}`, siteName: "PC FIX" } };
}
export default async function ErrorPage({ params }: Props) {
  const found = findErrorBySlug((await params).slug);
  if (!found) notFound();
  const { entry, extras } = applyErrorGuide(found);
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://pcfixbase.com").replace(/\/$/, "");
  const pageUrl = `${baseUrl}/errors/${entry.slug}`;
  const schemas = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "PC FIX", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "오류 코드", item: `${baseUrl}/errors` },
      { "@type": "ListItem", position: 3, name: entry.title, item: pageUrl },
    ] },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: entry.title, description: entry.seoDescription, url: pageUrl, inLanguage: "ko", dateModified: entry.updatedAt, about: entry.code, author: { "@type": "Organization", name: "PC FIX" }, publisher: { "@type": "Organization", name: "PC FIX" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: entry.faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ];
  const levels = entry.solutions.map(solution =>
    solution.difficulty === "쉬움" ? "e" as const : solution.difficulty === "어려움" ? "h" as const : "m" as const);
  const name = entry.title.startsWith(entry.code) ? entry.title.slice(entry.code.length).trim() : "";
  const related = entry.relatedProblemSlugs.map(findProblemBySlug).filter(item => Boolean(item));
  return <main className="doc relative min-h-screen text-ink">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\u003c") }} />
    <SiteHeader />
    <article className="doc-wrap">
      <div className="doc-intro">
        <nav aria-label="현재 위치" className="doc-crumb"><Link href="/">PC FIX</Link><span aria-hidden="true">/</span><Link href="/errors">오류 코드</Link><span aria-hidden="true">/</span><span>{entry.category}</span></nav>
        {name ? <h1 className="doc-code-title"><code>{entry.code}</code> <span>{name}</span></h1> : <h1 className="break-words">{entry.title}</h1>}
        <p className="doc-lead">{entry.description}</p>
      </div>
      <section className="doc-sheet doc-fit" aria-labelledby="fit-title">
        <h2 id="fit-title">이 글이 맞는지 먼저 확인하세요</h2>
        {extras && extras.quickCheck.length > 0 && <div className="doc-quick"><p className="doc-sub">가장 먼저 확인할 것</p><ul>{extras.quickCheck.map(item => <li key={item}>{item}</li>)}</ul></div>}
        <div className="doc-fit-grid">
          <div><p className="doc-sub">자주 발생하는 상황</p><p className="doc-text">{entry.commonSituations}</p></div>
          <div><p className="doc-sub">주요 원인</p><ul>{entry.causes.map(cause => <li key={cause}>{cause}</li>)}</ul></div>
        </div>
      </section>
      <GuidedSteps
        totalTime={totalTime(entry.solutions, "ko")}
        advancedFrom={advancedStart(levels)}
        afterId="after-steps"
        steps={entry.solutions.map((solution, index) => ({
          order: solution.order, title: solution.title, difficulty: solution.difficulty, level: levels[index], time: solution.time,
          body: <>{solution.reason && <p className="guided-why">{solution.reason}</p>}<StepList steps={solution.steps} locale="ko" />{solution.checkPoint && <div className="step-check"><p className="step-check-title">확인 포인트</p><p>{solution.checkPoint}</p></div>}</>,
        }))}
        labels={{
          title: "단계별 해결 방법",
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
        <section className="doc-sheet"><h2>자주 묻는 질문</h2><div>{entry.faqs.map(faq => <FaqItem key={faq.question} {...faq} />)}</div></section>
        {related.length > 0 && <section className="doc-sheet"><h2>관련 PC FIX 문제</h2><ul className="doc-links">{related.map(problem => problem && <li key={problem.slug}><Link href={`/problems/${problem.slug}`}><span>{problem.category}</span>{problem.title}</Link></li>)}</ul></section>}
        <section className="doc-sources"><h2>공식 참고 문서</h2><ul>{entry.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></li>)}</ul><p>내용 검토일: {entry.updatedAt.slice(0, 10)}</p></section>
      </div>
    </article>
    <div className="display-ad-sides"><DisplayAd label="광고" placement="left" /><DisplayAd label="광고" placement="right" /></div><DisplayAd label="광고" /><SiteFooter /></main>;
}
