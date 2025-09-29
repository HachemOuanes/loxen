"use client"

import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity"
import type { HeroSectionData } from "@/lib/sanity-static"

interface HeroSectionStaticProps {
  heroData: HeroSectionData
}

export function HeroSection({ heroData }: HeroSectionStaticProps) {

  if (!heroData) return null

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-32 bg-gray-900">
      <div
        className="absolute inset-0 scale-125 -top-20"
        style={{
          backgroundImage: heroData.backgroundImage
            ? `url('${urlFor(heroData.backgroundImage).width(1024).height(1024).quality(95).url()}')`
            : "url('/clean-minimalist-architecture-facade.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "120vh",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />

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

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 mt-4 sm:mt-8">
        <div className="mb-8 sm:mb-12 flex flex-col items-center">
          <p className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] text-white/70 uppercase font-light mb-4 drop-shadow-lg">
            {heroData.title}
          </p>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[12rem] font-[var(--font-inter)] text-white mb-8 sm:mb-16 leading-[0.8] tracking-[-0.02em] text-center drop-shadow-xl">
          L<span className="font-extralight text-white/60">O</span>X
          <span className="font-extralight text-white/60">E</span>N
        </h1>

        <div className="mb-12 sm:mb-20 flex flex-col items-center">
          <div className="w-16 sm:w-24 h-px bg-white/30 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-lg md:text-xl text-white/80 max-w-xl sm:max-w-2xl mx-auto leading-relaxed font-light tracking-wide text-center drop-shadow-lg px-4">
            {heroData.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mb-16 sm:mb-32 px-4">
          <Button
            size="lg"
            className="text-base sm:text-lg w-64 sm:w-72 py-4 sm:py-6 bg-black/40 backdrop-blur-md text-white hover:bg-black/50 hover:scale-105 font-light tracking-wider border-2 border-gray-200/20 rounded-none transition-all duration-300"
            onClick={() => {
              const element = document.getElementById("exterieur")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            {heroData.exteriorButtonText}
          </Button>
          <Button
            size="lg"
            className="text-base sm:text-lg w-64 sm:w-72 py-4 sm:py-6 bg-black/40 backdrop-blur-md text-white hover:bg-black/50 hover:scale-105 font-light tracking-wider border-2 border-gray-200/20 rounded-none transition-all duration-300"
            onClick={() => {
              const element = document.getElementById("interieur")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            {heroData.interiorButtonText}
          </Button>

        </div>
      </div>

      <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-px h-12 sm:h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
