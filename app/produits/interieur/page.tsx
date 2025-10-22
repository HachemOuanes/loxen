import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { InteriorProductsContent } from '@/components/products/interior-products-content'

export default function InteriorProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <InteriorProductsContent />
      <Footer />
    </main>
  )
}