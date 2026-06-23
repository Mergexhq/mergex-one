'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';

/* ─── Link helper ──────────────────────────────────────────────────── */
function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="block py-1 text-[15px] text-black/70 hover:text-[#8B5CF6] transition-colors font-medium whitespace-nowrap"
        >
            {label}
        </Link>
    );
}

/* ─── Data ─────────────────────────────────────────────────────────── */
const FOOTER_LINKS = {
    column1: [
        { label: 'About MergeX', href: '/about' },
        { label: 'Case Studies', href: '/insights/case-studies' },
        { label: 'Insights', href: '/insights' },
        { label: 'Sitemap', href: '/sitemap' },
    ],
    column2: [
        { label: 'Brands', href: '/brands' },
        { label: 'Careers', href: '/careers' },
        { label: 'Methodology', href: '/methodology' },
        { label: 'Get in touch', href: '/contact' },
    ],
};

const SOCIAL_LINKS = [
    { icon: 'linkedin', href: 'https://linkedin.com/company/mergex.co', label: 'LinkedIn' },
    { icon: 'instagram', href: 'https://www.instagram.com/mergexco', label: 'Instagram' },
    { icon: 'x', href: 'https://x.com/mergexco', label: 'X' },
    { icon: 'threads', href: 'https://threads.com/mergex.co', label: 'Threads' },
];

/* ─── Animation variants ────────────────────────────────────────────── */
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
} as const;

const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const menuStaggerContainer = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
};

/* ─── SVG social icons ──────────────────────────────────────────────── */
function SocialIcon({ icon }: { icon: string }) {
    if (icon === 'linkedin')
        return (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        );
    if (icon === 'x')
        return (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        );
    if (icon === 'instagram')
        return (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
            </svg>
        );
    if (icon === 'threads')
        return (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 640 640">
                <path d="M427.5 299.7C429.7 300.6 431.7 301.6 433.8 302.5C463 316.6 484.4 337.7 495.6 363.9C511.3 400.4 512.8 459.7 465.3 507.1C429.1 543.3 385 559.6 322.7 560.1L322.4 560.1C252.2 559.6 198.3 536 162 489.9C129.7 448.9 113.1 391.8 112.5 320.3L112.5 319.8C113 248.3 129.6 191.2 161.9 150.2C198.2 104.1 252.2 80.5 322.4 80L322.7 80C393 80.5 447.6 104 485 149.9C503.4 172.6 517 199.9 525.6 231.6L485.2 242.4C478.1 216.6 467.4 194.6 453 177C423.8 141.2 380 122.8 322.5 122.4C265.5 122.9 222.4 141.2 194.3 176.8C168.1 210.1 154.5 258.3 154 320C154.5 381.7 168.1 429.9 194.3 463.3C222.3 498.9 265.5 517.2 322.5 517.7C373.9 517.3 407.9 505.1 436.2 476.8C468.5 444.6 467.9 405 457.6 380.9C451.5 366.7 440.5 354.9 425.7 346C422 372.9 413.9 394.3 401 410.8C383.9 432.6 359.6 444.4 328.3 446.1C304.7 447.4 282 441.7 264.4 430.1C243.6 416.3 231.4 395.3 230.1 370.8C227.6 322.5 265.8 287.8 325.3 284.4C346.4 283.2 366.2 284.1 384.5 287.2C382.1 272.4 377.2 260.6 369.9 252C359.9 240.3 344.3 234.3 323.7 234.2L323 234.2C306.4 234.2 284 238.8 269.7 260.5L235.3 236.9C254.5 207.8 285.6 191.8 323.1 191.8L323.9 191.8C386.5 192.2 423.8 231.3 427.6 299.5L427.4 299.7L427.5 299.7zM271.5 368.5C272.8 393.6 299.9 405.3 326.1 403.8C351.7 402.4 380.7 392.4 385.6 330.6C372.4 327.7 357.8 326.2 342.2 326.2C337.4 326.2 332.6 326.3 327.8 326.6C284.9 329 270.6 349.8 271.6 368.4L271.5 368.5z" />
            </svg>
        );
    return null;
}

