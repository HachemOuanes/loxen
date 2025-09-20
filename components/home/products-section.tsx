"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { client, urlFor } from "@/lib/sanity"
import { ProductsSkeleton } from "@/components/home/skeletons/products-skeleton"

interface Product {
  _key?: string
  name: string
  description: string
  image: any
  order?: number
}

interface SectionContent {
  title: string
  description: string
  buttonText: string
}

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [sectionContent, setSectionContent] = useState<SectionContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products from unified section
        const productsQuery = `*[_type == "productsSection"][0]{
          title,
          description,
          products[]{
            _key,
            name,
            description,
            image,
            order
          },
          ctaText,
          showSection
        }`
        const sectionData = await client.fetch(productsQuery)
        
        if (sectionData?.products && sectionData?.showSection !== false) {
          setProducts(sectionData.products.sort((a: any, b: any) => a.order - b.order))
        }
        
        setSectionContent({
          title: sectionData?.title || 'Produits',
          description: sectionData?.description || 'Une sélection de matériaux et systèmes de référence adaptés à chaque projet architectural.',
          buttonText: sectionData?.ctaText || 'Voir les catalogues produits'
        })
      } catch (error) {
        console.error('Error fetching products data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <ProductsSkeleton />
  }

  if (!products.length) return null

  return (
    <section id="produits" className="py-16 bg-white relative z-10">
      <div className="container mx-auto px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extralight text-black mb-6 sm:mb-8 tracking-[-0.02em]">
            {sectionContent?.title || 'Produits'}
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-px bg-black/20 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-light px-4">
            {sectionContent?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 4 mb-12 sm:mb-16">
          {products.map((product, index) => (
            <div
              key={product._key || index}
              className="group bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.image ? urlFor(product.image).width(1024).height(1024).quality(95).url() : "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-3 sm:p-4 lg:p-6">
                <h3 className="text-lg sm:text-xl font-light text-black mb-3 sm:mb-4 tracking-wide">{product.name}</h3>
                <p className="text-gray-600 font-light leading-relaxed text-xs sm:text-sm">{product.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="text-sm sm:text-base px-8 sm:px-12 py-3 sm:py-4 bg-transparent border-2 border-black/20 text-black hover:bg-black hover:text-white font-light tracking-wider rounded-none transition-all duration-300"
          >
            {sectionContent?.buttonText || 'Voir les catalogues produits'}
          </Button>
        </div>
      </div>
    </section>
  )
}