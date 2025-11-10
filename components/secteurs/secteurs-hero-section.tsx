'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface HeroTextSections {
  section1?: {
    mainText?: string
    description?: string
  }
  section2?: {
    mainText?: string
    description?: string
  }
  section3?: {
    description?: string
  }
}

interface SecteursHeroSectionProps {
  title: string
  heroTextSections?: HeroTextSections
  heroImage: string
  contactLink: string
  contactCta: string
}

export function SecteursHeroSection({ title, heroTextSections, heroImage, contactLink, contactCta }: SecteursHeroSectionProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!imageRef.current || !sectionRef.current) return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Create parallax effect
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 30, // Move image down as you scroll
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true, // Smooth scrubbing effect
        },
      })
    })

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white">
      {/* Hero Image Section - 2/3 screen height */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-24 grid grid-cols-2 gap-8 overflow-hidden">
        {/* Background image */}
        {/* Title overlay on image */}
        <div className="flex flex-col justify-center">
          <div className='bg-white/20 backdrop-blur-sm w-fit'>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-3">
              <span className="h-[1px] w-8 bg-black/30" /> Secteurs
            </div>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-black mb-8">{title}</h1>
            <div className="space-y-6 py-8">
              {/* First text section */}
              {heroTextSections?.section1 && (
                <div className="space-y-2">
                  {heroTextSections.section1.mainText && (
                    <p className="text-xl md:text-2xl font-light text-black leading-tight">
                      {heroTextSections.section1.mainText}
                    </p>
                  )}
                  {heroTextSections.section1.description && (
                    <p className="text-sm md:text-base text-black/60 italic leading-relaxed max-w-xl">
                      {heroTextSections.section1.description}
                    </p>
                  )}
                </div>
              )}

              {/* Second text section */}
              {heroTextSections?.section2 && (
                <div className="space-y-2 pt-4">
                  {heroTextSections.section2.mainText && (
                    <p className="text-xl md:text-2xl font-light text-black leading-tight">
                      {heroTextSections.section2.mainText}
                    </p>
                  )}
                  {heroTextSections.section2.description && (
                    <p className="text-sm md:text-base text-black/60 italic leading-relaxed max-w-xl">
                      {heroTextSections.section2.description}
                    </p>
                  )}
                </div>
              )}

              {/* Third text section */}
              {heroTextSections?.section3?.description && (
                <div className="space-y-2 pt-4">
                  <p className="text-xs md:text-sm text-black/40 italic leading-relaxed max-w-md">
                    {heroTextSections.section3.description}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-6">
                <a href="#examples" className="border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">Voir Applications</a>
              </div>
            </div>
          </div>
        </div>
        <div ref={imageRef} className="">
          <img
            src={heroImage || '/contemporary-cultural-center-glass-facade-paris.png'}
            alt={`Secteur ${title}`}
            className="object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Content Section - Below the image */}

    </section>
  )
}
