'use client'

import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { getDecorById } from '@/services/sanity/decors'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type ProductAssociation = {
  _key?: string
  formats?: string[]
  epaisseurs?: string[]
  finishes?: string[]
  product: {
    _id: string
    _type: string
    title?: string
    name?: string
    productId?: string
    slug?: { current: string }
  }
}

type Decor = {
  _id: string
  external_code: string
  loxen_code?: string
  name: string
  image?: any
  image_url?: string
  colors?: string[]
  external_order?: number
  products?: ProductAssociation[]
  interior?: boolean
  exterior?: boolean
}

interface DecorDetailModalProps {
  finish: Decor | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function toStringArray(val: unknown): string[] {
  if (Array.isArray(val)) return val.filter((v): v is string => typeof v === 'string')
  if (typeof val === 'string' && val.trim()) return val.split(/\s*[-–,]\s*/).filter(Boolean)
  return []
}

export function DecorDetailModal({ finish, open, onOpenChange }: DecorDetailModalProps) {
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0)
  const [freshDecor, setFreshDecor] = useState<Decor | null>(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [imgError, setImgError] = useState(false)

  const [selectedFormats, setSelectedFormats] = useState<string[]>([])
  const [selectedEpaisseurs, setSelectedEpaisseurs] = useState<string[]>([])
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  })

  // Fetch fresh decor data when modal opens
  useEffect(() => {
    if (!open || !finish?._id) {
      setFreshDecor(null)
      setSelectedProductIndex(0)
      setShowForm(false)
      setSubmitted(false)
      setImgError(false)
      setSelectedFormats([])
      setSelectedEpaisseurs([])
      setSelectedFinishes([])
      setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' })
      return
    }

    setLoading(true)
    getDecorById(finish._id)
      .then((data: Decor | null) => {
        setFreshDecor(data)
        setLoading(false)
      })
      .catch(() => {
        setFreshDecor(null)
        setLoading(false)
      })
  }, [open, finish?._id])

  const decor = freshDecor || finish
  const validProducts = (decor?.products ?? []).filter((p) => p.product?._id)
  const selectedAssociation = validProducts[selectedProductIndex] || null

  const displayFormats = toStringArray(selectedAssociation?.formats)
  const displayThicknesses = toStringArray(selectedAssociation?.epaisseurs)
  const displayFinishes = toStringArray(selectedAssociation?.finishes)

  const displayCode = decor?.loxen_code || decor?.external_code || ''

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggleSelection = (
    value: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: wire to API
    console.log('Decor request:', { decor: displayCode, name: decor?.name, selectedFormats, selectedEpaisseurs, selectedFinishes, ...formData })
    setSubmitted(true)
  }

  return (
    <Dialog open={open && !!finish} onOpenChange={onOpenChange}>
      <DialogContent
        className="!max-w-none !w-[90vw] md:!w-[60vw] p-0 !top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] overflow-hidden !gap-0"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {decor && (
          <div className="grid md:grid-cols-2 gap-0 overflow-hidden max-h-[90vh]">
            {/* Image Section — always visible */}
            <div className="relative aspect-[4/5] md:aspect-auto bg-gray-50 flex-shrink-0 border-r border-black/10">
              {decor.image && !imgError ? (
                <Image
                  src={urlFor(decor.image).width(800).height(1000).quality(90).url()}
                  alt={decor.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                  onError={() => setImgError(true)}
                />
              ) : decor.image_url ? (
                <Image
                  src={decor.image_url}
                  alt={decor.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                />
              ) : (
                <div className="w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none bg-gray-200" />
              )}
              {(decor.interior || decor.exterior) && (
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {decor.interior && (
                    <span className="bg-white/90 text-black text-xs px-2 py-1 uppercase rounded">Intérieur</span>
                  )}
                  {decor.exterior && (
                    <span className="bg-white/90 text-black text-xs px-2 py-1 uppercase rounded">Extérieur</span>
                  )}
                </div>
              )}
            </div>

            {/* Right panel — slides between details & form */}
            <div className="relative overflow-hidden max-h-[90vh] h-[90vh]">
              <div
                className="flex w-[200%] h-full transition-transform duration-300 ease-in-out"
                style={{ transform: showForm ? 'translateX(-50%)' : 'translateX(0)' }}
              >
                {/* Panel 1: Details */}
                <div className="w-1/2 flex-shrink-0 p-6 md:p-8 flex flex-col overflow-y-auto h-full overscroll-contain">
                  <DialogHeader className="text-left">
                    <DialogTitle className="text-2xl md:text-3xl font-light tracking-tight text-black mb-2">
                      {decor.name}
                    </DialogTitle>
                    <p className="text-sm text-black/60 uppercase tracking-wide">Code: {displayCode}</p>
                  </DialogHeader>

                  <div className="mt-6 space-y-6 flex-1">
                    {/* Colors */}
                    {decor.colors && decor.colors.length > 0 && (
                      <div>
                        <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-3">Couleurs</h3>
                        <div className="flex flex-wrap gap-2">
                          {decor.colors.map((color, idx) => (
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
                    {validProducts.length > 0 && (
                      <div>
                        <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-3">Produits associés</h3>
                        <div className="flex flex-wrap gap-2">
                          {validProducts.map((assoc, idx) => (
                            <button
                              key={assoc._key || idx}
                              onClick={() => setSelectedProductIndex(idx)}
                              className={`inline-block px-3 py-1.5 text-xs border rounded transition-all ${selectedProductIndex === idx
                                  ? 'border-black bg-black text-white'
                                  : 'border-black/20 text-black/70 hover:border-black/40 hover:bg-black/5'
                                }`}
                            >
                              {assoc.product.title || assoc.product.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Selected product specs */}
                    {loading && selectedAssociation && (
                      <div className="border-t border-black/10 pt-6">
                        <p className="text-sm text-black/50">Chargement...</p>
                      </div>
                    )}

                    {!loading && selectedAssociation && (displayFormats.length > 0 || displayThicknesses.length > 0 || displayFinishes.length > 0) && (
                      <div className="border-t border-black/10 pt-6 space-y-4">
                        {displayFormats.length > 0 && (
                          <div>
                            <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-2">Format des panneaux</h3>
                            <div className="flex flex-wrap gap-2">
                              {displayFormats.map((format, idx) => (
                                <span key={idx} className="inline-block px-3 py-1.5 text-xs border border-black/20 text-black/70 rounded">
                                  {format} mm
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {displayThicknesses.length > 0 && (
                          <div>
                            <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-2">Épaisseur</h3>
                            <div className="flex flex-wrap gap-2">
                              {displayThicknesses.map((t, idx) => (
                                <span key={idx} className="inline-block px-3 py-1.5 text-xs border border-black/20 text-black/70 rounded">
                                  {t} mm
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {displayFinishes.length > 0 && (
                          <div>
                            <h3 className="text-xs uppercase tracking-[0.18em] text-black/60 mb-2">Finitions</h3>
                            <div className="flex flex-wrap gap-2">
                              {displayFinishes.map((f, idx) => (
                                <span key={idx} className="inline-block px-3 py-1.5 text-xs border border-black/20 text-black/70 rounded capitalize">
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-black/10">
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full py-3 bg-black text-white text-sm uppercase tracking-[0.15em] rounded hover:bg-black/90 transition-colors"
                    >
                      Demander ce décor
                    </button>
                  </div>
                </div>

                {/* Panel 2: Request form */}
                <div className="w-1/2 flex-shrink-0 p-6 md:p-8 flex flex-col overflow-y-auto h-full overscroll-contain">
                  <button
                    onClick={() => { setShowForm(false); setSubmitted(false) }}
                    className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-black/60 hover:text-black transition-colors mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                  </button>

                  <DialogHeader className="text-left">
                    <DialogTitle className="text-xl md:text-2xl font-light tracking-tight text-black mb-1">
                      Demander ce décor
                    </DialogTitle>
                    <p className="text-sm text-black/60">
                      {decor.name} — {displayCode}
                    </p>
                  </DialogHeader>

                  {submitted ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                      <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-light text-black mb-2">Demande envoyée</h3>
                      <p className="text-sm text-black/60 max-w-xs">
                        Nous avons bien reçu votre demande et reviendrons vers vous rapidement.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5 flex-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-black/60 uppercase tracking-wide">Prénom</label>
                          <Input
                            type="text"
                            name="firstName"
                            placeholder="Votre prénom"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border-black/15 focus:border-black/40 rounded text-sm h-10"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-black/60 uppercase tracking-wide">Nom</label>
                          <Input
                            type="text"
                            name="lastName"
                            placeholder="Votre nom"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="border-black/15 focus:border-black/40 rounded text-sm h-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-black/60 uppercase tracking-wide">Email</label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="border-black/15 focus:border-black/40 rounded text-sm h-10"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-black/60 uppercase tracking-wide">Société <span className="normal-case text-black/40">(optionnel)</span></label>
                        <Input
                          type="text"
                          name="company"
                          placeholder="Nom de votre société"
                          value={formData.company}
                          onChange={handleChange}
                          className="border-black/15 focus:border-black/40 rounded text-sm h-10"
                        />
                      </div>

                      {/* Multi-select: Formats */}
                      {displayFormats.length > 0 && (
                        <div className="space-y-1.5">
                          <label className="text-xs text-black/60 uppercase tracking-wide">Formats souhaités</label>
                          <div className="flex flex-wrap gap-2">
                            {displayFormats.map((format) => (
                              <button
                                key={format}
                                type="button"
                                onClick={() => toggleSelection(format, selectedFormats, setSelectedFormats)}
                                className={`px-3 py-1.5 text-xs border rounded transition-all ${
                                  selectedFormats.includes(format)
                                    ? 'border-black bg-black text-white'
                                    : 'border-black/20 text-black/70 hover:border-black/40 hover:bg-black/5'
                                }`}
                              >
                                {format} mm
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Multi-select: Épaisseurs */}
                      {displayThicknesses.length > 0 && (
                        <div className="space-y-1.5">
                          <label className="text-xs text-black/60 uppercase tracking-wide">Épaisseurs souhaitées</label>
                          <div className="flex flex-wrap gap-2">
                            {displayThicknesses.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => toggleSelection(t, selectedEpaisseurs, setSelectedEpaisseurs)}
                                className={`px-3 py-1.5 text-xs border rounded transition-all ${
                                  selectedEpaisseurs.includes(t)
                                    ? 'border-black bg-black text-white'
                                    : 'border-black/20 text-black/70 hover:border-black/40 hover:bg-black/5'
                                }`}
                              >
                                {t} mm
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Multi-select: Finitions */}
                      {displayFinishes.length > 0 && (
                        <div className="space-y-1.5">
                          <label className="text-xs text-black/60 uppercase tracking-wide">Finitions souhaitées</label>
                          <div className="flex flex-wrap gap-2">
                            {displayFinishes.map((f) => (
                              <button
                                key={f}
                                type="button"
                                onClick={() => toggleSelection(f, selectedFinishes, setSelectedFinishes)}
                                className={`px-3 py-1.5 text-xs border rounded transition-all capitalize ${
                                  selectedFinishes.includes(f)
                                    ? 'border-black bg-black text-white'
                                    : 'border-black/20 text-black/70 hover:border-black/40 hover:bg-black/5'
                                }`}
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label className="text-xs text-black/60 uppercase tracking-wide">Message <span className="normal-case text-black/40">(optionnel)</span></label>
                        <Textarea
                          name="message"
                          placeholder="Précisions sur votre projet..."
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          className="border-black/15 focus:border-black/40 rounded text-sm resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-black text-white text-sm uppercase tracking-[0.15em] rounded hover:bg-black/90 transition-colors mt-2"
                      >
                        Envoyer la demande
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
