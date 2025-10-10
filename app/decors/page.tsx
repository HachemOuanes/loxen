import { Metadata } from 'next'
import { client, urlFor } from '@/lib/sanity'
import React from 'react'

type Finish = {
  code: string
  name: string
  image?: any
  color?: string
  collectionName?: string
}

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Décors disponibles',
  description: 'Découvrez tous les décors disponibles pour nos produits: codes, visuels et collections.'
}

async function getAllFinishes(): Promise<Finish[]> {
  // Gather finishes from the product catalog; if multiple products share the same finish entry, flatten uniquely by code+name
  const data = await client.fetch(`
    {
      "items": *[_type == "productItem"]{collectionName, availableFinishes[]{code,name,image,color}}
    }
  `)
  const items = (data?.items || []) as Array<{collectionName?: string, availableFinishes?: Finish[]}>;
  const all: Finish[] = []
  const seen = new Set<string>()
  for (const it of items) {
    for (const f of (it.availableFinishes || [])) {
      const key = `${f.code}|${f.name}`
      if (!seen.has(key)) {
        seen.add(key)
        all.push({ ...f, collectionName: it.collectionName })
      }
    }
  }
  return all
}

export default async function DecorsPage() {
  const finishes = await getAllFinishes()

  return (
    <main className="bg-white">
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
            <span className="h-[1px] w-8 bg-black/20" /> Tous les décors
          </div>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-black mb-2">Décors disponibles</h1>
          <p className="text-black/70 max-w-2xl">Parcourez l’ensemble des décors: marbres, bois, bétons, unis… Cliquez sur un décor pour l’agrandir.</p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {finishes.map((finish) => (
              <article key={finish.code + finish.name} className="group border border-black/10 bg-white overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden bg-gray-50">
                  {finish.image ? (
                    <img
                      src={urlFor(finish.image).width(480).height(600).quality(85).url()}
                      alt={finish.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  {finish.collectionName && (
                    <p className="mt-1 text-[11px] text-black/50">{finish.collectionName}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
