'use client';

import Link from 'next/link';

export function Proof() {
    return (
        <section className="bg-background px-6 py-16 md:py-20">
            <div className="max-w-content mx-auto">
                <div className="relative overflow-hidden rounded-token-xl border border-white/10 bg-[#0E0B18]">
                    {/* Purple corner glow */}
                    <div
                        className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
                        }}
                    />

                    {/* Bottom edge accent */}
                    <div
                        className="absolute bottom-0 left-0 w-full h-px pointer-events-none"
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.5) 40%, rgba(139,92,246,0.5) 60%, transparent 100%)',
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-start gap-8 lg:gap-16 px-10 pt-8 pb-10 md:px-14 md:pt-10 md:pb-12">

                        {/* Left - Title */}
                        <div>
                            <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] font-normal text-[#ECECE8] leading-[1.45] tracking-[0.03em]">
                                How businesses scale when
                                <br />
                                <span className="text-primary-light font-semibold">the right problem gets fixed.</span>
                            </h2>
                        </div>

                        {/* Right - Description + CTA */}
                        <div className="flex flex-col items-end gap-8">
                            <p className="text-base md:text-lg leading-relaxed text-left w-full tracking-wide text-[#ECECE8]/60">
                                A collection of businesses we helped solve operational and structural issues limiting scale with creating clearer systems, better execution, and sustainable growth.
                            </p>

                            <Link
                                href="/insights/case-studies"
                                id="view-transformation-archive-cta"
                                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-linear-to-b from-violet-400 to-violet-900 hover:opacity-95 text-white self-end mt-6 md:mt-8"
                                style={{
                                    color: '#FFFFFF',
                                }}
                            >
                                <span>Explore work</span>
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
                </div>
            </div>
        </section>
    );
}
