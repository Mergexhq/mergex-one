'use client';

import { useEffect, useRef } from 'react';

const STANDARDS = [
  {
    num: '01',
    text: 'We diagnose before we prescribe. Always.',
    explain:
      'No engagement begins with a solution. Every engagement begins with a structured diagnosis of the actual constraint. The prescription follows the finding — never the other way around.',
  },
  {
    num: '02',
    text: 'We work selectively — not with everyone who can pay.',
    explain:
      'MergeX works with revenue-generating businesses that are ready to scale. Not pre-revenue startups. Not founders looking for the cheapest option. Selectivity is how we protect the depth of every engagement.',
  },
  {
    num: '03',
    text: 'We build systems — not dependencies.',
    explain:
      'Every system we build is designed to operate without us. Our success is measured by how little a business needs us after the engagement ends — not by how much they do.',
  },
  {
    num: '04',
    text: 'We measure outcomes. Not activity.',
    explain:
      'Reports on hours spent, content published, and campaigns run are not outcomes. Revenue growth, operational clarity, and founder independence are. We are accountable to the second list — not the first.',
  },
];

export function NonNegotiables() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const rows = sectionRef.current?.querySelectorAll('.standard-row, .fade-up');
    rows?.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 90}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-standards">
      <div className="standards-inner">

        {/* Left column */}
        <div className="standards-left">
          <span className="section-pill fade-up">How we work</span>
          <h2 className="standards-title fade-up">
            Four rules.<br />
            <em>Zero exceptions.</em>
          </h2>
          <p className="standards-desc fade-up">
            These are not guidelines.<br />
            They govern every engagement,<br />
            without exception.
          </p>
        </div>

        {/* Right column */}
        <div className="standards-right">
          {STANDARDS.map((s) => (
            <div key={s.num} className="standard-row">
              <span className="standard-num">{s.num}</span>
              <div className="standard-body">
                <p className="standard-text">{s.text}</p>
                <p className="standard-explain">{s.explain}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
