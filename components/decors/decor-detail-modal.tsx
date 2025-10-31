'use client'

import { urlFor } from '@/lib/sanity'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type Finish = {
  _id: string
  code: string
  name: string
  image?: any
  image_url?: string
  color?: string
  colors?: string[]
  abet_order?: number
  collection_names?: Array<{ code: string; name: string }>
  collections?: string[]
  surfaces?: string[]
  finishes?: string[]
  option_classes?: string[]
  keywords?: string[]
  interior?: boolean
  exterior?: boolean
  available?: boolean
  is_new?: boolean
  featured?: boolean
}

interface DecorDetailModalProps {
  finish: Finish | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DecorDetailModal({ finish, open, onOpenChange }: DecorDetailModalProps) {
  if (!finish) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-none !w-[60vw] sm:!w-[60vw] lg:!w-[60vw] max-h-[90vh] overflow-y-auto p-0 !top-auto !bottom-4 !left-[50%] !translate-x-[-50%] !translate-y-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full bg-gray-50">
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
              <div 
                className="w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                style={{ backgroundColor: finish.color || finish.colors?.[0] || '#e5e7eb' }}
              />
            )}
            {finish.is_new && (
              <div className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1.5 uppercase tracking-wide rounded">
                Nouveau
              </div>
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
          <div className="p-6 md:p-8 flex flex-col">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl md:text-3xl font-light tracking-tight text-black mb-2">
                {finish.name}
              </DialogTitle>
              <p className="text-sm text-black/60 uppercase tracking-wide">Code: {finish.code}</p>
            </DialogHeader>

            <div className="mt-6 space-y-6 flex-1">
              {/* Collections */}
              {finish.collection_names && finish.collection_names.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-3">Collections</h3>
                  <div className="flex flex-wrap gap-2">
                    {finish.collection_names.map((collection, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1.5 text-xs border border-black/20 text-black/70 rounded"
                      >
                        {collection.name}
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
                        className="inline-block px-3 py-1.5 text-xs border border-black/20 text-black/70 capitalize rounded"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Usage */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-3">Usage</h3>
                <div className="flex gap-2">
                  {finish.interior && (
                    <span className="px-3 py-1.5 text-xs border border-black/20 text-black/70 rounded">
                      Intérieur
                    </span>
                  )}
                  {finish.exterior && (
                    <span className="px-3 py-1.5 text-xs border border-black/20 text-black/70 rounded">
                      Extérieur
                    </span>
                  )}
                  {!finish.interior && !finish.exterior && (
                    <span className="text-xs text-black/50">Non spécifié</span>
                  )}
                </div>
              </div>

              {/* Surfaces */}
              {finish.surfaces && finish.surfaces.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-3">Surfaces</h3>
                  <p className="text-sm text-black/70">{finish.surfaces.join(', ')}</p>
                </div>
              )}

              {/* Finishes */}
              {finish.finishes && finish.finishes.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-3">Finitures</h3>
                  <p className="text-sm text-black/70">{finish.finishes.join(', ')}</p>
                </div>
              )}

              {/* Keywords */}
              {finish.keywords && finish.keywords.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-3">Mots-clés</h3>
                  <div className="flex flex-wrap gap-2">
                    {finish.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1.5 text-xs border border-black/20 text-black/70 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-3">Disponibilité</h3>
                <p className={`text-sm ${finish.available !== false ? 'text-black' : 'text-black/50'}`}>
                  {finish.available !== false ? 'Disponible' : 'Non disponible'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

