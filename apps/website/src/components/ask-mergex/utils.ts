import { Session, MAX_SESSIONS, SESSIONS_KEY, INTENT_WORDS } from './types';

// ─── Session Helpers ──────────────────────────────────────────────────────────
export function createSession(): Session {
    return {
        id: `session-${Date.now()}`,
        title: 'New Conversation',
        createdAt: Date.now(),
        messages: [],
    };
}

export function loadSessions(): Session[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(SESSIONS_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as Session[];
    } catch {
        return [];
    }
}

export function saveSessions(sessions: Session[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.slice(0, MAX_SESSIONS)));
}

// ─── Date Formatter ───────────────────────────────────────────────────────────
export function formatDate(ts: number) {
    const diff = Date.now() - ts;
    if (diff < 60_000) return 'Just now';
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
    return `${Math.floor(diff / 86_400_000)}d ago`;
}

// ─── Topic CTAs ───────────────────────────────────────────────────────────────
export function getTopicCTAs(text: string) {
    const lower = text.toLowerCase();
    const ctas: { label: string; href: string }[] = [];
    if (lower.match(/automation|workflow|scaling|platform|system|architecture/))
        ctas.push({ label: 'View MergeX Systems', href: '/systems' });
    if (lower.match(/visual|ai|avatar|creative|media|generative|labs/))
        ctas.push({ label: 'View MergeX Labs', href: '/labs' });
    if (lower.match(/pricing|cost|budget|how much/))
        ctas.push({ label: 'View Pricing', href: '/pricing' });
    if (ctas.length === 0) ctas.push({ label: 'Talk to Our Team', href: '/contact' });

    if (!ctas.some(c => c.href === '/contact') && ctas.length < 2) {
        ctas.push({ label: 'Talk to Our Team', href: '/contact' });
    }

    return ctas.slice(0, 2);
}

// ─── Guided Recommendation ────────────────────────────────────────────────────
export function getGuidedRecommendation(guidedAnswers: string[]) {
    const systemsVotes = guidedAnswers.filter(a =>
        ['systems', 'scaling', 'planning', 'building'].includes(a)
    ).length;
    const labsVotes = guidedAnswers.filter(a => ['labs', 'explore'].includes(a)).length;
    const isSystems = systemsVotes >= labsVotes;

    return isSystems
        ? {
            title: 'Based on what you shared, MergeX Systems is the best fit.',
            desc: 'We design and build scalable digital infrastructure, automation pipelines, and AI-enabled systems.',
            cta1: { label: 'Explore MergeX Systems', href: '/systems' },
            cta2: { label: 'Book a Strategy Call', href: '/contact' },
        }
        : {
            title: 'Looks like MergeX Labs is the right place for you.',
            desc: 'Labs is where we experiment with generative AI, creative automation, and digital experiences.',
            cta1: { label: 'Explore MergeX Labs', href: '/labs' },
            cta2: { label: 'Start a Creative Project', href: '/contact' },
        };
}

// ─── API ──────────────────────────────────────────────────────────────────────
export async function callChatAPI(text: string): Promise<string> {
    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }),
        });
        const data = await res.json();
        return data.answer || 'Something went wrong. Please try again.';
    } catch {
        return 'Unable to connect. Please try again in a moment.';
    }
}

// ─── Special command answers ──────────────────────────────────────────────────
export function getCommandAnswer(text: string): string | null {
    if (text.toLowerCase() === 'priority') {
        return `**Priority Architect Access - ₹299**\n\nYou can unlock priority access here:\n\n[Unlock Priority Access →](https://rzp.io/l/mergex-priority)\n\nThis gives you:\n- **Immediate attention** from a MergeX architect\n- **Skip the queue** - no waiting\n- **Direct review** of your project or system\n\n**₹299 is fully credited toward your project if we work together.**\n\nAfter payment, schedule your priority session at:\n[cal.com/mergex/priority](https://cal.com/mergex/priority)\n\n*We only accept a limited number of architecture projects each month.*`;
    }
    if (text.toLowerCase() === 'connect') {
        return `Here are two ways to connect with our team:\n\n---\n\n**Discovery Call** - Free\n\nSchedule a call with our team. Ideal for most projects.\n\n[Schedule a Free Call →](https://cal.com/mergex/discovery)\n\n---\n\n**Priority Architect Access** - ₹299\n\nSkip the queue and get immediate attention from a MergeX architect. ₹299 is fully credited toward your project if we work together.\n\nType **"priority"** and I'll send the access link.\n\n*We only accept a limited number of architecture projects each month.*`;
    }
    return null;
}

// ─── Intent detection ─────────────────────────────────────────────────────────
export function hasUserIntent(text: string): boolean {
    return INTENT_WORDS.some(word => text.toLowerCase().includes(word));
}
