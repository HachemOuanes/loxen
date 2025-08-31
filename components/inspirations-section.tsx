"use client"

import { useEffect, useRef } from "react"

const projects = [
  {
    title: "Tour Corporate",
    location: "Londres, Royaume-Uni",
    image: "/modern-corporate-glass-tower-facade-london.png",
  },
  {
    title: "Complexe Résidentiel",
    location: "Berlin, Allemagne",
    image: "/modern-residential-building-aluminium-facade-berlin.png",
  },
  {
    title: "Centre Culturel",
    location: "Paris, France",
    image: "/contemporary-cultural-center-glass-facade-paris.png",
  },
  {
    title: "Campus de Bureaux",
    location: "Amsterdam, Pays-Bas",
    image: "/modern-office-campus-curtain-wall-amsterdam.png",
  },
  {
    title: "Développement Mixte",
    location: "Barcelone, Espagne",
    image: "/mixed-use-building-modern-facade-barcelona.png",
  },
  {
    title: "Complexe Hôtelier",
    location: "Milan, Italie",
    image: "/luxury-hotel-glass-facade-architecture-milan.png",
  },
]

export function InspirationsSection() {
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

    const items = sectionRef.current?.querySelectorAll(".inspiration-item")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-background relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-24 relative">
          <div className="flex items-center justify-center mb-12">
            <svg width="100" height="100" className="text-foreground/8">
              <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="60" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          <h2 className="text-5xl md:text-7xl font-light font-[var(--font-playfair)] text-foreground mb-8 tracking-tight">
            Vitrine de Projets
          </h2>

          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-foreground/60 font-light leading-relaxed">
              Excellence architecturale réalisée grâce à des solutions de façades innovantes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="inspiration-item group relative opacity-0 cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden mb-6">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} - ${project.location}`}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=500&width=400&query=${project.title.toLowerCase()} modern architecture building facade ${project.location.toLowerCase()}`
                    }}
                  />
                </div>

                <div className="absolute inset-0 border border-foreground/10 group-hover:border-foreground/20 transition-colors duration-500"></div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-10 h-10 border border-white/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-light font-[var(--font-playfair)] text-foreground tracking-wide">
                  {project.title}
                </h3>
                <p className="text-foreground/50 text-sm font-light tracking-wider uppercase">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
