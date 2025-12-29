'use client'

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { urlFor } from "@/lib/sanity"
import { getExteriorSection } from "@/services/sanity"
import { InteriorExteriorSkeleton } from "@/components/home/skeletons/interior-exterior-skeleton"

interface ExteriorCategory {
  _id: string
  name: string
  description?: string
  image: any
  order: number
  link?: string
}

interface SectionContent {
  title: string
  description: string
}

export function ExteriorProductsContent() {
  const [categories, setCategories] = useState<ExteriorCategory[]>([])
  const [sectionContent, setSectionContent] = useState<SectionContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({})
  
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleSectionRef = useRef<HTMLDivElement | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch exterior section data
        const sectionData = await getExteriorSection()

        if (sectionData?.categories && sectionData?.showSection !== false) {
          const formattedCategories = sectionData.categories.map((cat: any, index: number) => ({
            _id: `exterior-${index}`,
            name: cat.name,
            description: cat.description,
            image: cat.image,
            order: cat.order || index,
            link: cat.link
          })).sort((a: any, b: any) => a.order - b.order)

          setCategories(formattedCategories)
        }

        setSectionContent({
          title: sectionData?.title || 'Extérieur',
          description: sectionData?.description || 'Conception et réalisation de façades innovantes et de solutions extérieures durables pour valoriser l\'architecture moderne.'
        })
      } catch (error) {
        console.error('Error fetching exterior data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // GSAP Scroll Animations
  useEffect(() => {
    if (loading || !categories.length) return

    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    const titleSection = titleSectionRef.current
    const grid = gridRef.current
    if (!section || !titleSection || !grid) return

    const ctx = gsap.context(() => {
      // Animate scroll indicator arrow
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        })

        // Fade out arrow when scrolling
        gsap.to(arrowRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: titleSection,
            start: "top top",
            end: "20% top",
            scrub: true,
          }
        })
      }

      // Reveal animations for title section elements
      const titleElements = titleSection.querySelectorAll('.js-reveal')
      titleElements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        )
      })

      // Staggered reveal for grid items
      const gridItems = grid.querySelectorAll('.js-grid-item')
      gridItems.forEach((item, i) => {
        const img = item.querySelector('.js-parallax-img') as HTMLElement
        if (img) {
          // Performance hints
          gsap.set(img, { willChange: 'transform', force3D: true, transformOrigin: '50% 50%' })
          
          // Parallax scale effect on scroll
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          )
        }

        // Reveal animation for grid items
        gsap.fromTo(
          item,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.08,
          }
        )
      })

      // Parallax effect for entire grid section
      gsap.set(grid, { willChange: 'transform', force3D: true })
      gsap.fromTo(
        grid,
        { y: 0 },
        {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: grid,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [loading, categories.length])

  const handleImageLoad = (categoryId: string) => {
    setImageLoaded(prev => ({ ...prev, [categoryId]: true }))
  }

  if (loading) {
    return <InteriorExteriorSkeleton sectionId="exterieur" isInterior={false} />
  }

  if (!categories.length) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h2 className="text-2xl font-light text-gray-600 mb-2">Aucun contenu disponible</h2>
          <p className="text-gray-500">Les produits extérieurs seront bientôt disponibles.</p>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="exterieur" className="w-full relative z-10 m-0 p-0 bg-white">
      {/* Title Section - Enhanced with GSAP animations */}
      <div ref={titleSectionRef} className="w-full bg-gray-100 border-b border-gray-200/50 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, black 2px, black 4px)`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24">
          {/* Section Indicator */}
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-6">
            <span className="h-[1px] w-8 bg-black/30" /> Extérieur
          </div>

          {/* Main Title */}
          <h1 className="js-reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-black mb-4 sm:mb-5 md:mb-6 tracking-[-0.02em] leading-[0.95]">
            {sectionContent?.title || 'Extérieur'}
          </h1>

          {/* Sub-headline */}
          {sectionContent?.description && (
            <h2 className="js-reveal text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-black/70 mb-8 sm:mb-10 md:mb-12 tracking-[-0.02em] leading-relaxed max-w-4xl">
              {sectionContent.description}
            </h2>
          )}

          {/* Decorative Element - Enhanced */}
          <div className="js-reveal flex items-center gap-3 mt-8 sm:mt-10 md:mt-12">
            <svg width="100" height="2" className="text-black/20" viewBox="0 0 100 2">
              <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            <div className="w-2 h-2 rounded-full bg-black/30"></div>
            <svg width="100" height="2" className="text-black/20" viewBox="0 0 100 2">
              <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        {/* Scroll indicator arrow */}
        <div
          ref={arrowRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-black/60 text-xs tracking-[0.15em] uppercase font-light">
              Découvrez nos produits
            </p>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black/40"
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

      {/* Images Grid - Enhanced with parallax and animations */}
      <div className="min-h-screen w-full overflow-hidden relative m-0 p-0 bg-black">
        <div ref={gridRef} className="w-full h-screen m-0 p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-full w-full gap-0 m-0 p-0">
            {categories.map((category, index) => {
              const imageUrl = category.image ? urlFor(category.image).quality(90).width(1400).url() : "/placeholder.svg"
              const isLoaded = imageLoaded[category._id]

              const content = (
                <>
                  {/* Image with loading state and parallax */}
                  <div className="relative w-full h-full overflow-hidden">
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-pulse" />
                    )}
                    <img
                      src={imageUrl}
                      alt={category.name}
                      className={`js-parallax-img w-full h-full object-cover transition-all duration-700 ease-out ${
                        isLoaded 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-105'
                      } group-hover:scale-110`}
                      onLoad={() => handleImageLoad(category._id)}
                      loading={index < 3 ? "eager" : "lazy"}
                      fetchPriority={index < 3 ? "high" : "low"}
                    />
                    
                    {/* Subtle vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
                  </div>

                  {/* Enhanced overlay with multiple layers */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Border highlight on hover */}
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
                  
                  {/* Category Info Overlay - Enhanced */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/98 via-black/85 to-transparent p-4 sm:p-5 md:p-6 lg:p-8 transform translate-y-0 group-hover:translate-y-0 transition-all duration-700">
                    {/* Category number indicator */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5">
                        <span className="text-white/60 text-xs font-light">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                    </div>

                    <h3 className="text-white font-light text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide mb-2 sm:mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-white/85 text-xs sm:text-sm md:text-base font-light leading-relaxed line-clamp-2 mb-3 sm:mb-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-75">
                        {category.description}
                      </p>
                    )}
                    {category.link && (
                      <div className="mt-3 sm:mt-4 flex items-center gap-2 text-white/95 text-xs sm:text-sm font-light tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150 transform translate-y-2 group-hover:translate-y-0">
                        <span>Découvrir</span>
                        <svg 
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Hover indicator - Enhanced */}
                  {category.link && (
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/20 group-hover:scale-110">
                      <svg 
                        className="w-5 h-5 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  )}

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>
                </>
              )

              return category.link ? (
                <Link 
                  key={category._id} 
                  href={category.link}
                  className="js-grid-item relative group overflow-hidden h-full w-full m-0 p-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300"
                  aria-label={`Voir les produits ${category.name}`}
                >
                  {content}
                </Link>
              ) : (
                <div 
                  key={category._id}
                  className="js-grid-item relative group overflow-hidden h-full w-full m-0 p-0"
                >
                  {content}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
