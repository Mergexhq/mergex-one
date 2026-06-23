'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const PIPELINE_STEPS = [
  {
    num: '01',
    phase: 'PRE-PRODUCTION',
    copy: 'Every production starts with structure before execution.',
    items: ['Creative Direction', 'Concept Development', 'Script & Storyboarding', 'Shot Planning'],
  },
  {
    num: '02',
    phase: 'PRODUCTION',
    copy: 'Precision-led visual execution built for modern platforms.',
    items: ['Commercial Shoots', 'Product Filming', 'Brand Content', 'Photography'],
  },
  {
    num: '03',
    phase: 'POST-PRODUCTION',
    copy: 'Refined outputs optimized for consistency, clarity, and scale.',
    items: ['Editing', 'Motion Graphics', 'Sound Design', 'Delivery Systems'],
  },
];

const CAPABILITIES = [
  {
    title: 'Brand Visuals',
    desc: 'Campaigns, identity visuals, launch assets.',
    number: '01',
    gradient: 'from-violet-500/10 to-transparent',
  },
  {
    title: 'Commercial Production',
    desc: 'Product films, advertisements, branded shoots.',
    number: '02',
    gradient: 'from-sky-500/10 to-transparent',
  },
  {
    title: 'Content Systems',
    desc: 'Scalable short-form and social content pipelines.',
    number: '03',
    gradient: 'from-emerald-500/10 to-transparent',
  },
  {
    title: 'Motion & Post',
    desc: 'Editing, motion systems, visual finishing.',
    number: '04',
    gradient: 'from-purple-500/10 to-transparent',
  },
];

const PROOF_CARDS = [
  {
    brand: 'AURA SKINCARE',
    industry: 'D2C Skincare',
    project: 'Product Launch Visuals',
    copy: 'Product launch visuals designed for a D2C skincare brand scaling across paid and organic channels.',
    bgImage: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    brand: 'VELO DYNAMICS',
    industry: 'E-Mobility',
    project: 'Brand Ad & Launch Film',
    copy: 'Cinematic brand film and product commercial optimized for multi-platform distribution and paid acquisition.',
    bgImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop',
  },
];

