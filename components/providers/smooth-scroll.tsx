"use client"

import React, { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type Props = { children: React.ReactNode }

export function SmoothScrollProvider({ children }: Props) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Avoid smooth scroll in Sanity Studio or when reduced motion is preferred
    const isStudio = window.location.pathname.startsWith('/cms')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isStudio || prefersReduced) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      // Keep it subtle and platform-friendly
      duration: 1.2, // total ease time in seconds (Lenis v1 supports duration)
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      lerp: 0.1,
    })

    // Sync GSAP ScrollTrigger on Lenis updates
    lenis.on('scroll', () => ScrollTrigger.update())

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Clean up
    return () => {
      cancelAnimationFrame(rafId)
      // @ts-ignore
      lenis?.destroy?.()
    }
  }, [])

  return <>{children}</>
}
