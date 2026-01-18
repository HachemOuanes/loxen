"use client"

import { urlFor } from '@/lib/sanity'

interface GridSectionProps {
  text: {
    title: string
    subtitle: string
    description: string
  }
  images: any[]
  title?: string
}

export function GridSection({ text, images, title }: GridSectionProps) {

  return (
    <section className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {title && (
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
            <span className="h-[1px] w-8 bg-black/20" /> {title}
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          {/* Top left: Text */}
          <div className="flex items-center px-4 md:px-6">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-black/70 font-light mb-2">
                {text.subtitle}
              </p>
              <h4 className="text-2xl md:text-3xl lg:text-4xl text-black tracking-tight leading-tight mb-4">
                {text.title}
              </h4>
              <p className="text-lg md:text-xl text-black/70 italic leading-relaxed">
                {text.description}
              </p>
            </div>
          </div>

          {/* Top right: Image */}
          {images[0] && (
            <div className="relative overflow-hidden h-[47.5vh]">
              <img
                src={urlFor(images[0]).quality(100).url()}
                alt="Detail 1"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {/* Bottom left: Image */}
          {images[1] && (
            <div className="relative overflow-hidden h-[47.5vh]">
              <img
                src={urlFor(images[1]).quality(100).url()}
                alt="Detail 2"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {/* Bottom right: Image */}
          {images[2] && (
            <div className="relative overflow-hidden h-[47.5vh]">
              <img
                src={urlFor(images[2]).quality(100).url()}
                alt="Detail 3"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

