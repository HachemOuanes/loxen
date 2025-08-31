"use client"

import { useEffect, useRef } from "react"

const services = [
  {
    title: "Produits",
    description: "Systèmes d'aluminium premium et solutions de façades conçus pour l'architecture moderne.",
    image: "/modern-aluminum-facade-panels-architectural-buildi.png",
  },
  {
    title: "Marques",
    description:
      "Partenariat avec des fabricants de classe mondiale pour offrir une qualité et une innovation exceptionnelles.",
    image: "/luxury-building-materials-showroom-display-modern-.png",
  },
  {
    title: "Inspirations",
    description: "Présentation de l'excellence architecturale à travers notre portfolio de projets réalisés.",
    image: "/stunning-modern-glass-building-facade-architectura.png",
  },
  {
    title: "Catalogues",
    description: "Documentation technique complète et spécifications pour toutes nos solutions.",
    image: "/architectural-technical-drawings-blueprints-modern.png",
  },
]

export function ServicesSection() {
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

    const cards = sectionRef.current?.querySelectorAll(".service-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-background relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-24 relative">
          <div className="flex items-center justify-center mb-12">
            <svg width="120" height="2" className="text-foreground/20">
              <line x1="0" y1="1" x2="120" y2="1" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          <h2 className="text-5xl md:text-7xl font-light font-[var(--font-playfair)] text-foreground mb-8 tracking-tight">
            Notre Expertise
          </h2>

          <div className="max-w-xl mx-auto mb-12">
            <p className="text-lg text-foreground/60 font-light leading-relaxed">
              Solutions complètes pour les défis architecturaux modernes
            </p>
          </div>

          <div className="flex items-center justify-center">
            <svg width="60" height="60" className="text-foreground/10">
              <circle cx="30" cy="30" r="29" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="30" cy="30" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="service-card group opacity-0"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden mb-8">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=400&width=600&query=${service.title.toLowerCase()} architectural solutions modern building facade`
                    }}
                  />
                </div>

                <div className="absolute inset-0 border border-foreground/10 group-hover:border-foreground/20 transition-colors duration-500"></div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-light font-[var(--font-playfair)] text-foreground tracking-wide">
                  {service.title}
                </h3>
                <p className="text-foreground/60 font-light leading-relaxed text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
