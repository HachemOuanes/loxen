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
  category?: string
}

interface SectionContent {
  title: string
  description: string
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
            image: project.image,
            order: project.order || index,
            category: project.category || 'PROJECT'
          })).sort((a: any, b: any) => a.order - b.order).slice(0, 4) // Limit to 4 inspirations

          setInspirations(formattedInspirations)
        }

        setSectionContent({
          title: sectionData?.title || 'Inspiration',
          description: sectionData?.description || 'Découvrez une sélection de projets qui incarnent l\'excellence architecturale et reflètent notre savoir-faire unique en matière d\'aluminium et de façades.'
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

  return (
    <section id="inspirations" className="w-full relative z-10 m-0 p-0 bg-white">
      <div className="w-full px-8 py-16 md:py-24 lg:py-32">
        {/* Header Section */}
        <div className="mb-12">
          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-4 font-light">
            <span className="h-[1px] w-8 bg-black/30" /> Inspirations
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black mb-3 tracking-[-0.02em]">
            Architectural excellence. Realized through innovative design.
          </h1>

        </div>

        {/* Inspiration Items Grid - 4 columns with varying heights */}
        {inspirations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inspirations.map((inspiration, index) => {
              // Alternating heights: even indices (0, 2) are tall, odd indices (1, 3) are short
              const isTall = index % 2 === 0
              const imageHeight = isTall ? 'h-[400px] md:h-[500px] lg:h-[600px]' : 'h-[260px] md:h-[360px] lg:h-[460px]'

              return (
                <Link
                  key={inspiration._id || index}
                  href={`/inspirations/${inspiration._id}`}
                  className="group bg-white"
                >
                  {/* Image Section - Top with varying heights */}
                  <div className={`relative overflow-hidden ${imageHeight} mb-4 bg-gray-100`}>
                    {inspiration.image ? (
                      <img
                        src={urlFor(inspiration.image).width(1200).height(900).quality(90).url()}
                        alt={inspiration.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100"></div>
                    )}
                  </div>

                  {/* Content Section - Below image */}
                  <div className="flex flex-col">
                    {/* Category and Read Time */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs tracking-[0.18em] uppercase text-black/60 font-light">
                        CATEGORY {index + 1}
                      </span>
                      <span className="text-xs tracking-[0.18em] uppercase text-black/60 font-light">
                        PRODUCT {index + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl text-black group-hover:opacity-70 transition-opacity leading-tight">
                      {inspiration.title}
                    </h3>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
