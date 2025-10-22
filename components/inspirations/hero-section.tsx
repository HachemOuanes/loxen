"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { urlFor } from '@/lib/sanity'

interface HeroSectionProps {
  title: string
  description: string
  heroImage: any
  contactLink: string
  contactCta: string
}

export function HeroSection({ title, description, heroImage, contactLink, contactCta }: HeroSectionProps) {
  const stickyHeroRef = useRef<HTMLDivElement | null>(null)

  // Sticky hero: image scales down and moves right, text reveals on the left
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const hero = stickyHeroRef.current
    if (!hero) return
    const figure = hero.querySelector('.js-hero-figure') as HTMLElement | null
    const text = hero.querySelector('.js-hero-text') as HTMLElement | null
    if (!figure) return

    // Performance hints
    gsap.set([figure], { willChange: 'transform', force3D: true })
    gsap.set(figure, { xPercent: 0, scale: 1, transformOrigin: '50% 50%' })

    const mm = gsap.matchMedia()
    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { isDesktop, reduce } = ctx.conditions as any
        const pinning = false // rely on CSS sticky to avoid jump
        const scrub = reduce ? false : 1.5

        const containerHeight = hero.offsetHeight;
        const figureHeight = figure.offsetHeight;
        const yDistance = containerHeight - figureHeight;
        const maxYPercent = ((yDistance) / figureHeight) * 100;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: () => "bottom bottom", // dynamic end
            scrub: 0,
            pin: pinning,
            anticipatePin: 0,
            invalidateOnRefresh: true,
          },
        });

        const width = text ? text.offsetWidth : 0;
        const innerWidth = window.innerWidth;
        const xPixels = (innerWidth - width);
        const figureWidth = figure.offsetWidth;

        gsap.set(figure, { transformOrigin: `${innerWidth - xPixels - 210}px center` });
        // Move image to the right while scaling down
        tl.fromTo(
          figure,
          { scaleY: 1.0, scaleX: 1.0, x: 0, xPercent: 0, yPercent: 0, immediateRender: false },
          { scaleY: 0.7, scaleX: 0.7, x: 0, xPercent: 0.2, yPercent: maxYPercent, ease: 'none' }
        )

        return () => tl.scrollTrigger?.kill()
      }
    )
  }, [])

  return (
    <section className="relative bg-white">
      {/* Full-viewport overlay image that animates to the right */}
      <div ref={stickyHeroRef} className='h-[200vh]'>
        <img 
          src={heroImage ? urlFor(heroImage).width(1920).height(1080).quality(90).url() : '/salle-de-bain/solid-top-piano-hpl-bagni-02.jpg'} 
          alt={`Plan ${title} effet bois`} 
          className="js-hero-figure h-screen w-full object-cover" 
          loading="eager" 
          decoding="async" 
          fetchPriority="high" 
        />

        <div className="relative h-screen max-w-7xl mx-auto px-4 md:px-6 py-16 gap-6 js-hero-text flex flex-col justify-center">
          <div className='bg-white/20 backdrop-blur-sm w-fit py-6 px-6'>
            <div className=''>
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-3">
                <span className="h-[1px] w-8 bg-black/30" /> Inspirations
              </div>
              <h1 className="text-3xl md:text-6xl font-light tracking-tight text-black mb-4 ">{title}</h1>
            </div>
            <div className="">
              <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-2xl">{description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#examples" className="border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">Voir les exemples</a>
                <a href={contactLink} className="border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">{contactCta}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
