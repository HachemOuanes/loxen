"use client"

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { HeroSectionData } from "@/lib/sanity-static"

interface HeroSectionStaticProps {
  heroData: HeroSectionData
}

interface Slide {
  id: number
  type: 'video' | 'image'
  src: string
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export function HeroSection({ heroData }: HeroSectionStaticProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const slidesRef = useRef<HTMLDivElement | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const slides: Slide[] = [
    {
      id: 1,
      type: 'video',
      src: '/videos/15191845-hd_1920_1080_60fps.mp4',
      title: heroData?.title || 'Luxury Materials',
      subtitle: heroData?.subtitle || 'Premium HPL Solutions',
      description: heroData?.description || '',
      buttonText: heroData?.exteriorButtonText || 'Explore',
      buttonLink: '#exterieur'
    },
    {
      id: 2,
      type: 'image',
      src: '/luxury-building-materials-showroom.png',
      title: 'Heritage & Excellence',
      subtitle: 'Crafting Premium Materials Since 1985',
      description: 'Our commitment to quality and innovation has made us a leader in the HPL industry, delivering exceptional solutions for architects and designers worldwide.',
      buttonText: 'Discover Our Story',
      buttonLink: '#about'
    },
    {
      id: 3,
      type: 'image',
      src: '/premium-glass-facade-architecture-4k.jpg',
      title: 'Innovation & Design',
      subtitle: 'Pushing Boundaries in Material Science',
      description: 'We combine cutting-edge technology with timeless design principles to create materials that inspire and endure.',
      buttonText: 'View Our Products',
      buttonLink: '#products'
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const container = containerRef.current
    const slidesContainer = slidesRef.current
    if (!container || !slidesContainer) return

    const slideElements = Array.from(slidesContainer.querySelectorAll('.hero-slide')) as HTMLElement[]
    const totalSlides = slideElements.length

    // Function to get viewport height (responsive)
    const getViewportHeight = () => window.innerHeight

    // Function to initialize slides
    const initializeSlides = () => {
      slideElements.forEach((slide, index) => {
        gsap.set(slide, {
          y: 0,
          scale: 1,
          zIndex: totalSlides - index,
          force3D: true
        })
      })
    }

    // Initialize slides
    initializeSlides()

    // Create ScrollTrigger for folding animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => `+=${(totalSlides - 1) * 100}%`,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const viewportHeight = getViewportHeight()
        const progress = self.progress
        const slideProgress = progress * (totalSlides - 1)
        const currentIndex = Math.floor(slideProgress)
        const transitionProgress = slideProgress - currentIndex
        const activeIndex = Math.min(currentIndex, totalSlides - 1)

        setActiveSlide(activeIndex)

        // Folding animation - current slide peels up, next one revealed
        slideElements.forEach((slide, index) => {
          if (index === activeIndex) {
            // Current slide - peels up and away
            gsap.set(slide, {
              y: -transitionProgress * viewportHeight,
              scale: 1 - (transitionProgress * 0.05),
              zIndex: totalSlides - index
            })
          } else if (index === activeIndex + 1) {
            // Next slide - stays in place, revealed as current slides peels away
            gsap.set(slide, {
              y: 0,
              scale: 1,
              zIndex: totalSlides - index
            })
          } else if (index < activeIndex) {
            // Previous slides - already peeled away above (ensure fully off-screen)
            gsap.set(slide, {
              y: -viewportHeight * 1.1, // Extra offset to ensure fully hidden
              scale: 0.95,
              zIndex: totalSlides - index
            })
          } else {
            // Future slides - still in stack, waiting to be revealed
            gsap.set(slide, {
              y: 0,
              scale: 1,
              zIndex: totalSlides - index
            })
          }
        })
      }
    })

