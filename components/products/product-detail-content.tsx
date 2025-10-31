'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity"
import { ProductSpecifications } from "./product-specifications"
import { RelatedProducts } from "./related-products"
import { ProductImageSections } from "./product-image-sections"
import { ProductTechDocs } from "./product-tech-docs"
import { type Decor } from "@/components/shared/decors-carousel"

interface Product {
    _id: string
    name: string
    slug: { current: string }
    description: string
    longDescription?: string
    image: any
    category: {
        _id: string
        name: string
        slug: { current: string }
        color?: string
    }
    characteristics?: string[]
    applications?: string[]
    panelFormats?: string[]
    thickness?: string
    technicalDocuments?: Array<{
        title: string
        file: any
        downloadText: string
    }>
    bimRequest?: boolean
    collectionName?: string
    features?: string[]
    specifications?: Array<{ label: string; value: string }>
    price?: string
    inStock?: boolean
    tags?: string[]
    imageSections?: Array<{
        _key?: string
        _type?: string
        title?: string
        subtitle?: string
        description?: string
        features?: string[]
        image?: any
        heroLeft?: { title?: string; subtitle?: string; description?: string }
        heroRight?: { title?: string; subtitle?: string; description?: string }
    }>
}

interface ProductDetailContentProps {
    product: Product
    decors?: Decor[]
}

