import { ProductsPageContent } from '@/components/produits/products-page-content'
import { Header } from '@/components/shared/header'
import { BottomBar } from '@/components/shared/bottom-bar'
import { Footer } from '@/components/shared/footer'
import { getDecorsByProductId, getRandomDecors } from '@/services/sanity/decors'
import { getProductBySlug } from '@/services/sanity/products'
import { notFound } from 'next/navigation'

// Revalidate every 60 seconds
export const revalidate = 10

export default async function ProductsPage({ params }: { params: { slug: string } }) {
  // Fetch product data
  const product = await getProductBySlug(params.slug)
  
  if (!product) {
    notFound()
  }

  // Fetch decors associated with this product
  // If no decors found for this product, fall back to random decors
  let decors = await getDecorsByProductId(product._id, 20).catch(() => [])
  
  // Fallback to random decors if no product-specific decors found
  if (decors.length === 0) {
    decors = await getRandomDecors(20).catch(() => [])
  }

  const shared = {
    finitionsDisponibles: {
      title: 'Décors disponibles',
      productSlug: product.slug?.current || 'random',
      decors: decors
    },
    contact: {
      link: '/#contact',
      cta: product.contactSection?.contactCta || ''
    }
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <ProductsPageContent product={product} shared={shared} />
      <Footer />
      <BottomBar />
    </main>
  )
}
