"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { CTAButton } from "@/components/ui/cta-button"
import type { HomeHeroSection } from "@/lib/types/home"

interface HeroSectionProps {
  heroData?: HomeHeroSection | null
}

export function HeroSection({ heroData }: HeroSectionProps) {
  const router = useRouter()
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLDivElement | null>(null)
  const ctaRef = useRef<HTMLDivElement | null>(null)

  // Don't display section if no data at all
  if (!heroData) {
    return null
  }

  const title = heroData.title
  const subtitle = heroData.subtitle
  const ctaText = heroData.ctaText
  const ctaLink = heroData.ctaLink

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 40
      })

      // Create timeline for staggered entrance
      const tl = gsap.timeline({ delay: 0.3 })
      
      if (titleRef.current) {
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        })
      }

      if (subtitleRef.current) {
        tl.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.5')
      }

      if (ctaRef.current) {
        tl.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.4')
      }
    }, sectionRef.current)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/15191845-hd_1920_1080_60fps.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex justify-center items-center pt-20">
        <div className="relative z-10 text-center w-[calc(100%-2rem)] ml-4 px-6 md:px-8 h-full flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {title && (
            <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[var(--font-inter)] text-white font-bold text-center drop-shadow-xl whitespace-pre-line">
              {title}
            </h1>
          )}

          {subtitle && (
            <div className="flex flex-col items-center w-full">
              <div ref={subtitleRef} className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed tracking-wide text-center drop-shadow-lg whitespace-pre-line">
                {subtitle}
              </div>
            </div>
          )}

          {ctaText && ctaLink && (
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-8 justify-center items-center w-full">
              <CTAButton
                theme="blurred"
                className="w-full sm:w-48 md:w-56 lg:w-64 xl:w-72"
                onClick={() => router.push(ctaLink)}
              >
                {ctaText}
              </CTAButton>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
