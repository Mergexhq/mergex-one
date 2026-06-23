'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Volume2, VolumeX } from 'lucide-react';
import { MergeXOrb } from '@/components/ui/mergex-orb';
import { cn } from '@/lib/utils';
import { Message } from './types';
import { getTopicCTAs } from './utils';
import { ArrowRight } from 'lucide-react';

// ─── TypingDots ───────────────────────────────────────────────────────────────
function TypingDots() {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3].map((d) => (
                <motion.div
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-violet-500"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.15, ease: 'easeInOut' }}
                />
            ))}
        </div>
    );
}

interface ChatMessagesProps {
    messages: Message[];
    isTyping: boolean;
    speakingId: string | null;
    onToggleSpeech: (id: string, text: string) => void;
    onClosePanel: () => void;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatMessages({
    messages,
    isTyping,
    speakingId,
    onToggleSpeech,
    onClosePanel,
    messagesEndRef,
}: ChatMessagesProps) {
    return (
        <div className="space-y-4">
            {messages.map((msg, idx) => (
                <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {msg.role === 'user' ? (
                        <div className="flex justify-end">
                            <div className="max-w-[80%] bg-linear-to-b from-violet-300 to-violet-800 text-white rounded-2xl rounded-br-md px-4 py-2.5 text-[13px] leading-relaxed shadow-lg shadow-violet-500/10">
                                {msg.content}
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2.5">
                            <div className="shrink-0 mt-0.5">
                                <MergeXOrb size={22} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-[10px] font-bold text-violet-500 uppercase tracking-wider">
                                        MergeX Intelligence
                                    </p>
                                    <button
                                        onClick={() => onToggleSpeech(msg.id, msg.content)}
                                        className={cn(
                                            'p-1.5 rounded-lg transition-all',
                                            speakingId === msg.id
                                                ? 'bg-violet-500/20 text-violet-300 scale-110'
                                                : 'text-white/30 hover:text-white hover:bg-white/10'
                                        )}
                                    >
                                        {speakingId === msg.id
                                            ? <VolumeX className="w-3 h-3" />
                                            : <Volume2 className="w-3 h-3" />
                                        }
                                    </button>
                                </div>
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl rounded-bl-md px-4 py-3 text-[13.5px] text-white/90 leading-relaxed shadow-sm">
                                    <div className="markdown-content prose-sm max-w-none">
                                        <ReactMarkdown
                                            components={{
                                                a: ({ node, ...props }) => {
                                                    const label =
                                                        typeof props.children === 'string' && props.children.startsWith('/')
                                                            ? props.children.substring(1)
                                                            : props.children;
                                                    return (
                                                        <Link
                                                            href={props.href || '#'}
                                                            className="text-violet-400 font-bold hover:underline"
                                                            onClick={(e) => { e.stopPropagation(); onClosePanel(); }}
                                                        >
                                                            {label}
                                                        </Link>
                                                    );
                                                },
                                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                                                em: ({ children }) => <em className="italic text-white/85">{children}</em>,
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>

                                {/* Inline CTAs after last AI message */}
                                {idx === messages.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="mt-2.5 flex flex-col gap-1.5"
                                    >
                                        <p className="text-[11px] font-medium text-white/40 ml-1">Want to explore this solution?</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {getTopicCTAs(msg.content + (messages[idx - 1]?.content || '')).map((cta, ci) => (
                                                <Link
                                                    key={ci}
                                                    href={cta.href}
                                                    onClick={onClosePanel}
                                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/5 bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/5 transition-all group text-[11px] font-semibold text-white/70 hover:text-violet-300 shadow-sm"
                                                >
                                                    {cta.label}
                                                    <ArrowRight className="w-2.5 h-2.5 text-white/20 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-2.5"
                    >
                        <div className="shrink-0 mt-0.5">
                            <MergeXOrb size={22} />
                        </div>
                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl rounded-bl-md px-3.5 py-2.5 flex items-center gap-2 shadow-sm">
                            <img
                                src="/icons/sparkle-star.webp"
                                alt="Sparkles"
                                className="w-3 h-3 animate-pulse opacity-60 object-contain"
                            />
                            <span className="text-[11px] text-white/40">Thinking</span>
                            <TypingDots />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
        </div>
    );
}
