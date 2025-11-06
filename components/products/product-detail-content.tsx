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
        file?: {
            asset?: {
                _id?: string
                url?: string
                originalFilename?: string
                size?: number
                mimeType?: string
            }
        }
        downloadText?: string
    }>
    bimRequest?: boolean
    collectionName?: string
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
    finishes?: Array<{
        name: string
        code: string
        image?: any
        image_url?: string
        color?: string
        order?: number
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
    
    // Filter and sort available finishes from product
    const availableFinishes = (product.finishes || [])
        .filter(f => f != null && f?.code)
        .sort((a, b) => (a?.order || 0) - (b?.order || 0))
    

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

                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedCharacteristics ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
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

                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedApplications ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
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
                                        {product.panelFormats && (() => {
                                            const formats = product.panelFormats
                                            const totalFormats = formats.length
                                            
                                            // If 3 or fewer, display in single column
                                            if (totalFormats <= 3) {
                                                return (
                                                    <div className="space-y-2">
                                                        <div className="px-4 py-3 border-b border-gray-200">
                                                            <div className="flex items-center justify-between">
                                                                <h3 className="text-sm font-medium text-black uppercase tracking-wide">
                                                                    Formats disponibles
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            {formats.map((format, index) => (
                                                                <div key={index} className="px-3 text-left">
                                                                    <span className="text-sm text-black font-medium">{format} mm</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            
                                            // If more than 3, split equally between left and right
                                            const leftCount = Math.ceil(totalFormats / 2)
                                            const rightCount = totalFormats - leftCount
                                            const leftFormats = formats.slice(0, leftCount)
                                            const rightFormats = formats.slice(leftCount)
                                            
                                            return (
                                                <div className="space-y-2">
                                                    <div className="px-4 py-3 border-b border-gray-200">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="text-sm font-medium text-black uppercase tracking-wide">
                                                                Formats disponibles
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {/* Left column */}
                                                        <div className="space-y-2">
                                                            {leftFormats.map((format, index) => (
                                                                <div key={index} className="px-3 text-left">
                                                                    <span className="text-sm text-black font-medium">{format} mm</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {/* Right column */}
                                                        <div className="space-y-2">
                                                            {rightFormats.map((format, index) => (
                                                                <div key={index + leftCount} className="px-3 text-left">
                                                                    <span className="text-sm text-black font-medium">{format} mm</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })()}

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
                                    {availableFinishes.length > 0 && (
                                        <div className="mt-4">
                                            <div className="px-4 py-3 border-b border-gray-200">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-medium text-black uppercase tracking-wide">
                                                        Finitions
                                                    </h3>
                                                    <span className="text-xs text-gray-500">
                                                        {availableFinishes.length} finitions
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-4 space-y-3">
                                                <div className="grid grid-cols-4 gap-3">
                                                    {availableFinishes.slice(0, 4).map((finish, index) => (
                                                        <div key={finish?.code || index} className="group cursor-pointer" onClick={() => setSelectedFinish(index)}>
                                                            <div className={`transition-all duration-300 relative ${selectedFinish === index ? 'shadow-sm' : ''}`}>
                                                                <div className={`relative rounded-2xl overflow-hidden border transition-all duration-300 ${selectedFinish === index ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}>
                                                                    {finish?.image ? (
                                                                        <img
                                                                            src={urlFor(finish.image).width(80).height(120).quality(90).url()}
                                                                            alt={finish?.name || finish?.code || 'Finish'}
                                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-2xl"
                                                                            onError={(e) => {
                                                                                if (finish?.image_url) {
                                                                                    (e.target as HTMLImageElement).src = finish.image_url
                                                                                }
                                                                            }}
                                                                        />
                                                                    ) : finish?.image_url ? (
                                                                        <img
                                                                            src={finish.image_url}
                                                                            alt={finish?.name || finish?.code || 'Finish'}
                                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-2xl"
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            className="w-full h-full min-h-[120px] flex items-center justify-center rounded-2xl"
                                                                            style={{ backgroundColor: finish?.color || '#f0f0f0' }}
                                                                        >
                                                                            {finish?.code && (
                                                                                <span className="text-xs text-gray-500">{finish.code}</span>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="mt-2 text-center">
                                                                <p className="text-xs font-medium text-black">{finish?.code}</p>
                                                                <p className="text-xs text-gray-600 font-light truncate">{finish?.name}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
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