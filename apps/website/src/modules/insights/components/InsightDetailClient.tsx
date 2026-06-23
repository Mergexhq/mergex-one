'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { InsightSidebar } from './InsightSidebar';
import EmptyState from '@/components/EmptyState';
import type { Insight } from '@/lib/types/content';

interface InsightDetailClientProps {
  insight: Insight;
  related: Insight[];
}

/** Trim long headings at the first connector word to keep sidebar labels short */
function shortenLabel(heading: string): string {
  const MAX = 22;
  if (heading.length <= MAX) return heading;

  // Split at the first connector word (case-insensitive)
  const connectors = /\b(with|of|and|for|that|in|to|on|or|by|about|from|using|through|across|into|between|before|after)\b/i;
  const match = heading.search(connectors);
  if (match > 4) {
    return heading.slice(0, match).replace(/[,\s]+$/, '');
  }

  // Fallback: cut at last word boundary before MAX chars
  const cut = heading.slice(0, MAX).lastIndexOf(' ');
  return cut > 0 ? heading.slice(0, cut) : heading.slice(0, MAX);
}

/** Extract H2/H3 headings from markdown body to build a dynamic per-article TOC */
function extractSections(body: string): { id: string; label: string }[] {
  const lines = body.split('\n');
  const sections: { id: string; label: string }[] = [];


  lines.forEach((line) => {
    const h2 = line.match(/^##\s+(.+)/);
    const h3 = line.match(/^###\s+(.+)/);
    const heading = h2?.[1] ?? h3?.[1];
    if (heading) {
      const id = heading
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      sections.push({ id, label: shortenLabel(heading) });
    }
  });

  // Fixed closing anchor
  sections.push({ id: 'tldr', label: 'The Bottom Line' });

  return sections;
}


/** Mobile-only share + meta block shown after The Bottom Line */
function MobileShare({ readTime, date }: { readTime: string; date: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const shareX = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://x.com/intent/tweet?url=${url}&text=${encodeURIComponent(document.title)}`, '_blank');
  };
  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };
  const shareEmail = () => {
    const subject = encodeURIComponent(document.title);
    const body = encodeURIComponent(window.location.href);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div className="lg:hidden border border-black/5 dark:border-white/8 rounded-2xl p-5 my-8 max-w-prose bg-bg-secondary transition-colors duration-500">
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground-muted/50 mb-4">Share this article</p>
      <div className="flex items-center gap-2">
        {/* Copy link */}
        <button onClick={copyLink} title="Copy link"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 text-[11px] font-medium text-foreground-muted hover:text-foreground transition-all duration-200">
          {copied ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-violet-500 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
          )}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        {/* Email */}
        <button onClick={shareEmail} title="Email"
          className="w-9 h-9 rounded-lg bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 flex items-center justify-center text-foreground-muted hover:text-foreground transition-all duration-200">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
        {/* X */}
        <button onClick={shareX} title="Share on X"
          className="w-9 h-9 rounded-lg bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 flex items-center justify-center text-foreground-muted hover:text-foreground transition-all duration-200">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        {/* LinkedIn */}
        <button onClick={shareLinkedIn} title="Share on LinkedIn"
          className="w-9 h-9 rounded-lg bg-white dark:bg-white/5 border border-black/8 dark:border-white/8 flex items-center justify-center text-foreground-muted hover:text-foreground transition-all duration-200">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function InsightDetailClient({ insight, related }: InsightDetailClientProps) {
  const [showMoreAI, setShowMoreAI] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const tocSections = extractSections(insight.body);

  // Local theme setup (only for detailed page experience)
  useEffect(() => {
    const savedTheme = localStorage.getItem('mergex-detail-theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    return () => {
      // Remove dark class when navigating away from this detailed page
      document.documentElement.classList.remove('dark');
    };
  }, []);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.round((window.scrollY / totalHeight) * 100));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bodyParagraphs = insight.body
    .split('\n\n')
    .map((block) => block.trim())
    .filter(Boolean);

  const sidebarMeta = {
    readTime: insight.readTime,
    category: insight.category,
    date: new Date(insight.publishedAt).toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric',
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-transparent text-foreground transition-colors duration-500"
    >
      {/* Floating Progress Bar on Right */}
      <div className="fixed right-8 bottom-8 hidden xl:flex items-center justify-center z-30 w-12 h-12 bg-white dark:bg-[#1a1a1a] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-colors duration-500">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            className="stroke-black/5 dark:stroke-white/5 transition-colors duration-500"
            strokeWidth="2"
          />
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            className="stroke-violet-600 transition-all duration-150 ease-out"
            strokeWidth="2"
            strokeDasharray={138.23}
            strokeDashoffset={138.23 - (scrollProgress / 100) * 138.23}
            strokeLinecap="round"
          />
        </svg>
        <span className="relative text-[10px] font-bold text-foreground">
          {scrollProgress}%
        </span>
      </div>

      <div className="w-full p-2 md:py-2 md:pr-12 md:pl-2 flex flex-col lg:flex-row gap-12 items-start relative">
        {/* Floating sticky Left Sidebar Rail */}
        <InsightSidebar mode="toc" sections={tocSections} meta={sidebarMeta} />

        {/* Right Content Workspace */}
        <div className="flex-1 min-w-0 max-w-prose lg:pl-4 pt-28">
          
          {/* Section 1: Hero Block */}
          <header className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 block mb-3">
              {insight.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground font-semibold tracking-tight leading-[1.1] mb-6">
              {insight.title}
            </h1>
            <p className="text-foreground-muted text-lg md:text-xl font-light leading-relaxed mb-8">
              {insight.excerpt}
            </p>
            
            {/* Author info & Read time row */}
            <div className="flex items-center gap-3 border-t border-black/5 dark:border-white/5 pt-4 transition-colors duration-500">
              <div className="w-9 h-9 rounded-full bg-violet-600/10 dark:bg-violet-600/20 flex items-center justify-center text-violet-700 dark:text-violet-300 font-bold text-xs transition-colors duration-500">
                {insight.category.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Manikandan S</p>
                <p className="text-xs text-foreground-muted">Principal Consultant</p>
              </div>
            </div>

            {/* Mobile-only: Reading Time + Published meta bar */}
            <div className="lg:hidden flex items-center gap-5 border-b border-black/5 dark:border-white/5 py-4 mb-10 transition-colors duration-500">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-foreground-muted/60 mb-0.5">Reading Time</p>
                <p className="text-xs text-foreground-muted">{insight.readTime}</p>
              </div>
              <div className="w-px h-5 bg-black/8 dark:bg-white/8 shrink-0" />
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-foreground-muted/60 mb-0.5">Published</p>
                <p className="text-xs text-foreground-muted">{sidebarMeta.date}</p>
              </div>
            </div>
          </header>

          {/* Hero Cover Image */}
          {insight.coverImage && (
            <div className="relative w-full h-[280px] md:h-[400px] rounded-[24px] overflow-hidden mb-12 shadow-sm">
              <Image
                src={insight.coverImage}
                alt={insight.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          )}

          {/* Section 2: Google AI Overview Block */}
          <section id="overview" className="rounded-[24px] bg-brand-50 dark:bg-brand-900/20 border border-violet-500/10 dark:border-violet-500/20 p-6 md:p-8 mb-12 relative overflow-hidden transition-colors duration-500">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/5 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-2.5 mb-4 relative z-10">
              <div className="w-6 h-6 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-600 text-sm">
                ✨
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-violet-700 dark:text-violet-400">
                AI Overview
              </span>
            </div>

            <div className="text-foreground text-sm md:text-base leading-relaxed space-y-4 font-light relative z-10">
              <p>{insight.aiOverview}</p>
              
              <AnimatePresence>
                {showMoreAI && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-4 border-t border-violet-500/5 mt-4 space-y-4 overflow-hidden"
                  >
                    <p className="font-semibold text-foreground text-xs uppercase tracking-widest">Key Takeaways:</p>
                    <ul className="space-y-3">
                      {insight.tags.map((tag, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-foreground-muted">
                          <span className="text-violet-500 mt-1">•</span>
                          <span>Optimizing our approach to <strong>{tag}</strong> is essential to resolve scaling bottlenecks.</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setShowMoreAI(!showMoreAI)}
              className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-violet-700 dark:text-violet-400 hover:text-violet-900 dark:hover:text-violet-300 transition-colors cursor-pointer relative z-10"
            >
              {showMoreAI ? 'Show Less' : 'Show More'}
              <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${showMoreAI ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            
            <p className="text-[9px] text-foreground-muted/40 mt-4 text-right">
              Generated from this research document
            </p>
          </section>

          {/* Section 3: Premium Editorial Content */}
          <article id="content" className="prose-custom max-w-prose text-foreground-muted text-sm md:text-base leading-relaxed space-y-6 font-light">
            {bodyParagraphs.map((block, i) => {
              if (block.startsWith('## ')) {
                const heading = block.replace('## ', '');
                const id = heading.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
                return (
                  <h2 key={i} id={id} className="text-2xl md:text-3xl font-serif text-foreground font-semibold mt-12 mb-5 tracking-tight leading-tight">
                    {heading}
                  </h2>
                );
              }
              if (block.startsWith('### ')) {
                const heading = block.replace('### ', '');
                const id = heading.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
                return (
                  <h3 key={i} id={id} className="text-lg md:text-xl font-clash text-foreground font-semibold mt-8 mb-4">
                    {heading}
                  </h3>
                );
              }
              if (block.startsWith('---')) {
                return <hr key={i} className="border-black/5 dark:border-white/5 my-10 transition-colors duration-500" />;
              }
              if (block.startsWith('**') && block.endsWith('**')) {
                return (
                  <p key={i} className="text-foreground font-semibold text-base leading-relaxed">
                    {block.replace(/\*\*/g, '')}
                  </p>
                );
              }
              if (block.startsWith('> ')) {
                return (
                  <blockquote key={i} className="border-y border-black/5 dark:border-white/5 py-8 my-10 text-center transition-colors duration-500">
                    <p className="font-serif italic text-lg md:text-xl text-foreground leading-relaxed max-w-2xl mx-auto">
                      &ldquo;{block.replace('> ', '')}&rdquo;
                    </p>
                  </blockquote>
                );
              }
              if (/^\d+\.\s/.test(block)) {
                const lines = block.split('\n').filter(Boolean);
                return (
                  <ol key={i} className="list-decimal list-inside space-y-3 pl-4 text-foreground-muted text-sm md:text-base font-light">
                    {lines.map((line, li) => (
                      <li key={li} className="leading-relaxed">
                        {line.replace(/^\d+\.\s/, '')}
                      </li>
                    ))}
                  </ol>
                );
              }
              if (block.startsWith('- ')) {
                const lines = block.split('\n').filter(Boolean);
                return (
                  <ul key={i} className="list-disc list-inside space-y-3 pl-4 text-foreground-muted text-sm md:text-base font-light">
                    {lines.map((line, li) => (
                      <li key={li} className="leading-relaxed">
                        {line.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              
              // Handle mid-paragraph bolding
              const hasBold = /\*\*(.+?)\*\*/.test(block);
              if (hasBold) {
                const parts = block.split(/\*\*(.+?)\*\*/);
                return (
                  <p key={i} className="leading-relaxed">
                    {parts.map((part, pi) =>
                      pi % 2 === 1 ? (
                        <strong key={pi} className="text-foreground font-semibold">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              
              return (
                <p key={i} className="leading-relaxed">
                  {block}
                </p>
              );
            })}
          </article>

          {/* Section 4: The Bottom Line Summary Block */}
          <section id="tldr" className="rounded-[24px] bg-bg-tertiary border border-black/5 dark:border-white/5 p-8 my-16 max-w-prose transition-colors duration-500">
            <h3 className="font-serif text-2xl text-foreground font-semibold mb-4">
              The Bottom Line
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-violet-600/10 dark:bg-violet-600/20 flex items-center justify-center text-violet-700 dark:text-violet-300 font-bold text-xs mt-1 shrink-0 transition-colors duration-500">✓</span>
                <span className="text-foreground-muted text-sm md:text-base font-light leading-relaxed">
                  Execution without diagnostic clarity is organized noise. Map constraints before planning solutions.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-violet-600/10 dark:bg-violet-600/20 flex items-center justify-center text-violet-700 dark:text-violet-300 font-bold text-xs mt-1 shrink-0 transition-colors duration-500">✓</span>
                <span className="text-foreground-muted text-sm md:text-base font-light leading-relaxed">
                  Every business system has one primary bottleneck limiting capacity. Address this first.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-violet-600/10 dark:bg-violet-600/20 flex items-center justify-center text-violet-700 dark:text-violet-300 font-bold text-xs mt-1 shrink-0 transition-colors duration-500">✓</span>
                <span className="text-foreground-muted text-sm md:text-base font-light leading-relaxed">
                  MergeX audits five core operational layers: Revenue, Sales, Delivery, Data Infrastructure, and Leadership Clarity.
                </span>
              </li>
            </ul>
          </section>

          {/* Mobile-only: Share row after The Bottom Line */}
          <MobileShare readTime={insight.readTime} date={sidebarMeta.date} />

          {/* Section 5: Related Insights Grid */}
          <section id="related" className="mt-20 pt-12 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
            <div className="flex items-center gap-4 mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted">
                Related Research
              </p>
              <div className="h-px flex-1 bg-black/5 dark:bg-white/5 transition-colors duration-500" />
            </div>
            
            {related.length === 0 ? (
              <EmptyState
                headline="More coming soon"
                subtext="We are working on more insights in this category."
                ctaLabel="View all insights"
                ctaHref="/insights"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/insights/${r.slug}`}
                    className="group rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#1a1a1a] p-6 shadow-sm hover:shadow-md dark:shadow-[0_2px_12px_rgba(0,0,0,0.15)] transition-all duration-500"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-violet-600 block mb-2">
                      {r.category}
                    </span>
                    <h4 className="text-lg font-serif text-foreground font-semibold leading-snug group-hover:text-violet-600 transition-colors mb-2">
                      {r.title}
                    </h4>
                    <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2 font-light">
                      {r.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
    </motion.div>
  );
}