/* ─── Component ─────────────────────────────────────────────────────── */
export default function Footer() {
    const pathname = usePathname();
    const isLabsOrSystems = pathname === '/labs' || pathname === '/systems';

    return (
        <footer
            className="bg-background pt-10 lg:pt-16 pb-4 lg:pb-10 relative overflow-hidden"
            style={{ zIndex: 20 }}
        >
            <div className="max-w-7xl xl:max-w-360 2xl:max-w-400 mx-auto px-4 md:px-10 lg:px-16 xl:px-20 relative" style={{ zIndex: 20 }}>

                {/* ── Top grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 mb-4 lg:mb-10">

                    {/* Brand column */}
                    <motion.div
                        className="md:col-span-4 lg:col-span-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div
                            className="mb-1 inline-block cursor-pointer -ml-4"
                            variants={fadeInUp}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image
                                src="/logo/mergex-logo.png"
                                alt="MergeX"
                                width={120}
                                height={120}
                                className="h-24 w-auto"
                            />
                        </motion.div>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-2xl font-bold text-black font-body leading-tight mb-10 whitespace-nowrap"
                        >
                            one system, zero friction.
                        </motion.p>

                        {/* Social icons */}
                        <motion.div
                            variants={staggerContainer}
                            className="flex gap-8 overflow-x-auto"
                            style={{ WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                        >
                            {SOCIAL_LINKS.map((link) => (
                                <motion.a
                                    variants={fadeInUp}
                                    key={link.icon}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black/60 hover:text-black hover:scale-110 transition-all flex items-center justify-center"
                                    aria-label={link.label}
                                >
                                    <SocialIcon icon={link.icon} />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Menu columns */}
                    <motion.div
                        className="md:col-span-4 lg:col-span-4 grid grid-cols-2 gap-4 lg:gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={menuStaggerContainer} className="flex flex-col gap-4">
                            <ul className="space-y-4 text-sm font-body">
                                {FOOTER_LINKS.column1.map((link) => (
                                    <motion.li key={link.label} variants={fadeInUp}>
                                        <FooterLink href={link.href} label={link.label} />
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div variants={menuStaggerContainer} className="flex flex-col gap-4">
                            <ul className="space-y-4 text-sm font-body">
                                {FOOTER_LINKS.column2.map((link) => (
                                    <motion.li key={link.label} variants={fadeInUp}>
                                        <FooterLink href={link.href} label={link.label} />
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>

                    {/* Newsletter / Insights column */}
                    <motion.div
                        className="md:col-span-4 lg:col-span-4 order-first md:order-none"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h4 className="font-body font-medium mb-4 text-black text-lg tracking-wide">
                            Featured Insights
                        </h4>
                        <p className="text-gray-600 text-sm font-body mb-8 leading-relaxed">
                            Thoughts on building businesses that scale with clarity and structure.
                        </p>
                        <form
                            className="relative flex items-center w-full bg-white border border-gray-300 rounded-[10px] p-1.5 focus-within:border-gray-400 transition-all shadow-sm"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="pl-3 pr-2 text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 min-w-0 bg-transparent border-none text-[15px] font-body text-black placeholder:text-gray-400 focus:outline-none focus:ring-0 px-1 py-1.5"
                            />
                            <button
                                type="submit"
                                className="btn-accent ml-1 whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                    </motion.div>
                </div>

                <motion.div
                    className="pt-10 md:pt-16 pb-0 flex flex-col md:flex-row justify-between items-center gap-4 lg:gap-6 text-xs text-gray-500 font-body relative"
                    style={{ zIndex: 10 }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                        <p>© 2025-2026 The MergeX Company. All rights reserved.</p>
                        <span className="hidden md:block text-gray-300">|</span>
                        <p
                            className={`hidden md:block opacity-100 font-medium text-gray-800 ${
                                isLabsOrSystems ? 'md:text-center' : 'md:text-left'
                            }`}
                        >
                            We believe good systems outlast trends.
                        </p>
                    </div>
                    <div className="flex gap-6 items-center">
                        <Link
                            className="text-[12px] opacity-60 hover:text-[#8B5CF6] hover:opacity-100 transition-all"
                            href="/privacy-policy"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            className="text-[12px] opacity-60 hover:text-[#8B5CF6] hover:opacity-100 transition-all"
                            href="/terms-of-use"
                        >
                            Terms &amp; Use
                        </Link>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="ml-2 w-8 h-8 rounded-full bg-black/5 hover:bg-black hover:text-white transition-all flex items-center justify-center text-black"
                            aria-label="Back to Top"
                        >
                            <ArrowUp size={16} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
