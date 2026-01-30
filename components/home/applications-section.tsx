"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { CTAButton } from "@/components/ui/cta-button"
import { urlFor } from "@/lib/sanity"
import type { HomeApplicationsSection } from "@/lib/types/home"

interface ApplicationsSectionProps {
  data?: HomeApplicationsSection | null
}

export function ApplicationsSection({ data }: ApplicationsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Don't display section if no data at all
  if (!data) {
    return null
  }

  const sectionLabel = data.sectionLabel
  const title = data.title
  const description = data.description
  const ctaTitle = data.ctaTitle
  const ctaText = data.ctaText
  const interiorCard = data.interiorCard
  const exteriorCard = data.exteriorCard

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate text elements
      const textElements = sectionRef.current?.querySelectorAll('.js-reveal-text')
      if (textElements) {
        textElements.forEach((el, i) => {
          gsap.fromTo(
            el as HTMLElement,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el as HTMLElement,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: i * 0.1,
            }
          )
        })
      }

      // Animate image cards
      const imageCards = sectionRef.current?.querySelectorAll('.js-reveal-image')
      if (imageCards) {
        imageCards.forEach((el, i) => {
          gsap.fromTo(
            el as HTMLElement,
            { opacity: 0, scale: 0.9, y: 60 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el as HTMLElement,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: i * 0.15,
            }
          )
        })
      }
    }, sectionRef.current)

    return () => ctx.revert()
  }, [data])

  return (
    <section ref={sectionRef} id="applications" className="w-full relative z-10 m-0 p-0 bg-white overflow-hidden">
            <div className="relative w-[calc(100%-2rem)] ml-4 px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 relative">
                    {/* Title at top - spans 2 columns */}
                    {(sectionLabel || title || description) && (
                      <div className="absolute top-8 md:top-12 lg:top-16 xl:top-20 left-0 mb-16 z-10 w-full">
                          {sectionLabel && (
                            <div className="js-reveal-text inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-4 font-light">
                                <span className="h-[1px] w-8 bg-black/30" /> {sectionLabel}
                            </div>
                          )}
                          {title && (
                            <h2 className="js-reveal-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black mb-3 tracking-[-0.02em] leading-tight w-2/3 pr-10 whitespace-pre-line">
                                {title}
                            </h2>
                          )}
                          {description && description.length > 0 && (
                            <div className="js-reveal-text w-1/3 pt-12 space-y-3 pr-8">
                                {description[0] && (
                                    <p className="text-lg md:text-xl text-black/70 leading-relaxed whitespace-pre-line">
                                        {description[0]}
                                    </p>
                                )}
                            </div>
                          )}
                      </div>
                    )}
                    
                    {/* Text Column - Left */}
                    <div className="relative bg-white flex flex-col py-8 md:py-12 lg:py-16 xl:py-20">
                        {/* Background color overlay - dark slate from midpoint, extends full column width */}
                        <div className="absolute top-[55%] -left-8 md:-left-12 lg:-left-16 xl:-left-20 -right-8 md:-right-12 lg:-right-16 xl:-right-20 bottom-0 bg-black"></div>

                        {/* CTA Section - Positioned in lower half, below midpoint, on black background */}
                        {(description && description.length > 1 && description[1]) || ctaText ? (
                          <div className="js-reveal-text max-w-md mt-auto relative z-10 pr-8 ">
                              {description && description.length > 1 && description[1] && (
                                <p className="text-base lg:text-xl xl:text-2xl text-white/90 mb-6 leading-relaxed whitespace-pre-line">
                                    {description[1]}
                                </p>
                              )}
                              {ctaText && (
                                <CTAButton
                                    theme="white"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      const element = document.getElementById('produits')
                                      if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                      }
                                    }}
                                    className="inline-flex items-center gap-2 cursor-pointer"
                                >
                                    <span>{ctaText}</span>
                                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
                                </CTAButton>
                              )}
                          </div>
                        ) : null}
                    </div>

                    {/* Intérieur Column - Middle, slightly lowered */}
                    {interiorCard && (interiorCard.title || interiorCard.image) && (
                      <div className="relative bg-white overflow-visible flex items-start justify-center py-20">
                          {/* Background color overlay - dark slate from midpoint, extends full column width */}
                          <div className="absolute top-2/3 -left-8 md:-left-12 lg:-left-16 xl:-left-20 -right-8 md:-right-12 lg:-right-16 xl:-right-20 bottom-0 bg-black"></div>

                          <Link
                              href={interiorCard.link || "/produits/interieur"}
                              className="js-reveal-image relative w-full aspect-[3/4] group cursor-pointer mt-36 z-10"
                          >
                            <div className="relative w-full h-full overflow-hidden">
                                {/* Background Image */}
                                {interiorCard.image ? (
                                  <img
                                      src={urlFor(interiorCard.image).url()}
                                      alt={interiorCard.title || "Intérieur"}
                                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                  />
                                ) : (
                                  <div className="absolute inset-0 w-full h-full bg-gray-200"></div>
                                )}

                                {/* Black Filter Overlay - fainter, reduces opacity on hover */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-700"></div>

                                {/* Border highlight on hover */}
                                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none z-20"></div>

                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                </div>

                                {/* Corner Brackets - Inside but inverted/flipped outward */}
                                <div className="absolute top-12 left-12 w-8 h-8 border-b-4 border-r-4 border-white z-30"></div>
                                <div className="absolute top-12 right-12 w-8 h-8 border-b-4 border-l-4 border-white z-30"></div>
                                <div className="absolute bottom-12 left-12 w-8 h-8 border-t-4 border-r-4 border-white z-30"></div>
                                <div className="absolute bottom-12 right-12 w-8 h-8 border-t-4 border-l-4 border-white z-30"></div>

                                {/* Content */}
                                {interiorCard.title && (
                                  <div className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-8 lg:p-10 z-30">
                                      <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white mb-4 tracking-[-0.02em] text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                                          {interiorCard.title}
                                      </h3>
                                      <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-all duration-700 delay-150 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                                          <span className="text-sm md:text-base tracking-wider uppercase ">Découvrir</span>
                                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
                                      </div>
                                  </div>
                                )}
                            </div>  
                          </Link>
                      </div>
                    )}

                    {/* Extérieur Column - Right, aligned at top */}
                    {exteriorCard && (exteriorCard.title || exteriorCard.image) && (
                      <div className="relative bg-white overflow-visible flex items-start justify-center py-8 md:py-12 lg:py-16 xl:py-20">
                          {/* Background color overlay - dark slate from midpoint, extends full column width */}
                          <div className="absolute top-2/3 -left-8 md:-left-12 lg:-left-16 xl:-left-20 -right-8 md:-right-12 lg:-right-16 xl:-right-20 bottom-0 bg-black"></div>

                          <Link
                              href={exteriorCard.link || "/produits/exterieur"}
                              className="js-reveal-image relative w-full aspect-[3/4] group cursor-pointer mt-4 md:mt-6 z-10"
                          >
                            <div className="relative w-full h-full overflow-hidden">
                                {/* Background Image */}
                                {exteriorCard.image ? (
                                  <img
                                      src={urlFor(exteriorCard.image).url()}
                                      alt={exteriorCard.title || "Extérieur"}
                                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                  />
                                ) : (
                                  <div className="absolute inset-0 w-full h-full bg-gray-200"></div>
                                )}

                                {/* Black Filter Overlay - fainter, reduces opacity on hover */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-700"></div>

                                {/* Border highlight on hover */}
                                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none z-20"></div>

                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                </div>

                                {/* Corner Brackets - Inside with padding */}
                                <div className="absolute top-12 left-12 w-8 h-8 border-t-4 border-l-4 border-white z-30"></div>
                                <div className="absolute top-12 right-12 w-8 h-8 border-t-4 border-r-4 border-white z-30"></div>
                                <div className="absolute bottom-12 left-12 w-8 h-8 border-b-4 border-l-4 border-white z-30"></div>
                                <div className="absolute bottom-12 right-12 w-8 h-8 border-b-4 border-r-4 border-white z-30"></div>

                                {/* Content */}
                                {exteriorCard.title && (
                                  <div className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-8 lg:p-10 z-30">
                                      <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white mb-4 tracking-[-0.02em] text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                                          {exteriorCard.title}
                                      </h3>
                                      <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-all duration-700 delay-150 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                                          <span className="text-sm md:text-base tracking-wider uppercase ">Découvrir</span>
                                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
                                      </div>
                                  </div>
                                )}
                            </div>
                          </Link>
                      </div>
                    )}

                </div>
            </div>
        </section>
    )
}
