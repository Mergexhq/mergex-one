const PRESCRIPTIONS = [
    {
        num: '01',
        title: 'Technology',
        desc: 'The operational systems, automation infrastructure, and digital tools that remove bottlenecks and create scalable capacity without adding headcount.',
    },
    {
        num: '02',
        title: 'Branding',
        desc: 'The positioning, visual identity, and communication architecture that aligns how the market perceives the business with how it actually operates.',
    },
    {
        num: '03',
        title: 'Marketing',
        desc: 'The acquisition architecture - channels, messaging, and content systems - that brings the right buyers into the commercial motion at the right moment.',
    },
    {
        num: '04',
        title: 'Sales',
        desc: 'The conversion infrastructure - qualification, pipeline, and closing frameworks - that turns inbound demand into predictable, repeatable revenue.',
    },
];

export function PrescriptionModel() {
    return (
        <section className="methodology-section">
            <div className="methodology-section-inner">
                <div className="methodology-section-sidebar">
                    <p className="mp-section-label">Section 03</p>
                    <h2 className="mp-section-title">The Prescription Model</h2>
                </div>
                <div>
                    <p className="mp-prose">
                        The diagnostic determines <strong>what to build</strong>. The prescription 
                        names the specific outputs across our four operational domains. Every prescription 
                        is a direct response to the constraint - nothing is built speculatively.
                    </p>
                    <p className="mp-prose">
                        Most engagements require intervention in two or three domains. Rarely all four. 
                        We only prescribe what the diagnosis demands.
                    </p>
                    <div className="prescription-grid">
                        {PRESCRIPTIONS.map((p) => (
                            <div key={p.num} className="prescription-card">
                                <p className="prescription-card-num">{p.num}</p>
                                <p className="prescription-card-title">{p.title}</p>
                                <p className="prescription-card-desc">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mp-prose" style={{ marginTop: '32px' }}>
                        Ownership transfer is built into every engagement. We do not create 
                        dependency. The system we build belongs entirely to the business - with 
                        full documentation, training, and operational playbooks included.
                    </p>
                </div>
            </div>
        </section>
    );
}
