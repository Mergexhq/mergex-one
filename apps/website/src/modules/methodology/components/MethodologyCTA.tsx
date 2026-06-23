export function MethodologyCTA() {
    return (
        <section className="methodology-cta">
            <div className="methodology-cta-inner">
                <p className="mp-section-label" style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ width: '1px', height: '40px', background: 'var(--mp-border-mid)', display: 'inline-block' }} />
                    Begin your diagnosis
                </p>
                <h2 className="methodology-cta-heading">
                    The methodology only works<br />
                    when we <em>start with the scan.</em>
                </h2>
                <p className="methodology-cta-body">
                    Every engagement begins with a diagnostic conversation. Not a pitch, 
                    not a proposal - a structured session to find the real constraint in your 
                    business. If you are running a revenue-generating business that has hit 
                    a ceiling, this is where we start.
                </p>
                <a href="/contact/diagnostic" className="methodology-cta-btn">
                    Begin Your Diagnosis
                    <span style={{ fontSize: '16px' }}>→</span>
                </a>
            </div>
        </section>
    );
}
