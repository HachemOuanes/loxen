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
    <section id="interieur" className="relative h-screen flex flex-col lg:flex-row my-8 px-8 gap-2">
      <div className="w-full lg:w-1/4 relative flex flex-col items-center justify-center z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: sectionContent?.backgroundImage 
              ? `url('${urlFor(sectionContent.backgroundImage).width(1024).height(1024).quality(95).url()}')` 
              : "url('/interior-design-background.jpg')" 
          }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative text-center space-y-4 sm:space-y-6 lg:space-y-8 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-white tracking-[-0.02em]">
            {sectionContent?.title || 'Intérieur'}
          </h2>
          <p className="text-white/80 font-light leading-relaxed max-w-xs sm:max-w-sm px-4">
            {sectionContent?.description}
          </p>
          <Button
            onClick={scrollToTop}
            className="mt-4 sm:mt-6 bg-black/40 backdrop-blur-md text-white hover:bg-black/50 hover:scale-105 font-light tracking-wider border-2 border-gray-200/20 rounded-none transition-all duration-300 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
          >
            {sectionContent?.buttonText || 'DÉCOUVRIR'}
          </Button>
        </div>
      </div>

      <div className="w-full lg:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 h-full gap-2">
          {categories.map((category, index) => (
            <div key={category._id} className="relative group overflow-hidden min-h-[200px] sm:min-h-[250px]">
              <img
                src={category.image ? urlFor(category.image).width(1024).height(1024).quality(95).url() : "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6">
                <h3 className="text-white font-light text-sm sm:text-base lg:text-lg tracking-wide">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}