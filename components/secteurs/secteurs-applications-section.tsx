"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ApplicationItem {
    title: string
    subtitle: string
    description: string
    textSection?: {
        mainText?: string
        description?: string
    }
    features: string[]
    image: string
}

interface ApplicationsSectionProps {
    items: ApplicationItem[]
    imageOnRight?: boolean
}

interface SecteursApplicationsSectionProps {
    primaryItems: ApplicationItem[]
    secondaryItems?: ApplicationItem[]
}

function ApplicationsSection({ items, imageOnRight = true }: ApplicationsSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const stickyImageRef = useRef<HTMLDivElement>(null)
    const currentImageIndex = useRef(0)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        if (!sectionRef.current || !stickyImageRef.current || !items?.length) return

        const section = sectionRef.current
        const stickyImage = stickyImageRef.current

        // Create ScrollTrigger for sticky behavior with image transitions
        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            pin: stickyImage,
            pinSpacing: false,
            onUpdate: (self) => {
                const progress = self.progress
                const totalItems = items.length

                // Dynamic image index based on progress
                const rawIndex = Math.floor(progress * totalItems)
                const imageIndex = Math.min(Math.max(rawIndex, 0), totalItems - 1)

                // Only animate if image index changed
                if (imageIndex !== currentImageIndex.current && items[imageIndex]?.image) {
                    const images = stickyImage.querySelectorAll('img')
                    const currentImg = images[currentImageIndex.current]
                    const nextImg = images[imageIndex]

                    if (currentImg && nextImg) {
                        const isScrollingDown = imageIndex > currentImageIndex.current
                        const direction = imageOnRight ? 1 : -1

                        // Position next image off-screen horizontally
                        gsap.set(nextImg, {
                            opacity: 0,
                            x: isScrollingDown ? 100 * direction + '%' : -100 * direction + '%',
                            y: 0
                        })

                        gsap.timeline()
                            .to(currentImg, {
                                x: isScrollingDown ? -100 * direction + '%' : 100 * direction + '%',
                                opacity: 0,
                                duration: 0.6,
                                ease: 'power2.inOut'
                            }, 0)
                            .to(nextImg, {
                                x: '0%',
                                opacity: 1,
                                duration: 0.6,
                                ease: 'power2.inOut'
                            }, 0)

                        currentImageIndex.current = imageIndex
                    }
                }
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === section) {
                    trigger.kill()
                }
            })
        }
    }, [items, imageOnRight])

    return (
        <section ref={sectionRef} className="relative bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
                <div className="grid grid-cols-2 gap-8">
                    {/* Sticky Image */}
                    <div className={`relative ${imageOnRight ? 'md:order-2' : 'md:order-1'}`}>
                        <div ref={stickyImageRef} className="h-[96vh] overflow-hidden">
                            {items?.map((item, index) => (
                                <img
                                    key={index}
                                    src={item.image || '/placeholder.jpg'}
                                    alt={item.title || 'Application'}
                                    className={`absolute h-full w-full object-cover ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className={`space-y-64 py-16 md:py-24 ${imageOnRight ? 'md:order-1' : 'md:order-2'}`}>
                        {items?.map((item: ApplicationItem, itemIndex: number) => (
                            <div key={itemIndex} className="js-reveal min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center space-y-6">
                                <div className="space-y-2">
                                    <p className="text-xs uppercase tracking-[0.18em] text-black/60">{item.title}</p>
                                    <h3 className="text-3xl md:text-5xl font-light tracking-tight text-black">{item.subtitle}</h3>
                                </div>

                                {item.textSection && (
                                    <div className="space-y-2 py-4">
                                        {item.textSection.mainText && (
                                            <p className="text-xl md:text-2xl font-light text-black leading-tight">
                                                {item.textSection.mainText}
                                            </p>
                                        )}
                                        {item.textSection.description && (
                                            <p className="text-sm md:text-base text-black/60 italic leading-relaxed max-w-xl">
                                                {item.textSection.description}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {item.description && (
                                    <div className="mt-4 text-black/70 leading-relaxed">{item.description}</div>
                                )}

                                {item.features && item.features.length > 0 && (
                                    <div className="mt-5 space-y-2">
                                        {item.features.map((feature: string, featureIndex: number) => (
                                            <div key={featureIndex} className="group cursor-pointer">
                                                <div className="bg-white border border-black/10 hover:border-black/20 hover:shadow-sm transition-all duration-200 p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 bg-black/30 group-hover:bg-black/60 transition-colors duration-200" />
                                                        <span className="text-sm text-black/75 group-hover:text-black/90 transition-colors duration-200 leading-relaxed">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export function SecteursApplicationsSection({ primaryItems, secondaryItems }: SecteursApplicationsSectionProps) {
    // primaryItems: current CMS data
    // secondaryItems: optional second section (if provided)

    return (
        <div className="space-y-12 md:space-y-16">
            {/* First applications (current CMS content) */}
            {primaryItems?.length > 0 && (
                <ApplicationsSection items={primaryItems} imageOnRight />
            )}

            {/* Second applications (mirror layout) */}
            {(secondaryItems?.length ?? 0) > 0 && (
                <ApplicationsSection items={secondaryItems ?? []} imageOnRight={false} />
            )}
        </div>
    )
}
