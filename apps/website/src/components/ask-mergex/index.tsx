'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message, Session } from './types';
import { createSession, loadSessions, saveSessions, callChatAPI, getCommandAnswer, hasUserIntent } from './utils';
import { useAutoResizeTextarea } from './hooks';
import { ChatFAB } from './ChatFAB';
import { ChatHeader } from './ChatHeader';
import { ChatHistory } from './ChatHistory';
import { ChatWelcome } from './ChatWelcome';
import { GuidedFlow } from './GuidedFlow';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export default function AskMergeXWidget() {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState<'chat' | 'history'>('chat');
    const [isHovered, setIsHovered] = useState(false);
    const [hasInitialExpanded, setHasInitialExpanded] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFooterRevealing, setIsFooterRevealing] = useState(false);

    // Collapse FAB label after 3s
    useEffect(() => {
        const timer = setTimeout(() => setHasInitialExpanded(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    // Prevent body scrolling when the chatbot is open (pin screen)
    useEffect(() => {
        const lenis = (window as any).lenis;

        if (open) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none'; // Prevents mobile pull-to-refresh
            if (lenis) lenis.stop();
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            if (lenis) lenis.start();
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            if (lenis) lenis.start();
        };
    }, [open]);

    // Listen to mobile menu toggle to hide the widget
    useEffect(() => {
        const handleMobileMenu = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            setIsMobileMenuOpen(!!detail?.open);
        };
        window.addEventListener('mergex:mobile-menu', handleMobileMenu);
        return () => window.removeEventListener('mergex:mobile-menu', handleMobileMenu);
    }, []);

    // Hide widget when footer curtain is revealing
    useEffect(() => {
        const handleFooterReveal = (e: Event) => {
            const detail = (e as CustomEvent<{ hidden: boolean }>).detail;
            setIsFooterRevealing(!!detail?.hidden);
        };
        window.addEventListener('mergex:toggle-navbar', handleFooterReveal);
        return () => window.removeEventListener('mergex:toggle-navbar', handleFooterReveal);
    }, []);

    const isExpanded = hasInitialExpanded || isHovered;

    // ─── Session state ─────────────────────────────────────────────────────────
    const [sessions, setSessions] = useState<Session[]>([]);
    const [activeSession, setActiveSession] = useState<Session>(createSession());

    // ─── Chat state ────────────────────────────────────────────────────────────
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    // ─── Speech ────────────────────────────────────────────────────────────────
    const [speakingId, setSpeakingId] = useState<string | null>(null);

    const toggleSpeech = useCallback((id: string, text: string) => {
        if (speakingId === id) {
            window.speechSynthesis.cancel();
            setSpeakingId(null);
        } else {
            window.speechSynthesis.cancel();
            const cleanText = text
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                .replace(/(\*\*|__)(.*?)\1/g, '$2')
                .replace(/(\*|_)(.*?)\1/g, '$2')
                .replace(/`([^`]+)`/g, '$1');
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.onend = () => setSpeakingId(null);
            utterance.onerror = () => setSpeakingId(null);
            window.speechSynthesis.speak(utterance);
            setSpeakingId(id);
        }
    }, [speakingId]);

    // ─── Guided flow state ────────────────────────────────────────────────────
    const [guidedStep, setGuidedStep] = useState<number | null>(null);
    const [guidedAnswers, setGuidedAnswers] = useState<string[]>([]);
    const [leadData, setLeadData] = useState({ name: '', email: '', company: '' });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { ref: textareaRef, adjust } = useAutoResizeTextarea(44, 140);

    // Load sessions on mount
    useEffect(() => { setSessions(loadSessions()); }, []);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, open]);

    // Cancel speech on close
    useEffect(() => {
        if (!open) { window.speechSynthesis.cancel(); setSpeakingId(null); }
    }, [open]);

    // ─── Send ──────────────────────────────────────────────────────────────────
    const handleSend = useCallback(async (textOverride?: string) => {
        const text = (textOverride ?? input).trim();
        if (!text || isTyping) return;

        const isFirst = !hasStarted;
        if (!hasStarted) setHasStarted(true);
        setInput('');
        adjust(true);
        setGuidedStep(null);

        const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text };
        const updated = [...messages, userMsg];
        setMessages(updated);
        setIsTyping(true);

        let answer = getCommandAnswer(text);
        if (!answer) {
            answer = await callChatAPI(text);
            if (hasUserIntent(text) && !answer.toLowerCase().includes('connect')) {
                answer += '\n\nIf you\'d like to speak with our team, type **"connect"** - I\'ll show you a free discovery call and our Priority Architect Access option.';
            }
        }

        const aiMsg: Message = { id: `a-${Date.now()}`, role: 'assistant', content: answer };
        const final = [...updated, aiMsg];
        setMessages(final);
        setIsTyping(false);

        const updatedSession: Session = {
            ...activeSession,
            title: isFirst ? text.slice(0, 48) : activeSession.title,
            messages: final,
        };
        setActiveSession(updatedSession);
        setSessions(prev => {
            const next = [updatedSession, ...prev.filter(s => s.id !== updatedSession.id)];
            saveSessions(next);
            return next;
        });
    }, [input, isTyping, hasStarted, messages, activeSession, adjust]);

    // ─── Auto-type from custom event ───────────────────────────────────────────
    const isAutoTypingRef = useRef(false);
    useEffect(() => {
        const handleOpenChat = async (e: Event) => {
            if (isAutoTypingRef.current) return;
            const detail = (e as CustomEvent).detail;
            const textToType = detail?.chatPrompt || detail?.question || detail?.message;
            setOpen(true);

            if (textToType) {
                isAutoTypingRef.current = true;
                await new Promise(r => setTimeout(r, 600));
                for (let i = 0; i <= textToType.length; i++) {
                    setInput(textToType.slice(0, i));
                    if (textareaRef.current) {
                        textareaRef.current.style.height = '48px';
                        textareaRef.current.style.height = `${Math.max(48, Math.min(textareaRef.current.scrollHeight, 160))}px`;
                    }
                    await new Promise(r => setTimeout(r, 15 + Math.random() * 5));
                }
                await new Promise(r => setTimeout(r, 300));
                handleSend(textToType);
                isAutoTypingRef.current = false;
            }
        };
        window.addEventListener('mergex-open-chat', handleOpenChat);
        return () => window.removeEventListener('mergex-open-chat', handleOpenChat);
    }, [handleSend, textareaRef]);

    // ─── Conversation controls ─────────────────────────────────────────────────
    const handleNewConversation = useCallback(() => {
        setActiveSession(createSession());
        setMessages([]);
        setHasStarted(false);
        setInput('');
        setGuidedStep(null);
        setGuidedAnswers([]);
        setView('chat');
    }, []);

    const handleLoadSession = (session: Session) => {
        setActiveSession(session);
        setMessages(session.messages);
        setHasStarted(session.messages.length > 0);
        setView('chat');
    };

    const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
        e.stopPropagation();
        setSessions(prev => {
            const next = prev.filter(s => s.id !== sessionId);
            saveSessions(next);
            return next;
        });
        if (activeSession.id === sessionId) handleNewConversation();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) handleSend();
        }
    };

    // ─── Guided flow controls ──────────────────────────────────────────────────
    const handleGuidedAnswer = (value: string) => {
        const newAnswers = [...guidedAnswers, value];
        setGuidedAnswers(newAnswers);
        if (guidedStep! < 2) {
            setGuidedStep(guidedStep! + 1);
        } else {
            if (typeof window !== 'undefined') {
                localStorage.setItem('mergex_guided_answers', JSON.stringify(newAnswers));
            }
            setGuidedStep(3);
        }
    };

    // ─── Render ────────────────────────────────────────────────────────────────
    if (isMobileMenuOpen || isFooterRevealing) return null;

    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-118 bg-black/25 backdrop-blur-[5px]"
                    />
                )}
            </AnimatePresence>

            {/* FAB */}
            <ChatFAB
                open={open}
                isExpanded={isExpanded}
                onToggle={() => setOpen(v => !v)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />

            {/* Chat Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="panel"
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, y: 28, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="fixed bottom-[64px] right-4 md:bottom-[76px] md:right-6 z-119 flex flex-col pointer-events-auto"
                        style={{
                            width: 'min(420px, calc(100vw - 32px))',
                            height: 'min(600px, calc(100dvh - 100px))',
                            background: '#080808',
                            borderRadius: '12px',
                            boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            overflow: 'hidden',
                        }}
                    >
                        <ChatHeader
                            onClose={() => setOpen(false)}
                            onNewConversation={handleNewConversation}
                            onToggleHistory={() => setView(v => v === 'history' ? 'chat' : 'history')}
                        />

                        <AnimatePresence mode="wait" initial={false}>
                            {view === 'history' ? (
                                <ChatHistory
                                    sessions={sessions}
                                    activeSessionId={activeSession.id}
                                    onLoadSession={handleLoadSession}
                                    onDeleteSession={handleDeleteSession}
                                    onNewConversation={handleNewConversation}
                                    onClearAll={() => {
                                        setSessions([]);
                                        saveSessions([]);
                                        handleNewConversation();
                                    }}
                                />
                            ) : (
                                /* Chat View */
                                <motion.div
                                    key="chat"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.18 }}
                                    className="flex-1 flex flex-col min-h-0"
                                >
                                    <div className="flex-1 relative overflow-hidden min-h-0">
                                        <div className="h-full overflow-y-auto px-4 py-4 pb-[145px] scroll-smooth" data-lenis-prevent="true">

                                            {/* Welcome / Guided flow */}
                                            {!hasStarted && (
                                                <AnimatePresence mode="wait">
                                                    {guidedStep === null ? (
                                                        <ChatWelcome
                                                            onStartGuided={() => { setGuidedStep(0); setGuidedAnswers([]); }}
                                                            onSend={handleSend}
                                                        />
                                                    ) : (
                                                        <GuidedFlow
                                                            guidedStep={guidedStep}
                                                            guidedAnswers={guidedAnswers}
                                                            leadData={leadData}
                                                            onAnswer={handleGuidedAnswer}
                                                            onLeadChange={setLeadData}
                                                            onLeadSubmit={(e) => { e.preventDefault(); setGuidedStep(4); }}
                                                            onSkipLead={() => setGuidedStep(4)}
                                                            onClose={() => setGuidedStep(null)}
                                                            onClosePanel={() => setOpen(false)}
                                                        />
                                                    )}
                                                </AnimatePresence>
                                            )}

                                            {/* Messages */}
                                            {hasStarted && (
                                                <ChatMessages
                                                    messages={messages}
                                                    isTyping={isTyping}
                                                    speakingId={speakingId}
                                                    onToggleSpeech={toggleSpeech}
                                                    onClosePanel={() => setOpen(false)}
                                                    messagesEndRef={messagesEndRef}
                                                />
                                            )}
                                        </div>

                                        {/* Fade overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#080808] via-[#080808]/90 to-transparent pointer-events-none z-15" />
                                    </div>

                                    <ChatInput
                                        input={input}
                                        isTyping={isTyping}
                                        inputFocused={inputFocused}
                                        textareaRef={textareaRef}
                                        onInputChange={(v) => { setInput(v); adjust(); }}
                                        onKeyDown={handleKeyDown}
                                        onFocus={() => setInputFocused(true)}
                                        onBlur={() => setInputFocused(false)}
                                        onSend={() => handleSend()}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
