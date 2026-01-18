"use client"

import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SolutionsSkeleton } from "@/components/home/skeletons/solutions-skeleton"
import type { HomeSolutionsSection, Solution } from "@/lib/types/home"

interface SolutionsSectionProps {
  data?: HomeSolutionsSection | null
}

export function SolutionsSection({ data }: SolutionsSectionProps) {
  const [selectedSolution, setSelectedSolution] = useState<number>(0)
  const [displayedSolution, setDisplayedSolution] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)
  const hasAnimated = useRef(false)

  // Don't display section if no data at all
  if (!data) {
    return null
  }

  const solutions: Solution[] = data.solutions || []
  const slogan = data.slogan
  const sectionLabel = data.sectionLabel

  // Don't render if no solutions
  if (!solutions.length) {
    return null
  }

  // Initialize displayed solution on first render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      setDisplayedSolution(selectedSolution)
    }
  }, [])

  // Initial scroll-triggered animation when section enters viewport
  useEffect(() => {
    if (!contentRef.current || !titleRef.current || !sectionRef.current || hasAnimated.current) return
    if (!data) return

    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    const title = titleRef.current
    const content = contentRef.current

    const ctx = gsap.context(() => {
      const benefitItems = content.querySelectorAll('.benefit-item')
      
      // Ensure initial state is set (in case inline styles weren't applied)
      gsap.set([title, ...Array.from(benefitItems)], {
        opacity: 0,
        x: 30
      })

      // Create timeline for staggered animation on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onEnter: () => {
            hasAnimated.current = true
          }
        }
      })

      // Animate title first (this is the first element)
      tl.to(title, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      })

      // Then animate each benefit with a small delay (0.1s between each)
      benefitItems.forEach((item, index) => {
        tl.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out"
        }, index === 0 ? "+=0.1" : "+=0.1")
      })
    }, section)

    return () => ctx.revert()
  }, [data, displayedSolution])

  // Handle slide out animation when selected solution changes
  useEffect(() => {
    if (!contentRef.current || !titleRef.current || isFirstRender.current) return
    if (selectedSolution === displayedSolution) return

    const content = contentRef.current
    const title = titleRef.current
    const benefitItems = content.querySelectorAll('.benefit-item')

    setIsAnimating(true)

    // Slide out all elements together
    gsap.to([title, ...Array.from(benefitItems)], {
      opacity: 0,
      x: -30,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // Update displayed solution after slide out
        setDisplayedSolution(selectedSolution)
      }
    })
  }, [selectedSolution])

  // Handle slide in animation when displayed solution updates
  useEffect(() => {
    if (!contentRef.current || !titleRef.current || isFirstRender.current) return
    if (selectedSolution !== displayedSolution) return

    // Wait for React to update DOM
    requestAnimationFrame(() => {
      const content = contentRef.current
      const title = titleRef.current
      if (!content || !title) return

      const benefitItems = content.querySelectorAll('.benefit-item')

      // Set initial state for all elements
      gsap.set([title, ...Array.from(benefitItems)], {
        opacity: 0,
        x: 30
      })

      // Create timeline for staggered animation
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false)
      })

      // Animate title first
      tl.to(title, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      })

      // Then animate each benefit with a small delay (0.1s between each starting)
      benefitItems.forEach((item, index) => {
        tl.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out"
        }, index === 0 ? "+=0.1" : "+=0.1") // Start 0.1s after previous animation starts
      })
    })
  }, [displayedSolution, selectedSolution])

  const currentSolution = solutions[displayedSolution]

  return (
    <section ref={sectionRef} id="solutions" className="w-full relative z-10 m-0 p-0 bg-gradient-to-b from-white to-gray-100">
      <div className="w-[calc(100%-2rem)] ml-4 px-6 md:px-8 py-16 md:py-24 lg:py-32">
        {/* Visual Separator at Top */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="flex-1 h-px bg-black/10"></div>
            <div className="w-2 h-2 rounded-full bg-black/30"></div>
            <div className="flex-1 h-px bg-black/10"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Column - Slogan */}
          <div className="py-6 md:py-8 pr-6 md:pr-8 border-r border-black/10">
            {/* Section Header */}
            {sectionLabel && (
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="h-[1px] w-8 bg-black/30" />
                <span className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">
                  {sectionLabel}
                </span>
              </div>
            )}

            {/* Main Slogan */}
            {slogan && (
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  text-black mb-6 tracking-[-0.02em] leading-tight [&_em]:italic [&_em]:"
                dangerouslySetInnerHTML={{ __html: slogan }}
              />
            )}

            {/* Decorative Element */}
            <div className="mt-8 flex items-center gap-2">
              <svg width="60" height="2" className="text-black/20">
                <line x1="0" y1="1" x2="60" y2="1" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
              <svg width="60" height="2" className="text-black/20">
                <line x1="0" y1="1" x2="60" y2="1" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Solution Buttons */}
            {solutions.length > 0 && (
              <div className="mt-8 flex flex-col gap-2">
                {solutions.map((solution, index) => (
                  <button
                    key={index}
                    onClick={() => !isAnimating && setSelectedSolution(index)}
                    disabled={isAnimating}
                    className={`
                      relative w-full text-left px-6 py-3 md:py-3.5
                      text-sm md:text-base tracking-wider uppercase
                      transition-all duration-300 ease-out
                      disabled:pointer-events-none disabled:opacity-50
                      outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2
                      ${
                        selectedSolution === index
                          ? "bg-black text-white"
                          : "bg-transparent text-black border border-black/10 hover:border-black/30 hover:bg-black/5"
                      }
                    `}
                  >
                    <span className="relative z-10">{solution.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Solution Benefits */}
          {currentSolution && (
            <div className="py-6 md:py-8 pl-6 md:pl-8">
              {/* Section Header */}
              {currentSolution.name && (
                <div className="mb-5">
                  <h3 
                    ref={titleRef}
                    className="text-2xl md:text-3xl lg:text-4xl text-black tracking-tight mb-2 opacity-0"
                    style={{ transform: 'translateX(30px)' }}
                  >
                    {currentSolution.name}
                  </h3>
                </div>
              )}

              {/* Benefits List */}
              {currentSolution.benefits && currentSolution.benefits.length > 0 && (
                <div ref={contentRef} className="space-y-0">
                  {currentSolution.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className={`benefit-item py-4 md:py-5 px-4 flex flex-col gap-2 rounded-sm opacity-0 ${
                        index < currentSolution.benefits.length - 1 ? 'border-b border-black/5' : ''
                      }`}
                      style={{ transform: 'translateX(30px)' }}
                    >
                      {/* Benefit Title */}
                      {benefit.title && (
                        <div className="flex items-center gap-3">
                          <span className="text-2xl md:text-3xl  tracking-tight text-black/40">
                            {(index + 1).toString().padStart(2, '0')}.
                          </span>
                          <h4 className="text-lg md:text-xl lg:text-2xl  tracking-tight text-black">
                            {benefit.title}
                          </h4>
                        </div>
                      )}

                      {/* Benefit Description */}
                      {benefit.description && (
                        <p className="text-base md:text-lg text-black/70 leading-relaxed  pl-8 md:pl-10">
                          {benefit.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Visual Separator at Bottom */}
        <div className="flex items-center justify-center mt-12">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="flex-1 h-px bg-black/10"></div>
            <div className="flex items-center gap-2">
              <svg width="8" height="8" className="text-black/30">
                <circle cx="4" cy="4" r="1" fill="currentColor" />
                <circle cx="4" cy="4" r="3.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            <div className="flex-1 h-px bg-black/10"></div>
          </div>
        </div>

        {/* Additional Visual Elements */}
        <div className="mt-12 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/50 font-light">
            <span className="h-[1px] w-6 bg-black/20"></span>
            <span>Excellence & Innovation</span>
            <span className="h-[1px] w-6 bg-black/20"></span>
          </div>
        </div>
      </div>
    </section>
  )
}

