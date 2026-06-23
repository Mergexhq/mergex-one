'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';
import { OPPORTUNITIES } from '../content/careers';

export function OpportunitiesSection() {
    return (
        <section className="bg-bg-primary py-24" id="opportunities">
            <div className="container mx-auto max-w-content px-6">
                {/* Section Heading */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        {OPPORTUNITIES.headline}
                    </h2>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-5">
                    {/* Left Side - Open Roles */}
                    <div className="lg:col-span-3">
                        <div className="space-y-6">
                            {OPPORTUNITIES.roles.map((role, index) => (
                                <motion.div
                                    key={index}
                                    className="group flex flex-col items-start justify-between gap-4 rounded-token-xl border border-border bg-bg-secondary p-6 transition-all hover:border-primary/50 hover:shadow-md md:flex-row md:items-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="max-w-md">
                                        <div className="mb-2 flex items-center gap-3">
                                            <span className="text-xs font-bold tracking-wider text-primary uppercase">
                                                {role.type}
                                            </span>
                                            <div className="h-1 w-1 rounded-full bg-border" />
                                            <h3 className="font-clash font-semibold text-lg text-foreground">
                                                {role.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-foreground-muted leading-relaxed">
                                            {role.description}
                                        </p>
                                    </div>
                                    <button className="btn-secondary flex items-center gap-2">
                                        Apply
                                        <ArrowUpRight className="h-4 w-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Open Application */}
                    <div className="lg:col-span-2">
                        <motion.div
                            className="sticky top-32 rounded-token-xl bg-bg-secondary border border-border p-8 text-foreground shadow-lg"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                                <Zap className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <h3 className="mb-4 text-2xl font-clash font-semibold text-foreground">
                                {OPPORTUNITIES.openApplication.headline}
                            </h3>
                            <p className="mb-8 text-foreground-muted leading-relaxed">
                                {OPPORTUNITIES.openApplication.description}
                            </p>
                            <a
                                href={OPPORTUNITIES.openApplication.ctaLink}
                                className="btn-primary w-full py-4"
                            >
                                {OPPORTUNITIES.openApplication.ctaText}
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
