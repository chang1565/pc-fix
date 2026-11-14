import DisplayAd from "@/components/DisplayAd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FaqItem from "@/components/FaqItem";
import StepList from "@/components/StepList";
import { totalTime } from "@/lib/stepPlan";
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
  return <main className="relative min-h-screen bg-surface text-ink">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }} />
    <SiteHeader /><div className="mx-auto max-w-5xl px-5 py-8 sm:py-10">
      <nav aria-label="현재 위치" className="mb-5 flex flex-wrap gap-2 text-sm text-muted"><Link href="/" className="hover:text-action hover:underline">PC FIX</Link><span aria-hidden="true">›</span><Link href="/errors" className="hover:text-action hover:underline">오류 코드</Link></nav>
      <article className="max-w-3xl">
        <p className="text-sm text-muted">{entry.category}</p>
        <h1 className="mt-1 break-words text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{entry.title}</h1>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <section><h2 className="border-b border-ink pb-2 text-base font-extrabold">오류 의미</h2><p className="mt-3 leading-7">{entry.description}</p></section>
          <section><h2 className="border-b border-ink pb-2 text-base font-extrabold">자주 발생하는 상황</h2><p className="mt-3 leading-7">{entry.commonSituations}</p></section>
        </div>
        <nav className="step-plan" aria-labelledby="step-plan-title"><h2 id="step-plan-title">점검 순서</h2><p className="step-plan-note">위에서부터 확인하고 해결되면 다음 단계는 진행하지 않아도 됩니다.</p>
          <ol>{entry.solutions.map(solution => <li key={solution.order}><a href={`#solution-${solution.order}`}><span className="step-plan-n">{solution.order}</span><span className="step-plan-t">{solution.title}</span><span className="step-plan-m">{solution.time}</span></a></li>)}</ol>
          <p className="step-plan-foot">모두 하면 {totalTime(entry.solutions, "ko")}</p></nav>
        {extras && <section className="mt-10 rounded-xl bg-paper p-5 sm:p-6"><h2 className="text-lg font-extrabold">가장 먼저 확인할 것</h2><ul className="mt-3 list-disc space-y-2 pl-5 leading-7">{extras.quickCheck.map(item => <li key={item}>{item}</li>)}</ul></section>}
        <section className="mt-8"><h2 className="border-b border-ink pb-2 text-base font-extrabold">주요 원인</h2><ul className="mt-3 list-disc space-y-1.5 pl-5 leading-7">{entry.causes.map(cause => <li key={cause}>{cause}</li>)}</ul></section>
        <section className="mt-14"><h2 className="text-2xl font-extrabold tracking-tight">단계별 해결 방법</h2>
          <ol className="step-list mt-4">{entry.solutions.map(solution => <li key={solution.order} id={`solution-${solution.order}`}><span className="step-list-n" aria-hidden="true">{solution.order}</span><div className="min-w-0"><h3 className="text-xl font-bold leading-snug sm:text-[1.375rem]">{solution.title}</h3>
            <p className="step-list-meta"><span>난이도 {solution.difficulty}</span><span>{solution.time}</span></p>{solution.reason && <p className="mt-3 leading-7 text-muted">{solution.reason}</p>}
            <StepList steps={solution.steps} locale="ko" />
            {solution.checkPoint && <div className="step-check"><p className="text-sm font-bold text-check">확인 포인트</p><p className="mt-0.5 leading-7">{solution.checkPoint}</p></div>}</div></li>)}</ol></section>
        <section className="mt-10 border-t border-line pt-6"><h2 className="font-bold">공식 참고 문서</h2><ul className="mt-3 space-y-2">{entry.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-action underline">{source.title}</a></li>)}</ul><p className="mt-4 text-xs text-muted">내용 검토일: {entry.updatedAt.slice(0, 10)}</p></section>
        <section className="mt-12"><h2 className="border-b border-ink pb-2 text-xl font-extrabold">자주 묻는 질문</h2><div>{entry.faqs.map(faq => <FaqItem key={faq.question} {...faq} />)}</div></section>
      </article>
      <section className="mt-12 max-w-3xl"><h2 className="border-b border-ink pb-2 text-xl font-extrabold">관련 PC FIX 문제</h2><ul className="mt-1">{entry.relatedProblemSlugs.map(findProblemBySlug).filter(item => Boolean(item)).map(problem => problem && <li key={problem.slug} className="border-b border-line"><Link href={`/problems/${problem.slug}`} className="group flex items-baseline gap-3 py-3.5"><span className="w-16 shrink-0 text-xs text-muted">{problem.category}</span><span className="font-semibold group-hover:text-action group-hover:underline">{problem.title}</span></Link></li>)}</ul></section>
      </div><div className="display-ad-sides"><DisplayAd label="광고" placement="left" /><DisplayAd label="광고" placement="right" /></div><DisplayAd label="광고" /><SiteFooter /></main>;
}
