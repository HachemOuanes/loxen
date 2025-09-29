"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { client, urlFor } from "@/lib/sanity"
import { InspirationSkeleton } from "@/components/home/skeletons/inspiration-skeleton"

interface Inspiration {
  _id: string
  title: string
  location: string
  image: any
  order: number
}

interface SectionContent {
  title: string
  description: string
  buttonText: string
}

export function InspirationSection() {
  const [inspirations, setInspirations] = useState<Inspiration[]>([])
  const [sectionContent, setSectionContent] = useState<SectionContent | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch inspirations from unified section
        const inspirationQuery = `*[_type == "inspirationSection"][0]{
          title,
          description,
          projects[]{
            title,
            description,
            image,
            location,
            order
          },
          showSection
        }`
        const sectionData = await client.fetch(inspirationQuery)

        if (sectionData?.projects && sectionData?.showSection !== false) {
          const formattedInspirations = sectionData.projects.map((project: any, index: number) => ({
            _id: `inspiration-${index}`,
            title: project.title,
            location: project.location || '',
            image: project.image,
            order: project.order || index
          })).sort((a: any, b: any) => a.order - b.order)

          setInspirations(formattedInspirations)
        }

        setSectionContent({
          title: sectionData?.title || 'Inspiration',
          description: sectionData?.description || 'Découvrez une sélection de projets qui incarnent l\'excellence architecturale et reflètent notre savoir-faire unique en matière d\'aluminium et de façades.',
          buttonText: 'Explorer Plus de Réalisations'
        })
      } catch (error) {
        console.error('Error fetching inspirations data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (inspirations.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % inspirations.length)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [inspirations.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % inspirations.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + inspirations.length) % inspirations.length)
  }

  const extendedProjects = [...inspirations, ...inspirations, ...inspirations]
  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3
  }

  const [visibleSlides, setVisibleSlides] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides())
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (loading) {
    return <InspirationSkeleton />
  }

  if (!inspirations.length) return null

  return (
    <section id="inspirations" className="py-16 px-4">
      <div className="text-center mb-12 sm:mb-16 lg:mb-20">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extralight text-black mb-6 sm:mb-8 tracking-[-0.02em]">
          {sectionContent?.title || 'Inspiration'}
        </h2>
        <div className="w-16 sm:w-20 lg:w-24 h-px bg-black/20 mx-auto mb-6 sm:mb-8"></div>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-light px-4">
          {sectionContent?.description}
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-none">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)` }}
          >
            {extendedProjects.map((project, index) => (
              <div
                key={index}
                className={`flex-shrink-0 px-2 sm:px-4 ${visibleSlides === 1 ? "w-full" : visibleSlides === 2 ? "w-1/2" : "w-1/3"
                  }`}
              >
                <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-100">
                  <img
                    src={project.image ? urlFor(project.image).width(1024).height(1024).quality(95).url() : "/placeholder.svg"}
                    alt={`${project.title} - ${project.location}`}
                    className="w-full h-full object-cover transition-all duration-700 scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/95 p-3 sm:p-4 lg:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-light text-white mb-1 tracking-wide">
                      {project.title}
                    </h3>
                    <p className="text-white/90 font-light tracking-wider text-xs uppercase">{project.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm hidden sm:block"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm hidden sm:block"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="flex justify-center mt-8 sm:mt-12 space-x-2 sm:space-x-3">
          {inspirations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-black" : "bg-gray-300 hover:bg-gray-400"
                }`}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-12 sm:mt-16">
        <Button
          variant="outline"
          size="lg"
          className="text-sm sm:text-base px-8 sm:px-12 py-3 sm:py-4 bg-transparent border-2 border-black/20 text-black hover:bg-black hover:text-white font-light tracking-wider rounded-none transition-all duration-300"
        >
          {sectionContent?.buttonText || 'Explorer Plus de Réalisations'}
        </Button>
      </div>
    </section>
  )
}