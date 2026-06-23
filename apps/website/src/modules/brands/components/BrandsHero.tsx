'use client';

import { motion } from 'framer-motion';

export function BrandsHero() {
  return (
    <section className="pt-40 pb-24 px-6 md:px-12 max-w-content mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
          Brands
        </p>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground tracking-tight leading-none mb-8 max-w-3xl">
          Specialized brands built under{' '}
          <span className="text-foreground-muted">The MergeX Company.</span>
        </h1>
        <p className="text-foreground-muted text-lg max-w-2xl leading-relaxed">
          The MergeX Company builds operational, creative, and educational systems designed to support scalable modern businesses.
        </p>
      </motion.div>

      {/* Structural callout */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 flex items-start gap-6 p-6 rounded-token-xl border border-border bg-background-subtle max-w-xl"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">
            One ecosystem. Five layers.
          </p>
          <p className="text-sm text-foreground-muted leading-relaxed">
            Each brand is a distinct operational capability. Together, they
            cover the full infrastructure required to build and scale a modern
            business.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
