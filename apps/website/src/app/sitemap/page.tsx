import type { Metadata } from 'next';
import SitemapContent from './SitemapContent';

export const metadata: Metadata = {
    title: 'Sitemap | The MergeX Company',
    description:
        'Browse the full structure of the MergeX website - all pages, brands, insights, and resources in one place.',
    alternates: {
        canonical: 'https://mergex.in/sitemap',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function SitemapPage() {
    return <SitemapContent />;
}
