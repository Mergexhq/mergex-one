'use client';

import { useState, useEffect } from 'react';

const PRESCRIPTIONS = [
  {
    num: '01',
    domain: 'Technology Systems',
    title: 'Technology Systems',
    subtitle: 'Infrastructure, automation, platforms, tooling.',
    image: '/prescriptions/technology-systems.png',
  },
  {
    num: '02',
    domain: 'Brand Systems',
    title: 'Brand Systems',
    subtitle: 'Identity, positioning, perception, messaging.',
    image: '/prescriptions/brand-systems.png',
  },
  {
    num: '03',
    domain: 'Commercial Systems',
    title: 'Commercial Systems',
    subtitle: 'Acquisition, pipeline, conversion, revenue flow.',
    image: '/prescriptions/commercial-systems.png',
  },
  {
    num: '04',
    domain: 'Operational Systems',
    title: 'Operational Systems',
    subtitle: 'Execution, workflows, process, scalability.',
    image: '/prescriptions/operational-systems.png',
  },
];

export function SolutionsAsPrescriptions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const isMobile = windowWidth > 0 && windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const gridCols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(4, 1fr)';
  const cardHeight = isMobile ? '240px' : isTablet ? '300px' : '420px';
  const sectionPadding = isMobile ? '72px 12px' : '100px 12px';
  const headerFlexDir: React.CSSProperties['flexDirection'] = isMobile ? 'column' : 'row';
  const headerTextAlign: React.CSSProperties['textAlign'] = isMobile ? 'left' : 'right';

  return (
    <section
      style={{
        padding: sectionPadding,
        background: 'var(--color-background)',
        borderBottom: '1px solid var(--color-border)',
        overflow: 'hidden',
      }}
    >
      {/* ── Editorial Header ──────────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '16px',
          marginBottom: isMobile ? '36px' : '56px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-playfair-display, Georgia, serif)',
            fontSize: isMobile ? '24px' : 'clamp(26px, 3vw, 40px)',
            fontWeight: 500,
            lineHeight: 1.35,
            letterSpacing: '-0.02em',
            color: 'var(--color-foreground)',
            margin: 0,
          }}
        >
          Solutions as prescriptions
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-foreground-muted)',
            lineHeight: 1.6,
            maxWidth: '520px',
            textAlign: 'center',
            margin: '0 auto',
          }}
        >
          Every intervention is prescribed based on the actual operational constraint -
          not packaged services.
        </p>
      </div>

      {/* ── Prescription Gallery ──────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: gridCols,
          gap: '12px',
        }}
      >
        {PRESCRIPTIONS.map((p, i) => {
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={p.num}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                height: cardHeight,
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'default',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              }}
            >
              {/* ── Background Image ── */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${p.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* ── Cinematic Gradient Overlay ── */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.02) 100%)',
                }}
              />

              {/* ── Inner Content Container (Equal padding on all 4 sides) ── */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  padding: isMobile ? '24px' : '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                  zIndex: 2,
                }}
              >
                {/* Top: Number badge */}
                <div
                  style={{
                    alignSelf: 'flex-end',
                    fontFamily: 'var(--font-manrope, sans-serif)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.28)',
                  }}
                >
                  {p.num}
                </div>

                {/* Bottom: Text Content */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Card title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                      fontSize: isMobile ? '20px' : '22px',
                      fontWeight: 400,
                      lineHeight: 1.22,
                      letterSpacing: '-0.01em',
                      color: '#FFFFFF',
                      marginTop: 0,
                      marginBottom: '8px',
                      marginLeft: 0,
                      marginRight: 0,
                    }}
                  >
                    {p.title}
                  </h3>

                  {/* Subtitle / Support Text */}
                  <p
                    style={{
                      fontFamily: 'var(--font-manrope, sans-serif)',
                      fontSize: isMobile ? '11px' : '12px',
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {p.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
