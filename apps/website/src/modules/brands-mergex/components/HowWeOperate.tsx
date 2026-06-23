const SCALE_STEPS = [
  {
    letter: 'S',
    title: 'Scan',
    desc: 'A structured diagnostic of the full business system. Revenue model, sales motion, operational capacity, product-market alignment, and leadership bandwidth. We map the entire system before identifying anything.',
    output: 'Constraint map + current state documentation',
  },
  {
    letter: 'C',
    title: 'Compress',
    desc: 'Compress diagnostic findings into a single precise constraint statement. Not a list of problems - one root cause. The constraint that, if resolved, unlocks the most movement across the system.',
    output: 'Constraint statement + root cause analysis',
  },
  {
    letter: 'A',
    title: 'Architect',
    desc: 'Design the operational system blueprint. What needs to be built, restructured, or removed. Sequenced precisely to resolve the constraint without disrupting what is already working.',
    output: 'System blueprint + execution roadmap',
  },
  {
    letter: 'L',
    title: 'Launch',
    desc: 'Execute against the blueprint with precision. Every output is tied directly to the constraint and evaluated against its intended system effect. Sequenced. Intentional. Measured.',
    output: 'Built system + deployed infrastructure',
  },
  {
    letter: 'E',
    title: 'Embed',
    desc: 'Transfer full ownership to the founder and their team. Build the feedback loops, reporting infrastructure, and decision frameworks that make growth compound independently of MergeX.',
    output: 'Operating playbook + full system ownership',
  },
];

export function HowWeOperate() {
  return (
    <section
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
              marginBottom: '16px',
            }}
          >
            How MergeX operates
          </h2>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-foreground-muted)',
              lineHeight: 1.6,
            }}
          >
            The S.C.A.L.E. Methodology - five stages, one constraint, precise prescription.
          </p>
        </div>

        {/* Steps */}
        <div>
          {SCALE_STEPS.map((step, i) => (
            <div
              key={step.letter}
              style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                gap: '28px',
                padding: '36px 0',
                borderBottom:
                  i < SCALE_STEPS.length - 1
                    ? '1px solid var(--color-border)'
                    : 'none',
                alignItems: 'start',
              }}
            >
              {/* Big italic letter */}
              <span
                style={{
                  fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                  fontSize: '56px',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'var(--color-border)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {step.letter}
              </span>
              <div>
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                    marginBottom: '8px',
                  }}
                >
                  Stage 0{i + 1}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                    fontSize: 'clamp(20px, 2vw, 26px)',
                    fontWeight: 400,
                    color: 'var(--color-foreground)',
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-foreground-muted)',
                    lineHeight: 1.75,
                    marginBottom: '14px',
                    maxWidth: '560px',
                  }}
                >
                  {step.desc}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-foreground-muted)',
                    borderLeft: '2px solid var(--color-border)',
                    paddingLeft: '12px',
                    fontStyle: 'italic',
                    opacity: 0.7,
                  }}
                >
                  Output: {step.output}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
