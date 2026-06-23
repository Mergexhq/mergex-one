'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface FooterRevealWrapperProps {
    children: ReactNode;
}

/**
 * Pins the footer to the bottom of the viewport (behind main content via z-index).
 * Measures footer height and writes it to --footer-height on :root so that
 * the main content can apply a matching margin-bottom, creating the curtain reveal effect.
 */
export default function FooterRevealWrapper({ children }: FooterRevealWrapperProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const syncHeight = () => {
            const height = el.offsetHeight;
            document.documentElement.style.setProperty('--footer-height', `${height}px`);
        };

        const handleScroll = () => {
            const height = el.offsetHeight;
            // The last `height` pixels of scrollable range ARE the footer reveal zone.
            // Total scrollable px = scrollHeight - innerHeight (max possible scrollY).
            // Footer starts revealing at: maxScroll - footerHeight.
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const revealThreshold = maxScroll - height;
            const isRevealing = window.scrollY >= revealThreshold;

            window.dispatchEvent(new CustomEvent('mergex:toggle-navbar', {
                detail: { hidden: isRevealing }
            }));
        };

        // Set immediately on mount
        syncHeight();

        // Re-sync on resize (text wrap changes on mobile)
        const observer = new ResizeObserver(syncHeight);
        observer.observe(el);

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            // Clean up the variable when the layout unmounts (e.g. studio route)
            document.documentElement.style.removeProperty('--footer-height');
            // Ensure navbar is visible when leaving
            window.dispatchEvent(new CustomEvent('mergex:toggle-navbar', {
                detail: { hidden: false }
            }));
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 1,
            }}
        >
            {children}
        </div>
    );
}
