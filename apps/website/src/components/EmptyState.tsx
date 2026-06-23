'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  /** Main headline */
  headline?: string;
  /** Supporting description */
  subtext?: string;
  /** Primary CTA label */
  ctaLabel?: string;
  /** Primary CTA href */
  ctaHref?: string;
  /** Optional secondary CTA */
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Hide the illustration (useful in tight spaces) */
  compact?: boolean;
}

/**
 * Universal EmptyState - shown whenever a section/page has no content yet.
 * Uses the undraw illustration from /public/background/empty-state/
 * Drop-in across pages: work, insights, case studies, chat history, etc.
 */
export default function EmptyState({
  headline = 'Nothing here yet',
  subtext = 'Check back soon - content is on its way.',
  ctaLabel = 'Go to homepage',
  ctaHref = '/',
  secondaryLabel,
  secondaryHref,
  compact = false,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 select-none"
    >
      {/* Illustration */}
      {!compact && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="relative mb-10 w-full max-w-[280px] sm:max-w-[340px]"
        >
          {/* Soft glow behind illustration */}
          <div className="absolute inset-0 blur-3xl bg-violet-200/40 rounded-full scale-75 translate-y-6 pointer-events-none" />
          <Image
            src="/background/empty-state/undraw_taken_mshk.svg"
            alt="No content available"
            width={340}
            height={374}
            className="relative z-10 w-full h-auto opacity-90"
            priority={false}
          />
        </motion.div>
      )}

      {/* Text block */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="max-w-sm"
      >
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">
          {headline}
        </h3>
        <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
          {subtext}
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <Link
          href={ctaHref}
          className="btn-primary group"
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {secondaryLabel && secondaryHref && (
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-all bg-white"
          >
            {secondaryLabel}
          </Link>
        )}
      </motion.div>

      {/* Subtle badge */}
      <p className="mt-10 text-[11px] font-semibold text-gray-300 uppercase tracking-widest">
        The MergeX Company
      </p>
    </motion.div>
  );
}
