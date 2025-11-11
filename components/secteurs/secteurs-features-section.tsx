"use client"

import React, { useEffect, useRef, useState } from 'react'

interface Feature {
  icon: string | null
  label: string
}

interface SecteursFeaturesSectionProps {
  features?: Feature[]
}

export function SecteursFeaturesSection({ features }: SecteursFeaturesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const isResettingRef = useRef(false)

  // Don't render if no features provided
  if (!features || features.length === 0) {
    return null
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1
        // When we complete one full cycle, reset seamlessly
        if (next >= features.length) {
          isResettingRef.current = true
          // Reset without animation after transition completes
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.style.transition = 'none'
              containerRef.current.style.transform = 'translateX(0px)'
              requestAnimationFrame(() => {
                if (containerRef.current) {
                  containerRef.current.style.transition = 'transform 0.6s ease-in-out'
                  isResettingRef.current = false
                }
              })
            }
          }, 600)
          return 0
        }
        return next
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [features.length])

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current || isResettingRef.current) return

    const wrapper = wrapperRef.current
    const featureWidth = wrapper.offsetWidth / features.length
    const translateX = -currentIndex * featureWidth

    containerRef.current.style.transform = `translateX(${translateX}px)`
  }, [currentIndex, features.length])

  // Duplicate features for seamless infinite loop
  const duplicatedFeatures = [...features, ...features]

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div ref={wrapperRef} className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="flex"
            style={{ 
              width: `${duplicatedFeatures.length * (100 / features.length)}%`,
              transition: 'transform 0.6s ease-in-out'
            }}
          >
            {duplicatedFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-col px-8 py-6 relative flex-shrink-0"
                style={{ width: `${100 / duplicatedFeatures.length}%` }}
              >
                {/* Vertical divider */}
                {index < duplicatedFeatures.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-black/20" />
                )}
                <div className="flex items-center justify-center mb-4 text-black">
                  {feature.icon ? (
                    <img 
                      src={feature.icon} 
                      alt={feature.label}
                      className="w-10 h-10 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-black/10" />
                  )}
                </div>
                <p className="text-xs md:text-sm uppercase tracking-[0.1em] text-black text-center font-medium">
                  {feature.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
