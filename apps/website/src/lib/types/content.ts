// ─── Content Types ───────────────────────────────────────────────────────────

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  featured: boolean;
  coverImage?: string;
  tags: string[];
  aiOverview: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  excerpt: string;
  featured: boolean;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  aiOverview: string;
  challenge: string;
  diagnosis: string;
  strategy: string;
  outcome: string;
  clientNote?: string;
  metrics?: { label: string; value: string }[];
};
