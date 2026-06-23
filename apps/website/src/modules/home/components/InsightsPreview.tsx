import Link from 'next/link';
import { INSIGHTS } from '@/lib/data/insights';
import { InsightCard } from '@/modules/insights/components';

export function InsightsPreview() {
    const previewInsights = INSIGHTS.slice(0, 2);

    return (
        <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-background">
            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-16">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                        OUR THINKING
                    </p>
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.2] tracking-[-0.01em] w-full max-w-none text-foreground font-serif"
                    >
                        The latest perspectives from MergeX.
                    </h2>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {previewInsights.map((insight, index) => (
                        <InsightCard
                            key={insight.slug}
                            insight={insight}
                            variant="compact"
                            index={index}
                        />
                    ))}
                </div>

                {/* Centered CTA Button */}
                <div className="flex justify-center">
                    <Link
                        href="/insights"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold tracking-wide border border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span>See all insights</span>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            className="stroke-current transform group-hover:translate-x-0.5 transition-transform"
                        >
                            <path
                                d="M2 7h10M8 3l4 4-4 4"
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
