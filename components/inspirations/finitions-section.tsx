"use client"

import { useEffect, useState } from 'react'
import { urlFor } from '@/lib/sanity'

interface FinitionItem {
  key: string
  title: string
  subtitle: string
  description: string
  image: any
  schema?: any
}

interface FinitionsSectionProps {
  title: string
  items: FinitionItem[]
}

export function FinitionsSection({ title, items }: FinitionsSectionProps) {
  // Carousel state
  const [current, setCurrent] = useState(0)
  const CARD_WIDTH = 400
  const GAP = 16
  const total = items.length

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 3000)
    return () => clearInterval(interval)
  }, [total])

  const next = () => setCurrent((prev) => (prev + 1) % total)
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total)

  // Slide style for fixed width
  const slideStyle = { width: `${CARD_WIDTH}px`, marginRight: `${GAP}px` }

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
          <span className="h-[1px] w-8 bg-black/20" /> {title}
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-none">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * (CARD_WIDTH + GAP)}px)`,
              }}
            >
              {[...items, ...items].map((f: FinitionItem, idx: number) => (
                <div key={f.key + idx} style={slideStyle} className="flex-shrink-0">
                  <article className="group border border-black/10 bg-white overflow-hidden pb-4">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={f.image ? urlFor(f.image).width(400).height(300).quality(85).url() : '/placeholder.jpg'} 
                        alt={f.title + ' — ' + f.subtitle} 
                        className="h-full w-full object-cover transform-gpu will-change-transform transition-transform duration-500 ease-out group-hover:scale-110" 
                      />
                    </div>
                    <div className="p-5 md:p-6">
                      <h4 className="text-lg md:text-xl font-medium tracking-tight text-black">{f.title}</h4>
                      <p className="text-sm uppercase tracking-[0.14em] text-black/60">{f.subtitle}</p>
                      <p className="mt-3 text-black/70 leading-relaxed">{f.description}</p>
                    </div>
                    {f.schema && (
                      <img 
                        src={urlFor(f.schema).width(500).height(200).quality(85).url()} 
                        alt={f.title + ' schema'} 
                        className="mx-auto h-auto w-2/3 object-contain" 
                      />
                    )}
                  </article>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prev}
            className="absolute left-2 sm:left-4 lg:left-8 top-1/3 transform -translate-y-1/2 bg-black/10 hover:bg-black/20 text-white p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm hidden sm:block text-2xl"
          >
            <span className="sr-only">Précédent</span>
            &#8592;
          </button>
          <button
            onClick={next}
            className="absolute right-2 sm:right-4 lg:right-8 top-1/3 transform -translate-y-1/2 bg-black/10 hover:bg-black/20 text-white p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm hidden sm:block text-2xl"
          >
            <span className="sr-only">Suivant</span>
            &#8594;
          </button>
        </div>
      </div>
    </section>
  )
}
