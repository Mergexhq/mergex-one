import type { Metadata } from 'next';
import { AboutHero, NarrativeCore, NonNegotiables, AboutCTA } from '@/modules/about/components';
import './about.css';

export const metadata: Metadata = {
  title: 'About - The MergeX Company',
  description:
    'MergeX is a business consulting firm for scaling companies. We diagnose the exact structural, operational, and strategic constraint limiting your growth - then build the precise system to resolve it.',
  alternates: {
    canonical: 'https://mergex.in/about',
  },
};

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* 01 - Hero */}
      <AboutHero />

      {/* 02 - Narrative Core */}
      <NarrativeCore />

      {/* 03 - Non-Negotiables */}
      <NonNegotiables />

      {/* 04 - Final CTA */}
      <AboutCTA />
    </main>
  );
}
