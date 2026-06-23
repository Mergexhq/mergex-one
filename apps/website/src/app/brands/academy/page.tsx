import type { Metadata } from 'next';
import { BrandDetailLayout } from '@/modules/brands/components';
import { BRANDS } from '@/modules/brands/data/brands';

export const metadata: Metadata = {
  title: 'MergeX Academy - Brands - The MergeX Company',
  description:
    'MergeX Academy is the knowledge and capability development layer of The MergeX Company ecosystem.',
  alternates: {
    canonical: 'https://mergex.in/brands/academy',
  },
};

const brand = BRANDS.find((b) => b.slug === 'academy')!;

const TRACKS = [
  {
    name: 'Operational Foundations',
    desc: 'The core frameworks for running a scaling business - systems thinking, constraint identification, and operational design.',
    availability: 'In Development',
  },
  {
    name: 'Commercial Architecture',
    desc: 'Sales motion design, offer clarity, conversion frameworks, and the commercial systems that produce predictable revenue.',
    availability: 'In Development',
  },
  {
    name: 'Leadership Clarity',
    desc: 'Frameworks for founder-level decision-making, delegation systems, and building leadership capacity as the business scales.',
    availability: 'Research Phase',
  },
];

export default function AcademyBrandPage() {
  return (
    <BrandDetailLayout
      brand={brand}
      whatItDoes={
        <>
          <p className="text-foreground">
            MergeX Academy delivers business and creator-focused education designed for modern industries and scalable digital careers.
          </p>
          <p className="text-foreground-muted">
            We deliver structured knowledge programs, training infrastructure, and capability development designed to make business and creator careers scalable.
          </p>
          <p className="text-foreground-muted">
            Academy is currently in development. The first cohorts will be invitation-only, offered to current and past MergeX clients and partners.
          </p>
        </>
      }
      specialSection={
        <>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-10">
            Learning Tracks
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRACKS.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl border border-border bg-background flex flex-col"
              >
                <p className="text-sm font-semibold text-foreground mb-3">{t.name}</p>
                <p className="text-xs text-foreground-muted leading-relaxed flex-1">{t.desc}</p>
                <div className="mt-5 pt-4 border-t border-border">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                    <div className="w-1 h-1 rounded-full bg-amber-400" />
                    {t.availability}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}
