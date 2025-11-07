'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, X, Download } from 'lucide-react'
import { urlFor } from '@/lib/sanity'

interface CatalogueDocument {
  title: string
  fileUrl?: string
  fileType?: string
  downloadText?: string
}

interface CatalogueData {
  id?: string
  title: string
  description?: string
  overview?: string
  image?: string
  imageAlt?: string
  documents?: CatalogueDocument[]
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
          className="w-full flex items-center justify-between py-6 md:py-8"
          aria-expanded={isOpen}
        >
          {/* Title Section */}
          <div className="flex-1 text-left">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-black/40">
                {(index + 1).toString().padStart(2, '0')}.
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-black">
                {catalogue.title}
              </h2>
            </div>
            {catalogue.description && (
              <p className="mt-3 md:mt-4 text-sm md:text-base text-black/60 font-light max-w-2xl leading-relaxed">
                {catalogue.description}
              </p>
            )}
          </div>

          {/* Right Side - Separator and Icon */}
          <div className="ml-6 md:ml-8 flex items-center gap-4 flex-shrink-0">
            {/* Separator Line */}
            <div className="w-12 h-px bg-black/20 hidden md:block" />
            
            {/* Icon Section */}
            <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
              {isOpen ? (
                <X className="w-7 h-7 md:w-9 md:h-9 text-black/50" strokeWidth={1.5} />
              ) : (
                <Plus className="w-7 h-7 md:w-9 md:h-9 text-black/50" strokeWidth={1.5} />
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
          <div className="pb-8 md:pb-12 pt-6 md:pt-8">
            {/* Two Column Layout: Overview + Documents */}
            {(catalogue.overview || catalogue.description || catalogue.content?.text) && catalogue.documents && catalogue.documents.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Column - Overview */}
                <div className="py-6 md:py-8 pr-6 md:pr-8 border-r border-black/10">
                  {/* Section Header */}
                  <div className="inline-flex items-center gap-2 mb-5">
                    <span className="h-[1px] w-8 bg-black/30" />
                    <span className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">
                      Overview
                    </span>
                  </div>

                  {/* Main Title */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-black mb-5 leading-tight">
                    {catalogue.overview || catalogue.title}
                  </h3>

                  {/* Description */}
                  {(catalogue.description || catalogue.content?.text) && (
                    <div className="space-y-3">
                      {catalogue.description && (
                        <p className="text-base md:text-lg text-black/70 leading-relaxed font-light">
                          {catalogue.description}
                        </p>
                      )}
                      {catalogue.content?.text && catalogue.content.text.map((paragraph, textIndex) => (
                        <p key={textIndex} className="text-base md:text-lg text-black/70 leading-relaxed font-light">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column - Supporting Documents */}
                <div className="py-6 md:py-8 pl-6 md:pl-8">
                  {/* Section Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs tracking-[0.18em] uppercase text-black/60 font-light">
                      Supporting Docs
                    </span>
                    <span className="text-xs tracking-[0.18em] uppercase text-black/60 font-light">
                      {catalogue.documents.length.toString().padStart(2, '0')} Available
                    </span>
                  </div>

                  {/* Documents List */}
                  <div className="space-y-0">
                    {catalogue.documents.map((doc, docIndex) => (
                      <div
                        key={docIndex}
                        className={`py-3 px-4 flex items-center justify-between group hover:bg-black/5 transition-colors duration-200 rounded-sm ${docIndex < (catalogue.documents?.length || 0) - 1 ? 'border-b border-black/5' : ''}`}
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {/* Document Icon */}
                          <div className="flex-shrink-0 w-8 h-8 border border-black/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                          </div>

                          {/* Document Name */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm md:text-base text-black font-light truncate">
                              {doc.title}
                            </p>
                          </div>

                          {/* File Type */}
                          {doc.fileType && (
                            <span className="text-xs uppercase text-black/50 font-light mr-4 flex-shrink-0">
                              {doc.fileType}
                            </span>
                          )}
                        </div>

                        {/* Download Link */}
                        {doc.fileUrl ? (
                          <a
                            href={doc.fileUrl}
                            download
                            className="flex-shrink-0 text-xs tracking-[0.18em] uppercase text-black/60 hover:text-black transition-colors duration-200 flex items-center justify-center gap-1.5 ml-4"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>{doc.downloadText || 'Download'}</span>
                            <Download className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                          </a>
                        ) : (
                          <span className="flex-shrink-0 text-xs tracking-[0.18em] uppercase text-black/30 ml-4 flex items-center gap-1.5">
                            <span>{doc.downloadText || 'Download'}</span>
                            <Download className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Fallback: Original Layout for catalogues without documents */
              <div>
                {/* Main Image */}
                {catalogue.image && (
                  <div className="mb-6 md:mb-8 relative overflow-hidden rounded-sm border border-black/10">
                    <div className="relative w-full h-[400px] md:h-[600px] bg-black/5">
                      <img
                        src={typeof catalogue.image === 'string' ? catalogue.image : urlFor(catalogue.image).width(1200).height(800).quality(90).url()}
                        alt={catalogue.imageAlt || catalogue.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Description Text */}
                {catalogue.description && (
                  <div className="mb-6 md:mb-8">
                    <p className="text-base md:text-lg text-black/75 leading-relaxed font-light max-w-3xl">
                      {catalogue.description}
                    </p>
                  </div>
                )}

                {/* Content Sections */}
                {catalogue.content?.sections && catalogue.content.sections.length > 0 && (
                  <div className="space-y-8 md:space-y-12">
                    {catalogue.content.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
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
                        {section.image && (
                          <div className={`relative overflow-hidden rounded-sm border border-black/10 ${sectionIndex % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                            <div className="relative w-full h-[300px] md:h-[400px] bg-black/5">
                              <img
                                src={typeof section.image === 'string' ? section.image : urlFor(section.image).width(800).height(600).quality(90).url()}
                                alt={section.imageAlt || section.title || ''}
                                className="w-full h-full object-cover"
                                onError={(e) => {
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
                  <div className="space-y-4">
                    {catalogue.content.text.map((paragraph, textIndex) => (
                      <p key={textIndex} className="text-base md:text-lg text-black/75 leading-relaxed font-light max-w-3xl">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Separator */}
      {!isLast && (
        <div className="relative w-full my-6 md:my-8">
          <div className="absolute left-0 right-0 h-px bg-black/10" />
        </div>
      )}
    </div>
  )
}

