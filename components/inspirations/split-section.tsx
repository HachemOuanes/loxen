"use client"

import { urlFor } from '@/lib/sanity'

interface SplitSectionProps {
  topImage: any
  topText?: {
    title?: string
    subtitle?: string
    description?: string
  } | null
  bottomImage: any
  title?: string
}

export function SplitSection({ topImage, topText, bottomImage, title }: SplitSectionProps) {

  return (
    <section className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {title && (
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
            <span className="h-[1px] w-8 bg-black/20" /> {title}
          </div>
        )}
        {/* Top half: Image left, Text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
          {/* Left: Image */}
          <div className="relative overflow-hidden h-[47.5vh]">
            <img
              src={topImage ? urlFor(topImage).quality(100).url() : '/placeholder.jpg'}
              alt={topText?.title || 'Detail'}
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Right: Text */}
          {topText && (
            <div className="flex items-center px-4 md:px-6">
              <div>
                {topText.subtitle && (
                  <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60 mb-2">
                    {topText.subtitle}
                  </p>
                )}
                {topText.title && (
                  <h4 className="text-2xl md:text-3xl font-light tracking-tight text-black leading-tight mb-4">
                    {topText.title}
                  </h4>
                )}
                {topText.description && (
                  <p className="text-base md:text-lg text-black/75 italic leading-snug">
                    {topText.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom half: Full width image */}
        <div className="relative overflow-hidden h-[47.5vh]">
          <img
            src={bottomImage ? urlFor(bottomImage).quality(100).url() : '/placeholder.jpg'}
            alt="Detail"
            className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}

