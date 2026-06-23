'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronRight } from 'lucide-react';
import { GUIDED_QUESTIONS } from './types';
import { getGuidedRecommendation } from './utils';

interface GuidedFlowProps {
    guidedStep: number;
    guidedAnswers: string[];
    leadData: { name: string; email: string; company: string };
    onAnswer: (value: string) => void;
    onLeadChange: (data: { name: string; email: string; company: string }) => void;
    onLeadSubmit: (e: React.FormEvent) => void;
    onSkipLead: () => void;
    onClose: () => void;
    onClosePanel: () => void;
}

export function GuidedFlow({
    guidedStep,
    guidedAnswers,
    leadData,
    onAnswer,
    onLeadChange,
    onLeadSubmit,
    onSkipLead,
    onClose,
    onClosePanel,
}: GuidedFlowProps) {
    const recommendation = getGuidedRecommendation(guidedAnswers);

    return (
        <motion.div
            key="guided"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
        >
            {/* Steps 0-2: Questions */}
            {guidedStep < 3 ? (
                <>
                    <div className="flex justify-between items-center mb-5">
                        <p className="text-[10px] font-bold text-violet-500 uppercase tracking-widest">
                            Question {guidedStep + 1} of 3
                        </p>
                        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <p className="text-[15px] font-bold text-white mb-4">
                        {GUIDED_QUESTIONS[guidedStep].question}
                    </p>
                    <div className="space-y-2">
                        {GUIDED_QUESTIONS[guidedStep].options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => onAnswer(opt.value)}
                                className="w-full text-left px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/5 text-[12px] font-medium text-white/70 hover:text-violet-300 transition-all flex items-center justify-between group"
                            >
                                {opt.label}
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-violet-400" />
                            </button>
                        ))}
                    </div>
                </>
            ) : guidedStep === 3 ? (
                /* Step 3: Lead capture */
                <div className="text-left py-2">
                    <div className="flex justify-between items-center mb-5">
                        <p className="text-[10px] font-bold text-violet-500 uppercase tracking-widest">Last Step</p>
                        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <p className="text-[15px] font-bold text-white mb-2">Want help with this?</p>
                    <p className="text-[12px] text-white/50 mb-4">
                        Leave your details and we'll send a quick plan specific to your answers.
                    </p>
                    <form onSubmit={onLeadSubmit} className="space-y-2.5 mb-3">
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            value={leadData.name}
                            onChange={e => onLeadChange({ ...leadData, name: e.target.value })}
                            className="input-field"
                        />
                        <input
                            type="email"
                            placeholder="Work Email"
                            required
                            value={leadData.email}
                            onChange={e => onLeadChange({ ...leadData, email: e.target.value })}
                            className="input-field"
                        />
                        <button
                            type="submit"
                            className="btn-accent w-full mt-1"
                        >
                            Get My Custom Plan
                        </button>
                    </form>
                    <button
                        onClick={onSkipLead}
                        className="w-full text-center text-[11px] text-white/40 hover:text-white font-medium pb-2 transition-colors"
                    >
                        Skip & see recommendation →
                    </button>
                </div>
            ) : (
                /* Step 4: Results */
                <div className="text-center py-4">
                    <div className="w-12 h-12 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <img
                            src="/icons/sparkle-star.webp"
                            alt="Sparkles"
                            className="w-6 h-6 opacity-80 object-contain animate-pulse"
                        />
                    </div>
                    <p className="text-[15px] font-bold text-white mb-2">{recommendation.title}</p>
                    <p className="text-[12px] text-white/50 leading-relaxed mb-6">{recommendation.desc}</p>
                    <div className="flex flex-col gap-2 mb-3">
                        <Link
                            href={recommendation.cta1.href}
                            onClick={onClosePanel}
                            className="block w-full py-3 bg-violet-600 text-white rounded-xl font-bold text-[12px] hover:bg-violet-500 transition-all"
                        >
                            {recommendation.cta1.label}
                        </Link>
                        <Link
                            href={recommendation.cta2.href}
                            onClick={onClosePanel}
                            className="block w-full py-3 bg-white/[0.03] border border-white/10 text-white rounded-xl font-bold text-[12px] hover:bg-white/[0.08] hover:border-white/20 transition-all"
                        >
                            {recommendation.cta2.label}
                        </Link>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[12px] text-white/40 font-medium hover:text-white transition-colors"
                    >
                        Back to Chat
                    </button>
                </div>
            )}
        </motion.div>
    );
}
