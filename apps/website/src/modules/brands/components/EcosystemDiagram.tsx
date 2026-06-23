'use client';

import { motion } from 'framer-motion';
import { BRANDS } from '../data/brands';

const LAYER_COLORS: Record<string, string> = {
  'Core Infrastructure': '#8B5CF6',
  'Creative Infrastructure': '#0EA5E9',
  'Technology Infrastructure': '#10B981',
  'Talent Infrastructure': '#F59E0B',
  'Knowledge Infrastructure': '#EC4899',
};

export function EcosystemDiagram() {
  return (
    <section className="py-20 px-6 md:px-12 bg-foreground">
      <div className="max-w-content mx-auto">
        {/* Label */}
        <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-12">
          Ecosystem Overview
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - description */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              One parent company.
              <br />
              <span className="text-white/50">Three operational layers.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed max-w-md">
              The MergeX Company operates as the central holding structure.
              Each brand is a focused operational capability - not a separate
              business, but a specialized layer of the same system.
            </p>
          </div>

          {/* Right - architecture map */}
          <div className="relative">
            {/* Parent node */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20">
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-sm font-semibold text-white">
                  The MergeX Company
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">
                  Parent
                </span>
              </div>
            </motion.div>

            {/* Connector line */}
            <div className="ml-5 pl-4 border-l border-white/10 space-y-2 mt-1">
              {BRANDS.map((brand, i) => {
                const color = LAYER_COLORS[brand.layer] ?? '#8B5CF6';
                return (
                  <motion.div
                    key={brand.slug}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: 0.1 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-3 pl-4 relative"
                  >
                    {/* Branch line */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-white/10" />

                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium text-white/80">
                        {brand.name}
                      </span>
                      <span
                        className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{
                          color,
                          backgroundColor: `${color}18`,
                        }}
                      >
                        {brand.layer.replace(' Infrastructure', '')}
                      </span>
                      {brand.status !== 'Active' && (
                        <span className="text-[10px] text-white/30">
                          {brand.status}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