    // Handle resize - refresh ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)
    ScrollTrigger.addEventListener('refresh', initializeSlides)

    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.removeEventListener('refresh', initializeSlides)
      scrollTrigger.kill()
    }
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-black">
      <div ref={slidesRef} className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="hero-slide absolute inset-0"
          >
            {/* Background Media */}
            {slide.type === 'video' ? (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={slide.src}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src={slide.src}
                alt={slide.title}
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id={`luxury-grid-${slide.id}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#luxury-grid-${slide.id})`} />
                <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.1" opacity="0.3" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.1" opacity="0.3" />
              </svg>
            </div>

            {/* Content */}
            <div className={`relative z-10 h-full flex justify-center ${index === 0 ? 'items-center' : 'items-center'}`}>
              {index === 0 ? (
                // First slide - Original LOXEN design
                <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 w-full h-full flex flex-col justify-center items-center py-4 sm:py-8 md:py-12 lg:py-20 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                  <div className="flex flex-col items-center">
                    <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-white/70 uppercase font-light mb-1 sm:mb-2 md:mb-4 drop-shadow-lg">
                      {heroData?.title || slide.title}
                    </p>
                  </div>

                  <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[12rem] font-[var(--font-inter)] text-white leading-[0.8] tracking-[-0.02em] text-center drop-shadow-xl">
                    L<span className="font-extralight text-white/60">O</span>X
                    <span className="font-extralight text-white/60">E</span>N
                  </h1>

                  <div className="flex flex-col items-center">
                    <div className="w-10 sm:w-12 md:w-16 lg:w-24 h-px bg-white/30 mx-auto mb-2 sm:mb-3 md:mb-4 lg:mb-6"></div>
                    <p className="text-[11px] sm:text-xs md:text-sm lg:text-lg xl:text-xl text-white/80 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed font-light tracking-wide text-center drop-shadow-lg px-2 sm:px-4">
                      {heroData?.subtitle || slide.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-8 justify-center items-center mt-2 sm:mt-4 md:mt-6 lg:mt-8">
                    <Button
                      size="lg"
                      className="text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg w-full sm:w-48 md:w-56 lg:w-64 xl:w-72 py-2 sm:py-2.5 md:py-3 lg:py-4 xl:py-6 bg-black/40 backdrop-blur-md text-white hover:bg-black/50 hover:scale-105 font-light tracking-wider border-2 border-gray-200/20 rounded-none transition-all duration-300"
                      onClick={() => {
                        const element = document.getElementById("exterieur")
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                    >
                      {heroData?.exteriorButtonText || 'Extérieur'}
                    </Button>
                    <Button
                      size="lg"
                      className="text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg w-full sm:w-48 md:w-56 lg:w-64 xl:w-72 py-2 sm:py-2.5 md:py-3 lg:py-4 xl:py-6 bg-black/40 backdrop-blur-md text-white hover:bg-black/50 hover:scale-105 font-light tracking-wider border-2 border-gray-200/20 rounded-none transition-all duration-300"
                      onClick={() => {
                        const element = document.getElementById("interieur")
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                    >
                      {heroData?.interiorButtonText || 'Intérieur'}
                    </Button>
                  </div>
                </div>
              ) : (
                // Other slides - Custom content
                <div className="text-center max-w-6xl mx-auto px-4 sm:px-6">
                  {slide.title && (
                    <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] text-white/70 uppercase font-light mb-4 drop-shadow-lg">
                      {slide.title}
                    </p>
                  )}

                  {slide.subtitle && (
                    <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[6rem] font-[var(--font-inter)] text-white mb-8 sm:mb-12 leading-[0.9] tracking-[-0.02em] text-center drop-shadow-xl">
                      {slide.subtitle}
                    </h1>
                  )}

                  {slide.description && (
                    <div className="mb-12 sm:mb-16 flex flex-col items-center">
                      <div className="w-16 sm:w-24 h-px bg-white/30 mx-auto mb-6 sm:mb-8"></div>
                      <p className="text-sm sm:text-lg md:text-xl text-white/80 max-w-xl sm:max-w-2xl mx-auto leading-relaxed font-light tracking-wide text-center drop-shadow-lg px-4">
                        {slide.description}
                      </p>
                    </div>
                  )}

                  {slide.buttonText && (
                    <div className="flex justify-center">
                      <Button
                        size="lg"
                        className="text-base sm:text-lg w-64 sm:w-72 py-4 sm:py-6 bg-black/40 backdrop-blur-md text-white hover:bg-black/50 hover:scale-105 font-light tracking-wider border-2 border-gray-200/20 rounded-none transition-all duration-300"
                        onClick={() => {
                          if (slide.buttonLink) {
                            const element = document.querySelector(slide.buttonLink)
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' })
                            }
                          }
                        }}
                      >
                        {slide.buttonText}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-2 sm:gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => {
              if (!containerRef.current) return
              const container = containerRef.current
              const containerTop = container.getBoundingClientRect().top + window.scrollY
              const viewportHeight = window.innerHeight
              const scrollAmount = containerTop + (index * viewportHeight)
              window.scrollTo({ top: scrollAmount, behavior: 'smooth' })
            }}
            className="flex items-center justify-center p-1"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? 'bg-white w-2 h-2 sm:w-2.5 sm:h-2.5'
                  : 'bg-white/30 w-1.5 h-1.5 sm:w-2 sm:h-2'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-px h-12 sm:h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
