import { Metadata } from 'next'
import { getAllDecors } from '@/services/sanity'
import { DecorsWithFilters } from '@/components/decors/decors-with-filters'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import React from 'react'

type Finish = {
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
  keywords?: string[]
  interior?: boolean
  exterior?: boolean
  available?: boolean
  is_new?: boolean
  featured?: boolean
}

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Décors disponibles',
  description: 'Découvrez tous les décors disponibles pour nos produits: codes, visuels et collections.'
}

async function getAllFinishes(): Promise<Finish[]> {
  try {
    const decors = await getAllDecors()
    return decors.map(decor => ({
      _id: decor._id,
      code: decor.code,
      name: decor.name,
      image: decor.image,
      image_url: decor.image_url,
      color: decor.color,
      colors: decor.colors,
      abet_order: decor.abet_order,
      products: decor.products,
      keywords: decor.keywords,
      interior: decor.interior,
      exterior: decor.exterior,
      available: decor.available,
      is_new: decor.is_new,
      featured: decor.featured
    }))
  } catch (error) {
    console.error('Error fetching decors:', error)
    return []
  }
}

export default async function DecorsPage() {
  const finishes = await getAllFinishes()
  const availableFinishes = finishes.filter(f => f.available !== false)

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
            <span className="h-[1px] w-8 bg-black/20" /> Tous les décors
          </div>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-black mb-2">Décors disponibles</h1>
          <p className="text-black/70 max-w-2xl">Parcourez l'ensemble des décors: marbres, bois, bétons, unis… Cliquez sur un décor pour l'agrandir.</p>

          <div className="mt-10">
            <DecorsWithFilters finishes={finishes} />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
