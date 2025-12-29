"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { HeroSectionData } from "@/lib/sanity-static"

interface HeroSectionStaticProps {
  heroData: HeroSectionData
}

export function HeroSection({ heroData }: HeroSectionStaticProps) {
  const router = useRouter()

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/15191845-hd_1920_1080_60fps.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />

      {/* Grid Pattern */}
      {/* <div className="absolute inset-0 opacity-5">
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
      </div> */}

      {/* Content */}
      <div className="relative z-10 h-full flex justify-center items-center">
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 w-full h-full flex flex-col justify-center items-center py-4 pt-40 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {/* <div className="flex flex-col items-center">
            <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-white/70 uppercase font-light mb-1 sm:mb-2 md:mb-4 drop-shadow-lg">
              {heroData?.title || 'Luxury Materials'}
            </p>
          </div> */}
          {/* 
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[12rem] font-[var(--font-inter)] text-white leading-[0.8] tracking-[-0.02em] text-center drop-shadow-xl">
            L<span className="font-extralight text-white/60">O</span>X
            <span className="font-extralight text-white/60">E</span>N
          </h1> */}
          <div className="flex flex-col gap-1">
            <h1 className="text-7xl font-[var(--font-inter)] text-white font-bold text-center drop-shadow-xl">
              Solutions Facade
            </h1>
            <h1 className="text-7xl font-[var(--font-inter)] text-white font-bold text-center drop-shadow-xl">
              Architect Premium
            </h1>
          </div>


          <div className="flex flex-col items-center">
            {/* <div className="w-10 sm:w-12 md:w-16 lg:w-24 h-px bg-white/30 mx-auto mb-2 sm:mb-3 md:mb-4 lg:mb-6"></div> */}
            <p className="text-2xl text-white/80 max-w-xs sm:max-w-4xl md:max-w-4xl mx-auto leading-relaxed tracking-wide text-center drop-shadow-lg px-2 sm:px-4">
              Transformez vos visions en réalité avec nos systèmes
              <p className="text-2xl text-white/80 max-w-xs sm:max-w-4xl md:max-w-4xl mx-auto leading-relaxed tracking-wide text-center drop-shadow-lg px-2 sm:px-4">
                 d'aluminium et façades de haute qualité
              </p>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-8 justify-center items-center lg:mt-4 rounded-md">
            <Button
              size="lg"
              className="text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg w-full sm:w-48 md:w-56 lg:w-64 xl:w-72 py-2 sm:py-2.5 md:py-3 lg:py-4 xl:py-6 bg-black/40 backdrop-blur-md text-white hover:bg-black/50 hover:scale-105 tracking-wider  rounded-full transition-all duration-300"
              onClick={() => router.push("/produits/exterieur")}
            >
              {'Découvrir'}
            </Button>

          </div>
        </div>
      </div>
    </section>
  )
}
