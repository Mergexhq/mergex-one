'use client';

export function ProblemStatement() {
  return (
    <section
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        padding: '80px 24px',
        background: 'var(--background)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* ── Editorial Two-Column Container ── */}
      <div
        className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16 lg:gap-24 relative z-10"
      >
        {/* LEFT COLUMN: Overline + Headline */}
        <div className="w-full md:w-[48%] flex flex-col gap-5">
          {/* Overline */}
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-manrope), sans-serif',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--foreground-muted)',
            }}
          >
            The Real Problem
          </p>

          {/* Headline */}
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-playfair-display, Georgia, serif)',
              fontSize: 'clamp(28px, 3.2vw, 42px)',
              fontWeight: 400,
              lineHeight: 1.22,
              letterSpacing: '-0.02em',
              color: 'var(--foreground)',
            }}
          >
            Most businesses don&apos;t have a growth problem.{' '}
            They have a{' '}
            <span
              style={{
                textDecoration: 'underline',
                textDecorationColor: 'var(--primary)',
                textDecorationThickness: '2px',
                textUnderlineOffset: '4px',
              }}
            >
              systems
            </span>{' '}
            problem.
          </h2>
        </div>

        {/* RIGHT COLUMN: Description Body */}
        <div className="w-full md:w-[48%] pt-2 md:pt-10">
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-manrope), sans-serif',
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'var(--foreground-muted)',
            }}
          >
            They hire more people, add more tools, run more campaigns - and wonder
            why nothing compounds. The answer is almost always the same: there&apos;s no
            underlying system connecting the effort to the outcome.
          </p>
        </div>
      </div>
    </section>
  );
}
