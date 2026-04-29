"use client"

import { useRef } from 'react'

interface SpecificationItem {
  title: string
  items: string[]
}

interface ProductsSpecificationSectionProps {
  caracteristiques?: SpecificationItem
  applications?: SpecificationItem
  format?: SpecificationItem
  epaisseur?: string | string[]
  finishes?: string[]
}

export function ProductsSpecificationSection({
  caracteristiques,
  applications,
  format,
  epaisseur,
  finishes
}: ProductsSpecificationSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const sections = [
    { title: 'Caractéristiques', data: caracteristiques },
    { title: 'Applications', data: applications },
  ].filter(section => section.data && section.data.items && section.data.items.length > 0)

  const hasFormatEpaisseur = format && format.items && format.items.length > 0

  if (sections.length === 0 && !hasFormatEpaisseur) {
    return null
  }

  return (
    <section id="specifications" ref={sectionRef} className="relative bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Horizontal Divider */}
        <div className="w-full h-px bg-black/10 mb-8 md:mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Caractéristiques and Applications */}
          {sections.map((section, index) => (
            <div key={index} className="js-reveal">
              <h3 className="text-sm tracking-[0.18em] uppercase text-black/60 font-light mb-4">
                {section.title}
              </h3>
              {section.data?.items && section.data.items.length > 0 && (
                <div className="space-y-2">
                  {section.data.items.map((item: string, itemIndex: number) => (
                    <p key={itemIndex} className="text-base text-black leading-relaxed">
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Format & Épaisseur - Split into 2 sub-columns */}
          {hasFormatEpaisseur && (
            <div className="js-reveal grid grid-cols-2 gap-4 md:gap-6">
              {/* Format */}
              <div>
                <h3 className="text-sm tracking-[0.18em] uppercase text-black/60 font-light mb-4">
                  Format (mm)
                </h3>
                {format.items && format.items.length > 0 && (
                  <div className="space-y-2">
                    {format.items.map((item: string, itemIndex: number) => (
                      <p key={itemIndex} className="text-base text-black leading-relaxed">
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Épaisseur */}
              {epaisseur && (
                <div>
                  <h3 className="text-sm tracking-[0.18em] uppercase text-black/60 font-light mb-4">
                    Épaisseur (mm)
                  </h3>
                  <div className="space-y-2">
                    {(Array.isArray(epaisseur) ? epaisseur : [epaisseur]).map((item: string, idx: number) => (
                      <p key={idx} className="text-base text-black leading-relaxed">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Finishes */}
          {finishes && finishes.length > 0 && (
            <div className="js-reveal">
              <h3 className="text-sm tracking-[0.18em] uppercase text-black/60 font-light mb-4">
                Finitions
              </h3>
              <div className="flex flex-wrap gap-2">
                {finishes.map((finish: string, idx: number) => (
                  <span key={idx} className="inline-block px-3 py-1.5 text-sm border border-black/15 text-black/70 rounded capitalize">
                    {finish}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
