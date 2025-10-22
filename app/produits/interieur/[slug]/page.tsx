import { notFound } from 'next/navigation'
import { getInteriorProductBySlug } from '@/lib/sanity-queries'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { ProductDetailContent } from '@/components/products/product-detail-content'

async function getInteriorProduct(slug: string) {
    try {
        const product = await getInteriorProductBySlug(slug)

        // Add category information
        if (product) {
            product.category = {
                _id: "interior",
                name: "Intérieur",
                slug: { current: "interieur" }
            }
        }

        return product
    } catch (error) {
        console.error('Error fetching interior product:', error)
        return null
    }
}

export default async function InteriorProductPage({ params }: { params: { slug: string } }) {
    const product = await getInteriorProduct(params.slug)

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
}
