"use client"

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

      // Parallax for image
      const parallaxEl = section.querySelector('.js-parallax')
      if (parallaxEl) {
        gsap.set(parallaxEl, { willChange: 'transform', force3D: true })
        gsap.fromTo(
          parallaxEl,
          { scale: 1.05 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: parallaxEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Text */}
          <div className="js-reveal space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-black leading-tight">
              {title}
            </h2>
            <p className="text-base md:text-lg text-black/75 leading-relaxed font-light">
              {mainText}
            </p>
            <p className="text-sm md:text-base text-black/60 leading-relaxed font-light">
              {secondaryText}
            </p>
            {ctaText && ctaLink && (
              <div className="pt-4">
                <Link
                  href={ctaLink}
                  className="inline-block border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors duration-200"
                >
                  {ctaText}
                </Link>
              </div>
            )}
          </div>

          {/* Right Column - Image */}
          <div className="js-parallax relative overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-[600px] md:h-[700px] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

