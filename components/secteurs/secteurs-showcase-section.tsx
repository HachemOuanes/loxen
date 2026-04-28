"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SecteursFeaturesSection } from './secteurs-features-section'

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
    text?: {
      title?: string
      subtitle?: string
      description?: string
    }
  }[]
  features?: Array<{
    icon: string | null
    label: string
  }>
}

export function SecteursShowcaseSection({
  heroImage,
  leftText,
  rightText,
  images,
  features
}: SecteursShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Removed parallax zoom animation - keeping only hover effects

  return (
    <section ref={sectionRef} className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Big Hero Image - moved to top, same height as products page hero image */}
        <div className="relative overflow-hidden mb-8 md:mb-12 group h-[95vh]">
          <Image
            src={heroImage}
            alt="Secteurs showcase"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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

        {/* Two Images with Text - same height as inspiration collage images with gap */}
        {images && images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
            {images.map((image, imageIndex) => (
            <div key={imageIndex} className="space-y-8 md:space-y-12">
              {/* Image */}
              <div className="relative overflow-hidden h-[95vh] group">
                <Image
                  src={image.src}
                  alt={image.alt || ''}
                  fill
                  sizes="50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Text below image - left aligned for first image, right aligned for second image */}
              {image.text && (image.text.subtitle || image.text.title || image.text.description) && (
                <div className={`js-reveal px-4 md:px-6 max-w-[50ch] ${imageIndex === 0 ? 'text-left' : 'text-right ml-auto'}`}>
                  {image.text.subtitle && (
                    <p className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">
                      {image.text.subtitle}
                    </p>
                  )}
                  {image.text.title && (
                    <h4 className="mt-2 text-2xl md:text-3xl lg:text-4xl text-black tracking-tight leading-tight">
                      {image.text.title}
                    </h4>
                  )}
                  {image.text.description && (
                    <p className="mt-2 text-lg md:text-xl text-black/70 italic leading-relaxed">
                      {image.text.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
