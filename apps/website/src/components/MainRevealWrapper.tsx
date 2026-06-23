'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

/** Returns true while the viewport width is ≤ 768 px (mobile breakpoint). */
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return isMobile;
}

export default function MainRevealWrapper({ children }: { children: ReactNode }) {
    const mainRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    // Track when the bottom of main passes the bottom of the viewport
    const { scrollYProgress } = useScroll({
        target: mainRef,
        offset: ["end end", "end start"]
    });

    // Desktop: subtle 0.98 shrink. Mobile: dramatic 0.82 shrink so the
    // footer curtain is clearly visible as the card pulls away.
    const scaleEnd = isMobile ? 0.82 : 0.98;
    const radiusEnd = isMobile ? '2rem' : '2.5rem';

    const scale = useTransform(scrollYProgress, [0, 1], [1, scaleEnd]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], ['0rem', radiusEnd]);

    return (
        <motion.main
            ref={mainRef}
            id="main-content"
            className="relative bg-background origin-bottom"
            style={{ 
                zIndex: 10, 
                marginBottom: 'var(--footer-height, 0px)',
                scale,
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
                overflow: 'clip'
            }}
        >
            {children}
        </motion.main>
    );
}
