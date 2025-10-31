import { notFound } from 'next/navigation'
import { getExteriorProductBySlug, getAllDecors } from '@/services/sanity'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { ProductDetailContent } from '@/components/products/product-detail-content'

// Revalidate every 10 seconds
export const revalidate = 10

export default async function ExteriorProductPage({ params }: { params: { slug: string } }) {
  try {
    const [product, decors] = await Promise.all([
      getExteriorProductBySlug(params.slug),
      getAllDecors()
    ])
    
    if (!product) {
      return notFound()
    }

    return (
      <main className="min-h-screen bg-white">
        <Header />
        <ProductDetailContent product={product} decors={decors} />
        <Footer />
      </main>
    )
  } catch (error) {
    console.error('Error fetching exterior product:', error)
    return notFound()
  }
}
