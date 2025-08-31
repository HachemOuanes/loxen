"use client"

import { useEffect, useRef } from "react"

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".mission-item")
    elements?.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <rect x="100" y="100" width="200" height="1" fill="currentColor" />
          <rect x="900" y="300" width="150" height="1" fill="currentColor" />
          <rect x="300" y="600" width="100" height="1" fill="currentColor" />
          <circle cx="800" cy="150" r="1" fill="currentColor" />
          <circle cx="200" cy="400" r="1" fill="currentColor" />
          <circle cx="1000" cy="500" r="1" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-24">
          <div className="w-16 h-px bg-black mx-auto mb-12"></div>
          <h2 className="text-5xl md:text-7xl font-light font-[var(--font-playfair)] text-black mb-8 tracking-tight">
            Notre Philosophie
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Créer l'excellence architecturale à travers la précision, l'innovation et des principes de design
            intemporels
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
            {/* Innovation */}
            <div className="mission-item opacity-0 text-center" style={{ animationDelay: "200ms" }}>
              <div className="mb-8">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto">
                  <rect x="20" y="20" width="40" height="40" fill="none" stroke="black" strokeWidth="1" />
                  <rect x="30" y="30" width="20" height="20" fill="none" stroke="black" strokeWidth="1" />
                  <circle cx="40" cy="40" r="3" fill="black" />
                </svg>
              </div>
              <h3 className="text-2xl font-light font-[var(--font-playfair)] text-black mb-6 tracking-wide">
                Précision
              </h3>
              <p className="text-gray-600 font-light leading-relaxed text-sm">
                Chaque détail méticuleusement conçu pour atteindre la perfection architecturale et l'intégrité
                structurelle
              </p>
            </div>

            {/* Quality */}
            <div className="mission-item opacity-0 text-center" style={{ animationDelay: "400ms" }}>
              <div className="mb-8">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto">
                  <circle cx="40" cy="40" r="25" fill="none" stroke="black" strokeWidth="1" />
                  <circle cx="40" cy="40" r="15" fill="none" stroke="black" strokeWidth="1" />
                  <circle cx="40" cy="40" r="5" fill="none" stroke="black" strokeWidth="1" />
                  <circle cx="40" cy="40" r="1" fill="black" />
                </svg>
              </div>
              <h3 className="text-2xl font-light font-[var(--font-playfair)] text-black mb-6 tracking-wide">
                Innovation
              </h3>
              <p className="text-gray-600 font-light leading-relaxed text-sm">
                Pionnier des technologies avancées de façades qui redéfinissent les limites de l'architecture moderne
              </p>
            </div>

            {/* Partnership */}
            <div className="mission-item opacity-0 text-center" style={{ animationDelay: "600ms" }}>
              <div className="mb-8">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto">
                  <path d="M20 40 L40 20 L60 40 L40 60 Z" fill="none" stroke="black" strokeWidth="1" />
                  <path d="M30 40 L40 30 L50 40 L40 50 Z" fill="none" stroke="black" strokeWidth="1" />
                  <circle cx="40" cy="40" r="2" fill="black" />
                </svg>
              </div>
              <h3 className="text-2xl font-light font-[var(--font-playfair)] text-black mb-6 tracking-wide">
                Excellence
              </h3>
              <p className="text-gray-600 font-light leading-relaxed text-sm">
                Engagement sans compromis envers la qualité qui dépasse les attentes et résiste à l'épreuve du temps
              </p>
            </div>
          </div>

          <div className="mission-item opacity-0 text-center" style={{ animationDelay: "800ms" }}>
            <div className="border-t border-gray-200 pt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-4xl mx-auto">
                <div>
                  <div className="text-4xl font-light font-[var(--font-playfair)] text-black mb-2">500+</div>
                  <div className="text-sm text-gray-500 font-light tracking-widest uppercase">Projets Réalisés</div>
                </div>
                <div>
                  <div className="text-4xl font-light font-[var(--font-playfair)] text-black mb-2">50+</div>
                  <div className="text-sm text-gray-500 font-light tracking-widest uppercase">Marchés Mondiaux</div>
                </div>
                <div>
                  <div className="text-4xl font-light font-[var(--font-playfair)] text-black mb-2">15+</div>
                  <div className="text-sm text-gray-500 font-light tracking-widest uppercase">Années d'Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-24">
          <div className="w-8 h-px bg-black"></div>
        </div>
      </div>
    </section>
  )
}
