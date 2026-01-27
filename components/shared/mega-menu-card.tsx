"use client"

import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

interface MegaMenuCardProps {
  image?: any
  title: string
  description?: string
  link: string
  aspectRatio?: '4/3' | '16/9' | '3/1'
  className?: string
}

export function MegaMenuCard({ 
  image, 
  title, 
  description, 
  link, 
  aspectRatio = '4/3',
  className = ''
}: MegaMenuCardProps) {
  const aspectClass = {
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    '3/1': 'aspect-[3/1]'
  }[aspectRatio]

  return (
    <Link 
      href={link}
      className={`group border border-white/10 bg-white/0 hover:bg-white/5 transition-colors p-3 flex flex-col h-40 ${className}`}
    >
      <div className={`${aspectClass} overflow-hidden border border-white/10 flex-1`}>
        {image ? (
          <img
            src={urlFor(image).width(480).height(500).quality(80).url()}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-white/5" />
        )}
      </div>
      <div className="mt-3">
        <div className="text-base text-white leading-tight">{title}</div>
        {description && (
          <div className="text-sm text-white/60 mt-1.5 line-clamp-1">{description}</div>
        )}
      </div>
    </Link>
  )
}
