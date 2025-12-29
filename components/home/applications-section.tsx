"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function ApplicationsSection() {
    return (
        <section id="applications" className="w-full relative z-10 m-0 p-0 bg-white overflow-hidden">
            <div className="relative w-full px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 relative">
                    {/* Title at top - spans 2 columns */}
                    <div className="absolute top-8 md:top-12 lg:top-16 xl:top-20 left-0 mb-16 z-10 w-full">
                        <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-4 font-light">
                            <span className="h-[1px] w-8 bg-black/30" /> Applications
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black mb-3 tracking-[-0.02em] leading-tight w-2/3 pr-10">
                            Interior and exterior solution.
                        </h2>
                        <h2 className="text-5xl font-light text-black mb-3 tracking-[-0.02em] leading-tight w-1/3">
                            Our solutions are designed to meet the unique needs of your project.
                        </h2>
                    </div>
                    
                    {/* Text Column - Left */}
                    <div className="relative bg-white flex flex-col py-8 md:py-12 lg:py-16 xl:py-20">
                        {/* Background color overlay - dark slate from midpoint, extends full column width */}
                        <div className="absolute top-1/2 -left-8 md:-left-12 lg:-left-16 xl:-left-20 -right-8 md:-right-12 lg:-right-16 xl:-right-20 bottom-0 bg-slate-900"></div>

                        {/* CTA Section - Positioned in lower half, below midpoint, on black background */}
                        <div className="max-w-md mt-auto relative z-10">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-6 tracking-[-0.02em] leading-tight">
                                Ready to get started?
                            </h3>
                            <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed font-light mb-8">
                                Explore our comprehensive product portfolio and discover innovative solutions for your next project. Our team is here to help you find the perfect materials and systems tailored to your architectural vision. 
                            </p>
                            <Link
                                href="/produits"
                                className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
                            >
                                <span className="text-sm md:text-base tracking-wider uppercase font-light underline">Explore Our Products</span>
                                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
                            </Link>
                        </div>
                    </div>

                    {/* Intérieur Column - Middle, slightly lowered */}
                    <div className="relative bg-white overflow-visible flex items-start justify-center py-20">
                        {/* Background color overlay - dark slate from midpoint, extends full column width */}
                        <div className="absolute top-1/2 -left-8 md:-left-12 lg:-left-16 xl:-left-20 -right-8 md:-right-12 lg:-right-16 xl:-right-20 bottom-0 bg-slate-900"></div>

                        <Link
                            href="/produits/interieur"
                            className="relative w-full aspect-[3/4] group cursor-pointer mt-36 z-10"
                        >
                            <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                                {/* Corner Brackets - Inside but inverted/flipped outward */}
                                <div className="absolute top-12 left-12 w-8 h-8 border-b-4 border-r-4 border-white z-10"></div>
                                <div className="absolute top-12 right-12 w-8 h-8 border-b-4 border-l-4 border-white z-10"></div>
                                <div className="absolute bottom-12 left-12 w-8 h-8 border-t-4 border-r-4 border-white z-10"></div>
                                <div className="absolute bottom-12 right-12 w-8 h-8 border-t-4 border-l-4 border-white z-10"></div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-8 lg:p-10">
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white mb-4 tracking-[-0.02em] text-center">
                                        Intérieur
                                    </h3>
                                    <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                                        <span className="text-sm md:text-base tracking-wider uppercase font-light">Découvrir</span>
                                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                            </div>  
                        </Link>
                    </div>

                    {/* Extérieur Column - Right, aligned at top */}
                    <div className="relative bg-white overflow-visible flex items-start justify-center py-8 md:py-12 lg:py-16 xl:py-20">
                        {/* Background color overlay - dark slate from midpoint, extends full column width */}
                        <div className="absolute top-1/2 -left-8 md:-left-12 lg:-left-16 xl:-left-20 -right-8 md:-right-12 lg:-right-16 xl:-right-20 bottom-0 bg-slate-900"></div>

                        <Link
                            href="/produits/exterieur"
                            className="relative w-full aspect-[3/4] group cursor-pointer mt-4 md:mt-6 z-10"
                        >
                            <div className="relative w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 overflow-visible">
                                {/* Corner Brackets - Inside with padding */}
                                <div className="absolute top-12 left-12 w-8 h-8 border-t-4 border-l-4 border-white z-10"></div>
                                <div className="absolute top-12 right-12 w-8 h-8 border-t-4 border-r-4 border-white z-10"></div>
                                <div className="absolute bottom-12 left-12 w-8 h-8 border-b-4 border-l-4 border-white z-10"></div>
                                <div className="absolute bottom-12 right-12 w-8 h-8 border-b-4 border-r-4 border-white z-10"></div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-8 lg:p-10">
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white mb-4 tracking-[-0.02em] text-center">
                                        Extérieur
                                    </h3>
                                    <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                                        <span className="text-sm md:text-base tracking-wider uppercase font-light">Découvrir</span>
                                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}
