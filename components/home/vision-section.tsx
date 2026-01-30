"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { VisionSkeleton } from "@/components/home/skeletons/vision-skeleton"
import type { HomeVisionSection } from "@/lib/types/home"

interface VisionSectionProps {
  data?: HomeVisionSection | null
}

export function VisionSection({ data }: VisionSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Don't display section if no data at all
  if (!data) {
    return null
  }

  const largeText = data.largeText
  const smallText = data.smallText

  // Don't render if neither text exists
  if (!largeText && !smallText) {
    return null
  }

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const textElements = sectionRef.current?.querySelectorAll('.js-reveal-text')
      if (textElements) {
        textElements.forEach((el, i) => {
          gsap.fromTo(
            el as HTMLElement,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el as HTMLElement,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: i * 0.2,
            }
          )
        })
      }
    }, sectionRef.current)

    return () => ctx.revert()
  }, [data])

  return (
    <section ref={sectionRef} id="vision" className="w-full relative z-10 m-0 p-0 bg-gradient-to-b from-gray-100 to-white">
      <div className="w-[calc(100%-2rem)] ml-4 px-6 md:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-8 items-center">
          {/* Large text on the left */}
          {largeText && (
            <div className="flex flex-col col-span-6">
              <h2 className="js-reveal-text text-[65px] sm:text-[75px] md:text-[80px] lg:text-[95px] xl:text-[110px] text-black tracking-[-0.02em] leading-tight whitespace-pre-line">
                {largeText}
              </h2>
            </div>
          )}

          {/* Small text on the right, aligned with top */}
          {smallText && (
            <div className="flex flex-col col-span-2">
              <p className="js-reveal-text text-base md:text-xl text-black/70 leading-relaxed whitespace-pre-line">
                {smallText}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

