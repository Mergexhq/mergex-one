'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

/* ─── Site data ──────────────────────────────────────────────────────── */
const SITEMAP = [
    {
        section: 'Core Navigation',
        href: '/',
        children: [
            {
                group: 'Main',
                links: [
                    { label: 'Homepage', href: '/' },
                    { label: 'About MergeX', href: '/about' },
                    { label: 'Work', href: '/insights/case-studies' },
                    { label: 'Insights', href: '/insights' },
                    { label: 'Contact', href: '/contact' },
                ],
            },
        ],
    },
    {
        section: 'Ecosystem Brands',
        href: '/brands',
        children: [
            {
                group: 'Strategic Layers',
                links: [
                    { label: 'MergeX', href: '/brands/mergex' },
                    { label: 'Academy', href: '/brands/academy' },
                    { label: 'OVRN Studios', href: '/brands/ovrn-studios' },
                ],
            },
            {
                group: 'Foundations',
                links: [
                    { label: 'All Brands', href: '/brands' },
                    { label: 'Methodology', href: '/methodology' },
                    { label: 'Diagnostic', href: '/contact/diagnostic' },
                ],
            },
        ],
    },
    {
        section: 'Insights & Resources',
        href: '/insights',
        children: [
            {
                group: 'Content Hub',
                links: [
                    { label: 'All Articles', href: '/insights' },
                    { label: 'Case Studies', href: '/insights/case-studies' },
                ],
            },
        ],
    },
    {
        section: 'Company & Legal',
        href: '#',
        children: [
            {
                group: 'Operations',
                links: [
                    { label: 'Careers', href: '/careers' },
                ],
            },
            {
                group: 'Legal Framework',
                links: [
                    { label: 'Privacy Policy', href: '/privacy-policy' },
                    { label: 'Terms of Use', href: '/terms-of-use' },
                    { label: 'Sitemap', href: '/sitemap' },
                ],
            },
        ],
    },
];

/* ─── Animation variants ─────────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
};

/* ─── Client Content ─────────────────────────────────────────────────── */
export default function SitemapContent() {
    return (
        <div className="min-h-screen bg-background">

            {/* ── Header ── */}
            <header className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-serif text-black tracking-tight italic"
                >
                    Sitemap
                </motion.h1>
            </header>

            {/* ── Sitemap Grid ── */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 py-24">
                <div className="space-y-24">
                    {SITEMAP.map((section) => (
                        <motion.section
                            key={section.section}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeUp}
                            className="group"
                        >
                            {/* Section Heading */}
                            <div className="mb-10">
                                <h2 className="text-3xl font-semibold tracking-tight text-black mb-4">
                                    {section.section}
                                </h2>
                                <div className="h-px w-full bg-black/10" />
                            </div>

                            {/* Groups Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
                                {section.children.map((group) => (
                                    <div key={group.group} className="space-y-6">
                                        {/* Group Label */}
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-black/90">
                                            {group.group}
                                        </h3>

                                        {/* Links List */}
                                        <ul className="space-y-3">
                                            {group.links.map((link) => (
                                                <li key={link.label}>
                                                    <Link
                                                        href={link.href}
                                                        className="text-[15px] text-black/60 hover:text-purple-600 transition-colors duration-200 block py-0.5"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>
            </main>

        </div>
    );
}
