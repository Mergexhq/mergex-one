'use client';

import { motion } from 'framer-motion';
import { SendHorizontal, LoaderIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { PLACEHOLDERS } from './types';

interface ChatInputProps {
    input: string;
    isTyping: boolean;
    inputFocused: boolean;
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
    onInputChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    onSend: () => void;
}

export function ChatInput({
    input,
    isTyping,
    inputFocused,
    textareaRef,
    onInputChange,
    onKeyDown,
    onFocus,
    onBlur,
    onSend,
}: ChatInputProps) {
    return (
        <div className="absolute bottom-0 left-0 right-0 px-3 py-6 z-20 pointer-events-none">
            <div className="pointer-events-auto">
                <div className={cn(
                    'relative rounded-lg transition-all duration-500',
                    inputFocused ? 'scale-[1.005]' : 'scale-100'
                )}>
                    {/* Inner card surface: handles background, standard border, and pixel-perfect uniform gradient border */}
                    <div
                        className={cn(
                            'relative z-10 rounded-lg transition-all duration-300 border',
                            inputFocused
                                ? 'shadow-md'
                                : 'bg-white/[0.03] hover:bg-white/[0.05] border-white/10 hover:border-white/20'
                        )}
                        style={inputFocused ? {
                            border: '1px solid transparent',
                            background: 'linear-gradient(#080808, #080808) padding-box, linear-gradient(to right, #c084fc, #8b5cf6, #581c87, #8b5cf6, #c084fc) border-box',
                        } : undefined}
                    >
                        {/* Perfect flex layout to align input, blinking pointer, and arrow in one row */}
                        <div className="relative flex items-center justify-between px-3 py-1">
                            <div className="relative flex-1 flex items-center min-w-0">
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={e => onInputChange(e.target.value)}
                                    onKeyDown={onKeyDown}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    disabled={isTyping}
                                    rows={1}
                                    className="w-full bg-transparent resize-none outline-none text-[13px] text-white placeholder-transparent leading-[20px] py-1.5 pr-8 block min-h-[32px]"
                                />
                                {!input && (
                                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                        <TypingAnimation
                                            words={PLACEHOLDERS}
                                            blinkCursor
                                            pauseDelay={2500}
                                            loop
                                            startOnView={false}
                                            className="text-[13px] text-white/40 font-normal"
                                            duration={45}
                                            delay={80}
                                            deleteSpeed={25}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Send button perfectly aligned in the same flex row */}
                            <motion.button
                                type="button"
                                onClick={onSend}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.94 }}
                                disabled={isTyping || !input.trim()}
                                className={cn(
                                    'w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0 ml-1',
                                    input.trim() && !isTyping
                                        ? 'bg-white hover:bg-white/90 cursor-pointer text-black shadow-md'
                                        : 'bg-white/5 text-white/20 cursor-not-allowed'
                                )}
                            >
                                {isTyping
                                    ? <LoaderIcon className="w-3.5 h-3.5 animate-[spin_2s_linear_infinite]" />
                                    : <SendHorizontal className="w-3.5 h-3.5" />
                                }
                            </motion.button>
                        </div>
                    </div>

                    {/* Soft continuous light violet to dark violet outer glow blur */}
                    <div
                        aria-hidden="true"
                        className={cn(
                            'absolute -inset-0.5 rounded-lg blur-md transition-opacity duration-500 pointer-events-none z-0',
                            'bg-[linear-gradient(to_right,#c084fc,#8b5cf6,#581c87,#c084fc)]',
                            inputFocused ? 'opacity-30' : 'opacity-0'
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
