import Link from 'next/link';

export function BrandsCTA() {
    return (
        <section className="py-32 px-6 bg-background">
            <div className="max-w-3xl mx-auto text-center border-t border-border pt-24">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
                    Start Here
                </p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-foreground">
                    Not sure which brand
                    <br />
                    fits your needs?
                </h2>
                <p className="text-foreground-muted text-lg max-w-md mx-auto mb-10">
                    Start with a diagnostic. We will identify the right operational
                    layer for your business in one conversation.
                </p>
                <Link
                    href="/diagnostic"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-none text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                    Request a Diagnostic
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
