import type { Metadata } from 'next';
import {
    CareersHero,
    WhoThrivesHere,
    OpportunitiesSection,
} from '@/modules/careers';

export const metadata: Metadata = {
    title: "Careers | The MergeX Company",
    description:
        "Join MergeX and build real infrastructure for growing companies. Explore full-time roles, internships, and opportunities to work on systems that matter.",
    alternates: {
        canonical: 'https://mergex.in/careers',
    },
    openGraph: {
        title: "Careers | The MergeX Company",
        description:
            "Don't just work. Build. Explore career opportunities at MergeX - where builders ship real systems.",
    },
};

export default function CareersPage() {
    return (
        <main className="bg-[#F3F3F3]">
            <CareersHero />
            <WhoThrivesHere />
            <OpportunitiesSection />
        </main>
    );
}
