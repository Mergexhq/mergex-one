'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
    pathname: string | null;
}

export function MobileNav({ isOpen, onClose, pathname }: MobileNavProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        const lenis = (window as any).lenis;

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (lenis) lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (lenis) lenis.start();
            setIsExpanded(false); // Reset expansion state when closed
        }

        return () => {
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop Overlay - Pure Gentle Blur Only (No Color Fill) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 backdrop-blur-[4px] z-[60]"
                        onClick={onClose}
                    />

                    {/* Menu Container with Drag-to-Dismiss and Dynamic Animated Height */}
                    <motion.div
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        dragElastic={{ top: 0, bottom: 1 }}
                        onDragEnd={(event, info) => {
                            if (info.offset.y > 100 || info.velocity.y > 500) {
                                onClose();
                            }
                        }}
                        initial={{ y: '100%', height: '62dvh' }}
                        animate={{ 
                            y: 0,
                            height: isExpanded ? '92dvh' : '62dvh'
                        }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed bottom-0 left-0 right-0 w-full bg-[#080808] z-[61] flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/10 rounded-t-3xl overflow-hidden"
                    >
                        {/* Drag Handle Indicator */}
                        <div 
                            className="w-full flex justify-center py-3 cursor-pointer shrink-0 z-10"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <div className="w-16 h-1 bg-white/20 rounded-full hover:bg-white/40 transition-colors" />
                        </div>

                        {/* Contextual wordmark */}
                        <div className="flex items-center justify-center px-6 pb-4 border-b border-white/10 shrink-0">
                          {pathname === '/brands/ovrn-studios' ? (
                            <Link href="/brands/ovrn-studios" onClick={onClose}
                              className="font-clash font-bold text-2xl tracking-wider text-white"
                            >OVRN Studio</Link>
                          ) : pathname === '/brands/academy' ? (
                            <Link href="/brands/academy" onClick={onClose} className="text-[17px] leading-none whitespace-nowrap text-white">
                              <span className="font-clash font-bold tracking-wide">MergeX</span>{' '}
                              <span className="font-clash font-thin tracking-wide">Academy</span>
                            </Link>
                          ) : pathname === '/brands/mergex' ? (
                            <Link href="/brands/mergex" onClick={onClose} className="flex items-center gap-1">
                              <Image src="/logo/mergex-logo.png" alt="MergeX Logo" width={40} height={40} className="object-contain brightness-0 invert" />
                              <span className="font-clash font-bold text-2xl tracking-wide text-white">MERGEX</span>
                            </Link>
                          ) : (
                            <Link href="/" onClick={onClose} className="flex items-center">
                              <span className="text-[16px] leading-none tracking-tight text-white select-none whitespace-nowrap">
                                <span className="font-serif italic font-normal mr-0.5">The</span>
                                {' '}
                                <span className="font-clash font-bold tracking-wide">MERGEX</span>
                                <span className="font-serif italic font-normal"> Company</span>
                              </span>
                            </Link>
                          )}
                        </div>

                        {/* Scrollable Menu Content Area */}
                        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
                            <div className="flex flex-col">
                                {/* Who We Are */}
                                <Link
                                    href="/about"
                                    onClick={onClose}
                                    className="group flex items-center justify-between py-5 border-b border-white/10"
                                >
                                    <span className="text-xl font-medium text-white tracking-[0.05em] group-hover:text-violet-400 transition-colors">
                                        Who We Are
                                    </span>
                                    <ArrowUpRight size={20} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                                </Link>

                                {/* Methodology */}
                                <Link
                                    href="/methodology"
                                    onClick={onClose}
                                    className="group flex items-center justify-between py-5 border-b border-white/10"
                                >
                                    <span className="text-xl font-medium text-white tracking-[0.05em] group-hover:text-violet-400 transition-colors">
                                        Methodology
                                    </span>
                                    <ArrowUpRight size={20} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                                </Link>

                                {/* Brands */}
                                <Link
                                    href="/brands"
                                    onClick={onClose}
                                    className="group flex items-center justify-between py-5 border-b border-white/10"
                                >
                                    <span className="text-xl font-medium text-white tracking-[0.05em] group-hover:text-violet-400 transition-colors">
                                        Brands
                                    </span>
                                    <ArrowUpRight size={20} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                                </Link>

                                {/* MergeX */}
                                <Link
                                    href="/brands/mergex"
                                    onClick={onClose}
                                    className="group flex items-center justify-between py-5 border-b border-white/10"
                                >
                                    <span className="text-xl font-medium text-white tracking-[0.05em] group-hover:text-violet-400 transition-colors">
                                        MergeX
                                    </span>
                                    <ArrowUpRight size={20} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                                </Link>

                                {/* Insights */}
                                <Link
                                    href="/insights"
                                    onClick={onClose}
                                    className="group flex items-center justify-between py-5 border-b border-white/10"
                                >
                                    <span className="text-xl font-medium text-white tracking-[0.05em] group-hover:text-violet-400 transition-colors">
                                        Insights
                                    </span>
                                    <ArrowUpRight size={20} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                                </Link>

                                {/* Contact */}
                                <Link
                                    href="/contact"
                                    onClick={onClose}
                                    className="group flex items-center justify-between py-5 border-b border-white/10"
                                >
                                    <span className="text-xl font-medium text-white tracking-[0.05em] group-hover:text-violet-400 transition-colors">
                                        Contact
                                    </span>
                                    <ArrowUpRight size={20} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                                </Link>

                                {/* Login */}
                                <Link
                                    href="/login"
                                    onClick={onClose}
                                    className="group flex items-center justify-between py-5"
                                >
                                    <span className="text-xl font-medium text-white tracking-[0.05em] group-hover:text-violet-400 transition-colors">
                                        Login
                                    </span>
                                    <ArrowUpRight size={20} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                                </Link>
                            </div>
                        </div>

                        {/* Fixed Footer Tagline (Always Visible at the Bottom) */}
                        <div className="w-full py-5 border-t border-white/5 bg-[#080808] shrink-0 text-center">
                            <p className="text-white/45 text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase font-roboto">
                                one system, zero friction.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
