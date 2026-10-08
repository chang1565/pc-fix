import DisplayAd from "@/components/DisplayAd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FaqItem from "@/components/FaqItem";
import { errorCodes, findErrorBySlug } from "@/data/errorCodes";
import { findProblemBySlug } from "@/data/problems";
import { languageAlternates } from "@/lib/localization";

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
const panel = "mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";
export default async function ErrorPage({ params }: Props) {
  const entry = findErrorBySlug((await params).slug);
  if (!entry) notFound();
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
  return <main className="relative min-h-screen bg-slate-50 text-slate-900">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }} />
    <SiteHeader /><DisplayAd label="광고" placement="top" /><div className="mx-auto max-w-5xl px-5 py-10">
      <nav aria-label="현재 위치" className="flex flex-wrap gap-2 text-sm text-slate-500"><Link href="/">PC FIX</Link><span>›</span><Link href="/errors">오류 코드</Link><span>›</span><span>{entry.code}</span></nav>
      <section className={panel}><span className="text-sm font-bold text-blue-600">{entry.category}</span><h1 className="mt-3 break-words text-3xl font-black sm:text-4xl">{entry.title}</h1>
        <h2 className="mt-6 text-lg font-bold">오류 의미</h2><p className="mt-2 leading-7 text-slate-600">{entry.description}</p>
        <h2 className="mt-6 text-lg font-bold">자주 발생하는 상황</h2><p className="mt-2 leading-7 text-slate-600">{entry.commonSituations}</p>
        <div className="mt-6 rounded-xl bg-blue-50 p-5"><h2 className="font-bold text-blue-900">가장 먼저 확인할 것</h2><p className="mt-2 leading-7 text-blue-900">{entry.firstCheck}</p></div></section>
      <section className={panel}><h2 className="text-xl font-black">주요 원인</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">{entry.causes.map(cause => <li key={cause}>{cause}</li>)}</ul></section>
      <section className="mt-10"><h2 className="text-2xl font-black">단계별 해결 방법</h2><p className="mt-2 text-sm text-slate-500">위에서부터 확인하고 해결되면 다음 단계는 진행하지 않아도 됩니다.</p>
        {entry.solutions.map(solution => <article key={solution.order} className={panel}><h3 className="text-xl font-bold">{solution.order}. {solution.title}</h3><p className="mt-2 leading-7 text-slate-600">{solution.reason}</p>
          <p className="mt-3 text-xs font-semibold text-blue-600">난이도 {solution.difficulty} · 예상 시간 {solution.time}</p><ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-slate-700">{solution.steps.map(step => <li key={step}>{step}</li>)}</ol>
          <p className="mt-5 rounded-xl bg-green-50 p-4 leading-7 text-green-800"><strong>확인 포인트: </strong>{solution.checkPoint}</p></article>)}</section>
      <section className="mt-12"><h2 className="mb-5 text-2xl font-black">자주 묻는 질문</h2><div className="space-y-4">{entry.faqs.map(faq => <FaqItem key={faq.question} {...faq} />)}</div></section>
      <section className={panel}><h2 className="text-xl font-black">관련 PC FIX 문제</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{entry.relatedProblemSlugs.map(findProblemBySlug).filter(item => Boolean(item)).map(problem => problem && <Link key={problem.slug} href={`/problems/${problem.slug}`} className="rounded-xl border border-slate-200 p-4 hover:border-blue-400"><h3 className="font-bold">{problem.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{problem.description}</p></Link>)}</div></section>
      <section className={panel}><h2 className="font-bold">공식 참고 문서</h2><ul className="mt-3 space-y-2">{entry.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline">{source.title}</a></li>)}</ul><p className="mt-4 text-xs text-slate-500">내용 검토일: {entry.updatedAt.slice(0, 10)}</p></section>
      <Link href="/" className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-4 font-bold text-white">다른 증상·오류 검색하기 →</Link>
    </div><div className="display-ad-sides"><DisplayAd label="광고" placement="left" /><DisplayAd label="광고" placement="right" /></div><DisplayAd label="광고" /><SiteFooter /></main>;
}
