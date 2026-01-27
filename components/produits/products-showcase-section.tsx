"use client"

import { useRef } from 'react'
import { SecteursFeaturesSection } from '@/components/secteurs/secteurs-features-section'

interface ProductsShowcaseSectionProps {
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
  features?: Array<{
    icon: string | null
    label: string
  }>
}

export function ProductsShowcaseSection({
  heroImage,
  leftText,
  rightText,
  features
}: ProductsShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={sectionRef} className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Big Hero Image - same height as secteurs showcase */}
        <div className="relative overflow-hidden mb-8 md:mb-12 group">
          <img
            src={heroImage}
            alt="Products showcase"
            className="w-full h-[95vh] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Features Section - Rendered after big image */}
        {features && features.length > 0 && (
          <SecteursFeaturesSection features={features} />
        )}
        
        {/* Two Text Columns - Only render if at least one text block exists */}
        {(leftText || rightText) && (
          <div className="grid grid-cols-2 gap-4 mb-8 md:mb-12">
            {/* Left Text */}
            {leftText && (
              <div className="js-reveal px-4 md:px-6 text-left max-w-[50ch]">
                {leftText.subtitle && (
                  <p className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">{leftText.subtitle}</p>
                )}
                {leftText.title && (
                  <h4 className="mt-2 text-2xl md:text-3xl lg:text-4xl text-black tracking-tight leading-tight">{leftText.title}</h4>
                )}
                {leftText.description && (
                  <div className="mt-2 text-lg md:text-xl text-black/70 leading-relaxed">{leftText.description}</div>
                )}
              </div>
            )}

            {/* Right Text */}
            {rightText && (
              <div className="js-reveal px-4 md:px-6 text-right max-w-[50ch] ml-auto">
                {rightText.subtitle && (
                  <p className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">{rightText.subtitle}</p>
                )}
                {rightText.title && (
                  <h4 className="mt-2 text-2xl md:text-3xl lg:text-4xl text-black tracking-tight leading-tight">{rightText.title}</h4>
                )}
                {rightText.description && (
                  <div className="mt-2 text-lg md:text-xl text-black/70 leading-relaxed">{rightText.description}</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
