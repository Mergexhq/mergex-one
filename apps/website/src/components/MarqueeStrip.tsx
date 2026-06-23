'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * MarqueeStrip - pixel-perfect match to the original legacy component.
 *
 * Specs:
 * - White outer wrapper with py-8 (top/bottom space)
 * - Inner strip: bg-[#F5F5F2], height 20px, slanted -0.8deg, scale 1.02
 * - Infinite left-to-right scroll at 200s
 * - Font: mono, semibold, 10px, tracking 0.2em, text-[#4A4A48]
 * - 8 repetitions of the phrase block for seamless loop
 */
export function MarqueeStrip() {
    const phrases = [
        'DIAGNOSE BEFORE YOU BUILD',
        'SCALE WITH CLARITY',
        'PRECISION OVER BREADTH',
        'SYSTEMS OVER SHORTCUTS',
    ];

    const content = phrases.join('   •   ') + '   •   ';
    const repetitions = [0, 1, 2, 3, 4, 5, 6, 7];

    return (
        <div className="relative z-50 w-full overflow-hidden bg-[#F3F3F3] py-8">
            {/* Slanted container */}
            <div className="relative w-full" style={{ transform: 'rotate(-0.8deg) scaleX(1.02)' }}>
                {/* Grey ticker strip */}
                <div className="h-[20px] flex items-center bg-[#EAEAEA]">
                    <motion.div
                        className="flex whitespace-nowrap"
                        animate={{ x: ['-50%', '0%'] }}
                        transition={{
                            duration: 200,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        style={{ willChange: 'transform' }}
                    >
                        {repetitions.map((i) => (
                            <span
                                key={i}
                                className="font-mono font-semibold uppercase text-[#4A4A48] whitespace-pre"
                                style={{ fontSize: '10px', letterSpacing: '0.2em' }}
                            >
                                {content}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
