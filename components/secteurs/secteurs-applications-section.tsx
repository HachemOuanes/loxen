"use client"

import React, { useEffect, useRef } from 'react'
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

interface SecteursApplicationsSectionProps {
    title: string
    items: ApplicationItem[]
}

export function SecteursApplicationsSection({ title, items }: SecteursApplicationsSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const stickyImageRef = useRef<HTMLDivElement>(null)
    const stickyTitleRef = useRef<HTMLDivElement>(null)
    const currentImageIndex = useRef(0)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        if (!sectionRef.current || !stickyImageRef.current || !stickyTitleRef.current || !items?.length) return

        const section = sectionRef.current
        const stickyImage = stickyImageRef.current
        const stickyTitle = stickyTitleRef.current

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

                // Calculate which image to show based on scroll progress
                let imageIndex = 0

                if (progress < 0.2) {
                    imageIndex = 0 // First third - first image
                } else if (progress < 0.8) {
                    imageIndex = 1 // Second third - second image
                } else {
                    imageIndex = 2 // Last third - third image
                }

                // Ensure we don't exceed available items
                imageIndex = Math.min(imageIndex, totalItems - 1)

                // Only animate if image index changed
                if (imageIndex !== currentImageIndex.current && items[imageIndex]?.image) {
                    const images = stickyImage.querySelectorAll('img')
                    const currentImg = images[currentImageIndex.current]
                    const nextImg = images[imageIndex]

                    if (currentImg && nextImg) {
                        // Determine scroll direction for swipe animation
                        const isScrollingDown = imageIndex > currentImageIndex.current

                        // Position next image off-screen horizontally (full width)
                        gsap.set(nextImg, {
                            opacity: 0,
                            x: isScrollingDown ? '100%' : '-100%',
                            y: 0
                        })

                        // Create continuous sliding + fade animation
                        gsap.timeline()
                            .to(currentImg, {
                                x: isScrollingDown ? '-100%' : '100%',
                                opacity: 0,
                                duration: 0.6,
                                ease: 'power2.inOut'
                            }, 0)
                            .to(nextImg, {
                                x: 0,
                                opacity: 1,
                                duration: 0.6,
                                ease: 'power2.inOut'
                            }, 0)

                        currentImageIndex.current = imageIndex
                    }
                }
            }
        })

        // Create separate ScrollTrigger for sticky title
        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            pin: stickyTitle,
            pinSpacing: false,
        })

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === section) {
                    trigger.kill()
                }
            })
        }
    }, [items])

    return (
        <section id="applications" ref={sectionRef} className="relative bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
                <div ref={stickyTitleRef} className="js-reveal items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 hidden w-[20rem]">
                </div>

                <div className="grid grid-cols-2 gap-8">
                    {/* GSAP Pinned Image - Right Side */}
                    <div className="relative">
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
                    {/* Text Content - Left Side */}
                    <div className="space-y-64 py-24">
                        {items?.map((item: ApplicationItem, itemIndex: number) => (
                            <div key={itemIndex} className="js-reveal min-h-[70vh] flex flex-col justify-center space-y-6">
                                {/* Title and Subtitle */}
                                <div className="space-y-2">
                                    <p className="text-xs uppercase tracking-[0.18em] text-black/60">{item.title}</p>
                                    <h3 className="text-3xl md:text-5xl font-light tracking-tight text-black">{item.subtitle}</h3>
                                </div>

                                {/* First text section - Large main text + italic description */}
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


                                {/* Original description */}
                                {item.description && (
                                    <p className="mt-4 text-black/70 leading-relaxed">{item.description}</p>
                                )}

                                {/* Features list */}
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
