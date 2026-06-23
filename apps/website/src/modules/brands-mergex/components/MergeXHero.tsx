'use client';

import { motion } from 'framer-motion';
import { NeonOrbs } from '@/components/ui/neon-orbs';

export function MergeXHero() {
  return (
    <section className="relative w-full z-0 overflow-hidden bg-background">
      {/* ── NEON ORBS BACKGROUND ── */}
      <NeonOrbs 
        orbOpacity={0.28}
        className="relative w-full min-h-screen pt-32 pb-24 flex items-center justify-center overflow-hidden"
      >
        <div className="max-w-content mx-auto px-6 md:px-12 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center"
          >
            {/* Main Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                fontSize: 'clamp(36px, 5.5vw, 68px)',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--color-foreground)',
                marginBottom: '36px',
                maxWidth: '920px',
              }}
            >
              Scale breaks{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  color: 'var(--color-foreground-muted)',
                  display: 'block',
                  marginTop: '8px',
                }}
              >
                where structure doesn’t exist.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                color: 'var(--color-foreground-muted)',
                lineHeight: 1.75,
                maxWidth: '680px',
              }}
            >
              MergeX helps businesses improve operations, branding, technology, and growth systems through structured consulting built for scalable execution.
            </p>
          </motion.div>
        </div>
      </NeonOrbs>

      {/* ── SMOOTH GRADIENT DISSOLVE (SMEDGE EFFECT) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '240px',
          background: 'linear-gradient(to bottom, transparent, var(--color-background))',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </section>
  );
}
