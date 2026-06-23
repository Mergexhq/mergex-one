import { notFound } from 'next/navigation';
import {
  CASE_STUDIES,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
} from '@/lib/data/case-studies';
import { CaseStudyDetailClient } from '@/modules/case-studies/components/CaseStudyDetailClient';
import type { Metadata } from 'next';

/* ─── Static params ──────────────────────────────────────────────── */
export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

/* ─── Metadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} - Case Studies - The MergeX Company`,
    description: cs.excerpt,
  };
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) notFound();

  const related = getRelatedCaseStudies(slug, cs.industry);

  return <CaseStudyDetailClient caseStudy={cs} related={related} />;
}
