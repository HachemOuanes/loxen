"use client"

import { useEffect, useState } from "react"
import { client, urlFor } from "@/lib/sanity"
import { PartnersSkeleton } from "@/components/home/skeletons/partners-skeleton"

interface Partner {
  _id: string
  name: string
  logo: any
  order: number
}

interface SectionContent {
  title: string
  description: string
}

export function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [sectionContent, setSectionContent] = useState<SectionContent | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch partners from unified section
        const partnersQuery = `*[_type == "partnersSection"][0]{
          title,
          description,
          partners[]{
            name,
            logo,
            order
          },
          showSection
        }`
        const sectionData = await client.fetch(partnersQuery)

        if (sectionData?.partners && sectionData?.showSection !== false) {
          const formattedPartners = sectionData.partners.map((partner: any, index: number) => ({
            _id: `partner-${index}`,
            name: partner.name,
            logo: partner.logo,
            order: partner.order || index
          })).sort((a: any, b: any) => a.order - b.order)

          setPartners(formattedPartners)
        }

        setSectionContent({
          title: sectionData?.title || 'Partenaires de Confiance',
          description: sectionData?.description || 'Collaboration avec les fabricants leaders de l\'industrie.'
        })
      } catch (error) {
        console.error('Error fetching partners data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (partners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % partners.length)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [partners.length])

  if (loading) {
    return <PartnersSkeleton />
  }

  if (!partners.length) return null

  return (
    <section className="w-full relative z-10 m-0 p-0 bg-white">
      {/* Title Section */}
      <div className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-4">
            <span className="h-[1px] w-8 bg-black/30" /> Nos Partenaires
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-black mb-3 tracking-[-0.02em]">
            {sectionContent?.title || 'Partenaires de Confiance'}
          </h1>

          {/* Sub-headline */}
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-black/70 mb-6 tracking-[-0.02em]">
            {sectionContent?.description || 'Collaboration avec les fabricants leaders de l\'industrie.'}
          </h2>

          {/* Additional Description */}
          <div className="max-w-3xl mt-8">
            <p className="text-base md:text-lg text-black/60 leading-relaxed font-light">
              Nous collaborons avec les fabricants leaders du secteur pour offrir des solutions d'exception,
              garantissant qualité, innovation et durabilité.
            </p>
          </div>
        </div>
      </div>

      {/* Partners Logos Section */}
      <div className="w-full bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Visual Separator */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-4 w-full max-w-2xl">
              <div className="flex-1 h-px bg-black/10"></div>
              <div className="w-2 h-2 rounded-full bg-black/30"></div>
              <div className="flex-1 h-px bg-black/10"></div>
            </div>
          </div>

          {/* Partners Grid */}
          <div className="w-full max-w-6xl mx-auto overflow-hidden">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
            >
              {partners.concat(partners).map((partner, index) => (
                <div key={index} className="w-1/4 flex-shrink-0 px-8">
                  <div className="text-center group">
                    {partner.logo ? (
                      <div className="mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <img
                          src={urlFor(partner.logo).width(200).height(100).quality(90).url()}
                          alt={partner.name}
                          className="max-h-16 mx-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    ) : (
                      <h3 className="text-3xl md:text-4xl font-extralight text-gray-800 group-hover:text-black transition-colors duration-300 tracking-[-0.01em] mb-2">
                        {partner.name}
                      </h3>
                    )}
                    <div className="w-16 h-px bg-gray-300 group-hover:bg-black transition-colors duration-300 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Visual Elements */}
          <div className="mt-16 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/50 font-light">
              <span className="h-[1px] w-6 bg-black/20"></span>
              <span>Partenaires Certifiés</span>
              <span className="h-[1px] w-6 bg-black/20"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}