'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import FlowingMenu from '@/components/ui/FlowingMenu/FlowingMenu';

/**
 * Switches theme using the View Transition API for a GPU-composited crossfade.
 * VTA takes a screenshot of the current page, instantly swaps .dark class,
 * then animates between the two screenshots entirely on the compositor thread —
 * zero element repaints, zero layout recalculation during the animation.
 * Falls back to an instant class toggle if VTA is not supported.
 */
let vtaInProgress = false;

function switchTheme(dark: boolean) {
    const root = document.documentElement;
    const apply = () => {
        if (dark) root.classList.add('dark');
        else root.classList.remove('dark');
    };

    // Prevent overlapping transitions (can cause flicker)
    if (vtaInProgress) {
        apply();
        return;
    }

    // Use View Transition API if available (Chrome 111+, Edge 111+)
    if (typeof (document as any).startViewTransition === 'function') {
        vtaInProgress = true;
        const transition = (document as any).startViewTransition(apply);
        transition.finished.finally(() => {
            vtaInProgress = false;
        });
    } else {
        // Instant fallback — still correct, just no animation
        apply();
    }
}

export function AlsoFromMergeX() {
    const sectionRef = useRef<HTMLElement>(null);

    const menuItems = [
        {
            link: '/brands/mergex',
            text: 'MergeX',
            image: '/prescriptions/operational-systems.png'
        },
        {
            link: '/brands/ovrn-studios',
            text: 'OVRN Studios',
            image: '/prescriptions/brand-systems.png'
        },
        {
            link: '/brands/academy',
            text: 'MergeX Academy',
            image: '/prescriptions/commercial-systems.png'
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Capture user's real preference BEFORE we ever touch anything
        const wasUserDark = document.documentElement.classList.contains('dark');
        let isCurrentlyDark = wasUserDark;
        let rafId: number | null = null;

        /**
         * Core check — called on every Lenis scroll tick via rAF.
         *
         * "In view" = section overlaps the middle 40% of the viewport.
         * This threshold is symmetric: it fires at the same visual position
         * whether you scroll DOWN (entering) or UP (exiting).
         */
        const checkTheme = () => {
            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;

            // Section overlaps the middle 40% band (30%–70%) of the viewport
            const inView = rect.top < vh * 0.7 && rect.bottom > vh * 0.3;

            if (inView && !isCurrentlyDark) {
                isCurrentlyDark = true;
                switchTheme(true);
            } else if (!inView && isCurrentlyDark) {
                isCurrentlyDark = false;
                switchTheme(wasUserDark);
            }
        };

        // Throttle via rAF so we never do more than one check per frame
        const onScroll = () => {
            if (rafId !== null) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                checkTheme();
            });
        };

        // Prefer Lenis scroll events (fires in sync with the smooth scroll position)
        // Fall back to native scroll if Lenis isn't ready yet
        const lenis = (window as any).lenis;
        if (lenis) {
            lenis.on('scroll', onScroll);
        }
        // Always attach native scroll too — covers fast scrolls and fallback
        window.addEventListener('scroll', onScroll, { passive: true });

        // Run once on mount in case the section is already in view
        checkTheme();

        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', onScroll);
            const lenis = (window as any).lenis;
            if (lenis) lenis.off('scroll', onScroll);
            // Restore original theme on unmount
            switchTheme(wasUserDark);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-36 bg-background relative border-t border-border/80"
        >
            {/* Minimal Noise Overlay */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none z-20"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-20">
                {/* ── Editorial Header ── */}
                <div className="mb-20 md:mb-28">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-4 block">
                        ECOSYSTEM
                    </p>
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-16">
                        <h2
                            className="font-serif text-3xl md:text-5xl font-normal leading-[1.12] text-foreground lg:w-[50%] tracking-[0.01em]"
                        >
                            The MergeX Ecosystem
                        </h2>
                        <p className="text-sm md:text-base text-foreground-muted lg:w-[45%] lg:pt-3 font-body leading-relaxed max-w-xl">
                            Three specialized brands. One shared philosophy: build the right foundation first.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Horizontal Brand Rails ── */}
            <div className="w-full border-t border-b border-border/80 relative z-20">
                <FlowingMenu
                    items={menuItems}
                    bgColor="transparent"
                    textColor="var(--foreground)"
                    marqueeBgColor="linear-gradient(to top, #581c87 0%, #a78bfa 100%)"
                    marqueeTextColor="#ffffff"
                    borderColor="var(--border)"
                    speed={10}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-20">
                {/* ── Bottom Centered View All Brands Button ── */}
                <div className="flex justify-center mt-20 md:mt-24">
                    <Link
                        href="/brands"
                        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold tracking-wide border border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span>View all brands</span>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            className="stroke-current transform group-hover:translate-x-0.5 transition-transform stroke-[2px]"
                        >
                            <path
                                d="M2 7h10M8 3l4 4-4 4"
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
