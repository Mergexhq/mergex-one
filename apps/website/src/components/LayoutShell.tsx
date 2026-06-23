'use client';

import { type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { LenisProvider } from '@/lib/lenis-provider';
import MainRevealWrapper from '@/components/MainRevealWrapper';
import FooterRevealWrapper from '@/components/FooterRevealWrapper';
import { Navbar } from '@/components/layout/Header/Navbar';

const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: true,
});

const FooterCurtain = dynamic(() => import('@/components/FooterCurtain'), {
    ssr: true,
});

// Loaded client-side only - uses localStorage, SpeechSynthesis, and window events
const AskMergeXWidget = dynamic(() => import('@/components/ask-mergex'), {
    ssr: false,
});

/**
 * LayoutShell - wraps every page with Navbar, Footer curtain reveal,
 * and the global AskMergeXWidget floating button.
 */
export default function LayoutShell({ children }: { children: ReactNode }) {
    const pathname = usePathname() || '';
    
    const isLoginPage = pathname === '/login';
    if (isLoginPage) {
        return <>{children}</>;
    }
    
    // Check if the current route is a detail page for insights or case studies
    const segments = pathname.split('/').filter(Boolean);
    const isInsightsDetail = segments[0] === 'insights' && segments.length === 2 && segments[1] !== 'case-studies';
    const isCaseStudyDetail = segments[0] === 'insights' && segments[1] === 'case-studies' && segments.length === 3;
    const isDetailPage = isInsightsDetail || isCaseStudyDetail;

    return (
        <LenisProvider>
            <Navbar />
            {/* Main content + Footer */}
            <MainRevealWrapper>
                {children}
                {!isDetailPage && <Footer />}
            </MainRevealWrapper>
            {/* Footer curtain pinned behind main content */}
            {!isDetailPage && (
                <FooterRevealWrapper>
                    <FooterCurtain />
                </FooterRevealWrapper>
            )}
            {/* Global AI widget - visible on every page */}
            {!isDetailPage && <AskMergeXWidget />}
        </LenisProvider>
    );
}

