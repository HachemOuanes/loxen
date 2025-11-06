import { Metadata } from 'next'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { CataloguesPageClient } from '@/components/catalogues/catalogues-page-client'
import { getAllCatalogues } from '@/services/sanity/catalogues'

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
    </main>
  )
}
