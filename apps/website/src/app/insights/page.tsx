import { INSIGHTS } from '@/lib/data/insights';
import { InsightCard } from '@/modules/insights/components';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights - The MergeX Company',
  description:
    'Perspectives on systems, scaling, and execution from The MergeX Company.',
};

export default async function InsightsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolvedSearchParams?.category ?? 'All';

  const filtered =
    activeCategory === 'All'
      ? INSIGHTS
      : INSIGHTS.filter((i) => i.category === activeCategory);

  const featured = filtered.find((i) => i.featured) ?? filtered[0];
  const rest = filtered.filter((i) => i.slug !== featured?.slug);

  // Dynamically compute unique categories from data
  const categories = ['All', ...Array.from(new Set(INSIGHTS.map((i) => i.category)))];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* ── Page header ── */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6] mb-4">
              Insights
            </p>
            <h1 className="text-6xl md:text-8xl font-sans font-bold text-foreground tracking-tight leading-none">
              Insights
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            <p className="text-foreground-muted dark:text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl">
              Stay ahead with updates on systems, scaling, and execution.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        {/* Featured Card */}
        {featured && (
          <div className="mb-16">
            <InsightCard insight={featured} variant="featured" />
          </div>
        )}

        {/* Filters and Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-border pb-6">
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground">
              Articles
            </h2>
            <sup className="text-sm font-semibold text-foreground-muted dark:text-zinc-500">
              {filtered.length}
            </sup>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const href = cat === 'All' ? '/insights' : `/insights?category=${cat}`;
              return (
                <Link
                  key={cat}
                  href={href}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#8b5cf6] text-white border-transparent'
                      : 'bg-white dark:bg-card text-foreground-muted hover:text-foreground border-border hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Compact Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            headline="No insights found"
            subtext={`There are no insights in the "${activeCategory}" category yet. Check back soon.`}
            ctaLabel="View all insights"
            ctaHref="/insights"
          />
        ) : (
          rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((insight, index) => (
                <InsightCard
                  key={insight.slug}
                  insight={insight}
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
