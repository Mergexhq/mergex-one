'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        // Go back in history if possible, otherwise navigate to home
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!email || !password) {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        setIsLoading(true);

        // Simulate a premium login flow
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage('Successfully signed in! Redirecting...');
            setTimeout(() => {
                router.push('/');
            }, 1500);
        }, 1800);
    };

    const handleGoogleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage('Successfully signed in with Google! Redirecting...');
            setTimeout(() => {
                router.push('/');
            }, 1500);
        }, 1200);
    };

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden select-none">
            {/* Immersive Pointillist Blurred Background */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 brightness-[0.85] dark:brightness-[0.4]"
                style={{ 
                    backgroundImage: "url('/background/login-art.png')",
                    filter: "blur(24px) scale(1.1)",
                }}
            />
            {/* Dark/Light Color overlay to blend the blur */}
            <div className="absolute inset-0 bg-white/10 dark:bg-black/40 mix-blend-multiply" />

            {/* Central Card Container */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-4xl min-h-[560px] flex rounded-[28px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.4)] border border-white/20 dark:border-white/5 bg-[#FAF8F5] dark:bg-[#0F0F10] transition-colors duration-300"
            >
                {/* Left Panel: Crisp Pointillist Painting (Desktop Only) */}
                <div className="hidden md:block w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#FAF8F5]/10 dark:to-[#0F0F10]/10 z-10 pointer-events-none" />
                    <Image
                        src="/background/login-art.png"
                        alt="Artistic Pointillist Landscape"
                        fill
                        priority
                        sizes="50vw"
                        className="object-cover object-left select-none pointer-events-none"
                    />
                </div>

                {/* Right Panel: Login Form */}
                <div className="w-full md:w-1/2 flex flex-col justify-between p-8 sm:p-12 relative">
                    {/* Back Button */}
                    <div className="flex items-center">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-1.5 text-xs font-semibold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-200 group focus:outline-none"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                            Back
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="my-auto py-6">
                        <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-black/40 dark:text-white/45">
                            Login to
                        </span>
                        <h1 className="font-serif italic font-normal text-3xl sm:text-[2.25rem] leading-[1.2] text-black dark:text-white mt-1 mb-6">
                            Where Systems Come Alive
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email Input */}
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                    disabled={isLoading}
                                    className="w-full bg-[#ebebea] dark:bg-[#1a1a1c] border border-transparent dark:border-white/5 text-black dark:text-white rounded-full px-5 py-3.5 text-sm outline-none transition-all placeholder:text-black/35 dark:placeholder:text-white/35 focus:bg-white dark:focus:bg-[#202022] focus:border-black/10 dark:focus:border-white/10 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.15)] disabled:opacity-50"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    disabled={isLoading}
                                    className="w-full bg-[#ebebea] dark:bg-[#1a1a1c] border border-transparent dark:border-white/5 text-black dark:text-white rounded-full px-5 py-3.5 text-sm outline-none transition-all placeholder:text-black/35 dark:placeholder:text-white/35 focus:bg-white dark:focus:bg-[#202022] focus:border-black/10 dark:focus:border-white/10 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.15)] disabled:opacity-50"
                                />
                            </div>

                            {/* Messages */}
                            {errorMessage && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs px-2"
                                >
                                    {errorMessage}
                                </motion.p>
                            )}
                            {successMessage && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-emerald-500 text-xs px-2 font-medium"
                                >
                                    {successMessage}
                                </motion.p>
                            )}

                            {/* Links: Forgot password & Invite Only Notice */}
                            <div className="flex flex-col gap-1.5 pt-1 text-[13px]">
                                <div className="flex justify-between items-center px-1">
                                    <Link 
                                        href="/forgot-password" 
                                        className="text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300 font-medium transition-colors"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <p className="text-black/50 dark:text-white/45 px-1 leading-normal text-xs mt-1">
                                    Need access? Please contact your MergeX representative.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 space-y-3">
                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#121212] hover:bg-black dark:bg-[#e1e1e6] dark:hover:bg-white text-white dark:text-black font-semibold py-3.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center h-[48px]"
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 text-white dark:text-black" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    ) : (
                                        'Sign In'
                                    )}
                                </button>

                                {/* Divider */}
                                <div className="flex items-center my-3">
                                    <div className="flex-grow border-t border-black/5 dark:border-white/5" />
                                    <span className="text-[10px] uppercase tracking-wider text-black/35 dark:text-white/30 px-3 select-none">Or</span>
                                    <div className="flex-grow border-t border-black/5 dark:border-white/5" />
                                </div>

                                {/* Google Sign In Button */}
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={isLoading}
                                    className="w-full bg-white dark:bg-[#1a1a1c] border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-[#222225] text-black dark:text-white font-medium py-3 rounded-full flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none text-sm h-[46px]"
                                >
                                    {/* Google G Logo SVG */}
                                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                                        <path
                                            fill="#EA4335"
                                            d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.29 1.92 15.538 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.985 0-.746-.078-1.32-.176-1.887H12.24z"
                                        />
                                    </svg>
                                    Continue with Google
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Branding Footer */}
                    <div className="flex items-center gap-2.5 pt-4 border-t border-black/5 dark:border-white/5">
                        <div className="relative w-8 h-8 shrink-0">
                            <Image
                                src="/logo/mergex-logo.png"
                                alt="MergeX Logo"
                                fill
                                sizes="32px"
                                className="object-contain dark:brightness-0 dark:invert"
                            />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-clash font-bold text-base tracking-wide text-black dark:text-white">
                                MERGEX
                            </span>
                            <span className="text-[10px] text-black/40 dark:text-white/40 font-semibold tracking-wider uppercase mt-0.5">
                                One System, Zero Friction.
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
