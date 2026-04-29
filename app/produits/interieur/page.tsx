import { Header } from '@/components/shared/header'
import { BottomBar } from '@/components/shared/bottom-bar'
import { Footer } from '@/components/shared/footer'
import { InteriorProductsContent } from '@/components/products/interior-products-content'
import { getApplicationsByType } from '@/services/sanity/applications'

// Revalidate every 60 seconds
export const revalidate = 60

export default async function InteriorProductsPage() {
  const applications = await getApplicationsByType('interieur').catch(() => [])

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <InteriorProductsContent applications={applications} />
      <Footer />
      <BottomBar />
    </main>
  )
}