"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CTAButton } from '@/components/ui/cta-button'
import { ArrowUpRight } from 'lucide-react'
import { scrollToContact } from '@/lib/scroll-to-contact'

interface ArtisticCtaSectionProps {
  title: string
  description: string
  contactCta: string
}

export function ArtisticCtaSection({ 
  title, 
  description, 
  contactCta 
}: ArtisticCtaSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Reveal animation for content
      const revealEls = gsap.utils.toArray<HTMLElement>('.js-reveal')
      revealEls.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-black text-white py-24 md:py-32 overflow-hidden">
      {/* Abstract Geometry Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            {/* Grid Pattern */}
            <pattern id="cta-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            {/* Diagonal Lines Pattern */}
            <pattern id="cta-diagonal" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="120" y2="120" stroke="white" strokeWidth="0.3" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
          <rect width="100%" height="100%" fill="url(#cta-diagonal)" />
        </svg>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Right Circle */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/5 rounded-full" />
        <div className="absolute top-24 right-24 w-24 h-24 border border-white/5 rounded-full" />
        
        {/* Bottom Left Square */}
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-white/5 rotate-45" />
        
        {/* Center Right Triangle */}
        <svg className="absolute top-1/2 right-32 -translate-y-1/2 w-20 h-20 opacity-5" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column - Title and Description */}
          <div className="js-reveal space-y-6">
            {/* Decorative Element */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="h-px flex-1 bg-white/20" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-white leading-tight">
              Parlons de votre <span className="font-extralight italic text-white/70">{title.toLowerCase()}</span>
            </h2>
            
            <p className="text-base md:text-lg text-white/60 leading-relaxed font-light max-w-xl">
              {description}
            </p>

            {/* Decorative Element */}
            <div className="flex items-center gap-2 pt-4">
              <svg width="60" height="2" className="text-white/20">
                <line x1="0" y1="1" x2="60" y2="1" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
              <svg width="60" height="2" className="text-white/20">
                <line x1="0" y1="1" x2="60" y2="1" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
          </div>

          {/* Right Column - CTA Button with Geometric Accent */}
          <div className="js-reveal flex flex-col items-center md:items-end justify-center">
            <div className="relative">
              {/* Geometric Background Shape */}
              <div className="absolute -inset-4 border border-white/10 rotate-45 pointer-events-none" />
              <div className="absolute -inset-8 border border-white/5 rotate-12 pointer-events-none" />
              
              <CTAButton
                asChild
                theme="white"
              >
                <Link 
                  href="/#contact"
                  onClick={scrollToContact}
                  className="group inline-flex items-center gap-2 cursor-pointer relative z-10"
                >
                  <span>{contactCta}</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
                </Link>
              </CTAButton>
            </div>

            {/* Decorative Lines */}
            <div className="mt-8 flex items-center gap-2">
              <div className="h-px w-16 bg-white/10" />
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="h-px w-8 bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

