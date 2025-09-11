"use client"

import { Button } from "@/components/ui/button"

export function ExteriorSection() {
  const categories = [
    { name: "Façades ventilées", image: "/exterior-facades-ventilees.jpg" },
    { name: "Brise-Soleil", image: "/exterior-brise-soleil.jpg" },
    { name: "Mobilier Extérieur", image: "/exterior-mobilier.jpg" },
    { name: "Façades Personnalisées", image: "/exterior-facades-personnalisees.jpg" },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section id="exterieur" className="relative min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/3 min-h-[50vh] lg:min-h-0 order-2 lg:order-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 h-full gap-2 sm:gap-4 p-2 sm:p-4">
          {categories.map((category, index) => (
            <div key={index} className="relative group overflow-hidden min-h-[200px] sm:min-h-[250px]">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6">
                <h3 className="text-white font-light text-sm sm:text-base lg:text-lg tracking-wide">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/3 relative flex flex-col items-center justify-center p-4 lg:mr-4 lg:my-4 z-10 min-h-[50vh] lg:min-h-0 order-1 lg:order-2">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/exterior-design-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative text-center space-y-4 sm:space-y-6 lg:space-y-8 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-white tracking-[-0.02em]">
            Extérieur
          </h2>
          <p className="text-white/80 font-light text-sm sm:text-base lg:text-lg leading-relaxed max-w-xs sm:max-w-sm">
            Conception et réalisation de façades innovantes et de solutions extérieures durables pour valoriser
            l'architecture moderne.
          </p>
          <Button
            onClick={scrollToTop}
            className="mt-4 sm:mt-6 bg-black/40 backdrop-blur-md text-white hover:bg-black/50 hover:scale-105 font-light tracking-wider border-2 border-gray-200/20 rounded-none transition-all duration-300 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
          >
            DÉCOUVRIR
          </Button>
        </div>
      </div>
    </section>
  )
}
