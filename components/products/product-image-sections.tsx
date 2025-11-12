"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

// This component should render only CMS-provided sections. No static
// content or hard-coded JSON is kept here.

type CmsSection = {
    _key?: string
    _type?: string
    order?: number
    layout?: string
    title?: string
    subtitle?: string
    description?: string
    features?: string[]
    image?: any
    imageUrl?: string
    bannerLeft?: { title?: string; subtitle?: string; description?: string }
    bannerRight?: { title?: string; subtitle?: string; description?: string }
    // Legacy support for old heroLeft/heroRight
    heroLeft?: { title?: string; subtitle?: string; description?: string }
    heroRight?: { title?: string; subtitle?: string; description?: string }
}

interface ProductImageSectionsProps {
    sections?: CmsSection[]
}

export function ProductImageSections({ sections }: ProductImageSectionsProps) {
    const sectionRef = useRef<HTMLElement | null>(null)

    // Set up GSAP animations
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        const section = sectionRef.current
        if (!section) return

        const ctx = gsap.context(() => {
            // Hero image parallax
            const heroImage = section.querySelector('.js-hero-image')
            if (heroImage) {
                gsap.set(heroImage, { willChange: 'transform', force3D: true })
                gsap.fromTo(
                    heroImage,
                    { scale: 1.1 },
                    {
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: heroImage,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 0.6,
                        },
                    }
                )
            }

            // Reveal animations for text elements
            const revealElements = gsap.utils.toArray<HTMLElement>('.js-reveal')
            revealElements.forEach((el) => {
                gsap.fromTo(
                    el,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })

            // Parallax for feature images
            const parallaxImages = gsap.utils.toArray<HTMLElement>('.js-parallax')
            parallaxImages.forEach((el) => {
                gsap.set(el, { willChange: 'transform', force3D: true })
                gsap.fromTo(
                    el,
                    { scale: 1.1 },
                    {
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 0.4,
                        },
                    }
                )
            })
        }, section)

        return () => ctx.revert()
    }, [])

    // Only render when CMS sections are provided. If none are available,
    // render nothing — avoid any static fallback content in the component.
    if (!sections || !sections.length) return null

    // Only sort if ALL sections have explicit order values, otherwise maintain Sanity array order
    const allHaveOrder = sections.every(s => s.order !== undefined && s.order !== null)
    
    const sortedSections = allHaveOrder
        ? [...sections].sort((a, b) => (a.order || 0) - (b.order || 0))
        : sections // Maintain original Sanity array order

    return (
        <section ref={sectionRef} className="relative bg-white py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Render sections based on their type and order */}
                {sortedSections.map((section, idx) => {
                    const isBanner = section._type === 'productBannerSection'
                    const isFeature = section._type === 'productImageSection'
                    
                    // Banner Section - big image + two text columns
                    if (isBanner && (section.image || (section as any).imageUrl)) {
                        const bannerLeft = section.bannerLeft || section.heroLeft // Support legacy heroLeft
                        const bannerRight = section.bannerRight || section.heroRight // Support legacy heroRight
                        
                        return (
                            <div key={section._key || idx} className={idx > 0 ? 'mt-8 md:mt-12' : ''}>
                                <div className="mb-8 md:mb-12">
                                    <div className="js-reveal relative h-[60vh] md:h-[80vh] overflow-hidden border border-black/10">
                                        <Image
                                            src={
                                                (section as any).imageUrl
                                                    ? (section as any).imageUrl
                                                    : section.image
                                                        ? typeof section.image === 'string'
                                                            ? section.image
                                                            : urlFor(section.image).width(1920).height(1080).quality(90).url()
                                                        : ''
                                            }
                                            alt={bannerLeft?.title || bannerRight?.title || section.subtitle || section.title || ''}
                                            className="js-hero-image h-full w-full object-cover"
                                            width={1920}
                                            height={1080}
                                        />
                                    </div>
                                </div>

                                {(bannerLeft || bannerRight) && (
                                    <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-8 md:mb-12">
                                        {bannerLeft && (
                                            <div className="js-reveal">
                                                {bannerLeft.subtitle && (
                                                    <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60">{bannerLeft.subtitle}</p>
                                                )}
                                                {bannerLeft.title && (
                                                    <h3 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">{bannerLeft.title}</h3>
                                                )}
                                                {bannerLeft.description && (
                                                    <p className="text-base md:text-lg text-black/75 italic leading-snug mb-6">{bannerLeft.description}</p>
                                                )}
                                            </div>
                                        )}

                                        {bannerRight && (
                                            <div className="js-reveal text-right">
                                                {bannerRight.subtitle && (
                                                    <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60">{bannerRight.subtitle}</p>
                                                )}
                                                {bannerRight.title && (
                                                    <h3 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">{bannerRight.title}</h3>
                                                )}
                                                {bannerRight.description && (
                                                    <p className="text-base md:text-lg text-black/75 italic leading-snug mb-6">{bannerRight.description}</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    }
                    
                    // Feature Section - alternating image + text
                    if (isFeature) {
                        const featureIndex = sortedSections.filter((s, i) => i < idx && s._type === 'productImageSection').length
                        const isFlexReverse = featureIndex % 2 === 1
                        
                        return (
                            <div key={section._key || idx} className={`flex flex-col md:flex-row gap-8 items-center ${idx < sortedSections.length - 1 ? 'mb-8 md:mb-12' : ''} ${isFlexReverse ? 'md:flex-row-reverse' : ''}`}>
                                {/* Image section */}
                                {(section.image || (section as any).imageUrl) && (
                                    <div className="w-full md:w-1/2">
                                        <div className="js-reveal relative h-[50vh] md:h-[60vh] overflow-hidden border border-black/10">
                                            <Image
                                                src={
                                                    (section as any).imageUrl
                                                        ? (section as any).imageUrl
                                                        : section.image
                                                            ? typeof section.image === 'string'
                                                                ? section.image
                                                                : urlFor(section.image).width(1200).height(800).quality(90).url()
                                                            : ''
                                                }
                                                alt={section.subtitle || section.title || ''}
                                                className="js-parallax h-full w-full object-cover"
                                                width={800}
                                                height={600}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Text section */}
                                <div className="w-full md:w-1/2">
                                    {section.title && (
                                        <p className="js-reveal mb-2 text-xs uppercase tracking-[0.18em] text-black/60">{section.title}</p>
                                    )}
                                    {section.subtitle && (
                                        <h3 className="js-reveal text-2xl md:text-3xl font-light tracking-tight text-black">{section.subtitle}</h3>
                                    )}
                                    {section.description && (
                                        <p className="js-reveal mt-4 text-black/70 leading-relaxed">{section.description}</p>
                                    )}
                                    {(section.features || []).length > 0 && (
                                        <ul className="js-reveal mt-5 space-y-2 text-black/75">
                                            {(section.features || []).slice(0, 6).map((featureItem, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start gap-3">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-black/60 mt-2 flex-shrink-0" />
                                                    <span>{featureItem}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )
                    }
                    
                    return null
                })}

            </div>
        </section>
    )
}
