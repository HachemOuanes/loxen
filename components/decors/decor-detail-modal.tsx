'use client'

import { useState, useEffect } from 'react'
import { urlFor } from '@/lib/sanity'
import { getProductById } from '@/services/sanity/products'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type Decor = {
  _id: string
  external_code: string
  loxen_code?: string
  name: string
  image?: any
  image_url?: string
  collections?: string[]
  finishes?: string[]
  colors?: string[]
  external_order?: number
  products?: Array<{
    _id: string
    _type: string
    title?: string
    name?: string
    productId?: string
    slug?: { current: string }
  }>
  interior?: boolean
  exterior?: boolean
}

interface DecorDetailModalProps {
  finish: Decor | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

type ProductData = {
  _id: string
  name: string
  productId?: string
  slug?: { current: string }
  panelFormats?: string[]
  thickness?: string
}

export function DecorDetailModal({ finish, open, onOpenChange }: DecorDetailModalProps) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [productData, setProductData] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(false)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY
      const html = document.documentElement
      const body = document.body

      body.style.position = 'fixed'
      body.style.top = `-${scrollY}px`
      body.style.width = '100%'
      body.style.overflow = 'hidden'
      html.style.overflow = 'hidden'

      return () => {
        body.style.position = ''
        body.style.top = ''
        body.style.width = ''
        body.style.overflow = ''
        html.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [open])

  // Reset when modal closes or finish changes
  useEffect(() => {
    if (!open || !finish) {
      setSelectedProductId(null)
      setProductData(null)
      return
    }

    if (finish.products && finish.products.length > 0) {
      const firstProduct = finish.products[0]
      setSelectedProductId(firstProduct._id)
    }
  }, [open, finish])

  // Fetch product data when selection changes
  useEffect(() => {
    if (selectedProductId) {
      setLoading(true)
      getProductById(selectedProductId)
        .then((data: ProductData | null) => {
          if (data) {
            setProductData({
              _id: data._id,
              name: data.title || '',
              slug: data.slug,
              panelFormats: data.specificationSection?.format?.items || [],
              thickness: data.specificationSection?.epaisseur || ''
            })
          } else {
            setProductData(null)
          }
          setLoading(false)
        })
        .catch((error: Error) => {
          console.error('Error fetching product:', error)
          setProductData(null)
          setLoading(false)
        })
    }
  }, [selectedProductId])

  if (!finish) return null

  const displayCode = finish.loxen_code || finish.external_code

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!max-w-none !w-[60vw] sm:!w-[60vw] lg:!w-[60vw] p-0 !top-auto !bottom-4 !left-[50%] !translate-x-[-50%] !translate-y-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-0 overflow-hidden">
          {/* Image Section */}
          <div className="relative aspect-[4/5] md:aspect-auto bg-gray-50 flex-shrink-0 border-r border-black/10">
            {finish.image ? (
              <img
                src={urlFor(finish.image).width(800).height(1000).quality(90).url()}
                alt={finish.name}
                className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                onError={(e) => {
                  if (finish?.image_url) {
                    (e.target as HTMLImageElement).src = finish.image_url
                  }
                }}
              />
            ) : finish.image_url ? (
              <img
                src={finish.image_url}
                alt={finish.name}
                className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
              />
            ) : (
              <div className="w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none bg-gray-200" />
            )}
            {(finish.interior || finish.exterior) && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                {finish.interior && (
                  <span className="bg-white/90 text-black text-xs px-2 py-1 uppercase rounded">Intérieur</span>
                )}
                {finish.exterior && (
                  <span className="bg-white/90 text-black text-xs px-2 py-1 uppercase rounded">Extérieur</span>
                )}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 flex flex-col overflow-y-auto max-h-[80vh]">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl md:text-3xl font-light tracking-tight text-black mb-2">
                {finish.name}
              </DialogTitle>
              <p className="text-sm text-black/60 uppercase tracking-wide">Code: {displayCode}</p>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              {/* Collections */}
              {finish.collections && finish.collections.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-3">Collections</h3>
                  <div className="flex flex-wrap gap-2">
                    {finish.collections.map((collection, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1.5 text-xs border border-black/20 text-black/70 rounded"
                      >
                        {collection}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Finishes */}
              {finish.finishes && finish.finishes.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-3">Finitions</h3>
                  <div className="flex flex-wrap gap-2">
                    {finish.finishes.map((f, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1.5 text-xs border border-black/20 text-black/70 rounded capitalize"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {finish.colors && finish.colors.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-3">Couleurs</h3>
                  <div className="flex flex-wrap gap-2">
                    {finish.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1.5 text-xs border border-black/20 text-black/70 rounded capitalize"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {finish.products && finish.products.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-3">Produits associés</h3>
                  <div className="flex flex-wrap gap-2">
                    {finish.products.map((product, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleProductClick(product._id)}
                        className={`inline-block px-3 py-1.5 text-xs border rounded transition-all ${selectedProductId === product._id
                            ? 'border-black bg-black text-white'
                            : 'border-black/20 text-black/70 hover:border-black/40 hover:bg-black/5'
                          }`}
                      >
                        {product.title || product.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Details */}
              {selectedProductId && (
                <div className="border-t border-black/10 pt-6 space-y-4">
                  {loading ? (
                    <div className="text-sm text-black/50">Chargement...</div>
                  ) : productData ? (
                    <>
                      {/* Panel Formats */}
                      {productData.panelFormats && productData.panelFormats.length > 0 && (
                        <div>
                          <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-2">Format des panneaux</h3>
                          <div className="flex flex-wrap gap-2">
                            {productData.panelFormats.map((format, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-3 py-1.5 text-xs border border-black/20 text-black/70 rounded"
                              >
                                {format} mm
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Thickness */}
                      {productData.thickness && (
                        <div>
                          <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-2">Épaisseur</h3>
                          <p className="text-sm text-black/70">{productData.thickness}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-sm text-black/50">Aucune donnée disponible</div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
