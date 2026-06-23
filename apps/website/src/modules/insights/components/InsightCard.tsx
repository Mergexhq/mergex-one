'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Insight } from '@/lib/types/content';

interface InsightCardProps {
  insight: Insight;
  variant?: 'featured' | 'compact';
  index?: number;
}

export function InsightCard({ insight, variant = 'compact', index = 0 }: InsightCardProps) {
  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative rounded-2xl border border-border bg-white dark:bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 items-stretch">
          {/* Image Column */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] lg:aspect-auto lg:min-h-[400px] overflow-hidden rounded-xl">
            {insight.coverImage ? (
              <Image
                src={insight.coverImage}
                alt={insight.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-background-subtle flex items-center justify-center">
                <span className="text-foreground-muted text-sm">No cover image</span>
              </div>
            )}
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-between p-2 lg:p-4 relative min-h-[350px] lg:min-h-auto">
            <div>
              {/* Category + Date Row */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center">
                  {/* Small purple square dot next to category */}
                  <span className="w-2.5 h-2.5 bg-[#8b5cf6] mr-2 inline-block rounded-[1px] shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground-muted dark:text-zinc-400">
                    {insight.category}
                  </span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted/60 dark:text-zinc-500">
                  {new Date(insight.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {/* Title */}
              <Link href={`/insights/${insight.slug}`} className="block group/title">
                <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground tracking-tight leading-tight mb-4 group-hover/title:text-primary transition-colors duration-300">
                  {insight.title}
                </h2>
              </Link>

              {/* Excerpt */}
              <p className="text-foreground-muted dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
                {insight.excerpt}
              </p>
            </div>

            {/* Bottom Row */}
            <div className="flex items-end justify-between mt-8 lg:mt-0">
              <Link
                href={`/insights/${insight.slug}`}
                className="text-xs font-bold uppercase tracking-widest text-foreground dark:text-white underline underline-offset-4 decoration-2 hover:text-primary transition-colors duration-200"
              >
                Read Article
              </Link>

              {/* Purple Arrow Button in Bottom Right */}
              <Link
                href={`/insights/${insight.slug}`}
                className="w-12 h-12 bg-[#ede9fe] dark:bg-[#20163b] hover:bg-[#ddd6fe] dark:hover:bg-[#30215c] rounded-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 shadow-sm"
              >
                <svg className="w-5 h-5 text-[#8b5cf6] dark:text-[#a78bfa]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // compact variant
  // Every 3rd card is dark (bg-[#1c2a2b])
  const isDarkCard = (index + 1) % 3 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
        isDarkCard
          ? 'bg-[#1c2a2b] dark:bg-[#152021] text-white border-transparent'
          : 'bg-white dark:bg-card text-foreground border-border'
      }`}
    >
      <Link href={`/insights/${insight.slug}`} className="flex flex-col flex-1 p-6">
        {/* Cover Image Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/50 mb-5">
          {insight.coverImage ? (
            <Image
              src={insight.coverImage}
              alt={insight.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          ) : (
            <div className="w-full h-full bg-background-subtle flex items-center justify-center">
              <span className="text-foreground-muted text-xs">No cover image</span>
            </div>
          )}
        </div>

        {/* Category + read time */}
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2.5 block ${
          isDarkCard ? 'text-[#a78bfa]' : 'text-primary'
        }`}>
          {insight.category} · {insight.readTime}
        </span>

        {/* Title */}
        <h3 className={`text-xl md:text-2xl font-sans font-bold leading-snug mb-3 group-hover:text-primary transition-colors duration-300 ${
          isDarkCard ? 'text-white' : 'text-foreground'
        }`}>
          {insight.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-xs md:text-sm leading-relaxed line-clamp-2 mb-4 ${
          isDarkCard ? 'text-zinc-300' : 'text-foreground-muted dark:text-zinc-400'
        }`}>
          {insight.excerpt}
        </p>

        {/* Read article link */}
        <div className={`inline-flex items-center gap-1 text-xs font-semibold mt-auto ${
          isDarkCard ? 'text-[#a78bfa]' : 'text-primary'
        }`}>
          <span>Read article</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            className="transform group-hover:translate-x-1 transition-transform duration-300"
          >
            <path
              d="M2 6h8M6 2l4 4-4 4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
    </motion.article>
  );
}

