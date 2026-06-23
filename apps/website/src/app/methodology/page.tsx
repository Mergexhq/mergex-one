import type { Metadata } from 'next';
import {
    MethodologyHero,
    MarketFailure,
    ScaleMethodology,
    PrescriptionModel,
    MethodologyInsights,
    MethodologyCTA,
} from '@/modules/methodology/components';
import './methodology.css';

export const metadata: Metadata = {
    title: 'Methodology - The MergeX Company',
    description:
        'The S.C.A.L.E. Methodology - MergeX\'s proprietary diagnostic methodology for identifying and resolving the real constraints holding your business back from scaling.',
};

export default function MethodologyPage() {
    return (
        <main className="methodology-page">
            {/* 01 - Hero */}
            <MethodologyHero />

            {/* 02 - Why Scale Breaks */}
            <MarketFailure />

            {/* 03 - The S.C.A.L.E. Methodology */}
            <ScaleMethodology />

            {/* 04 - The Prescription Model */}
            <PrescriptionModel />

            {/* 05 - Selected Insights */}
            <MethodologyInsights />

            {/* 06 - Final CTA */}
            <MethodologyCTA />
        </main>
    );
}
