import { CASE_STUDIES } from '@/lib/data/case-studies';
import { CaseStudyCard } from '@/modules/case-studies/components';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies - The MergeX Company',
  description:
    'Selected case studies from The MergeX Company. Real constraints. Real systems. Measurable results.',
};

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams?: Promise<{ industry?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const activeIndustry = resolvedSearchParams?.industry ?? 'All';

  const filtered =
    activeIndustry === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.industry === activeIndustry);

  const featured = filtered.find((cs) => cs.featured) ?? filtered[0];
  const rest = filtered.filter((cs) => cs.slug !== featured?.slug);

  // Dynamically compute unique industries from data
  const industries = ['All', ...Array.from(new Set(CASE_STUDIES.map((cs) => cs.industry)))];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* ── Page header ── */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6] mb-4">
              Work
            </p>
            <h1 className="text-6xl md:text-8xl font-sans font-bold text-foreground tracking-tight leading-none">
              Case Studies
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            <p className="text-foreground-muted dark:text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl">
              Real constraints. Real systems. Real results.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        {/* Featured Card */}
        {featured && (
          <div className="mb-16">
            <CaseStudyCard caseStudy={featured} variant="featured" />
          </div>
        )}

        {/* Filters and Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-border pb-6">
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground">
              Case Studies
            </h2>
            <sup className="text-sm font-semibold text-foreground-muted dark:text-zinc-500">
              {filtered.length}
            </sup>
          </div>

          <div className="flex flex-wrap gap-2">
            {industries.map((ind) => {
              const isActive = activeIndustry === ind;
              const href =
                ind === 'All'
                  ? '/insights/case-studies'
                  : `/insights/case-studies?industry=${encodeURIComponent(ind)}`;
              return (
                <Link
                  key={ind}
                  href={href}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#8b5cf6] text-white border-transparent'
                      : 'bg-white dark:bg-card text-foreground-muted hover:text-foreground border-border hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {ind}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Compact Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            headline="No case studies found"
            subtext={`There are no case studies in the "${activeIndustry}" industry yet. Check back soon.`}
            ctaLabel="View all case studies"
            ctaHref="/insights/case-studies"
          />
        ) : (
          rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((cs, index) => (
                <CaseStudyCard
                  key={cs.slug}
                  caseStudy={cs}
                  variant="compact"
                  index={index}
                />
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
}
