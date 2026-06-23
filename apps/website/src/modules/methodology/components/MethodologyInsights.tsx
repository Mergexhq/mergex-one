'use client';

import Link from 'next/link';
import { INSIGHTS } from '@/lib/data/insights';

export function MethodologyInsights() {
    const featured = INSIGHTS.slice(0, 2);
    return (
        <section className="methodology-section">
            <div className="methodology-section-inner">
                <div className="methodology-section-sidebar">
                    <p className="mp-section-label">Further Reading</p>
                    <h2 className="mp-section-title">Selected Insights</h2>
                </div>
                <div>
                    <p className="mp-prose">
                        These articles go deeper on the thinking behind the S.C.A.L.E. Methodology 
                        and our diagnostic-led approach to consulting and scaling.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--mp-border)', border: '1px solid var(--mp-border)' }}>
                        {featured.map((insight) => (
                            <Link
                                key={insight.slug}
                                href={`/insights/${insight.slug}`}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '32px',
                                    padding: '28px 32px',
                                    background: 'var(--mp-bg)',
                                    textDecoration: 'none',
                                    transition: 'background 0.2s',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = 'var(--mp-surface)')}
                                onMouseOut={(e) => (e.currentTarget.style.background = 'var(--mp-bg)')}
                            >
                                <div>
                                    <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mp-purple)', marginBottom: '8px' }}>
                                        {insight.category} · {insight.readTime}
                                    </p>
                                    <p style={{ fontFamily: 'var(--mp-serif)', fontSize: '18px', fontWeight: 400, color: 'var(--mp-text-primary)', marginBottom: '8px', lineHeight: 1.4 }}>
                                        {insight.title}
                                    </p>
                                    <p style={{ fontSize: '13px', color: 'var(--mp-text-tertiary)', lineHeight: 1.6 }}>
                                        {insight.excerpt}
                                    </p>
                                </div>
                                <span style={{ fontSize: '18px', color: 'var(--mp-text-tertiary)', flexShrink: 0, marginTop: '4px' }}>→</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
