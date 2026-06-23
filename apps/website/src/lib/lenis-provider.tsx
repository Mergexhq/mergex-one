'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * LenisProvider - Global smooth scroll provider with GSAP integration
 * True inertial/momentum scrolling using the official lenis package.
 * 
 * Config:
 *   lerp: 0.05 - physics-based interpolation (lower = more inertia/float)
 *   wheelMultiplier: 0.9 - each wheel tick covers slightly less distance, inertia carries the rest
 *   touchMultiplier: 1.8 - responsive on touch without overshooting
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.05,             // True inertia interpolation (momentum factor)
            smoothWheel: true,      // Enable smooth mouse wheel
            wheelMultiplier: 0.9,   // Slightly less raw distance → more floaty coast
            touchMultiplier: 1.8,   // Touch scroll feel
            infinite: false,
            autoRaf: false,         // We control RAF manually for GSAP sync
        });

        (window as any).lenis = lenis;

        // Sync Lenis scroll events with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Ticker-based RAF - GSAP ticker keeps perfect 60/120fps sync
        const onTick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(onTick);
        gsap.ticker.lagSmoothing(0); // Prevent stutters when tab loses focus

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();

        return () => {
            gsap.ticker.remove(onTick);
            lenis.destroy();
            (window as any).lenis = null;
        };
    }, []);

    return <>{children}</>;
}

/**
 * useLenisScroll - Hook to programmatically scroll to a target
 * Usage: const scrollTo = useLenisScroll();
 * scrollTo('#section-id', { offset: -100 });
 */
export function useLenisScroll() {
    return (target: string | number, options?: { offset?: number; duration?: number }) => {
        const lenis = (window as any).lenis;
        if (lenis) {
            lenis.scrollTo(target, {
                offset: options?.offset ?? 0,
                duration: options?.duration ?? 1.4,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        }
    };
}
