const PROBLEMS = [
  {
    num: '01',
    title: 'Revenue growing. Margin collapsing.',
    body: 'Sales are increasing but profitability is not. The operational infrastructure that worked at £1M cannot support £5M. Something structural broke - but it is not visible from the surface.',
  },
  {
    num: '02',
    title: 'Every solution creates a new problem.',
    body: 'You hire to fix a bottleneck. The bottleneck shifts. You launch a new channel. CAC spikes. Execution is not the problem. The system design is.',
  },
  {
    num: '03',
    title: 'The team is the constraint.',
    body: 'Nothing moves without founder sign-off. Leadership bandwidth is the ceiling on every function. The business has not built systems - it has built dependency.',
  },
  {
    num: '04',
    title: 'No clear picture of what to fix first.',
    body: 'A list of 14 problems with no agreed priority. Leadership is spread across all of them simultaneously. The result is progress on none of them.',
  },
];

export function ConstraintProblem() {
  return (
    <section
      id="problems"
      style={{
        padding: '100px 48px',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '80px',
        }}
      >
        {/* Sidebar */}
        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>

          <h2
            style={{
              fontFamily: 'var(--font-playfair-display, Georgia, serif)',
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--color-foreground)',
            }}
          >
            The problems MergeX was built to solve
          </h2>
        </div>

        {/* Content */}
        <div>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--color-foreground-muted)',
              lineHeight: 1.8,
              marginBottom: '48px',
              maxWidth: '580px',
            }}
          >
            Most scaling businesses do not have a <strong style={{ color: 'var(--color-foreground)', fontWeight: 500 }}>growth</strong> problem.
            They have a <strong style={{ color: 'var(--color-foreground)', fontWeight: 500 }}>structural</strong> problem.
            The ceiling is always systemic. Most firms prescribe solutions before understanding the real constraint. We diagnose first.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
              background: 'var(--color-border)',
              border: '1px solid var(--color-border)',
            }}
          >
            {PROBLEMS.map((p) => (
              <div
                key={p.num}
                style={{
                  background: 'var(--color-background)',
                  padding: '28px 32px',
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr',
                  gap: '20px',
                  alignItems: 'start',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--color-foreground-muted)',
                    opacity: 0.4,
                    letterSpacing: '0.06em',
                    paddingTop: '3px',
                  }}
                >
                  {p.num}
                </span>
                <div>
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--color-foreground)',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {p.title}
                  </p>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-foreground-muted)',
                      lineHeight: 1.7,
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
