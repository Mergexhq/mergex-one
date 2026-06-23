import type { Metadata } from 'next';
import {
    ContactHero,
    GeneralInquirySection,
} from '@/modules/contact';

export const metadata: Metadata = {
    title: 'Contact | The MergeX Company',
    description:
        'Get in touch with MergeX for general inquiries. We build selective partnerships for businesses serious about scaling.',
    alternates: {
        canonical: 'https://mergex.in/contact',
    },
    openGraph: {
        title: 'Contact | The MergeX Company',
        description:
            'Get in touch with MergeX for general inquiries. We build selective partnerships for businesses serious about scaling.',
    },
};

export default function ContactPage() {
    return (
        <main className="bg-[#F3F3F3]">
            <ContactHero />
            <GeneralInquirySection />
        </main>
    );
}
