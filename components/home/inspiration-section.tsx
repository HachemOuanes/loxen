"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { client, urlFor } from "@/lib/sanity"
import { InspirationSkeleton } from "@/components/home/skeletons/inspiration-skeleton"

interface Inspiration {
  _id: string
  title: string
  location: string
  image: any
  order: number
  description?: string
  category?: string
}

interface SectionContent {
  title: string
  description: string
  buttonText: string
}

export function InspirationSection() {
  const [inspirations, setInspirations] = useState<Inspiration[]>([])
  const [sectionContent, setSectionContent] = useState<SectionContent | null>(null)
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
            order,
            category
          },
          showSection
        }`
        const sectionData = await client.fetch(inspirationQuery)

        if (sectionData?.projects && sectionData?.showSection !== false) {
          const formattedInspirations = sectionData.projects.map((project: any, index: number) => ({
            _id: `inspiration-${index}`,
            title: project.title,
            location: project.location || '',
            description: project.description || '',
            category: project.category || '',
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

  if (loading) {
    return <InspirationSkeleton />
  }

  if (!inspirations.length) return null

  // Split inspirations: first one goes in top right, rest go in grid below
  const firstInspiration = inspirations[0]
  const remainingInspirations = inspirations.slice(1)

  return (
    <section id="inspirations" className="w-full relative z-10 m-0 p-0 bg-gray-100">
      <div className="relative w-full m-0 p-0">
        {/* Flexbox Layout with Staggered/Shifted Pattern */}
        <div className="flex flex-wrap w-full">
          {/* Title Section - Left, takes up space */}
          <div className="w-full lg:w-1/2 flex-shrink-0 px-8 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-24">
            <div className="max-w-xl">
              {/* Section Indicator */}
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-6">
                <span className="h-[1px] w-8 bg-black/30" /> Nos Inspirations
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-black mb-4 tracking-[-0.02em]">
                {sectionContent?.title || 'Explore our project portfolio'}
              </h1>

              {/* Sub-headline */}
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-black mb-8 tracking-[-0.02em]">
                {sectionContent?.description || 'Découvrez une sélection de projets qui incarnent l\'excellence architecturale.'}
              </h2>

              {/* Decorative Element */}
              <div className="mt-8 flex items-center gap-2">
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

          {/* First Inspiration Image - Right, shifted down */}
          {firstInspiration && (
            <div className="w-full lg:w-1/2 flex-shrink-0 lg:mt-16 px-4 sm:px-6 lg:px-8">
              <Link
                href={`/inspirations/${firstInspiration._id}`}
                className="group hover:opacity-95 transition-opacity block"
              >
                <div className="relative w-full overflow-hidden aspect-[4/3] lg:aspect-[5/3]">
                  {firstInspiration.image ? (
                    <img
                      src={urlFor(firstInspiration.image).width(1200).height(720).quality(90).url()}
                      alt={firstInspiration.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800"></div>
                  )}
                  
                  {/* Tag Overlay */}
                  {firstInspiration.location && (
                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1.5 rounded-full text-xs font-light">
                      {firstInspiration.location}
                    </div>
                  )}
                </div>
                
                {/* Text Below Image */}
                <div className="px-4 py-4 bg-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl sm:text-2xl font-light text-black group-hover:opacity-80 transition-opacity">
                      {firstInspiration.title}
                      {firstInspiration.location && (
                        <span className="block text-base sm:text-lg font-light text-black/90 mt-1">
                          {firstInspiration.location}
                        </span>
                      )}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-black/60 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
                  </div>
                  {firstInspiration.category && (
                    <p className="text-xs tracking-[0.15em] uppercase text-black/70 font-light">
                      {firstInspiration.category}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          )}

          {/* Remaining Inspirations - Staggered Pattern */}
          {remainingInspirations.map((inspiration, index) => {
            // Alternate between left and right, creating staggered effect
            const isLeft = index % 2 === 0
            const isRight = index % 2 === 1
            
            return (
              <div
                key={inspiration._id}
                className={`w-full lg:w-1/2 flex-shrink-0 px-4 sm:px-6 lg:px-8 ${isLeft ? 'lg:mt-0' : 'lg:mt-16'}`}
              >
                <Link
                  href={`/inspirations/${inspiration._id}`}
                  className="group hover:opacity-95 transition-opacity block"
                >
                  <div className="relative w-full overflow-hidden aspect-[4/3] lg:aspect-[5/3]">
                    {inspiration.image ? (
                      <img
                        src={urlFor(inspiration.image).width(1200).height(720).quality(90).url()}
                        alt={inspiration.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800"></div>
                    )}
                    
                    {/* Tag Overlay */}
                    {inspiration.location && (
                      <div className="absolute top-4 left-4 bg-black text-white px-3 py-1.5 rounded-full text-xs font-light">
                        {inspiration.location}
                      </div>
                    )}
                  </div>
                  
                  {/* Text Below Image */}
                  <div className="px-4 py-4 bg-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl sm:text-2xl font-light text-black group-hover:opacity-80 transition-opacity">
                        {inspiration.title}
                        {inspiration.location && (
                          <span className="block text-base sm:text-lg font-light text-black/90 mt-1">
                            {inspiration.location}
                          </span>
                        )}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-black/60 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
                    </div>
                    {inspiration.category && (
                      <p className="text-xs tracking-[0.15em] uppercase text-black/70 font-light">
                        {inspiration.category}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}