'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, X } from 'lucide-react'

interface CatalogueData {
  id?: string
  title: string
  description?: string
  image?: string
  imageAlt?: string
  content?: {
    text?: string[]
    sections?: Array<{
      title?: string
      text?: string
      image?: string
      imageAlt?: string
    }>
  }
}

interface CatalogueAccordionProps {
  catalogue: CatalogueData
  index: number
  isLast: boolean
  id?: string
}

export function CatalogueAccordion({ catalogue, index, isLast, id }: CatalogueAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const accordionRef = useRef<HTMLDivElement>(null)

  // Handle hash-based deep linking
  useEffect(() => {
    if (!id) return

    const checkHash = () => {
      const hash = window.location.hash.slice(1) // Remove the #
      if (hash === id) {
        setIsOpen(true)
        // Scroll to the accordion after a short delay to ensure it's rendered
        setTimeout(() => {
          accordionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }

    // Check on mount
    checkHash()

    // Listen for hash changes
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [id])

  return (
    <div id={id} ref={accordionRef} className="relative scroll-mt-24">

      {/* Accordion Item */}
      <div className="relative">
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-8 md:py-12 px-4 md:px-6 hover:bg-black/5 transition-colors duration-300 group border-b border-black/10"
          aria-expanded={isOpen}
        >
          {/* Title Section */}
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-black group-hover:text-black/80 transition-colors">
              {catalogue.title}
            </h2>
            {catalogue.description && (
              <p className="mt-3 md:mt-4 text-sm md:text-base text-black/60 font-light max-w-2xl leading-relaxed">
                {catalogue.description}
              </p>
            )}
          </div>

          {/* Icon Section */}
          <div className="ml-6 md:ml-8 flex-shrink-0">
            <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
              {isOpen ? (
                <X className="w-7 h-7 md:w-9 md:h-9 text-black/50 group-hover:text-black transition-colors" strokeWidth={1.5} />
              ) : (
                <Plus className="w-7 h-7 md:w-9 md:h-9 text-black/50 group-hover:text-black transition-colors" strokeWidth={1.5} />
              )}
            </div>
          </div>
        </button>

        {/* Content Section */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-10 md:pb-16">
            {/* Main Image */}
            {catalogue.image && (
              <div className="mb-8 md:mb-12 relative overflow-hidden rounded-sm border border-black/10">
                <div className="relative w-full h-[400px] md:h-[600px] bg-black/5">
                  <img
                    src={catalogue.image}
                    alt={catalogue.imageAlt || catalogue.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Description Text */}
            {catalogue.description && (
              <div className="mb-8 md:mb-12">
                <p className="text-base md:text-lg text-black/75 leading-relaxed font-light max-w-3xl">
                  {catalogue.description}
                </p>
              </div>
            )}

            {/* Content Sections */}
            {catalogue.content?.sections && catalogue.content.sections.length > 0 && (
              <div className="space-y-12 md:space-y-16">
                {catalogue.content.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Text Content */}
                    <div className={`${sectionIndex % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      {section.title && (
                        <h3 className="text-xl md:text-2xl font-light tracking-tight text-black mb-4">
                          {section.title}
                        </h3>
                      )}
                      {section.text && (
                        <p className="text-base md:text-lg text-black/75 leading-relaxed font-light">
                          {section.text}
                        </p>
                      )}
                    </div>

                    {/* Image Content */}
                    {section.image && (
                      <div className={`relative overflow-hidden rounded-sm border border-black/10 ${sectionIndex % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                        <div className="relative w-full h-[300px] md:h-[400px] bg-black/5">
                          <img
                            src={section.image}
                            alt={section.imageAlt || section.title || ''}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              (e.target as HTMLImageElement).style.display = 'none'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Text Content Only */}
            {catalogue.content?.text && catalogue.content.text.length > 0 && (
              <div className="space-y-6">
                {catalogue.content.text.map((paragraph, textIndex) => (
                  <p key={textIndex} className="text-base md:text-lg text-black/75 leading-relaxed font-light max-w-3xl">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Artistic Line Separator */}
      {!isLast && (
        <div className="relative w-full my-4">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent opacity-40" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-16 h-px bg-black/30" />
        </div>
      )}
    </div>
  )
}

