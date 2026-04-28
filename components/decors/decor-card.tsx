'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

type Decor = {
  _id: string
  external_code: string
  loxen_code?: string
  name: string
  image?: any
  image_url?: string
  colors?: string[]
  external_order?: number
  products?: Array<{
    _key?: string
    product: {
      _id: string
      _type: string
      title?: string
      name?: string
      productId?: string
      slug?: { current: string }
    }
  }>
  interior?: boolean
  exterior?: boolean
}

interface DecorCardProps {
  finish: Decor
  onClick?: () => void
}

export function DecorCard({ finish, onClick }: DecorCardProps) {
  const [imgError, setImgError] = useState(false)
  const displayCode = finish.loxen_code || finish.external_code
  const validProducts = (finish.products ?? []).filter(p => p.product?._id)

  return (
    <article
      key={finish.external_code + finish.name}
      className="group border border-black/10 bg-white overflow-hidden rounded-t-2xl cursor-pointer hover:border-black/30 transition-colors"
      onClick={onClick}
    >
      <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative rounded-2xl">
        {finish.image && !imgError ? (
          <Image
            src={urlFor(finish.image).width(480).height(600).quality(85).url()}
            alt={finish.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-all duration-500 group-hover:brightness-105 rounded-2xl"
            onError={() => setImgError(true)}
          />
        ) : finish.image_url ? (
          <Image
            src={finish.image_url}
            alt={finish.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-all duration-500 group-hover:brightness-105 rounded-2xl"
          />
        ) : (
          <div className="h-full w-full rounded-2xl bg-gray-200" />
        )}
        {(finish.interior || finish.exterior) && (
          <div className="absolute bottom-2 left-2 flex gap-1">
            {finish.interior && (
              <span className="bg-white/90 text-black text-[9px] px-1.5 py-0.5 uppercase rounded">Int</span>
            )}
            {finish.exterior && (
              <span className="bg-white/90 text-black text-[9px] px-1.5 py-0.5 uppercase rounded">Ext</span>
            )}
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs font-medium text-black">{displayCode}</p>
        <p className="text-xs text-black/70 truncate">{finish.name}</p>
        {validProducts.length > 0 && (
          <p className="mt-1 text-[11px] text-black/50 truncate">
            {validProducts.slice(0, 2).map(p => p.product.title || p.product.name).join(', ')}
            {validProducts.length > 2 && ` +${validProducts.length - 2}`}
          </p>
        )}
        {finish.colors && finish.colors.length > 0 && (
          <p className="mt-1 text-[10px] text-black/40 uppercase">
            {finish.colors.join(', ')}
          </p>
        )}
      </div>
    </article>
  )
}
