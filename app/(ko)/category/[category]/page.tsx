import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { problems } from "@/data/problems";
import { languageAlternates } from "@/lib/localization";

type PageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  const categories = Array.from(
    new Set(problems.map((problem) => problem.category))
  );

  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `${decodedCategory} 문제 해결 | PC FIX`,
    alternates: languageAlternates(`/category/${encodeURIComponent(decodedCategory)}`),
    description: `${decodedCategory}와 관련된 컴퓨터 문제의 원인과 해결 방법을 확인하세요.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const categoryProblems = problems.filter(
    (problem) => problem.category === decodedCategory
  );

  if (categoryProblems.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-5 py-10">
        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-600">
            PC FIX
          </Link>
          <span className="mx-2">›</span>
          <span>{decodedCategory}</span>
        </nav>

        <section className="rounded-2xl border border-slate-200 bg-white p-7">
          <span className="text-sm font-bold text-blue-600">
            문제 카테고리
          </span>

          <h1 className="mt-2 text-3xl font-black text-slate-950">
            {decodedCategory}
          </h1>

          <p className="mt-3 text-slate-500">
            {decodedCategory}와 관련된 문제와 해결 방법을 모았습니다.
          </p>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-950">
              문제 목록
            </h2>

            <span className="text-sm text-slate-400">
              {categoryProblems.length}개
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {categoryProblems.map((problem) => (
              <Link
                key={problem.slug}
                href={`/problems/${problem.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-slate-950 group-hover:text-blue-600">
                  {problem.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {problem.description}
                </p>

                <div className="mt-5 text-sm font-bold text-blue-600">
                  해결 방법 보기 →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
