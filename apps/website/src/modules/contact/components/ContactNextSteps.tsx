'use client';

import { motion } from 'framer-motion';
import { CONTACT_NEXT_STEPS } from '../content/contact';

export function ContactNextSteps() {
    return (
        <section className="bg-[#F3F3F3] py-section">
            <div className="container mx-auto max-w-3xl px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="border-t border-gray-200 pt-12"
                >
                    <p className="mb-8 text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                        {CONTACT_NEXT_STEPS.headline}
                    </p>

                    <div className="grid gap-6 md:grid-cols-3">
                        {CONTACT_NEXT_STEPS.steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex flex-col"
                            >
                                <span className="mb-3 text-4xl font-bold text-gray-100 leading-none select-none">
                                    {step.number}
                                </span>
                                <p className="text-[15px] leading-relaxed text-gray-600">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
