import { notFound } from 'next/navigation'
import { getInteriorProductBySlug } from '@/services/sanity'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { ProductDetailContent } from '@/components/products/product-detail-content'

// Revalidate every 10 seconds
export const revalidate = 10

export default async function InteriorProductPage({ params }: { params: { slug: string } }) {
    try {
        const product = await getInteriorProductBySlug(params.slug)

        if (!product) {
            return notFound()
        }

        return (
            <main className="min-h-screen bg-white">
                <Header />
                <ProductDetailContent product={product} />
                <Footer />
            </main>
        )
    } catch (error) {
        console.error('Error fetching interior product:', error)
        return notFound()
    }
}
