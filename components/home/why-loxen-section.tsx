"use client"

import { useEffect, useState } from "react"
import { client } from "@/lib/sanity"

interface WhyLoxenPoint {
  _key?: string
  title: string
  description: string
  order?: number
}

interface WhyLoxenContent {
  slogan: string
  points: WhyLoxenPoint[]
}

export function WhyLoxenSection() {
  const [content, setContent] = useState<WhyLoxenContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch why loxen content from Sanity
        const query = `*[_type == "whyLoxenSection"][0]{
          slogan,
          points[]{
            _key,
            title,
            description,
            order
          },
          showSection
        }`
        const data = await client.fetch(query)

        if (data?.showSection !== false) {
          setContent({
            slogan: data?.slogan || 'Where <em>artistry</em> meets <em>precision</em>, creating spaces that <em>inspire</em>.',
            points: data?.points?.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || [
              {
                _key: '1',
                title: 'Premium Quality',
                description: 'We source only the finest materials and employ meticulous craftsmanship to ensure every product meets our exacting standards.'
              },
              {
                _key: '2',
                title: 'Custom Solutions',
                description: 'Every project is unique. We work closely with architects and designers to create bespoke solutions tailored to your vision.'
              },
              {
                _key: '3',
                title: 'Sustainable Excellence',
                description: 'Committed to environmental responsibility, we combine luxury with sustainability in every aspect of our production.'
              }
            ]
          })
        }
      } catch (error) {
        console.error('Error fetching why loxen data:', error)
        // Set default content on error
        setContent({
          slogan: 'Where <em>artistry</em> meets <em>precision</em>, creating spaces that <em>inspire</em>.',
          points: [
            {
              _key: '1',
              title: 'Premium Quality',
              description: 'We source only the finest materials and employ meticulous craftsmanship to ensure every product meets our exacting standards.'
            },
            {
              _key: '2',
              title: 'Custom Solutions',
              description: 'Every project is unique. We work closely with architects and designers to create bespoke solutions tailored to your vision.'
            },
            {
              _key: '3',
              title: 'Sustainable Excellence',
              description: 'Committed to environmental responsibility, we combine luxury with sustainability in every aspect of our production.'
            }
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section id="why-loxen" className="w-full relative z-10 m-0 p-0 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="py-6 md:py-8 pr-6 md:pr-8">
              <div className="h-8 bg-black/5 rounded w-32 mb-5"></div>
              <div className="h-16 bg-black/5 rounded w-full mb-5"></div>
            </div>
            <div className="py-6 md:py-8 pl-6 md:pl-8">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-black/5 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!content) return null

  return (
    <section id="why-loxen" className="w-full relative z-10 m-0 p-0 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Visual Separator at Top */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="flex-1 h-px bg-black/10"></div>
            <div className="w-2 h-2 rounded-full bg-black/30"></div>
            <div className="flex-1 h-px bg-black/10"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Column - Slogan */}
          <div className="py-6 md:py-8 pr-6 md:pr-8 border-r border-black/10">
            {/* Section Header */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="h-[1px] w-8 bg-black/30" />
              <span className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">
                Why Loxen
              </span>
            </div>

            {/* Main Slogan */}
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-black mb-5 leading-tight [&_em]:italic [&_em]:font-light"
              dangerouslySetInnerHTML={{ __html: content.slogan }}
            />

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

          {/* Right Column - Points */}
          <div className="py-6 md:py-8 pl-6 md:pl-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs tracking-[0.18em] uppercase text-black/60 font-light">
                Our Values
              </span>
              <span className="text-xs tracking-[0.18em] uppercase text-black/60 font-light">
                {content.points.length.toString().padStart(2, '0')} Points
              </span>
            </div>

            {/* Points List */}
            <div className="space-y-0">
              {content.points.map((point, index) => (
                <div
                  key={point._key || index}
                  className={`py-4 md:py-5 px-4 flex flex-col gap-2 group hover:bg-black/5 transition-colors duration-200 rounded-sm ${
                    index < content.points.length - 1 ? 'border-b border-black/5' : ''
                  }`}
                >
                  {/* Point Title */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font-light tracking-tight text-black/40">
                      {(index + 1).toString().padStart(2, '0')}.
                    </span>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-light tracking-tight text-black">
                      {point.title}
                    </h3>
                  </div>

                  {/* Point Description */}
                  <p className="text-sm md:text-base text-black/70 leading-relaxed font-light pl-8 md:pl-10">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Separator at Bottom */}
        <div className="flex items-center justify-center mt-12">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="flex-1 h-px bg-black/10"></div>
            <div className="flex items-center gap-2">
              <svg width="8" height="8" className="text-black/30">
                <circle cx="4" cy="4" r="1" fill="currentColor" />
                <circle cx="4" cy="4" r="3.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            <div className="flex-1 h-px bg-black/10"></div>
          </div>
        </div>

        {/* Additional Visual Elements */}
        <div className="mt-12 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/50 font-light">
            <span className="h-[1px] w-6 bg-black/20"></span>
            <span>Excellence & Innovation</span>
            <span className="h-[1px] w-6 bg-black/20"></span>
          </div>
        </div>
      </div>
    </section>
  )
}

