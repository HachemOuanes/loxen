"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SecteursShowcaseSectionProps {
  heroImage: string
  leftText?: {
    title?: string
    subtitle?: string
    description?: string
  }
  rightText?: {
    title?: string
    subtitle?: string
    description?: string
  }
  images?: {
    src: string
    alt: string
  }[]
}

export function SecteursShowcaseSection({
  heroImage,
  leftText,
  rightText,
  images
}: SecteursShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Parallax for showcase images - very subtle zoom effect
      const parallaxEls = gsap.utils.toArray<HTMLElement>('.js-parallax')
      parallaxEls.forEach((el) => {
        gsap.set(el, { willChange: 'transform', force3D: true })
        gsap.fromTo(
          el,
          { scale: 1.02 }, // very subtle initial zoom (2% instead of 5%)
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2, // much slower, barely noticeable animation
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Big Hero Image - moved to top, same height as products page hero image */}
        <div className="js-parallax relative overflow-hidden mb-8 md:mb-12" data-speed="0.3">
          <img
            src={heroImage}
            alt="Secteurs showcase"
            className="w-full h-[95vh] object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        
        {/* Two Text Columns - Only render if at least one text block exists */}
        {(leftText || rightText) && (
        <div className="grid grid-cols-2 gap-4 mb-8 md:mb-12">
          {/* Left Text */}
            {leftText && (
          <div className="js-reveal px-4 md:px-6 text-left max-w-[50ch]">
                {leftText.subtitle && (
            <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60">{leftText.subtitle}</p>
                )}
                {leftText.title && (
            <h4 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">{leftText.title}</h4>
                )}
                {leftText.description && (
            <p className="mt-2 text-base md:text-lg text-black/75 italic leading-snug">{leftText.description}</p>
                )}
          </div>
            )}

          {/* Right Text */}
            {rightText && (
          <div className="js-reveal px-4 md:px-6 text-right max-w-[50ch] ml-auto">
                {rightText.subtitle && (
            <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60">{rightText.subtitle}</p>
                )}
                {rightText.title && (
            <h4 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">{rightText.title}</h4>
                )}
                {rightText.description && (
            <p className="mt-2 text-base md:text-lg text-black/75 italic leading-snug">{rightText.description}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Two Images - same height as inspiration collage images with gap */}
        {images && images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
            {images.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className="js-parallax relative overflow-hidden h-[95vh]"
            >
              <img
                src={image.src}
                  alt={image.alt || ''}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
