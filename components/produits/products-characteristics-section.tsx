"use client"

import { useState, useEffect, useRef } from 'react'
import { Plus, X } from 'lucide-react'

interface AccordionItem {
  title: string
  description?: string
  content?: string
  image?: string
  imageAlt?: string
}

interface ProductsCharacteristicsSectionProps {
  defaultImage: string
  defaultImageAlt?: string
  accordionItems: AccordionItem[]
}

export function ProductsCharacteristicsSection({ 
  defaultImage, 
  defaultImageAlt = 'Product characteristics',
  accordionItems 
}: ProductsCharacteristicsSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // Get all images including default
  const allImages = [
    { image: defaultImage, alt: defaultImageAlt },
    ...accordionItems.map(item => ({
      image: item.image || defaultImage,
      alt: item.imageAlt || item.title || defaultImageAlt
    }))
  ]

  // Update slide position when accordion opens
  useEffect(() => {
    if (!imageContainerRef.current || !imageWrapperRef.current) return
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const wrapper = imageWrapperRef.current
    const imageWidth = wrapper.offsetWidth
    // Calculate which image to show: 0 = default, 1+ = accordion items
    const imageIndex = openIndex !== null ? openIndex + 1 : 0
    const translateX = -imageIndex * imageWidth

    imageContainerRef.current.style.transform = `translateX(${translateX}px)`
  }, [openIndex, accordionItems.length])

  if (!accordionItems || accordionItems.length === 0) {
    return null
  }

  return (
    <section className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Big Image with Swipe Animation */}
          <div ref={imageWrapperRef} className="relative overflow-hidden h-[95vh] group">
            {/* Sliding Container - Holds all images side by side */}
            <div
              ref={imageContainerRef}
              className="flex h-full"
              style={{ 
                width: `${allImages.length * 100}%`,
                transition: 'transform 0.7s ease-in-out'
              }}
            >
              {allImages.map((img, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 h-full"
                  style={{ width: `${100 / allImages.length}%` }}
                >
                  <img
                    src={img.image}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 font-light mb-6">
              <span className="h-[1px] w-8 bg-black/30" /> Caractéristiques
            </div>
            <div className="space-y-0">
              {accordionItems.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <div key={index} className="border-b border-black/10 last:border-b-0">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between py-4 md:py-6"
                      aria-expanded={isOpen}
                    >
                      {/* Title Section */}
                      <div className="flex-1 text-left">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl md:text-2xl lg:text-3xl tracking-tight text-black/40">
                            {(index + 1).toString().padStart(2, '0')}.
                          </span>
                          <h2 className="text-xl md:text-2xl lg:text-3xl text-black tracking-tight">
                            {item.title}
                          </h2>
                        </div>
                        {item.description && !isOpen && (
                          <p className="mt-2 text-sm md:text-base text-black/70 max-w-2xl leading-relaxed transition-opacity duration-300 ease-in-out">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Right Side - Separator and Icon */}
                      <div className="ml-4 md:ml-6 flex items-center gap-3 flex-shrink-0">
                        {/* Separator Line */}
                        <div className="w-8 h-px bg-black/20 hidden md:block" />
                        
                        {/* Icon Section */}
                        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                          {isOpen ? (
                            <X className="w-5 h-5 md:w-6 md:h-6 text-black/50" strokeWidth={1.5} />
                          ) : (
                            <Plus className="w-5 h-5 md:w-6 md:h-6 text-black/50" strokeWidth={1.5} />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Content Section */}
                    <div
                      className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                      style={{
                        transition: 'max-height 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in-out'
                      }}
                    >
                      <div className="pb-6 md:pb-8 pt-4 md:pt-6">
                        {item.content && (
                          <div className="text-sm md:text-base text-black/70 leading-relaxed max-w-2xl">
                            {item.content}
                          </div>
                        )}
                        {item.description && isOpen && (
                          <div className="text-sm md:text-base text-black/70 leading-relaxed max-w-2xl mt-3">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
