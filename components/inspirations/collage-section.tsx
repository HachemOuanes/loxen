"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ImageAlbum } from '@/components/shared/image-album'

interface CollageTile {
  title: string
  subtitle: string
  description: string
}

interface CollageSectionProps {
  images: Array<{ images: any[] }>
  tiles: CollageTile[]
  title?: string
}

export function CollageSection({ images, tiles, title }: CollageSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Parallax zoom effects removed - keeping hover zoom only
  return (
    <section ref={sectionRef} className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {title && (
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
            <span className="h-[1px] w-8 bg-black/20" /> {title}
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          {/* Top row: two parallax images */}
          {images?.map((album: any, imageIndex: number) => (
            <div key={imageIndex} className="js-parallax relative overflow-hidden h-[95vh]" data-speed={imageIndex === 0 ? "0.35" : "0.2"}>
              <ImageAlbum images={album?.images || []} alt={`Détail ${title || ''}`} className="h-full w-full" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 py-8 md:py-12">
          {/* Bottom row: two text tiles with contrasting styles */}
          {tiles?.map((tile: CollageTile, tileIndex: number) => (
            <div key={tileIndex} className={`js-reveal px-4 md:px-6 ${tileIndex === 0 ? 'text-left max-w-[50ch]' : 'relative overflow-hidden flex items-center justify-end bg-white'}`}>
              {tileIndex === 0 ? (
                <>
                  <p className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">{tile.subtitle}</p>
                  <h4 className="mt-2 text-2xl md:text-3xl lg:text-4xl text-black tracking-tight leading-tight">{tile.title}</h4>
                  <p className="mt-2 text-lg md:text-xl text-black/70 italic leading-relaxed">{tile.description}</p>
                </>
              ) : (
                <div className="js-reveal px-4 md:px-6 text-right max-w-[50ch] ml-auto">
                  <p className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">{tile.subtitle}</p>
                  <h4 className="mt-2 text-2xl md:text-3xl lg:text-4xl text-black tracking-tight leading-tight">{tile.title}</h4>
                  <p className="mt-2 text-lg md:text-xl text-black/70 italic leading-relaxed">{tile.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
