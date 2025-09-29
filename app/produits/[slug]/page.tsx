import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { ProductDetailContent } from "@/components/products/product-detail-content"
import { getSiteSettings, getPageSEO, generateMetadata as createMetadata } from "@/lib/seo"
import { client } from "@/lib/sanity"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'

// Enable ISR - revalidate once per day (24 hours)
export const revalidate = 86400

// Generate static params for all products
export async function generateStaticParams() {
  const products = await client.fetch(
    `*[_type == "productItem" && defined(slug.current)][0...100] {
      "slug": slug.current
    }`
  )

  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }))
}

// Generate metadata for each product
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await client.fetch(
    `*[_type == "productItem" && slug.current == $slug][0] {
      name,
      description,
      image,
      category->{name}
    }`,
    { slug: params.slug }
  )

  if (!product) {
    return {
      title: 'Produit non trouvé - Loxen',
      description: 'Ce produit n\'existe pas ou n\'est plus disponible.',
    }
  }

  const [siteSettings] = await Promise.all([
    getSiteSettings(),
  ])

  return createMetadata(siteSettings, {
    title: `${product.name} - ${product.category?.name || 'Produits'} - Loxen`,
    description: product.description || `Découvrez ${product.name}, solution architecturale professionnelle proposée par Loxen.`,
    ogImage: product.image || undefined,
    keywords: [
      product.name,
      product.category?.name || '',
      'architecture',
      'façade',
      'bardage',
      'matériaux',
      'construction',
      'loxen'
    ].filter(Boolean),
  })
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await client.fetch(
    `*[_type == "productItem" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      description,
      longDescription,
      image,
      gallery,
      category->{
        _id,
        name,
        slug,
        color
      },
      characteristics,
      applications,
      panelFormats,
      thickness,
      technicalDocuments,
      bimRequest,
      availableFinishes,
      totalFinishesCount,
      collectionName,
      features,
      specifications,
      price,
      inStock,
      tags
    }`,
    { slug: params.slug }
  )

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ProductDetailContent product={product} />
      <Footer />
    </main>
  )
}