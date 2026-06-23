'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Brand, BrandStatus } from '../data/brands';

const STATUS_STYLES: Record<BrandStatus, { dot: string; text: string; bg: string }> = {
  Active: {
    dot: 'bg-emerald-500',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
  },
  'In Development': {
    dot: 'bg-amber-400',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
  },
  'Research Phase': {
    dot: 'bg-sky-400',
    text: 'text-sky-700',
    bg: 'bg-sky-50',
  },
};

const LAYER_ACCENT: Record<string, string> = {
  'Core Infrastructure': '#8B5CF6',
  'Creative Infrastructure': '#0EA5E9',
  'Technology Infrastructure': '#10B981',
  'Talent Infrastructure': '#F59E0B',
  'Knowledge Infrastructure': '#EC4899',
};

interface BrandBlockProps {
  brand: Brand;
  index: number;
}

export function BrandBlock({ brand, index }: BrandBlockProps) {
  const isEven = index % 2 === 0;
  const status = STATUS_STYLES[brand.status];
  const accent = LAYER_ACCENT[brand.layer] ?? '#8B5CF6';
  const padded = String(index + 1).padStart(2, '0');

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`py-24 px-6 md:px-12 border-t border-border ${
        !isEven ? 'bg-background-subtle' : 'bg-background'
      }`}
    >
      <div className="max-w-content mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${
            isEven ? '' : 'lg:flex lg:flex-row-reverse'
          }`}
        >
          {/* ── Left: Text Content ─────────────────────────── */}
          <div>
            {/* Index + Layer */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-bold tabular-nums text-foreground-muted opacity-40">
                {padded}
              </span>
              <div className="h-px w-8 bg-border" />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: accent }}
              >
                {brand.layer}
              </span>
            </div>

            {/* Brand name */}
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight leading-tight mb-4">
              {brand.name}
            </h2>

            {/* Tagline */}
            <p className="text-lg text-foreground-muted mb-6 leading-snug font-medium">
              {brand.tagline}
            </p>

            {/* Description */}
            <p className="text-foreground-muted text-[15px] leading-relaxed mb-8">
              {brand.description}
            </p>

            {/* CTA */}
            <Link
              href={brand.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors duration-200 group"
            >
              Learn more
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          {/* ── Right: Structured info panel ───────────────── */}
          <div className="flex flex-col gap-6">
            {/* Ecosystem role */}
            <div className="rounded-token-lg border border-border bg-bg-secondary p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-3">
                Ecosystem Role
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {brand.role}
              </p>
            </div>

            {/* Focus areas */}
            <div className="rounded-token-lg border border-border bg-bg-secondary p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-4">
                Focus Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {brand.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="text-xs px-3 py-1.5 rounded-token-md border border-border text-foreground-muted font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-token-md text-xs font-semibold ${status.bg} ${status.text}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {brand.status}
              </div>
              <span className="text-xs text-foreground-muted">
                {brand.status === 'Active'
                  ? 'Accepting new engagements'
                  : brand.status === 'In Development'
                  ? 'Limited availability'
                  : 'Internal research only'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
