'use client';

import { Minimize2, Plus, History } from 'lucide-react';
import { MergeXOrb } from '@/components/ui/mergex-orb';

interface ChatHeaderProps {
    onClose: () => void;
    onNewConversation: () => void;
    onToggleHistory: () => void;
}

export function ChatHeader({ onClose, onNewConversation, onToggleHistory }: ChatHeaderProps) {
    return (
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/5 bg-[#0d0d11] shrink-0 select-none">
            {/* Title with orb decoration */}
            <div className="relative flex items-center gap-2.5">
                <MergeXOrb size={20} />
                <p className="text-[14px] font-semibold text-[#F3F3F5] tracking-wide leading-none">MergeX Intelligence</p>
            </div>

            {/* Header controls: New Chat, Toggle History, Minimize */}
            <div className="flex items-center gap-1">
                <button
                    onClick={onNewConversation}
                    className="p-1.5 rounded-lg text-[#71717A] hover:text-[#F3F3F5] hover:bg-white/5 transition-all cursor-pointer"
                    aria-label="New Chat"
                    title="New conversation"
                >
                    <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={onToggleHistory}
                    className="p-1.5 rounded-lg text-[#71717A] hover:text-[#F3F3F5] hover:bg-white/5 transition-all cursor-pointer"
                    aria-label="Chat History"
                    title="Toggle history"
                >
                    <History className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-[#71717A] hover:text-[#F3F3F5] hover:bg-white/5 transition-all cursor-pointer"
                    aria-label="Minimize"
                    title="Minimize panel"
                >
                    <Minimize2 className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}
