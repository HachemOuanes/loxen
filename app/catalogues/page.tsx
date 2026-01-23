import { Metadata } from 'next'
import { Header } from '@/components/shared/header'
import { BottomBar } from '@/components/shared/bottom-bar'
import { Footer } from '@/components/shared/footer'
import { CataloguesPageClient } from '@/components/catalogues/catalogues-page-client'
import { getAllCatalogues } from '@/services/sanity/catalogues'

// Revalidate every 10 seconds
export const revalidate = 10

export const metadata: Metadata = {
  title: 'Catalogues',
  description: 'Consultez nos catalogues produits et documentations techniques.'
}

export default async function CataloguesPage() {
  const catalogues = await getAllCatalogues()

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <CataloguesPageClient catalogues={catalogues} />
      <Footer />
      <BottomBar />
    </main>
  )
}