export function ProductDetailContent({ product, decors = [] }: ProductDetailContentProps) {
    const [selectedFinish, setSelectedFinish] = useState<number>(0)
    const [expandedCharacteristics, setExpandedCharacteristics] = useState(true)
    const [expandedApplications, setExpandedApplications] = useState(true)
    
    // Filter and sort available decors
    const availableDecors = decors
        .filter(d => d != null && d?._id && d?.code && (d?.available !== false))
        .sort((a, b) => (a?.abet_order || 0) - (b?.abet_order || 0))

    return (
        <>
            {/* Hero Section */}
            <section className="pt-28 pb-12 px-4 bg-white">
                <div className="mx-auto max-w-7xl">
                    <div className="flex gap-4 ">
                        {/* Product Information */}
                        <div className="space-y-6 w-2/5">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    {product.category?.name && (
                                        <span className="text-sm text-gray-600 uppercase tracking-wider font-light">
                                            {product.category.name}
                                        </span>
                                    )}
                                    {!product.inStock && (
                                        <>
                                            {product.category?.name && <span className="text-sm text-gray-400">•</span>}
                                            <span className="text-sm text-gray-600 uppercase tracking-wider font-light">
                                                Sur commande
                                            </span>
                                        </>
                                    )}
                                </div>

                                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-black mb-4 tracking-[-0.02em]">
                                    {product.name}
                                </h1>

                                <div className="w-16 h-px bg-black/20 mb-6"></div>

                                <p className="text-base text-md text-gray-700 leading-relaxed font-light mb-6">
                                    {product.longDescription || product.description}
                                </p>

                                {product.price && (
                                    <div className="mb-6">
                                        <span className="text-lg font-light text-black">{product.price}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2">
                                {/* Caractéristiques - Collapsible Accordion */}
                                {product.characteristics && product.characteristics.length > 0 && (
                                    <div className="bg-white">
                                        <button
                                            onClick={() => setExpandedCharacteristics(!expandedCharacteristics)}
                                            className="w-full px-4 py-3 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <h3 className="text-sm font-medium text-black uppercase tracking-wide">
                                                Caractéristiques
                                            </h3>
                                        </button>

                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedCharacteristics ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                            <div className="p-4 space-y-2">
                                                {product.characteristics?.map((characteristic, index) => (
                                                    <div key={index} className="flex items-start gap-2 py-1 transition-colors duration-200">
                                                        <p className="text-[13px] text-gray-700 leading-relaxed">
                                                            {characteristic}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {product.applications && product.applications.length > 0 && (
                                    <div className="bg-white">
                                        <button
                                            onClick={() => setExpandedApplications(!expandedApplications)}
                                            className="w-full px-4 py-3 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <h3 className="text-sm font-medium text-black uppercase tracking-wide">
                                                Applications
                                            </h3>
                                        </button>

                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedApplications ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                            <div className="p-4 space-y-2">
                                                {product.applications?.map((application, index) => (
                                                    <div key={index} className="flex items-start gap-2 py-1 transition-colors duration-200">
                                                        <p className="text-[13px] text-gray-700 leading-relaxed">
                                                            {application}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Applications - Collapsible Accordion */}
                        </div>
                        <div className="space-y-8 flex w-3/5 ">
                            <div className="w-2/3 space-y-4 flex flex-col items-center">
                                <div className="border-2 border-gray-200">
                                    <img
                                        src={urlFor(product.image).width(800).height(1200).quality(90).url()}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-2 border-black/20 bg-transparent text-black hover:bg-black hover:text-white font-light tracking-wider text-sm uppercase transition-all duration-300 rounded-none px-12"
                                        onClick={() => (window.location.href = '/contact')}
                                    >
                                        Télécharger le catalogue
                                    </Button>
                                </div>
                            </div>

                            {/* CTA Buttons */}

                            {/* Quick Specs */}
                            {(product.panelFormats || product.thickness) && (
                                <div className="w-full space-y-6 bg-gray-50 p-4 h-fit">
                                    <div className="space-y-6">
                                        {product.panelFormats && (
                                            <div className="space-y-2">
                                                <div className="px-4 py-3 border-b border-gray-200">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-sm font-medium text-black uppercase tracking-wide">
                                                            Formats disponibles
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {product.panelFormats?.map((format, index) => (
                                                        <div key={index} className="px-3 text-left">
                                                            <span className="text-sm text-black font-medium">{format} mm</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {product.thickness && (
                                            <div className="space-y-2">
                                                <div className="px-4 py-3 border-b border-gray-200">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-sm font-medium text-black uppercase tracking-wide">
                                                            Épaisseur
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="px-3 text-left">
                                                    <span className="text-sm text-black font-medium">{product.thickness} mm</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {availableDecors.length > 0 && (
                                        <div className="mt-4">
                                            <div className="px-4 py-3 border-b border-gray-200">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-medium text-black uppercase tracking-wide">
                                                        Décors disponibles
                                                    </h3>
                                                    <span className="text-xs text-gray-500">
                                                        {availableDecors.length} décors
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-4 space-y-3">
                                                <div className="grid grid-cols-4 gap-3">
                                                    {availableDecors.slice(0, 4).map((decor, index) => (
                                                        <div key={decor?._id || decor?.code || index} className="group cursor-pointer" onClick={() => setSelectedFinish(index)}>
                                                            <div className={`rounded-t-2xl border transition-all duration-300 overflow-hidden relative ${selectedFinish === index
                                                                ? 'border-black shadow-sm'
                                                                : 'border-gray-200 hover:border-gray-400'
                                                                }`}>
                                                                <div className="relative rounded-t-2xl overflow-hidden">
                                                                    {decor?.image ? (
                                                                        <img
                                                                            src={urlFor(decor.image).width(80).height(120).quality(90).url()}
                                                                            alt={decor?.name || decor?.code || 'Decor'}
                                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-t-2xl"
                                                                            onError={(e) => {
                                                                                if (decor?.image_url) {
                                                                                    (e.target as HTMLImageElement).src = decor.image_url
                                                                                }
                                                                            }}
                                                                        />
                                                                    ) : decor?.image_url ? (
                                                                        <img
                                                                            src={decor.image_url}
                                                                            alt={decor?.name || decor?.code || 'Decor'}
                                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-t-2xl"
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            className="w-full h-full min-h-[120px] flex items-center justify-center rounded-t-2xl"
                                                                            style={{ backgroundColor: decor?.color || decor?.colors?.[0] || '#f0f0f0' }}
                                                                        >
                                                                            {decor?.code && (
                                                                                <span className="text-xs text-gray-500">{decor.code}</span>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    {decor?.is_new && (
                                                                        <div className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-1 uppercase tracking-wide rounded">
                                                                            Nouveau
                                                                        </div>
                                                                    )}
                                                                    {(decor?.interior || decor?.exterior) && (
                                                                        <div className="absolute bottom-2 left-2 flex gap-1">
                                                                            {decor?.interior && (
                                                                                <span className="bg-white/90 text-black text-[9px] px-1.5 py-0.5 uppercase rounded">Int</span>
                                                                            )}
                                                                            {decor?.exterior && (
                                                                                <span className="bg-white/90 text-black text-[9px] px-1.5 py-0.5 uppercase rounded">Ext</span>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="mt-2 text-center">
                                                                <p className="text-xs font-medium text-black">{decor?.code}</p>
                                                                <p className="text-xs text-gray-600 font-light truncate">{decor?.name}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {product.collectionName && (
                                                    <div className="bg-gray-50 mt-6 p-3 border border-gray-200">
                                                        <p className="text-xs text-gray-700 text-center">
                                                            Collection <span className="font-medium">{product.collectionName}</span>
                                                            {availableDecors.length > 0 && <span> • {availableDecors.length} décors</span>}
                                                            {" "}
                                                            <Link 
                                                                href="/decors" 
                                                                className="underline underline-offset-2 decoration-black/30 hover:decoration-black ml-1"
                                                            >
                                                                Voir tous
                                                            </Link>
                                                        </p>
                                                    </div>
                                                )}
                                                {!product.collectionName && availableDecors.length > 0 && (
                                                    <div className="bg-gray-50 mt-6 p-3 border border-gray-200">
                                                        <p className="text-xs text-gray-700 text-center">
                                                            <Link 
                                                                href="/decors" 
                                                                className="underline underline-offset-2 decoration-black/30 hover:decoration-black"
                                                            >
                                                                Voir tous les décors ({availableDecors.length}) →
                                                            </Link>
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Specifications */}
            <ProductSpecifications product={product} decors={decors} />

            {/* Image/text alternating sections (from CMS if available) */}
            <ProductImageSections sections={product.imageSections} />

            {/* Technical specifications and documents moved below images */}
            <ProductTechDocs product={product} />

            {/* Related Products */}
            <RelatedProducts
                currentProductId={product._id}
                categoryId={product.category?._id || 'default'}
                categoryName={product.category?.name || 'Produits'}
            />
        </>
    )
}