"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CTAButton } from '@/components/ui/cta-button'

interface SecteursCustomizationSectionProps {
  title: string
  mainText: string
  secondaryText: string
  ctaText: string
  ctaLink: string
  image: string
}

export function SecteursCustomizationSection({
  title,
  mainText,
  secondaryText,
  ctaText,
  ctaLink,
  image
}: SecteursCustomizationSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Reveal animation for text
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

      // Removed parallax zoom animation - keeping only hover effects
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Text */}
          <div className="js-reveal space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black tracking-[-0.02em] leading-tight">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-black/70 leading-relaxed">
              {mainText}
            </p>
            <p className="text-base md:text-lg text-black/70 leading-relaxed">
              {secondaryText}
            </p>
            {ctaText && ctaLink && (
              <div className="pt-4">
                <CTAButton
                  asChild
                  theme="black"
                >
                  <Link href={ctaLink}>
                    {ctaText}
                  </Link>
                </CTAButton>
              </div>
            )}
          </div>

          {/* Right Column - Image */}
          <div className="relative overflow-hidden group">
            <img
              src={image}
              alt={title}
              className="w-full h-[600px] md:h-[700px] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

