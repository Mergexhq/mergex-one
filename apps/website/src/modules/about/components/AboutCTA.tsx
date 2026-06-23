'use client';

import Link from 'next/link';

export function AboutCTA() {
  return (
    <section className="about-cta">
      <div className="cta-inner">
        <span className="section-pill">Start a Consulting Engagement</span>

        <h2 className="cta-heading">
          Stop guessing.<br />
          <em>Start diagnosing.</em>
        </h2>

        <p className="cta-body">
          Our first conversation is about your situation — not our services.
          If there&apos;s a fit, you&apos;ll know exactly what we&apos;d do and why.
          No obligation. No guesswork.
        </p>

        <div className="cta-actions">
          <Link href="/contact" className="cta-primary">
            Book a diagnostic call
            <span className="cta-arrow">→</span>
          </Link>
        </div>

        <div className="cta-secondary-links">
          <Link href="/brands/ovrn-studios">Interested in OVRN Studios</Link>
          <Link href="/careers">Join MergeX</Link>
        </div>
      </div>
    </section>
  );
}
