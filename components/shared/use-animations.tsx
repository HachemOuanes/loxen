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
        tl.fromTo(el, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      })
    }, root)
    
    return () => ctx.revert()
  }, [])

  return rootRef
}
