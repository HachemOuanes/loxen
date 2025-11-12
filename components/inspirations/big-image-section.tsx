"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { urlFor } from '@/lib/sanity'

interface BigImageSectionProps {
  image: any
  alt?: string
  title?: string
}

export function BigImageSection({ image, alt = 'Inspiration', title }: BigImageSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Parallax effect for the big image - subtle zoom effect
      const parallaxEl = section.querySelector('.js-parallax') as HTMLElement
      if (parallaxEl) {
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
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {title && (
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
            <span className="h-[1px] w-8 bg-black/20" /> {title}
          </div>
        )}
        <div className="js-parallax relative overflow-hidden" data-speed="0.3">
          <img
            src={image ? urlFor(image).quality(100).url() : '/placeholder.jpg'}
            alt={alt}
            className="w-full h-[95vh] object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}

