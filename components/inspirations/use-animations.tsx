"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useAnimations() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = rootRef.current
    if (!root) return
    
    const ctx = gsap.context(() => {
      const revealEls = gsap.utils.toArray<HTMLElement>('.js-reveal')
      revealEls.forEach((el, i) => {
        const tl = gsap.timeline({
          delay: Math.min(0.15, i * 0.04),
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
        tl.fromTo(el, { autoAlpha: 0, y: 36, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' })
      })

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
    }, root)
    
    return () => ctx.revert()
  }, [])

  return rootRef
}
