"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity"
import { getInteriorSection } from "@/services/sanity"
import { InteriorExteriorSkeleton } from "@/components/home/skeletons/interior-exterior-skeleton"

interface InteriorCategory {
  _id: string
  name: string
  description?: string
  image: any
  order: number
}

interface SectionContent {
  title: string
  description: string
  buttonText: string
  backgroundImage: any
}

export function InteriorSection() {
  const [categories, setCategories] = useState<InteriorCategory[]>([])
  const [sectionContent, setSectionContent] = useState<SectionContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch interior section data
        const sectionData = await getInteriorSection()

        if (sectionData?.categories && sectionData?.showSection !== false) {
          const formattedCategories = sectionData.categories.map((cat: any, index: number) => ({
            _id: `interior-${index}`,
            name: cat.name,
            description: cat.description,
            image: cat.image,
            order: cat.order || index
          })).sort((a: any, b: any) => a.order - b.order)

          setCategories(formattedCategories)
        }

        setSectionContent({
          title: sectionData?.title || 'Intérieur',
          description: sectionData?.description || 'Solutions d\'aménagement intérieur sur mesure alliant esthétique contemporaine et fonctionnalité optimale pour tous types d\'espaces.',
          buttonText: 'DÉCOUVRIR',
          backgroundImage: sectionData?.sectionImage
        })
      } catch (error) {
        console.error('Error fetching interior data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return <InteriorExteriorSkeleton sectionId="interieur" isInterior={true} />
  }

  if (!categories.length) return null

  return (
    <section id="interieur" className="w-full relative z-10 m-0 p-0 bg-white">
      {/* Title Section */}
      <div className="w-full bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-4">
            <span className="h-[1px] w-8 bg-black/30" /> Intérieur
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-black mb-3 tracking-[-0.02em]">
            {sectionContent?.title || 'Intérieur'}
          </h1>

          {/* Sub-headline */}
          {sectionContent?.description && (
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-black/70 mb-6 tracking-[-0.02em]">
              {sectionContent.description}
            </h2>
          )}

          {/* Decorative Element */}
          <div className="flex items-center gap-2">
            <svg width="60" height="2" className="text-black/20">
              <line x1="0" y1="1" x2="60" y2="1" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
            <svg width="60" height="2" className="text-black/20">
              <line x1="0" y1="1" x2="60" y2="1" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="h-screen w-full overflow-hidden relative m-0 p-0">
        <div className="w-full h-full m-0 p-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 h-full w-full gap-0 m-0 p-0">
            {categories.map((category, index) => (
              <div key={category._id} className="relative group overflow-hidden h-full w-full m-0 p-0">
                <img
                  src={category.image ? urlFor(category.image).quality(100).url() : "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 m-0 p-0"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-3 sm:p-4 lg:p-6">
                  <h3 className="text-white font-light text-sm sm:text-base lg:text-lg tracking-wide">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}