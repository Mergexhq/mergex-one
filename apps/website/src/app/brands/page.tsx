import type { Metadata } from 'next';
import { BRANDS } from '@/modules/brands/data/brands';
import { BrandsHero, EcosystemDiagram, BrandBlock, BrandsCTA } from '@/modules/brands/components';

export const metadata: Metadata = {
  title: 'Brands - The MergeX Company',
  description:
    'Specialized brands built under The MergeX Company. Each brand operates with a focused role across systems, technology, execution, products, talent, and education.',
  alternates: {
    canonical: 'https://mergex.in/brands',
  },
};

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* 01 - Hero */}
      <BrandsHero />

      {/* 02 - Ecosystem Overview */}
      <EcosystemDiagram />

      {/* 03 - Brand Sections */}
      <section className="max-w-content mx-auto px-6 md:px-12 pb-0">
        <div className="flex items-center gap-4 mb-20">
          <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted">
            The Brands
          </p>
          <div className="h-px flex-1 bg-border" />
        </div>
      </section>

      {BRANDS.map((brand, i) => (
        <BrandBlock key={brand.slug} brand={brand} index={i} />
      ))}

      {/* 04 - Diagnostic CTA */}
      <BrandsCTA />
    </main>
  );
}
