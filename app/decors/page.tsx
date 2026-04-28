import { Metadata } from 'next'
import { getAllDecors } from '@/services/sanity'
import { DecorsWithFilters } from '@/components/decors/decors-with-filters'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Décors disponibles',
  description: 'Découvrez tous les décors disponibles pour nos produits: codes, visuels et produits associés.'
}

export default async function DecorsPage() {
  let finishes = []
  try {
    finishes = await getAllDecors()
  } catch (error) {
    console.error('Error fetching decors:', error)
  }

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
