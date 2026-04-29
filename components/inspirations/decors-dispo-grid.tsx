"use client"

import { useEffect, useState } from 'react'
import { getProductItemBySlug } from '@/services/sanity'
import { DecorsCarousel, type Decor } from '@/components/shared/decors-carousel'
import { DecorsSkeleton } from '@/components/shared/skeletons/decors-skeleton'

interface DecorsDispoGridProps {
  slug: string
  shared: any
}

export function DecorsDispoGrid({ slug, shared }: DecorsDispoGridProps) {
  // Check if decors are already available from shared data (server-side)
  const initialDecors = shared?.finitionsDisponibles?.decors
  const hasInitialDecors = initialDecors && Array.isArray(initialDecors) && initialDecors.length > 0
  
  const [finishes, setFinishes] = useState<Decor[] | null>(hasInitialDecors ? initialDecors : null)
  const [collectionName, setCollectionName] = useState<string | undefined>(
    hasInitialDecors ? (shared.finitionsDisponibles.collectionName || 'Collection variée') : undefined
  )
  const [loading, setLoading] = useState<boolean>(!hasInitialDecors)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        // Check if we have decors from shared data (from product page or other sources)
        if (shared?.finitionsDisponibles?.decors && shared.finitionsDisponibles.decors.length > 0) {
          if (!mounted) return
          setFinishes(shared.finitionsDisponibles.decors)
          setCollectionName(shared.finitionsDisponibles.collectionName || 'Collection variée')
          if (mounted) setLoading(false)
          return
        }
        
          // Fallback to product-based decors (decors are now independent)
        if (slug !== 'random') {
          const data = await getProductItemBySlug(slug)
          if (!mounted) return
          setFinishes([])
          setCollectionName(data?.collectionName)
        } else {
          setFinishes([])
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

  if (loading) {
    return <DecorsSkeleton />
  }

  if (!finishes || finishes.length === 0) {
    return (
      <div>
        <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 font-light mb-4">
          <span className="h-[1px] w-8 bg-black/30" /> {shared?.finitionsDisponibles?.title || 'Finitions disponibles'}
            </div>
        <p className="text-base md:text-lg text-black/70">Aucun décor disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="js-reveal">
      <DecorsCarousel
        decors={finishes}
        collectionName={collectionName}
        title={shared?.finitionsDisponibles?.title || 'Finitions disponibles'}
        showCollectionBar={true}
      />
    </div>
  )
}
