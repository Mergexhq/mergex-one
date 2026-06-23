import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mergex.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    /* ── Core Pages ──────────────────────────────────────── */
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact/diagnostic`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/methodology`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/careers`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },

    /* ── Brands ──────────────────────────────────────────── */
    {
      url: `${siteUrl}/brands`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/brands/mergex`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/brands/academy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/brands/ovrn-studios`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    /* ── Insights ────────────────────────────────────────── */
    {
      url: `${siteUrl}/insights`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/insights/case-studies`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    /* ── Legal & Utility ─────────────────────────────────── */
    {
      url: `${siteUrl}/sitemap`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-of-use`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
