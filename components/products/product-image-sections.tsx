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
    layout?: string
    title?: string
    subtitle?: string
    description?: string
    features?: string[]
    image?: any
    imageUrl?: string
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

    const first = sections[0]
    // schema now defines a distinct object type for hero sections
    const hasHero = first && (first as any)._type === 'productHeroSection'
    const hero = hasHero ? first : null
    const bodySections = hasHero ? sections.slice(1) : sections

    return (
        <section ref={sectionRef} className="relative bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Hero Section - big image + two text columns */}
                {hero && (hero.image || (hero as any).imageUrl) && (
                    <>
                        <div className="mb-12 md:mb-16">
                            <div className="js-reveal relative h-[60vh] md:h-[80vh] overflow-hidden border border-black/10">
                                <Image
                                    src={
                                        (hero as any).imageUrl
                                            ? (hero as any).imageUrl
                                            : hero.image
                                                ? typeof hero.image === 'string'
                                                    ? hero.image
                                                    : urlFor(hero.image).width(1920).height(1080).quality(90).url()
                                                : ''
                                    }
                                    alt={hero.heroLeft?.title || hero.heroRight?.title || hero.subtitle || hero.title || ''}
                                    className="js-hero-image h-full w-full object-cover"
                                    width={1920}
                                    height={1080}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-24">
                            <div className="js-reveal">
                                {hero.heroLeft?.subtitle && (
                                    <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60">{hero.heroLeft.subtitle}</p>
                                )}
                                {hero.heroLeft?.title && (
                                    <h3 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">{hero.heroLeft.title}</h3>
                                )}
                                {hero.heroLeft?.description && (
                                    <p className="text-base md:text-lg text-black/75 italic leading-snug mb-6">{hero.heroLeft.description}</p>
                                )}
                            </div>

                            <div className="js-reveal text-right">
                                {hero.heroRight?.subtitle && (
                                    <p className="uppercase tracking-[0.18em] text-[11px] md:text-xs text-black/60">{hero.heroRight.subtitle}</p>
                                )}
                                {hero.heroRight?.title && (
                                    <h3 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">{hero.heroRight.title}</h3>
                                )}
                                {hero.heroRight?.description && (
                                    <p className="text-base md:text-lg text-black/75 italic leading-snug mb-6">{hero.heroRight.description}</p>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* Applications header (optional) */}
                <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-8">
                    <span className="h-[1px] w-8 bg-black/20" /> Applications
                </div>

                {/* Render body sections in alternating layout */}
                {bodySections.map((feature, idx) => {
                    const index = idx // index within bodySections
                    const isFlexReverse = index % 2 === 1

                    return (
                        <div key={feature._key || index} className={`flex flex-col md:flex-row gap-8 items-center ${index < bodySections.length - 1 ? 'mb-12' : ''} ${isFlexReverse ? 'md:flex-row-reverse' : ''}`}>
                            {/* Image section */}
                            {(feature.image || (feature as any).imageUrl) && (
                                <div className="w-full md:w-1/2">
                                    <div className="js-reveal relative h-[50vh] md:h-[60vh] overflow-hidden border border-black/10">
                                        <Image
                                            src={
                                                (feature as any).imageUrl
                                                    ? (feature as any).imageUrl
                                                    : feature.image
                                                        ? typeof feature.image === 'string'
                                                            ? feature.image
                                                            : urlFor(feature.image).width(1200).height(800).quality(90).url()
                                                        : ''
                                            }
                                            alt={feature.subtitle || feature.title || ''}
                                            className="js-parallax h-full w-full object-cover"
                                            width={800}
                                            height={600}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Text section */}
                            <div className="w-full md:w-1/2">
                                {feature.title && (
                                    <p className="js-reveal mb-2 text-xs uppercase tracking-[0.18em] text-black/60">{feature.title}</p>
                                )}
                                {feature.subtitle && (
                                    <h3 className="js-reveal text-2xl md:text-3xl font-light tracking-tight text-black">{feature.subtitle}</h3>
                                )}
                                {feature.description && (
                                    <p className="js-reveal mt-4 text-black/70 leading-relaxed">{feature.description}</p>
                                )}
                                {(feature.features || []).length > 0 && (
                                    <ul className="js-reveal mt-5 space-y-2 text-black/75">
                                        {(feature.features || []).slice(0, 6).map((featureItem, featureIndex) => (
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
                })}

            </div>
        </section>
    )
}
