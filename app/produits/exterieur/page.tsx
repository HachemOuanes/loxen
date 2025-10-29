import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { ExteriorProductsContent } from '@/components/products/exterior-products-content'

// Revalidate every 60 seconds
export const revalidate = 60

export default function ExteriorProductsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <ExteriorProductsContent />
            <Footer />
        </main>
    )
}