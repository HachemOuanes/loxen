"use client"

import { useEffect, useState } from "react"

export function PartnersSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const partners = [
    { name: "Abet Laminati" },
    { name: "Copanel" },
    { name: "FunderMax" },
    { name: "Trespa" },
    { name: "Reynobond" },
    { name: "Alucobond" },
    { name: "Dibond" },
    { name: "Larson" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [partners.length])

  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-extralight text-black mb-8 tracking-[-0.02em]">Partenaires de Confiance</h2>
          <div className="w-24 h-px bg-black/20 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Collaboration avec les fabricants leaders de l'industrie.
          </p>
        </div>

        <div className="max-w-6xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
          >
            {partners.concat(partners).map((partner, index) => (
              <div key={index} className="w-1/4 flex-shrink-0 px-8">
                <div className="text-center group">
                  <h3 className="text-4xl font-extralight text-gray-800 group-hover:text-black transition-colors duration-300 tracking-[-0.01em] mb-2">
                    {partner.name}
                  </h3>
                  <div className="w-16 h-px bg-gray-300 group-hover:bg-black transition-colors duration-300 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
