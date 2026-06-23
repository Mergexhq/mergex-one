// Contact Page Content
// MergeX - Qualification & Diagnostic Entry Point

export const CONTACT_HERO = {
    headline: "Let's Get Started.",
    subheadline: 'Every business wants growth. Few know what is actually preventing it. Every MergeX consulting engagement begins with diagnosing the real constraint - before any solution is prescribed.',
} as const;

export const UNIFIED_FORM = {
    eyebrow: 'General Inquiry',
    heading: 'Tell us about your business.',
    subtext: 'Submit your inquiry below for a professional assessment. We prioritize high-intent submissions and respond within 48 hours.',
    inquiryTypes: [
        'Request a Diagnostic',
        'Partnership Inquiry',
        'Careers',
        'General Inquiry',
    ],
    // - Diagnostic fields
    industries: [
        'Technology & Software',
        'E-Commerce & Retail',
        'Professional Services',
        'Healthcare & Wellness',
        'Education & Training',
        'Finance & Fintech',
        'Manufacturing & Logistics',
        'Media & Entertainment',
        'Real Estate',
        'Other',
    ],
    companySizes: ['Solo', '2–10', '11–50', '51+'],
    revenueRanges: [
        'Pre-revenue',
        'Under ₹10L',
        '₹10L – ₹50L',
        '₹50L – ₹1Cr',
        '₹1Cr+',
    ],
    areasOfInterest: [
        'Technology',
        'Branding',
        'Marketing',
        'Sales',
        'Operations',
        'AI Automation',
        'Not Sure Yet',
    ],
    // - Partnership fields
    partnershipTypes: [
        'Strategic Partnership',
        'Agency Collaboration',
        'Vendor / Service Provider',
        'Technology Partnership',
        'Investor / Investment',
        'Media / Community',
        'Other',
    ],
    // - Careers fields
    applyingFor: [
        'Internship',
        'Full-Time Role',
        'Freelance / Contract',
        'Open Application',
    ],
    careerAreas: [
        'Design',
        'Branding',
        'Marketing',
        'Technology',
        'Operations',
        'Sales',
        'Strategy',
        'Other',
    ],
    // - General Inquiry fields
    inquiryCategories: [
        'General Question',
        'Support',
        'Media',
        'Feedback',
        'Other',
    ],
} as const;

export const DIAGNOSTIC_FORM = {
    eyebrow: 'INQUIRY',
    heading: 'Request a Diagnostic.',
    subtext: 'Submit your diagnostic request below. We review every submission internally to identify constraints before engagement.',
    ctaText: 'Submit Diagnostic Request',
    industries: [
        'Technology & Software',
        'E-Commerce & Retail',
        'Professional Services',
        'Healthcare & Wellness',
        'Education & Training',
        'Finance & Fintech',
        'Manufacturing & Logistics',
        'Media & Entertainment',
        'Real Estate',
        'Other',
    ],
    companySizes: ['Solo', '2–10', '11–50', '51+'],
    revenueRanges: [
        'Pre-revenue',
        'Under ₹10L',
        '₹10L – ₹50L',
        '₹50L – ₹1Cr',
        '₹1Cr+',
    ],
    areasOfInterest: [
        'Technology',
        'Branding',
        'Marketing',
        'Sales',
        'Operations',
        'AI Automation',
        'Not Sure Yet',
    ],
} as const;

// Alias used by ContactForm.tsx
export const CONTACT_FORM = {
    ctaText: 'Submit Inquiry',
    inquiryTypes: [
        'Request a Diagnostic',
        'Partnership Inquiry',
        'Careers',
        'General Inquiry',
    ],
    revenueRanges: [
        'Pre-revenue',
        'Under ₹10L',
        '₹10L – ₹50L',
        '₹50L – ₹1Cr',
        '₹1Cr+',
    ],
    teamSizes: ['Solo', '2–10', '11–50', '51+'],
} as const;

export const CONTACT_NEXT_STEPS = {
    headline: 'What happens next',
    steps: [
        { number: '01', description: 'We review your submission and identify the core constraint pattern.' },
        { number: '02', description: 'A senior consulting team member reaches out within 48 hours with an initial diagnostic assessment.' },
        { number: '03', description: 'If there is a clear fit, we schedule a structured diagnostic consultation to map the constraint.' },
    ],
} as const;