const PERSPECTIVES = [
  {
    title: 'Content Systems: Building a Scalable Asset Pipeline',
    type: 'Content Systems',
    readTime: '4 min read',
  },
  {
    title: 'The System Behind Cinematic Branded Storytelling',
    type: 'Storytelling Systems',
    readTime: '5 min read',
  },
  {
    title: 'Creative Infrastructure: Why Operations Dictate Quality',
    type: 'Creative Infrastructure',
    readTime: '6 min read',
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export function OvrnBrandContent() {
  return (
    <div className="relative min-h-screen bg-[#0B0B0B] dark text-white selection:bg-purple-500/30 font-sans z-20">
      {/* Radial ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.06)_0%,transparent_50%),radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.02)_0%,transparent_50%)] pointer-events-none" />

      {/* ────────────────────────────────────────────────────────
         1. HERO SECTION
         ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 border-b border-white/5 overflow-hidden">
        {/* Soft background grid lines */}
        <div className="absolute inset-0 flex pointer-events-none opacity-[0.02]">
          <div className="w-1/4 h-full border-r border-white" />
          <div className="w-1/4 h-full border-r border-white" />
          <div className="w-1/4 h-full border-r border-white" />
        </div>

        <div className="max-w-content mx-auto w-full relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 md:space-y-8"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-purple-400">
                OVRN STUDIOS
              </span>
              <div className="h-px w-8 bg-purple-500/50" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-8xl font-serif tracking-tight leading-[0.95] max-w-4xl text-white font-normal"
            >
              Visual production <br className="hidden md:inline" />
              built for <span className="italic text-zinc-400">modern brands.</span>
            </motion.h1>

            {/* Subline & CTA grid */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-white/5"
            >
              <p className="lg:col-span-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
                OVRN creates commercial visuals, branded content, and production systems designed for scalable digital brands.
              </p>
              <div className="lg:col-span-6 flex flex-col justify-end lg:items-end">
                <Link
                  href="#selected-work"
                  className="group inline-flex items-center gap-3 py-3 px-6 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-white/5 transition-all duration-300 text-xs md:text-sm font-semibold tracking-wider text-white"
                >
                  View Selected Work
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-purple-400">→</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         2. ABOUT OVRN STUDIOS
         ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-b border-white/5 relative">
        <div className="max-w-content mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
          >
            {/* Left - large statement */}
            <motion.div variants={fadeUp} className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 block">
                THE MANDATE
              </span>
              <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight text-white font-normal">
                Modern brands need <br className="hidden md:inline" />
                more than content. <br />
                <span className="italic text-zinc-400">They need consistency.</span>
              </h2>
            </motion.div>

            {/* Right - short overview */}
            <motion.div variants={fadeUp} className="lg:col-span-6 space-y-8">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed pt-2">
                OVRN STUDIOS supports brands through structured visual production across campaigns, products, social platforms, and commercial media. We build structured systems that remove creative chaos and replace it with predictable execution quality.
              </p>
              <div>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-400 hover:text-white transition-colors duration-300"
                >
                  Inside OVRN
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         3. PRODUCTION PIPELINE
         ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-b border-white/5 relative">
        <div className="max-w-content mx-auto">
          {/* Section heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400 block mb-3">
                OPERATIONAL MATURITY
              </span>
              <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-white font-normal">
                The Production <span className="italic text-zinc-400">Pipeline.</span>
              </h2>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm">
              We treat creative work as an engineering process. A structured flow from diagnostic mapping to final master assets.
            </p>
          </div>

          {/* Timeline Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative"
          >
            {PIPELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.phase}
                variants={fadeUp}
                className="relative bg-zinc-900/30 border border-white/5 p-8 rounded-2xl flex flex-col justify-between min-h-[340px] hover:border-purple-500/20 transition-colors duration-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-bold tracking-widest text-purple-400">
                      {step.phase}
                    </span>
                    <span className="text-2xl font-serif italic text-zinc-700">
                      {step.num}
                    </span>
                  </div>
                  <p className="text-white text-lg font-medium leading-snug mb-6">
                    {step.copy}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-6 space-y-2">
                  <span className="text-[9px] font-bold tracking-widest text-zinc-500 block uppercase mb-1">
                    Deliverables
                  </span>
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-xs text-zinc-400">
                    {step.items.map((item) => (
                      <span key={item} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-purple-500/50 shrink-0" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         4. CAPABILITIES
         ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-b border-white/5 relative">
        <div className="max-w-content mx-auto">
          {/* Section heading */}
          <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 block mb-3">
              CAPABILITY ARCHITECTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-white font-normal">
              Structured visual systems.
            </h2>
          </div>

          {/* Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {CAPABILITIES.map((cap) => (
              <motion.div
                key={cap.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group relative bg-zinc-950/80 border border-white/5 hover:border-purple-500/30 p-8 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer min-h-[220px] flex flex-col justify-between shadow-2xl"
              >
                {/* Background ambient color glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="flex justify-between items-start relative z-10">
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white group-hover:text-purple-400 transition-colors duration-300">
                    {cap.title}
                  </h3>
                  <span className="text-xs font-bold text-zinc-600 group-hover:text-purple-500 transition-colors duration-300">
                    {cap.number}
                  </span>
                </div>

                <div className="relative z-10 mt-8 border-t border-white/5 pt-4">
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-sm">
                    {cap.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         5. SELECTED WORK / PROOF REELS
         ──────────────────────────────────────────────────────── */}
      <section id="selected-work" className="py-24 md:py-32 px-6 md:px-12 border-b border-white/5 relative">
        <div className="max-w-content mx-auto">
          {/* Section heading */}
          <div className="mb-16 md:mb-20">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400 block mb-3">
              Transformation proof
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-white font-normal">
              Selected <span className="italic text-zinc-400">Reels.</span>
            </h2>
          </div>

          {/* Large Cinematic Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {PROOF_CARDS.map((card) => (
              <motion.div
                key={card.brand}
                variants={fadeUp}
                className="group relative bg-zinc-950 border border-white/5 hover:border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Visual Cover Layer - Grayscale to Color on hover */}
                <div className="relative h-64 md:h-80 w-full overflow-hidden border-b border-white/5">
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    style={{ backgroundImage: `url(${card.bgImage})` }}
                  />
                  {/* Subtle dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />
                  
                  {/* Play badge */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-purple-500/80 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300 border border-white/20">
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" className="ml-1 text-white">
                        <polygon points="0,0 14,8 0,16" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold tracking-widest text-purple-400">
                      {card.brand}
                    </span>
                    <span className="text-zinc-500">
                      {card.industry} · {card.project}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                    {card.copy}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         6. INSIGHTS / PERSPECTIVES
         ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-b border-white/5 relative">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column - Heading */}
            <div className="lg:col-span-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 block mb-3">
                INTELLIGENCE POSITIONING
              </span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white leading-tight font-normal">
                Visual thinking <br className="hidden md:inline" />
                <span className="italic text-zinc-400">from OVRN.</span>
              </h2>
            </div>

            {/* Right Column - Article List */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="lg:col-span-8 space-y-6"
            >
              {PERSPECTIVES.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 hover:border-purple-500/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="space-y-1 max-w-xl">
                    <p className="text-white text-base md:text-lg font-medium group-hover:text-purple-400 transition-colors duration-300 leading-snug">
                      {item.title}
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-4 md:mt-0 text-xs text-zinc-500 group-hover:text-white transition-colors duration-300">
                    <span>{item.readTime}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-purple-400">→</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         7. FINAL CTA
         ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-12 relative overflow-hidden">
        {/* Deep background ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 block">
              NEXT STEP
            </span>
            <h2 className="text-4xl md:text-7xl font-serif tracking-tight text-white leading-none font-normal">
              Build visuals with <br className="hidden md:inline" />
              <span className="italic text-zinc-400">structure behind them.</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto pt-2">
              OVRN STUDIOS creates scalable production systems for brands operating in modern digital environments.
            </p>
            <div className="pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 py-4 px-8 bg-white hover:bg-zinc-200 text-black text-xs md:text-sm font-bold uppercase tracking-wider rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              >
                Explore Production Capabilities
                <span className="text-purple-700">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
         OPTIONAL CLIENT Logo Strip
         ──────────────────────────────────────────────────────── */}
      <section className="py-12 border-t border-white/5 relative z-10 bg-zinc-950/20 backdrop-blur-sm">
        <div className="max-w-content mx-auto px-6 md:px-12 flex flex-wrap justify-between items-center gap-8 opacity-30 text-xs md:text-sm font-semibold tracking-[0.15em] text-white">
          <span>YOUTUBE</span>
          <span>INSTAGRAM</span>
          <span>META ADS</span>
          <span>SHOPIFY</span>
          <span>AMAZON</span>
        </div>
      </section>
    </div>
  );
}
