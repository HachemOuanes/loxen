"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { client, urlFor } from "@/lib/sanity"
import { ProductsSkeleton } from "@/components/home/skeletons/products-skeleton"

interface Product {
  _key?: string
  name: string
  description: string
  image: any
  order?: number
  link?: string
}

interface SectionContent {
  title: string
  description: string
  buttonText: string
}

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [sectionContent, setSectionContent] = useState<SectionContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products from unified section
        const productsQuery = `*[_type == "productsSection"][0]{
          title,
          description,
          products[]{
            _key,
            name,
            description,
            image,
            order,
            link
          },
          ctaText,
          showSection
        }`
        const sectionData = await client.fetch(productsQuery)

        if (sectionData?.products && sectionData?.showSection !== false) {
          setProducts(sectionData.products.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)))
        }

        setSectionContent({
          title: sectionData?.title || 'Produits',
          description: sectionData?.description || 'Une sélection de matériaux et systèmes de référence adaptés à chaque projet architectural.',
          buttonText: sectionData?.ctaText || 'Voir les catalogues produits'
        })
      } catch (error) {
        console.error('Error fetching products data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <ProductsSkeleton />
  }

  if (!products.length) return null

  return (
    <section id="produits" className="h-screen w-full overflow-hidden relative z-10 m-0 p-0 bg-white">
      <div className="h-full w-full flex flex-col">
        {/* Header Section */}
        <div className="pt-24 pb-8 px-6 sm:px-8 lg:px-12 flex-shrink-0">
          <div className="max-w-7xl mx-auto">
            {/* Section Indicator */}
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 mb-4">
              <span className="h-[1px] w-8 bg-black/30" /> Nos Produits
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-black mb-3 tracking-[-0.02em]">
              {sectionContent?.title || 'Produits Premium.'}
            </h1>

            {/* Sub-headline */}
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-black mb-6 tracking-[-0.02em]">
              {sectionContent?.description || 'Conçues avec soin + entièrement personnalisables.'}
            </h2>

            {/* Separator Line */}
            <div className="w-full h-px bg-black/20 mb-6"></div>

            {/* Product Navigation */}
            {products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <Link
                    key={product._key || index}
                    href={product.link || `/produits`}
                    className="group"
                  >
                    <div className="text-xs tracking-[0.18em] uppercase text-black/60 mb-2 font-light">
                      PRODUIT {index + 1}
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-light text-black group-hover:opacity-70 transition-opacity">
                        {product.name}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-black/60 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Images Grid */}
        {products.length > 0 && (
          <div className="flex-1 min-h-0 overflow-hidden relative">
            {/* Visual Separator Above Images */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center z-10 py-2">
              <div className="flex items-center gap-4 w-full max-w-2xl px-6">
                <div className="flex-1 h-px bg-black/10"></div>
                <div className="w-2 h-2 rounded-full bg-black/30"></div>
                <div className="flex-1 h-px bg-black/10"></div>
              </div>
            </div>
            <div className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
              {products.map((product, index) => (
                <Link
                  key={product._key || index}
                  href={product.link || `/produits`}
                  className="group relative overflow-hidden h-full"
                >
                  {product.image ? (
                    <img
                      src={urlFor(product.image).width(1200).height(1600).quality(90).url()}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100"></div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}