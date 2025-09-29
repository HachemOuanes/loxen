'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { client, urlFor } from "@/lib/sanity"
import { ProductsSkeleton } from "./products-skeleton"

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
  const [searchQuery, setSearchQuery] = useState<string>('')
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

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category?._id === selectedCategory
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (loading) {
    return <ProductsSkeleton />
  }

  return (
    <>
      {/* Minimal Header Section with Background */}
      <section className="pt-40 pb-4 px-4 relative z-10 min-h-[20vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {pageData?.heroImage ? (
            <img
              src={urlFor(pageData.heroImage).width(1920).height(800).quality(90).url()}
              alt="Products Header"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-white"></div>
          )}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extralight text-white mb-6 sm:mb-8 tracking-[-0.02em] drop-shadow-lg">
            {pageData?.title || 'Produits'}
          </h1>
          {pageData?.subtitle && (
            <p className="text-sm sm:text-base lg:text-lg text-white/90 font-light max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed drop-shadow-md px-4 mb-8">
              {pageData.subtitle}
            </p>
          )}
          
          {/* Search Bar in Header */}
          <div className="max-w-md mx-auto mt-8 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 text-sm border-2 border-white/30 rounded-none focus:outline-none focus:border-white bg-white/10 backdrop-blur-sm text-white placeholder-white/70 font-light tracking-wide transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="w-16 sm:w-20 h-px bg-white/40 mx-auto mt-6"></div>
        </div>
      </section>



      {/* Products Section */}
      <section className="py-16 px-4 bg-white relative z-10">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-16">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-sm font-light tracking-wide uppercase transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-black text-white'
                : 'bg-transparent text-gray-600 hover:text-black border border-gray-200 hover:border-gray-300'
            }`}
          >
            {pageData?.allCategoriesText || 'Tous'}
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`px-4 py-2 text-sm font-light tracking-wide uppercase transition-all duration-300 ${
                selectedCategory === category._id
                  ? 'bg-black text-white'
                  : 'bg-transparent text-gray-600 hover:text-black border border-gray-200 hover:border-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-12 sm:mb-16">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group relative overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={urlFor(product.image).width(1024).height(1024).quality(95).url()}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Content that expands upward while staying anchored to bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent transition-all duration-700 ease-out">
                  {/* Container for all content with proper padding */}
                  <div className="w-full px-5 sm:px-6 lg:px-7 pt-5 sm:pt-6 lg:pt-7 pb-5 sm:pb-6 lg:pb-7 group-hover:pb-2">
                    {/* Minimal initial content */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-white/80 uppercase tracking-wider font-light">
                        {product.category?.name}
                      </span>
                      {product.featured && (
                        <>
                          <span className="text-xs text-white/60">•</span>
                          <span className="text-xs text-white/80 uppercase tracking-wider font-light">
                            Vedette
                          </span>
                        </>
                      )}
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-light text-white mb-2 tracking-wide">{product.name}</h3>
                    
                    {/* Brief description - only show on hover or keep it minimal */}
                    <p className="text-white/90 font-light leading-relaxed text-xs sm:text-sm line-clamp-1 group-hover:line-clamp-none mb-2 group-hover:mb-3">
                      {product.description}
                    </p>

                    {/* Additional detailed content that reveals on hover */}
                    <div className="opacity-0 max-h-0 overflow-hidden transition-all duration-700 ease-out group-hover:opacity-100 group-hover:max-h-48">
                      {/* Features list if available */}
                      {product.features && product.features.length > 0 && (
                        <div className="mb-4">
                          <ul className="text-xs text-white/80 space-y-1">
                            {product.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Price if available */}
                      {product.price && (
                        <div className="mb-4">
                          <span className="text-sm font-medium text-white">{product.price}</span>
                        </div>
                      )}

                      {/* CTA Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-2 border-white bg-white text-black hover:bg-transparent hover:text-white font-light tracking-wider text-xs uppercase transition-all duration-300 rounded-none mb-6"
                        onClick={() => {
                          // Navigate to product detail page
                          window.location.href = `/produits/${product.slug?.current || product._id}`
                        }}
                      >
                        Voir le détail
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg font-light">
              {pageData?.noResultsText || 'Aucun produit trouvé dans cette catégorie.'}
            </p>
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      {pageData?.ctaButtonText && (
        <section className="py-16 px-4 bg-gray-50 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-black mb-6 sm:mb-8 tracking-[-0.02em]">
              {pageData?.ctaTitle || 'Besoin d\'accompagnement pour votre projet ?'}
            </h2>
            <div className="w-16 sm:w-20 h-px bg-black/20 mx-auto mb-6 sm:mb-8"></div>
            
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light mb-8 sm:mb-12 px-4">
              {pageData?.ctaDescription || 'Notre équipe d\'experts vous accompagne dans le choix des solutions les plus adaptées à vos besoins. Conseil technique, devis personnalisé et support projet : nous sommes là pour concrétiser vos idées architecturales.'}
            </p>
            
            <Button
              variant="outline"
              size="lg"
              className="text-sm sm:text-base px-8 sm:px-12 py-3 sm:py-4 bg-transparent border-2 border-black/20 text-black hover:bg-black hover:text-white font-light tracking-wider rounded-none transition-all duration-300"
              onClick={() => scrollToSection(pageData?.ctaButtonLink?.replace('#', '') || 'contact')}
            >
              {pageData?.ctaButtonText || 'Nous Contacter'}
            </Button>
          </div>
        </section>
      )}
    </>
  )
}
