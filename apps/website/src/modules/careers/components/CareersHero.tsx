'use client';

import { motion } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { CAREERS_HERO } from '../content/careers';

const playfair = Playfair_Display({
    subsets: ['latin'],
    style: ['italic'],
    weight: ['400', '500', '600']
});

export function CareersHero() {
    return (
        <section className="relative overflow-hidden min-h-screen flex items-start pt-24 md:pt-32 bg-[#F3F3F3]">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/background/careers/career-hero.webp"
                    alt=""
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 h-[300px] z-2 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent 0%, #F3F3F3 100%)' }}
            />

            <div className="container relative z-10 mx-auto max-w-content px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >


                    {/* Headline */}
                    <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                        Don’t Just Work. <span className={`${playfair.className} italic font-normal bg-clip-text text-transparent bg-linear-to-b from-purple-400 to-purple-800`}>Build.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600">
                        {CAREERS_HERO.subheadline}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
