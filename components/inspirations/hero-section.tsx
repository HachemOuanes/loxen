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
  const arrowRef = useRef<HTMLDivElement | null>(null)

  // Sticky hero: image scales down and moves right, text reveals on the left
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const hero = stickyHeroRef.current
    if (!hero) return
    const figure = hero.querySelector('.js-hero-figure') as HTMLElement | null
    const text = hero.querySelector('.js-hero-text') as HTMLElement | null
    if (!figure) return

    // Animate arrow indicator
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Fade out arrow when scrolling
      gsap.to(arrowRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "20% top", // Fade out in first 20% of scroll
          scrub: true,
        }
      });
    }

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
        const innerPadding = 30;
        const innerWidth = window.innerWidth;
        const xPixels = (innerWidth - width);
        const figureWidth = figure.offsetWidth;
        
        const shrinkFactor = width / (innerWidth + innerPadding);

        gsap.set(figure, { transformOrigin: `center center` });
        // Move image to the right while scaling down
        tl.fromTo(
          figure,
          { scaleY: 1.0, scaleX: 1.0, x: 0, xPercent: 0, yPercent: 0, immediateRender: false },
          { scaleY: shrinkFactor, scaleX: shrinkFactor, x: 0, xPercent: 0, yPercent: maxYPercent, ease: 'none' }
        )

        return () => tl.scrollTrigger?.kill()
      }
    )
  }, [])

  return (
    <section className="relative bg-white">
      {/* Full-viewport overlay image that animates to the right */}
      <div ref={stickyHeroRef} className='h-[210vh]'>
        <img 
          src={heroImage ? urlFor(heroImage).width(1920).height(1080).quality(90).url() : '/salle-de-bain/solid-top-piano-hpl-bagni-02.jpg'} 
          alt={`Plan ${title} effet bois`} 
          className="js-hero-figure h-screen w-full object-cover" 
          loading="eager" 
          decoding="async" 
          fetchPriority="high" 
        />

        <div className="relative h-[110vh] max-w-7xl mx-auto px-4 md:px-6 py-20 gap-6 js-hero-text flex flex-col justify-end items-center">
          <div className='bg-white/80 backdrop-blur-sm  w-full py-6 px-6'>
            <div className=''>
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-3">
                <span className="h-[1px] w-8 bg-black/30" /> Inspirations
              </div>
              <h1 className="text-3xl md:text-6xl font-light tracking-tight text-black mb-4 ">{title}</h1>
            </div>
            <div className="">
              <p className="text-base md:text-lg text-black/70 leading-relaxed">{description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#examples" className="border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">Voir les exemples</a>
                <a href={contactLink} className="border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">{contactCta}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator arrow */}
        <div 
          ref={arrowRef}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/90 text-xs tracking-[0.15em] uppercase font-light drop-shadow-lg">
              Découvrez les inspirations
            </p>
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white drop-shadow-2xl"
            >
              <path 
                d="M7 10L12 15L17 10" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
