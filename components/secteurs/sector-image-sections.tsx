"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Minimal: GSAP-only pinned horizontal scroll over 3 images
type SectorImageSectionsProps = {
  title?: string
  description?: string
  slug?: string
}

export function SectorImageSections({ title, description }: SectorImageSectionsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const panels = track.querySelectorAll('.h-panel').length || 3

    // Reset position
    gsap.set(track, { x: 0 })

    // Distance to move equals total track width minus viewport width
    const distance = () => Math.max(0, track.scrollWidth - section.clientWidth)
    const speedFactor = 2 // > 1 = faster (less scroll distance for full move)

    // Prepare image scaling
    const imgs = Array.from(track.querySelectorAll<HTMLImageElement>('.js-panel-img'))
    imgs.forEach((img) => {
      img.style.transformOrigin = '50% 50%'
      img.style.willChange = 'transform'
        // GPU hint to reduce flicker
        ; (img.style as any).backfaceVisibility = 'hidden'
        ; (img.style as any).transform = (img.style.transform || '') + ' translateZ(0)'
    })
    const minScaleConst = 1.02
    const maxScale = 1.22
    const clamp = gsap.utils.clamp(minScaleConst, maxScale)
    const MAX_Y = 48 // must match vertical offset logic
    const SAFETY = 16

    const getContainerHeight = (el: HTMLElement): number => {
      let node: HTMLElement | null = el
      while (node && node !== document.body) {
        const h = node.clientHeight
        if (h > 0) return h
        node = node.parentElement as HTMLElement | null
      }
      return window.innerHeight || 800
    }
    const updateScales = (progress: number) => {
      const current = progress * (panels - 1)
      imgs.forEach((img, i) => {
        const rawDist = i - current
        const dist = Math.abs(rawDist)
        const t = Math.max(0, 1 - dist) // 1 at center panel, 0 one panel away
        // Compute dynamic baseline scale to cover vertical drift without edge gaps
        const H = getContainerHeight(img)
        const baseline = 1 + (2 * MAX_Y + SAFETY) / Math.max(1, H)
        const target = clamp(minScaleConst + (maxScale - minScaleConst) * t)
  const scale = Math.max(baseline, target)
  const y = Math.sign(rawDist) * (1 - t) * 48 // add vertical offset away from center
  const transform = `translate3d(0, ${y}px, 0) scale(${scale})`
  img.style.transform = transform
  img.style.transformOrigin = '50% 50%'
      })
    }

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      overwrite: 'auto',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(1, Math.round(distance() / 1))}`,
        pin: true,
        scrub: 0.7,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateScales(self.progress),
      },
      onStart: () => updateScales(0),
    })

    const onLoad = () => {
      try { ScrollTrigger.refresh() } catch { }
    }
    window.addEventListener('load', onLoad, { once: true })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      window.removeEventListener('load', onLoad)
    }
  }, [])

  // Lightweight reveal + parallax animations for sections below the scroller
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      // Reveal-on-scroll for elements with .js-reveal (stronger and clearer)
      const revealEls = gsap.utils.toArray<HTMLElement>('.js-reveal')
      revealEls.forEach((el, i) => {
        const tl = gsap.timeline({
          delay: Math.min(0.15, i * 0.04),
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
        tl.fromTo(
          el,
          { autoAlpha: 0, y: 48, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1.06, duration: 0.8, ease: 'power3.out' }
        ).to(el, { scale: 1, duration: 0.25, ease: 'power1.out' })
      })

      // Parallax for elements with .js-parallax; keep a dynamic baseline scale to avoid edge gaps
      const parallaxEls = gsap.utils.toArray<HTMLElement>('.js-parallax')
      parallaxEls.forEach((el) => {
        const speed = Number(el.getAttribute('data-speed') || '0.4')
        const targetEl = (el.querySelector('img') as HTMLElement) || el
        const travel = () => Math.max(window.innerHeight, (el as HTMLElement).clientHeight || 300) * speed
        const travelFactor = 0.4
        const baseScale = () => {
          const H = targetEl.clientHeight || el.clientHeight || (el.parentElement?.clientHeight ?? window.innerHeight)
          const d = travel() * travelFactor
          const s = 1 + (2 * d + 24) / Math.max(1, H)
          return Math.max(1.12, s)
        }
        const applyBaseScale = () => {
          const s = baseScale()
          ;(targetEl as HTMLElement).style.transform = `translateZ(0) scale(${s})`
          ;(targetEl as HTMLElement).style.transformOrigin = '50% 50%'
          ;(targetEl as HTMLElement).style.willChange = 'transform'
        }
        applyBaseScale()
        gsap.fromTo(targetEl, { y: () => -travel() * travelFactor }, {
          y: () => travel() * travelFactor,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            onRefresh: applyBaseScale,
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef}>
      {/* Hero: text left, image right */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_10%_10%,rgba(0,0,0,0.05),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-6">
              <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-4">
                <span className="h-[1px] w-8 bg-black/20" /> Secteurs
              </div>
              <h1 className="js-reveal text-3xl md:text-6xl font-light tracking-tight text-black mb-4">
                {title ?? 'Conception d’espaces performants et durables'}
              </h1>
              <p className="js-reveal text-base md:text-lg text-black/70 leading-relaxed max-w-prose">
                {description ?? (
                  <>Des solutions de façade haut de gamme pour révéler l’architecture, avec des matériaux pérennes et des détails soignés. Découvrez nos références en images.</>
                )}
              </p>
            </div>
            <div className="md:col-span-6">
              <div className="relative h-[50vh] md:h-[60vh]">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-black/5 to-transparent blur-2xl" />
                <div className='-bottom-12 -left-12 absolute bg-gradient-to-tr from-gray-200 to-transparent w-[30rem] h-[30rem]'></div>
                <div className="relative h-full w-full overflow-hidden border border-black/10 shadow-lg">
                  <img
                    src="/contemporary-cultural-center-glass-facade-paris.png"
                    alt="Façade vitrée contemporaine"
                    className="js-parallax h-full w-full object-cover"
                    data-speed="0.45"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* End of pinned scroller; normal flow resumes here */}

      {/* Horizontal panels: text left + image right scrolling together */}
      <section ref={sectionRef} className="w-full overflow-x-hidden bg-white">
        <div ref={trackRef} className="flex h-screen will-change-transform">
          {/* Panel 1 */}
          <div className="h-panel flex-none w-full">
            <div className="mx-auto grid h-screen max-w-7xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-12 md:px-6">
              <div className="md:col-span-5">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-black/60">Façades</p>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-black">Façades performantes</h3>
                <p className="mt-4 text-black/70 leading-relaxed">
                  Esthétique, confort thermique et pérennité réunis. Nos systèmes ventilés et composites assurent des
                  performances durables face aux UV et aux intempéries.
                </p>
                <p className="mt-4 text-black/70 leading-relaxed">
                  Nous privilégions des assemblages précis, des interfaces maîtrisées et une lecture claire des
                  volumes, afin d’offrir une enveloppe élégante et technique à la fois.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {[
                    'Confort thermique optimisé',
                    'Résistance climatique accrue',
                    'Détails d\'exécution soignés',
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-xs md:text-sm text-black/70 rounded-md border border-black/10 bg-black/[0.02] px-3 py-1.5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-7">
                <div className="relative h-[50vh] md:h-[75vh] overflow-hidden border-black/10 border-2 shadow-lg">
                  <img src="/high-resolution-minimalist-modern-building-exterio.png" alt="Façade extérieure contemporaine" className="js-panel-img absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="h-panel flex-none w-full">
            <div className="mx-auto grid h-screen max-w-7xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-12 md:px-6">
              <div className="md:col-span-5">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-black/60">Finitions & Décors</p>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-black">Palette de textures</h3>
                <p className="mt-4 text-black/70 leading-relaxed">
                  Un éventail de décors boisés, minéraux et métalliques, pensés pour durer et s’accorder à chaque
                  identité architecturale.
                </p>
                <p className="mt-4 text-black/70 leading-relaxed">
                  Les collections sont sélectionnées pour leur profondeur visuelle, leur justesse de teinte et leur
                  tenue dans le temps, afin de magnifier chaque façade.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {[
                    'Teintes stables et durables',
                    'Finitions adaptées au contexte',
                    'Cohérence esthétique globale',
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-xs md:text-sm text-black/70 rounded-md border border-black/10 bg-black/[0.02] px-3 py-1.5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-7">
                <div className="relative h-[50vh] md:h-[75vh] overflow-hidden border-black/10 border-2 shadow-lg">
                  <img src="/high-resolution-minimalist-modern-building-black.png" alt="Façade minimaliste noir profond" className="js-panel-img absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="h-panel flex-none w-full">
            <div className="mx-auto grid h-screen max-w-7xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-12 md:px-6">
              <div className="md:col-span-5">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-black/60">Durabilité</p>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-black">Entretien maîtrisé</h3>
                <p className="mt-4 text-black/70 leading-relaxed">
                  Des matériaux robustes et stables dans le temps, pour une longévité élevée et un entretien réduit,
                  sans compromis sur la qualité perçue.
                </p>
                <p className="mt-4 text-black/70 leading-relaxed">
                  Des systèmes éprouvés, des fixations fiables et des finitions résistantes garantissent la performance
                  sur le long terme, y compris en conditions climatiques exigeantes.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {[
                    'Robustesse et stabilité',
                    'Maintenance réduite',
                    'Valeur durable du projet',
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-xs md:text-sm text-black/70 rounded-md border border-black/10 bg-black/[0.02] px-3 py-1.5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-7">
                <div className="relative h-[50vh] md:h-[75vh] overflow-hidden border-black/10 border-2 shadow-lg">
                  <img src="/high-resolution-minimalist-modern-interior-office.png" alt="Agencements intérieurs – bureau contemporain" className="js-panel-img absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- Additional animated sections --- */}

      {/* Mosaic sectors grid */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-4">
            <span className="h-[1px] w-8 bg-black/20" /> Domaines d’intervention
          </div>
          <h2 className="js-reveal text-2xl md:text-4xl font-light tracking-tight text-black max-w-3xl">
            Des solutions adaptées à chaque contexte architectural
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { src: '/exterior-facades-ventilees.jpg', label: 'Façades ventilées' },
              { src: '/exterior-brise-soleil.jpg', label: 'Brise-soleil' },
              { src: '/exterior-garde-corps-balustrades.jpg', label: 'Garde-corps' },
              { src: '/interior-agencements.jpg', label: 'Agencements intérieurs' },
            ].map(({ src, label }) => (
              <article key={label} className="js-reveal group relative h-64 md:h-72 overflow-hidden border border-black/10">
                <img src={src} alt={label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="text-white/90 text-sm uppercase tracking-[0.14em]">{label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Materials showcase with parallax images */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center px-4 md:px-6">
          <div className="md:col-span-5 relative z-10">
            <p className="js-reveal mb-2 text-xs uppercase tracking-[0.18em] text-black/60">Matériaux</p>
            <h3 className="js-reveal text-2xl md:text-3xl font-light tracking-tight text-black">Textures pérennes, rendus maîtrisés</h3>
            <p className="js-reveal mt-4 text-black/70 leading-relaxed">
              Panneaux composites, HPL, stratifiés et solutions métalliques — une palette conçue pour durer et dialoguer avec
              l’environnement, sans compromis sur l’esthétique.
            </p>
            <ul className="js-reveal mt-5 space-y-2">
              {['HPL & Stratifiés techniques', 'Composites légers & performants', 'Finitions UV-stables'].map((f) => (
                <li key={f} className="text-sm text-black/75 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/60" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-7 relative z-0 h-[40vh] md:h-[60vh]">
            <div className="absolute inset-0 m-0 md:-m-4 pointer-events-none">
              <div className="absolute left-2 top-2 md:left-4 md:top-4 w-1/3 h-1/3 js-parallax" data-speed="0.25">
                <img src="/composite-panel-system.jpg" alt="Panneaux composites" className="h-full w-full object-cover border border-black/10 shadow-lg" loading="lazy" decoding="async" />
              </div>
              <div className="absolute md:right-32 md:bottom-32 w-1/3 h-1/3 js-parallax" data-speed="0.4">
                <img src="/copanel-composite.jpg" alt="Copanel composite" className="h-full w-full object-cover border border-black/10 shadow-lg" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pinned-like case study with sticky media */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 px-4 md:px-6 items-start">
          <div className="md:col-span-6 md:pr-8">
            <div className="js-reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-black/60 mb-3">
              <span className="h-[1px] w-8 bg-black/20" /> Étude de cas
            </div>
            <h3 className="js-reveal text-2xl md:text-3xl font-light tracking-tight text-black">Centre culturel – Façade vitrée et panneaux composite</h3>
            <div className="mt-8 space-y-10">
              {[
                {
                  t: 'Concept',
                  d:
                    'Une enveloppe lumineuse qui reflète le ciel et s’anime selon les heures, avec des raccords invisibles et une trame maîtrisée.',
                },
                {
                  t: 'Technique',
                  d:
                    'Système ventilé sur ossature aluminium, calepinage précis et fixations dissimulées pour une lecture épurée des volumes.',
                },
                {
                  t: 'Résultat',
                  d:
                    'Façade performante, durable et expressive, dialoguant avec son environnement et valorisant le bâtiment.',
                },
              ].map(({ t, d }) => (
                <div key={t} className="js-reveal">
                  <p className="text-xs uppercase tracking-[0.18em] text-black/60">{t}</p>
                  <p className="mt-2 text-black/75 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="md:sticky md:top-24 relative h-[40vh] md:h-[70vh] overflow-hidden border border-black/10 shadow-lg">
              <img src="/contemporary-cultural-center-glass-facade.png" alt="Étude de cas – Façade vitrée" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/clean-minimalist-architecture-facade.jpg" alt="Architecture minimaliste" className="h-full w-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-36">
          <h3 className="js-reveal text-white text-3xl md:text-4xl font-light tracking-tight max-w-3xl">
            Parlons de votre projet de façade ou d’agencement
          </h3>
          <p className="js-reveal mt-4 text-white/80 max-w-2xl">
            Nous accompagnons les architectes, maîtres d’ouvrage et entreprises pour concevoir des solutions durables et élégantes.
          </p>
          <div className="js-reveal mt-8">
            <a href="/contact" className="inline-block rounded-md bg-white text-black px-5 py-2.5 text-sm border border-white/20 hover:bg-white/95">
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
