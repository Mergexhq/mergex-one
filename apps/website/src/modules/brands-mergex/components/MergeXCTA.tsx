import Link from 'next/link';

export function MergeXCTA() {
  return (
    <section
      style={{
        padding: '120px 48px',
        background: 'var(--color-background)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '40%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '500px',
          background:
            'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: '80px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '1px',
                height: '48px',
                background: 'var(--color-border)',
              }}
            />
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-foreground-muted)',
              }}
            >
              Begin Here
            </p>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair-display, Georgia, serif)',
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 400,
              lineHeight: 1.07,
              letterSpacing: '-0.025em',
              color: 'var(--color-foreground)',
              marginBottom: '24px',
            }}
          >
            Every engagement
            <br />
            starts with the{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--color-foreground-muted)',
              }}
            >
              scan.
            </span>
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--color-foreground-muted)',
              lineHeight: 1.75,
              maxWidth: '440px',
            }}
          >
            Not a proposal. Not a pitch. A structured consulting engagement
            begins with diagnosing the real constraint in your business - and
            determining whether MergeX is the right firm for it.
          </p>
        </div>

        {/* Right - CTA card */}
        <div
          style={{
            border: '1px solid var(--color-border)',
            padding: '48px',
            background: 'var(--color-background)',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '20px',
            }}
          >
            Consulting Diagnostic
          </p>
          <p
            style={{
              fontFamily: 'var(--font-playfair-display, Georgia, serif)',
              fontSize: '22px',
              fontWeight: 400,
              color: 'var(--color-foreground)',
              lineHeight: 1.35,
              marginBottom: '16px',
              letterSpacing: '-0.01em',
            }}
          >
            Request a diagnostic - not a sales call.
          </p>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-foreground-muted)',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}
          >
            Reserved for revenue-generating businesses with a defined scaling
            ceiling. We will tell you honestly whether we can help.
          </p>

          {/* Criteria */}
          <div
            style={{
              marginBottom: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {[
              'Generating revenue (£250k+ annual)',
              'Identifiable growth ceiling',
              'Founder-led or leadership-led',
            ].map((item) => (
              <div
                key={item}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <div
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-foreground-muted)',
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/contact/diagnostic"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'var(--color-foreground)',
              color: 'var(--color-background)',
              fontSize: '13px',
              fontWeight: 500,
              padding: '15px 28px',
              borderRadius: '2px',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'opacity 0.2s',
              width: '100%',
            }}
          >
            Start With a Diagnostic
            <span style={{ fontSize: '16px' }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
