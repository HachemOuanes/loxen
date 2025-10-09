import type { Metadata } from 'next'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { BathroomHPLSections } from '@/components/inspirations/bathroom-hpl-sections'
import { getSiteSettings, getPageSEO, generateMetadata as createMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, pageSeo] = await Promise.all([
    getSiteSettings(),
    getPageSEO('inspirations')
  ])
  return createMetadata(siteSettings, pageSeo, 'Inspirations – HPL Salle de Bain', 'Idées et réalisations en HPL pour des salles de bains fonctionnelles et élégantes.')
}

export default function InspirationsPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <BathroomHPLSections />
      <Footer />
    </main>
  )
}