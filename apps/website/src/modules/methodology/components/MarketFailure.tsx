export function MarketFailure() {
    return (
        <section className="methodology-section">
            <div className="methodology-section-inner">
                <div className="methodology-section-sidebar">
                    <p className="mp-section-label">Section 01</p>
                    <h2 className="mp-section-title">Why Scale Breaks</h2>
                </div>
                <div>
                    <p className="mp-section-label" style={{ color: 'var(--mp-purple)', marginBottom: '32px' }}>
                        The Market Failure
                    </p>
                    <p className="mp-prose">
                        The default response to a growth ceiling is to <strong>add more inputs</strong>: 
                        more marketing spend, more salespeople, more product features. It rarely works. 
                        Not because the inputs are wrong - but because the constraint is upstream of all of them.
                    </p>
                    <p className="mp-prose">
                        Businesses plateau for one of five reasons: unclear positioning, broken sales motion, 
                        operational bottlenecks, leadership capacity, or misaligned product-market fit. 
                        These cannot be solved by adding volume to the wrong system.
                    </p>
                    <p className="mp-prose">
                        <strong>The cost of the wrong diagnosis is compounding.</strong> Every month spent 
                        executing the wrong solution widens the gap between where the business is and where 
                        it could be. Execution without diagnosis is the most expensive mistake a founder makes.
                    </p>
                    <div style={{ 
                        marginTop: '48px', 
                        padding: '32px', 
                        border: '1px solid var(--mp-border)', 
                        borderLeft: '3px solid var(--mp-purple)',
                        background: 'transparent'
                    }}>
                        <p style={{ fontFamily: 'var(--mp-serif)', fontSize: '20px', color: 'var(--mp-text-primary)', fontWeight: 400, lineHeight: 1.4, fontStyle: 'italic' }}>
                            &ldquo;The right answer to the wrong problem is still wrong.&rdquo;
                        </p>
                        <p style={{ fontSize: '11px', color: 'var(--mp-text-tertiary)', marginTop: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            MergeX Operating Principle
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
