"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { urlFor } from "@/lib/sanity"
import { getExteriorProductCategories } from "@/services/sanity/products"
import { CTAButton } from "@/components/ui/cta-button"
import { InteriorExteriorSkeleton } from "@/components/home/skeletons/interior-exterior-skeleton"

interface ExteriorCategory {
  _id: string
  name: string
  description?: string
  image: any
  order: number
  link?: string
}

interface SectionContent {
  title: string
  description: string
}

interface MockProduct {
  id: string
  name: string
  description: string
  link?: string
}

// Mock products data for each category
const mockProductsByCategory: Record<number, MockProduct[]> = {
  0: [
    { id: '1', name: 'Copanel Premium', description: 'Panneaux composites haute performance pour façades architecturales modernes.', link: '/produits/exterieur/copanel' },
    { id: '2', name: 'MEG System Pro', description: 'Système de panneaux de façade haute performance avec résistance supérieure.', link: '/produits/exterieur/meg-system' },
    { id: '3', name: 'Trespa Facade', description: 'Panneaux stratifiés haute pression premium pour applications extérieures.', link: '/produits/exterieur/trespa' },
  ],
  1: [
    { id: '4', name: 'Fundermax Classic', description: 'Solutions de façade innovantes alliant esthétique et excellence technique.', link: '/produits/exterieur/fundermax' },
    { id: '5', name: 'Abet Laminati Elite', description: 'Excellence du design italien en stratifiés haute pression.', link: '/produits/exterieur/abet' },
    { id: '6', name: 'Alucobond Premium', description: 'Panneaux composites aluminium pour façades ventilées modernes.', link: '/produits/exterieur/alucobond' },
  ],
  2: [
    { id: '7', name: 'Vitrage Structural', description: 'Systèmes de vitrage structural pour façades transparentes.', link: '/produits/exterieur/vitrage' },
    { id: '8', name: 'Curtain Wall System', description: 'Systèmes de murs-rideaux haute performance.', link: '/produits/exterieur/curtain-wall' },
    { id: '9', name: 'Double Skin Facade', description: 'Façades double peau pour efficacité énergétique optimale.', link: '/produits/exterieur/double-skin' },
  ],
}

