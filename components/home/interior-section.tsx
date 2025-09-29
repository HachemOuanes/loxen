"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { client, urlFor } from "@/lib/sanity"
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
        const interiorQuery = `*[_type == "interiorSection"][0]{
          title,
          description,
          sectionImage,
          categories[]{
            name,
            description,
            image,
            order
          },
          showSection
        }`
        const sectionData = await client.fetch(interiorQuery)
        
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
    <section id="interieur" className="py-6 px-4 bg-white relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extralight text-black mb-6 sm:mb-8 tracking-[-0.02em]">
          {sectionContent?.title || 'Intérieur'}
        </h2>
        {/* <div className="w-16 sm:w-20 lg:w-24 h-px bg-black/20 mx-auto mb-6 sm:mb-8"></div>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-light px-4">
          {sectionContent?.description}
        </p> */}
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 h-full gap-0.5">
          {categories.map((category, index) => (
            <div key={category._id} className="relative group overflow-hidden h-[50vh]">
              <img
                src={category.image ? urlFor(category.image).width(1024).height(1024).quality(95).url() : "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-3 sm:p-4 lg:p-6">
                <h3 className="text-white font-light text-sm sm:text-base lg:text-lg tracking-wide">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}