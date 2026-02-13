"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { urlFor } from "@/lib/sanity"
import { InteriorExteriorSkeleton } from "@/components/home/skeletons/interior-exterior-skeleton"

interface Product {
  _id: string
  _type: string
  title: string
  slug: {
    current: string
  }
  type: string
}

interface Application {
  _id: string
  name: string
  description?: string
  image: any
  order: number
  link?: string
  products?: Product[]
}

interface ExteriorProductsContentProps {
  applications: Application[]
}

export function ExteriorProductsContent({ applications: initialApplications }: ExteriorProductsContentProps) {
  const [categories, setCategories] = useState<Application[]>(initialApplications || [])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<number>(0)
  const [displayedCategory, setDisplayedCategory] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const productsContainerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (initialApplications && initialApplications.length > 0) {
      setCategories(initialApplications)
    }
  }, [initialApplications])

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

    requestAnimationFrame(() => {
      const productsContainer = productsContainerRef.current
      if (!productsContainer) return

      const productItems = productsContainer.querySelectorAll('.product-item')
      
      // Set initial state only for products
      productItems.forEach(item => {
        gsap.set(item, {
          opacity: 0,
          x: 30,
          pointerEvents: 'auto'
        })
      })

      // Create timeline for staggered animation
      const tl = gsap.timeline({
        onComplete: () => {
          hasAnimated.current = true
        }
      })

      // Use GSAP's stagger for smoother animation
      tl.to(Array.from(productItems), {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: {
          amount: 0.4,
          from: "start"
        },
        pointerEvents: 'auto'
      })
    })
  }, [loading, categories.length])

  // Update slide position when category changes
  useEffect(() => {
    if (!imageContainerRef.current || !imageWrapperRef.current) return
    if (isFirstRender.current) return

    const wrapper = imageWrapperRef.current
    // Each image takes 66.666% of the wrapper width (2/3 of screen)
    const imageWidth = wrapper.offsetWidth
    const translateX = -selectedCategory * imageWidth

    imageContainerRef.current.style.transform = `translateX(${translateX}px)`
  }, [selectedCategory, categories.length])

  // Handle slide out animation when category changes
  useEffect(() => {
    if (isFirstRender.current) return
    if (selectedCategory === displayedCategory) return

    const productsContainer = productsContainerRef.current
    if (!productsContainer) {
      // If no container, just update displayed category immediately
      setDisplayedCategory(selectedCategory)
      return
    }

    setIsAnimating(true)

    const productItems = productsContainer.querySelectorAll('.product-item')
    
    // Only animate products, not title
    if (productItems.length > 0) {
      // Slide out all products together
      gsap.to(Array.from(productItems), {
        opacity: 0,
        x: -30,
        duration: 0.3,
        ease: "power2.in",
        pointerEvents: 'none',
        onComplete: () => {
          // Update displayed category after slide out
          setDisplayedCategory(selectedCategory)
        }
      })
    } else {
      // No products to animate, just update immediately
      setDisplayedCategory(selectedCategory)
      setIsAnimating(false)
    }
  }, [selectedCategory, displayedCategory])

  // Handle slide in animation when displayed category updates
  useEffect(() => {
    if (isFirstRender.current) return
    if (selectedCategory !== displayedCategory) return
    if (!hasAnimated.current) return

    // Wait for React to update DOM
    requestAnimationFrame(() => {
      const productsContainer = productsContainerRef.current
      if (!productsContainer) {
        setIsAnimating(false)
        return
      }

      const productItems = productsContainer.querySelectorAll('.product-item')

      // Only animate products if there are any
      if (productItems.length === 0) {
        setIsAnimating(false)
        return
      }

      // Set initial state for products only
      productItems.forEach(item => {
        gsap.set(item, {
          opacity: 0,
          x: 30,
          pointerEvents: 'auto'
        })
      })

      // Create timeline for staggered animation
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false)
      })

      // Use GSAP's stagger for smoother animation
      tl.to(Array.from(productItems), {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: {
          amount: 0.4,
          from: "start"
        },
        pointerEvents: 'auto'
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-600 mb-2">Aucun contenu disponible</h2>
          <p className="text-gray-500">Les produits extérieurs seront bientôt disponibles.</p>
        </div>
      </section>
    )
  }

  const currentCategory = categories[displayedCategory]
  const currentProducts = currentCategory?.products || []

  return (
    <section id="exterieur" className="w-full relative z-10 m-0 p-0 bg-white min-h-screen overflow-hidden">
      {/* Gray Background - Full height from top, no left spacing */}
      <div className="bg-gray-100 absolute top-0 left-0 h-full w-1/3 z-0"></div>
      
      <div className="w-[calc(100%-2rem)] ml-4 px-4 md:px-6 py-8 md:py-12 lg:py-16 relative min-h-screen pt-20 md:pt-24">

        {/* Main Content - 2 Column Grid */}
        <div className="grid md:grid-cols-3 gap-0 items-start z-30 relative md:items-stretch">
          {/* Left Column - Category List */}
          <div className="pt-20 md:pt-24 pb-4 md:pb-6 pr-4 md:pr-6 relative z-30">
            {/* {sectionContent?.title && (
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-black tracking-[-0.02em] leading-tight mb-8 md:mb-10">
              {sectionContent.title}
              </h1>
              )} */}


            <div className="mb-6 md:mb-8">
              <h3 className="text-black mb-3 tracking-[-0.02em] leading-tight flex flex-col">
                <i className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Applications</i>  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Extérieures</span>
              </h3>
            </div>

            {/* Decorative Element */}
            {/* <div className="mb-8 md:mb-10 flex items-center gap-2">
              <svg width="60" height="2" className="text-black/20">
                <line x1="0" y1="1" x2="60" y2="1" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
              <svg width="60" height="2" className="text-black/20">
                <line x1="0" y1="1" x2="60" y2="1" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div> */}
            <div className="z-80 opacity-100">
              {/* Category Buttons */}
              {categories.length > 0 && (
                <div className="flex flex-col gap-2 md:gap-3 z-30">
                  {categories.map((category, index) => (
                    <button
                      key={category._id}
                      onClick={() => !isAnimating && setSelectedCategory(index)}
                      disabled={isAnimating}
                      className={`
                        relative w-full text-left px-6 py-3 md:py-3.5
                        text-sm md:text-base tracking-wider uppercase
                        transition-all duration-300 ease-out
                        disabled:pointer-events-none disabled:opacity-50
                        outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2
                        ${
                          selectedCategory === index
                            ? "bg-black text-white"
                            : "bg-transparent text-black border border-black/10 hover:border-black/30 hover:bg-black/5"
                        }
                      `}
                    >
                      <span className="relative z-10">{category.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>


          </div>

          {/* Spacer for desktop grid */}
          <div className="hidden md:block"></div>
          
          {/* Mobile Image - Inside content container */}
          {currentCategory && currentCategory.image && (
            <div className="md:hidden col-span-3 py-4">
              <div
                className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 opacity-100 group cursor-pointer"
              >
                <img
                  src={urlFor(currentCategory.image).width(1200).height(900).quality(90).url()}
                  alt={currentCategory.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-700"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Image Container - Positioned relative to section, extends to edges, can slide behind left section */}
      <div ref={imageWrapperRef} className="hidden md:block absolute top-0 right-0 bottom-0 left-[33.333%] z-0 h-full overflow-hidden group/image-wrapper">
        {/* Sliding Container - Holds all images side by side */}
        <div
          ref={imageContainerRef}
          className="flex h-full"
          style={{ 
            width: `${categories.length * 100}%`,
            transition: 'transform 0.7s ease-in-out'
          }}
        >
          {categories.map((category, index) => (
            category.image ? (
              <div
                key={category._id}
                className="relative flex-shrink-0 bg-gray-100 group/image cursor-pointer h-full"
                style={{ width: `${100 / categories.length}%` }}
              >
                <img
                  src={urlFor(category.image).width(1200).height(900).quality(90).url()}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Border highlight on hover */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover/image:border-white/20 group-hover/image-wrapper:border-white/20 transition-all duration-500 pointer-events-none z-20"></div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover/image:opacity-100 group-hover/image-wrapper:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover/image:translate-x-[200%] group-hover/image-wrapper:translate-x-[200%] transition-transform duration-1000" />
                </div>

              </div>
            ) : null
          ))}
        </div>
      </div>

      {/* Products List - Glassmorphic overlay on the right - Fixed position - Moved outside image wrapper */}
      <div className="hidden md:flex absolute top-20 md:top-24 right-0 bottom-0 md:w-[26%] w-full flex-col p-4 md:p-6 lg:p-8 z-[60]">
        <div className="h-full w-full bg-black/50 backdrop-blur-md border-l border-white/30 rounded-l-lg p-4 md:p-6 lg:p-8 flex flex-col overflow-y-auto">
          {/* Products Header */}
          <div className="mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl text-white mb-2 tracking-tight drop-shadow-lg">
              Produits
            </h3>
            <div className="w-12 md:w-16 h-px bg-white/40"></div>
          </div>

          {/* Products List */}
          {currentProducts.length > 0 ? (
              <div ref={productsContainerRef} className="space-y-6 md:space-y-8">
                {currentProducts.map((product, index) => (
                  <Link
                    key={product._id || `product-${index}`}
                    href={product.slug ? `/produits/${product.slug.current}` : '/'}
                    className="product-item group/product block opacity-0 pb-6 md:pb-8 border-b border-white/10 last:border-b-0 hover:border-white/20 transition-all relative z-10 cursor-pointer"
                    style={{ transform: 'translateX(30px)' }}
                  >
                  <div className="flex flex-col">
                    {/* Title */}
                    <h4 className="text-base md:text-lg text-white mb-2 group-hover/product:text-white transition-colors tracking-tight drop-shadow-md">
                      {product.title}
                    </h4>

                    {/* Discover Link */}
                    <div className="flex items-center gap-2 text-white/80 group-hover/product:text-white transition-colors">
                      <span className="text-xs md:text-sm tracking-wider uppercase">Découvrir</span>
                      <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 group-hover/product:rotate-45 transition-all" strokeWidth={1.5} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/70 text-sm">Aucun produit disponible</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
