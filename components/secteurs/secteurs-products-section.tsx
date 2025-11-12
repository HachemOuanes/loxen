"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { getInteriorProducts, getExteriorProducts } from '@/services/sanity/products'

interface Product {
    _id: string
    name: string
    slug: {
        current: string
    }
    description: string
    image: any
    featured?: boolean
    _productType?: 'interior' | 'exterior'
    category?: {
        name: string
        slug: {
            current: string
        }
        color?: string
    }
}

interface SecteursProductsSectionProps {
  title?: string
  subtitle?: string
  description?: string
  products?: Product[]
}

export function SecteursProductsSection({
  title = "Produits",
  subtitle,
  description,
  products: productsFromProps
}: SecteursProductsSectionProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        // If products are provided via props, use them
        if (productsFromProps && productsFromProps.length > 0) {
          setProducts(productsFromProps)
          setLoading(false)
          return
        }

        // Otherwise, fetch products (fallback behavior)
        const [interiorProducts, exteriorProducts] = await Promise.all([
          getInteriorProducts().catch(() => []),
          getExteriorProducts().catch(() => [])
        ])

        // Add type marker to products
        const interiorWithType = (interiorProducts || []).map((p: Product) => ({ ...p, _productType: 'interior' as const }))
        const exteriorWithType = (exteriorProducts || []).map((p: Product) => ({ ...p, _productType: 'exterior' as const }))

        // Combine featured products first, then regular products
        const featuredInterior = interiorWithType.filter((p: Product & { _productType: 'interior' }) => p.featured).slice(0, 3)
        const featuredExterior = exteriorWithType.filter((p: Product & { _productType: 'exterior' }) => p.featured).slice(0, 3)
        
        const allProducts = [
          ...featuredInterior,
          ...featuredExterior,
          ...interiorWithType.filter((p: Product & { _productType: 'interior' }) => !p.featured).slice(0, 3 - featuredInterior.length),
          ...exteriorWithType.filter((p: Product & { _productType: 'exterior' }) => !p.featured).slice(0, 3 - featuredExterior.length)
        ].slice(0, 6)

        setProducts(allProducts as any)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [productsFromProps])

    if (loading) {
        return (
            <section className="relative bg-white py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
                        <div>
                            {/* {subtitle && (
                <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60 mb-2">
                  {subtitle}
                </p>
              )} */}
                            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-black leading-tight">
                                {title}
                            </h2>
                        </div>
                        {description && (
                            <div className="md:text-right">
                                <p className="text-base md:text-lg text-black/60 italic leading-relaxed max-w-[50ch] md:ml-auto">
                                    {description}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-100 h-[400px] animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (products.length === 0) {
        return null
    }

    return (
        <section className="relative bg-white py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-12 items-start">
                    {/* Left - Title */}
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-black leading-tight">
                            {title}
                        </h2>
                    </div>

                    {/* Right - Description */}
                    {description && (
                        <div className="md:text-right">
                            <p className="text-base md:text-lg text-black/60 italic leading-relaxed max-w-[50ch] md:ml-auto">
                                {description}
                            </p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => {
                        const productSlug = product.slug?.current || ''
                        const productType = product._productType === 'interior' ? 'interieur' : 'exterieur'
                        const href = `/produits/${productType}/${productSlug}`

                        return (
                            <Link
                                key={product._id}
                                href={href}
                                className="group bg-white border border-black/10 hover:border-black/20 transition-all duration-300 overflow-hidden"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    {product.image ? (
                                        <img
                                            src={urlFor(product.image).width(800).height(600).quality(85).url()}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100" />
                                    )}
                                </div>
                                <div className="p-6">
                                    {product.category && (
                                        <div className="mb-2">
                                            <span
                                                className="inline-block text-xs uppercase tracking-[0.1em] px-2 py-1"
                                                style={{
                                                    color: product.category.color || '#000',
                                                    borderColor: product.category.color || '#000',
                                                    borderWidth: '1px',
                                                }}
                                            >
                                                {product.category.name}
                                            </span>
                                        </div>
                                    )}
                                    <h3 className="text-xl md:text-2xl font-light tracking-tight text-black mb-2 group-hover:text-black/80 transition-colors">
                                        {product.name}
                                    </h3>
                                    {product.description && (
                                        <p className="text-sm text-black/60 leading-relaxed line-clamp-2">
                                            {product.description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/produits"
                        className="inline-block border border-black/20 px-5 py-2.5 text-sm tracking-[0.14em] uppercase hover:bg-black hover:text-white transition-colors duration-200"
                    >
                        Voir tous les produits
                    </Link>
                </div>
            </div>
        </section>
    )
}

