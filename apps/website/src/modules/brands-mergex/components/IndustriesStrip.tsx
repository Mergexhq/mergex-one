const INDUSTRIES = [
  { name: 'D2C / E-commerce', note: 'Operational restructure · Margin recovery · Fulfil systems' },
  { name: 'B2B Services', note: 'GTM architecture · Pipeline design · Pricing clarity' },
  { name: 'Professional Services', note: 'Capacity design · Client systems · Delivery scaling' },
  { name: 'EdTech', note: 'Enrolment infrastructure · Retention systems · Offer clarity' },
];

export function IndustriesStrip() {
  return (
    <section
      style={{
        padding: '64px 48px',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-background)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-foreground-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            Industries
          </p>
          <div
            style={{
              height: '1px',
              flex: 1,
              background: 'var(--color-border)',
            }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'var(--color-border)',
            border: '1px solid var(--color-border)',
          }}
        >
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.name}
              style={{
                background: 'var(--color-background)',
                padding: '24px 28px',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-foreground)',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em',
                }}
              >
                {ind.name}
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--color-foreground-muted)',
                  lineHeight: 1.6,
                  letterSpacing: '0.01em',
                }}
              >
                {ind.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
