"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { urlFor } from "@/lib/sanity"
import { InspirationSkeleton } from "@/components/home/skeletons/inspiration-skeleton"
import type { HomeInspirationSection } from "@/lib/types/home"

interface InspirationSectionProps {
  data?: HomeInspirationSection | null
}

export function InspirationSection({ data }: InspirationSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Don't display section if no data at all
  if (!data) {
    return null
  }

  // Check if section should be shown (default to true if not specified)
  if (data.showSection === false) {
    return null
  }

  const sectionLabel = data.sectionLabel
  const title = data.title
  const projects = (data.projects || [])
    .filter((project): project is NonNullable<typeof project> => project != null && project.title && project.link)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .slice(0, 4) // Limit to 4 inspirations

  // Always render the section if we have data, even if no projects
  // This ensures the section is visible and can be debugged

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate header
      const headerElements = sectionRef.current?.querySelectorAll('.js-reveal-text')
      if (headerElements) {
        headerElements.forEach((el, i) => {
          gsap.fromTo(
            el as HTMLElement,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el as HTMLElement,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: i * 0.1,
            }
          )
        })
      }

      // Animate project cards with stagger
      const projectCards = sectionRef.current?.querySelectorAll('.js-reveal-card')
      if (projectCards) {
        projectCards.forEach((el, i) => {
          gsap.fromTo(
            el as HTMLElement,
            { opacity: 0, y: 80, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el as HTMLElement,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: i * 0.15,
            }
          )
        })
      }
    }, sectionRef.current)

    return () => ctx.revert()
  }, [data])

  return (
    <section ref={sectionRef} id="inspirations" className="w-full relative z-10 m-0 p-0 bg-gradient-to-b from-gray-100 to-white">
      <div className="w-[calc(100%-2rem)] ml-4 px-6 md:px-8 py-16 md:py-24 lg:py-32">
        {/* Header Section */}
        {(sectionLabel || title) && (
          <div className="mb-12">
            {/* Section Indicator */}
            {sectionLabel && (
              <div className="js-reveal-text inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-4 font-light">
                <span className="h-[1px] w-8 bg-black/30" /> {sectionLabel}
              </div>
            )}

            {/* Main Headline */}
            {title && (
              <h1 className="js-reveal-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black mb-3 tracking-[-0.02em] leading-tight whitespace-pre-line">
                {title}
              </h1>
            )}
          </div>
        )}

        {/* Inspiration Items Grid - 4 columns with varying heights */}
        {projects.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {projects.map((project, index) => {
                // Skip if project is missing required fields
                if (!project || !project.title || !project.link) {
                  return null
                }

                // Alternating heights: even indices (0, 2) are tall, odd indices (1, 3) are short
                const isTall = index % 2 === 0
                const imageHeight = isTall ? 'h-[400px] md:h-[500px] lg:h-[600px]' : 'h-[260px] md:h-[360px] lg:h-[460px]'

                return (
                  <Link
                    key={project._key || index}
                    href={project.link}
                    className="js-reveal-card group bg-white"
                  >
                    {/* Image Section - Top with varying heights */}
                    <div className={`relative overflow-hidden ${imageHeight} mb-4 bg-gray-100`}>
                      {project.image ? (
                        <>
                          <img
                            src={urlFor(project.image).width(1200).height(900).quality(90).url()}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />

                          {/* Border highlight on hover */}
                          <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none z-20"></div>

                          {/* Shine effect on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-100"></div>
                      )}
                    </div>

                    {/* Content Section - Below image */}
                    <div className="flex flex-col">
                      {/* Category and Location */}
                      {(project.category || project.location) && (
                        <div className="flex items-center justify-between mb-3">
                          {project.category && (
                            <span className="text-xs tracking-[0.18em] uppercase text-black/60 font-light">
                              {project.category}
                            </span>
                          )}
                          {project.location && (
                            <span className="text-xs tracking-[0.18em] uppercase text-black/60 font-light">
                              {project.location}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Title */}
                      {project.title && (
                        <h3 className="text-lg md:text-xl lg:text-2xl text-black group-hover:opacity-70 transition-opacity leading-tight">
                          {project.title}
                        </h3>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-black/60">
            <p>Aucune inspiration disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
