'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { ArrowLeft } from 'lucide-react';

const INDUSTRIES = ['All', 'Retail / E-commerce', 'Technology / SaaS', 'Professional Services', 'D2C'];

interface CaseStudySidebarProps {
  mode?: 'filter' | 'toc';
  activeIndustry?: string;
  sections?: { id: string; label: string }[];
  meta?: {
    client: string;
    industry: string;
    date: string;
  };
}

export function CaseStudySidebar({
  mode = 'filter',
  activeIndustry = 'All',
  sections = [],
  meta,
}: CaseStudySidebarProps) {
  usePathname();
  const [activeId, setActiveId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // IntersectionObserver for scroll-spy TOC
  useEffect(() => {
    if (mode !== 'toc' || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [sections, mode]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const handleShareX = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(`https://x.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }, []);

  const handleShareLinkedIn = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }, []);

  const isToc = mode === 'toc';

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 overflow-hidden transition-all duration-500 ${
          isToc
            ? 'w-[290px] sticky top-2 h-[calc(100vh-16px)] bg-[#080808] dark:bg-[#080808] rounded-xl border border-white/8 dark:border-white/10 shadow-none'
            : 'w-[290px] sticky top-0 self-start h-[calc(100vh-0)] overflow-hidden bg-[#080808] dark:bg-[#080808]'
        }`}
      >
        {/* Purple glow top-left */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-violet-600/25 blur-[100px] rounded-full pointer-events-none z-0" />
        {/* Purple glow bottom-right */}
        <div className="absolute -bottom-24 -right-8 w-56 h-56 bg-violet-600/20 blur-[90px] rounded-full pointer-events-none z-0" />

        {/* ── Logo ── */}
        <div className="relative z-10 px-5 pt-5 pb-4 border-b border-white/8">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo/mergex-logo.png"
              alt="MergeX Logo"
              width={44}
              height={44}
              className="brightness-0 invert object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className="font-clash font-bold text-base tracking-wider text-white"
            >
              MERGEX
            </span>
          </Link>
        </div>

        {/* ── Horizontal meta row (TOC mode only) ── */}
        {isToc && meta && (
          <div className="relative z-10 px-5 py-3.5 border-b border-white/8 flex items-center gap-5">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/20 mb-0.5">Industry</p>
              <p className="text-[11px] text-white/50">{meta.industry ?? 'Consulting'}</p>
            </div>
            <div className="w-px h-6 bg-white/8 shrink-0" />
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/20 mb-0.5">Published</p>
              <p className="text-[11px] text-white/50">{meta.date}</p>
            </div>
          </div>
        )}

        {/* ── Nav items ── */}
        <nav className="relative z-10 flex-1 overflow-y-auto px-6 py-6">
          {!isToc ? (
            <>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/25 px-2 mb-4">
                Industry
              </p>
              {INDUSTRIES.map((ind) => {
                const isActive = activeIndustry === ind;
                const href =
                  ind === 'All'
                    ? '/insights/case-studies'
                    : `/insights/case-studies?industry=${encodeURIComponent(ind)}`;
                return (
                  <Link
                    key={ind}
                    href={href}
                    className={`group flex items-start gap-3 w-full px-3 py-3 rounded-xl transition-all duration-200 ${
                      isActive ? 'bg-white/8' : 'hover:bg-white/5'
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isActive
                          ? 'border-violet-400 bg-violet-500'
                          : 'border-white/20 bg-transparent'
                      }`}
                    >
                      {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold leading-tight ${
                          isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'
                        }`}
                      >
                        {ind}
                      </p>
                      <p className="text-[11px] text-white/25 mt-0.5 leading-tight">
                        {ind === 'All' ? 'All industries' : `${ind} cases`}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </>
          ) : (
            <div className="flex flex-col justify-center min-h-full">
              {/* Section label */}
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 mb-5">
                On This Page
              </p>

              {/* Items */}
              <div className="space-y-1">
                {sections.map((section) => {
                  const isActive = activeId === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`group flex items-center gap-3 w-full py-3 px-3 rounded-md transition-all duration-300 ${
                        isActive ? 'bg-white/6' : 'hover:bg-white/4'
                      }`}
                    >
                      {/* Active bar indicator */}
                      <span
                        className={`w-[2px] h-4 rounded-full shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'bg-violet-400'
                            : 'bg-white/12 group-hover:bg-white/25'
                        }`}
                      />
                      <span
                        className={`text-xs leading-snug transition-colors duration-300 ${
                          isActive
                            ? 'text-white font-medium'
                            : 'text-white/40 group-hover:text-white/70'
                        }`}
                      >
                        {section.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </nav>


        {/* ── Share + Meta + Footer (TOC mode only) ── */}
        {isToc ? (
          <div className="relative z-10 border-t border-white/8">

            {/* Share row */}
            <div className="px-5 py-4 border-b border-white/8">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/25 mb-3">
                Share
              </p>
              <div className="flex items-center gap-2">
                {/* Copy link */}
                <button
                  onClick={handleCopyLink}
                  title="Copy link"
                  className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 flex items-center justify-center transition-all duration-200 group"
                >
                  {copied ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-violet-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 group-hover:text-white/70">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                    </svg>
                  )}
                </button>
                {/* Email */}
                <button
                  onClick={() => {
                    const subject = encodeURIComponent(document.title);
                    const body = encodeURIComponent(window.location.href);
                    window.open(`mailto:?subject=${subject}&body=${body}`);
                  }}
                  title="Share via email"
                  className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 flex items-center justify-center transition-all duration-200 group"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 group-hover:text-white/70">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
                {/* X / Twitter */}
                <button
                  onClick={handleShareX}
                  title="Share on X"
                  className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 flex items-center justify-center transition-all duration-200 group"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/40 group-hover:text-white/70">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                {/* LinkedIn */}
                <button
                  onClick={handleShareLinkedIn}
                  title="Share on LinkedIn"
                  className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 flex items-center justify-center transition-all duration-200 group"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/40 group-hover:text-white/70">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
            </div>



            {/* Back + Theme toggle */}
            <div className="px-5 py-4 flex items-center justify-between">
              <Link
                href="/insights/case-studies"
                className="flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/65 transition-colors duration-200"
              >
                <ArrowLeft size={11} />
                Back to Case Studies
              </Link>
              <AnimatedThemeToggler />
            </div>
          </div>
        ) : (
          /* Filter mode footer */
          <div className="relative z-10 px-5 py-4 border-t border-white/8 flex items-center justify-between">
            <Link
              href="/insights/case-studies"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
            >
              <ArrowLeft size={13} />
              Back to Case Studies
            </Link>
          </div>
        )}
      </aside>

      {/* ── Mobile: horizontal pills (filter mode only) ── */}
      {mode === 'filter' && (
        <div className="lg:hidden flex gap-2 flex-wrap mb-8">
          {INDUSTRIES.map((ind) => {
            const isActive = activeIndustry === ind;
            const href =
              ind === 'All'
                ? '/insights/case-studies'
                : `/insights/case-studies?industry=${encodeURIComponent(ind)}`;
            return (
              <Link
                key={ind}
                href={href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-text-primary text-bg-primary'
                    : 'bg-background-subtle text-foreground-muted hover:text-foreground'
                }`}
              >
                {ind}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
