'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const BELIEFS = [
  {
    num: '01',
    text: 'Execution without diagnosis is expensive guesswork.',
    sub: 'The most costly mistake in business is solving the wrong problem with precision.',
  },
  {
    num: '02',
    text: 'A business that depends on its founder cannot scale.',
    sub: 'Systems create freedom. Every engagement ends with ownership transferred — not dependency created.',
  },
  {
    num: '03',
    text: 'Precision beats volume. Every time.',
    sub: 'We do not offer a menu of services. We prescribe only what the diagnosis demands.',
  },
  {
    num: '04',
    text: 'Good systems outlast every trend.',
    sub: 'Infrastructure built on clarity compounds over time. Tactics built on guesswork erode it.',
  },
  {
    num: '05',
    text: 'Scale is an infrastructure problem — not a marketing one.',
    sub: 'When growth stalls, the answer is rarely more execution. It is almost always clearer systems.',
  },
];

const ECO_BRANDS = [
  { name: 'MergeX', role: 'Business consulting & scale infrastructure', status: 'Active' },
  { name: 'OVRN Studios', role: 'Brand & creative infrastructure', status: 'Active' },
];

export function NarrativeCore() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const items = sectionRef.current?.querySelectorAll('.fade-up, .belief-card');
    items?.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 60}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-narrative">
      <div className="narrative-inner">

        {/* Upper Grid: Thesis + Prose */}
        <div className="nc-top-grid">
          {/* Left Column: Thesis */}
          <div className="nc-header fade-up">
            <span className="section-pill">Principles</span>
            <div className="nc-thesis-wrap">
              <p className="nc-thesis-muted">Most companies aren&apos;t stuck from lack of effort.</p>
              <p className="nc-thesis-bold">They&apos;re solving the wrong problem.</p>
            </div>
          </div>

          {/* Right Column: Prose */}
          <div className="nc-prose-block">
            <p className="about-prose fade-up">
              Every year, founders hire agencies, run campaigns, rebuild their brand,
              and invest in technology — without ever asking the more important question:{' '}
              <strong>is this actually what&apos;s stopping our growth?</strong>{' '}
              The answer, most of the time, is no.
            </p>
            <p className="about-prose fade-up">
              The agency sells execution. The consultant sells generic advice.
              Neither diagnoses first. Nobody stops to ask what the actual constraint is
              before prescribing a solution. The result is a market full of{' '}
              <strong>expensive, well-executed answers to the wrong questions.</strong>
            </p>
            <p className="about-prose fade-up">
              MergeX is built to fix this. Not by doing more — but by{' '}
              <strong>understanding precisely what needs to be done</strong>{' '}
              before anything is built. We use a diagnostic-led consulting approach:
              identify the exact constraint first, then architect only what resolves it.
            </p>
            <p className="about-prose fade-up">
              We call this the <strong>S.C.A.L.E. Methodology</strong> —
              a five-stage diagnostic and execution framework.{' '}
              <Link href="/methodology" className="about-link">Learn how it works →</Link>
            </p>
          </div>
        </div>

        {/* Belief cards — 3-col grid */}
        <div className="belief-grid-header fade-up">
          <span className="section-pill">What we believe</span>
        </div>
        <div className="belief-grid">
          {BELIEFS.map((b) => (
            <div key={b.num} className="belief-card">
              <span className="belief-card-num">{b.num}</span>
              <p className="belief-card-text">{b.text}</p>
              <p className="belief-card-sub">{b.sub}</p>
            </div>
          ))}
        </div>

        {/* Ecosystem brands */}
        <div className="eco-teaser fade-up">
          <div className="eco-teaser-header">
            <span className="section-pill">The Ecosystem</span>
            <p className="eco-intro">
              MergeX is the flagship brand of <strong>The MergeX Company</strong> —
              a scaling ecosystem building specialized infrastructure
              across systems, creative, talent, knowledge, and products.
              Two divisions are active today.
            </p>
          </div>
          <div className="eco-cards">
            {ECO_BRANDS.map((brand) => (
              <div key={brand.name} className="eco-card">
                <div className="eco-card-name">{brand.name}</div>
                <div className="eco-card-role">{brand.role}</div>
                <div className="eco-card-status">{brand.status}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
