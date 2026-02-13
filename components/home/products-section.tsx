"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { urlFor } from "@/lib/sanity"
import { ProductsSkeleton } from "@/components/home/skeletons/products-skeleton"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { CTAButton } from "@/components/ui/cta-button"
import { scrollToContact } from '@/lib/scroll-to-contact'
import type { HomeProductsSection } from "@/lib/types/home"

interface ProductsSectionProps {
  data?: HomeProductsSection | null
}

export function ProductsSection({ data }: ProductsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Don't display section if no data at all
  if (!data) {
    return null
  }

  const sectionLabel = data.sectionLabel
  const title = data.title
  const description = data.description
  const ctaText = data.ctaText
  const products = (data.products || [])
    .filter((product): product is NonNullable<typeof product> => product != null)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  // Don't render if no products
  if (!products.length) {
    return null
  }

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate header elements
      const headerElements = sectionRef.current?.querySelectorAll('.js-reveal-text')
      if (headerElements) {
        headerElements.forEach((el, i) => {
          gsap.fromTo(
            el as HTMLElement,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el as HTMLElement,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: i * 0.1,
            }
          )
        })
      }

      // Animate product cards
      const productCards = sectionRef.current?.querySelectorAll('.js-reveal-card')
      if (productCards) {
        productCards.forEach((el, i) => {
          gsap.fromTo(
            el as HTMLElement,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el as HTMLElement,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: i * 0.1,
            }
          )
        })
      }
    }, sectionRef.current)

    return () => ctx.revert()
  }, [data])

  return (
    <section ref={sectionRef} id="produits" className="w-full relative z-10 m-0 p-0 bg-white">
      <div className="w-[calc(100%-2rem)] ml-4 px-6 md:px-8 py-16 md:py-24 lg:py-32">
        {/* Header Section - Title on top */}
        {(sectionLabel || title) && (
          <div className="mb-12">
            {/* Section Indicator */}
            {sectionLabel && (
              <div className="js-reveal-text inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-4 font-light">
                <span className="h-[1px] w-8 bg-black/30" />{sectionLabel}
              </div>
            )}

            {/* Main Headline */}
            {title && (
              <h1 className="js-reveal-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black mb-3 tracking-[-0.02em] leading-tight whitespace-pre-line">
                {title}
              </h1>
            )}
          </div>
        )}

        {/* Products Grid - 1/4 left text, 3/4 right products */}
        {products.length > 0 && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
              {/* Left Column - Text Content (1/4 width) */}
              {(description || ctaText) && (
                <div className="lg:col-span-1 flex flex-col gap-24 my-28">
                  {description && description.length > 0 && (
                    <div className="js-reveal-text space-y-3">
                      {description.map((para, index) => (
                        <p key={index} className="text-lg md:text-xl text-black/70 leading-relaxed whitespace-pre-line">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                  {ctaText && (
                    <div className="js-reveal-text">
                      <CTAButton
                        theme="black"
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToContact(e)
                        }}
                      >
                        {ctaText}
                      </CTAButton>
                    </div>
                  )}
                </div>
              )}

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
                        className="js-reveal-card group block"
                      >
                        {/* Product Card */}
                        <div className="flex flex-col h-full">
                          {/* Image Section */}
                          <div className="relative overflow-hidden aspect-[3/4] mb-4">
                            {product.image ? (
                              <>
                              <img
                                src={urlFor(product.image).width(1200).height(1600).quality(90).url()}
                                alt={product.name}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />

                                {/* Border highlight on hover */}
                                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none z-20"></div>

                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-full bg-gray-100"></div>
                            )}
                          </div>

                          {/* Content Section */}
                          <div className="flex flex-col">

                            {/* Title */}
                            <h3 className="text-lg md:text-xl lg:text-2xl text-black mb-2 inline-block">
                              <span className="relative">
                                {product.name}
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black/40 group-hover:w-full transition-all duration-500 ease-out"></span>
                              </span>
                            </h3>

                            {/* Description */}
                            {product.description && (
                              <div className="text-base md:text-lg text-black/70 mb-4  leading-relaxed line-clamp-3 whitespace-pre-line">
                                {product.description}
                              </div>
                            )}

                            {/* Discover Link */}
                            <div className="flex items-center gap-2 text-black/70 group-hover:text-black transition-colors mt-auto">
                              <span className="text-sm tracking-wider uppercase hover:underline">Découvrir</span>
                              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-all" strokeWidth={1.5} />
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
