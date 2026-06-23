import Link from 'next/link';

export function FinalCTA() {
    return (
        <section className="py-20 md:py-28 px-6 bg-background relative">
            <div className="max-w-7xl mx-auto border-t border-border/80 pt-16 md:pt-20">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-16">
                    
                    {/* Left Column - Clean Editorial Header */}
                    <div className="max-w-2xl">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-4 block">
                            GET STARTED
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl font-normal leading-tight text-foreground mb-4" style={{ letterSpacing: '0.02em' }}>
                            Ready to scale with more clarity?
                        </h2>
                        <p className="text-base text-foreground-muted max-w-xl">
                            Every engagement begins with understanding the business before proposing a solution.
                        </p>
                    </div>

                    {/* Right Column - High Contrast Action Button */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 lg:mt-6">
                        <Link
                            href="/contact/diagnostic"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4.5 bg-foreground text-background font-semibold text-sm rounded-none hover:bg-primary hover:text-white transition-all duration-300 ease-out group shadow-sm"
                        >
                            <span>Diagnose the Business</span>
                            <svg 
                                className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth={2.5} 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.25 12l-6.75 6.75" />
                            </svg>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
