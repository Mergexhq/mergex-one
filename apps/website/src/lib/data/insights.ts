import type { Insight } from '@/lib/types/content';

export const INSIGHTS: Insight[] = [
  {
    slug: 'diagnose-before-you-build',
    title: 'Diagnose Before You Build',
    excerpt:
      'Most scaling failures are not execution failures. They are diagnostic failures - teams building the wrong things faster. The most effective operators always start with a clear picture of the constraint, not a solution.',
    category: 'Systems',
    readTime: '6 min read',
    publishedAt: '2026-05-10',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
    tags: ['Strategy', 'Systems Thinking', 'Diagnostics'],
    aiOverview:
      'This insight argues that reactive execution - building solutions before understanding the underlying constraint - is the leading cause of scaling plateau. It introduces a diagnostic-led framework that MergeX applies across every engagement, starting with the S.C.A.L.E. Scan phase.',
    body: `
## The Problem with Execution-First Thinking

When a business hits a growth plateau, the instinctive response is to do more. Hire more people. Run more campaigns. Add more features. Ship faster.

But in almost every case we encounter, the problem is not a lack of effort. It is a lack of clarity about what is actually broken.

**Execution without diagnosis is organised noise.**

---

## What Diagnostic-Led Means in Practice

A diagnostic-led approach inverts the typical strategy process:

1. **Stop before you prescribe.** Resist the pressure to propose solutions immediately.
2. **Map the system, not just the symptoms.** Revenue is down - but why? Leads are down? Conversion is down? Retention is down? Each has a completely different fix.
3. **Find the leverage point.** In every business system, one constraint is limiting everything else. Address that first.
4. **Build the solution to fit the constraint** - not the solution you already know how to build.

---

## The MergeX Diagnostic Framework

At MergeX, we call the first phase of every engagement the Scan. It is a structured, intensive diagnostic covering five operational layers:

- **Revenue architecture** - Where does money come from, and why?
- **Sales motion** - How does the business convert attention to commitment?
- **Operational capacity** - What is the team actually capable of at current load?
- **Product-market alignment** - Is the offer still relevant to the buyer's real pain?
- **Leadership clarity** - Does the founding team have a shared theory of the business?

Most businesses have strong clarity in one or two of these. Almost none have all five aligned.

---

## Why This Changes Everything

When you find the real constraint, three things happen:

1. You stop investing in the wrong levers.
2. The team stops arguing about tactics and aligns around a shared understanding.
3. Progress becomes compounding instead of incremental.

The difference between a business that scales and one that stalls is rarely talent or capital. It is almost always the quality of the diagnosis.

---

## The Practical Takeaway

Before your next strategic initiative, ask:

> *"Are we solving the right problem, or just solving the problem we can see?"*

If you cannot answer that with confidence, you need a diagnostic before you need a plan.
    `.trim(),
  },
  {
    slug: 'the-five-leverage-points-of-operational-scale',
    title: 'The Five Leverage Points of Operational Scale',
    excerpt:
      'Scaling a business is not about doing more of everything. It is about identifying the five specific leverage points where focused intervention compounds across the entire system.',
    category: 'Operations',
    readTime: '8 min read',
    publishedAt: '2026-04-28',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    tags: ['Operations', 'Scale', 'Leverage', 'Framework'],
    aiOverview:
      'This insight presents a five-part framework for identifying where to intervene in a scaling organisation. It covers offer clarity, sales sequencing, delivery capacity, data infrastructure, and leadership bandwidth - and explains why fixing the wrong lever can actually slow growth.',
    body: `
## Not Everything Compounds

One of the most damaging myths in business is that growth is cumulative - that doing more of anything good will eventually compound into scale.

It does not work that way.

In complex systems, growth compounds only when you are investing at the right leverage points. Invest in the wrong place - even with the right effort - and you get fragmented progress that never composes into durable scale.

---

## The Five Leverage Points

After working across dozens of businesses in different sectors and stages, MergeX has identified five consistent leverage points that determine whether a business scales or stalls.

### 1. Offer Clarity

The most common scaling constraint is not sales. It is an unclear offer.

When a business cannot describe what it does, who it is for, and why it is different in one sentence - the entire commercial engine suffers. Marketing cannot generate the right leads. Sales cannot convert them. Delivery cannot retain them.

**Lever question:** Can every person in the business describe the offer the same way?

### 2. Sales Sequencing

Most businesses have a sales process. Very few have a sales sequence - a designed, repeatable path from first contact to signed commitment.

The difference is intentionality. A sequence is tested, documented, and improvable. A process is often tribal knowledge that only works when the founder is in the room.

**Lever question:** Could a new hire follow your sales process to a close in 30 days?

### 3. Delivery Capacity

Growth creates delivery pressure. Delivery pressure creates quality decline. Quality decline creates churn. Churn destroys the economics of growth.

This cycle is the most common cause of stalled expansion in service businesses. The fix is not hiring - it is building a delivery system before you need it.

**Lever question:** If you doubled revenue next month, could you deliver without degrading quality?

### 4. Data Infrastructure

Scaling without data is flying blind. But data infrastructure does not mean a complex analytics stack - it means knowing, with confidence, what is happening in your business right now.

Revenue by channel. Lead conversion rates. Client health scores. Gross margin by service line. If you cannot answer these questions in under ten minutes, you are making strategic decisions on instinct.

**Lever question:** What are your five most important numbers, and can you pull them in real time?

### 5. Leadership Bandwidth

The most underrated constraint on growth is the founder's time. Not their energy or ambition - their time for the right activities.

Most founders we work with are spending 60–80% of their time on work that could be delegated or systemised. That leaves a fraction of their capacity for the strategic decisions only they can make.

**Lever question:** What percentage of your week is spent on work only you can do?

---

## How to Use This Framework

Start by auditing each of the five areas with brutal honesty. Score each one from 1 to 10.

The lowest score is almost always where your scaling constraint lives. That is where to intervene first - not the area you feel most comfortable in.

Scaling is not about being strong across all five. It is about not being critically weak in any one of them.
    `.trim(),
  },
  {
    slug: 'the-architecture-of-decision-making',
    title: 'The Architecture of Decision Making',
    excerpt: 'Speed of execution is downstream of decision architecture. How to build frameworks that allow teams to move fast without breaking alignment.',
    category: 'Structure',
    readTime: '5 min read',
    publishedAt: '2026-05-15',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1600267185393-e158a98703de?q=80&w=2070&auto=format&fit=crop',
    tags: ['Structure', 'Leadership', 'Decision Making'],
    aiOverview: 'An overview of how structured decision-making accelerates growth by removing friction and increasing clarity across an organisation.',
    body: [
      '## Decision Speed is the Ultimate Moat',
      '',
      'The faster you can make good decisions, the faster you can learn. In any competitive market, the organisation that learns the fastest wins.',
      '',
      'But speed without structure is chaos. This is why scaling companies often slow down intentionally - because moving fast starts to feel dangerous.',
      '',
      '## Rebuilding the Architecture',
      '',
      'To regain speed, you do not need more meetings. You need a better decision architecture.',
      '',
      '- Define who owns the decision.',
      '- Define what information is required.',
      '- Define the threshold for acting (it is usually 70% certainty, not 100%).',
      '',
      'Once this architecture is in place, execution velocity becomes a natural byproduct.',
    ].join('\n'),
  }
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return INSIGHTS.find((i) => i.slug === slug);
}

export function getFeaturedInsights(): Insight[] {
  return INSIGHTS.filter((i) => i.featured);
}

export function getRelatedInsights(currentSlug: string, category: string): Insight[] {
  return INSIGHTS.filter((i) => i.slug !== currentSlug && i.category === category).slice(0, 2);
}