export function ExteriorProductsContent() {
  const [categories, setCategories] = useState<ExteriorCategory[]>([])
  const [sectionContent, setSectionContent] = useState<SectionContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<number>(0)
  const [displayedCategory, setDisplayedCategory] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const productsTitleRef = useRef<HTMLDivElement>(null)
  const productsContainerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch exterior product categories data
        const sectionData = await getExteriorProductCategories()

        if (sectionData?.categories) {
          const formattedCategories = sectionData.categories.map((cat: any, index: number) => ({
            _id: `exterior-${index}`,
            name: cat.name,
            description: cat.description,
            image: cat.image,
            order: cat.order || index,
            link: cat.link
          })).sort((a: any, b: any) => a.order - b.order)

          setCategories(formattedCategories)
        } else {
          console.warn('No categories found for exterior products')
        }

        setSectionContent({
          title: sectionData?.title || 'Extérieur',
          description: sectionData?.description || 'Conception et réalisation de façades innovantes et de solutions extérieures durables pour valoriser l\'architecture moderne.'
        })
      } catch (error) {
        console.error('Error fetching exterior data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Initialize displayed category on first render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      setDisplayedCategory(selectedCategory)
    }
  }, [selectedCategory])

  // Initial animation on first load
  useEffect(() => {
    if (loading || !categories.length || hasAnimated.current) return
    if (!imageRef.current) return

    // Wait for DOM to be ready
    requestAnimationFrame(() => {
      const imageContainer = imageRef.current
      const productsTitle = productsTitleRef.current
      const productsContainer = productsContainerRef.current
      if (!imageContainer) return

      // Set initial state for image
      gsap.set(imageContainer, {
        opacity: 0,
        x: 30
      })

      // Set initial state for products title
      if (productsTitle) {
        gsap.set(productsTitle, {
          opacity: 0,
          x: 30
        })
      }

      // Set initial state for product items
      const productItems: HTMLElement[] = []
      if (productsContainer) {
        const items = productsContainer.querySelectorAll('.product-item')
        items.forEach(item => {
          const el = item as HTMLElement
          gsap.set(el, {
            opacity: 0,
            x: 30
          })
          productItems.push(el)
        })
      }

      // Create timeline for initial animation
      const tl = gsap.timeline({
        onComplete: () => {
          hasAnimated.current = true
        }
      })

      // 1. Animate image first
      tl.to(imageContainer, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      })

      // 2. Then animate products title
      if (productsTitle) {
        tl.to(productsTitle, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out"
        }, "+=0.1")
      }

      // 3. Then animate each product one by one
      productItems.forEach((item) => {
        tl.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out"
        }, "+=0.1")
      })
    })
  }, [loading, categories.length])

  // Handle slide out animation when selected category changes
  useEffect(() => {
    if (isFirstRender.current) return
    if (selectedCategory === displayedCategory) return
    if (!imageRef.current) return

    const imageContainer = imageRef.current
    const productsTitle = productsTitleRef.current
    const productsContainer = productsContainerRef.current

    setIsAnimating(true)

    // Slide out all elements together
    const elementsToAnimate: (HTMLElement | null)[] = [imageContainer]
    if (productsTitle) elementsToAnimate.push(productsTitle)
    if (productsContainer) {
      const productItems = productsContainer.querySelectorAll('.product-item')
      productItems.forEach(item => elementsToAnimate.push(item as HTMLElement))
    }

    gsap.to(elementsToAnimate, {
      opacity: 0,
      x: -30,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // Update displayed category after slide out
        setDisplayedCategory(selectedCategory)
      }
    })
  }, [selectedCategory, displayedCategory])

  // Handle slide in animation when displayed category updates
  useEffect(() => {
    if (isFirstRender.current) return
    if (selectedCategory !== displayedCategory) return
    if (!hasAnimated.current) return // Skip if initial animation hasn't completed

    // Wait for React to update DOM
    requestAnimationFrame(() => {
      const imageContainer = imageRef.current
      const productsTitle = productsTitleRef.current
      const productsContainer = productsContainerRef.current
      if (!imageContainer) return

      // Set initial state for image
      gsap.set(imageContainer, {
        opacity: 0,
        x: 30
      })

      // Set initial state for products title
      if (productsTitle) {
        gsap.set(productsTitle, {
          opacity: 0,
          x: 30
        })
      }

      // Set initial state for product items
      const productItems: HTMLElement[] = []
      if (productsContainer) {
        const items = productsContainer.querySelectorAll('.product-item')
        items.forEach(item => {
          const el = item as HTMLElement
          gsap.set(el, {
            opacity: 0,
            x: 30
          })
          productItems.push(el)
        })
      }

      // Create timeline for staggered animation
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false)
      })

      // 1. Animate image first
      tl.to(imageContainer, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      })

      // 2. Then animate products title
      if (productsTitle) {
        tl.to(productsTitle, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out"
        }, "+=0.1")
      }

      // 3. Then animate each product one by one
      productItems.forEach((item) => {
        tl.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out"
        }, "+=0.1")
      })
    })
  }, [displayedCategory, selectedCategory])

  if (loading) {
    return <InteriorExteriorSkeleton sectionId="exterieur" isInterior={false} />
  }

  if (!categories.length) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h2 className="text-2xl font-light text-gray-600 mb-2">Aucun contenu disponible</h2>
          <p className="text-gray-500">Les produits extérieurs seront bientôt disponibles.</p>
        </div>
      </section>
    )
  }

  const currentCategory = categories[displayedCategory]
  const currentProducts = mockProductsByCategory[displayedCategory] || []

  return (
    <section id="exterieur" className="w-full relative z-10 m-0 p-0 bg-white">
      <div className="w-[calc(100%-2rem)] ml-4 px-6 md:px-8 py-16 md:py-20 lg:py-24">
        {/* Main Content - 3 Column Grid */}
        <div className="grid md:grid-cols-3 gap-0 items-start">
          {/* Left Column - Category List */}
          <div className="py-6 md:py-8 lg:py-10 pr-6 md:pr-8 lg:pr-10 border-r border-black/10">
            {sectionContent?.title && (
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-black tracking-[-0.02em] leading-tight mb-8 md:mb-10">
                {sectionContent.title}
              </h1>
            )}
            
            {/* Decorative Element */}
            <div className="mb-8 md:mb-10 flex items-center gap-2">
              <svg width="60" height="2" className="text-black/20">
                <line x1="0" y1="1" x2="60" y2="1" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
              <svg width="60" height="2" className="text-black/20">
                <line x1="0" y1="1" x2="60" y2="1" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Category Buttons */}
            {categories.length > 0 && (
              <div className="flex flex-col gap-3 md:gap-4">
                {categories.map((category, index) => (
                  <CTAButton
                    key={category._id}
                    theme={selectedCategory === index ? "black" : "transparent"}
                    onClick={() => !isAnimating && setSelectedCategory(index)}
                    disabled={isAnimating}
                    className="w-full justify-start px-6"
                  >
                    {category.name}
                  </CTAButton>
                ))}
              </div>
            )}
          </div>

          {/* Middle Column - Category Image */}
          {currentCategory && (
            <div className="py-6 md:py-8 lg:py-10 px-6 md:px-8 lg:px-10 border-r border-black/10">

              {currentCategory.image ? (
                <div
                  ref={imageRef}
                  className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 opacity-100 group cursor-pointer"
                  style={{ transform: 'translateX(0)' }}
                >
                  <img
                    src={urlFor(currentCategory.image).width(1200).height(900).quality(90).url()}
                    alt={currentCategory.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Black Filter Overlay - appears on hover, darker for text visibility */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-700"></div>

                  {/* Border highlight on hover */}
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none z-20"></div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>

                  {/* Category Description - appears on hover */}
                  {currentCategory.description && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-8 z-30">
                      <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700 opacity-0 group-hover:opacity-100">
                        {currentCategory.description}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  ref={imageRef}
                  className="w-full aspect-[3/4] bg-gray-100 opacity-100"
                  style={{ transform: 'translateX(0)' }}
                ></div>
              )}
            </div>
          )}

          {/* Right Column - Products List */}
          <div className="py-6 md:py-8 lg:py-10 pl-6 md:pl-8 lg:pl-10">
            {/* Products Header */}
            <div ref={productsTitleRef} className="mb-6 md:mb-8 opacity-100" style={{ transform: 'translateX(0)' }}>
              <h3 className="text-xl md:text-2xl lg:text-3xl text-black mb-3 tracking-tight">
                Produits
              </h3>
              <div className="w-12 md:w-16 h-px bg-black/20"></div>
            </div>

            {/* Products List */}
            {currentProducts.length > 0 ? (
              <div ref={productsContainerRef} className="space-y-4 md:space-y-5">
                {currentProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={product.link || '#'}
                    className="product-item group opacity-100 relative overflow-hidden block"
                    style={{ transform: 'translateX(0)' }}
                  >
                    <div className="relative p-4 border border-black/10 bg-white transition-all duration-500 overflow-hidden">
                      {/* Sliding black background from right to left */}
                      <div className="absolute inset-0 bg-black transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0"></div>

                      {/* Content that changes color on hover */}
                      <div className="relative z-10 transition-colors duration-500 group-hover:text-white">
                        <h4 className="text-base md:text-lg mb-2 font-medium tracking-tight">
                          {product.name}
                        </h4>
                        {product.description && (
                          <p className="text-sm md:text-base leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-black/50 text-sm">Aucun produit disponible</p>
              </div>
            )}
          </div>
        </div>

        {/* Visual Separator at Bottom */}
        <div className="flex items-center justify-center mt-16 md:mt-20 lg:mt-24">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="flex-1 h-px bg-black/10"></div>
            <div className="flex items-center gap-2">
              <svg width="8" height="8" className="text-black/30">
                <circle cx="4" cy="4" r="1" fill="currentColor" />
                <circle cx="4" cy="4" r="3.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            <div className="flex-1 h-px bg-black/10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
