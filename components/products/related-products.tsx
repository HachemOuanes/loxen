'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity"
import { getRelatedProducts } from "@/lib/sanity-queries"

interface RelatedProduct {
  _id: string
  name: string
  slug: { current: string }
  description: string
  image: any
  category: {
    name: string
  }
  price?: string
}

interface RelatedProductsProps {
  currentProductId: string
  categoryId: string
  categoryName: string
}

export function RelatedProducts({ currentProductId, categoryId, categoryName }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Determine product type based on category
        const productType = categoryName === 'Extérieur' ? 'exteriorProduct' : 'interiorProduct'

        const products = await getRelatedProducts(productType, currentProductId)
        setRelatedProducts(products)
      } catch (error) {
        console.error('Error fetching related products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [currentProductId, categoryId, categoryName])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extralight text-black mb-6 tracking-[-0.02em]">
              Autres produits de la catégorie {categoryName}
            </h2>
            <div className="w-16 h-px bg-black/20 mx-auto"></div>
          </div>

          {/* Loading skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white border border-gray-100">
                <div className="aspect-[3/4] bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extralight text-black mb-6 tracking-[-0.02em]">
            Autres produits de la catégorie {categoryName}
          </h2>
          <div className="w-16 h-px bg-black/20 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {relatedProducts.map((product) => (
            <div key={product._id} className="group bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300">
              <div className="aspect-1 overflow-hidden">
                <img
                  src={urlFor(product.image).width(400).height(500).quality(90).url()}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-600 uppercase tracking-wider font-light">
                    {product.category?.name}
                  </span>
                </div>

                <h3 className="text-lg font-light text-black mb-2 tracking-wide group-hover:text-gray-700 transition-colors duration-300">
                  {product.name}
                </h3>

                <p className="text-gray-600 font-light leading-relaxed text-sm line-clamp-2">
                  {product.description}
                </p>

                {product.price && (
                  <p className="text-black font-light text-sm">{product.price}</p>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-4 border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 font-light tracking-wider text-xs uppercase transition-all duration-300 rounded-none"
                  onClick={() => {
                    const basePath = categoryName === 'Extérieur' ? '/produits/exterieur' : '/produits/interieur'
                    window.location.href = `${basePath}/${product.slug?.current}`
                  }}
                >
                  Voir le détail
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-black/20 bg-transparent text-black hover:bg-black hover:text-white font-light tracking-wider text-sm uppercase transition-all duration-300 rounded-none px-12"
            onClick={() => (window.location.href = '/produits')}
          >
            Voir tous les produits
          </Button>
        </div>
      </div>
    </section>
  )
}