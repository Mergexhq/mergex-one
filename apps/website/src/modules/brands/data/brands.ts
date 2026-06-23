export type BrandStatus = 'Active' | 'In Development' | 'Research Phase';

export type Brand = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string; // how it fits in the ecosystem
  focusAreas: string[];
  status: BrandStatus;
  href: string;
  externalHref?: string;
  layer: string; // which operational layer it lives in
};

export const BRANDS: Brand[] = [
  {
    slug: 'mergex',
    name: 'MergeX',
    tagline: 'Business Consulting',
    description:
      'MergeX helps businesses improve operations, branding, technology, and growth systems through structured consulting built for scalable execution.',
    role:
      'Structured consulting built to improve operations, branding, technology, and growth systems.',
    focusAreas: ['Systems Design', 'Strategy', 'Sales Architecture', 'Operations', 'Commercial Clarity'],
    status: 'Active',
    href: '/brands/mergex',
    layer: 'Core Infrastructure',
  },
  {
    slug: 'ovrn-studios',
    name: 'OVRN Studios',
    tagline: 'Creative Production',
    description:
      'OVRN creates commercial visuals, branded content, and production systems designed for modern digital brands.',
    role:
      'Focused premium visual production, branded content, and creative systems.',
    focusAreas: ['Brand Strategy', 'Identity Design', 'Positioning', 'Content Systems', 'Creative Direction'],
    status: 'Active',
    href: '/brands/ovrn-studios',
    layer: 'Creative Infrastructure',
  },
  {
    slug: 'academy',
    name: 'MergeX Academy',
    tagline: 'Education Infrastructure',
    description:
      'MergeX Academy delivers business and creator-focused education designed for modern industries and scalable digital careers.',
    role:
      'Structured business and creator-focused education built for scalable modern careers.',
    focusAreas: ['Training Programs', 'Capability Development', 'Knowledge Systems', 'Enablement', 'Frameworks'],
    status: 'In Development',
    href: '/brands/academy',
    layer: 'Knowledge Infrastructure',
  },
];
