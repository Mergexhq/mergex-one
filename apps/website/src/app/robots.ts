import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mergex.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/console/',   // Sanity Studio proxy
          '/api/',       // API routes
          '/_next/',     // Next.js internals
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
