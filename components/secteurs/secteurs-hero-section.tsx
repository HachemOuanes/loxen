'use client'

import { useEffect, useRef } from 'react'
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
    <section ref={sectionRef} className="relative">
      {/* Hero Image Section - 2/3 screen height */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-24 grid grid-cols-2 gap-8 overflow-hidden pb-8 md:pb-12">
        {/* Background image */}
        {/* Title overlay on image */}
        <div className="flex flex-col justify-center">
          <div className='w-fit'>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 font-light mb-3">
              <span className="h-[1px] w-8 bg-black/30" /> Secteurs
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black tracking-[-0.02em] leading-tight mb-8">{title}</h1>
            <div className="space-y-6 py-8">
              {/* First text section */}
              {heroTextSections?.section1 && (
                <div className="space-y-2">
                  {heroTextSections.section1.mainText && (
                    <p className="text-xl md:text-2xl text-black leading-tight">
                      {heroTextSections.section1.mainText}
                    </p>
                  )}
                  {heroTextSections.section1.description && (
                    <p className="text-lg md:text-xl text-black/70 leading-relaxed max-w-xl">
                      {heroTextSections.section1.description}
                    </p>
                  )}
                </div>
              )}

              {/* Second text section */}
              {heroTextSections?.section2 && (
                <div className="space-y-2 pt-4">
                  {heroTextSections.section2.mainText && (
                    <p className="text-xl md:text-2xl text-black leading-tight">
                      {heroTextSections.section2.mainText}
                    </p>
                  )}
                  {heroTextSections.section2.description && (
                    <p className="text-lg md:text-xl text-black/70 leading-relaxed max-w-xl">
                      {heroTextSections.section2.description}
                    </p>
                  )}
                </div>
              )}

              {/* Third text section */}
              {heroTextSections?.section3?.description && (
                <div className="space-y-2 pt-4">
                  <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-md">
                    {heroTextSections.section3.description}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-6">
                <a
                  href="#applications"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById('applications')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  className="border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors"
                >
                  Voir Applications
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden aspect-[3/4] min-h-[60vh]">
          <div ref={imageRef} className="absolute inset-0 w-full h-full">
            <img
              src={heroImage || '/contemporary-cultural-center-glass-facade-paris.png'}
              alt={`Secteur ${title}`}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
