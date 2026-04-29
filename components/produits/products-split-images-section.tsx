"use client"

import Image from 'next/image'

interface ImageWithText {
  leftImage?: string
  leftImageAlt?: string
  rightImage?: string
  rightImageAlt?: string
  leftText?: {
    title?: string
    subtitle?: string
    description?: string
  }
  rightText?: {
    title?: string
    subtitle?: string
    description?: string
  }
}

interface ProductsSplitImagesSectionProps {
  images: ImageWithText[]
  title?: string
}

export function ProductsSplitImagesSection({ images, title }: ProductsSplitImagesSectionProps) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <section className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {title && (
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/70 font-light mb-6">
            <span className="h-[1px] w-8 bg-black/30" /> {title}
          </div>
        )}
        <div className="space-y-8 md:space-y-12">
          {images.map((item, index) => (
            <div key={index} className="space-y-8 md:space-y-12">
              {/* Left and Right Images */}
              {(item.leftImage || item.rightImage) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Image */}
                  {item.leftImage && (
                    <div className="relative overflow-hidden h-[95vh] group">
                      <Image
                        src={item.leftImage}
                        alt={item.leftImageAlt || `Left image ${index + 1}`}
                        width={800}
                        height={600}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  )}

                  {/* Right Image */}
                  {item.rightImage && (
                    <div className="relative overflow-hidden h-[95vh] group">
                      <Image
                        src={item.rightImage}
                        alt={item.rightImageAlt || `Right image ${index + 1}`}
                        width={800}
                        height={600}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Optional Left and Right Text */}
              {(item.leftText || item.rightText) && (
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Text */}
                  {item.leftText && (
                    <div className="js-reveal px-4 md:px-6 text-left max-w-[50ch]">
                      {item.leftText.subtitle && (
                        <p className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">
                          {item.leftText.subtitle}
                        </p>
                      )}
                      {item.leftText.title && (
                        <h4 className="mt-2 text-2xl md:text-3xl lg:text-4xl text-black tracking-tight leading-tight">
                          {item.leftText.title}
                        </h4>
                      )}
                      {item.leftText.description && (
                        <p className="mt-2 text-lg md:text-xl text-black/70 italic leading-relaxed">
                          {item.leftText.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Right Text */}
                  {item.rightText && (
                    <div className="js-reveal px-4 md:px-6 text-right max-w-[50ch] ml-auto">
                      {item.rightText.subtitle && (
                        <p className="text-xs tracking-[0.18em] uppercase text-black/70 font-light">
                          {item.rightText.subtitle}
                        </p>
                      )}
                      {item.rightText.title && (
                        <h4 className="mt-2 text-2xl md:text-3xl lg:text-4xl text-black tracking-tight leading-tight">
                          {item.rightText.title}
                        </h4>
                      )}
                      {item.rightText.description && (
                        <p className="mt-2 text-lg md:text-xl text-black/70 italic leading-relaxed">
                          {item.rightText.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
