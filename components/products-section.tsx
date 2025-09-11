import { Button } from "@/components/ui/button"

export function ProductsSection() {
  const products = [
    {
      name: "MEG",
      description: "Panneaux haute performance pour façades ventilées.",
      image: "/modern-architectural-facade-panels-meg-system-high.jpg",
    },
    {
      name: "EASY MEG",
      description: "Version simplifiée et rapide à installer des panneaux MEG.",
      image: "/contemporary-composite-facade-panels-copanel-moder.jpg",
    },
    {
      name: "COPANEL",
      description: "Solutions composites polyvalentes pour enveloppes modernes.",
      image: "/elegant-composite-panel-facade-system-lightweight-.jpg",
    },
    {
      name: "Panneau Composite",
      description: "Matériau léger, durable et esthétique pour applications variées.",
      image: "/sophisticated-ventilated-facade-system-performance.jpg",
    },
  ]

  return (
    <section id="produits" className="py-16 sm:py-24 lg:py-32 bg-white relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extralight text-black mb-6 sm:mb-8 tracking-[-0.02em]">
            Produits
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-px bg-black/20 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-light px-4">
            Une sélection de matériaux et systèmes de référence adaptés à chaque projet architectural.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-none">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 scale-105"
                />
              </div>
              <div className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl font-light text-black mb-3 sm:mb-4 tracking-wide">{product.name}</h3>
                <p className="text-gray-600 font-light leading-relaxed text-xs sm:text-sm">{product.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <Button
            variant="outline"
            size="lg"
            className="text-sm sm:text-base px-8 sm:px-12 py-3 sm:py-4 bg-transparent border-2 border-black/20 text-black hover:bg-black hover:text-white font-light tracking-wider rounded-none transition-all duration-300"
          >
            Voir les catalogues produits
          </Button>
        </div>
      </div>
    </section>
  )
}
