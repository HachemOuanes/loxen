"use client"

import { useEffect, useState } from 'react'
import { getProductItemBySlug } from '@/services/sanity'
import { DecorsCarousel, type Decor } from '@/components/shared/decors-carousel'

interface DecorsDispoGridProps {
  slug: string
  shared: any
}

export function DecorsDispoGrid({ slug, shared }: DecorsDispoGridProps) {
  const [finishes, setFinishes] = useState<Decor[] | null>(null)
  const [collectionName, setCollectionName] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        // Check if we have random decors from shared data
        if (slug === 'random' && shared?.finitionsDisponibles?.decors) {
          if (!mounted) return
          setFinishes(shared.finitionsDisponibles.decors)
          setCollectionName('Collection variée')
        } else {
          // Fallback to product-based decors (decors are now independent)
          const data = await getProductItemBySlug(slug)
          if (!mounted) return
          setFinishes([])
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

  if (loading) {
  return (
    <div>
      <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-4">
        <span className="h-[1px] w-8 bg-black/20" /> {shared?.finitionsDisponibles?.title || 'Finitions disponibles'}
      </div>
        <p className="text-black/60 text-sm">Chargement des finitions…</p>
                </div>
    )
  }

  if (!finishes || finishes.length === 0) {
    return (
      <div>
        <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-4">
          <span className="h-[1px] w-8 bg-black/20" /> {shared?.finitionsDisponibles?.title || 'Finitions disponibles'}
            </div>
        <p className="text-black/60 text-sm">Aucun décor disponible pour le moment.</p>
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
