import type { CaseStudy } from '@/lib/types/content';

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'd2c-operational-restructure',
    title: 'D2C Operational Restructure',
    client: 'Confidential - D2C Retail Brand',
    industry: 'Retail / E-commerce',
    excerpt:
      'A direct-to-consumer brand had grown from £0 to £4M in 18 months - then hit a wall. Margins were collapsing, the team was burning out, and leadership had no clear picture of why. MergeX was brought in to diagnose the system and rebuild it for the next phase.',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    tags: ['Operations', 'Retail', 'Margin Recovery', 'Systems'],
    publishedAt: '2026-04-15',
    aiOverview:
      'This case study covers a D2C brand that scaled rapidly then experienced a margin collapse driven by operational fragmentation. MergeX diagnosed three concurrent failure points - undefined offer hierarchy, an unbounded fulfilment model, and no data infrastructure - and rebuilt each systematically. The result was a 34% improvement in gross margin within 90 days.',
    challenge: `
The client had built a strong product and a loyal early customer base. Revenue had grown quickly, driven by paid social and word-of-mouth. But as the business scaled, cracks emerged everywhere simultaneously.

Margins were declining despite increasing revenue. The operations team was reactive, with no documented process for fulfilment, returns, or supplier management. Customer service was a single inbox shared between two founders. Leadership was making decisions in real time with no data - relying entirely on instinct and historical patterns that no longer applied.

The specific symptoms presented to us:

- Gross margin had declined from 52% to 31% over 12 months
- Average order fulfilment time had increased from 2 to 6 days
- Customer refund rate had climbed to 11%, up from 3%
- The founding team was working 70-hour weeks with no end in sight
    `.trim(),
    diagnosis: `
After a two-week structured Scan, we identified three root causes operating simultaneously - which explained why the team's individual interventions had not resolved anything.

**Root Cause 1: Undefined offer hierarchy.** The brand had expanded from 3 SKUs to 47 over 18 months without a framework for which products to prioritise, promote, or retire. This meant marketing spend was fragmented across low-margin products, and fulfilment complexity was artificially high.

**Root Cause 2: Unbounded fulfilment model.** The business had inherited a manual fulfilment operation from its early days and never restructured it for scale. Every new SKU added disproportionate operational overhead. There was no decision framework for outsourcing vs. retaining.

**Root Cause 3: No data infrastructure.** Leadership was unable to see gross margin by SKU, cohort retention by acquisition channel, or fulfilment cost per order. Decisions were made on revenue and intuition - both of which masked the underlying margin destruction.
    `.trim(),
    strategy: `
We structured the intervention across three parallel workstreams, executed over a 90-day engagement:

**Workstream 1 - Offer rationalisation.** We built a product contribution margin model for every SKU and identified the top 12 by margin and velocity. We recommended retiring 18 low-margin products, and designed a promotion strategy that directed paid spend exclusively to the high-margin tier.

**Workstream 2 - Fulfilment restructure.** We mapped every step in the fulfilment chain, identified the highest-cost manual touchpoints, and designed an outsourced 3PL model for standard orders while retaining in-house control for custom or high-value SKUs. We documented the transition protocol and managed supplier selection.

**Workstream 3 - Data infrastructure.** We built a simple but robust reporting layer covering five critical metrics: gross margin by SKU, refund rate by product, acquisition cost by channel, fulfilment cost per order, and 30/60/90-day cohort retention. This was delivered weekly to leadership via a dashboard built in under two weeks.
    `.trim(),
    outcome: `
The results were measurable and compounding. Within 90 days of implementation:

The business had a clear, documented operational system for the first time in its history. Leadership had weekly visibility into the numbers that mattered. The team was no longer reactive - they had clear ownership, documented processes, and an escalation path for exceptions.

Crucially, the founders recovered approximately 20 hours per week each - time they reinvested into product development and strategic partnerships.
    `.trim(),
    clientNote:
      'MergeX did not just fix the problems we knew about. They found the ones we did not know existed - and built a system that means we can spot them ourselves next time.',
  },
  {
    slug: 'b2b-saas-gtm-rebuild',
    title: 'B2B SaaS Go-To-Market Rebuild',
    client: 'Confidential - B2B SaaS Platform',
    industry: 'Technology / SaaS',
    excerpt:
      'A B2B SaaS platform had strong product-market fit and a growing inbound pipeline - but a sales motion that was converting at 8% and a churn rate that was quietly destroying their expansion economics. MergeX rebuilt the go-to-market architecture from diagnosis to close.',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    tags: ['SaaS', 'Go-To-Market', 'Sales', 'Retention'],
    publishedAt: '2026-03-20',
    aiOverview:
      'This case study covers a B2B SaaS company with clear product-market fit but a broken commercial layer. MergeX identified misaligned positioning, an undefined ICP, and a sales process that relied entirely on founder involvement. The rebuilt GTM motion increased conversion from 8% to 27% and reduced churn by 60% within two quarters.',
    challenge: `
The client had built a genuinely differentiated product in a competitive market. Inbound demand was growing. NPS from existing customers was strong. But the commercial engine was failing.

Trial-to-paid conversion was 8% - low for a product with strong qualitative feedback. The sales process was informal, founder-dependent, and inconsistently followed. Churn in months 3–6 was running at 4% per month, which was quietly destroying the unit economics of every new customer acquired.

The founding team had attributed the conversion problem to pricing and the churn problem to product gaps. Neither assumption turned out to be correct.

Key metrics at engagement start:
- Trial-to-paid conversion: 8%
- Monthly churn (months 3–6): 4.2%
- Average sales cycle: 47 days
- Founder involvement required in: 100% of closes
    `.trim(),
    diagnosis: `
Our diagnostic identified three compounding problems that the team had not connected:

**Problem 1: Undefined ICP.** The product had been sold to anyone who would buy it. The result was a customer base with wildly different use cases, success definitions, and support needs. This made it impossible to build a repeatable sales motion or a predictable onboarding path.

**Problem 2: Positioning misalignment.** The product was being positioned around its feature set rather than its outcome. Prospects could not quickly answer "what will this change for my business?" - which lengthened the evaluation cycle and reduced urgency.

**Problem 3: No onboarding infrastructure.** Customers were converting but not activating. The product had a strong core capability, but new users were not reaching it within their first 14 days. Churn was not a product problem - it was an activation problem disguised as satisfaction data.
    `.trim(),
    strategy: `
We rebuilt the GTM architecture across three phases:

**Phase 1 - ICP definition and segmentation.** We analysed the existing customer base and identified two high-value segments with strong retention and expansion revenue. We defined explicit qualification criteria for each, and restructured the inbound process to qualify against these criteria before entering the sales cycle.

**Phase 2 - Positioning and messaging rebuild.** We redesigned the core positioning around three specific outcomes, each tied to a measurable business result. We updated website copy, trial onboarding emails, and sales call frameworks to lead with outcomes rather than features.

**Phase 3 - Onboarding infrastructure.** We designed a 14-day activation sequence with three mandatory milestones. We built automated nudges for users who had not reached each milestone and created a success playbook for the customer success team. We defined "activated" precisely for the first time - and built reporting to track it weekly.
    `.trim(),
    outcome: `
Within two quarters, the commercial metrics had transformed fundamentally:

The most significant change was structural: the business now had a documented, repeatable GTM system that did not require founder involvement in every deal. This unlocked the ability to hire and train a sales function for the first time.

The churn reduction, in particular, had a compounding effect on the unit economics. At 4.2% monthly churn, the average customer lifetime was approximately 24 months. At 1.7%, it exceeded 58 months - fundamentally changing the viability of paid acquisition channels.
    `.trim(),
    clientNote:
      'We had convinced ourselves the problem was the product. MergeX showed us it was the system around the product. That reframe changed everything.',
    metrics: [
      { label: 'Trial-to-paid conversion', value: '8% → 27%' },
      { label: 'Monthly churn reduction', value: '4.2% → 1.7%' },
      { label: 'Sales cycle reduction', value: '47d → 19d' },
    ],
  },
  {
    slug: 'leadership-growth-strategy',
    title: 'Leadership & Growth Strategy',
    client: 'Confidential - Professional Services Firm',
    industry: 'Professional Services',
    excerpt:
      'A professional services firm had plateaued at £2M ARR for three consecutive years. Growth had stalled, key talent was leaving, and leadership had no coherent strategy for the next phase. MergeX redesigned the organisational structure and built a compounding growth system.',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
    tags: ['Leadership', 'Strategy', 'Organisational Design', 'Growth'],
    publishedAt: '2026-02-10',
    aiOverview:
      'This case study covers a professional services firm stuck in a revenue plateau driven by leadership bandwidth constraints and a fragmented service model. MergeX redesigned the leadership layer, restructured the service offering into three clear tiers, and built a referral and retention engine that unlocked compounding growth.',
    challenge: `
The firm had strong client relationships and a reputable track record. But revenue had not moved in three years, and the founding partners were absorbing every senior client interaction personally - creating a hard ceiling on capacity and growth.

Attrition among mid-level staff was running at 35% annually. The pipeline was entirely relationship-dependent with no structured business development activity. Leadership had discussed a growth strategy in multiple away-days but had never committed to or executed one.

Key conditions at engagement start:
- Revenue plateau: £2M ARR for 36 months
- Senior partner utilisation: 94% (no bandwidth for growth)
- Mid-level attrition: 35% annually
- Pipeline source: 100% referral, no structured outreach
    `.trim(),
    diagnosis: `
Our diagnostic identified three structural problems that reinforced each other:

**Problem 1: Leadership bottleneck.** All client decisions were escalated to the two founding partners. There was no second tier of accountable leadership. This meant the firm's capacity for client work and growth activity was permanently constrained by two people's working hours.

**Problem 2: Undifferentiated service model.** The firm offered a broad range of services without a clear hierarchy or signature offer. Clients and prospects could not quickly understand what the firm was best at. This made referrals imprecise and pitches inconsistent.

**Problem 3: No retention infrastructure.** Mid-level staff were leaving because there was no defined career path, no structured progression criteria, and no visibility into how performance was measured. Attrition was destroying accumulated institutional knowledge every year.
    `.trim(),
    strategy: `
We built the intervention across three interconnected workstreams:

**Workstream 1 - Leadership layer rebuild.** We identified three senior associates ready for principal-level responsibility and designed a formal promotion and accountability structure. We transferred 60% of routine client decisions to this new layer and created a weekly operating rhythm that gave partners visibility without involvement.

**Workstream 2 - Service model rationalisation.** We defined a three-tier service structure: a diagnostic entry offer, a signature engagement, and a retained advisory model. We rebuilt the firm's positioning around the signature engagement and created sales materials for the first time.

**Workstream 3 - Retention and progression system.** We built a formal competency framework with clear promotion criteria, introduced quarterly structured reviews, and created a profit-sharing model tied to client retention. Attrition dropped to 9% within two quarters.
    `.trim(),
    outcome: `
Within 12 months of implementation, the firm had broken through its revenue plateau decisively.

The structural change to the leadership layer was the highest-leverage intervention: it freed the founding partners to spend 30% of their time on growth activity for the first time in the firm's history. Within six months, they had closed two new retained clients - adding £380K ARR - entirely through structured business development rather than opportunistic referrals.
    `.trim(),
    clientNote:
      'We had been talking about growing for years. MergeX showed us that we had built a structure that made growth impossible - and then rebuilt it so growth was the natural outcome.',
    metrics: [
      { label: 'ARR growth (12 months)', value: '+£620K' },
      { label: 'Mid-level attrition reduction', value: '35% → 9%' },
      { label: 'Partner capacity freed', value: '+30%' },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.featured);
}

export function getRelatedCaseStudies(currentSlug: string, industry: string): CaseStudy[] {
  return CASE_STUDIES.filter(
    (cs) => cs.slug !== currentSlug && cs.industry === industry
  ).slice(0, 2);
}
