'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MergeXOrb } from '@/components/ui/mergex-orb';

interface ChatFABProps {
    open: boolean;
    isExpanded: boolean;
    onToggle: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export function ChatFAB({ open, isExpanded, onToggle, onMouseEnter, onMouseLeave }: ChatFABProps) {
    return (
        <motion.button
            layout
            onClick={onToggle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-120 overflow-hidden flex items-center bg-linear-to-b from-violet-300 to-violet-800 text-white text-[11px] md:text-[12px] font-medium select-none shadow-lg shadow-violet-900/30 rounded-[10px]"
            initial={false}
            animate={{
                paddingLeft: isExpanded ? 14 : 10,
                paddingRight: isExpanded ? 14 : 10,
                paddingTop: 10,
                paddingBottom: 10,
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ filter: 'brightness(1.1)', y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Ask MergeX"
        >
            {/* Shimmer sweep */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
                }}
                animate={{ x: ['-100%', '180%'] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            />

            <div className="flex items-center justify-center shrink-0 w-4 h-4">
                <AnimatePresence mode="wait" initial={false}>
                    {open ? (
                        <motion.span
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="flex justify-center items-center"
                        >
                            <ChevronDown className="w-4 h-4" />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="orb"
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="flex justify-center items-center"
                        >
                            <MergeXOrb size={16} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                        animate={{ width: 'auto', opacity: 1, marginLeft: 6 }}
                        exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden whitespace-nowrap"
                    >
                        Ask MergeX
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
