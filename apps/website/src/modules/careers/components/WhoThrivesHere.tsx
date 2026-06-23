'use client';

import { motion } from 'framer-motion';
import { WHO_THRIVES_HERE } from '../content/careers';

export function WhoThrivesHere() {
    return (
        <section className="bg-bg-primary py-24">
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
                        {WHO_THRIVES_HERE.headline}
                    </h2>
                </motion.div>

                {/* Principles Grid */}
                <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                    {WHO_THRIVES_HERE.principles.map((principle, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col border-l-2 border-primary/20 pl-6"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h3 className="font-clash font-semibold mb-4 text-xl text-foreground">
                                {principle.title}
                            </h3>
                            <p className="text-[15px] leading-relaxed text-foreground-muted">
                                {principle.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
