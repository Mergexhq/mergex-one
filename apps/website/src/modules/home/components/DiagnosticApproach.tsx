import Link from 'next/link';

export function DiagnosticApproach() {
    const steps = [
        { num: '01', letter: 'S', title: 'Scan', desc: 'Map the full business system and operations.' },
        { num: '02', letter: 'C', title: 'Compress', desc: 'Identify the single root constraint holding you back.' },
        { num: '03', letter: 'A', title: 'Architect', desc: 'Design the precise operational system needed to scale.' },
        { num: '04', letter: 'L', title: 'Launch', desc: 'Execute against the blueprint with precision.' },
        { num: '05', letter: 'E', title: 'Embed', desc: 'Transfer full system ownership to your team.' },
    ];

    return (
        <section className="py-24 md:py-32 px-6 bg-background">
            <div className="max-w-content mx-auto">
                
                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-4 block">
                        How We Consult
                    </span>
                    <h2
                        className="font-serif text-3xl md:text-5xl font-normal leading-tight mb-6 text-foreground"
                        style={{ letterSpacing: '0.02em' }}
                    >
                        Diagnose before you build.
                    </h2>
                    <p className="text-base md:text-lg text-foreground-muted leading-relaxed">
                        Every consulting engagement at MergeX begins with a structured business diagnosis. We use the S.C.A.L.E. Methodology to pinpoint exactly where your business is constrained. Then, and only then, we prescribe and build the solution.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {steps.map((step) => (
                        <div 
                            key={step.letter}
                            className="group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-black/5 hover:border-violet-500/20 bg-white/60 hover:bg-white/80 shadow-xs hover:shadow-md"
                        >
                            {/* Hover glowing card background */}
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.04) 0%, transparent 100%)',
                                }}
                            />
                            
                            {/* Huge background step letter */}
                            <span 
                                className="absolute right-4 bottom-2 text-7xl font-bold font-serif opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-500 select-none pointer-events-none text-primary"
                            >
                                {step.letter}
                            </span>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full min-h-[140px] justify-between">
                                <div>
                                    <span 
                                        className="text-[10px] font-bold uppercase tracking-widest block transition-colors duration-300 text-primary/40 group-hover:text-primary/70"
                                    >
                                        {step.num}
                                    </span>
                                    <h3 className="font-semibold text-lg text-foreground mt-2 mb-1.5 group-hover:text-primary transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p 
                                        className="text-sm leading-relaxed text-foreground-muted"
                                    >
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Link */}
                <div className="mt-14 flex justify-start">
                    <Link
                        href="/methodology"
                        className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-all duration-300 text-primary hover:opacity-80"
                    >
                        <span>Learn how it works</span>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            className="transform group-hover:translate-x-1 transition-transform duration-300"
                        >
                            <path
                                d="M2 7h10M8 3l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}
