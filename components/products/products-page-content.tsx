'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { client, urlFor } from "@/lib/sanity"

interface Product {
  _id: string
  name: string
  slug: { current: string }
  description: string
  longDescription?: string
  image: any
  gallery?: any[]
  category: {
    _id: string
    name: string
    slug: { current: string }
    color?: string
  }
  specifications?: Array<{ label: string; value: string }>
  features?: string[]
  price?: string
  featured: boolean
  order: number
}

interface ProductCategory {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  image?: any
  color?: string
  order: number
}

interface ProductsPageData {
  title: string
  subtitle?: string
  heroImage?: any
  filterTitle: string
  allCategoriesText: string
  noResultsText: string
  featuredSectionTitle: string
  showFeaturedSection: boolean
  ctaTitle: string
  ctaDescription?: string
  ctaButtonText: string
  ctaButtonLink: string
}

export function ProductsPageContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [pageData, setPageData] = useState<ProductsPageData | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products with category information
        const productsQuery = `*[_type == "productItem"] | order(featured desc, order asc) {
          _id,
          name,
          slug,
          description,
          longDescription,
          image,
          gallery,
          category->{
            _id,
            name,
            slug,
            color
          },
          specifications,
          features,
          price,
          featured,
          order
        }`
        const productsData = await client.fetch(productsQuery)
        setProducts(productsData)

        // Fetch categories
        const categoriesQuery = `*[_type == "productCategory"] | order(order asc)`
        const categoriesData = await client.fetch(categoriesQuery)
        setCategories(categoriesData)

        // Fetch page content
        const pageQuery = `*[_type == "productsPage"][0]`
        const pageDataResult = await client.fetch(pageQuery)
        setPageData(pageDataResult)

      } catch (error) {
        console.error('Error fetching products data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category?._id === selectedCategory)

  const featuredProducts = products.filter(product => product.featured)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        {pageData?.heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${urlFor(pageData.heroImage).width(1920).height(1080).quality(95).url()}')`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 tracking-[-0.02em]">
            {pageData?.title || 'Nos Produits'}
          </h1>
          {pageData?.subtitle && (
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              {pageData.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      {pageData?.showFeaturedSection && featuredProducts.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-black mb-6 tracking-[-0.02em]">
                {pageData?.featuredSectionTitle || 'Produits Vedettes'}
              </h2>
              <div className="w-16 sm:w-20 lg:w-24 h-px bg-black/20 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredProducts.slice(0, 3).map((product) => (
                <div key={product._id} className="group bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={urlFor(product.image).width(800).height(600).quality(95).url()}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <Badge 
                      className="absolute top-4 left-4 bg-black text-white"
                    >
                      Vedette
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge 
                        variant="outline" 
                        style={{ 
                          borderColor: product.category?.color || '#3B82F6',
                          color: product.category?.color || '#3B82F6'
                        }}
                      >
                        {product.category?.name}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-light text-black mb-3 tracking-wide">{product.name}</h3>
                    <p className="text-gray-600 font-light leading-relaxed text-sm mb-4">
                      {product.longDescription || product.description}
                    </p>
                    {product.price && (
                      <p className="text-lg font-medium text-black mb-4">{product.price}</p>
                    )}
                    {product.features && product.features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-black mb-2">Caractéristiques clés:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-black mb-6 tracking-[-0.02em]">
              {pageData?.filterTitle || 'Tous nos Produits'}
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-px bg-black/20 mx-auto"></div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              onClick={() => setSelectedCategory('all')}
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className="rounded-full"
            >
              {pageData?.allCategoriesText || 'Tous les produits'}
            </Button>
            {categories.map((category) => (
              <Button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                variant={selectedCategory === category._id ? 'default' : 'outline'}
                className="rounded-full"
                style={selectedCategory === category._id ? {
                  backgroundColor: category.color || '#000',
                  borderColor: category.color || '#000'
                } : {}}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="group bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={urlFor(product.image).width(600).height(800).quality(95).url()}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                        style={{ 
                          borderColor: product.category?.color || '#3B82F6',
                          color: product.category?.color || '#3B82F6'
                        }}
                      >
                        {product.category?.name}
                      </Badge>
                      {product.featured && (
                        <Badge className="text-xs bg-black text-white">
                          Vedette
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-light text-black mb-2 tracking-wide">{product.name}</h3>
                    <p className="text-gray-600 font-light leading-relaxed text-sm mb-3 line-clamp-3">
                      {product.description}
                    </p>
                    {product.price && (
                      <p className="text-base font-medium text-black">{product.price}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {pageData?.noResultsText || 'Aucun produit trouvé dans cette catégorie.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      {pageData && (
        <section className="py-16 sm:py-20 bg-black text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight mb-6 tracking-[-0.02em]">
              {pageData.ctaTitle}
            </h2>
            {pageData.ctaDescription && (
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                {pageData.ctaDescription}
              </p>
            )}
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 font-light tracking-wider px-8 py-6 text-lg"
              onClick={() => scrollToSection(pageData.ctaButtonLink.replace('#', ''))}
            >
              {pageData.ctaButtonText}
            </Button>
          </div>
        </section>
      )}
    </>
  )
}
