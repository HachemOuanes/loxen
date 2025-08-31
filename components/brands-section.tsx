"use client"

import { useEffect, useRef } from "react"

const brands = ["Schüco", "Reynaers", "Kawneer", "Technal", "Aluprof", "Cortizo", "Aliplast", "Ponzio"]

export function BrandsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollWidth = scrollContainer.scrollWidth
    const animationDuration = scrollWidth / 50

    scrollContainer.style.animation = `scroll ${animationDuration}s linear infinite`

    return () => {
      if (scrollContainer) {
        scrollContainer.style.animation = ""
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20 relative">
          <div className="flex items-center justify-center mb-12">
            <svg width="80" height="80" className="text-black/20">
              <rect x="10" y="10" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" />
              <rect x="25" y="25" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-light font-[var(--font-playfair)] text-black mb-6 tracking-tight">
            Partenaires de Confiance
          </h2>

          <p className="text-black/60 font-light">Collaboration avec les fabricants leaders de l'industrie</p>
        </div>

        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex space-x-20 whitespace-nowrap"
            onMouseEnter={() => {
              if (scrollRef.current) {
                scrollRef.current.style.animationPlayState = "paused"
              }
            }}
            onMouseLeave={() => {
              if (scrollRef.current) {
                scrollRef.current.style.animationPlayState = "running"
              }
            }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                className="flex-shrink-0 text-3xl md:text-4xl font-light text-black/40 hover:text-black transition-colors duration-500 tracking-wider"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}
