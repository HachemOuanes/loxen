"use client"

import { useEffect, useState } from "react"
import { client } from "@/lib/sanity"

interface VisionContent {
  title: string
  mission: string
}

export function VisionSection() {
  const [content, setContent] = useState<VisionContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vision/mission content from Sanity
        const query = `*[_type == "heroSection"][0]{
          title,
          subtitle
        }`
        const data = await client.fetch(query)

        setContent({
          title: data?.title || 'Our Vision',
          mission: data?.subtitle || 'Our mission is to deliver exceptional quality and innovation in every project we undertake.'
        })
      } catch (error) {
        console.error('Error fetching vision data:', error)
        // Set default content on error
        setContent({
          title: 'Our Vision',
          mission: 'Our mission is to deliver exceptional quality and innovation in every project we undertake.'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section id="vision" className="w-full relative z-10 m-0 p-0 bg-gradient-to-b from-gray-100 to-white">
        <div className="w-full px-8 py-16 md:py-24 lg:py-32">
          <div className="h-64 bg-gray-100"></div>
        </div>
      </section>
    )
  }

  if (!content) return null

  return (
    <section id="vision" className="w-full relative z-10 m-0 p-0 bg-gradient-to-b from-gray-100 to-white">
      <div className="w-full px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Large text on the left */}
          <div className="flex flex-col col-span-3">
            <h2 className="text-[140px] text-black tracking-[-0.02em] leading-tight">
              Made to matter
            </h2>
          </div>

          {/* Small text on the right, aligned with top */}
          <div className="flex flex-col pt-0">
            <p className="text-base md:text-lg lg:text-xl text-black/70 leading-relaxed font-light">
              {content.mission}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

