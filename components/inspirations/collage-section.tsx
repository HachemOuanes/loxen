"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { urlFor } from '@/lib/sanity'

interface CollageTile {
  title: string
  subtitle: string
  description: string
}

interface CollageSectionProps {
  images: any[]
  tiles: CollageTile[]
  title: string
}

export function CollageSection({ images, tiles, title }: CollageSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Set up parallax animations for this section
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const parallaxEls = gsap.utils.toArray<HTMLElement>('.js-parallax')
      parallaxEls.forEach((el) => {
        const raw = Number(el.getAttribute('data-speed') || '0.25')
        const strength = gsap.utils.clamp(0.02, 0.1, raw * 0.25) // map old speed to subtle scale
        const img = (el.querySelector('img') as HTMLElement) || el
        gsap.set(img, { willChange: 'transform', force3D: true, transformOrigin: '50% 50%' })
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: () => 1.4 + strength,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.4,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])
  return (
    <section ref={sectionRef} className="relative bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Top row: two parallax images */}
          {images?.map((image: any, imageIndex: number) => (
            <div key={imageIndex} className="js-parallax relative overflow-hidden rounded-sm border border-black/10" data-speed={imageIndex === 0 ? "0.35" : "0.2"}>
              <img 
                src={image ? urlFor(image).width(800).height(600).quality(85).url() : '/placeholder.jpg'} 
                alt={`Détail ${title}`} 
                className="h-full w-full object-cover" 
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 py-12">
          {/* Bottom row: two text tiles with contrasting styles */}
          {tiles?.map((tile: CollageTile, tileIndex: number) => (
            <div key={tileIndex} className={`js-reveal px-4 md:px-6 ${tileIndex === 0 ? 'text-left max-w-[50ch]' : 'relative overflow-hidden flex items-center justify-end bg-white'}`}>
              {tileIndex === 0 ? (
                <>
                  <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60">{tile.subtitle}</p>
                  <h4 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">{tile.title}</h4>
                  <p className="mt-2 text-base md:text-lg text-black/75 italic leading-snug">{tile.description}</p>
                </>
              ) : (
                <div className="js-reveal px-4 md:px-6 text-right max-w-[50ch] ml-auto">
                  <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60">{tile.subtitle}</p>
                  <h4 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">{tile.title}</h4>
                  <p className="mt-2 text-base md:text-lg text-black/75 italic leading-snug">{tile.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
