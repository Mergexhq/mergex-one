'use client';

import { usePathname } from 'next/navigation';

export default function FooterCurtain() {
    const pathname = usePathname();

    return (
        <div
            className="bg-black pt-10 lg:pt-20 pb-4 lg:pb-10 relative w-full min-h-[28vh] lg:min-h-[40vh] flex flex-col justify-end"
            style={{ isolation: 'isolate', overflow: 'visible' }}
        >
            {/* Full-viewport black backdrop so scaling main card never reveals body bg */}
            <div className="fixed inset-0 bg-black pointer-events-none" style={{ zIndex: -1 }} />

            {/* Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src="/background/footer/footer.webp"
                    alt="Footer Background"
                    className="w-full h-full object-cover opacity-60"
                />
            </div>

            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" style={{ zIndex: 1 }} />

            {/* Text content */}
            <div className="w-full relative" style={{ zIndex: 10, overflow: 'visible' }}>
                <div className="max-w-[100vw] mx-auto px-6 md:px-10 relative" style={{ zIndex: 20 }}>
                    <div className="flex flex-col items-center justify-end pb-12 md:pb-8">
                        <div className="relative text-center w-full">
                            <div className="flex flex-row items-baseline justify-center whitespace-nowrap w-full relative" style={{ zIndex: 10 }}>
                                <div className="relative inline-block">
                                    {/* "THE" label top-left */}
                                    <div className="absolute -top-[15%] left-[1%] md:top-[2%] md:left-[1vw] text-left" style={{ zIndex: 20 }}>
                                        <span className="text-[1.2vw] md:text-[1.1vw] font-bold text-white uppercase tracking-[0.7em] select-none font-clash">
                                            THE
                                        </span>
                                    </div>

                                    {/* Main MERGEX heading */}
                                    <h2 className="text-[19vw] md:text-[20vw] leading-none font-bold text-white tracking-widest select-none font-clash uppercase relative text-center" style={{ zIndex: 10, overflow: 'visible' }}>
                                        MERGEX
                                    </h2>

                                    {/* "COMPANY" label bottom-right */}
                                    <div className="absolute -bottom-[5%] right-[2%] md:bottom-[-1.5%] md:right-[2.5vw] text-right" style={{ zIndex: 20 }}>
                                        <span className="text-[1.5vw] md:text-[1.6vw] font-bold text-white uppercase tracking-[0.6em] select-none font-clash" style={{ marginRight: '-0.6em' }}>
                                            COMPANY
                                        </span>
                                    </div>
                                </div>

                                {/* Conditional brand suffix for /labs or /systems */}
                                {(pathname === '/labs' || pathname === '/systems') && (
                                    <div className="flex flex-row items-baseline" style={{ marginLeft: '0.3em' }}>
                                        <span
                                            className="text-[20vw] leading-none font-normal text-white select-none text-center font-serif italic"
                                            style={{ overflow: 'visible', padding: '0 0.1em' }}
                                        >
                                            {pathname === '/labs' ? 'L' : 'S'}
                                        </span>
                                        <span
                                            className="text-[14vw] leading-none font-bold text-white tracking-widest select-none font-clash uppercase text-center"
                                            style={{ marginLeft: '-0.05em', overflow: 'visible' }}
                                        >
                                            {pathname === '/labs' ? 'ABS' : 'YSTEMS'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
