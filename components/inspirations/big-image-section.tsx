"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { urlFor } from '@/lib/sanity'

interface TextContent {
  title?: string
  subtitle?: string
  description?: string
}

interface BigImageItem {
  image: any
  leftText?: TextContent
  rightText?: TextContent
}

interface BigImageSectionProps {
  images: BigImageItem[]
  alt?: string
  title?: string
}

export function BigImageSection({ images, alt = 'Inspiration', title }: BigImageSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Parallax effect for all big images - subtle zoom effect
      const parallaxEls = gsap.utils.toArray<HTMLElement>('.js-parallax')
      parallaxEls.forEach((parallaxEl) => {
        const img = parallaxEl.querySelector('img') as HTMLElement
        if (img) {
          gsap.set(img, { willChange: 'transform', force3D: true, transformOrigin: '50% 50%' })
          gsap.fromTo(
            img,
            { scale: 1.02 },
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
      })
    }, section)

    return () => ctx.revert()
  }, [images])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {title && (
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
            <span className="h-[1px] w-8 bg-black/20" /> {title}
          </div>
        )}
        <div className="space-y-8 md:space-y-12">
          {images.map((item, index) => (
            <div key={index} className="space-y-8 md:space-y-12">
              {/* Image */}
              <div className="js-parallax relative overflow-hidden" data-speed="0.3">
                <img
                  src={item.image ? urlFor(item.image).quality(100).url() : '/placeholder.jpg'}
                  alt={`${alt} - Image ${index + 1}`}
                  className="w-full h-[95vh] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Optional Left and Right Text */}
              {(item.leftText || item.rightText) && (
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Text */}
                  {item.leftText && (
                    <div className="js-reveal px-4 md:px-6 text-left max-w-[50ch]">
                      {item.leftText.subtitle && (
                        <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60">
                          {item.leftText.subtitle}
                        </p>
                      )}
                      {item.leftText.title && (
                        <h4 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">
                          {item.leftText.title}
                        </h4>
                      )}
                      {item.leftText.description && (
                        <p className="mt-2 text-base md:text-lg text-black/75 italic leading-snug">
                          {item.leftText.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Right Text */}
                  {item.rightText && (
                    <div className="js-reveal px-4 md:px-6 text-right max-w-[50ch] ml-auto">
                      {item.rightText.subtitle && (
                        <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60">
                          {item.rightText.subtitle}
                        </p>
                      )}
                      {item.rightText.title && (
                        <h4 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">
                          {item.rightText.title}
                        </h4>
                      )}
                      {item.rightText.description && (
                        <p className="mt-2 text-base md:text-lg text-black/75 italic leading-snug">
                          {item.rightText.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

