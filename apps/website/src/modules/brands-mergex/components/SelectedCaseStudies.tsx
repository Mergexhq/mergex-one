'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { CASE_STUDIES } from '@/lib/data/case-studies';

export function SelectedCaseStudies() {
  const targetRef = useRef<HTMLDivElement>(null);
  const featured = CASE_STUDIES.slice(0, 3);

  // ── Measure viewport width for pixel-accurate framer motion ──────────
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // ── Horizontal scroll: card 1 → 2 → 3 ───────────────────────────────
  // height 300vh → scroll range 200vh → ~100vh per card transition
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // ── Hide navbar only while actively scrolling through this section ────
  // scrollYProgress: 0 = section top at viewport top, 1 = section bottom
  // We hide the navbar only between those two bounds (not when approaching).
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const inSection = latest > 0.001 && latest < 0.999;
    window.dispatchEvent(
      new CustomEvent('mergex:toggle-navbar', { detail: { hidden: inSection } })
    );
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, windowWidth ? -windowWidth * 2 : 0]
  );

  const images = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop',
  ];

  const isMobile = windowWidth > 0 && windowWidth < 768;

  // Horizontal gap between viewport edge and card edge
  const CARD_GAP = isMobile ? 24 : 48;

  return (
    <div ref={targetRef} style={{ height: '300vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: 'var(--color-background)',
        }}
      >
        {/* ── Header ───────────────────────────────────────────────── */}
        <div
          style={{
            width: '100%',
            padding: isMobile ? '24px 24px 16px 24px' : '36px 48px 20px 48px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            justifyContent: 'space-between',
            gap: isMobile ? '16px' : '0px',
            flexShrink: 0,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                fontSize: isMobile ? '24px' : 'clamp(26px, 3vw, 40px)',
                fontWeight: 500,
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
                color: 'var(--color-foreground)',
                marginBottom: isMobile ? '8px' : '18px',
              }}
            >
              Scale improves when
              <br />
              the right problem gets solved.
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-foreground-muted)',
                lineHeight: 1.6,
              }}
            >
              A selection of structural, operational, and growth interventions across different businesses.
            </p>
          </div>
          <Link
            href="/insights/case-studies"
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-background)',
              background: 'var(--color-foreground)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 28px',
              borderRadius: '8px',
              transition: 'opacity 0.2s',
              flexShrink: 0,
              marginLeft: isMobile ? '0px' : '32px',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Explore insights
          </Link>
        </div>

        {/* ── Horizontal track ─────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              x,
              display: 'flex',
              height: '100%',
              width: windowWidth ? `${windowWidth * 3}px` : '300vw',
              willChange: 'transform',
            }}
          >
            {featured.map((cs, i) => (
              <div
                key={cs.slug}
                style={{
                  // Each slot is exactly one viewport width - DO NOT add
                  // horizontal padding here or it overflows the slot and
                  // the right-side padding gets clipped by overflow:hidden.
                  width: windowWidth ? `${windowWidth}px` : '100vw',
                  flex: '0 0 auto',
                  height: '100%',
                  // Only bottom spacing lives on the slot
                  paddingBottom: '28px',
                }}
              >
                {/*
                  Inner wrapper carries the horizontal gap so the card
                  is inset from BOTH edges - fully within the slot width.
                */}
                <div
                  style={{
                    height: '100%',
                    paddingLeft: `${CARD_GAP}px`,
                    paddingRight: `${CARD_GAP}px`,
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Card */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: '12px',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Background image + gradient */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${images[i]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 55%)',
                        }}
                      />
                    </div>

                    {/* Card content */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: isMobile ? '24px 20px' : '48px 52px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        zIndex: 2,
                      }}
                    >
                      <div style={{ maxWidth: isMobile ? '78%' : '72%' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            background: '#FFFFFF',
                            color: '#000000',
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '5px 10px',
                            borderRadius: '20px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: isMobile ? '8px' : '14px',
                          }}
                        >
                          {cs.industry}
                        </span>

                        <h3
                          style={{
                            color: '#FFFFFF',
                            fontSize: isMobile ? '20px' : 'clamp(26px, 2.6vw, 36px)',
                            fontWeight: 400,
                            marginBottom: isMobile ? '8px' : '12px',
                            fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                            letterSpacing: '-0.01em',
                            lineHeight: 1.15,
                          }}
                        >
                          {cs.title}
                        </h3>

                        <p
                          style={{
                            color: 'rgba(255,255,255,0.72)',
                            fontSize: isMobile ? '12px' : '15px',
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {cs.excerpt}
                        </p>
                      </div>

                      {/* Arrow button - solid white circle */}
                      <Link
                        href={`/insights/case-studies/${cs.slug}`}
                        style={{
                          width: isMobile ? '40px' : '52px',
                          height: isMobile ? '40px' : '52px',
                          borderRadius: '50%',
                          background: '#FFFFFF',
                          color: '#121212',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none',
                          flexShrink: 0,
                          transition: 'transform 0.25s ease, background 0.25s ease',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
                          e.currentTarget.style.background = '#f0f0f0';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                          e.currentTarget.style.background = '#FFFFFF';
                        }}
                      >
                        <svg
                          width={isMobile ? "16" : "20"}
                          height={isMobile ? "16" : "20"}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
