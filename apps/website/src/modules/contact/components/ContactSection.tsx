'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, FileText, Briefcase, Mail, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { UNIFIED_FORM, DIAGNOSTIC_FORM } from '../content/contact';

/* ─── Shared primitives ──────────────────────────────────────────────── */
const inputClass =
    'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 placeholder:text-gray-500 focus:border-violet-500 focus:outline-none focus:ring-0 transition-colors';
const selectClass =
    'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 flex items-center justify-between cursor-pointer focus:border-violet-500 transition-colors';
const labelClass = 'mb-2.5 block text-[11px] font-bold tracking-[0.15em] text-gray-900 uppercase';
const sectionLabel = 'mb-6 text-[14px] font-bold tracking-[0.25em] text-gray-900 uppercase';
const checkboxLabelClass = 'ml-3 text-[15px] text-gray-900 select-none cursor-pointer';

function CustomSelect({ options, value, onChange, placeholder, id }: { options: readonly string[], value: string, onChange: (v: string) => void, placeholder: string, id: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <div
                id={id}
                onClick={() => setIsOpen(!isOpen)}
                className={`${selectClass} ${isOpen ? 'border-violet-500' : ''}`}
            >
                <span className={!value ? 'text-gray-500' : 'text-gray-900'}>
                    {value || placeholder}
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180 text-violet-600' : ''}`} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl"
                        data-lenis-prevent
                    >
                        <div className="py-1">
                            {options.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => {
                                        onChange(option);
                                        setIsOpen(false);
                                    }}
                                    className={`cursor-pointer px-4 py-2.5 text-[15px] transition-colors hover:bg-gray-100 ${value === option ? 'bg-violet-50 font-bold text-violet-600' : 'text-gray-600'
                                        }`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Spinner() {
    return (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
        </svg>
    );
}

function SuccessState({ label }: { label: string }) {
    return (
        <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 text-center"
        >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900">
                <CheckCircle className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">{label} received.</h3>
            <p className="mb-8 max-w-xs text-sm leading-relaxed text-gray-900">
                We will respond within 48 hours. If relevant, you will be invited for a further conversation.
            </p>
            <a
                href="/"
                className="inline-flex items-center gap-2 rounded-[8px] bg-linear-to-b from-violet-400 to-violet-900 px-5 py-2 text-[14px] font-medium text-white transition-all hover:opacity-90 active:scale-[0.98]"
            >
                Return to Homepage
                <ArrowRight className="h-4 w-4" />
            </a>
        </motion.div>
    );
}

function CustomCheckbox({ id, label, checked, onChange }: { id: string, label: string, checked: boolean, onChange: (checked: boolean) => void }) {
    return (
        <label htmlFor={id} className="flex items-center group cursor-pointer">
            <div className={`flex items-center justify-center w-5 h-5 rounded border transition-colors ${checked ? 'bg-violet-600 border-violet-600' : 'border-gray-300 bg-white group-hover:border-violet-400'}`}>
                {checked && <CheckCircle className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </div>
            <input type="checkbox" id={id} className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
            <span className={checkboxLabelClass}>{label}</span>
        </label>
    );
}

/* ─── Unified Adaptive Form ─────────────────────────────────────── */
function UnifiedForm() {
    const [form, setForm] = useState({
        // Common
        fullName: '', email: '', phone: '', company: '', website: '', inquiryType: '',
        // Diagnostic
        industry: '', companySize: '', revenueRange: '', diagnosticAreas: [] as string[], slowingGrowth: '',
        // Partnership
        partnershipType: '', partnershipOpportunity: '', partnershipAlignment: '',
        // Careers
        applyingFor: '', careerArea: '', resumeLink: '', aboutYourself: '',
        // General
        inquiryCategory: '', howCanWeHelp: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleCheckbox = (area: string) => {
        setForm(p => {
            const isChecked = p.diagnosticAreas.includes(area);
            if (isChecked) {
                return { ...p, diagnosticAreas: p.diagnosticAreas.filter(a => a !== area) };
            } else {
                return { ...p, diagnosticAreas: [...p.diagnosticAreas, area] };
            }
        });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 1100));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    const getCtaText = () => {
        switch (form.inquiryType) {
            case 'Request a Diagnostic': return 'Submit Request';
            case 'Partnership Inquiry': return 'Submit Inquiry';
            case 'Careers': return 'Submit Application';
            case 'General Inquiry': return 'Send Inquiry';
            default: return 'Continue';
        }
    };

    return (
        <div className="flex h-full flex-col">
            <AnimatePresence mode="wait">
                {submitted ? (
                    <SuccessState key="s" label="Submission" />
                ) : (
                    <motion.form
                        key="f"
                        onSubmit={onSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-12"
                    >
                        {/* Header */}
                        <div>
                            <p className="mb-4 text-[14px] font-bold tracking-[0.2em] uppercase bg-linear-to-b from-violet-400 to-violet-900 bg-clip-text text-transparent">
                                {UNIFIED_FORM.eyebrow}
                            </p>
                            <h2 className="text-3xl font-bold text-gray-900">
                                {UNIFIED_FORM.heading}
                            </h2>
                            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-gray-900 whitespace-pre-line">
                                {UNIFIED_FORM.subtext}
                            </p>
                        </div>

                        {/* Common Fields */}
                        <div>
                            <p className={sectionLabel}>Basic Information</p>
                            <div className="grid gap-8 md:grid-cols-2">
                                <div>
                                    <label className={labelClass} htmlFor="uf-fullName">Full Name *</label>
                                    <input id="uf-fullName" name="fullName" type="text" required placeholder="Your name" value={form.fullName} onChange={handle} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="uf-email">Work Email *</label>
                                    <input id="uf-email" name="email" type="email" required placeholder="you@company.com" value={form.email} onChange={handle} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="uf-phone">Phone Number</label>
                                    <input id="uf-phone" name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handle} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="uf-company">Company / Organization</label>
                                    <input id="uf-company" name="company" type="text" placeholder="Your company" value={form.company} onChange={handle} className={inputClass} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass} htmlFor="uf-website">Website / Portfolio Link</label>
                                    <input id="uf-website" name="website" type="url" placeholder="https://" value={form.website} onChange={handle} className={inputClass} />
                                </div>
                            </div>
                        </div>

                        {/* Inquiry Type */}
                        <div>
                            <label className={labelClass} htmlFor="uf-inquiryType">Inquiry Type *</label>
                            <CustomSelect
                                id="uf-inquiryType"
                                placeholder="Select inquiry type..."
                                options={UNIFIED_FORM.inquiryTypes}
                                value={form.inquiryType}
                                onChange={(v) => setForm(p => ({ ...p, inquiryType: v }))}
                            />
                        </div>

                        {/* Dynamic Fields */}
                        <AnimatePresence mode="popLayout">
                            {form.inquiryType && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                    animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col gap-12 pt-4 border-t border-gray-200"
                                >
                                    {/* 01 - Request a Diagnostic */}
                                    {form.inquiryType === 'Request a Diagnostic' && (
                                        <>
                                            <div>
                                                <p className={sectionLabel}>Additional Fields</p>
                                                <div className="grid gap-8 md:grid-cols-2">
                                                    <div className="md:col-span-2">
                                                        <label className={labelClass} htmlFor="uf-diag-industry">Industry</label>
                                                        <CustomSelect
                                                            id="uf-diag-industry" placeholder="Select industry..."
                                                            options={UNIFIED_FORM.industries} value={form.industry}
                                                            onChange={(v) => setForm(p => ({ ...p, industry: v }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={labelClass} htmlFor="uf-diag-size">Company Size</label>
                                                        <CustomSelect
                                                            id="uf-diag-size" placeholder="Select size..."
                                                            options={UNIFIED_FORM.companySizes} value={form.companySize}
                                                            onChange={(v) => setForm(p => ({ ...p, companySize: v }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={labelClass} htmlFor="uf-diag-revenue">Revenue Range</label>
                                                        <CustomSelect
                                                            id="uf-diag-revenue" placeholder="Select range..."
                                                            options={UNIFIED_FORM.revenueRanges} value={form.revenueRange}
                                                            onChange={(v) => setForm(p => ({ ...p, revenueRange: v }))}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className={labelClass}>Area of Interest</label>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                            {UNIFIED_FORM.areasOfInterest.map((area) => (
                                                                <CustomCheckbox
                                                                    key={`uf-diag-area-${area}`}
                                                                    id={`uf-diag-area-${area}`}
                                                                    label={area}
                                                                    checked={form.diagnosticAreas.includes(area)}
                                                                    onChange={() => handleCheckbox(area)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass} htmlFor="uf-diag-slowing">What is currently slowing your business growth?</label>
                                                <textarea id="uf-diag-slowing" name="slowingGrowth" rows={4} value={form.slowingGrowth} onChange={handle} className={`${inputClass} resize-none`} placeholder="Briefly describe your main challenges..." />
                                            </div>
                                        </>
                                    )}

                                    {/* 02 - Partnership Inquiry */}
                                    {form.inquiryType === 'Partnership Inquiry' && (
                                        <>
                                            <div>
                                                <p className={sectionLabel}>Additional Fields</p>
                                                <label className={labelClass} htmlFor="uf-part-type">Partnership Type</label>
                                                <CustomSelect
                                                    id="uf-part-type" placeholder="Select partnership type..."
                                                    options={UNIFIED_FORM.partnershipTypes} value={form.partnershipType}
                                                    onChange={(v) => setForm(p => ({ ...p, partnershipType: v }))}
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClass} htmlFor="uf-part-opp">Tell us about the partnership opportunity</label>
                                                <textarea id="uf-part-opp" name="partnershipOpportunity" rows={3} value={form.partnershipOpportunity} onChange={handle} className={`${inputClass} resize-none`} placeholder="Describe what you have in mind..." />
                                            </div>
                                            <div>
                                                <label className={labelClass} htmlFor="uf-part-align">Why do you think this partnership aligns with MergeX?</label>
                                                <textarea id="uf-part-align" name="partnershipAlignment" rows={3} value={form.partnershipAlignment} onChange={handle} className={`${inputClass} resize-none`} placeholder="Share your thoughts on the synergy..." />
                                            </div>
                                        </>
                                    )}

                                    {/* 03 - Careers */}
                                    {form.inquiryType === 'Careers' && (
                                        <>
                                            <div>
                                                <p className={sectionLabel}>Additional Fields</p>
                                                <div className="grid gap-8 md:grid-cols-2">
                                                    <div>
                                                        <label className={labelClass} htmlFor="uf-car-apply">Applying For</label>
                                                        <CustomSelect
                                                            id="uf-car-apply" placeholder="Select role type..."
                                                            options={UNIFIED_FORM.applyingFor} value={form.applyingFor}
                                                            onChange={(v) => setForm(p => ({ ...p, applyingFor: v }))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={labelClass} htmlFor="uf-car-area">Area of Interest</label>
                                                        <CustomSelect
                                                            id="uf-car-area" placeholder="Select area..."
                                                            options={UNIFIED_FORM.careerAreas} value={form.careerArea}
                                                            onChange={(v) => setForm(p => ({ ...p, careerArea: v }))}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-8">
                                                    <label className={labelClass} htmlFor="uf-car-resume">Resume / Portfolio Link</label>
                                                    <input id="uf-car-resume" name="resumeLink" type="url" placeholder="https://" value={form.resumeLink} onChange={handle} className={inputClass} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass} htmlFor="uf-car-about">Tell us about yourself and the kind of work you want to do</label>
                                                <textarea id="uf-car-about" name="aboutYourself" rows={4} value={form.aboutYourself} onChange={handle} className={`${inputClass} resize-none`} placeholder="Share your story and ambitions..." />
                                            </div>
                                        </>
                                    )}

                                    {/* 04 - General Inquiry */}
                                    {form.inquiryType === 'General Inquiry' && (
                                        <>
                                            <div>
                                                <p className={sectionLabel}>Additional Fields</p>
                                                <label className={labelClass} htmlFor="uf-gen-cat">Inquiry Category</label>
                                                <CustomSelect
                                                    id="uf-gen-cat" placeholder="Select category..."
                                                    options={UNIFIED_FORM.inquiryCategories} value={form.inquiryCategory}
                                                    onChange={(v) => setForm(p => ({ ...p, inquiryCategory: v }))}
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClass} htmlFor="uf-gen-help">How can we help?</label>
                                                <textarea id="uf-gen-help" name="howCanWeHelp" rows={4} value={form.howCanWeHelp} onChange={handle} className={`${inputClass} resize-none`} placeholder="Tell us what you need..." />
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit */}
                        {form.inquiryType && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4"
                            >
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group flex w-fit items-center justify-center gap-2.5 rounded-[8px] bg-linear-to-b from-violet-400 to-violet-900 px-5 py-2 text-[14px] font-medium text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                                >
                                    {isSubmitting ? <><Spinner /> Sending...</> : <>{getCtaText()}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
                                </button>
                            </motion.div>
                        )}
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}

function DiagnosticForm() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        fullName: '', email: '', companyName: '', phone: '', website: '',
        industry: '', companySize: '', revenueRange: '', diagnosticAreas: [] as string[],
        slowingGrowth: ''
    });

    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleCheckbox = (area: string) => {
        setForm(p => {
            const isChecked = p.diagnosticAreas.includes(area);
            if (isChecked) {
                return { ...p, diagnosticAreas: p.diagnosticAreas.filter(a => a !== area) };
            } else {
                return { ...p, diagnosticAreas: [...p.diagnosticAreas, area] };
            }
        });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 1200));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    return (
        <div className="flex h-full flex-col">
            <AnimatePresence mode="wait">
                {/* ── Diagnostic Form ── */}
                {!submitted ? (
                    <motion.form
                        key="diag-form"
                        onSubmit={onSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-12"
                    >
                        {/* Fields start here */}

                         {/* Common Fields */}
                         <div>
                            <p className={sectionLabel}>Basic Information</p>
                            <div className="grid gap-8 md:grid-cols-2">
                                <div>
                                    <label className={labelClass} htmlFor="d-fullName">Full Name *</label>
                                    <input id="d-fullName" name="fullName" type="text" required placeholder="Your name" value={form.fullName} onChange={handle} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="d-email">Work Email *</label>
                                    <input id="d-email" name="email" type="email" required placeholder="you@company.com" value={form.email} onChange={handle} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="d-phone">Phone Number</label>
                                    <input id="d-phone" name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handle} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="d-company">Company / Organization</label>
                                    <input id="d-company" name="companyName" type="text" placeholder="Your company" value={form.companyName} onChange={handle} className={inputClass} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass} htmlFor="d-website">Website / Portfolio Link</label>
                                    <input id="d-website" name="website" type="url" placeholder="https://" value={form.website} onChange={handle} className={inputClass} />
                                </div>
                            </div>
                        </div>

                        {/* Additional Fields */}
                        <div>
                            <p className={sectionLabel}>Additional Fields</p>
                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className={labelClass} htmlFor="d-industry">Industry</label>
                                    <CustomSelect
                                        id="d-industry" placeholder="Select industry..."
                                        options={DIAGNOSTIC_FORM.industries} value={form.industry}
                                        onChange={(v) => setForm(p => ({ ...p, industry: v }))}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="d-size">Company Size</label>
                                    <CustomSelect
                                        id="d-size" placeholder="Select size..."
                                        options={DIAGNOSTIC_FORM.companySizes} value={form.companySize}
                                        onChange={(v) => setForm(p => ({ ...p, companySize: v }))}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="d-revenue">Revenue Range</label>
                                    <CustomSelect
                                        id="d-revenue" placeholder="Select range..."
                                        options={DIAGNOSTIC_FORM.revenueRanges} value={form.revenueRange}
                                        onChange={(v) => setForm(p => ({ ...p, revenueRange: v }))}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Area of Interest</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                        {DIAGNOSTIC_FORM.areasOfInterest.map((area) => (
                                            <CustomCheckbox
                                                key={`d-area-${area}`}
                                                id={`d-area-${area}`}
                                                label={area}
                                                checked={form.diagnosticAreas.includes(area)}
                                                onChange={() => handleCheckbox(area)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Field */}
                        <div>
                            <label className={labelClass} htmlFor="d-slowing">What is currently slowing your business growth?</label>
                            <textarea id="d-slowing" name="slowingGrowth" rows={4} value={form.slowingGrowth} onChange={handle} className={`${inputClass} resize-none`} placeholder="Briefly describe your main challenges..." />
                        </div>

                        {/* Submit */}
                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group flex w-fit items-center justify-center gap-2.5 rounded-[8px] bg-linear-to-b from-violet-400 to-violet-900 px-5 py-2 text-[14px] font-medium text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                            >
                                {isSubmitting ? <><Spinner /> Submitting...</> : <>{DIAGNOSTIC_FORM.ctaText}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
                            </button>
                        </div>
                    </motion.form>

                ) : (
                    <SuccessState key="diag-success" label="Diagnostic request" />
                )}

            </AnimatePresence>
        </div>
    );
}

/* ─── SIDEBAR Navigation ────────────────────────────────────────────────────── */

function SidebarLink({ href, title, description, icon }: { href: string, title: string, description: string, icon: any }) {
    const isImagePath = typeof icon === 'string';
    const Icon = !isImagePath ? icon : null;

    return (
        <Link href={href} className="group block p-6 rounded-2xl bg-white border border-gray-200 transition-colors hover:border-violet-200">
            <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-50 border border-gray-100">
                    {isImagePath ? (
                        <img
                            src={icon}
                            alt={title}
                            className="h-7 w-7 object-contain"
                        />
                    ) : (
                        Icon && <Icon className="h-6 w-6 text-gray-900" />
                    )}
                </div>
                <div className="flex-1 flex items-center justify-between gap-4">
                    <div>
                        <h3 className="text-[16px] font-bold text-gray-900 mb-1">
                            {title}
                        </h3>
                        <p className="text-[13px] text-gray-900 leading-relaxed">
                            {description}
                        </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 shrink-0" />
                </div>
            </div>
        </Link>
    );
}

/* ─── Main exports ────────────────────────────────────────────────────── */

export function GeneralInquirySection() {
    return (
        <section className="bg-white pt-16 pb-48" id="inquiry">
            <div className="container mx-auto max-w-content px-6">
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-7 xl:col-span-8 lg:-ml-12">
                        <UnifiedForm />
                    </div>
                    <div className="lg:col-span-5 xl:col-span-4">
                        <div className="sticky top-24">
                            <h3 className="mb-6 text-lg font-bold text-gray-900">Not sure what you are looking for?</h3>
                            <div className="flex flex-col gap-4">
                                <SidebarLink
                                    href="/contact/diagnostic"
                                    title="Request a Diagnostic"
                                    description="Business growth assessment"
                                    icon="/icons/image.webp"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function DiagnosticSection() {
    return (
        <section className="bg-white pt-24 pb-48" id="diagnostic">
            <div className="container mx-auto max-w-content px-6">
                {/* Header Section */}
                <div className="mb-10 lg:-ml-12">
                    <p className="mb-4 text-[16px] font-bold tracking-[0.2em] uppercase bg-linear-to-b from-violet-400 to-violet-900 bg-clip-text text-transparent">
                        {DIAGNOSTIC_FORM.eyebrow}
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 tracking-tight">
                        {DIAGNOSTIC_FORM.heading}
                    </h2>
                </div>

                <hr className="border-gray-200 mb-12 lg:-ml-12" />

                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-7 xl:col-span-8 lg:-ml-12">
                        <p className="mb-10 max-w-2xl text-[16px] leading-relaxed text-gray-900 whitespace-pre-line">
                            {DIAGNOSTIC_FORM.subtext}
                        </p>
                        <DiagnosticForm />
                    </div>
                    <div className="lg:col-span-5 xl:col-span-4">
                        <div className="sticky top-24">
                            <h3 className="mb-6 text-lg font-bold text-gray-900">Not sure what you are looking for?</h3>
                            <div className="flex flex-col gap-4">
                                <SidebarLink
                                    href="/contact"
                                    title="General Inquiry"
                                    description="Questions and general communication"
                                    icon={Mail}
                                />
                                <SidebarLink
                                    href="/careers"
                                    title="Careers"
                                    description="Roles, internships, and contributors"
                                    icon={Briefcase}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
