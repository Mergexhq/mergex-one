'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

export interface LegalSection {
    id: string;
    title: string;
}

interface LegalPageLayoutProps {
    title: string;
    description: string;
    effectiveDate: string;
    lastUpdated: string;
    readingTime: string;
    sections: LegalSection[];
    children: React.ReactNode;
}

export function LegalPageLayout({
    title,
    description,
    effectiveDate,
    lastUpdated,
    readingTime,
    sections,
    children,
}: LegalPageLayoutProps) {
    const [activeSection, setActiveSection] = useState<string>('');
    const tocRef = useRef<HTMLDivElement>(null);

    // Reading progress bar
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // ScrollSpy for TOC highlighting
    useEffect(() => {
        const handleScroll = () => {
            // Add offset to trigger when section is near top of viewport (e.g., top 1/3rd of screen)
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            let currentId = sections[0]?.id || '';

            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    // Element position relative to document top
                    const top = element.getBoundingClientRect().top + window.scrollY;
                    if (top <= scrollPosition) {
                        currentId = section.id;
                    }
                }
            });

            setActiveSection(currentId);
        };

        // Attach event listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check after a slight delay to ensure DOM is ready
        const timeoutId = setTimeout(handleScroll, 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, [sections]);

    // Scroll TOC to keep active section in view
    useEffect(() => {
        if (activeSection && tocRef.current) {
            const container = tocRef.current;
            if (activeSection === sections[0]?.id) {
                container.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const activeLink = container.querySelector(`a[href="#${activeSection}"]`) as HTMLElement;
            if (activeLink) {
                const linkTop = activeLink.offsetTop;
                const linkBottom = linkTop + activeLink.offsetHeight;
                const containerTop = container.scrollTop;
                const containerBottom = containerTop + container.clientHeight;

                if (linkTop < containerTop) {
                    container.scrollTo({ top: linkTop - 20, behavior: 'smooth' });
                } else if (linkBottom > containerBottom) {
                    container.scrollTo({ top: linkBottom - container.clientHeight + 20, behavior: 'smooth' });
                }
            }
        }
    }, [activeSection, sections]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const buttonOpacity = useTransform(scrollYProgress, [0, 0.08, 0.88, 0.96], [0, 1, 1, 0]);
    const buttonY = useTransform(scrollYProgress, [0, 0.08, 0.88, 0.96], [20, 0, 0, 20]);
    const buttonPointerEvents = useTransform(scrollYProgress, (v: number) => 
        (v > 0.08 && v < 0.88) ? 'auto' : 'none'
    );

    return (
        <div className="min-h-screen bg-background text-[#111111] selection:bg-violet-200 selection:text-violet-900 font-sans">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-violet-600 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Hero Card */}
            <div className="p-2 lg:p-3">
                <div className="relative w-full rounded-[20px] lg:rounded-[24px] overflow-hidden bg-[#080808] pt-32 pb-16 md:pt-36 md:pb-20 px-6 flex flex-col items-center justify-center text-center">
                    {/* Background Gradient / Overlay */}
                    <div className="absolute inset-0 z-0">
                        {/* Dark gradient fade */}
                        <div className="absolute inset-0 bg-linear-to-b from-[#101010]/50 to-[#080808]" />
                        
                        {/* Bottom purple glows - mimicking the orange glow in reference but purple */}
                        <div className="absolute -bottom-48 -left-24 w-120 h-120 bg-violet-600/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
                        <div className="absolute -bottom-48 -right-24 w-120 h-120 bg-violet-600/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
                        
                        {/* Additional gradient overlay for depth */}
                        <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-violet-900/10 to-transparent pointer-events-none" />
                        
                        {/* Noise overlay */}
                        <div 
                            className="absolute inset-0 opacity-[0.04] mix-blend-screen pointer-events-none" 
                            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} 
                        />
                    </div>

                    <header className="relative z-10 max-w-[760px] mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 text-white font-serif italic font-medium">
                            {title}
                        </h1>
                        <p className="text-base md:text-lg lg:text-xl text-white/70 mb-10 font-medium tracking-wide">
                            {description}
                        </p>
                        
                        {/* Metadata Row */}
                        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/50 border-t border-white/10 pt-8">
                            <div className="flex flex-col gap-1 items-center">
                                <span className="font-semibold text-white tracking-widest uppercase text-[10px]">Effective</span>
                                <span>{effectiveDate}</span>
                            </div>
                            <div className="flex flex-col gap-1 items-center">
                                <span className="font-semibold text-white tracking-widest uppercase text-[10px]">Updated</span>
                                <span>{lastUpdated}</span>
                            </div>
                            <div className="flex flex-col gap-1 items-center">
                                <span className="font-semibold text-white tracking-widest uppercase text-[10px]">Time</span>
                                <span>{readingTime}</span>
                            </div>
                        </div>
                    </header>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 pt-16 pb-12">
                {/* 2-Column Document Layout */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-20 relative">
                    
                    {/* Left Column: Sticky TOC */}
                    <aside className="hidden lg:block w-[260px] xl:w-[320px] shrink-0">
                        <div className="sticky top-12 max-h-[calc(100vh-6rem)] flex flex-col pb-12">
                            <h3 className="text-[17px] font-bold text-[#111111] mb-6 px-2 tracking-tight font-sans shrink-0">
                                Table of contents
                            </h3>
                            <div 
                                ref={tocRef}
                                className="overflow-y-auto pr-4 pb-4 min-h-0 flex-1 relative" 
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <style jsx>{`
                                    div::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}</style>
                                <nav className="flex flex-col items-start gap-2">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className={`
                                            flex items-center gap-3 pl-3 pr-2 py-2 rounded-md text-[14.5px] transition-all duration-300
                                            ${activeSection === section.id 
                                                ? 'bg-[#1C1C1C] text-white font-medium shadow-md shadow-black/5 border border-white/5' 
                                                : 'text-[#333333] hover:bg-black/5 hover:text-[#111111]'
                                            }
                                        `}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const el = document.getElementById(section.id);
                                            if (el) {
                                                const y = el.getBoundingClientRect().top + window.scrollY - 40;
                                                window.scrollTo({ top: y, behavior: 'smooth' });
                                            }
                                        }}
                                    >
                                        <span className="leading-snug block">{section.title}</span>
                                    </a>
                                ))}
                            </nav>
                            </div>
                        </div>
                    </aside>

                    {/* Right Column: Reading Content */}
                    <main className="w-full max-w-[760px] pb-12">
                        <div className="
                            prose prose-neutral max-w-none
                            prose-headings:font-medium prose-headings:text-[#111111] prose-headings:tracking-tight
                            prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6
                            prose-h3:text-lg prose-h3:mt-10 prose-h3:mb-4
                            prose-p:text-[#2C2C2C] prose-p:leading-loose prose-p:mb-8
                            prose-a:text-violet-600 prose-a:font-medium prose-a:underline-offset-4 hover:prose-a:text-violet-700
                            prose-ul:text-[#2C2C2C] prose-ul:my-6 prose-ul:space-y-3 prose-li:leading-relaxed prose-li:pl-2 prose-li:marker:text-violet-600
                            prose-ol:text-[#2C2C2C] prose-ol:my-6 prose-ol:space-y-3
                            prose-strong:text-[#111111] prose-strong:font-bold
                            prose-hr:border-black/10 prose-hr:my-16
                        ">
                            {children}
                        </div>
                    </main>

                </div>
            </div>


            {/* Back to Top Floating Button */}
            <motion.button
                onClick={scrollToTop}
                style={{ opacity: buttonOpacity, y: buttonY, pointerEvents: buttonPointerEvents }}
                className="fixed bottom-8 right-8 p-3 rounded-full bg-white/90 text-[#111111] shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-black/8 hover:bg-white hover:shadow-[0_6px_24px_rgb(0,0,0,0.12)] hover:scale-105 transition-all z-40 backdrop-blur-sm"
                aria-label="Scroll to top"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
            </motion.button>
        </div>
    );
}
