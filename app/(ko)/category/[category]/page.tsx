import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { problems } from "@/data/problems";
import { languageAlternates } from "@/lib/localization";
import { categoryGuide } from "@/lib/koGuide";

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
    description: `${decodedCategory} 관련 컴퓨터 문제의 원인과 해결 방법을 확인하세요.`,
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

  const guide = categoryGuide(decodedCategory);
  const titleBySlug = new Map(problems.map((problem) => [problem.slug, problem.title]));

  return (
    <main className="min-h-screen bg-surface text-ink">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-5 py-8 sm:py-10">
        <nav className="mb-5 text-sm text-muted">
          <Link href="/" className="hover:text-action hover:underline">
            PC FIX
          </Link>
        </nav>

        <section className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            {decodedCategory}
          </h1>

          <p className="mt-3 text-muted">
            {decodedCategory} 관련 문제와 해결 방법을 모았습니다.
          </p>

          {guide && (
            <p className="mt-4 text-lg leading-8">
              {guide.intro}
            </p>
          )}
        </section>

        {guide && guide.paths.length > 0 && (
          <section className="mt-8 max-w-3xl rounded-xl bg-paper p-5 sm:p-6">
            <h2 className="text-lg font-extrabold">
              상황별로 먼저 볼 글
            </h2>

            <dl className="mt-3">
              {guide.paths.map((path) => (
                <div key={path.slug} className="border-b border-line py-3 last:border-b-0">
                  <dt className="text-sm text-muted">{path.when}</dt>
                  <dd className="mt-0.5">
                    <Link href={`/problems/${path.slug}`} className="font-semibold text-action hover:underline">
                      {titleBySlug.get(path.slug) ?? path.slug}
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className="mt-12">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <h2 className="text-xl font-extrabold">
              문제 목록
            </h2>

            <span className="text-sm text-muted">
              {categoryProblems.length}개
            </span>
          </div>

          <ul className="grid md:grid-cols-2 md:gap-x-10">
            {categoryProblems.map((problem) => (
              <li key={problem.slug} className="border-b border-line">
                <Link
                  href={`/problems/${problem.slug}`}
                  className="group block py-3.5 font-semibold leading-6 hover:text-action hover:underline"
                >
                  {problem.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
