"use client"

import { DecorsDispoGrid } from '@/components/inspirations/decors-dispo-grid'

interface DecorsSectionProps {
  enabled?: boolean
  slug?: string
  shared: any
}

export function DecorsSection({ enabled, slug, shared }: DecorsSectionProps) {
  // Only render if explicitly enabled
  if (enabled !== true) {
    return null
  }

  return (
    <section id="examples" className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <DecorsDispoGrid slug={slug || shared?.finitionsDisponibles?.productSlug || "meg-standard"} shared={shared} />
      </div>
    </section>
  )
}
