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
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-extralight text-black mb-8 tracking-[-0.02em]">
            {sectionContent?.title || 'Partenaires de Confiance'}
          </h2>
          <div className="w-24 h-px bg-black/20 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            {sectionContent?.description || 'Collaboration avec les fabricants leaders de l\'industrie.'}
          </p>
        </div>

        <div className="max-w-6xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
          >
            {partners.concat(partners).map((partner, index) => (
              <div key={index} className="w-1/4 flex-shrink-0 px-8">
                <div className="text-center group">
                  <h3 className="text-4xl font-extralight text-gray-800 group-hover:text-black transition-colors duration-300 tracking-[-0.01em] mb-2">
                    {partner.name}
                  </h3>
                  <div className="w-16 h-px bg-gray-300 group-hover:bg-black transition-colors duration-300 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}