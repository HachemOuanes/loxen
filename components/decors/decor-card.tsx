'use client'

import { urlFor } from '@/lib/sanity'

type Finish = {
  _id: string
  code: string
  name: string
  image?: any
  image_url?: string
  color?: string
  colors?: string[]
  abet_order?: number
  products?: Array<{
    _id: string
    _type: string
    name: string
    productId?: string
    slug?: { current: string }
  }>
  keywords?: string[]
  interior?: boolean
  exterior?: boolean
  available?: boolean
  is_new?: boolean
  featured?: boolean
}

interface DecorCardProps {
  finish: Finish
  onClick?: () => void
}

export function DecorCard({ finish, onClick }: DecorCardProps) {
  return (
    <article 
      key={finish.code + finish.name} 
      className="group border border-black/10 bg-white overflow-hidden rounded-t-2xl cursor-pointer hover:border-black/30 transition-colors"
      onClick={onClick}
    >
      <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative rounded-2xl">
        {finish.image ? (
          <img
            src={urlFor(finish.image).width(480).height(600).quality(85).url()}
            alt={finish.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
            loading="lazy"
            decoding="async"
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
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="h-full w-full rounded-2xl" style={{ backgroundColor: finish.color || finish.colors?.[0] || '#e5e7eb' }} />
        )}
        {finish.is_new && (
          <div className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-1 uppercase tracking-wide rounded">
            Nouveau
          </div>
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
        <p className="text-xs font-medium text-black">{finish.code}</p>
        <p className="text-xs text-black/70 truncate">{finish.name}</p>
        {finish.products && finish.products.length > 0 && (
          <p className="mt-1 text-[11px] text-black/50 truncate">
            {finish.products.slice(0, 2).map(p => p.name).join(', ')}
            {finish.products.length > 2 && ` +${finish.products.length - 2}`}
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

