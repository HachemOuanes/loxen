import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { ProductsPageContent } from "@/components/products/products-page-content"
import { getSiteSettings, getPageSEO, generateMetadata as createMetadata } from "@/lib/seo"
import type { Metadata } from 'next'

// Enable ISR - revalidate once per day (24 hours)
export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, pageSeo] = await Promise.all([
    getSiteSettings(),
    getPageSEO('products')
  ])

  return createMetadata(siteSettings, pageSeo)
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ProductsPageContent />
      <Footer />
    </main>
  )
}
