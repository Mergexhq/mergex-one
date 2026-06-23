import type { Metadata } from 'next';
import {
  MergeXHero,
  ConstraintProblem,
  HowWeOperate,
  IndustriesStrip,
  SolutionsAsPrescriptions,
  SelectedCaseStudies,
  MergeXCTA,
} from '@/modules/brands-mergex/components';

export const metadata: Metadata = {
  title: 'MergeX - Brands - The MergeX Company',
  description:
    'MergeX is a business consulting firm for scaling companies. We use a diagnostic-led approach to identify the exact constraint holding your business back - and build only what resolves it.',
};

export default function MergeXBrandPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* 01 - Hero */}
      <MergeXHero />

      {/* 02 - Constraint Problem */}
      <ConstraintProblem />

      {/* 03 - How MergeX Operates (S.C.A.L.E.) */}
      <HowWeOperate />

      {/* 04 - Industries Strip */}
      <IndustriesStrip />

      {/* 05 - Solutions As Prescriptions */}
      <SolutionsAsPrescriptions />

      {/* 06 - Selected Case Studies */}
      <SelectedCaseStudies />

      {/* 07 - Final CTA → /diagnostic */}
      <MergeXCTA />
    </main>
  );
}
