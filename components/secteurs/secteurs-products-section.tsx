"use client"

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity'

interface Product {
    _id: string
    name: string
    slug: {
        current: string
    }
    description: string
    image: any
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
  description?: string
  products?: Product[]
}

export function SecteursProductsSection({
  title = "Produits",
  description,
  products: products = []
}: SecteursProductsSectionProps) {
    // Don't render section if no products
    if (!products || products.length === 0) {
        return null
    }

    return (
        <section className="relative bg-white py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Header Section - Title on left, Description on right */}
                {(title || description) && (
                    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-end">
                        {title && (
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black tracking-[-0.02em] leading-tight">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <div className="md:text-right">
                                <p className="text-lg md:text-xl text-black/70 leading-relaxed max-w-[50ch] md:ml-auto">
                                    {description}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Products Grid - Full Width */}
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => {
                                    const productSlug = product.slug?.current || ''
                                    const productType = product._productType === 'interior' ? 'interieur' : 'exterieur'
                                    const href = `/produits/${productType}/${productSlug}`

                                    return (
                                        <Link
                                            key={product._id}
                                            href={href}
                                            className="group block"
                                        >
                                            {/* Product Card */}
                                            <div className="flex flex-col h-full">
                                                {/* Image Section - Reduced height */}
                                                <div className="relative overflow-hidden aspect-[4/3] mb-4">
                                                    {product.image ? (
                                                        <>
                                                                <img
                                                                src={urlFor(product.image).width(800).height(600).quality(90).url()}
                                                                alt={product.name}
                                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                            />

                                                            {/* Border highlight on hover */}
                                                            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none z-20"></div>

                                                            {/* Shine effect on hover */}
                                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-100"></div>
                                                    )}
                                                </div>

                                                {/* Content Section */}
                                                <div className="flex flex-col">
                                                    {/* Title */}
                                                    <h3 className="text-lg md:text-xl text-black mb-2 group-hover:opacity-70 transition-opacity">
                                                        {product.name}
                                                    </h3>

                                                    {/* Description */}
                                                    {product.description && (
                                                        <div className="text-base text-black/70 mb-4 leading-relaxed line-clamp-2">
                                                            {product.description}
                                                        </div>
                                                    )}

                                                    {/* Discover Link */}
                                                    <div className="flex items-center gap-2 text-black/70 group-hover:text-black transition-colors mt-auto">
                                                        <span className="text-sm tracking-wider uppercase hover:underline">Découvrir</span>
                                                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-all" strokeWidth={1.5} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                    </div>
                </div>
            </div>
        </section>
    )
}

