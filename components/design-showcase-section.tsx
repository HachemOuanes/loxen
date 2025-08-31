"use client"

import { useEffect, useRef, useState } from "react"

export function DesignShowcaseSection() {
  const interiorRef = useRef<HTMLElement>(null)
  const exteriorRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

    const elements = document.querySelectorAll(".design-item")
    elements?.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const getInteriorOffset = () => {
    if (!interiorRef.current) return 0
    const rect = interiorRef.current.getBoundingClientRect()
    const sectionTop = scrollY + rect.top
    return (scrollY - sectionTop) * 0.3
  }

  const getExteriorOffset = () => {
    if (!exteriorRef.current) return 0
    const rect = exteriorRef.current.getBoundingClientRect()
    const sectionTop = scrollY + rect.top
    return (scrollY - sectionTop) * 0.3
  }

  return (
    <>
      {/* Interior Design Section */}
      <section ref={interiorRef} className="relative h-screen overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/minimalist-black-white-interior-geometric-space.png')",
            transform: `translateY(${getInteriorOffset()}px) scale(${1.2 + Math.abs(getInteriorOffset()) * 0.0002})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            top: "-30%",
            height: "160%",
          }}
        />

        <div className="absolute inset-0 bg-black/75" />

        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <rect x="100" y="100" width="300" height="1" fill="white" />
            <rect x="800" y="200" width="200" height="1" fill="white" />
            <rect x="200" y="600" width="150" height="1" fill="white" />
            <rect x="900" y="500" width="100" height="1" fill="white" />
            <circle cx="150" cy="300" r="2" fill="white" />
            <circle cx="1000" cy="150" r="2" fill="white" />
            <circle cx="300" cy="700" r="1" fill="white" />
            <polygon points="600,100 650,150 550,150" fill="white" opacity="0.3" />
            <polygon points="400,500 450,550 350,550" fill="white" opacity="0.2" />
          </svg>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-6 text-center text-white">
            <div className="design-item opacity-0" style={{ animationDelay: "200ms" }}>
              <div className="w-16 h-px bg-white mx-auto mb-12"></div>
              <h2 className="text-6xl md:text-8xl font-extralight font-[var(--font-playfair)] mb-8 tracking-tight">
                Intérieur
              </h2>
              <h3 className="text-2xl md:text-3xl font-light mb-12 tracking-widest">EXCELLENCE EN DESIGN</h3>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-16 opacity-90">
                Transformez les espaces intérieurs avec des solutions de façades sophistiquées, des systèmes de cloisons
                élégants et des éléments architecturaux de pointe qui redéfinissent l'esthétique des espaces de travail
                modernes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
                <div className="design-item opacity-0" style={{ animationDelay: "400ms" }}>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border border-white/30 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white"></div>
                    </div>
                    <h4 className="text-sm font-light tracking-widest">SYSTÈMES DE CLOISONS</h4>
                    <p className="text-xs font-light opacity-70 leading-relaxed">
                      Cloisons en verre et aluminium pour une division flexible de l'espace
                    </p>
                  </div>
                </div>

                <div className="design-item opacity-0" style={{ animationDelay: "600ms" }}>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border border-white/30 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white"></div>
                    </div>
                    <h4 className="text-sm font-light tracking-widest">SOLUTIONS DE PLAFONDS</h4>
                    <p className="text-xs font-light opacity-70 leading-relaxed">
                      Systèmes de plafonds suspendus et intégrés avec éclairage
                    </p>
                  </div>
                </div>

                <div className="design-item opacity-0" style={{ animationDelay: "800ms" }}>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border border-white/30 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white"></div>
                    </div>
                    <h4 className="text-sm font-light tracking-widest">REVÊTEMENT MURAL</h4>
                    <p className="text-xs font-light opacity-70 leading-relaxed">
                      Matériaux premium pour la finition des murs intérieurs et l'acoustique
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-8 h-px bg-white mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Exterior Design Section */}
      <section ref={exteriorRef} className="relative h-screen overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/high-resolution-minimalist-modern-building-exterio.png')",
            transform: `translateY(${getExteriorOffset()}px) scale(${1.1 + Math.abs(getExteriorOffset()) * 0.0002})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            top: "-20%",
            height: "140%",
          }}
        />

        <div className="absolute inset-0 bg-white/75" />

        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <rect x="200" y="150" width="250" height="1" fill="black" />
            <rect x="700" y="300" width="180" height="1" fill="black" />
            <rect x="100" y="550" width="120" height="1" fill="black" />
            <rect x="950" y="400" width="150" height="1" fill="black" />
            <circle cx="800" cy="100" r="2" fill="black" />
            <circle cx="200" cy="400" r="2" fill="black" />
            <circle cx="1100" cy="600" r="1" fill="black" />
            <polygon points="500,200 550,250 450,250" fill="black" opacity="0.3" />
            <polygon points="300,600 350,650 250,650" fill="black" opacity="0.2" />
            <rect x="600" y="400" width="40" height="40" fill="none" stroke="black" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-6 text-center text-black">
            <div className="design-item opacity-0" style={{ animationDelay: "200ms" }}>
              <div className="w-16 h-px bg-black mx-auto mb-12"></div>
              <h2 className="text-6xl md:text-8xl font-extralight font-[var(--font-playfair)] mb-8 tracking-tight">
                Extérieur
              </h2>
              <h3 className="text-2xl md:text-3xl font-light mb-12 tracking-widest">MAÎTRISE ARCHITECTURALE</h3>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-16 opacity-90">
                Créez des extérieurs de bâtiments saisissants avec des systèmes de murs-rideaux avancés, des solutions
                de bardage innovantes et des vitrages structurels qui définissent l'horizon de demain.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
                <div className="design-item opacity-0" style={{ animationDelay: "400ms" }}>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border border-black/30 flex items-center justify-center">
                      <div className="w-2 h-2 bg-black"></div>
                    </div>
                    <h4 className="text-sm font-light tracking-widest">MURS-RIDEAUX</h4>
                    <p className="text-xs font-light opacity-70 leading-relaxed">
                      Systèmes de vitrage haute performance pour façades modernes
                    </p>
                  </div>
                </div>

                <div className="design-item opacity-0" style={{ animationDelay: "600ms" }}>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border border-black/30 flex items-center justify-center">
                      <div className="w-2 h-2 bg-black"></div>
                    </div>
                    <h4 className="text-sm font-light tracking-widest">PANNEAUX DE BARDAGE</h4>
                    <p className="text-xs font-light opacity-70 leading-relaxed">
                      Panneaux en aluminium et composite pour la protection météorologique
                    </p>
                  </div>
                </div>

                <div className="design-item opacity-0" style={{ animationDelay: "800ms" }}>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border border-black/30 flex items-center justify-center">
                      <div className="w-2 h-2 bg-black"></div>
                    </div>
                    <h4 className="text-sm font-light tracking-widest">VITRAGE STRUCTUREL</h4>
                    <p className="text-xs font-light opacity-70 leading-relaxed">
                      Intégration transparente du verre pour des façades continues
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-8 h-px bg-black mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
