import { notFound } from 'next/navigation';
import { INSIGHTS, getInsightBySlug, getRelatedInsights } from '@/lib/data/insights';
import { InsightDetailClient } from '@/modules/insights/components/InsightDetailClient';
import type { Metadata } from 'next';

/* ─── Static params ──────────────────────────────────────────────── */
export function generateStaticParams() {
  return INSIGHTS.map((i) => ({ slug: i.slug }));
}

/* ─── Metadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};
  return {
    title: `${insight.title} - Insights - The MergeX Company`,
    description: insight.excerpt,
  };
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) notFound();

  const related = getRelatedInsights(slug, insight.category);

  return <InsightDetailClient insight={insight} related={related} />;
}
