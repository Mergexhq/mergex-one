'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseStudySidebar } from './CaseStudySidebar';
import EmptyState from '@/components/EmptyState';
import type { CaseStudy } from '@/lib/types/content';

interface CaseStudyDetailClientProps {
  caseStudy: CaseStudy;
  related: CaseStudy[];
}


function renderBlock(block: string, i: number) {
  if (block.startsWith('## ')) {
    return (
      <h2 key={i} className="text-2xl md:text-3xl font-serif text-foreground font-semibold mt-10 mb-4 tracking-tight leading-tight">
        {block.replace('## ', '')}
      </h2>
    );
  }
  if (block.startsWith('### ')) {
    return (
      <h3 key={i} className="text-lg font-clash text-foreground font-semibold mt-8 mb-3">
        {block.replace('### ', '')}
      </h3>
    );
  }
  if (block.startsWith('---')) {
    return <hr key={i} className="border-black/5 my-8" />;
  }
  if (block.startsWith('- ')) {
    const lines = block.split('\n').filter(Boolean);
    return (
      <ul key={i} className="list-disc list-inside space-y-2.5 pl-4 text-foreground-muted text-sm md:text-base font-light">
        {lines.map((line, li) => (
          <li key={li} className="leading-relaxed">
            {line.replace('- ', '')}
          </li>
        ))}
      </ul>
    );
  }
  
  const hasBold = /\*\*(.+?)\*\*/.test(block);
  if (hasBold) {
    const parts = block.split(/\*\*(.+?)\*\*/);
    return (
      <p key={i} className="leading-relaxed text-sm md:text-base">
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
    <p key={i} className="leading-relaxed text-sm md:text-base">
      {block}
    </p>
  );
}

function Section({ id, label, content }: { id: string; label: string; content: string }) {
  const blocks = content.split('\n\n').map((b) => b.trim()).filter(Boolean);
  return (
    <section id={id} className="mb-14">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 block mb-4">
        {label}
      </span>
      <div className="space-y-5 text-foreground-muted font-light max-w-prose">
        {blocks.map(renderBlock)}
      </div>
    </section>
  );
}

export function CaseStudyDetailClient({ caseStudy, related }: CaseStudyDetailClientProps) {
  const [showMoreAI, setShowMoreAI] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Build dynamic TOC from actual sections present in this case study
  const tocSections = [
    ...(caseStudy.challenge ? [{ id: 'challenge', label: 'The Challenge' }] : []),
    ...(caseStudy.diagnosis ? [{ id: 'diagnosis', label: 'The Diagnosis' }] : []),
    ...(caseStudy.strategy  ? [{ id: 'strategy',  label: 'The Strategy'  }] : []),
    ...(caseStudy.outcome   ? [{ id: 'outcome',   label: 'The Outcome'   }] : []),
    { id: 'tldr',    label: 'The Bottom Line' },
  ];

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

  const sidebarMeta = {
    client: caseStudy.client,
    industry: caseStudy.industry,
    date: new Date(caseStudy.publishedAt).toLocaleDateString('en-GB', {
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
      {/* Floating Progress Bar */}
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
        <CaseStudySidebar mode="toc" sections={tocSections} meta={sidebarMeta} />

        {/* Right Content Workspace */}
        <div className="flex-1 min-w-0 max-w-prose lg:pl-4 pt-28">
          
          {/* Section 1: Hero Block */}
          <header className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 block mb-3">
              {caseStudy.industry}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground font-semibold tracking-tight leading-[1.1] mb-6">
              {caseStudy.title}
            </h1>
            <p className="text-foreground-muted text-lg md:text-xl font-light leading-relaxed mb-8">
              {caseStudy.excerpt}
            </p>

            {/* Metrics Dashboard row inside content pane */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-6 border-t border-b border-black/5 dark:border-white/5 py-6 my-8 transition-colors duration-500">
                {caseStudy.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span className="text-2xl md:text-4xl font-bold font-serif text-foreground tracking-tight leading-none mb-2">
                      {m.value}
                    </span>
                    <span className="text-[10px] md:text-xs text-foreground-muted uppercase tracking-wider font-medium leading-tight">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </header>

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
              <p>{caseStudy.aiOverview}</p>
              
              <AnimatePresence>
                {showMoreAI && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-4 border-t border-violet-500/5 mt-4 space-y-4 overflow-hidden"
                  >
                    <p className="font-semibold text-foreground text-xs uppercase tracking-widest">Key takeaways & metrics:</p>
                    <ul className="space-y-3">
                      {caseStudy.tags.map((tag, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-foreground-muted">
                          <span className="text-violet-500 mt-1">•</span>
                          <span>Strategic execution of <strong>{tag}</strong> enabled margin optimization and operational recovery.</span>
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

          {/* Section 3: Premium Editorial Content Blocks */}
          <div className="prose-custom">
            <Section id="challenge" label="The Challenge" content={caseStudy.challenge} />
            <Section id="diagnosis" label="The Diagnosis" content={caseStudy.diagnosis} />
            <Section id="strategy" label="The Strategy" content={caseStudy.strategy} />
            <Section id="outcome" label="The Outcome" content={caseStudy.outcome} />
          </div>

          {/* Client note Blockquote */}
          {caseStudy.clientNote && (
            <blockquote className="border-y border-black/5 dark:border-white/5 py-10 my-14 text-center max-w-prose transition-colors duration-500">
              <p className="font-serif italic text-lg md:text-xl text-foreground leading-relaxed max-w-2xl mx-auto">
                &ldquo;{caseStudy.clientNote}&rdquo;
              </p>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground-muted mt-4 block">
                - Client, {caseStudy.industry}
              </span>
            </blockquote>
          )}

          {/* Section 4: The Bottom Line Summary Block */}
          <section id="tldr" className="rounded-[24px] bg-bg-tertiary border border-black/5 dark:border-white/5 p-8 my-16 max-w-prose transition-colors duration-500">
            <h3 className="font-serif text-2xl text-foreground font-semibold mb-4">
              The Bottom Line
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-violet-600/10 dark:bg-violet-600/20 flex items-center justify-center text-violet-700 dark:text-violet-300 font-bold text-xs mt-1 shrink-0 transition-colors duration-500">✓</span>
                <span className="text-foreground-muted text-sm md:text-base font-light leading-relaxed">
                  Diagnosed systemic friction across offer structuring, delivery capacity, and data visibility within 14 days.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-violet-600/10 dark:bg-violet-600/20 flex items-center justify-center text-violet-700 dark:text-violet-300 font-bold text-xs mt-1 shrink-0 transition-colors duration-500">✓</span>
                <span className="text-foreground-muted text-sm md:text-base font-light leading-relaxed">
                  Constructed weekly reporting layers tracing cohort retention, CAC/LTV, SKU margins, and fulfillment overhead.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-violet-600/10 dark:bg-violet-600/20 flex items-center justify-center text-violet-700 dark:text-violet-300 font-bold text-xs mt-1 shrink-0 transition-colors duration-500">✓</span>
                <span className="text-foreground-muted text-sm md:text-base font-light leading-relaxed">
                  Drove substantial margin improvements, compressed sales cycle latency, and drops client churn.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 5: Related Case Studies Grid */}
          <section id="related" className="mt-20 pt-12 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
            <div className="flex items-center gap-4 mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted">
                Related Work
              </p>
              <div className="h-px flex-1 bg-black/5 dark:bg-white/5 transition-colors duration-500" />
            </div>
            
            {related.length === 0 ? (
              <EmptyState
                headline="More case studies coming soon"
                subtext="We are adding more work to this section. Check back soon."
                ctaLabel="View all case studies"
                ctaHref="/insights/case-studies"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/insights/case-studies/${r.slug}`}
                    className="group rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#1a1a1a] p-6 shadow-sm hover:shadow-md dark:shadow-[0_2px_12px_rgba(0,0,0,0.15)] transition-all duration-500"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-violet-600 block mb-2">
                      {r.industry}
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
