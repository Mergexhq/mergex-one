'use client';

import { motion } from 'framer-motion';
import { SUGGESTIONS } from './types';

interface ChatWelcomeProps {
    onStartGuided: () => void;
    onSend: (text: string) => void;
}

export function ChatWelcome({ onSend }: ChatWelcomeProps) {
    return (
        <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-start text-left pt-5 pb-4 select-none px-2"
        >
            <h2 className="text-[18px] font-semibold text-[#F3F3F5] mb-2 leading-snug tracking-wide">
                Describe the business problem.
            </h2>
            <p className="text-[13px] text-[#A1A1AA] mb-8 leading-relaxed max-w-[340px]">
                MergeX Intelligence helps identify operational, structural, and execution constraints affecting scale.
            </p>

            <p className="text-[10px] font-semibold text-[#71717A] uppercase tracking-[0.18em] mb-3">
                Common starting points
            </p>

            {/* Suggestion list */}
            <div className="flex flex-col gap-2.5 w-full">
                {SUGGESTIONS.map((s, i) => (
                    <motion.button
                        key={i}
                        onClick={() => onSend(s)}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05 }}
                        className="text-left text-[12.5px] font-normal text-[#A1A1AA] hover:text-[#F3F3F5] hover:translate-x-1.5 transition-all group flex items-start gap-2 cursor-pointer py-0.5"
                    >
                        <span className="text-violet-500/80 group-hover:text-violet-400 mt-1 shrink-0">•</span>
                        <span className="leading-snug">{s}</span>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}
