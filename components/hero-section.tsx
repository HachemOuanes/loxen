"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset
        const rate = Math.max(scrolled * -0.3, -200)
        parallaxRef.current.style.transform = `translateY(${rate}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-32">
      <div
        ref={parallaxRef}
        className="absolute inset-0 scale-125 -top-20"
        style={{
          backgroundImage: `url('/luxury-modern-glass-facade-building-architecture-b.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%) contrast(1.1)",
          minHeight: "120vh",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="luxury-grid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#luxury-grid)" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.1" opacity="0.3" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.1" opacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6 mt-8">
        <div className="mb-12 flex flex-col items-center">
          <p className="text-sm tracking-[0.4em] text-white/70 uppercase font-light mb-4">
            Solutions Architecturales Premium
          </p>
        </div>

        <h1 className="text-8xl md:text-[12rem] font-light font-[var(--font-inter)] text-white mb-16 leading-[0.8] tracking-[-0.02em] text-center">
          L<span className="font-extralight text-white/60">O</span>X
          <span className="font-extralight text-white/60">E</span>N
        </h1>

        <div className="mb-20 flex flex-col items-center">
          <div className="w-24 h-px bg-white/30 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light tracking-wide text-center">
            Transformer les visions architecturales en réalité grâce à des solutions innovantes d'aluminium et de
            façades
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-32">
          <Button
            size="lg"
            className="text-base w-64 py-4 bg-white text-black hover:bg-white/90 font-light tracking-wider border-0 rounded-none"
          >
            EXPLORER PORTFOLIO
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base w-64 py-4 bg-transparent border border-white/20 text-white hover:bg-white/5 font-light tracking-wider rounded-none"
          >
            VOIR CATALOGUES
          </Button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
