'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { urlFor } from "@/lib/sanity"
import { CTAButton } from '@/components/ui/cta-button'
import { scrollToContact } from '@/lib/scroll-to-contact'

export type Decor = {
  _id: string
  external_code: string
  loxen_code?: string
  name: string
  image?: any
  image_url?: string
  collections?: string[]
  finishes?: string[]
  colors?: string[]
  external_order?: number
  products?: Array<{
    _id: string
    _type: string
    title?: string
    name?: string
    productId?: string
    slug?: { current: string }
  }>
  interior?: boolean
  exterior?: boolean
}

interface DecorsCarouselProps {
  decors: Decor[]
  collectionName?: string
  title?: string
  showCollectionBar?: boolean
  className?: string
}

export function DecorsCarousel({
  decors,
  collectionName,
  title = "Décors disponibles",
  showCollectionBar = true,
  className = ""
}: DecorsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const trackRef = useRef<HTMLDivElement | null>(null)

  // Filter out null/undefined decor references, deduplicate by _id, then sort by external_order
  const availableFinishes = decors
    .filter(f => f != null && f?._id && f?.external_code)
    .filter((f, index, self) =>
      index === self.findIndex((item) => item._id === f._id)
    )
    .sort((a, b) => (a?.external_order || 0) - (b?.external_order || 0))

  const actualFinishCount = availableFinishes.length

  const renderItems = useMemo(() => {
    if (!availableFinishes || availableFinishes.length === 0) return []
    if (availableFinishes.length <= 5) {
      return availableFinishes
    }
    const cloneCount = 5
    return [...availableFinishes, ...availableFinishes.slice(0, cloneCount)]
  }, [availableFinishes])

  useEffect(() => {
    if (!availableFinishes || availableFinishes.length <= 5) return
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    const track = trackRef.current
    if (!track) return

    const getStep = () => {
      const cards = Array.from(track.querySelectorAll('.js-decor-card')) as HTMLElement[]
      if (cards.length >= 2) {
        const step = cards[1].offsetLeft - cards[0].offsetLeft
        return step > 0 ? step : cards[0].offsetWidth
      }
      return cards[0]?.offsetWidth || 0
    }

    let index = 0
    let disposed = false

    const align = () => {
      const step = getStep()
      gsap.set(track, { x: -index * step })
    }

    align()

    const tick = () => {
      const total = availableFinishes.length
      const step = getStep()
      if (!step) return
      const next = index + 1
      gsap.to(track, {
        x: -next * step,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          if (disposed) return
          if (next >= total) {
            gsap.set(track, { x: 0 })
            index = 0
            setCurrentIndex(0)
          } else {
            index = next
            setCurrentIndex(next)
          }
        },
      })
    }

    const id = setInterval(tick, 2000)
    const onResize = () => align()
    window.addEventListener('resize', onResize)
    return () => {
      disposed = true
      clearInterval(id)
      window.removeEventListener('resize', onResize)
    }
  }, [availableFinishes.length])

  if (actualFinishCount === 0) {
    return null
  }

  return (
    <div className={className}>
      <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 font-light mb-4">
        <span className="h-[1px] w-8 bg-black/30" /> {title}
        <span className="ml-2 text-black/40 normal-case tracking-normal">• {actualFinishCount} décors</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Left intro text */}
        <div className="md:col-span-4">
          <div className="sticky top-24">
            <h3 className="text-2xl md:text-3xl lg:text-4xl text-black tracking-tight">
              {actualFinishCount} décors d'exception vous attendent.
            </h3>
            <p className="mt-3 text-lg md:text-xl text-black/70 leading-relaxed">
              Commandez dès maintenant vos échantillons gratuits et démarrez votre projet.
            </p>
          </div>
        </div>

        {/* Right grid */}
        <div className="md:col-span-8">
          <div className="relative overflow-hidden">
            <div ref={trackRef} className="flex gap-4 lg:gap-6 will-change-transform">
              {renderItems.map((finish, idx) => {
                const displayCode = finish.loxen_code || finish.external_code
                return (
                  <article
                    key={(finish.external_code + finish.name) + '-' + idx}
                    className="js-decor-card basis-1/2 shrink-0 group bg-white box-border lg:basis-[calc((100%_-_1.5rem_*_4)/5)]"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative rounded-2xl border-2 border-gray-100">
                      {finish.image ? (
                        <img
                          src={urlFor(finish.image).width(320).height(400).quality(85).url()}
                          alt={finish.name || displayCode || 'Decor'}
                          className="h-full w-full object-cover transform-gpu will-change-transform transition-transform duration-500 ease-out group-hover:scale-110 rounded-2xl"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            if (finish?.image_url) {
                              (e.target as HTMLImageElement).src = finish.image_url
                            }
                          }}
                        />
                      ) : finish?.image_url ? (
                        <img
                          src={finish.image_url}
                          alt={finish.name || displayCode || 'Decor'}
                          className="h-full w-full object-cover transform-gpu will-change-transform transition-transform duration-500 ease-out group-hover:scale-110 rounded-2xl"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="h-full w-full rounded-2xl bg-gray-200" />
                      )}
                      {(finish.interior || finish.exterior) && (
                        <div className="absolute bottom-2 left-2 flex gap-1">
                          {finish.interior && (
                            <span className="bg-white/90 text-black text-[9px] px-1.5 py-0.5 uppercase rounded">Int</span>
                          )}
                          {finish.exterior && (
                            <span className="bg-white/90 text-black text-[9px] px-1.5 py-0.5 uppercase rounded">Ext</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-black">{displayCode}</p>
                      <p className="text-xs text-black/70 truncate">{finish.name}</p>
                      {finish.products && finish.products.length > 0 && (
                        <p className="mt-1 text-xs text-black/50 truncate">
                          {finish.products.slice(0, 2).map(p => p.title || p.name).join(', ')}
                          {finish.products.length > 2 && ` +${finish.products.length - 2}`}
                        </p>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {showCollectionBar && (
        <>
          {collectionName ? (
            <div className="bg-gray-50 mt-6 p-3 border-2 border-gray-100">
              <p className="text-xs text-gray-700 text-center">
                Collection <span className="">{collectionName}</span>
                {actualFinishCount > 0 && <span> • {actualFinishCount} décors</span>}
                {" "}
                <Link
                  href="/decors"
                  className="underline underline-offset-2 decoration-black/30 hover:decoration-black ml-1"
                >
                  Voir tous
                </Link>
              </p>
            </div>
          ) : actualFinishCount > 0 ? (
            <div className="bg-gray-50 mt-6 p-3 border-2 border-gray-100">
              <p className="text-xs text-gray-700 text-center">
                <Link
                  href="/decors"
                  className="underline underline-offset-2 decoration-black/30 hover:decoration-black"
                >
                  Voir tous les décors ({actualFinishCount}) →
                </Link>
              </p>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
