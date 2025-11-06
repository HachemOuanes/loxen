'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { urlFor } from "@/lib/sanity"

export type Decor = {
  _id: string
  code: string
  name: string
  image?: any
  image_url?: string
  color?: string
  colors?: string[]
  abet_order?: number
  products?: Array<{
    _id: string
    _type: string
    name: string
    productId?: string
    slug?: { current: string }
  }>
  interior?: boolean
  exterior?: boolean
  available?: boolean
  is_new?: boolean
  featured?: boolean
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

  // Filter out null/undefined decor references and unavailable decors, then sort by abet_order
  const availableFinishes = decors
    .filter(f => f != null && f?._id && f?.code && (f?.available !== false))
    .sort((a, b) => (a?.abet_order || 0) - (b?.abet_order || 0))
  
  // Calculate actual count from filtered array
  const actualFinishCount = availableFinishes.length

  // Precompute render list with cloned items for seamless looping
  const renderItems = useMemo(() => {
    if (!availableFinishes || availableFinishes.length === 0) return []
    const cloneCount = Math.min(5, availableFinishes.length) // clone first 5 items for seamless loop (5 visible on desktop)
    return [...availableFinishes, ...availableFinishes.slice(0, cloneCount)]
  }, [availableFinishes])

  // Auto-advance one item at a time with seamless loop
  useEffect(() => {
    if (!availableFinishes || availableFinishes.length <= 1) return
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
            // Snap back to start (after sliding onto the first cloned item)
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
      <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-4">
        <span className="h-[1px] w-8 bg-black/20" /> {title}
        <span className="ml-2 text-black/40 normal-case tracking-normal">• {actualFinishCount} décors</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Left intro text */}
        <div className="md:col-span-4">
          <div className="sticky top-24">
            <h3 className="text-xl md:text-2xl font-light tracking-tight text-black">
              {actualFinishCount} décors d'exception vous attendent.
            </h3>
            <p className="mt-3 text-black/70 leading-relaxed">
              Commandez dès maintenant vos échantillons gratuits et démarrez votre projet.
            </p>
            <div className="mt-5">
              <Link 
                href="/contact" 
                className="inline-block border border-black/20 px-4 py-2 text-xs tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors"
              >
                Commander des échantillons
              </Link>
            </div>
          </div>
        </div>

        {/* Right grid */}
        <div className="md:col-span-8">
          <div className="relative overflow-hidden">
            <div ref={trackRef} className="flex gap-4 lg:gap-6 will-change-transform">
              {renderItems.map((finish, idx) => (
                <article
                  key={(finish.code + finish.name) + '-' + idx}
                  className="js-decor-card basis-1/2 shrink-0 group bg-white box-border lg:basis-[calc((100%_-_1.5rem_*_4)/5)]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative rounded-2xl border border-black/10">
                    {finish.image ? (
                      <img
                        src={urlFor(finish.image).width(320).height(400).quality(85).url()}
                        alt={finish.name || finish.code || 'Decor'}
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
                        alt={finish.name || finish.code || 'Decor'}
                        className="h-full w-full object-cover transform-gpu will-change-transform transition-transform duration-500 ease-out group-hover:scale-110 rounded-2xl"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="h-full w-full rounded-2xl" style={{ backgroundColor: finish.color || finish.colors?.[0] || '#e5e7eb' }} />
                    )}
                    {finish.is_new && (
                      <div className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-1 uppercase tracking-wide">
                        Nouveau
                      </div>
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
                    <p className="text-xs font-medium text-black">{finish.code}</p>
                    <p className="text-xs text-black/70 truncate">{finish.name}</p>
                    {finish.products && finish.products.length > 0 && (
                      <p className="mt-1 text-[11px] text-black/50 truncate">
                        {finish.products.slice(0, 2).map(p => p.name).join(', ')}
                        {finish.products.length > 2 && ` +${finish.products.length - 2}`}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showCollectionBar && (
        <>
          {collectionName ? (
            <div className="bg-gray-50 mt-6 p-3 border border-gray-200">
              <p className="text-xs text-gray-700 text-center">
                Collection <span className="font-medium">{collectionName}</span>
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
            <div className="bg-gray-50 mt-6 p-3 border border-gray-200">
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

