"use client"

import { urlFor } from '@/lib/sanity'
import { useEffect, useRef, useState } from 'react'

interface ApplicationItem {
  title: string
  subtitle: string
  description: string
  features: string[]
  image: any
}

interface ApplicationsSectionProps {
  title?: string
  items: ApplicationItem[]
}

export function ApplicationsSection({ title, items }: ApplicationsSectionProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [itemMargins, setItemMargins] = useState<number[]>([])
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Check if desktop
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    checkDesktop()
    
    // Calculate margins for continuous flow
    const calculateMargins = () => {
      // Only calculate on desktop (md and up)
      if (window.innerWidth < 768) {
        setItemMargins([])
        return
      }

      const margins: number[] = [0] // First item has no margin
      
      // Calculate margins for subsequent items
      // We need to find elements in both columns to calculate where next item should start
      const container = itemRefs.current[0]?.parentElement?.parentElement
      if (!container) {
        setItemMargins([])
        return
      }
      
      for (let i = 1; i < items.length; i++) {
        const prevIndex = i - 1
        const isPrevEven = prevIndex % 2 === 0
        
        // Find previous item's elements in the DOM
        // Previous item: if even, image left + text right; if odd, text left + image right
        const prevImageSelector = isPrevEven ? `[data-item-index="${prevIndex}"][data-type="image"]` : `[data-item-index="${prevIndex}"][data-type="image"]`
        const prevTextSelector = isPrevEven ? `[data-item-index="${prevIndex}"][data-type="text"]` : `[data-item-index="${prevIndex}"][data-type="text"]`
        
        const prevImageEl = container.querySelector(prevImageSelector) as HTMLElement
        const prevTextEl = container.querySelector(prevTextSelector) as HTMLElement
        
        if (prevImageEl && prevTextEl) {
          const containerRect = container.getBoundingClientRect()
          const imageBottom = prevImageEl.getBoundingClientRect().bottom - containerRect.top
          const textBottom = prevTextEl.getBoundingClientRect().bottom - containerRect.top
          
          // Next item starts where the previous item's opposite element ends
          // For even prev: image left, text right -> next (odd) starts where text ends
          // For odd prev: text left, image right -> next (even) starts where image ends
          const prevBottom = isPrevEven ? textBottom : imageBottom
          
          // Find current item's position
          const currentItem = itemRefs.current[i]
          if (currentItem) {
            const currentTop = currentItem.getBoundingClientRect().top - containerRect.top
            const marginTop = prevBottom - currentTop + 32 // 32px gap
            margins.push(Math.max(0, marginTop))
          } else {
            margins.push(0)
          }
        } else {
          margins.push(0)
        }
      }
      
      setItemMargins(margins)
    }

    // Calculate on mount and resize
    const handleResize = () => {
      checkDesktop()
      setTimeout(calculateMargins, 100)
    }
    
    const timeoutId = setTimeout(() => {
      calculateMargins()
    }, 200) // Delay to ensure DOM is ready
    
    window.addEventListener('resize', handleResize)
    
    // Use ResizeObserver for more accurate tracking
    const observers: ResizeObserver[] = []
    itemRefs.current.forEach((ref) => {
      if (ref) {
        const observer = new ResizeObserver(() => {
          setTimeout(calculateMargins, 50)
        })
        observer.observe(ref)
        observers.push(observer)
      }
    })

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
      observers.forEach(observer => observer.disconnect())
    }
  }, [items])

  return (
    <section className="relative bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {title && (
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-6">
            <span className="h-[1px] w-8 bg-black/20" /> {title}
          </div>
        )}

        {/* Alternating continuous flow layout */}
        <div className="flex flex-wrap w-full">
          {/* Left Column: Images for even indices, Text for odd indices */}
          <div className="w-full md:w-1/2 flex-shrink-0">
            {items?.map((item: ApplicationItem, itemIndex: number) => {
              const isEven = itemIndex % 2 === 0
              const marginTop = itemIndex > 0 && isDesktop ? (itemMargins[itemIndex] || 0) : 0
              
              if (isEven) {
                // Image on left for even indices
                return (
                  <div
                    key={`left-${itemIndex}`}
                    data-item-index={itemIndex}
                    data-type="image"
                    ref={itemIndex === 0 ? (el) => { itemRefs.current[itemIndex] = el } : undefined}
                    className="js-reveal mb-8 md:mb-12"
                    style={{ marginTop: `${marginTop}px` }}
                  >
                    <div className="relative w-full overflow-hidden h-[95vh]" style={{ minHeight: '50vh' }}>
                      <img 
                        src={item.image ? urlFor(item.image).quality(90).url() : '/placeholder.jpg'} 
                        alt={item.title} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                  </div>
                )
              } else {
                // Text on left for odd indices
                return (
                  <div
                    key={`left-${itemIndex}`}
                    data-item-index={itemIndex}
                    data-type="text"
                    ref={(el) => { itemRefs.current[itemIndex] = el }}
                    className="js-reveal mb-8 md:mb-12"
                    style={{ marginTop: `${marginTop}px` }}
                  >
                    <p className="mb-2 text-xs tracking-[0.18em] uppercase text-black/70 font-light">{item.title}</p>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl text-black tracking-tight">{item.subtitle}</h3>
                    <p className="mt-4 text-base md:text-lg text-black/70 leading-relaxed">{item.description}</p>
                    <ul className="mt-5 space-y-2 text-black/75">
                      {item.features?.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center gap-3 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-black/60" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }
            })}
          </div>

          {/* Right Column: Text for even indices, Images for odd indices */}
          <div className="w-full md:w-1/2 flex-shrink-0 px-4 md:px-6">
            {items?.map((item: ApplicationItem, itemIndex: number) => {
              const isEven = itemIndex % 2 === 0
              const marginTop = itemIndex > 0 && isDesktop ? (itemMargins[itemIndex] || 0) : 0
              
              if (isEven) {
                // Text on right for even indices
                return (
                  <div
                    key={`right-${itemIndex}`}
                    data-item-index={itemIndex}
                    data-type="text"
                    className="js-reveal mb-8 md:mb-12"
                    style={{ marginTop: `${marginTop}px` }}
                  >
                    <p className="mb-2 text-xs uppercase tracking-[0.18em] text-black/60">{item.title}</p>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl text-black tracking-tight">{item.subtitle}</h3>
                    <p className="mt-4 text-black/70 leading-relaxed">{item.description}</p>
                    <ul className="mt-5 space-y-2 text-black/75">
                      {item.features?.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center gap-3 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-black/60" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              } else {
                // Image on right for odd indices
                return (
                  <div
                    key={`right-${itemIndex}`}
                    data-item-index={itemIndex}
                    data-type="image"
                    ref={(el) => { itemRefs.current[itemIndex] = el }}
                    className="js-reveal mb-8 md:mb-12"
                    style={{ marginTop: `${marginTop}px` }}
                  >
                    <div className="relative w-full overflow-hidden h-[95vh]" style={{ minHeight: '50vh' }}>
                      <img 
                        src={item.image ? urlFor(item.image).quality(90).url() : '/placeholder.jpg'} 
                        alt={item.title} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
