'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SecteursHeroSectionProps {
  title: string
  description: string
  heroImage: string
  contactLink: string
  contactCta: string
}

export function SecteursHeroSection({ title, description, heroImage, contactLink, contactCta }: SecteursHeroSectionProps) {
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
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background image */}
        <div ref={imageRef} className="absolute inset-0 scale-110">
          <img 
            src={heroImage || '/contemporary-cultural-center-glass-facade-paris.png'} 
            alt={`Secteur ${title}`} 
            className="h-full w-full object-cover" 
            loading="eager" 
            decoding="async" 
            fetchPriority="high" 
          />
        </div>

        {/* Title overlay on image */}
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 py-16 flex flex-col justify-center">
          <div className='bg-white/20 backdrop-blur-sm w-fit py-6 px-6'>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-3">
              <span className="h-[1px] w-8 bg-black/30" /> Secteurs
            </div>
            <h1 className="text-3xl md:text-6xl font-light tracking-tight text-black">{title}</h1>
          </div>
        </div>
      </div>

      {/* Content Section - Below the image */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-2xl mb-8">{description}</p>
        <div className="flex flex-wrap gap-3">
          <a href="#examples" className="border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">Voir les exemples</a>
          <a href={contactLink} className="border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">{contactCta}</a>
        </div>
      </div>
    </section>
  )
}
