import type { Metadata } from 'next';
import {
    DiagnosticSection,
} from '@/modules/contact';

export const metadata: Metadata = {
    title: 'Request a Diagnostic | The MergeX Company',
    description:
        'MergeX begins with diagnosis before execution. Request a structured diagnostic assessment for your business.',
    openGraph: {
        title: 'Request a Diagnostic | The MergeX Company',
        description:
            'Start with the constraint. MergeX is a diagnosis-first scaling partner for businesses serious about structural growth.',
    },
};

export default function DiagnosticPage() {
    return (
        <main className="bg-[#F3F3F3]">
            <DiagnosticSection />
        </main>
    );
}
