'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <main className="not-found-root fixed inset-0 z-9999 bg-[#F3F3F3] flex flex-col items-center justify-end overflow-hidden">
            {/* Immersive Background Image */}
            <div className="absolute inset-0 z-0">
                <picture className="absolute inset-0 block">
                    <source media="(max-width: 768px)" srcSet="/background/404/404_mobile.webp" />
                    <Image
                        src="/background/404/404.webp"
                        alt="404 - Lost beyond the known internet"
                        fill
                        priority
                        quality={100}
                        className="object-fill"
                    />
                </picture>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-none px-6 pb-12 flex flex-col items-center text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[#1A0B2E] text-lg md:text-xl lg:text-2xl font-medium tracking-tight mb-6 whitespace-normal max-w-[90%] md:max-w-md text-center"
                >
                    We're sorry. We seem to be lost beyond the known internet.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Link
                        href="/"
                        className="
                            group relative px-6 py-2 rounded-lg overflow-hidden 
                            bg-[#1A0B2E]/10 backdrop-blur-xl border border-[#1A0B2E]/20
                            text-[#1A0B2E] font-medium text-sm tracking-wide
                            transition-all duration-300 ease-out
                            hover:bg-[#1A0B2E]/20 hover:border-[#1A0B2E]/40
                            hover:scale-105 active:scale-95
                        "
                    >
                        Return Home
                    </Link>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                /* Reset the LayoutShell wrappers to allow full screen 404 */
                #main-content { 
                    transform: none !important; 
                    margin-bottom: 0 !important; 
                    border-radius: 0 !important;
                    overflow: visible !important;
                    background: #F3F3F3 !important;
                    height: 100vh !important;
                }
                
                /* Hide everything else */
                header, nav, footer, .mergex-navbar, [class*="FooterRevealWrapper"], [class*="FooterCurtain"], #footer-curtain, .footer-reveal-container { 
                    display: none !important; 
                    opacity: 0 !important;
                    pointer-events: none !important;
                    visibility: hidden !important;
                }

                /* Ensure the 404 main covers everything */
                .not-found-root {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    z-index: 2147483647 !important; /* Max CSS z-index */
                    background: #F3F3F3;
                }
            ` }} />
        </main>
    );
}
