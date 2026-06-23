'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { MobileNav } from '@/components/layout/Header/MobileNav';

const whatWeDoColumns = [
    {
        title: 'Brand',
        items: [
            {
                label: 'MergeX',
                description: 'Business Consulting',
                href: '/brands/mergex',
            },
        ],
    },
    {
        title: 'Framework',
        items: [
            {
                label: 'Methodology',
                description: 'The S.C.A.L.E framework',
                href: '/methodology',
            },
        ],
    },
    {
        title: 'Start Here',
        items: [
            {
                label: 'Diagnostic',
                description: 'Start with clarity',
                href: '/diagnostic',
            },
        ],
    },
];

const getMegamenuLeftPanelContent = (pathname: string | null) => {
    if (pathname === '/brands/ovrn-studios') {
        return {
            title: 'Creative',
            italicTitle: 'Production',
            description: 'OVRN creates commercial visuals, branded content, and production systems designed for modern digital brands.',
        };
    }
    if (pathname === '/brands/mergex') {
        return {
            title: 'Business',
            italicTitle: 'Consulting',
            description: 'MergeX helps businesses improve operations, branding, technology, and growth systems through structured consulting built for scalable execution.',
        };
    }
    if (pathname === '/brands/academy') {
        return {
            title: 'Education',
            italicTitle: 'Infrastructure',
            description: 'MergeX Academy delivers business and creator-focused education designed for modern industries and scalable digital careers.',
        };
    }
    // Default / Parent company
    return {
        title: 'Business',
        italicTitle: 'Infrastructure',
        description: 'The MergeX Company builds operational, creative, and educational systems designed to support scalable modern businesses.',
    };
};

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [forceHidden, setForceHidden] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDetailMenuOpen, setIsDetailMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPastHero, setIsPastHero] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const detailMenuRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();
    const panelContent = getMegamenuLeftPanelContent(pathname);
    const { scrollY } = useScroll();

    const isDetailPage = 
        pathname && 
        pathname.startsWith('/insights/') && 
        pathname !== '/insights' && 
        pathname !== '/insights/case-studies';

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }

        if (latest > (typeof window !== 'undefined' ? window.innerHeight - 80 : 800)) {
            setIsPastHero(true);
        } else {
            setIsPastHero(false);
        }

        const previous = scrollY.getPrevious() ?? 0;

        // Close detailed menu on scroll
        if (Math.abs(latest - previous) > 5) {
            setIsDetailMenuOpen(false);
        }

        // Hide on scroll down after 150px, show on scroll up
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const isLightPage =
        (pathname === '/' && isPastHero) ||
        pathname?.startsWith('/insights') ||
        pathname?.startsWith('/systems') ||
        pathname?.startsWith('/legal') ||
        pathname?.startsWith('/partner') ||
        pathname === '/pricing' ||
        pathname?.startsWith('/contact') ||
        (pathname === '/about' && isScrolled) ||
        pathname === '/careers' ||
        pathname === '/sitemap' ||
        (pathname?.startsWith('/brands') && pathname !== '/brands/ovrn-studios') ||
        pathname?.startsWith('/methodology') ||
        pathname?.startsWith('/diagnostic');

    const textColorClass = (isLightPage || isScrolled) && !isDropdownOpen ? 'text-black' : 'text-white';
    const navItemColorClass = isLightPage && !isDropdownOpen
        ? 'text-black/80 hover:text-violet-600'
        : 'text-white/80 hover:text-white';
    
    // Dropdown open: force dark bg to blend with mega menu.
    const cardBgClass = isDropdownOpen
        ? 'bg-[#080808] border border-white/10 rounded-token-lg shadow-2xl'
        : 'bg-transparent rounded-none shadow-none';

    const pillBgClass = isDropdownOpen || (!isScrolled && !isDetailPage)
        ? 'bg-transparent shadow-none border-transparent'
        : 'bg-[#ebebea] border-[#d8d8d6] shadow-[0_1px_4px_rgba(0,0,0,0.06)]';

    const pillTextClass = isDropdownOpen
        ? 'text-white/70 hover:text-violet-500 transition-colors duration-200'
        : (!isScrolled && !isLightPage
            ? 'text-white/70 hover:text-white'
            : 'text-black/70 hover:text-black'
          );

    const getActiveLinkClass = (isActive: boolean) => {
        if (!isActive) return pillTextClass;
        if (isDropdownOpen) return 'bg-transparent text-white';
        if (!isScrolled) {
            return isLightPage ? 'bg-[#110326] text-white' : 'bg-white/20 text-white';
        }
        return 'bg-[#110326] text-white';
    };

    const openDropdown = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsDropdownOpen(true);
    };

    const closeDropdown = () => {
        timeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 120);
    };

    useEffect(() => {
        const handleToggleNavbar = (e: CustomEvent<{ hidden: boolean }>) => {
            setForceHidden(e.detail.hidden);
        };
        window.addEventListener('mergex:toggle-navbar', handleToggleNavbar as EventListener);
        return () => {
            window.removeEventListener('mergex:toggle-navbar', handleToggleNavbar as EventListener);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Also close dropdown on path change
    useEffect(() => {
        setIsDropdownOpen(false);
        setIsDetailMenuOpen(false);
    }, [pathname]);

    // Click outside detail menu handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (detailMenuRef.current && !detailMenuRef.current.contains(event.target as Node)) {
                setIsDetailMenuOpen(false);
            }
        }
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsDetailMenuOpen(false);
            }
        }

        if (isDetailMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isDetailMenuOpen]);



    // Notify AskMergeXWidget when mobile menu state changes
    useEffect(() => {
        const event = new CustomEvent('mergex:mobile-menu', {
            detail: { open: isMobileMenuOpen }
        });
        window.dispatchEvent(event);
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Desktop Megamenu Backdrop Overlay */}
            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hidden lg:block fixed inset-0 bg-black/20 backdrop-blur-[6px] z-40 pointer-events-auto"
                        onClick={() => setIsDropdownOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Desktop Navbar */}
            <motion.div
                className="hidden lg:block w-full fixed top-0 left-0 right-0 z-50 pointer-events-none mergex-navbar"
                initial={{ y: -100 }}
                animate={{ y: forceHidden || hidden ? '-100%' : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 mt-4">
                    <div className={`w-full relative transition-all duration-500 ease-in-out ${isDropdownOpen ? cardBgClass + ' overflow-hidden' : 'bg-transparent'}`} style={{ border: 'none' }}>
                        <nav className="w-full h-20 xl:h-24 flex items-center justify-between relative pointer-events-auto bg-transparent z-10 px-4 xl:px-6">
                            {/* Logo - Left */}
                            <div className="flex items-center">
                                <div className={`flex items-center gap-1 xl:gap-1.5 py-1 xl:py-1.5 px-3 xl:px-4 rounded-token-md xl:rounded-token-lg border transition-all duration-500 ease-in-out ${pillBgClass} ${isDetailPage && !isDropdownOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                    {pathname === '/brands/ovrn-studios' ? (
                                        <Link href="/brands/ovrn-studios" className="flex items-center gap-0 py-1.5 px-1">
                                            <span
                                                className={`font-clash font-bold text-xl xl:text-2xl 2xl:text-3xl tracking-wider flex items-center ${textColorClass} transition-colors duration-300`}
                                            >
                                                OVRN STUDIOS
                                            </span>
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/"
                                            className="flex items-center gap-0"
                                            onMouseEnter={() => setIsLogoHovered(true)}
                                            onMouseLeave={() => setIsLogoHovered(false)}
                                        >
                                            <Image
                                                src="/logo/mergex-logo.png"
                                                alt="MergeX Logo"
                                                width={52}
                                                height={52}
                                                className={`object-contain transition-all duration-300 w-11 h-11 xl:w-12 xl:h-12 2xl:w-[52px] 2xl:h-[52px] ${isDropdownOpen ? 'brightness-0 invert' : ((isLightPage || isScrolled) ? '' : 'brightness-0 invert')}`}
                                            />
                                            <span
                                                className={`font-clash font-bold text-xl xl:text-2xl 2xl:text-3xl tracking-wide ml-1.5 xl:ml-2 flex items-center ${textColorClass} transition-colors duration-300`}
                                            >
                                                <motion.span
                                                    initial={{ width: 0, opacity: 0, marginRight: 0 }}
                                                    animate={{
                                                        width: isLogoHovered ? 'auto' : 0,
                                                        opacity: isLogoHovered ? 1 : 0,
                                                        marginRight: isLogoHovered ? 6 : 0,
                                                    }}
                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                    className="font-serif italic font-normal text-sm xl:text-base 2xl:text-lg whitespace-nowrap overflow-hidden inline-block"
                                                >
                                                    The
                                                </motion.span>
                                                <span>MERGEX</span>
                                                <motion.span
                                                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                                                    animate={{
                                                        width: isLogoHovered ? 'auto' : 0,
                                                        opacity: isLogoHovered ? 1 : 0,
                                                        marginLeft: isLogoHovered ? 6 : 0,
                                                    }}
                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                    className="font-serif italic font-normal text-sm xl:text-base 2xl:text-lg whitespace-nowrap overflow-hidden inline-block"
                                                >
                                                    Company
                                                </motion.span>
                                            </span>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Menu Capsule - Right */}
                            <div className="flex items-center">
                                {(isDetailPage || isScrolled) ? (
                                     /* Expanding Hamburger Menu Card */
                                     <motion.div
                                         ref={detailMenuRef}
                                         layout
                                         transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                         className={`flex items-center pointer-events-auto cursor-default transition-[background-color,border-color,box-shadow,border-radius,padding] duration-300 ease-in-out ${
                                             isDetailMenuOpen
                                                 ? `gap-1 xl:gap-1.5 p-2 xl:p-2.5 rounded-token-md xl:rounded-token-lg border ${pillBgClass}`
                                                 : (isDropdownOpen
                                                     ? 'bg-transparent border-transparent shadow-none h-12 xl:h-14 p-1 rounded-token-lg xl:rounded-token-xl'
                                                     : 'bg-white border border-[#d8d8d6] shadow-[0_4px_25px_rgba(0,0,0,0.06)] rounded-token-lg xl:rounded-token-xl h-12 xl:h-14 p-1')
                                         }`}
                                     >
                                         {/* Inner links & Button with smooth AnimatePresence transition */}
                                         <AnimatePresence initial={false} mode="wait">
                                             {isDetailMenuOpen ? (
                                                 <motion.div
                                                     key="menu-links"
                                                     initial={{ opacity: 0, x: -8, scale: 0.96 }}
                                                     animate={{ opacity: 1, x: 0, scale: 1 }}
                                                     exit={{ opacity: 0, x: -8, scale: 0.96 }}
                                                     transition={{ duration: 0.2, ease: "easeOut" }}
                                                     className="flex items-center"
                                                 >
                                                     {/* Standard capsule links */}
                                                     <Link
                                                         href="/about"
                                                         className={`font-roboto text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-4 xl:px-5 py-2.5 xl:py-3 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(pathname === '/about')}`}
                                                         onClick={() => setIsDetailMenuOpen(false)}
                                                     >
                                                         Who We Are
                                                     </Link>

                                                     <div
                                                         ref={dropdownRef}
                                                         className="flex items-center"
                                                         onMouseEnter={openDropdown}
                                                         onMouseLeave={closeDropdown}
                                                     >
                                                         <button
                                                             className={`flex items-center gap-1.5 font-roboto text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-4 xl:px-5 py-2.5 xl:py-3 rounded-token-sm xl:rounded-token-md ${
                                                                 isDropdownOpen
                                                                     ? 'bg-transparent text-white hover:text-violet-500'
                                                                     : getActiveLinkClass(pathname === '/methodology' || pathname === '/diagnostic')
                                                             }`}
                                                             aria-expanded={isDropdownOpen}
                                                             aria-haspopup="true"
                                                         >
                                                             What We Do
                                                             <motion.svg
                                                                 width="8"
                                                                 height="5"
                                                                 viewBox="0 0 10 6"
                                                                 fill="currentColor"
                                                                 className="opacity-60"
                                                                 animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                                                 transition={{ duration: 0.2 }}
                                                             >
                                                                 <polygon points="0,0 10,0 5,6" />
                                                             </motion.svg>
                                                         </button>
                                                     </div>

                                                     <Link
                                                         href="/insights"
                                                         className={`font-roboto text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-4 xl:px-5 py-2.5 xl:py-3 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(pathname?.startsWith('/insights'))}`}
                                                         onClick={() => setIsDetailMenuOpen(false)}
                                                     >
                                                         Insights
                                                     </Link>
                                                     <Link
                                                         href="/contact"
                                                         className={`font-roboto text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-4 xl:px-5 py-2.5 xl:py-3 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(pathname?.startsWith('/contact'))}`}
                                                         onClick={() => setIsDetailMenuOpen(false)}
                                                     >
                                                         Contact
                                                     </Link>

                                                     <Link
                                                         href="/login"
                                                         className={`flex items-center gap-1.5 font-roboto text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-4 xl:px-5 py-2.5 xl:py-3 rounded-token-sm xl:rounded-token-md ${
                                                             isDropdownOpen
                                                                 ? 'text-white/70 hover:text-violet-500'
                                                                 : (!isScrolled && !isLightPage
                                                                     ? 'text-white/70 hover:text-white'
                                                                     : 'text-violet-700 hover:text-violet-900'
                                                                   )
                                                         }`}
                                                         onClick={() => setIsDetailMenuOpen(false)}
                                                     >
                                                         Login
                                                     </Link>
                                                 </motion.div>
                                             ) : (
                                                 <motion.button
                                                     key="hamburger-button"
                                                     onClick={() => setIsDetailMenuOpen(true)}
                                                     initial={{ opacity: 0, scale: 0.85 }}
                                                     animate={{ opacity: 1, scale: 1 }}
                                                     exit={{ opacity: 0, scale: 0.85 }}
                                                     transition={{ duration: 0.15 }}
                                                     className={`w-10 xl:w-12 h-10 xl:h-12 rounded-token-md xl:rounded-token-lg flex items-center justify-center transition-colors duration-200 focus:outline-none ${
                                                         isDropdownOpen ? 'hover:bg-white/10' : 'hover:bg-gray-100/85'
                                                     }`}
                                                     aria-label="Open menu"
                                                 >
                                                     <div className="w-5 h-[12px] flex flex-col justify-between relative">
                                                         <span
                                                             className={`w-full h-[3px] rounded-full origin-center transition-colors duration-200 ${
                                                                 isDropdownOpen ? 'bg-white' : 'bg-black'
                                                             }`}
                                                         />
                                                         <span
                                                             className={`w-full h-[3px] rounded-full origin-center transition-colors duration-200 ${
                                                                 isDropdownOpen ? 'bg-white' : 'bg-black'
                                                             }`}
                                                         />
                                                     </div>
                                                 </motion.button>
                                             )}
                                         </AnimatePresence>
                                     </motion.div>
                                ) : (
                                    /* DEFAULT Menu Capsule */
                                    <div className={`flex items-center gap-1 xl:gap-1.5 p-2 xl:p-2.5 rounded-token-md xl:rounded-token-lg border transition-all duration-500 ease-in-out ${pillBgClass}`}>
                                        <Link
                                            href="/about"
                                            className={`font-roboto text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-4 xl:px-5 py-2.5 xl:py-3 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(pathname === '/about')}`}
                                        >
                                            Who We Are
                                        </Link>

                                        {/* What We Do Mega Dropdown Trigger */}
                                        <div
                                            ref={dropdownRef}
                                            className="flex items-center"
                                            onMouseEnter={openDropdown}
                                            onMouseLeave={closeDropdown}
                                        >
                                            <button
                                                className={`flex items-center gap-1.5 font-roboto text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-4 xl:px-5 py-2.5 xl:py-3 rounded-[7px] xl:rounded-[9px] ${
                                                    isDropdownOpen
                                                        ? 'bg-transparent text-white hover:text-violet-500'
                                                        : getActiveLinkClass(pathname === '/methodology' || pathname === '/diagnostic')
                                                }`}
                                                aria-expanded={isDropdownOpen}
                                                aria-haspopup="true"
                                            >
                                                What We Do
                                                <motion.svg
                                                    width="8"
                                                    height="5"
                                                    viewBox="0 0 10 6"
                                                    fill="currentColor"
                                                    className="opacity-60"
                                                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <polygon points="0,0 10,0 5,6" />
                                                </motion.svg>
                                            </button>
                                        </div>

                                        <Link
                                            href="/insights"
                                            className={`font-roboto text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-4 xl:px-5 py-2.5 xl:py-3 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(pathname?.startsWith('/insights'))}`}
                                        >
                                            Insights
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className={`font-roboto text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-4 xl:px-5 py-2.5 xl:py-3 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(pathname?.startsWith('/contact'))}`}
                                        >
                                            Contact
                                        </Link>

                                        <Link
                                            href="/login"
                                            className={`flex items-center gap-1.5 font-roboto text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-4 xl:px-5 py-2.5 xl:py-3 rounded-[7px] xl:rounded-[9px] ${
                                                isDropdownOpen
                                                    ? 'text-white/70 hover:text-white'
                                                    : (!isScrolled && !isLightPage
                                                        ? 'text-white/70 hover:text-white'
                                                        : 'text-violet-700 hover:text-violet-900'
                                                      )
                                            }`}
                                        >
                                            Login
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* Fullscreen Megamenu Panel inside the same inner card in block flow */}
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full bg-transparent relative z-10 pointer-events-auto overflow-hidden"
                                    onMouseEnter={openDropdown}
                                    onMouseLeave={closeDropdown}
                                >
                                    {/* Main Content Row */}
                                    <div className="flex relative z-10 w-full">
                                        {/* LEFT PANEL */}
                                        <div className="w-[40%] py-10 xl:py-14 px-6 md:px-10 lg:px-12 xl:px-16 flex flex-col justify-between">
                                            <div>
                                                <p className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-semibold mb-4">
                                                    What We Do
                                                </p>
                                                <h2
                                                    className="text-[1.75rem] xl:text-[2.25rem] leading-[1.15] font-clash font-semibold text-white mb-3"
                                                >
                                                    {panelContent.title} <span className="font-serif italic font-medium">{panelContent.italicTitle}</span>
                                                </h2>
                                                <p className="text-white/50 text-xs xl:text-sm leading-relaxed whitespace-pre-line">
                                                    {panelContent.description}
                                                </p>
                                            </div>
                                            <div className="mt-auto pt-8">
                                                <p className="text-white/20 uppercase tracking-[0.35em] text-[9px] font-normal">
                                                    The MergeX Company
                                                </p>
                                            </div>
                                        </div>

                                        {/* RIGHT PANEL */}
                                        <div className="w-[60%] py-10 xl:py-14 px-6 md:px-10 lg:px-12 xl:px-16 flex flex-col">
                                            <div className="flex flex-col gap-0 w-full">
                                                {/* PRIMARY - MergeX */}
                                                <Link
                                                    href="/brands/mergex"
                                                    className="group flex flex-col border-b border-white/6 pb-4 mb-4 w-full"
                                                >
                                                    <p className="text-white/25 uppercase tracking-[0.18em] text-[9px] font-semibold mb-1.5">Brand</p>
                                                    <div className="flex items-center justify-between w-full">
                                                        <span
                                                            className="text-white text-xl xl:text-2xl font-clash font-semibold leading-none group-hover:text-violet-500 transition-colors duration-300"
                                                        >
                                                            MergeX
                                                        </span>
                                                        <svg
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-white shrink-0"
                                                        >
                                                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter"/>
                                                        </svg>
                                                    </div>
                                                    <span className="text-white/40 text-xs xl:text-sm mt-1.5">Business Consulting</span>
                                                </Link>
 
                                                {/* SECONDARY - Methodology */}
                                                <Link
                                                    href="/methodology"
                                                    className="group flex flex-col border-b border-white/6 pb-4 mb-4 w-full"
                                                >
                                                    <p className="text-white/25 uppercase tracking-[0.18em] text-[9px] font-semibold mb-1.5">Framework</p>
                                                    <div className="flex items-center justify-between w-full">
                                                        <span className="text-white text-lg xl:text-xl font-medium group-hover:text-violet-500 transition-colors duration-300">
                                                            Methodology
                                                        </span>
                                                        <svg
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-white shrink-0"
                                                        >
                                                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter"/>
                                                        </svg>
                                                    </div>
                                                    <span className="text-white/35 text-xs xl:text-sm mt-1">The S.C.A.L.E framework</span>
                                                </Link>
 
                                                {/* ACTION - Diagnostic */}
                                                <Link
                                                    href="/diagnostic"
                                                    className="group flex flex-col w-full"
                                                >
                                                    <p className="text-white/25 uppercase tracking-[0.18em] text-[9px] font-semibold mb-1.5">Start Here</p>
                                                    <div className="flex items-center justify-between w-full">
                                                        <span className="text-white text-sm xl:text-base font-medium group-hover:text-violet-500 transition-colors duration-300">
                                                            Diagnostic
                                                        </span>
                                                        <svg
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-white shrink-0"
                                                        >
                                                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter"/>
                                                        </svg>
                                                    </div>
                                                    <span className="text-white/40 text-xs xl:text-sm mt-1">The entry point to every consulting engagement</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Mobile Navbar Header */}
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: isMobileMenuOpen ? 0 : (forceHidden || hidden ? -100 : 0) }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden fixed top-0 left-0 right-0 z-50 pointer-events-none mergex-navbar"
            >
                <div className="w-full px-4 pt-3">
                    <div
                        className={`w-full transition-all duration-300 ease-in-out pointer-events-auto rounded-[16px] border backdrop-blur-md ${
                            isMobileMenuOpen
                                ? 'bg-[#F3F3F3] border-gray-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
                                : (isScrolled 
                                    ? (isLightPage 
                                        ? 'bg-[#ebebea]/95 border-[#d8d8d6] shadow-[0_4px_20px_rgba(0,0,0,0.06)]' 
                                        : 'bg-black/85 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.2)]')
                                    : (isLightPage 
                                        ? 'bg-transparent border-transparent shadow-none' 
                                        : 'bg-transparent border-transparent shadow-none')
                                  )
                        } px-5 h-14 flex items-center justify-between relative`}
                    >
                        {/* Left: Hamburger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 -ml-2 focus:outline-none z-10 ${
                                isMobileMenuOpen || isLightPage ? 'text-black' : 'text-white'
                            }`}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M4 8h16"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M4 16h16"
                                        />
                                    </>
                                )}
                            </svg>
                        </button>

                        {/* Centered Wordmark — path-aware */}
                        {(() => {
                          // OVRN Studios brand page
                          if (pathname === '/brands/ovrn-studios') {
                            return (
                              <Link href="/brands/ovrn-studios" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 z-10">
                                <span
                                   className={`font-clash font-bold text-xl tracking-wider ${
                                     isMobileMenuOpen || isLightPage ? 'text-black' : 'text-white'
                                   }`}
                                 >
                                  OVRN Studio
                                </span>
                              </Link>
                            );
                          }
                          // MergeX Academy brand page
                          if (pathname === '/brands/academy') {
                            return (
                              <Link href="/brands/academy" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                                <span className={`text-[14px] leading-none whitespace-nowrap ${isMobileMenuOpen || isLightPage ? 'text-black' : 'text-white'}`}>
                                  <span className="font-clash font-bold tracking-wide">MergeX</span>
                                  {' '}
                                  <span className="font-clash font-thin tracking-wide">Academy</span>
                                </span>
                              </Link>
                            );
                          }
                          // MergeX brand page — logo + MERGEX (keep as-is)
                          if (pathname === '/brands/mergex') {
                            return (
                              <Link href="/brands/mergex" className={`absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 z-10 ${isDetailPage ? 'opacity-0 pointer-events-none' : ''}`}>
                                <Image
                                  src="/logo/mergex-logo.png"
                                  alt="MergeX Logo"
                                  width={40}
                                  height={40}
                                  className={`object-contain transition-all duration-300 ${isMobileMenuOpen || isLightPage ? '' : 'brightness-0 invert'}`}
                                />
                                <span
                                  className={`font-clash font-bold text-2xl tracking-wide ${isMobileMenuOpen || isLightPage ? 'text-black' : 'text-white'}`}
                                >
                                  MERGEX
                                </span>
                              </Link>
                            );
                          }
                          return (
                            <Link href="/" className={`absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10 ${isDetailPage ? 'opacity-0 pointer-events-none' : ''}`}>
                              <span className={`text-[13px] leading-none tracking-tight select-none whitespace-nowrap ${isMobileMenuOpen || isLightPage ? 'text-black' : 'text-white'}`}>
                                <span className="font-serif italic font-normal mr-0.5">The</span>
                                {' '}
                                <span className="font-clash font-bold tracking-wide">MERGEX</span>
                                <span className="font-serif italic font-normal"> Company</span>
                              </span>
                            </Link>
                          );
                        })()}

                        {/* Right: Login Icon */}
                        <Link
                            href="/login"
                            className={`p-2 -mr-2 z-10 flex items-center justify-center ${
                                isMobileMenuOpen || isLightPage ? 'text-black' : 'text-white'
                            } transition-colors hover:opacity-70`}
                            aria-label="Login"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </motion.div>

            <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} pathname={pathname} />
        </>
    );
}
