'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity"
import { getExteriorProducts } from "@/services/sanity"
import { ProductsSkeleton } from "./products-skeleton"

interface Product {
  _id: string
  name: string
  slug: { current: string }
  description: string
  longDescription?: string
  image: any
  specifications?: Array<{ label: string; value: string }>
  features?: string[]
  price?: string
  featured: boolean
  order: number
  inStock: boolean
  collectionName?: string
}

export function ExteriorProductsContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch exterior products
        const productsData = await getExteriorProducts()
        setProducts(productsData)

      } catch (error) {
        console.error('Error fetching exterior products data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const featuredProducts = filteredProducts.filter(product => product.featured)
  const regularProducts = filteredProducts.filter(product => !product.featured)

  if (loading) {
    return <ProductsSkeleton />
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-40 pb-4 px-4 relative z-10 min-h-[20vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extralight text-white mb-6 sm:mb-8 tracking-[-0.02em] drop-shadow-lg">
            Produits <span className="italic font-extralight">Extérieur</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 font-light max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed drop-shadow-md px-4 mb-8">
            Façades ventilées, bardages et solutions enveloppe du bâtiment. Solutions HPL premium pour vos projets extérieurs.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8 mb-6">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-none text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-black mb-4 tracking-[-0.02em]">
                Produits Vedettes
              </h2>
              <div className="w-16 h-px bg-black/20 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product._id} className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    {product.image ? (
                      <img
                        src={urlFor(product.image).width(800).height(600).quality(85).url()}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-light text-gray-900">{product.name}</h3>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                    
                    {product.collectionName && (
                      <p className="text-sm text-gray-500 mb-3">Collection: {product.collectionName}</p>
                    )}
                    
                    {product.price && (
                      <p className="text-lg font-medium text-gray-900 mb-4">{product.price}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'En stock' : 'Rupture de stock'}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors border-gray-300 hover:border-gray-400"
                        asChild
                      >
                        <a href={`/produits/exterieur/${product.slug?.current || ''}`}>
                          Voir le produit →
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-black mb-4 tracking-[-0.02em]">
              Tous les Produits Extérieurs
            </h2>
            <div className="w-16 h-px bg-black/20 mx-auto"></div>
          </div>
          
          {regularProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-light text-gray-600 mb-4">Aucun produit trouvé</h3>
              <p className="text-gray-500">Essayez de modifier votre recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularProducts.map((product) => (
                <div key={product._id} className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    {product.image ? (
                      <img
                        src={urlFor(product.image).width(800).height(600).quality(85).url()}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-light text-gray-900 mb-3">{product.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                    
                    {product.collectionName && (
                      <p className="text-sm text-gray-500 mb-3">Collection: {product.collectionName}</p>
                    )}
                    
                    {product.price && (
                      <p className="text-lg font-medium text-gray-900 mb-4">{product.price}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'En stock' : 'Rupture de stock'}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors border-gray-300 hover:border-gray-400"
                        asChild
                      >
                        <a href={`/produits/exterieur/${product.slug?.current || ''}`}>
                          Voir le produit →
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
