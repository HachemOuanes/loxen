"use client"

import React, { useEffect, useRef, useState } from 'react'

// Static image/text sections for MEG. Images expected under public/meg as meg-1.jpg, meg-2.jpg, ...
// If images are not yet available, add them under /public/meg to avoid 404s.

type Section =
    | {
        type: 'full'
        imageBase: string
        title?: string
        intro?: string
        text?: string
        bullets?: string[]
        outro?: string
        alt?: string
    }
    | {
        type: 'split'
        imageBase: string
        title?: string
        intro?: string
        paragraphs?: string[]
        text?: string
        bullets?: string[]
        outro?: string
        alt?: string
        imageLeft?: boolean
    }

function ImageWithExtFallback({
    baseSrc,
    alt,
    className,
    loading = 'lazy',
    style,
    extensions,
}: {
    baseSrc: string
    alt?: string
    className?: string
    loading?: 'eager' | 'lazy'
    style?: React.CSSProperties
    extensions?: string[]
}) {
    const defaultExts = ['.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.webp']
    const candidates = extensions && extensions.length ? extensions : defaultExts
    const [extIndex, setExtIndex] = useState(0)
    const [src, setSrc] = useState<string>(`${baseSrc}${candidates[0]}`)

    const handleError = () => {
        // Try next extension; if none left, fallback to placeholder
        if (extIndex < candidates.length - 1) {
            const next = extIndex + 1
            setExtIndex(next)
            setSrc(`${baseSrc}${candidates[next]}`)
        } else {
            setSrc('/abstract-black-white-geometric-pattern-minimal.png')
        }
    }

    // Reset when baseSrc changes
    React.useEffect(() => {
        setExtIndex(0)
        setSrc(`${baseSrc}${candidates[0]}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseSrc])

    return (
        <img
            src={src}
            alt={alt || ''}
            className={className}
            onError={handleError}
            loading={loading}
            style={style}
        />
    )
}

function ParallaxImage({
    baseSrc,
    alt,
    speed = 0.2,
    className,
}: {
    baseSrc: string
    alt?: string
    speed?: number
    className?: string
}) {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [offset, setOffset] = useState(0)
    const tickingRef = useRef(false)

    const update = () => {
        if (!wrapperRef.current) return
        const rect = wrapperRef.current.getBoundingClientRect()
        const viewportH = window.innerHeight || 0
        // Distance from element center to viewport center
        const distance = rect.top + rect.height / 2 - viewportH / 2
        const translate = -distance * speed
        setOffset(translate)
        tickingRef.current = false
    }

    const onScroll = () => {
        if (!tickingRef.current) {
            tickingRef.current = true
            window.requestAnimationFrame(update)
        }
    }

    useEffect(() => {
        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [])

    return (
        <div ref={wrapperRef} className={className}>
            <ImageWithExtFallback
                baseSrc={baseSrc}
                alt={alt}
                className="w-full h-[135%] object-cover will-change-transform"
                style={{ transform: `translateY(${offset}px) scale(1.12)` }}
            />
        </div>
    )
}

const sections: Section[] = [
    {
        type: 'full',
        imageBase: '/meg/meg-1',
        title: 'Un matériau robuste et fiable',
        intro:
            "Conçu pour résister aux conditions climatiques les plus extrêmes, le MEG conserve ses performances et son aspect au fil des années, notamment face :",
        bullets: [
            'aux fortes variations de température (de -30°C à +70°C),',
            "à l’humidité élevée (jusqu’à 90%),",
            'aux rayons UV et à l’ensoleillement intense,',
            'aux pluies acides et polluants atmosphériques,',
            'au vent et aux sollicitations mécaniques extérieures,',
            'au brouillard salin et aux environnements côtiers.',
        ],
        text:
            "Sa surface décorative et son cœur haute densité assurent une excellente tenue dans le temps, même en conditions d’usage intensif.",
        outro:
            "Ne se déforme pas, ne se fissure pas et conserve une esthétique nette et durable, limitant les interventions d’entretien.",
        alt: 'MEG – matériau robuste et fiable',
    },
    {
        type: 'split',
        imageBase: '/meg/meg-2',
        title: 'Des performances techniques élevées',
        intro: 'Grâce à sa densité et sa composition homogène, le MEG offre des garanties de mise en œuvre et de durabilité :',
        bullets: [
            'une excellente résistance aux chocs et à la flexion,',
            'une solidité parfaite pour les fixations mécaniques (vis, rivets, etc.),',
            'une option ignifugée (classification B – s1 d0), répondant aux normes européennes les plus strictes (EN 438:2016 – partie 6),',
            'une stabilité dimensionnelle maîtrisée sur la durée,',
            'un comportement optimal en façade ventilée (dilatations contrôlées).',
        ],
        paragraphs: [
            "La pose est facilitée par une tolérance maîtrisée et une compatibilité avec les systèmes de sous-structures courants.",
            "Le matériau supporte les cycles thermiques répétés sans altération visible de la surface décorative.",
        ],
        alt: 'MEG – performances techniques',
        imageLeft: true,
    },
    {
        type: 'split',
        imageBase: '/meg/meg-3',
        title: 'Une liberté esthétique totale',
        intro: "Des palettes de finitions et de textures étendues permettent d’exprimer l’identité du projet, du minimalisme aux compositions graphiques.",
        paragraphs: [
            "Disponible dans une large gamme de décors, effets bois, unis ou motifs contemporains, le MEG permet de créer des façades qui allient design et modernité, tout en restant intemporelles.",
            "Les teintes conservent leur intensité et gagnent en caractère avec le temps, sans entretien contraignant.",
        ],
        bullets: [
            'Effets bois naturels et essences variées',
            'Unis profonds et neutres sophistiqués',
            'Motifs contemporains et géométries graphiques',
            'Surfaces texturées et mates',
        ],
        outro: "Possibilité d’associer formats, calepinages et décors pour une écriture de façade sur-mesure.",
        alt: 'MEG – liberté esthétique',
        imageLeft: false,
    },
    {
        type: 'split',
        imageBase: '/meg/meg-4',
        title: 'Pourquoi choisir le MEG en Tunisie ?',
        intro:
            "Avec son climat chaud, humide et soumis aux variations, la Tunisie met les matériaux à rude épreuve.",
        bullets: [
            'Résistance élevée au rayonnement solaire et aux UV',
            'Durabilité en zones côtières et milieux salins',
            'Entretien réduit grâce à une surface facile à nettoyer',
            'Stabilité thermique et mécanique sur la durée',
        ],
        paragraphs: [
            "Le MEG concilie durabilité, résistance et élégance, tout en offrant une grande liberté de conception.",
        ],
        outro: "Une solution fiable pour les enveloppes performantes, des villas aux équipements publics.",
        alt: 'MEG – avantages en Tunisie',
        imageLeft: true,
    },
]

export function ProductImageSections() {
    return (
        <section id="details-media" className="bg-white">
            {/* Full-width hero image with text */}
            {sections[0]?.type === 'full' && (
                <div className="w-full">
                    <div className="relative max-w-7xl mx-auto w-full h-[60vh] md:h-[80vh] overflow-hidden">
                        <ParallaxImage
                            baseSrc={(sections[0] as any).imageBase}
                            alt={(sections[0] as any).alt || 'MEG visuel'}
                            speed={0.5}
                            className="absolute inset-0"
                        />
                    </div>
                    {(sections[0] as any).title || (sections[0] as any).intro || (sections[0] as any).bullets || (sections[0] as any).text || (sections[0] as any).outro ? (
                        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
                            {(sections[0] as any).title && (
                                <h2 className="text-2xl md:text-3xl font-light tracking-[-0.01em] mb-3">
                                    {(sections[0] as any).title}
                                </h2>
                            )}
                            {(sections[0] as any).intro && (
                                <p className="text-gray-700 leading-relaxed font-light text-base md:text-lg">
                                    {(sections[0] as any).intro}
                                </p>
                            )}
                            {(sections[0] as any).bullets && Array.isArray((sections[0] as any).bullets) && (
                                <ul className="list-disc pl-6 md:pl-8 text-gray-700 font-light space-y-1 md:space-y-1.5 mt-4">
                                    {(sections[0] as any).bullets.map((b: string, i: number) => (
                                        <li key={i} className="text-base md:text-lg">{b}</li>
                                    ))}
                                </ul>
                            )}
                            {(sections[0] as any).text && (
                                <p className="text-gray-700 leading-relaxed font-light text-base md:text-lg mt-4">
                                    {(sections[0] as any).text}
                                </p>
                            )}
                            {(sections[0] as any).outro && (
                                <p className="text-gray-700 leading-relaxed font-light text-base md:text-lg mt-4">
                                    {(sections[0] as any).outro}
                                </p>
                            )}
                        </div>
                    ) : null}
                </div>
            )}

            {/* Alternating split sections */}
            <div className="max-w-7xl mx-auto px-4 space-y-12 md:space-y-16 pb-16 md:pb-24">
                {sections.slice(1).map((s, idx) => {
                    if (s.type !== 'split') return null
                    const imageLeft = s.imageLeft ?? idx % 2 === 0
                    return (
                        <div
                            key={idx}
                            className="grid md:grid-cols-2 gap-6 md:gap-12 items-center"
                        >
                            <div className={imageLeft ? '' : 'md:order-2'}>
                                <div className="relative h-[40rem] w-full overflow-hidden border border-gray-100">
                                    <ParallaxImage
                                        baseSrc={s.imageBase}
                                        alt={s.alt || 'MEG visuel'}
                                        speed={0.3}
                                        className="absolute inset-0"
                                    />
                                </div>
                            </div>
                            <div className={imageLeft ? '' : 'md:order-1'}>
                                {s.title && (
                                    <h3 className="text-xl md:text-2xl font-light tracking-[-0.01em] mb-3 md:mb-4">
                                        {s.title}
                                    </h3>
                                )}
                                {s.intro && (
                                    <p className="text-gray-700 leading-relaxed font-light mb-4">
                                        {s.intro}
                                    </p>
                                )}
                                {s.bullets && Array.isArray(s.bullets) && (
                                    <ul className="list-disc pl-5 md:pl-6 text-gray-700 font-light space-y-1 md:space-y-1.5">
                                        {s.bullets.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                )}
                                {s.paragraphs && s.paragraphs.length > 0 ? (
                                    <div className="space-y-4 mt-4">
                                        {s.paragraphs.map((p, i) => (
                                            <p key={i} className="text-gray-700 leading-relaxed font-light">
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                ) : s.text ? (
                                    <p className="text-gray-700 leading-relaxed font-light">
                                        {s.text}
                                    </p>
                                ) : null}
                                {s.outro && (
                                    <p className="text-gray-700 leading-relaxed font-light mt-4">
                                        {s.outro}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
