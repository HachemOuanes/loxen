"use client"

import { urlFor } from '@/lib/sanity'

interface ApplicationItem {
  title: string
  subtitle: string
  description: string
  features: string[]
  image: any
}

interface ApplicationsSectionProps {
  title: string
  items: ApplicationItem[]
}

export function ApplicationsSection({ title, items }: ApplicationsSectionProps) {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
          <span className="h-[1px] w-8 bg-black/20" /> {title}
        </div>

        {items?.map((item: ApplicationItem, itemIndex: number) => {
          // Alternating pattern: even index = flex, odd index = flex-reverse
          const isFlexReverse = itemIndex % 2 === 1
          
          return (
            <div key={itemIndex} className={`flex flex-col md:flex-row gap-8 items-center ${itemIndex < items.length - 1 ? 'mb-12' : ''} ${isFlexReverse ? 'md:flex-row-reverse' : ''}`}>
              {/* Image section */}
              <div className="w-full md:w-1/2">
                <div className="js-reveal relative h-[50vh] md:h-[60vh] overflow-hidden border border-black/10">
                  <img 
                    src={item.image ? urlFor(item.image).width(800).height(600).quality(85).url() : '/placeholder.jpg'} 
                    alt={item.title} 
                    className="h-full w-full object-cover" 
                  />
                </div>
              </div>
              
              {/* Text section */}
              <div className="w-full md:w-1/2">
                <p className="js-reveal mb-2 text-xs uppercase tracking-[0.18em] text-black/60">{item.title}</p>
                <h3 className="js-reveal text-2xl md:text-3xl font-light tracking-tight text-black">{item.subtitle}</h3>
                <p className="js-reveal mt-4 text-black/70 leading-relaxed">{item.description}</p>
                <ul className="js-reveal mt-5 space-y-2 text-black/75">
                  {item.features?.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-black/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
