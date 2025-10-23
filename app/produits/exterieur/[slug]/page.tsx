import { notFound } from 'next/navigation'
import { getExteriorProductBySlug, getDecorsByProductType } from '@/services/sanity'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { ProductDetailContent } from '@/components/products/product-detail-content'

async function getExteriorProduct(slug: string) {
  try {
    const [product, decors] = await Promise.all([
      getExteriorProductBySlug(slug),
      getDecorsByProductType('exterior')
    ])

    // Add category information
    if (product) {
      product.category = {
        _id: "exterior",
        name: "Extérieur",
        slug: { current: "exterieur" }
      }
      
      // Add decors to product
      product.availableFinishes = decors.map((decor: any) => ({
        code: decor.code,
        name: decor.name,
        image: decor.image,
        color: decor.color
      }))
      
      product.totalFinishesCount = decors.length
    }

    return product
  } catch (error) {
    console.error('Error fetching exterior product:', error)
    return null
  }
}

export default async function ExteriorProductPage({ params }: { params: { slug: string } }) {
  const product = await getExteriorProduct(params.slug)
  
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
