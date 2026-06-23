'use client';

import React, { useRef, Fragment } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LETTERS = [
  {
    id: 'S',
    name: 'Scan',
    desc: 'Map the full business system - revenue, sales motion, operations, and leadership capacity.',
    direction: 'bottom' as const,
  },
  {
    id: 'C',
    name: 'Compress',
    desc: 'Identify the single root constraint holding everything else back.',
    direction: 'top' as const,
  },
  {
    id: 'A',
    name: 'Architect',
    desc: 'Design the precise operational system needed to resolve the constraint.',
    direction: 'bottom' as const,
  },
  {
    id: 'L',
    name: 'Launch',
    desc: 'Execute against the blueprint - sequenced, intentional, and measured.',
    direction: 'top' as const,
  },
  {
    id: 'E',
    name: 'Embed',
    desc: 'Transfer full system ownership to the founder and their team.',
    direction: 'bottom' as const,
  },
];

export function ScaleMethodology() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Initial state
      gsap.set('.scale-annotation-line', { scaleY: 0, opacity: 0 });
      gsap.set('.scale-annotation-dot', { scale: 0, opacity: 0 });
      gsap.set('.scale-annotation-text', { opacity: 0, y: 8 });
      gsap.set('.scale-cta-container', { opacity: 0, y: 20, pointerEvents: 'none' });

      // Step through each letter
      LETTERS.forEach((letter, i) => {
        const wrapperEl = `.scale-annotation-${letter.id}`;
        const lineEl = `${wrapperEl} .scale-annotation-line`;
        const dotEl = `${wrapperEl} .scale-annotation-dot`;
        const textEl = `${wrapperEl} .scale-annotation-text`;
        const letterEl = `.scale-big-letter-${letter.id}`;

        // Activate letter + annotation
        tl.to(
          letterEl,
          { opacity: 1, duration: 0.5, ease: 'power2.out' },
          `activate${i}`
        );
        tl.to(
          lineEl,
          { scaleY: 1, opacity: 0.35, duration: 0.8, ease: 'expo.out' },
          `activate${i}`
        );
        tl.to(
          dotEl,
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
          `activate${i}+=0.2`
        );
        tl.to(
          textEl,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          `activate${i}+=0.3`
        );

        // Hold
        tl.to({}, { duration: 1.5 });

        // Deactivate (except last)
        if (i < LETTERS.length - 1) {
          tl.to(
            letterEl,
            { opacity: 0.15, duration: 0.5, ease: 'power2.inOut' },
            `deactivate${i}`
          );
          tl.to(
            [lineEl, dotEl, textEl],
            { opacity: 0, duration: 0.5, ease: 'power2.inOut' },
            `deactivate${i}`
          );
        }
      });

      // Final - all letters full opacity, CTA appears
      tl.to(
        '.scale-big-letter',
        { opacity: 1, duration: 1, ease: 'power2.inOut' },
        'final'
      );
      tl.to(
        '.scale-cta-container',
        { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1.5, ease: 'power2.out' },
        'final+=0.5'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background"
      style={{ fontFamily: 'var(--font-manrope, sans-serif)' }}
    >
      {/* Pinned sticky viewport */}
      <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-background">



        {/* Section label - top left */}
        <div className="absolute top-8 left-6 md:top-14 md:left-14 z-20">
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-foreground-muted)',
            }}
          >
            Section 02 - The S.C.A.L.E. Methodology
          </p>
        </div>

        {/* Stage counter - top right, updates via CSS */}
        <div className="absolute top-8 right-6 md:top-14 md:right-14 z-20">
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-foreground-muted)',
            }}
          >
            Scroll to reveal
          </p>
        </div>

        {/* Giant S.C.A.L.E centrepiece */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className="flex items-baseline justify-center px-4"
            style={{
              gap: 'clamp(8px, 2vw, 32px)',
              fontSize: 'clamp(80px, 16vw, 220px)',
              lineHeight: 1,
              fontFamily: 'var(--font-playfair-display, Georgia, serif)',
              fontWeight: 400,
              color: 'var(--color-foreground)',
            }}
          >
            {LETTERS.map((item, index) => (
              <Fragment key={item.id}>
                {/* Letter + annotation wrapper */}
                <div className="relative flex flex-col items-center">

                  {/* TOP annotation (C and L) */}
                  {item.direction === 'top' && (
                    <div
                      className={`absolute bottom-full flex flex-col items-center scale-annotation-${item.id}`}
                      style={{ marginBottom: '8px' }}
                    >
                      {/* Text */}
                      <div
                        className="scale-annotation-text text-center"
                        style={{
                          marginBottom: '8px',
                          width: 'clamp(80px, 10vw, 160px)',
                        }}
                      >
                        <p
                          style={{
                            fontSize: 'clamp(9px, 0.9vw, 13px)',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--color-foreground)',
                            fontFamily: 'var(--font-manrope, sans-serif)',
                            marginBottom: '4px',
                          }}
                        >
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontSize: 'clamp(8px, 0.75vw, 11px)',
                            color: 'var(--color-foreground-muted)',
                            lineHeight: 1.5,
                            fontFamily: 'var(--font-manrope, sans-serif)',
                            fontWeight: 400,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                      {/* Connector: dot → line */}
                      <div className="flex flex-col items-center">
                        <div
                          className="scale-annotation-dot rounded-full"
                          style={{
                            width: 'clamp(4px, 0.5vw, 8px)',
                            height: 'clamp(4px, 0.5vw, 8px)',
                            background: 'var(--color-foreground)',
                          }}
                        />
                        <div
                          className="scale-annotation-line origin-top"
                          style={{
                            width: '1px',
                            height: 'clamp(16px, 3vw, 48px)',
                            background: 'var(--color-foreground)',
                            marginTop: '4px',
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* The letter itself */}
                  <span
                    className={`scale-big-letter scale-big-letter-${item.id} relative z-10`}
                    style={{
                      display: 'inline-block',
                      opacity: 0.12,
                      fontStyle: 'italic',
                    }}
                  >
                    {item.id}
                  </span>

                  {/* BOTTOM annotation (S, A, E) */}
                  {item.direction === 'bottom' && (
                    <div
                      className={`absolute top-full flex flex-col items-center scale-annotation-${item.id}`}
                      style={{ marginTop: '8px' }}
                    >
                      {/* Connector: line → dot */}
                      <div className="flex flex-col items-center">
                        <div
                          className="scale-annotation-line origin-top"
                          style={{
                            width: '1px',
                            height: 'clamp(16px, 3vw, 48px)',
                            background: 'var(--color-foreground)',
                            marginBottom: '4px',
                          }}
                        />
                        <div
                          className="scale-annotation-dot rounded-full"
                          style={{
                            width: 'clamp(4px, 0.5vw, 8px)',
                            height: 'clamp(4px, 0.5vw, 8px)',
                            background: 'var(--color-foreground)',
                          }}
                        />
                      </div>
                      {/* Text */}
                      <div
                        className="scale-annotation-text text-center"
                        style={{
                          marginTop: '8px',
                          width: 'clamp(80px, 10vw, 160px)',
                        }}
                      >
                        <p
                          style={{
                            fontSize: 'clamp(9px, 0.9vw, 13px)',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--color-foreground)',
                            fontFamily: 'var(--font-manrope, sans-serif)',
                            marginBottom: '4px',
                          }}
                        >
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontSize: 'clamp(8px, 0.75vw, 11px)',
                            color: 'var(--color-foreground-muted)',
                            lineHeight: 1.5,
                            fontFamily: 'var(--font-manrope, sans-serif)',
                            fontWeight: 400,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dot separator between letters */}
                {index < LETTERS.length - 1 && (
                  <span
                    style={{
                      display: 'inline-block',
                      opacity: 0.1,
                      color: 'var(--color-foreground)',
                      fontSize: 'clamp(40px, 8vw, 120px)',
                      fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                      lineHeight: 1,
                      alignSelf: 'flex-end',
                      paddingBottom: '0.15em',
                    }}
                  >
                    .
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Final CTA - fades in after all letters revealed */}
        <div className="scale-cta-container absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-foreground-muted)',
              marginBottom: '8px',
            }}
          >
            Five stages. One constraint.
          </p>
          <Link
            href="/contact/diagnostic"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '13px 32px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-background)',
              color: 'var(--color-foreground)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              transition: 'background 0.2s, border-color 0.2s',
            }}
          >
            Begin your diagnosis
            <span style={{ fontSize: '16px' }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
