"use client"

import { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import { urlFor } from '@/lib/sanity'
import { getProductItemBySlug } from '@/services/sanity'

type Finish = {
  code: string
  name: string
  image?: any
  color?: string
}

interface DecorsDispoGridProps {
  slug: string
  shared: any
}

export function DecorsDispoGrid({ slug, shared }: DecorsDispoGridProps) {
  const [finishes, setFinishes] = useState<Finish[] | null>(null)
  const [total, setTotal] = useState<number | undefined>(undefined)
  const [collectionName, setCollectionName] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        // Check if we have random decors from shared data
        if (slug === 'random' && shared?.finitionsDisponibles?.decors) {
          if (!mounted) return
          setFinishes(shared.finitionsDisponibles.decors)
          setTotal(shared.finitionsDisponibles.decors.length)
          setCollectionName('Collection variée')
        } else {
          // Fallback to product-based decors
          const data = await getProductItemBySlug(slug)
          if (!mounted) return
          setFinishes(data?.availableFinishes || [])
          setTotal(data?.totalFinishesCount)
          setCollectionName(data?.collectionName)
        }
      } catch (_e) {
        if (!mounted) return
        setFinishes([])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [slug, shared])

  // Precompute render list with one cloned item for seamless looping
  const renderItems = useMemo(() => {
    if (!finishes || finishes.length === 0) return []
    const cloneCount = Math.min(5, finishes.length) // clone first 5 items for seamless loop (5 visible on desktop)
    return [...finishes, ...finishes.slice(0, cloneCount)]
  }, [finishes])

  // Auto-advance one item at a time with seamless loop
  useEffect(() => {
    if (!finishes || finishes.length <= 1) return
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
      const total = finishes.length
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
  }, [finishes?.length])

  return (
    <div>
      <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-4">
        <span className="h-[1px] w-8 bg-black/20" /> {shared?.finitionsDisponibles?.title || 'Finitions disponibles'}
        {typeof total === 'number' && (
          <span className="ml-2 text-black/40 normal-case tracking-normal">• {total} finitions</span>
        )}
      </div>

      {loading ? (
        <p className="text-black/60 text-sm">Chargement des finitions…</p>
      ) : finishes && finishes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Left intro text */}
            <div className="md:col-span-4">
              <div className="js-reveal sticky top-24">
                <h3 className="text-xl md:text-2xl font-light tracking-tight text-black">
                  {(typeof total === 'number' ? total : (finishes?.length || 0))} finitions d'exception vous attendent.
                </h3>
                <p className="mt-3 text-black/70 leading-relaxed">
                  Commandez dès maintenant vos échantillons gratuits et démarrez votre projet.
                </p>
                <div className="mt-5">
                  <a href="/contact" className="inline-block border border-black/20 px-4 py-2 text-xs tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors">
                    Commander des échantillons
                  </a>
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
                      className="js-decor-card basis-1/2 shrink-0 group border border-black/10 bg-white overflow-hidden box-border lg:basis-[calc((100%_-_1.5rem_*_4)/5)]"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-gray-50">
                        {finish.image ? (
                          <img
                            src={urlFor(finish.image).width(320).height(400).quality(85).url()}
                            alt={finish.name}
                            className="h-full w-full object-cover transform-gpu will-change-transform transition-transform duration-500 ease-out group-hover:scale-110"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="h-full w-full" style={{ backgroundColor: finish.color || '#e5e7eb' }} />
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-medium text-black">{finish.code}</p>
                        <p className="text-xs text-black/70 truncate">{finish.name}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {collectionName && (
            <div className="bg-gray-50 mt-6 p-3 border border-gray-200">
              <p className="text-xs text-gray-700 text-center">
                Collection <span className="font-medium">{collectionName}</span>
                {typeof total === 'number' ? <span> • {total} finitions</span> : null}
                {" "}
                {/** Inline action to view all decors */}
                <a href="/decors" className="underline underline-offset-2 decoration-black/30 hover:decoration-black ml-1">Voir tous</a>
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="text-black/60 text-sm">Aucun décor disponible pour le moment.</p>
      )}
    </div>
  )
}
