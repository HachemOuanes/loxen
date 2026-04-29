'use client'

import { CTAButton } from '@/components/ui/cta-button'
import { ChevronDown } from 'lucide-react'

interface ProductsHeroSectionProps {
  title: string
  overviewLeftText?: string
  overviewRightText?: string
  contactLink: string
  contactCta: string
}

export function ProductsHeroSection({ 
  title, 
  overviewLeftText, 
  overviewRightText, 
  contactLink, 
  contactCta 
}: ProductsHeroSectionProps) {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-40 pb-8 md:pb-12">
        {/* Top Section: Title and Button */}
        <div className="flex items-end justify-between gap-8 mb-8 md:mb-12">
          {/* Title on the left */}
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black tracking-[-0.02em] leading-tight">
              {title}
            </h1>
          </div>
          
          {/* Button on the right */}
          <div className="flex-shrink-0">
            <CTAButton
              theme="black"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById('examples')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              {contactCta}
              <ChevronDown className="w-4 h-4" />
            </CTAButton>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-black/10 mb-8 md:mb-12" />

        {/* Overview Section */}
        {(overviewLeftText || overviewRightText) && (
          <div>
            {/* Overview Label - Matching Spécifications style */}
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 font-light mb-4">
              <span className="h-[1px] w-8 bg-black/30" /> OVERVIEW
            </div>

            {/* Two Column Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Left Column - Larger text */}
              {overviewLeftText && (
                <div>
                  <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-black leading-relaxed">
                    {overviewLeftText}
                  </p>
                </div>
              )}

              {/* Right Column - Smaller grey text */}
              {overviewRightText && (
                <div>
                  <p className="text-base md:text-lg text-black/60 leading-relaxed">
                    {overviewRightText}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
