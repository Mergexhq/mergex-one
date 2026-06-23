'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './HomeHero.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HomeHero() {
  const wrapperRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  // Staggered fade-in for text elements on mount
  useEffect(() => {
    const items = wrapperRef.current?.querySelectorAll('.hh-animate');
    items?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${0.2 + i * 0.18}s`;
    });
  }, []);

  // ── GSAP ScrollTrigger – cinematic pin + transition ──
  useGSAP(
    () => {
      if (!wrapperRef.current || !heroRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=200%',
          pin: heroRef.current,
          scrub: true,
          anticipatePin: 1,
        },
      });

      // ── STAGE 1 (0% → 20%) — Immersive hero. Nothing animates. ──
      tl.to({}, { duration: 0.2 });

      // ── STAGE 2 (20% → 50%) — Text fades sequentially: eyebrow → heading → description ──

      // Eyebrow goes first
      tl.to(
        eyebrowRef.current,
        {
          y: -30,
          opacity: 0,
          duration: 0.08,
          ease: 'none',
        },
        0.2
      );

      // Heading follows
      tl.to(
        headingRef.current,
        {
          y: -40,
          opacity: 0,
          duration: 0.1,
          ease: 'none',
        },
        0.24
      );

      // Description last
      tl.to(
        subRef.current,
        {
          y: -30,
          opacity: 0,
          duration: 0.08,
          ease: 'none',
        },
        0.28
      );

      // Hero container scales down subtly + border radius
      tl.to(
        heroRef.current,
        {
          scaleX: 0.988,
          scaleY: 0.98,
          borderRadius: '20px',
          duration: 0.6,
          ease: 'none',
        },
        0.2
      );

      // Overlay darkens
      tl.to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: 'none',
        },
        0.2
      );

      // ── STAGE 3 (50% → 80%) — About section emerges ──
      tl.fromTo(
        aboutRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'none',
        },
        0.5
      );

      // ── STAGE 4 (80% → 100%) — Pin holds, about fully visible ──
      tl.to({}, { duration: 0.2 });
    },
    { scope: wrapperRef }
  );

  return (
    <section ref={wrapperRef} className="home-hero-scroll-wrapper">
      {/* ── PINNED HERO LAYER ── */}
      <div ref={heroRef} className="home-hero">
        {/* Scroll-driven dark overlay */}
        <div ref={overlayRef} className="hh-overlay" />

        {/* ── HERO CONTENT ── */}
        <div className="hh-content">
          <div className="hh-top-content">
            {/* Ref on wrapper div — NOT on the .hh-animate element.
                CSS animation fill-mode:both overrides GSAP inline styles,
                so we animate the parent and let .hh-animate live on the child. */}
            <div ref={eyebrowRef}>
              <p className="hh-eyebrow hh-animate">SCALING INFRASTRUCTURE COMPANY</p>
            </div>

            <h1 ref={headingRef} className="hh-heading">
              <span className="hh-heading-line hh-animate">Scale is not luck.</span>
              <span className="hh-heading-accent hh-animate">It&apos;s structure.</span>
            </h1>
          </div>

          <div ref={subRef}>
            <p className="hh-sub hh-animate">
              Infrastructure for businesses that intend to scale deliberately,<br />
              with systems built to reduce friction and support scalable execution.
            </p>
          </div>
        </div>

        {/* ── ABOUT SECTION (inside pinned layer) ── */}
        <section ref={aboutRef} className="about-section">
          <div className="about-inner">
            {/* Left Column */}
            <div className="about-left">
              <p className="about-eyebrow">Who We Are</p>
              <h2 className="about-statement">
                Scaling becomes predictable<br />
                when the structure is right.
              </h2>
            </div>
            {/* Right Column */}
            <div className="about-right">
              <p className="about-body">
                The MergeX Company builds operational, creative, and educational systems designed to support scalable modern businesses.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-linear-to-b from-violet-400 to-violet-900 hover:opacity-95 text-white self-end"
                style={{
                  color: '#FFFFFF',
                }}
              >
                <span>How We Think</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transform group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
