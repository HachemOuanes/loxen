"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { client, urlFor } from "@/lib/sanity"
import { ProductsSkeleton } from "@/components/home/skeletons/products-skeleton"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

interface Product {
  _key?: string
  name: string
  description: string
  image: any
  order?: number
  link?: string
}

interface SectionContent {
  title: string
  description: string
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
            order,
            link
          },
          ctaText,
          showSection
        }`
        const sectionData = await client.fetch(productsQuery)

        if (sectionData?.products && sectionData?.showSection !== false) {
          setProducts(sectionData.products.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)))
        }

        setSectionContent({
          title: sectionData?.title || 'Produits',
          description: sectionData?.description || 'Une sélection de matériaux et systèmes de référence adaptés à chaque projet architectural.'
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
    <section id="produits" className="w-full relative z-10 m-0 p-0 bg-white">
      <div className="w-full px-8 py-16 md:py-24 lg:py-32">
        {/* Header Section - Title on top */}
        <div className="mb-12">
          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-4 font-light">
            <span className="h-[1px] w-8 bg-black/30" />Produits
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black mb-3 tracking-[-0.02em]">
            High-performance hardscaping. Consciously crafted + fully customisable.
          </h1>

        </div>

        {/* Products Grid - 1/4 left text, 3/4 right products */}
        {products.length > 0 && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
              {/* Left Column - Text Content (1/4 width) */}
              <div className="lg:col-span-1 flex flex-col gap-12 my-28">
                <div>
                  <p className="text-base md:text-lg lg:text-xl text-black/70 leading-relaxed font-medium mb-4">
                    Discover our comprehensive range of interior and exterior solutions designed to meet your architectural needs.
                  </p>
                  <p className="text-base md:text-lg lg:text-xl text-black/70 leading-relaxed font-medium ">
                    From premium materials to innovative design systems, we offer robust and diverse products that are easy to process, clean, and maintain.
                  </p>
                </div>
             
              </div>

              {/* Right Column - Swiper Products (3/4 width) */}
              <div className="lg:col-span-3 relative">
                {/* White fade on the right edge */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={24}
                  slidesPerView={2.5}
                  slidesPerGroup={1}
                  loop={true}
                  speed={1000}
                  watchSlidesProgress={true}
                  allowTouchMove={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 16,
                      slidesPerGroup: 1,
                      loop: true,
                    },
                    640: {
                      slidesPerView: 1.5,
                      spaceBetween: 20,
                      slidesPerGroup: 1,
                      loop: true,
                    },
                    1024: {
                      slidesPerView: 2.5,
                      spaceBetween: 24,
                      slidesPerGroup: 1,
                      loop: true,
                    },
                  }}
                  className="products-swiper"
                >
                  {/* Duplicate products array multiple times to ensure seamless loop */}
                  {[...products, ...products, ...products].map((product, index) => (
                    <SwiperSlide key={`${product._key || 'product'}-${index}`}>
                      <Link
                        href={product.link || `/produits`}
                        className="group block"
                      >
                        {/* Product Card */}
                        <div className="flex flex-col h-full">
                          {/* Image Section */}
                          <div className="relative overflow-hidden aspect-[3/4] mb-4">
                            {product.image ? (
                              <img
                                src={urlFor(product.image).width(1200).height(1600).quality(90).url()}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100"></div>
                            )}
                            {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div> */}
                          </div>

                          {/* Content Section */}
                          <div className="flex flex-col">

                            {/* Title */}
                            <h3 className="text-lg sm:text-xl md:text-2xl text-black mb-2 group-hover:opacity-70 transition-opacity">
                              {product.name}
                            </h3>

                            {/* Description */}
                            {product.description && (
                              <p className="text-base md:text-lg text-black/70 mb-4 font-light leading-relaxed line-clamp-3">
                                {product.description}
                              </p>
                            )}

                            {/* Discover Link */}
                            <div className="flex items-center gap-2 text-black/70 group-hover:text-black transition-colors mt-auto">
                              <span className="text-sm tracking-wider uppercase hover:underline">Découvrir</span>
                              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
